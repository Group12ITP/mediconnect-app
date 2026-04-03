import { useState, useEffect } from 'react';

const ViewFullSchedule = () => {
  const [viewMode, setViewMode] = useState('week'); // 'week', 'month', 'day'
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 3)); // April 2026
  const [scheduleData, setScheduleData] = useState([]);
  const [filterType, setFilterType] = useState('all'); // 'all', 'confirmed', 'free'

  // Mock schedule data - In production, this would come from API
  const mockScheduleData = {
    "2026-04-01": { day: "Wednesday", slots: [] },
    "2026-04-02": { day: "Thursday", slots: [] },
    "2026-04-03": { day: "Friday", slots: [] },
    "2026-04-04": { day: "Saturday", slots: [] },
    "2026-04-05": {
      day: "Saturday",
      slots: [
        { time: "09:00", patient: "Kanchana Perera", age: 32, type: "Video", status: "confirmed", duration: 30, phone: "+94 77 123 4567" },
        { time: "10:30", patient: "Nimal Silva", age: 45, type: "Video", status: "confirmed", duration: 30, phone: "+94 77 234 5678" },
        { time: "14:00", patient: null, type: "Free", status: "free", duration: 30 },
        { time: "15:30", patient: "Dilini Rajapaksha", age: 28, type: "Video", status: "confirmed", duration: 30, phone: "+94 77 345 6789" },
      ],
    },
    "2026-04-06": {
      day: "Sunday",
      slots: [
        { time: "10:00", patient: "Ruwan Fernando", age: 38, type: "Video", status: "confirmed", duration: 30, phone: "+94 77 456 7890" },
        { time: "11:30", patient: null, type: "Free", status: "free", duration: 30 },
        { time: "13:00", patient: "Kanchana Perera", age: 32, type: "Video", status: "confirmed", duration: 30, phone: "+94 77 123 4567" },
        { time: "16:00", patient: "Amara Weerasinghe", age: 52, type: "Clinic", status: "confirmed", duration: 45, phone: "+94 77 567 8901" },
      ],
    },
    "2026-04-07": {
      day: "Monday",
      slots: [
        { time: "08:30", patient: "Nimal Silva", age: 45, type: "Video", status: "confirmed", duration: 30, phone: "+94 77 234 5678" },
        { time: "09:00", patient: null, type: "Free", status: "free", duration: 30 },
        { time: "14:00", patient: "Dilini Rajapaksha", age: 28, type: "Video", status: "confirmed", duration: 30, phone: "+94 77 345 6789" },
        { time: "16:00", patient: null, type: "Free", status: "free", duration: 30 },
      ],
    },
  };

  useEffect(() => {
    // Load schedule data based on view mode
    loadScheduleData();
  }, [viewMode, currentMonth]);

  const loadScheduleData = () => {
    // In production, fetch from API
    setScheduleData(Object.entries(mockScheduleData).map(([date, data]) => ({ date, ...data })));
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const daysArray = [];

    for (let i = 0; i < firstDay; i++) daysArray.push(null);
    for (let i = 1; i <= days; i++) {
      daysArray.push(new Date(year, month, i));
    }
    return daysArray;
  };

  const getWeekDates = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const getFilteredSlots = (slots) => {
    if (filterType === 'all') return slots;
    if (filterType === 'confirmed') return slots.filter(slot => slot.status === 'confirmed');
    if (filterType === 'free') return slots.filter(slot => slot.status === 'free');
    return slots;
  };

  const getStatusBadge = (status, type) => {
    if (status === 'confirmed') {
      return (
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-emerald-700">Confirmed</span>
          <span className="text-xs text-gray-400">{type}</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        <span className="text-xs font-medium text-gray-500">Available Slot</span>
      </div>
    );
  };

  const handleJoinCall = (patient) => {
    alert(`Initiating video call with ${patient}...`);
  };

  const handleReschedule = (time, patient) => {
    alert(`Reschedule appointment at ${time} with ${patient || 'available slot'}`);
  };

  const exportSchedule = () => {
    alert("Exporting schedule as PDF...");
  };

  const days = getDaysInMonth(currentMonth);
  const weekDates = getWeekDates();

  // Calculate statistics
  const totalAppointments = Object.values(mockScheduleData).reduce((sum, day) => 
    sum + (day.slots?.filter(slot => slot.status === 'confirmed').length || 0), 0);
  const totalFreeSlots = Object.values(mockScheduleData).reduce((sum, day) => 
    sum + (day.slots?.filter(slot => slot.status === 'free').length || 0), 0);
  const uniquePatients = new Set(Object.values(mockScheduleData).flatMap(day => 
    day.slots?.filter(slot => slot.patient).map(slot => slot.patient) || [])).size;

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                My Schedule
              </h1>
              <p className="text-gray-500 mt-1">View and manage your appointments</p>
            </div>
          </div>

          <div className="flex gap-3">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              {['day', 'week', 'month'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all capitalize ${
                    viewMode === mode 
                      ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-teal-400"
              >
                <option value="all">All Appointments</option>
                <option value="confirmed">Confirmed Only</option>
                <option value="free">Free Slots Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-2xl p-4 border border-teal-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-600 text-sm font-medium">Total Appointments</p>
                <p className="text-2xl font-bold text-teal-900">{totalAppointments}</p>
              </div>
              <div className="w-10 h-10 bg-teal-200 rounded-full flex items-center justify-center">
                <span className="text-xl">📋</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Free Slots</p>
                <p className="text-2xl font-bold text-blue-900">{totalFreeSlots}</p>
              </div>
              <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                <span className="text-xl">🕐</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-4 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Unique Patients</p>
                <p className="text-2xl font-bold text-purple-900">{uniquePatients}</p>
              </div>
              <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                <span className="text-xl">👥</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-4 border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-600 text-sm font-medium">Completion Rate</p>
                <p className="text-2xl font-bold text-amber-900">94%</p>
              </div>
              <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Calendar Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden sticky top-8">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h3 className="font-semibold">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h3>
                  <button 
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-gray-500 mb-3">
                  {weekDays.map(day => <div key={day}>{day}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {days.map((day, index) => {
                    if (!day) return <div key={index} className="h-10"></div>;
                    const dateStr = day.toISOString().split('T')[0];
                    const hasAppointments = mockScheduleData[dateStr]?.slots?.some(slot => slot.status === 'confirmed');
                    const isToday = new Date().toDateString() === day.toDateString();
                    
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedDate(day)}
                        className={`
                          relative h-10 rounded-xl flex items-center justify-center text-sm transition-all
                          ${hasAppointments ? 'bg-teal-100 text-teal-700 font-semibold' : 'hover:bg-gray-100'}
                          ${isToday ? 'ring-2 ring-teal-400' : ''}
                        `}
                      >
                        {day.getDate()}
                        {hasAppointments && (
                          <div className="absolute bottom-1 w-1 h-1 bg-teal-500 rounded-full"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Schedule View */}
          <div className="lg:col-span-9">
            {viewMode === 'day' && selectedDate && (
              <DayView 
                date={selectedDate} 
                scheduleData={mockScheduleData}
                getFilteredSlots={getFilteredSlots}
                getStatusBadge={getStatusBadge}
                handleJoinCall={handleJoinCall}
                handleReschedule={handleReschedule}
              />
            )}

            {viewMode === 'week' && (
              <WeekView 
                weekDates={weekDates}
                scheduleData={mockScheduleData}
                getFilteredSlots={getFilteredSlots}
                getStatusBadge={getStatusBadge}
                handleJoinCall={handleJoinCall}
                handleReschedule={handleReschedule}
              />
            )}

            {viewMode === 'month' && (
              <MonthView 
                scheduleData={scheduleData}
                getFilteredSlots={getFilteredSlots}
                getStatusBadge={getStatusBadge}
                handleJoinCall={handleJoinCall}
                handleReschedule={handleReschedule}
              />
            )}
          </div>
        </div>

        {/* Export Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={exportSchedule}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-2xl font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Schedule as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

// Day View Component
const DayView = ({ date, scheduleData, getFilteredSlots, getStatusBadge, handleJoinCall, handleReschedule }) => {
  const dateStr = date.toISOString().split('T')[0];
  const dayData = scheduleData[dateStr];
  const slots = getFilteredSlots(dayData?.slots || []);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </h2>
        <p className="text-gray-500 mt-1">{slots.length} appointments scheduled</p>
      </div>

      <div className="space-y-4">
        {slots.length > 0 ? slots.map((slot, idx) => (
          <AppointmentCard key={idx} slot={slot} getStatusBadge={getStatusBadge} handleJoinCall={handleJoinCall} handleReschedule={handleReschedule} />
        )) : (
          <div className="text-center py-12 text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>No appointments for this day</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Week View Component
const WeekView = ({ weekDates, scheduleData, getFilteredSlots, getStatusBadge, handleJoinCall, handleReschedule }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {weekDates.map((date, idx) => {
          const dateStr = date.toISOString().split('T')[0];
          const dayData = scheduleData[dateStr];
          const slots = getFilteredSlots(dayData?.slots || []);
          
          return (
            <div key={idx} className="bg-white min-h-[400px]">
              <div className="p-4 border-b bg-gradient-to-r from-teal-50 to-blue-50">
                <p className="font-semibold text-gray-800">{date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                <p className="text-2xl font-bold text-teal-600">{date.getDate()}</p>
                <p className="text-xs text-gray-500 mt-1">{slots.length} slots</p>
              </div>
              <div className="p-3 space-y-2 max-h-[500px] overflow-y-auto">
                {slots.map((slot, slotIdx) => (
                  <div key={slotIdx} className="text-sm p-2 bg-gray-50 rounded-lg">
                    <div className="font-mono font-bold text-teal-600">{slot.time}</div>
                    {slot.patient ? (
                      <>
                        <div className="font-medium text-gray-800 truncate">{slot.patient}</div>
                        <div className="text-xs text-gray-500">{slot.type}</div>
                      </>
                    ) : (
                      <div className="text-xs text-gray-400 italic">Available</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Month View Component
const MonthView = ({ scheduleData, getFilteredSlots, getStatusBadge, handleJoinCall, handleReschedule }) => {
  return (
    <div className="space-y-6">
      {scheduleData.map((day) => {
        const slots = getFilteredSlots(day.slots);
        if (slots.length === 0) return null;
        
        return (
          <div key={day.date} className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{day.day}</h3>
                  <p className="text-teal-100">{day.date}</p>
                </div>
                <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {slots.length} appointments
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {slots.map((slot, idx) => (
                  <AppointmentCard key={idx} slot={slot} getStatusBadge={getStatusBadge} handleJoinCall={handleJoinCall} handleReschedule={handleReschedule} />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Reusable Appointment Card Component
const AppointmentCard = ({ slot, getStatusBadge, handleJoinCall, handleReschedule }) => (
  <div className={`rounded-2xl p-5 transition-all hover:shadow-lg ${
    slot.status === 'free' 
      ? 'border-2 border-dashed border-gray-200 bg-gray-50' 
      : 'border-2 border-teal-100 bg-gradient-to-r from-white to-teal-50/30'
  }`}>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="text-center">
          <div className="font-mono text-2xl font-bold text-teal-600">{slot.time}</div>
          <div className="text-xs text-gray-400">{slot.duration} min</div>
        </div>
        
        {slot.patient ? (
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-800 text-lg">{slot.patient}</p>
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{slot.age} yrs</span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-sm text-teal-600">{slot.type} Consultation</p>
              
            </div>
          </div>
        ) : (
          <div>
            <p className="font-medium text-gray-400 italic">Available Time Slot</p>
            <p className="text-xs text-gray-400 mt-1">No patient assigned</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        
        
        {slot.status === 'confirmed' && (
            
          <div className="flex gap-2">
            
            <button
              onClick={() => handleJoinCall(slot.patient)}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-all"
            >
              Join Call
            </button>
            <button
              onClick={() => handleReschedule(slot.time, slot.patient)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-medium transition-all"
            >
              Reschedule
            </button>
          </div>
        )}
        
        {slot.status === 'free' && (
          <button
            onClick={() => handleReschedule(slot.time, null)}
            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl text-sm font-medium transition-all"
          >
            Block Slot
          </button>
        )}
      </div>
    </div>
  </div>
);

export default ViewFullSchedule;