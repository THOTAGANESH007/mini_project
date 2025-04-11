import React, { useState } from 'react';

export default function AppointmentsPage() {
  const [formData, setFormData] = useState({
    department: '',
    description: ''
  });

  const [appointments, setAppointments] = useState([
    // Dummy initial data
    {
      id: 1,
      department: 'Cardiology',
      description: 'Chest pain',
      assignedDate: '2025-04-15',
      assignedTime: '10:00 AM',
    },
    {
      id: 2,
      department: 'Neurology',
      description: 'Headache',
      assignedDate: '2025-04-10',
      assignedTime: '03:00 PM',
    }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.department || !formData.description) {
      alert('Please fill all fields');
      return;
    }

    const newAppointment = {
      id: Date.now(),
      department: formData.department,
      description: formData.description,
      assignedDate: null, // To be assigned later by dept head
      assignedTime: null
    };

    setAppointments(prev => [...prev, newAppointment]);
    setFormData({ department: '', description: '' });
    alert('Appointment request submitted');
  };

  const currentDate = new Date();

  const upcomingAppointments = appointments.filter(
    (appt) =>
      appt.assignedDate &&
      new Date(appt.assignedDate) >= currentDate
  );

  const completedAppointments = appointments.filter(
    (appt) =>
      appt.assignedDate &&
      new Date(appt.assignedDate) < currentDate
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 min-h-screen bg-gray-100">
      {/* Left Side - Form */}
      <div className="md:w-1/2 w-full bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Book an Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full mt-1 border px-3 py-2 rounded-md"
            >
              <option value="">Select Department</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 border px-3 py-2 rounded-md"
              placeholder="Enter reason for appointment"
              rows={4}
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Submit Request
          </button>
        </form>
      </div>

      {/* Right Side - Appointments */}
      <div className="md:w-1/2 w-full space-y-6">
        {/* Upcoming */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-3">Upcoming Appointments</h3>
          {upcomingAppointments.length > 0 ? (
            <ul className="space-y-3">
              {upcomingAppointments.map((appt) => (
                <li key={appt.id} className="border p-3 rounded-md">
                  <p><strong>Department:</strong> {appt.department}</p>
                  <p><strong>Date:</strong> {appt.assignedDate}</p>
                  <p><strong>Time:</strong> {appt.assignedTime}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No upcoming appointments.</p>
          )}
        </div>

        {/* Completed */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-3">Completed Appointments</h3>
          {completedAppointments.length > 0 ? (
            <ul className="space-y-3">
              {completedAppointments.map((appt) => (
                <li key={appt.id} className="border p-3 rounded-md">
                  <p><strong>Department:</strong> {appt.department}</p>
                  <p><strong>Date:</strong> {appt.assignedDate}</p>
                  <p><strong>Time:</strong> {appt.assignedTime}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No completed appointments.</p>
          )}
        </div>
      </div>
    </div>
  );
}
