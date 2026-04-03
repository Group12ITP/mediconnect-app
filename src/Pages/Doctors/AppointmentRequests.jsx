import { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  Video,
  User,
  CheckCircle,
  XCircle,
  ChevronRight,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  FileText,
  MessageCircle,
  Star,
  Filter,
  Search,
  Download,
  CalendarDays,
  Clock as ClockIcon,
  Users,
  Activity,
  Heart,
  Brain,
  Stethoscope,
  Shield,
  Award,
  TrendingUp,
  Sparkles,
  Bell,
  MoreVertical,
  Eye,
  Send,
  Smile,
  Info,
  ChevronDown,
  X
} from 'lucide-react';

const AppointmentRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      patientName: "Kanchana Perera",
      patientAvatar: "👩🏻",
      date: "2026-04-05",
      time: "10:30 AM",
      type: "Video Consultation",
      reason: "Chest pain and shortness of breath",
      duration: "30 min",
      priority: "high",
      age: 34,
      gender: "Female",
      email: "kanchana@email.com",
      phone: "+94 77 123 4567",
      lastVisit: "2025-12-15",
      medicalHistory: ["Hypertension", "Asthma"],
      symptoms: ["Chest tightness", "Shortness of breath", "Fatigue"],
      insurance: "Sri Lanka Insurance",
      status: "pending"
    },
    {
      id: 2,
      patientName: "Nimal Silva",
      patientAvatar: "👨🏻",
      date: "2026-04-05",
      time: "11:30 AM",
      type: "Video Consultation",
      reason: "Follow-up for hypertension",
      duration: "20 min",
      priority: "medium",
      age: 58,
      gender: "Male",
      email: "nimal@email.com",
      phone: "+94 77 234 5678",
      lastVisit: "2026-02-10",
      medicalHistory: ["Hypertension", "Diabetes Type 2"],
      symptoms: ["Headache", "Dizziness"],
      insurance: "National Insurance",
      status: "pending"
    },
    {
      id: 3,
      patientName: "Dilini Rajapaksha",
      patientAvatar: "👩🏽",
      date: "2026-04-06",
      time: "02:00 PM",
      type: "Video Consultation",
      reason: "Routine cardiac check-up",
      duration: "45 min",
      priority: "low",
      age: 45,
      gender: "Female",
      email: "dilini@email.com",
      phone: "+94 77 345 6789",
      lastVisit: "2026-01-20",
      medicalHistory: ["Family history of heart disease"],
      symptoms: ["No active symptoms", "Preventive checkup"],
      insurance: "Private Insurance",
      status: "pending"
    },
    {
      id: 4,
      patientName: "Ruwan Wijesinghe",
      patientAvatar: "👨🏾",
      date: "2026-04-07",
      time: "09:00 AM",
      type: "In-Person Consultation",
      reason: "Severe back pain after accident",
      duration: "60 min",
      priority: "high",
      age: 42,
      gender: "Male",
      email: "ruwan@email.com",
      phone: "+94 77 456 7890",
      lastVisit: "2026-03-01",
      medicalHistory: ["Previous back injury"],
      symptoms: ["Lower back pain", "Limited mobility", "Muscle spasms"],
      insurance: "Workers Insurance",
      status: "pending"
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const priorities = ['all', 'high', 'medium', 'low'];
  const dateFilters = ['all', 'today', 'tomorrow', 'this-week'];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'high': return <AlertCircle className="w-4 h-4" />;
      case 'medium': return <Clock className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  // Filter requests based on search and filters
  const filteredRequests = useMemo(() => {
    let filtered = requests;
    
    if (searchQuery) {
      filtered = filtered.filter(req => 
        req.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.medicalHistory.some(history => history.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (selectedPriority !== 'all') {
      filtered = filtered.filter(req => req.priority === selectedPriority);
    }
    
    if (selectedDate !== 'all') {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      filtered = filtered.filter(req => {
        const reqDate = new Date(req.date);
        if (selectedDate === 'today') {
          return reqDate.toDateString() === today.toDateString();
        } else if (selectedDate === 'tomorrow') {
          return reqDate.toDateString() === tomorrow.toDateString();
        } else if (selectedDate === 'this-week') {
          const weekEnd = new Date(today);
          weekEnd.setDate(today.getDate() + 7);
          return reqDate >= today && reqDate <= weekEnd;
        }
        return true;
      });
    }
    
    return filtered;
  }, [requests, searchQuery, selectedPriority, selectedDate]);

  const handleAccept = (id) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
    setNotificationMessage(`✅ Appointment request #${id} has been accepted and added to your schedule!`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleReject = (id) => {
    if (window.confirm("Are you sure you want to reject this request?")) {
      setRequests((prev) => prev.filter((req) => req.id !== id));
      setNotificationMessage(`❌ Appointment request #${id} has been rejected`);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetails(true);
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusBadge = (priority) => {
    const badges = {
      high: { color: 'bg-red-500', text: 'Urgent - Needs immediate attention' },
      medium: { color: 'bg-amber-500', text: 'Medium priority' },
      low: { color: 'bg-emerald-500', text: 'Low priority' }
    };
    return badges[priority] || badges.low;
  };

  // Statistics
  const stats = {
    total: requests.length,
    high: requests.filter(r => r.priority === 'high').length,
    medium: requests.filter(r => r.priority === 'medium').length,
    low: requests.filter(r => r.priority === 'low').length,
    today: requests.filter(r => new Date(r.date).toDateString() === new Date().toDateString()).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto p-6 lg:p-10">
        {/* Notification Toast */}
        {showNotification && (
          <div className="fixed top-6 right-6 z-50 animate-slide-in">
            <div className="bg-white rounded-2xl shadow-2xl border border-emerald-200 p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{notificationMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full shadow-sm border border-slate-200 mb-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-slate-600">Request Management</span>
              </div>
              <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
                Appointment Requests
              </h1>
              <p className="text-slate-500 mt-1 text-lg">Review and manage patient appointment requests</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search patients or conditions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 pr-5 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 w-80 text-sm shadow-sm transition-all"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-xl transition-colors ${
                    viewMode === 'grid' ? 'bg-teal-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-xl transition-colors ${
                    viewMode === 'list' ? 'bg-teal-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-4 text-white shadow-lg">
              <p className="text-sm opacity-90">Total Requests</p>
              <p className="text-3xl font-bold mt-1">{stats.total}</p>
              <p className="text-xs opacity-80 mt-1">Pending review</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">High Priority</p>
                  <p className="text-2xl font-bold text-red-600">{stats.high}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-500 opacity-50" />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Medium Priority</p>
                  <p className="text-2xl font-bold text-amber-600">{stats.medium}</p>
                </div>
                <Clock className="w-8 h-8 text-amber-500 opacity-50" />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Low Priority</p>
                  <p className="text-2xl font-bold text-emerald-600">{stats.low}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-emerald-500 opacity-50" />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Today's Requests</p>
                  <p className="text-2xl font-bold text-teal-600">{stats.today}</p>
                </div>
                <Calendar className="w-8 h-8 text-teal-500 opacity-50" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mt-6">
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm border border-slate-200">
              <Filter className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-600">Priority:</span>
              {priorities.map(priority => (
                <button
                  key={priority}
                  onClick={() => setSelectedPriority(priority)}
                  className={`px-3 py-1 rounded-lg text-sm capitalize transition-colors ${
                    selectedPriority === priority
                      ? 'bg-teal-600 text-white'
                      : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm border border-slate-200">
              <CalendarDays className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-600">Date:</span>
              {dateFilters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setSelectedDate(filter)}
                  className={`px-3 py-1 rounded-lg text-sm capitalize transition-colors ${
                    selectedDate === filter
                      ? 'bg-teal-600 text-white'
                      : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  {filter === 'this-week' ? 'This Week' : filter}
                </button>
              ))}
            </div>

            <div className="ml-auto text-sm text-slate-500">
              Showing {filteredRequests.length} of {requests.length} requests
            </div>
          </div>
        </div>

        {/* Requests Grid/List */}
        {filteredRequests.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
            <div className="text-8xl mb-6">🎉</div>
            <h3 className="text-2xl font-semibold text-gray-700">No pending requests</h3>
            <p className="text-gray-500 mt-2">All appointment requests have been handled.</p>
            {(searchQuery || selectedPriority !== 'all' || selectedDate !== 'all') && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedPriority('all');
                  setSelectedDate('all');
                }}
                className="mt-6 px-6 py-2 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-3xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Priority Banner */}
                <div className={`h-1.5 ${
                  req.priority === 'high' ? 'bg-red-500' : 
                  req.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                }`} />

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-6xl">{req.patientAvatar}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-xl text-slate-800">{req.patientName}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 ${getPriorityColor(req.priority)}`}>
                            {getPriorityIcon(req.priority)}
                            {req.priority}
                          </span>
                        </div>
                        <p className="text-teal-600 text-sm font-medium mt-0.5">{req.type}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleViewDetails(req)}
                      className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4 text-teal-500" />
                      <span>{formatDate(req.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="w-4 h-4 text-teal-500" />
                      <span>{req.time} • {req.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <User className="w-4 h-4 text-teal-500" />
                      <span>{req.age} years • {req.gender}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FileText className="w-4 h-4 text-teal-500" />
                      <span>Last visit: {new Date(req.lastVisit).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="bg-slate-50 rounded-2xl p-4 mb-6">
                    <p className="text-xs text-slate-500 mb-1">Reason for visit</p>
                    <p className="text-sm text-slate-700 font-medium">{req.reason}</p>
                  </div>

                  {/* Medical History Tags */}
                  {req.medicalHistory.length > 0 && (
                    <div className="mb-6">
                      <p className="text-xs text-slate-500 mb-2">Medical History</p>
                      <div className="flex flex-wrap gap-2">
                        {req.medicalHistory.map((history, idx) => (
                          <span key={idx} className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-lg">
                            {history}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => handleAccept(req.id)}
                      className="flex-1 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Accept Request
                    </button>
                    <button
                      onClick={() => handleReject(req.id)}
                      className="flex-1 py-3 border-2 border-red-200 hover:border-red-400 text-red-600 hover:bg-red-50 font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Decline
                    </button>
                  </div>

                  {/* Quick Message Button */}
                  <button className="w-full mt-3 py-2 text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Send Message to Patient
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left p-4 font-semibold text-slate-600">Patient</th>
                    <th className="text-left p-4 font-semibold text-slate-600">Date & Time</th>
                    <th className="text-left p-4 font-semibold text-slate-600">Type</th>
                    <th className="text-left p-4 font-semibold text-slate-600">Priority</th>
                    <th className="text-left p-4 font-semibold text-slate-600">Reason</th>
                    <th className="text-left p-4 font-semibold text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{req.patientAvatar}</div>
                          <div>
                            <p className="font-semibold text-slate-800">{req.patientName}</p>
                            <p className="text-xs text-slate-500">{req.age} yrs • {req.gender}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium text-slate-700">{formatDate(req.date)}</p>
                        <p className="text-xs text-slate-500">{req.time} • {req.duration}</p>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-slate-700">{req.type}</span>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded-full border inline-flex items-center gap-1 ${getPriorityColor(req.priority)}`}>
                          {getPriorityIcon(req.priority)}
                          {req.priority}
                        </span>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-slate-600 truncate max-w-xs">{req.reason}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAccept(req.id)}
                            className="px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors flex items-center gap-1"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(req.id)}
                            className="px-4 py-2 border border-red-300 text-red-600 rounded-xl text-sm font-medium hover:bg-red-50 transition-colors flex items-center gap-1"
                          >
                            <XCircle className="w-4 h-4" />
                            Decline
                          </button>
                          <button
                            onClick={() => handleViewDetails(req)}
                            className="p-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Patient Details Modal */}
        {showDetails && selectedRequest && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowDetails(false)}>
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className={`h-2 ${getStatusBadge(selectedRequest.priority).color}`} />
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-7xl">{selectedRequest.patientAvatar}</div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">{selectedRequest.patientName}</h2>
                      <p className="text-teal-600 font-medium">{selectedRequest.type}</p>
                    </div>
                  </div>
                  <button onClick={() => setShowDetails(false)} className="p-2 hover:bg-slate-100 rounded-xl">
                    <X className="w-6 h-6 text-slate-500" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Contact Information */}
                  <div className="bg-slate-50 rounded-2xl p-5">
                    <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      <User className="w-5 h-5 text-teal-600" />
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-500">Email</p>
                        <p className="font-medium text-slate-700">{selectedRequest.email}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Phone</p>
                        <p className="font-medium text-slate-700">{selectedRequest.phone}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Age/Gender</p>
                        <p className="font-medium text-slate-700">{selectedRequest.age} years • {selectedRequest.gender}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Insurance</p>
                        <p className="font-medium text-slate-700">{selectedRequest.insurance}</p>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="bg-slate-50 rounded-2xl p-5">
                    <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-teal-600" />
                      Appointment Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Date:</span>
                        <span className="font-medium text-slate-700">{formatDate(selectedRequest.date)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Time:</span>
                        <span className="font-medium text-slate-700">{selectedRequest.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Duration:</span>
                        <span className="font-medium text-slate-700">{selectedRequest.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Last Visit:</span>
                        <span className="font-medium text-slate-700">{formatDate(selectedRequest.lastVisit)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Medical Information */}
                  <div className="bg-slate-50 rounded-2xl p-5">
                    <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-teal-600" />
                      Medical Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-slate-500 text-sm mb-2">Reason for Visit</p>
                        <p className="text-slate-700 font-medium">{selectedRequest.reason}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-sm mb-2">Symptoms</p>
                        <ul className="list-disc list-inside space-y-1">
                          {selectedRequest.symptoms.map((symptom, idx) => (
                            <li key={idx} className="text-sm text-slate-700">{symptom}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-slate-500 text-sm mb-2">Medical History</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedRequest.medicalHistory.map((history, idx) => (
                            <span key={idx} className="px-3 py-1 bg-teal-100 text-teal-700 text-sm rounded-lg">
                              {history}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => {
                        handleAccept(selectedRequest.id);
                        setShowDetails(false);
                      }}
                      className="flex-1 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-2xl flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Accept Request
                    </button>
                    <button
                      onClick={() => {
                        handleReject(selectedRequest.id);
                        setShowDetails(false);
                      }}
                      className="flex-1 py-3 border-2 border-red-200 text-red-600 font-semibold rounded-2xl flex items-center justify-center gap-2 hover:bg-red-50"
                    >
                      <XCircle className="w-5 h-5" />
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AppointmentRequests;