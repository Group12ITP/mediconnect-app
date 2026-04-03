import { doctorsData } from '../../data/doctorsData';
import { useState } from 'react';

const BrowseDoctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors] = useState(doctorsData);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full bg-white rounded-3xl shadow-inner p-6 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Browse Doctors</h1>
        
        <div className="flex items-center gap-x-4">
          {/* Search Bar (inside the page) */}
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-100 border border-transparent focus:border-emerald-300 rounded-3xl py-3 pl-10 pr-4 text-sm outline-none"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
          </div>

          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-3xl font-medium flex items-center gap-x-2 transition-colors">
            <span className="text-xl">🔄</span>
            All Specialties
          </button>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-start justify-between">
              {/* Avatar */}
              <div className="w-20 h-20 bg-emerald-100 text-5xl flex items-center justify-center rounded-3xl shadow-inner">
                {doctor.avatar}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-x-1 bg-emerald-50 text-emerald-700 text-sm font-medium px-3 py-1 rounded-3xl">
                ⭐ {doctor.rating}
              </div>
            </div>

            <h3 className="mt-5 text-xl font-semibold text-gray-900">{doctor.name}</h3>
            <p className="text-emerald-600 font-medium">{doctor.specialty}</p>

            <div className="mt-4 text-sm text-gray-500 space-y-1">
              <p>🕒 Next Available: <span className="font-medium text-gray-700">{doctor.nextAvailable}</span></p>
              <p>📍 {doctor.location}</p>
              <p>🩺 {doctor.experience} experience</p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-x-4 mt-6">
              <span className="text-xl cursor-pointer hover:scale-110 transition-transform">📘</span>
              <span className="text-xl cursor-pointer hover:scale-110 transition-transform">📸</span>
              <span className="text-xl cursor-pointer hover:scale-110 transition-transform">𝕏</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-x-3 mt-8">
              <button
                onClick={() => alert(`Booking appointment with ${doctor.name}`)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-3xl font-medium transition-colors"
              >
                Book Appointment
              </button>
              <button className="flex-1 border border-gray-300 hover:bg-gray-100 py-3.5 rounded-3xl font-medium transition-colors">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination (simple version) */}
      <div className="flex justify-center items-center gap-x-2 mt-12">
        <button className="px-5 py-2 text-sm font-medium text-gray-500 hover:text-gray-900">Prev</button>
        <button className="w-8 h-8 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-medium">1</button>
        <button className="w-8 h-8 hover:bg-gray-100 rounded-2xl flex items-center justify-center font-medium">2</button>
        <button className="w-8 h-8 hover:bg-gray-100 rounded-2xl flex items-center justify-center font-medium">3</button>
        <button className="px-5 py-2 text-sm font-medium text-gray-500 hover:text-gray-900">Next</button>
      </div>
    </div>
  );
};

export default BrowseDoctors;