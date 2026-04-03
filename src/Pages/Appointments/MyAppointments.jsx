import { useState } from 'react';
import { appointmentsData } from '../../data/myAppointmentsData';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState(appointmentsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch = apt.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed':
        return 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-white shadow-lg shadow-emerald-200';
      case 'Completed':
        return 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg shadow-blue-200';
      case 'Cancelled':
        return 'bg-gradient-to-r from-red-400 to-red-500 text-white shadow-lg shadow-red-200';
      case 'Rescheduled':
        return 'bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-lg shadow-amber-200';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg shadow-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Confirmed': return '✅';
      case 'Completed': return '✔️';
      case 'Cancelled': return '❌';
      case 'Rescheduled': return '🔄';
      default: return '📅';
    }
  };

  const handleCancelAppointment = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(appointments.map(apt => 
        apt.id === id ? { ...apt, status: 'Cancelled' } : apt
      ));
    }
  };

  const handleReschedule = (id) => {
    alert(`Reschedule appointment ${id}`);
    // Implement reschedule logic
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 rounded-3xl p-8 overflow-auto">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl -z-10"></div>
      
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  My Appointments
                </h1>
                <p className="text-gray-500 mt-1">Track and manage your medical appointments</p>
              </div>
            </div>
          </div>
          
          {/* Enhanced Search Bar */}
          <div className="relative w-full lg:w-96">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search by doctor, specialty or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/80 backdrop-blur-sm border-2 border-gray-100 focus:border-emerald-400 rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-emerald-100"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-4 border border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-600 text-sm font-medium">Total Appointments</p>
              <p className="text-2xl font-bold text-emerald-900">{appointments.length}</p>
            </div>
            <div className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center">
              <span className="text-xl">📋</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Upcoming</p>
              <p className="text-2xl font-bold text-blue-900">{appointments.filter(a => a.status === 'Confirmed').length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
              <span className="text-xl">⏰</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold text-purple-900">{appointments.filter(a => a.status === 'Completed').length}</p>
            </div>
            <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
              <span className="text-xl">✅</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-4 border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-600 text-sm font-medium">Total Spent</p>
              <p className="text-2xl font-bold text-amber-900">
                LKR {appointments.reduce((sum, apt) => sum + apt.fee, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
              <span className="text-xl">💰</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {['all', 'Confirmed', 'Completed', 'Cancelled', 'Rescheduled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
              filterStatus === status
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-200'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {status === 'all' ? 'All Appointments' : status}
            {status !== 'all' && (
              <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {appointments.filter(a => a.status === status).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAppointments.map((appointment, idx) => (
          <div
            key={appointment.id}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10"></div>
            <div className="relative bg-white rounded-3xl m-[2px] transition-all duration-500 group-hover:bg-white/95">
              
              {/* Card Content */}
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                      <p className="font-mono text-xs text-gray-500 font-medium">{appointment.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-emerald-600 font-medium text-sm">{appointment.date}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(appointment.status)}`}>
                    <span>{getStatusIcon(appointment.status)}</span>
                    <span>{appointment.status}</span>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-emerald-50/30 rounded-2xl">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-lg font-bold text-gray-800">{appointment.doctor}</p>
                      <p className="text-emerald-600 text-sm font-medium mt-1">{appointment.specialty}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <span>📍 {appointment.location}</span>
                        <span>•</span>
                        <span>⭐ {appointment.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-600 font-bold">LKR {appointment.fee}</p>
                      <p className="text-xs text-gray-400">Consultation fee</p>
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-gray-600">Time</span>
                    </div>
                    <span className="font-semibold text-gray-800">{appointment.time}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-sm text-gray-600">Contact</span>
                    </div>
                    <span className="font-semibold text-gray-800">{appointment.contact}</span>
                  </div>
                  {appointment.notes && (
                    <div className="p-3 bg-amber-50 border-l-4 border-amber-400 rounded-lg">
                      <div className="flex gap-2">
                        <span className="text-amber-500 text-sm">📝</span>
                        <p className="text-xs text-gray-600">{appointment.notes}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {appointment.status === 'Confirmed' && (
                    <>
                      <button
                        onClick={() => handleReschedule(appointment.id)}
                        className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-200"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="flex-1 border-2 border-red-200 hover:border-red-400 bg-white hover:bg-red-50 py-3 rounded-xl font-semibold text-sm text-red-600 transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {appointment.status === 'Completed' && (
                    <button
                      onClick={() => alert(`View feedback for ${appointment.id}`)}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-200"
                    >
                      Leave Feedback
                    </button>
                  )}
                  {appointment.status === 'Cancelled' && (
                    <button
                      onClick={() => alert(`Book again for ${appointment.doctor}`)}
                      className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300"
                    >
                      Book Again
                    </button>
                  )}
                  {appointment.status === 'Rescheduled' && (
                    <button
                      onClick={() => alert(`View new appointment details`)}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300"
                    >
                      View Details
                    </button>
                  )}
                </div>

                {/* Join Meeting Button for Upcoming */}
                {appointment.status === 'Confirmed' && (
                  <button className="w-full mt-3 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-700 py-2.5 rounded-xl font-medium text-sm transition-all duration-300">
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Join Video Consultation
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAppointments.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-2xl font-semibold text-gray-400">No appointments found</p>
          <p className="text-gray-400 mt-2">Try adjusting your search or book a new appointment</p>
          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
            Book an Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;