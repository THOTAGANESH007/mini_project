import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
const AddEvent = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    location: '',
    description: '',
    organizer_name: '',
    date: '',
    is_free: '',
    ticket_price: '',
    registration_link: '',
    img: ''
  })

  const [imageFile, setImageFile] = useState(null)

  const handleChange = e => {
    const { name, value } = e.target

    if (name === 'is_free') {
      const isFree = value === 'yes'
      setForm(prev => ({
        ...prev,
        is_free: value,
        ticket_price: isFree ? '' : prev.ticket_price // Clear price if free
      }))
    } else {
      setForm(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleImageChange = e => {
    const file = e.target.files[0]
    setImageFile(file)
    setForm(prev => ({
      ...prev,
      img: file?.name || ''
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const data = new FormData()
    for (let key in form) {
      data.append(key, form[key])
    }

    if (imageFile) {
      data.append('image', imageFile)
    }

    console.log('FormData prepared:')
    for (let pair of data.entries()) {
      console.log(pair[0] + ': ', pair[1])
    }

    try {
      const res = await axios.post('http://localhost:9999/admin/events', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log('Event created:', res.data)
      // alert('Event submitted successfully!')
      navigate('/admin/allevents')  // or whatever route shows the list of events

    } catch (error) {
      console.error(
        'Error creating event:',
        error.response?.data || error.message
      )
      alert('Something went wrong!')
    }

    // Example: await axios.post("/api/events", data);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6'
    >
      <h2 className='text-2xl font-bold text-center text-gray-800'>
        Add a New Event
      </h2>

      <div>
        <label className='block text-gray-700 mb-1'>Event Name</label>
        <input
          type='text'
          name='title'
          value={form.title}
          onChange={handleChange}
          required
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400'
        />
      </div>

      <div>
        <label className='block text-gray-700 mb-1'>Location</label>
        <input
          type='text'
          name='location'
          value={form.location}
          onChange={handleChange}
          required
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400'
        />
      </div>

      <div>
        <label className='block text-gray-700 mb-1'>Description</label>
        <textarea
          name='description'
          value={form.description}
          onChange={handleChange}
          required
          rows='4'
          className='w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-400'
        />
      </div>

      <div>
        <label className='block text-gray-700 mb-1'>Organizer Name</label>
        <input
          type='text'
          name='organizer_name'
          value={form.organizer_name}
          onChange={handleChange}
          required
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400'
        />
      </div>
      <div>
        <label className='block text-gray-700 mb-1'>Registration Link</label>
        <input
          type='text'
          name='registration_link'
          value={form.registration_link}
          onChange={handleChange}
          required
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400'
        />
      </div>

      <div>
        <label className='block text-gray-700 mb-1'>Event Date</label>
        <input
          type='date'
          name='date'
          value={form.date}
          onChange={handleChange}
          required
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400'
        />
      </div>

      <div>
        <label className='block text-gray-700 mb-1'>Is the Event Free?</label>
        <select
          name='is_free'
          value={form.is_free}
          onChange={handleChange}
          required
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400'
        >
          <option value=''>Select</option>
          <option value='yes'>Yes</option>
          <option value='no'>No</option>
        </select>
      </div>

      <div>
        <label className='block text-gray-700 mb-1'>Ticket Price (₹)</label>
        <input
          type='number'
          name='ticket_price'
          value={form.ticket_price}
          onChange={handleChange}
          min='0'
          disabled={form.is_free === 'yes'}
          required={form.is_free === 'no'}
          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 ${
            form.is_free === 'yes' ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
        />
        {form.is_free === 'yes' && (
          <p className='text-sm text-gray-500 mt-1'>
            No price needed for free events.
          </p>
        )}
      </div>

      <div>
        <label className='block text-gray-700 mb-1'>Upload Image</label>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          className='w-full'
        />
      </div>

      <button
        type='submit'
        className='w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition'
      >
        Submit Event
      </button>
    </form>
  )
}

export default AddEvent
