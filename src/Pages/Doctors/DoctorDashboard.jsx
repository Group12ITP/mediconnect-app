import { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  Users,
  FileText,
  Video,
  CheckCircle,
  XCircle,
  ChevronRight,
  Sparkles,
  Activity,
  Stethoscope,
  MessageCircle,
  TrendingUp,
  Award,
  Bell,
  Search,
  Filter,
  Phone,
  Mail,
  Star,
  PieChart,
  BarChart3,
  LineChart,
  Heart,
  Brain,
  Syringe,
  AlertCircle,
  Download,
  Share2,
  MoreVertical,
  Eye,
  Trash2,
  Edit,
  Check,
  X,
  UserPlus,
  Microscope,
  Pill,
  Thermometer,
  Droplets,
  Wind,
  Zap,
  Shield,
  Target,
  Calendar as CalendarIcon,
  ChevronDown,
  Settings,
  LogOut,
  Menu
} from 'lucide-react';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  // Enhanced stats with more data
  const stats = [
    {
      label: "Today's Appointments",
      value: '4',
      icon: Calendar,
      color: 'teal',
      trend: '+2 from yesterday',
      change: '+100%',
      detail: '3 remaining'
    },
    {
      label: 'Pending Requests',
      value: '3',
      icon: Clock,
      color: 'amber',
      trend: 'Requires attention',
      change: 'urgent',
      detail: '2 high priority'
    },
    {
      label: 'Patients Today',
      value: '7',
      icon: Users,
      color: 'blue',
      trend: '3 completed',
      change: '+2',
      detail: '4 waiting'
    },
    {
      label: 'Prescriptions Issued',
      value: '12',
      icon: FileText,
      color: 'violet',
      trend: 'This week',
      change: '+15%',
      detail: '+3 from last week'
    },
  ];

  // Enhanced schedule with more details
  const todaySchedule = [
    {
      id: 1,
      time: '08:00 AM',
      patient: 'Robert Johnson',
      type: 'in-person',
      duration: '30 min',
      condition: 'Blood Pressure Check',
      status: 'completed',
      age: 58,
      lastVisit: '2024-03-10',
      medications: ['Amlodipine', 'Hydrochlorothiazide'],
      notes: 'Morning BP reading elevated'
    },
    {
      id: 2,
      time: '08:30 AM',
      patient: 'Susan Miller',
      type: 'video',
      duration: '20 min',
      condition: 'Lab Results Review',
      status: 'completed',
      age: 45,
      lastVisit: '2024-03-05',
      medications: ['Levothyroxine'],
      notes: 'Review thyroid panel results'
    },
    {
      id: 3,
      time: '09:00 AM',
      patient: 'Emma Thompson',
      type: 'video',
      duration: '30 min',
      condition: 'Follow-up',
      status: 'upcoming',
      age: 42,
      lastVisit: '2024-02-15',
      medications: ['Lisinopril', 'Metformin'],
      notes: 'Follow up on BP medication'
    },
    {
      id: 4,
      time: '09:30 AM',
      patient: 'William Davis',
      type: 'in-person',
      duration: '45 min',
      condition: 'Annual Physical',
      status: 'upcoming',
      age: 62,
      lastVisit: '2024-01-20',
      medications: ['Metformin', 'Jardiance', 'Atorvastatin'],
      notes: 'Complete physical exam and lab work'
    },
    {
      id: 5,
      time: '10:00 AM',
      patient: 'Olivia Wild',
      type: 'video',
      duration: '30 min',
      condition: 'Initial Consult',
      status: 'upcoming',
      age: 28,
      lastVisit: 'First visit',
      medications: [],
      notes: 'New patient intake'
    },
    {
      id: 6,
      time: '10:30 AM',
      patient: 'Patricia Brown',
      type: 'in-person',
      duration: '30 min',
      condition: 'Vaccination',
      status: 'upcoming',
      age: 34,
      lastVisit: '2024-02-28',
      medications: [],
      notes: 'Flu shot and COVID booster'
    },
    {
      id: 7,
      time: '11:00 AM',
      patient: 'Thomas Wilson',
      type: 'video',
      duration: '25 min',
      condition: 'Mental Health Follow-up',
      status: 'upcoming',
      age: 31,
      lastVisit: '2024-02-25',
      medications: ['Sertraline', 'Buspirone'],
      notes: 'Anxiety management review'
    },
    {
      id: 8,
      time: '11:30 AM',
      patient: 'James Wilson',
      type: 'in-person',
      duration: '45 min',
      condition: 'Physical Exam',
      status: 'upcoming',
      age: 55,
      lastVisit: '2024-03-01',
      medications: ['Atorvastatin'],
      notes: 'Annual physical'
    },
    {
      id: 9,
      time: '12:15 PM',
      patient: 'Jennifer Lee',
      type: 'video',
      duration: '20 min',
      condition: 'Medication Refill',
      status: 'upcoming',
      age: 29,
      lastVisit: '2024-02-10',
      medications: ['Birth control pills'],
      notes: 'Routine refill request'
    },
    {
      id: 10,
      time: '01:00 PM',
      patient: 'Lunch Break',
      type: 'break',
      duration: '60 min',
      condition: 'Lunch',
      status: 'break',
      age: null,
      lastVisit: null,
      medications: [],
      notes: 'Doctor lunch break'
    },
    
    
  ];

  // Enhanced pending requests
  const pendingRequests = [
    {
      id: 1,
      patient: 'Kanchana Perera',
      type: 'General Consultation',
      date: 'Tomorrow',
      time: '11:00 AM',
      priority: 'high',
      age: 34,
      condition: 'Fever & Cough',
      symptoms: ['Fever 102°F', 'Dry cough', 'Fatigue'],
      duration: '3 days'
    },
    {
      id: 2,
      patient: 'David Chen',
      type: 'Cardiology Follow-up',
      date: 'Tomorrow',
      time: '02:30 PM',
      priority: 'medium',
      age: 58,
      condition: 'Chest Pain',
      symptoms: ['Intermittent chest tightness', 'Shortness of breath'],
      duration: '1 week'
    },
    {
      id: 3,
      patient: 'Maria Garcia',
      type: 'Pediatrics',
      date: 'Day after',
      time: '10:00 AM',
      priority: 'high',
      age: 4,
      condition: 'Vaccination',
      symptoms: ['Routine checkup', 'Due for MMR vaccine'],
      duration: 'N/A'
    },
    {
      id: 4,
      patient: 'Robert Taylor',
      type: 'Dermatology',
      date: 'Day after',
      time: '03:00 PM',
      priority: 'low',
      age: 45,
      condition: 'Skin Rash',
      symptoms: ['Itchy red patches on arms', 'Dry skin'],
      duration: '2 weeks'
    },
  ];

  // Enhanced activity data
  const recentActivity = [
    { id: 1, action: 'Prescription issued', patient: 'Emily Davis', time: '15 min ago', type: 'prescription', details: 'Amoxicillin 500mg' },
    { id: 2, action: 'Lab results reviewed', patient: 'John Smith', time: '1 hour ago', type: 'lab', details: 'Blood work - Normal' },
    { id: 3, action: 'Message received', patient: 'Lisa Anderson', time: '2 hours ago', type: 'message', details: 'Question about medication' },
    { id: 4, action: 'Appointment scheduled', patient: 'Mark Wilson', time: '3 hours ago', type: 'appointment', details: 'Next week Tuesday' },
  ];

  // Chart data
  const weeklyAppointments = [12, 15, 18, 14, 20, 22, 18];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const patientConditions = [
    { name: 'Hypertension', value: 35, color: '#ef4444' },
    { name: 'Diabetes', value: 28, color: '#f59e0b' },
    { name: 'Respiratory', value: 20, color: '#10b981' },
    { name: 'Cardiac', value: 17, color: '#6366f1' },
  ];
  
  const revenueData = [4200, 4800, 5100, 4900, 5600, 6200, 5800];

  // Working search functionality
  const filteredSchedule = useMemo(() => {
    if (!searchQuery) return todaySchedule;
    return todaySchedule.filter(apt => 
      apt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.condition.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredRequests = useMemo(() => {
    let filtered = pendingRequests;
    if (searchQuery) {
      filtered = filtered.filter(req => 
        req.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.condition.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(req => req.priority === selectedFilter);
    }
    return filtered;
  }, [searchQuery, selectedFilter]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Custom chart component
  const BarChart = ({ data, labels, color, height = 200 }) => {
    const maxValue = Math.max(...data);
    return (
      <div className="relative" style={{ height: `${height}px` }}>
        <div className="absolute inset-0 flex items-end justify-between gap-2">
          {data.map((value, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="relative w-full">
                <div 
                  className="bg-gradient-to-t from-teal-500 to-teal-400 rounded-lg transition-all duration-500 hover:from-teal-600 hover:to-teal-500 cursor-pointer"
                  style={{ height: `${(value / maxValue) * height}px` }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {value} patients
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500">{labels[idx]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const PieChartSegment = ({ data }) => {
    let currentAngle = 0;
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    return (
      <div className="relative w-40 h-40 mx-auto">
        <svg className="w-full h-full transform -rotate-90">
          {data.map((item, idx) => {
            const angle = (item.value / total) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            currentAngle += angle;
            
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;
            
            const x1 = 80 + 80 * Math.cos(startRad);
            const y1 = 80 + 80 * Math.sin(startRad);
            const x2 = 80 + 80 * Math.cos(endRad);
            const y2 = 80 + 80 * Math.sin(endRad);
            
            const largeArc = angle > 180 ? 1 : 0;
            
            const pathData = `M 80 80 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`;
            
            return <path key={idx} d={pathData} fill={item.color} stroke="white" strokeWidth="2" />;
          })}
          <circle cx="80" cy="80" r="40" fill="white" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{total}</p>
            <p className="text-xs text-gray-500">Total</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto p-6 lg:p-10">
        {/* Header with working search */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full shadow-sm border border-slate-200 mb-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-slate-600">Doctor Portal</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
              {greeting}, Dr. Silva 👨‍⚕️
            </h1>
            <p className="text-slate-500 mt-1 text-lg">Here's your comprehensive practice overview</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search patients, conditions, or medications..."
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

            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-200"
              >
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full ring-2 ring-white" />
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 z-50">
                  <div className="p-4 border-b border-slate-100">
                    <h4 className="font-semibold text-slate-800">Notifications</h4>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {recentActivity.slice(0, 3).map(activity => (
                      <div key={activity.id} className="p-4 hover:bg-slate-50 cursor-pointer border-b border-slate-100">
                        <p className="text-sm font-medium text-slate-700">{activity.action}</p>
                        <p className="text-xs text-slate-500 mt-1">{activity.patient} • {activity.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-2 shadow-sm border border-slate-200">
              <div className="w-11 h-11 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-inner">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">Dr. Silva</p>
                <p className="text-xs text-slate-500">Cardiologist • ID: MED-2847</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-7 shadow-md hover:shadow-xl border border-slate-100 hover:border-teal-200 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start">
                <div className={`p-4 rounded-2xl bg-${stat.color}-50 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-7 h-7 text-${stat.color}-600`} />
                </div>
                <div className="text-right">
                  <p className="text-5xl font-bold text-slate-800 tabular-nums">{stat.value}</p>
                  {stat.change !== 'urgent' && (
                    <p className="text-xs text-teal-600 font-semibold mt-1 flex items-center gap-1 justify-end">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <p className="font-semibold text-slate-700 text-lg">{stat.label}</p>
                <p className={`text-sm mt-1 ${stat.change === 'urgent' ? 'text-red-600' : 'text-slate-500'}`}>
                  {stat.trend}
                </p>
                <p className="text-xs text-slate-400 mt-2">{stat.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section - New */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Weekly Appointments Chart */}
          <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-teal-600" />
                  Weekly Appointments
                </h3>
                <p className="text-sm text-slate-500 mt-1">Patient visits this week</p>
              </div>
              <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                <option>This Week</option>
                <option>Last Week</option>
                <option>This Month</option>
              </select>
            </div>
            <BarChart data={weeklyAppointments} labels={days} color="teal" height={200} />
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                <span className="text-slate-600">Total: {weeklyAppointments.reduce((a,b) => a+b, 0)} patients</span>
              </div>
              <span className="text-emerald-600 font-medium">↑ 12% vs last week</span>
            </div>
          </div>

          {/* Patient Conditions Distribution */}
          <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-teal-600" />
                  Patient Conditions
                </h3>
                <p className="text-sm text-slate-500 mt-1">Distribution by diagnosis</p>
              </div>
              <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <MoreVertical className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <PieChartSegment data={patientConditions} />
              <div className="flex-1 space-y-2">
                {patientConditions.map((condition, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: condition.color }}></div>
                      <span className="text-sm text-slate-600">{condition.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-slate-100 rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ width: `${condition.value}%`, backgroundColor: condition.color }}></div>
                      </div>
                      <span className="text-sm font-semibold text-slate-700">{condition.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Today's Schedule - Enhanced */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-teal-100 rounded-2xl">
                    <Calendar className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Today's Schedule</h2>
                    <p className="text-slate-500 text-sm mt-0.5">
                      {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="p-3 hover:bg-slate-100 rounded-2xl transition-colors">
                    <Filter className="w-5 h-5 text-slate-500" />
                  </button>
                  <button className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors">
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="divide-y divide-slate-100 max-h-[1540px] overflow-y-auto custom-scrollbar">
                {filteredSchedule.length > 0 ? (
                  filteredSchedule.map((appt) => (
                    <div
                      key={appt.id}
                      className="px-8 py-6 hover:bg-slate-50 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="w-20 text-center">
                            <p className="text-2xl font-bold text-slate-800 tabular-nums">
                              {appt.time.split(' ')[0]}
                            </p>
                            <p className="text-xs text-slate-500 mt-1 font-medium">
                              {appt.time.split(' ')[1]}
                            </p>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
                              👤
                            </div>

                            <div>
                              <div className="flex items-center gap-3 flex-wrap">
                                <p className="font-semibold text-slate-800 text-lg">{appt.patient}</p>
                                <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full">
                                  {appt.condition}
                                </span>
                                <span className="text-xs text-slate-400">Age: {appt.age}</span>
                              </div>
                              <div className="flex items-center gap-5 mt-2 text-sm text-slate-500">
                                <span className="flex items-center gap-1.5">
                                  <Clock className="w-4 h-4" />
                                  {appt.duration}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  {appt.type === 'video' ? (
                                    <Video className="w-4 h-4 text-blue-500" />
                                  ) : (
                                    <Users className="w-4 h-4 text-emerald-500" />
                                  )}
                                  {appt.type === 'video' ? 'Video Consultation' : 'In-Person'}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <FileText className="w-4 h-4" />
                                  Last: {appt.lastVisit === 'First visit' ? 'New Patient' : appt.lastVisit}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {appt.type === 'video' ? (
                          <button className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-2xl font-medium shadow-lg shadow-teal-200 transition-all duration-200 flex items-center gap-2 hover:scale-105">
                            <Video className="w-5 h-5" />
                            Join Call
                          </button>
                        ) : (
                          <button className="px-6 py-3 border-2 border-slate-200 hover:border-teal-600 text-slate-700 hover:text-teal-700 rounded-2xl font-medium transition-all">
                            Prepare Room
                          </button>
                        )}
                      </div>
                      
                      {appt.medications.length > 0 && (
                        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                          <Pill className="w-3 h-3" />
                          <span>Current meds: {appt.medications.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="px-8 py-12 text-center">
                    <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">No appointments found matching "{searchQuery}"</p>
                  </div>
                )}
              </div>

              {/* Quick Schedule Action */}
              <div className="px-8 py-5 bg-gradient-to-r from-slate-50 to-teal-50 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Sparkles className="w-6 h-6 text-teal-600" />
                  <div>
                    <p className="font-medium text-slate-700">Need to make changes?</p>
                    <p className="text-sm text-slate-500">Adjust availability or block time</p>
                  </div>
                </div>
                <button className="px-6 py-2.5 bg-white border border-slate-200 hover:border-teal-500 text-teal-600 rounded-2xl font-medium transition-all">
                  Manage Schedule
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - Enhanced */}
          <div className="lg:col-span-5 space-y-6">
            {/* Pending Requests with Filter */}
            <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-amber-500" />
                    <div>
                      <h3 className="font-semibold text-slate-800">Pending Requests</h3>
                      <p className="text-xs text-slate-500">Action required</p>
                    </div>
                  </div>
                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {filteredRequests.length} pending
                  </span>
                </div>
                
                {/* Filter tabs */}
                <div className="flex gap-2 mt-3">
                  {['all', 'high', 'medium', 'low'].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                        selectedFilter === filter 
                          ? 'bg-teal-600 text-white' 
                          : 'bg-white text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="max-h-[460px] overflow-y-auto custom-scrollbar divide-y divide-slate-100">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((req) => (
                    <div key={req.id} className="p-6 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-slate-800">{req.patient}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityColor(req.priority)}`}>
                              {req.priority}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 mt-1">{req.type}</p>
                        </div>
                        <div className="text-right text-xs text-slate-500">
                          <p>{req.date}</p>
                          <p className="font-medium">{req.time}</p>
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-slate-500 space-y-1">
                        <div className="flex items-center gap-2">
                          <Thermometer className="w-3 h-3" />
                          <span>Age: {req.age} • Duration: {req.duration}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-3 h-3 mt-0.5" />
                          <span>Symptoms: {req.symptoms.join(', ')}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <button className="flex-1 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-2xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Accept
                        </button>
                        <button className="flex-1 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-2xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                          <XCircle className="w-4 h-4" />
                          Decline
                        </button>
                        <button className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl transition-colors">
                          <MessageCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <CheckCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">No pending requests found</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity - Enhanced */}
            <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800 flex items-center gap-3">
                  <Activity className="w-6 h-6 text-teal-600" />
                  Recent Activity
                </h3>
              </div>

              <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto custom-scrollbar">
                {recentActivity.map((act) => (
                  <div key={act.id} className="px-6 py-4 flex gap-4 hover:bg-slate-50 transition-colors">
                    <div
                      className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center ${
                        act.type === 'prescription'
                          ? 'bg-violet-100'
                          : act.type === 'lab'
                          ? 'bg-blue-100'
                          : act.type === 'appointment'
                          ? 'bg-emerald-100'
                          : 'bg-teal-100'
                      }`}
                    >
                      {act.type === 'prescription' ? (
                        <Pill className="w-5 h-5 text-violet-600" />
                      ) : act.type === 'lab' ? (
                        <Microscope className="w-5 h-5 text-blue-600" />
                      ) : act.type === 'appointment' ? (
                        <CalendarIcon className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <MessageCircle className="w-5 h-5 text-teal-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 text-sm">{act.action}</p>
                      <p className="text-xs text-slate-500">{act.patient}</p>
                      {act.details && <p className="text-xs text-slate-400 mt-1">{act.details}</p>}
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap">{act.time}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-3xl">
                <button className="w-full py-2 text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors">
                  View Complete Activity Log →
                </button>
              </div>
            </div>

            {/* Performance Card - Enhanced */}
            <div className="bg-gradient-to-br from-teal-600 via-cyan-600 to-sky-600 rounded-3xl p-6 text-white shadow-xl">
              <div className="flex justify-between items-start">
                <div>
                  <Award className="w-8 h-8 text-teal-200" />
                  <p className="text-5xl font-bold mt-4 tabular-nums">94%</p>
                  <p className="text-teal-100 mt-1">Patient Satisfaction</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-white/20 text-xs rounded-full">This Month</span>
                </div>
              </div>

              <div className="mt-6 bg-white/20 h-2.5 rounded-full overflow-hidden">
                <div className="bg-white h-2.5 rounded-full w-[94%]" />
              </div>

              <div className="flex justify-between text-sm mt-3 text-teal-100">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" /> 4.8/5
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />12% vs last month
                </span>
              </div>
              
              <div className="mt-6 pt-4 border-t border-white/20 grid grid-cols-2 gap-3 text-center text-sm">
                <div>
                  <p className="text-teal-200">Response Time</p>
                  <p className="font-semibold">4.2 min</p>
                </div>
                <div>
                  <p className="text-teal-200">Follow-ups</p>
                  <p className="font-semibold">96%</p>
                </div>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-6">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-slate-50 rounded-2xl">
                  <Heart className="w-5 h-5 text-red-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-slate-800">156</p>
                  <p className="text-xs text-slate-500">Total Patients</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-2xl">
                  <Syringe className="w-5 h-5 text-teal-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-slate-800">89</p>
                  <p className="text-xs text-slate-500">Vaccinations</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-2xl">
                  <Brain className="w-5 h-5 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-slate-800">24</p>
                  <p className="text-xs text-slate-500">Specialists</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-2xl">
                  <Shield className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-slate-800">98%</p>
                  <p className="text-xs text-slate-500">Insurance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #94a3b8;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </div>
  );
};

export default DoctorDashboard;