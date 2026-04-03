import { prescriptionsData } from '../../data/prescriptionsData';
import { useState } from 'react';

const ViewPrescriptions = () => {
  const [prescriptions] = useState(prescriptionsData);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrescriptions = prescriptions.filter((p) =>
    p.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    return status === 'Active' 
      ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-white shadow-lg shadow-emerald-200' 
      : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg shadow-gray-200';
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
              
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  My Prescriptions
                </h1>
                
              </div>
            </div>
          </div>
          
          {/* Enhanced Search Bar */}
          <div className="relative w-full lg:w-96">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search by doctor or prescription ID..."
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-4 border border-emerald-200">
          <p className="text-emerald-600 text-sm font-medium">Total Prescriptions</p>
          <p className="text-2xl font-bold text-emerald-900">{prescriptions.length}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4 border border-blue-200">
          <p className="text-blue-600 text-sm font-medium">Active Prescriptions</p>
          <p className="text-2xl font-bold text-blue-900">{prescriptions.filter(p => p.status === 'Active').length}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-4 border border-purple-200">
          <p className="text-purple-600 text-sm font-medium">Completed</p>
          <p className="text-2xl font-bold text-purple-900">{prescriptions.filter(p => p.status === 'Completed').length}</p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPrescriptions.map((prescription, idx) => (
          <div
            key={prescription.id}
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
                      <p className="font-mono text-xs text-gray-500 font-medium">{prescription.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-emerald-600 font-medium text-sm">{prescription.date}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(prescription.status)}`}>
                    {prescription.status}
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-emerald-50/30 rounded-2xl">
                  <p className="text-lg font-bold text-gray-800">{prescription.doctor}</p>
                  <p className="text-emerald-600 text-sm font-medium mt-1">{prescription.specialty}</p>
                </div>

                {/* Medicines */}
                <div className="space-y-3 mb-6">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Prescribed Medicines</p>
                  {prescription.medicines.map((med, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-3 hover:bg-emerald-50 transition-colors duration-300">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{med.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{med.dosage}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium text-emerald-600">{med.days}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Notes */}
                {prescription.notes && (
                  <div className="mb-6 p-3 bg-amber-50 border-l-4 border-amber-400 rounded-lg">
                    <div className="flex gap-2">
                      <span className="text-amber-500 text-sm">📝</span>
                      <p className="text-xs text-gray-600">{prescription.notes}</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => alert(`Viewing details for ${prescription.id}`)}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-200"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => alert(`Downloading PDF for ${prescription.id}`)}
                    className="flex-1 border-2 border-gray-200 hover:border-emerald-400 bg-white hover:bg-emerald-50 py-3 rounded-xl font-semibold text-sm text-gray-700 transition-all duration-300"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      PDF
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPrescriptions.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-2xl font-semibold text-gray-400">No prescriptions found</p>
          <p className="text-gray-400 mt-2">Try adjusting your search</p>
        </div>
      )}
    </div>
  );
};

export default ViewPrescriptions;