import { useState } from 'react';
import { 
  Calendar, 
  FileText, 
  Pill, 
  Video, 
  TrendingUp, 
  Brain, 
  ChevronRight,
  Sparkles,
  Activity,
  Heart,
  Clock,
  ArrowUpRight,
  Award,
  Bell,
  User,
  Stethoscope
} from 'lucide-react';

const PatientDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const patientName = "Kanchana";
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening";

  const stats = [
    { label: "Upcoming Appointments", value: "3", icon: Calendar, color: "emerald", trend: "+2 from last week" },
    { label: "Medical Records", value: "7", icon: FileText, color: "blue", trend: "2 new this month" },
    { label: "Active Prescriptions", value: "2", icon: Pill, color: "purple", trend: "Refill in 5 days" },
    { label: "Consultations", value: "12", icon: Video, color: "orange", trend: "+15% completion" },
  ];

  const healthData = [35, 55, 45, 70, 85, 65];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  const upcomingAppointments = [
    { 
      id: 1,
      doctor: "Dr. Cody Nguyen", 
      specialty: "Urologist", 
      date: "Tomorrow", 
      time: "10:30 AM",
      type: "video",
      status: "upcoming"
    },
    { 
      id: 2,
      doctor: "Dr. Bessie Howard", 
      specialty: "Cardiologist", 
      date: "20 Apr", 
      time: "02:00 PM",
      type: "in-person",
      status: "upcoming"
    },
    { 
      id: 3,
      doctor: "Dr. Max Bell", 
      specialty: "Psychiatrist", 
      date: "25 Apr", 
      time: "11:00 AM",
      type: "video",
      status: "upcoming"
    },
  ];

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-3xl shadow-xl overflow-auto">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header with Notifications */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide mb-1">Welcome Back</h2>
            <h1 className="text-3xl font-bold text-gray-800">
              {greeting}, {patientName} ✨
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 bg-white rounded-full px-3 py-2 shadow-md">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">{patientName}</span>
            </div>
          </div>
        </div>

        {/* Greeting Banner */}
        <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-3xl p-8 mb-10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-emerald-300" />
                <span className="text-emerald-200 text-sm font-medium">Health Summary</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                Ready for a healthy day? 🎯
              </h2>
              <p className="text-emerald-100 text-lg mb-6">
                You have <span className="font-bold text-white">{stats[0].value} upcoming appointments</span> this week.
              </p>
              <button
                onClick={() => window.location.hash = '/book-appointment'}
                className="group bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-3.5 rounded-2xl font-semibold flex items-center gap-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Book New Appointment
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="hidden lg:flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm rounded-3xl p-6">
              <div className="text-7xl mb-2">🩺</div>
              <p className="text-white text-sm font-medium">Your Health</p>
              <p className="text-emerald-200 text-xs">Partner</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-${stat.color}-50 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
              </div>
              <div>
                <p className="text-gray-600 font-medium mb-1">{stat.label}</p>
                <p className="text-xs text-emerald-600 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.trend}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Health Trend Chart */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-600" />
                  Health Trend Analysis
                </h3>
                <p className="text-sm text-gray-500 mt-1">Blood pressure & heart rate monitoring</p>
              </div>
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2 text-sm bg-gray-50 focus:outline-none focus:border-emerald-400"
              >
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
            </div>
            
            {/* Enhanced Chart */}
            <div className="relative h-80 bg-gradient-to-b from-emerald-50/50 to-white rounded-2xl p-6">
              <div className="absolute top-4 right-4 flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-gray-600">Systolic</span>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <div className="w-3 h-3 bg-emerald-300 rounded-full"></div>
                  <span className="text-gray-600">Diastolic</span>
                </div>
              </div>
              
              <div className="h-full flex items-end gap-4 pt-8">
                {healthData.map((height, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full group">
                      <div 
                        className="bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-xl transition-all duration-500 hover:from-emerald-600 hover:to-emerald-500"
                        style={{ height: `${height}px` }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {height} mmHg
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{months[idx]}</span>
                  </div>
                ))}
              </div>
              
              <div className="absolute bottom-12 left-8 text-xs text-gray-400">
                <span className="font-medium">Optimal Range:</span> 90-120 mmHg
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center text-sm text-gray-500 pt-4 border-t border-gray-100">
              <span>📊 Weekly average: 118/76 mmHg</span>
              <span className="text-emerald-600 font-medium">↓ 3% from last month</span>
            </div>
          </div>

          {/* AI Insights */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 rounded-2xl p-6 shadow-md border border-emerald-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                <Brain className="w-5 h-5 text-emerald-600" />
                AI Health Insights
              </h3>
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 mx-auto relative">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="#E5E7EB" strokeWidth="12" fill="none"/>
                    <circle 
                      cx="64" cy="64" r="56" 
                      stroke="url(#gradient)" 
                      strokeWidth="12" 
                      fill="none"
                      strokeDasharray="351.86"
                      strokeDashoffset={351.86 * 0.08}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-gray-800">92</span>
                    <span className="text-xs text-gray-500">Score</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                <Award className="w-4 h-4 text-emerald-600" />
                <p className="text-sm font-medium text-gray-700">Your Wellness Score</p>
              </div>
              
              <div className="inline-flex items-center gap-2 bg-emerald-100 px-3 py-1.5 rounded-full mb-4">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                <span className="text-emerald-700 text-sm font-semibold">+8 points from last month</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-emerald-100">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Heart Health</p>
                  <p className="font-bold text-emerald-600">Excellent</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Stress Level</p>
                  <p className="font-bold text-emerald-600">Low</p>
                </div>
              </div>
            </div>
            
            <button className="mt-6 w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group">
              <span>View Full AI Report</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Upcoming Appointments */}
          <div className="lg:col-span-12 bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  Upcoming Appointments
                </h3>
                <p className="text-sm text-gray-500 mt-1">Your scheduled consultations</p>
              </div>
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {upcomingAppointments.map((apt) => (
                <div key={apt.id} className="group relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
                  <div className="absolute top-3 right-3">
                    <div className={`w-2 h-2 rounded-full ${apt.type === 'video' ? 'bg-blue-500' : 'bg-green-500'} animate-pulse`}></div>
                  </div>
                  
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`p-2.5 rounded-xl ${apt.type === 'video' ? 'bg-blue-50' : 'bg-emerald-50'}`}>
                      {apt.type === 'video' ? (
                        <Video className={`w-5 h-5 ${apt.type === 'video' ? 'text-blue-600' : 'text-emerald-600'}`} />
                      ) : (
                        <Stethoscope className="w-5 h-5 text-emerald-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors">
                        {apt.doctor}
                      </p>
                      <p className="text-sm text-gray-500">{apt.specialty}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{apt.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{apt.time}</span>
                    </div>
                  </div>
                  
                  {apt.type === 'video' && (
                    <button className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2">
                      <Video className="w-4 h-4" />
                      Join Video Call
                    </button>
                  )}
                  
                  {apt.type === 'in-person' && (
                    <button className="w-full py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300">
                      View Details
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            {/* Quick Action */}
            <div className="mt-6 p-4 bg-emerald-50 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Need a prescription refill?</p>
                  <p className="text-xs text-gray-600">Request a renewal in just a few clicks</p>
                </div>
              </div>
              <button className="px-5 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
                Request Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;