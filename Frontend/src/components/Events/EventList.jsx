import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import allEvents from './events.js'

const EventList = () => {
  const navigate = useNavigate()

  const generateStatus = date => {
    const inputDate = new Date(date)
    const today = new Date()

    const inputDateOnly = new Date(
      inputDate.getFullYear(),
      inputDate.getMonth(),
      inputDate.getDate()
    )
    const todayOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    )

    if (inputDateOnly > todayOnly) return 'Scheduled'
    if (inputDateOnly.getTime() === todayOnly.getTime()) return 'Ongoing'
    return 'Completed'
  }

  const statusStyles = {
    Scheduled: 'bg-yellow-100 text-yellow-700',
    Ongoing: 'bg-blue-100 text-blue-700',
    Completed: 'bg-green-100 text-green-700'
  }

  const [events] = useState(allEvents)
  const [filteredEvents, setFilteredEvents] = useState(allEvents)
  const [filterDate, setFilterDate] = useState({ start: '', end: '' })
  const [filterPrice, setFilterPrice] = useState({
    min: '',
    max: '',
    freeOnly: false
  })
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 9

  const handleFilter = () => {
    let filtered = [...events]

    // Date range filter
    if (filterDate.start) {
      const startDate = new Date(filterDate.start)
      filtered = filtered.filter(e => new Date(e.date) >= startDate)
    }

    if (filterDate.end) {
      const endDate = new Date(filterDate.end)
      filtered = filtered.filter(e => new Date(e.date) <= endDate)
    }

    // Price range filter
    if (filterPrice.min) {
      filtered = filtered.filter(
        e => !e.is_free && e.ticket_price >= parseFloat(filterPrice.min)
      )
    }

    if (filterPrice.max) {
      filtered = filtered.filter(
        e => !e.is_free && e.ticket_price <= parseFloat(filterPrice.max)
      )
    }

    // Free only
    if (filterPrice.freeOnly) {
      filtered = filtered.filter(e => e.is_free)
    }

    setFilteredEvents(filtered)
    setCurrentPage(1)
  }

  const indexOfLast = currentPage * eventsPerPage
  const indexOfFirst = indexOfLast - eventsPerPage
  const currentEvents = filteredEvents.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)

  return (
    <div className='p-6 max-w-6xl mx-auto' style={{minHeight:"100vh"}}>
      <h1 className='text-3xl font-bold mb-6'>Event List</h1>

      {/* Filters */}
      {/* <h1 className='text-center text-3xl'>Filter by Date</h1><br></br> */}
      <div className='mb-6  flex flex-col gap-4 items-center'>
        <div className='flex flex-row gap-5'>
        <div>
          <label className='block text-sm mb-1'>Start Date</label>
          <input
            type='date'
            value={filterDate.start}
            onChange={e =>
              setFilterDate(prev => ({ ...prev, start: e.target.value }))
            }
            className='border p-2 rounded w-full'
          />
        </div>

        <div>
          <label className='block text-sm mb-1'>End Date</label>
          <input
            type='date'
            value={filterDate.end}
            onChange={e =>
              setFilterDate(prev => ({ ...prev, end: e.target.value }))
            }
            className='border p-2 rounded w-full'
          />
        </div>
        </div>
        <div>
          <label className='block text-sm mb-1'>Price Range (₹)</label>
          <div className='flex gap-2'>
            <input
              type='number'
              placeholder='Min'
              value={filterPrice.min}
              onChange={e =>
                setFilterPrice(prev => ({ ...prev, min: e.target.value }))
              }
              className='border p-2 rounded w-full'
            />
            <input
              type='number'
              placeholder='Max'
              value={filterPrice.max}
              onChange={e =>
                setFilterPrice(prev => ({ ...prev, max: e.target.value }))
              }
              className='border p-2 rounded w-full'
            />
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            id='freeOnly'
            checked={filterPrice.freeOnly}
            onChange={e =>
              setFilterPrice(prev => ({
                ...prev,
                freeOnly: e.target.checked
              }))
            }
          />
          <label htmlFor='freeOnly' className='text-sm'>
            Show Only Free
          </label>
        </div>
      </div>

      <div className='mb-4 w-full'>
        <button
          onClick={handleFilter}
          className='bg-blue-600 m-auto block text-white px-4 py-2 rounded hover:bg-blue-700'
        >
          Apply Filters
        </button>
      </div>
      <br></br>
      <hr></hr>
     <br></br>
      {/* Event Cards */}
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {currentEvents.length === 0 ? (
          <p className='col-span-full text-center text-red-500'>
            No events found.
          </p>
        ) : (
          currentEvents.map((event,id) => (
            <div
              key={id}
              onClick={() => navigate(`/event/${id}`)}
              className='border rounded-xl shadow-md hover:shadow-lg cursor-pointer transition'
            >
              <img
                src='https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt={event.title}
                className='w-full h-48 rounded-t-xl object-cover'
              />
              <div className='p-4'>
                <h2 className='text-xl text-center font-semibold'>
                  {event.title}
                </h2>
                <p className='text-sm text-gray-500'>
                  Location: {event.location}
                </p>
                <p className='text-sm text-gray-500'>
                  Date: {new Date(event.date).toLocaleDateString()}
                </p>
                <p className='mt-2 font-medium'>
                  Price:{' '}
                  {event.is_free ? (
                    <span className='text-green-600'>Free</span>
                  ) : (
                    `₹${event.ticket_price}`
                  )}
                </p>
                <span
                  className={`inline-block px-3 py-1 text-sm rounded-full mt-2 ${
                    statusStyles[generateStatus(event.date)]
                  }`}
                >
                  {generateStatus(event.date)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className='mt-8 flex justify-center gap-4'>
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === idx + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default EventList
