import { useState } from 'react';

const MyPatients = () => {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Kanchana Perera",
      avatar: "👩🏻",
      age: 34,
      gender: "Female",
      lastVisit: "2024-03-20",
      lastVisitRelative: "2 days ago",
      condition: "Hypertension",
      status: "Stable",
      bloodGroup: "O+",
      medications: ["Amlodipine 5mg", "Lisinopril 10mg"],
      nextAppointment: "2024-04-10",
      phone: "+94 77 123 4567",
      email: "kanchana.p@email.com",
    },
    {
      id: 2,
      name: "Nimal Silva",
      avatar: "👨🏻",
      age: 52,
      gender: "Male",
      lastVisit: "2024-03-14",
      lastVisitRelative: "1 week ago",
      condition: "Coronary Artery Disease",
      status: "Under Monitoring",
      bloodGroup: "B+",
      medications: ["Atorvastatin 20mg", "Aspirin 75mg"],
      nextAppointment: "2024-04-05",
      phone: "+94 77 234 5678",
      email: "nimal.s@email.com",
    },
    {
      id: 3,
      name: "Dilini Rajapaksha",
      avatar: "👩🏽",
      age: 28,
      gender: "Female",
      lastVisit: "2024-03-21",
      lastVisitRelative: "Yesterday",
      condition: "Post Cardiac Surgery",
      status: "Recovering",
      bloodGroup: "A+",
      medications: ["Warfarin 5mg", "Metoprolol 25mg"],
      nextAppointment: "2024-04-15",
      phone: "+94 77 345 6789",
      email: "dilini.r@email.com",
    },
    {
      id: 4,
      name: "Ruwan Fernando",
      avatar: "👨🏼",
      age: 45,
      gender: "Male",
      lastVisit: "2024-03-07",
      lastVisitRelative: "3 weeks ago",
      condition: "Arrhythmia",
      status: "Stable",
      bloodGroup: "AB+",
      medications: ["Amiodarone 200mg", "Digoxin 0.25mg"],
      nextAppointment: "2024-04-12",
      phone: "+94 77 456 7890",
      email: "ruwan.f@email.com",
    },
    {
      id: 5,
      name: "Amara Weerasinghe",
      avatar: "👩🏾",
      age: 58,
      gender: "Female",
      lastVisit: "2024-03-18",
      lastVisitRelative: "5 days ago",
      condition: "Diabetes Type 2",
      status: "Stable",
      bloodGroup: "O-",
      medications: ["Metformin 500mg", "Glipizide 5mg"],
      nextAppointment: "2024-04-08",
      phone: "+94 77 567 8901",
      email: "amara.w@email.com",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Stable': return 'bg-emerald-100 text-emerald-700';
      case 'Under Monitoring': return 'bg-amber-100 text-amber-700';
      case 'Recovering': return 'bg-blue-100 text-blue-700';
      case 'Critical': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Stable': return '✅';
      case 'Under Monitoring': return '👁️';
      case 'Recovering': return '💪';
      case 'Critical': return '⚠️';
      default: return '📋';
    }
  };

  const handleViewProfile = (patient) => {
    setSelectedPatient(patient);
  };

  const handleCloseModal = () => {
    setSelectedPatient(null);
  };

  const handleMessage = (patient) => {
    alert(`💬 Starting conversation with ${patient.name}`);
  };

  const handleScheduleAppointment = (patient) => {
    alert(`📅 Scheduling appointment with ${patient.name}`);
  };

  const stats = {
    total: patients.length,
    stable: patients.filter(p => p.status === 'Stable').length,
    monitoring: patients.filter(p => p.status === 'Under Monitoring').length,
    recovering: patients.filter(p => p.status === 'Recovering').length,
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 via-white to-teal-50/30 rounded-3xl p-8 overflow-auto">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                My Patients
              </h1>
              <p className="text-gray-500 mt-1">Manage and track your patient roster</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Patient
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-2xl p-4 border border-teal-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-600 text-sm font-medium">Total Patients</p>
                <p className="text-2xl font-bold text-teal-900">{stats.total}</p>
              </div>
              <div className="w-10 h-10 bg-teal-200 rounded-full flex items-center justify-center">
                <span className="text-xl">👥</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-4 border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Stable</p>
                <p className="text-2xl font-bold text-emerald-900">{stats.stable}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center">
                <span className="text-xl">✅</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-4 border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-600 text-sm font-medium">Under Monitoring</p>
                <p className="text-2xl font-bold text-amber-900">{stats.monitoring}</p>
              </div>
              <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
                <span className="text-xl">👁️</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Recovering</p>
                <p className="text-2xl font-bold text-blue-900">{stats.recovering}</p>
              </div>
              <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                <span className="text-xl">💪</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search by patient name or condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/80 backdrop-blur-sm border-2 border-gray-100 focus:border-teal-400 rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-teal-100"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-teal-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-teal-400"
            >
              <option value="all">All Status</option>
              <option value="Stable">Stable</option>
              <option value="Under Monitoring">Under Monitoring</option>
              <option value="Recovering">Recovering</option>
            </select>

            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-teal-600' : 'text-gray-500'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-teal-600' : 'text-gray-500'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Patients Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPatients.map((patient, idx) => (
              <div
                key={patient.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10"></div>
                <div className="relative bg-white rounded-3xl m-[2px] transition-all duration-500 group-hover:bg-white/95">
                  <div className="p-6">
                    {/* Patient Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center text-4xl shadow-md">
                          {patient.avatar}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-xl text-gray-800">{patient.name}</p>
                        <p className="text-teal-600 text-sm">{patient.age} years • {patient.gender}</p>
                        <p className="text-xs text-gray-400 mt-1">{patient.bloodGroup}</p>
                      </div>
                    </div>

                    {/* Patient Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Last Visit</span>
                        <span className="font-medium text-gray-700">{patient.lastVisitRelative}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Condition</span>
                        <span className="font-medium text-gray-700">{patient.condition}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Status</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(patient.status)}`}>
                          <span>{getStatusIcon(patient.status)}</span>
                          <span>{patient.status}</span>
                        </span>
                      </div>
                      {patient.nextAppointment && (
                        <div className="flex justify-between items-center text-sm pt-2 border-t">
                          <span className="text-gray-500">Next Appointment</span>
                          <span className="font-medium text-teal-600">{patient.nextAppointment}</span>
                        </div>
                      )}
                    </div>

                    {/* Medications Preview */}
                    <div className="mb-6 p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs font-semibold text-gray-500 mb-2">Current Medications</p>
                      <div className="flex flex-wrap gap-1">
                        {patient.medications.map((med, idx) => (
                          <span key={idx} className="text-xs bg-white px-2 py-1 rounded-lg text-gray-600">
                            {med}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleViewProfile(patient)}
                        className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-2.5 rounded-xl font-medium text-sm transition-all transform hover:scale-105"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => handleMessage(patient)}
                        className="px-4 py-2.5 border-2 border-gray-200 hover:border-teal-400 hover:bg-teal-50 rounded-xl transition-all"
                      >
                        <svg className="w-4 h-4 text-gray-600 group-hover:text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center text-3xl">
                      {patient.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-gray-800 text-lg">{patient.name}</p>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{patient.age} yrs</span>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{patient.bloodGroup}</span>
                      </div>
                      <p className="text-sm text-gray-500">{patient.condition}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs">
                        <span className="text-gray-400">Last visit: {patient.lastVisitRelative}</span>
                        <span className="text-teal-600">Next: {patient.nextAppointment}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(patient.status)}`}>
                      <span>{getStatusIcon(patient.status)}</span>
                      <span>{patient.status}</span>
                    </span>
                    <button
                      onClick={() => handleViewProfile(patient)}
                      className="px-5 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium text-sm transition-all hover:scale-105"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => handleScheduleAppointment(patient)}
                      className="px-5 py-2 border-2 border-teal-200 text-teal-600 rounded-xl font-medium text-sm hover:bg-teal-50 transition-all"
                    >
                      Schedule
                    </button>
                    <button
                      onClick={() => handleMessage(patient)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredPatients.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-2xl font-semibold text-gray-400">No patients found</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Patient Profile Modal */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn" onClick={handleCloseModal}>
            <div className="bg-white rounded-3xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-scaleIn" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-6xl">{selectedPatient.avatar}</div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedPatient.name}</h2>
                      <p className="text-teal-100">{selectedPatient.age} years • {selectedPatient.gender}</p>
                    </div>
                  </div>
                  <button onClick={handleCloseModal} className="text-white/80 hover:text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500">Blood Group</p>
                    <p className="text-xl font-semibold text-gray-800">{selectedPatient.bloodGroup}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500">Condition</p>
                    <p className="text-xl font-semibold text-gray-800">{selectedPatient.condition}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500">Last Visit</p>
                    <p className="text-xl font-semibold text-gray-800">{selectedPatient.lastVisitRelative}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500">Next Appointment</p>
                    <p className="text-xl font-semibold text-gray-800">{selectedPatient.nextAppointment}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Current Medications</h3>
                  <div className="space-y-2">
                    {selectedPatient.medications.map((med, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                          <span className="text-sm">💊</span>
                        </div>
                        <span className="font-medium text-gray-700">{med}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-gray-700">{selectedPatient.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700">{selectedPatient.email}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-xl font-semibold">
                    Schedule Appointment
                  </button>
                  <button className="flex-1 border-2 border-teal-600 text-teal-600 py-3 rounded-xl font-semibold hover:bg-teal-50">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MyPatients;