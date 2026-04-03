import { useState } from 'react';

const PatientReports = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const patientsWithReports = [
    {
      id: 1,
      name: "Kanchana Perera",
      avatar: "👩🏻",
      age: 34,
      lastUpload: "2 days ago",
      uploadDate: "2026-04-03",
      reports: [
        { id: 1, name: "Complete Blood Count", fileName: "Blood_Test_Report.pdf", type: "PDF", date: "03 Apr 2026", size: "1.8 MB", category: "Lab Results", doctor: "Dr. Silva" },
        { id: 2, name: "Chest X-Ray", fileName: "Chest_XRay.jpg", type: "JPG", date: "03 Apr 2026", size: "4.2 MB", category: "Imaging", doctor: "Dr. Perera" },
      ],
    },
    {
      id: 2,
      name: "Nimal Silva",
      avatar: "👨🏻",
      age: 52,
      lastUpload: "1 week ago",
      uploadDate: "2026-03-28",
      reports: [
        { id: 3, name: "ECG Report", fileName: "ECG_Report.pdf", type: "PDF", date: "28 Mar 2026", size: "2.1 MB", category: "Cardiology", doctor: "Dr. Fernando" },
      ],
    },
    {
      id: 3,
      name: "Dilini Rajapaksha",
      avatar: "👩🏽",
      age: 28,
      lastUpload: "Yesterday",
      uploadDate: "2026-04-04",
      reports: [
        { id: 4, name: "Lipid Profile", fileName: "Lipid_Profile.xlsx", type: "XLS", date: "04 Apr 2026", size: "956 KB", category: "Lab Results", doctor: "Dr. Silva" },
        { id: 5, name: "Abdominal Ultrasound", fileName: "Ultrasound_Report.pdf", type: "PDF", date: "04 Apr 2026", size: "3.4 MB", category: "Imaging", doctor: "Dr. Perera" },
      ],
    },
    {
      id: 4,
      name: "Ruwan Fernando",
      avatar: "👨🏼",
      age: 45,
      lastUpload: "3 weeks ago",
      uploadDate: "2026-03-15",
      reports: [
        { id: 6, name: "Cardiac MRI", fileName: "Cardiac_MRI.pdf", type: "PDF", date: "15 Mar 2026", size: "5.2 MB", category: "Imaging", doctor: "Dr. Fernando" },
        { id: 7, name: "Holter Monitor Report", fileName: "Holter_Report.pdf", type: "PDF", date: "15 Mar 2026", size: "1.2 MB", category: "Cardiology", doctor: "Dr. Fernando" },
      ],
    },
  ];

  const getFileIcon = (type, category) => {
    if (category === "Imaging") return "🩻";
    if (category === "Cardiology") return "💓";
    if (type === 'PDF') return "📄";
    if (type === 'JPG' || type === 'PNG') return "🖼️";
    if (type === 'XLS' || type === 'XLSX') return "📊";
    return "📁";
  };

  const getFileColor = (type) => {
    if (type === 'PDF') return "bg-red-100 text-red-600";
    if (type === 'JPG' || type === 'PNG') return "bg-blue-100 text-blue-600";
    if (type === 'XLS' || type === 'XLSX') return "bg-green-100 text-green-600";
    return "bg-gray-100 text-gray-600";
  };

  const handleViewReport = (report) => {
    alert(`📄 Opening ${report.name}...\n\nFile: ${report.fileName}\nCategory: ${report.category}\nDoctor: ${report.doctor}`);
  };

  const handleDownloadReport = (report) => {
    alert(`⬇️ Downloading ${report.name}...\n\nSize: ${report.size}`);
  };

  const handleUploadReport = () => {
    alert("📤 Upload new report functionality would open file picker");
  };

  const handleShareReport = (report) => {
    alert(`📧 Sharing ${report.name} with patient...`);
  };

  const filteredPatients = patientsWithReports.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReports = selectedPatient 
    ? selectedPatient.reports.filter(report => {
        if (filterType === 'all') return true;
        return report.category.toLowerCase().includes(filterType.toLowerCase());
      })
    : [];

  const categories = ['all', ...new Set(patientsWithReports.flatMap(p => p.reports.map(r => r.category)))];

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Patient Reports
              </h1>
              <p className="text-gray-500 mt-1">Access and manage medical reports and documents</p>
            </div>
          </div>

          
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-2xl p-4 border border-teal-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-600 text-sm font-medium">Total Patients</p>
                <p className="text-2xl font-bold text-teal-900">{patientsWithReports.length}</p>
              </div>
              <div className="w-10 h-10 bg-teal-200 rounded-full flex items-center justify-center">
                <span className="text-xl">👥</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Reports</p>
                <p className="text-2xl font-bold text-blue-900">
                  {patientsWithReports.reduce((sum, p) => sum + p.reports.length, 0)}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                <span className="text-xl">📋</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-4 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Total Size</p>
                <p className="text-2xl font-bold text-purple-900">18.6 MB</p>
              </div>
              <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                <span className="text-xl">💾</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-4 border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Recent Uploads</p>
                <p className="text-2xl font-bold text-emerald-900">3</p>
              </div>
              <div className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center">
                <span className="text-xl">🆕</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Patient List Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden sticky top-8">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <h3 className="text-xl font-semibold">Patient List</h3>
                </div>
                <p className="text-teal-100 text-sm mt-1">Select a patient to view reports</p>
              </div>

              {/* Search in sidebar */}
              <div className="p-4 border-b">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:border-teal-400"
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    onClick={() => {
                      setSelectedPatient(patient);
                      setFilterType('all');
                    }}
                    className={`group cursor-pointer transition-all duration-300 rounded-2xl p-4 ${
                      selectedPatient?.id === patient.id
                        ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg'
                        : 'bg-gray-50 hover:bg-teal-50 border-2 border-transparent hover:border-teal-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className={`text-5xl transition-transform group-hover:scale-110 ${
                          selectedPatient?.id === patient.id ? 'text-white' : ''
                        }`}>
                          {patient.avatar}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 rounded-full ${
                          selectedPatient?.id === patient.id ? 'border-teal-600' : 'border-white'
                        }`}></div>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-lg">{patient.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            selectedPatient?.id === patient.id 
                              ? 'bg-white/20 text-white' 
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {patient.age} yrs
                          </span>
                          <span className={`text-xs ${
                            selectedPatient?.id === patient.id ? 'text-teal-100' : 'text-gray-500'
                          }`}>
                            {patient.reports.length} reports
                          </span>
                        </div>
                        <p className={`text-xs mt-1 ${
                          selectedPatient?.id === patient.id ? 'text-teal-100' : 'text-gray-400'
                        }`}>
                          Last: {patient.lastUpload}
                        </p>
                      </div>
                      {selectedPatient?.id === patient.id && (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reports Area */}
          <div className="lg:col-span-8">
            {selectedPatient ? (
              <div className="space-y-6">
                {/* Patient Header */}
                <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-6 border border-teal-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="text-6xl">{selectedPatient.avatar}</div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">{selectedPatient.name}</h2>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm text-gray-500">{selectedPatient.age} years old</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-teal-600">{selectedPatient.reports.length} documents</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Last upload: {selectedPatient.lastUpload}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleUploadReport}
                      className="px-5 py-2.5 bg-white border-2 border-teal-200 text-teal-600 rounded-xl font-medium hover:bg-teal-50 transition-all flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Upload for Patient
                    </button>
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setFilterType(category)}
                      className={`px-4 py-2 rounded-xl font-medium text-sm transition-all capitalize ${
                        filterType === category
                          ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {category === 'all' ? 'All Reports' : category}
                      {category !== 'all' && (
                        <span className="ml-2 px-1.5 py-0.5 bg-white/20 rounded-full text-xs">
                          {selectedPatient.reports.filter(r => r.category === category).length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Reports Grid/List */}
                {filteredReports.length > 0 ? (
                  <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                    {filteredReports.map((report, idx) => (
                      <div
                        key={report.id}
                        className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                      >
                        <div className="p-5">
                          <div className="flex items-start gap-4">
                            {/* File Icon */}
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${getFileColor(report.type)}`}>
                              {getFileIcon(report.type, report.category)}
                            </div>

                            {/* Report Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <p className="font-semibold text-gray-800 truncate">{report.name}</p>
                                  <div className="flex flex-wrap items-center gap-2 mt-1">
                                    <span className="text-xs text-gray-500">{report.date}</span>
                                    <span className="text-xs text-gray-300">•</span>
                                    <span className="text-xs text-gray-500">{report.size}</span>
                                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{report.type}</span>
                                  </div>
                                  <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xs text-teal-600">{report.category}</span>
                                    <span className="text-xs text-gray-400">by {report.doctor}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex gap-2 mt-4">
                                <button
                                  onClick={() => handleViewReport(report)}
                                  className="flex-1 px-3 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl text-sm font-medium transition-all hover:scale-105"
                                >
                                  View
                                </button>
                                <button
                                  onClick={() => handleDownloadReport(report)}
                                  className="px-3 py-2 border-2 border-gray-200 hover:border-teal-400 rounded-xl transition-all"
                                >
                                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleShareReport(report)}
                                  className="px-3 py-2 border-2 border-gray-200 hover:border-teal-400 rounded-xl transition-all"
                                >
                                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-2xl">
                    <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-4xl">📂</span>
                    </div>
                    <p className="text-gray-500">No {filterType !== 'all' ? filterType : ''} reports found</p>
                    <p className="text-sm text-gray-400 mt-1">Try a different filter category</p>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-teal-50 rounded-xl transition-all group">
                    <svg className="w-5 h-5 text-gray-500 group-hover:text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700">Bulk Download</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-teal-50 rounded-xl transition-all group">
                    <svg className="w-5 h-5 text-gray-500 group-hover:text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700">Share All</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-teal-50 rounded-xl transition-all group">
                    <svg className="w-5 h-5 text-gray-500 group-hover:text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700">Generate Summary</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
                    <span className="text-6xl">📋</span>
                  </div>
                  <p className="text-2xl font-semibold text-gray-400">No Patient Selected</p>
                  <p className="text-gray-400 mt-2">Select a patient from the list to view their medical reports</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientReports;