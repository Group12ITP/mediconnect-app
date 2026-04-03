import { useState, useEffect } from 'react';

const VideoConsultations = () => {
  const [consultations, setConsultations] = useState([
    {
      id: 1,
      patientName: "Kanchana Perera",
      patientAvatar: "👩🏻",
      time: "10:30 AM",
      date: "Today",
      duration: "30 min",
      status: "upcoming",
      reason: "Follow-up for chest pain",
      age: 32,
      lastVisit: "2 weeks ago",
      prescription: "Amlodipine 5mg",
    },
    {
      id: 2,
      patientName: "Nimal Silva",
      patientAvatar: "👨🏻",
      time: "11:30 AM",
      date: "Today",
      duration: "20 min",
      status: "live",
      reason: "Hypertension review",
      age: 45,
      lastVisit: "1 month ago",
      prescription: "Losartan 50mg",
    },
    {
      id: 3,
      patientName: "Dilini Rajapaksha",
      patientAvatar: "👩🏽",
      time: "02:00 PM",
      date: "Today",
      duration: "45 min",
      status: "upcoming",
      reason: "Post-surgery follow-up",
      age: 28,
      lastVisit: "1 week ago",
      prescription: "Antibiotics",
    },
    {
      id: 4,
      patientName: "Ruwan Fernando",
      patientAvatar: "👨🏼",
      time: "10:00 AM",
      date: "Tomorrow",
      duration: "30 min",
      status: "upcoming",
      reason: "Routine cardiac check",
      age: 52,
      lastVisit: "3 months ago",
      prescription: "Atorvastatin 20mg",
    },
    {
      id: 5,
      patientName: "Amara Weerasinghe",
      patientAvatar: "👩🏾",
      time: "03:30 PM",
      date: "Tomorrow",
      duration: "25 min",
      status: "upcoming",
      reason: "Diabetes follow-up",
      age: 58,
      lastVisit: "2 months ago",
      prescription: "Metformin 500mg",
    },
  ]);

  const [selectedCall, setSelectedCall] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    // Auto-refresh every 30 seconds to update statuses
    const interval = setInterval(() => {
      checkLiveStatus();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkLiveStatus = () => {
    // In production, this would check against actual time
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    setConsultations(prev => prev.map(call => {
      if (call.date === "Today" && call.time === "11:30 AM" && !call.status === "live") {
        return { ...call, status: "live" };
      }
      return call;
    }));
  };

  const handleJoinCall = (consultation) => {
    setSelectedCall(consultation);
    setShowJoinModal(true);
    
    // Start countdown for joining
    let count = 3;
    setCountdown(count);
    const timer = setInterval(() => {
      count--;
      setCountdown(count);
      if (count === 0) {
        clearInterval(timer);
        // In production, this would navigate to the video call page
        alert(`📹 Joining video call with ${consultation.patientName}...`);
        setShowJoinModal(false);
        setSelectedCall(null);
        setCountdown(null);
        
        // Update call status to live if it's starting now
        if (consultation.status === "upcoming") {
          setConsultations(prev => prev.map(call => 
            call.id === consultation.id ? { ...call, status: "live" } : call
          ));
        }
      }
    }, 1000);
  };

  const handlePrescribe = (consultation) => {
    alert(`📝 Opening prescription form for ${consultation.patientName}`);
  };

  const handleReschedule = (consultation) => {
    alert(`📅 Reschedule appointment with ${consultation.patientName}`);
  };

  const handleViewHistory = (consultation) => {
    alert(`📋 Viewing medical history for ${consultation.patientName}`);
  };

  const todayCalls = consultations.filter(c => c.date === "Today");
  const upcomingCalls = consultations.filter(c => c.date !== "Today");
  const liveCall = consultations.find(c => c.status === "live");

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Video Consultations
              </h1>
              <p className="text-gray-500 mt-1">Connect with your patients via secure video calls</p>
            </div>
          </div>
          
          {/* Live Indicator */}
          {liveCall && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-red-600">Live Consultation in Progress</span>
            </div>
          )}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-2xl p-4 border border-teal-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-600 text-sm font-medium">Today's Calls</p>
                <p className="text-2xl font-bold text-teal-900">{todayCalls.length}</p>
              </div>
              <div className="w-10 h-10 bg-teal-200 rounded-full flex items-center justify-center">
                <span className="text-xl">📅</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">This Month</p>
                <p className="text-2xl font-bold text-blue-900">42</p>
              </div>
              <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-4 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Avg. Duration</p>
                <p className="text-2xl font-bold text-purple-900">32 min</p>
              </div>
              <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                <span className="text-xl">⏱️</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-4 border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Rating</p>
                <p className="text-2xl font-bold text-emerald-900">4.9 ★</p>
              </div>
              <div className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center">
                <span className="text-xl">⭐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Live/Upcoming Calls */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>📍 Today's Consultations</span>
              <span className="text-sm bg-gradient-to-r from-teal-500 to-teal-600 text-white px-3 py-1 rounded-full">
                {todayCalls.length} scheduled
              </span>
            </h2>
            <div className="text-sm text-gray-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todayCalls.map((call, idx) => (
              <div
                key={call.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${
                  call.status === 'live' 
                    ? 'from-red-400 via-red-500 to-red-600' 
                    : 'from-teal-400 via-teal-500 to-teal-600'
                } opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10`}></div>
                <div className="relative bg-white rounded-3xl m-[2px] transition-all duration-500 group-hover:bg-white/95">
                  
                  {/* Live Badge */}
                  {call.status === "live" && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="flex items-center gap-1.5 bg-red-500 text-white px-3 py-1.5 rounded-full shadow-lg">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold">LIVE NOW</span>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Patient Info */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center text-4xl shadow-md">
                          {call.patientAvatar}
                        </div>
                        {call.status === "live" && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-bold text-xl text-gray-800">{call.patientName}</p>
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{call.age} yrs</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{call.reason}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs">
                          <span className="text-teal-600">Last visit: {call.lastVisit}</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-gray-500">{call.prescription}</span>
                        </div>
                      </div>
                    </div>

                    {/* Time and Duration */}
                    <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-gray-800">{call.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-gray-500">{call.duration}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleJoinCall(call)}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                          call.status === "live"
                            ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-200"
                            : "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg shadow-teal-200"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          {call.status === "live" ? "Join Live Call" : "Join Call"}
                        </div>
                      </button>
                      <button
                        onClick={() => handleViewHistory(call)}
                        className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
                        title="View Medical History"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </button>
                    </div>

                    {/* Additional options for upcoming calls */}
                    {call.status !== "live" && (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handlePrescribe(call)}
                          className="flex-1 py-2 text-sm border border-teal-200 text-teal-600 hover:bg-teal-50 rounded-xl transition-all"
                        >
                          Prescribe
                        </button>
                        <button
                          onClick={() => handleReschedule(call)}
                          className="flex-1 py-2 text-sm border border-amber-200 text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                        >
                          Reschedule
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Calls */}
        {upcomingCalls.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span>📅 Upcoming Consultations</span>
              <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                {upcomingCalls.length} scheduled
              </span>
            </h2>

            <div className="space-y-4">
              {upcomingCalls.map((call) => (
                <div
                  key={call.id}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-3xl">
                        {call.patientAvatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-gray-800 text-lg">{call.patientName}</p>
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{call.age} yrs</span>
                        </div>
                        <p className="text-sm text-gray-500">{call.reason}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs">
                          <span className="text-teal-600">{call.date} • {call.time}</span>
                          <span className="text-gray-400">{call.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleJoinCall(call)}
                        className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl font-medium transition-all transform hover:scale-105"
                      >
                        Join Call
                      </button>
                      <button
                        onClick={() => handleReschedule(call)}
                        className="px-6 py-2.5 border-2 border-amber-200 text-amber-600 hover:bg-amber-50 rounded-xl font-medium transition-all"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={() => handleViewHistory(call)}
                        className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Join Call Modal */}
        {showJoinModal && selectedCall && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 transform animate-scaleIn">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl">{selectedCall.patientAvatar}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Starting Video Call</h3>
                <p className="text-gray-600">with {selectedCall.patientName}</p>
                
                {countdown > 0 ? (
                  <div className="mt-6">
                    <div className="text-6xl font-bold text-teal-600 animate-pulse">{countdown}</div>
                    <p className="text-sm text-gray-500 mt-2">Preparing your connection...</p>
                  </div>
                ) : (
                  <div className="mt-6">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Connecting to secure server...</p>
                  </div>
                )}
                
                <button
                  onClick={() => {
                    setShowJoinModal(false);
                    setSelectedCall(null);
                    setCountdown(null);
                  }}
                  className="mt-6 px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-600 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="bg-white rounded-2xl p-4 border-2 border-dashed border-teal-200 hover:border-teal-400 hover:bg-teal-50 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="font-medium text-gray-700">Schedule New Call</span>
            </div>
          </button>
          <button className="bg-white rounded-2xl p-4 border-2 border-dashed border-teal-200 hover:border-teal-400 hover:bg-teal-50 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="font-medium text-gray-700">View All Patients</span>
            </div>
          </button>
          <button className="bg-white rounded-2xl p-4 border-2 border-dashed border-teal-200 hover:border-teal-400 hover:bg-teal-50 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="font-medium text-gray-700">Analytics Dashboard</span>
            </div>
          </button>
        </div>
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
        .delay-100 {
          animation-delay: 100ms;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </div>
  );
};

export default VideoConsultations;