import { useState, useEffect } from 'react';

const SetAvailability = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [availability, setAvailability] = useState({});
  const [maxPatients, setMaxPatients] = useState({}); // { "2026-04-05_09:00": 5 }
  const [viewMode, setViewMode] = useState('current'); // 'current' or 'other'
  
  const currentMonth = new Date();
  const isCurrentMonth = currentDate.getMonth() === currentMonth.getMonth() && 
                         currentDate.getFullYear() === currentMonth.getFullYear();
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  const maxPatientOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Get days in month
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

  const days = getDaysInMonth(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const toggleTimeSlot = (dateStr, time, maxPatientsValue) => {
    if (!isCurrentMonth) {
      alert("You can only modify availability for the current month");
      return;
    }
    
    setAvailability((prev) => {
      const current = prev[dateStr] || [];
      if (current.includes(time)) {
        // Remove slot
        const newAvailability = { ...prev, [dateStr]: current.filter(t => t !== time) };
        // Remove max patients setting for this slot
        const slotKey = `${dateStr}_${time}`;
        const newMaxPatients = { ...maxPatients };
        delete newMaxPatients[slotKey];
        setMaxPatients(newMaxPatients);
        return newAvailability;
      } else {
        // Add slot with default max patients
        const newAvailability = { ...prev, [dateStr]: [...current, time] };
        const slotKey = `${dateStr}_${time}`;
        setMaxPatients(prev => ({ ...prev, [slotKey]: maxPatientsValue || 5 }));
        return newAvailability;
      }
    });
  };

  const updateMaxPatients = (dateStr, time, value) => {
    if (!isCurrentMonth) return;
    const slotKey = `${dateStr}_${time}`;
    setMaxPatients(prev => ({ ...prev, [slotKey]: value }));
  };

  const getSlotStatus = (dateStr, time) => {
    const slotKey = `${dateStr}_${time}`;
    const max = maxPatients[slotKey] || 5;
    const booked = 0; // This would come from appointments data in production
    const available = max - booked;
    return { max, booked, available };
  };

  const saveAvailability = () => {
    if (!isCurrentMonth) {
      alert("You can only save availability for the current month");
      return;
    }
    
    const totalSlots = Object.values(availability).reduce((sum, slots) => sum + slots.length, 0);
    alert(`✅ Availability saved successfully!\n\n📊 Summary:\n• ${Object.keys(availability).length} days with availability\n• ${totalSlots} total time slots configured\n• Average ${(totalSlots / Object.keys(availability).length || 0).toFixed(1)} slots per day`);
    console.log("Saved Availability:", availability);
    console.log("Saved Max Patients:", maxPatients);
  };

  const clearAllAvailability = () => {
    if (window.confirm("Are you sure you want to clear all availability for this month?")) {
      setAvailability({});
      setMaxPatients({});
    }
  };

  const copyPreviousMonth = () => {
    alert("This would copy availability from previous month (integration with backend)");
  };

  const selectedDateStr = selectedDate ? selectedDate.toISOString().split('T')[0] : null;
  const selectedSlots = selectedDateStr ? availability[selectedDateStr] || [] : [];

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
                Manage Availability
              </h1>
              <p className="text-gray-500 mt-1">Set your working hours and patient limits</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            {isCurrentMonth && (
              <>
                <button
                  onClick={copyPreviousMonth}
                  className="px-6 py-3 bg-white border-2 border-teal-200 hover:border-teal-400 text-teal-600 rounded-xl font-medium transition-all hover:shadow-lg"
                >
                  Copy from Previous
                </button>
                <button
                  onClick={clearAllAvailability}
                  className="px-6 py-3 bg-white border-2 border-red-200 hover:border-red-400 text-red-600 rounded-xl font-medium transition-all hover:shadow-lg"
                >
                  Clear All
                </button>
              </>
            )}
            <button
              onClick={saveAvailability}
              className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Save Schedule
            </button>
          </div>
        </div>

        {/* Info Banner */}
        {!isCurrentMonth && (
          <div className="mb-6 bg-amber-50 border-l-4 border-amber-400 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-amber-800 text-sm">
                View-only mode: You can only modify availability for the current month ({monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()})
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              {/* Calendar Header */}
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={handlePrevMonth} 
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h2 className="text-2xl font-bold">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  <button 
                    onClick={handleNextMonth} 
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Calendar Body */}
              <div className="p-6">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-gray-500 mb-3">
                  {weekDays.map(day => <div key={day}>{day}</div>)}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {days.map((day, index) => {
                    if (!day) return <div key={index} className="h-24"></div>;
                    
                    const dateStr = day.toISOString().split('T')[0];
                    const isSelected = selectedDateStr === dateStr;
                    const hasSlots = availability[dateStr] && availability[dateStr].length > 0;
                    const isToday = new Date().toDateString() === day.toDateString();
                    const isPast = day < new Date().setHours(0, 0, 0, 0);
                    
                    let slotCount = 0;
                    if (hasSlots) {
                      slotCount = availability[dateStr].length;
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedDate(day)}
                        disabled={isPast && !isCurrentMonth}
                        className={`
                          relative h-24 rounded-2xl transition-all duration-300
                          ${isSelected 
                            ? 'bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg transform scale-105' 
                            : hasSlots 
                              ? 'bg-teal-50 hover:bg-teal-100 border-2 border-teal-200' 
                              : isPast && !isCurrentMonth
                                ? 'bg-gray-100 cursor-not-allowed opacity-50'
                                : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-gray-200'
                          }
                        `}
                      >
                        <div className="flex flex-col items-center">
                          <span className={`text-lg font-semibold ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                            {day.getDate()}
                          </span>
                          {isToday && (
                            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full mt-1 ${isSelected ? 'bg-white/30' : 'bg-teal-100 text-teal-600'}`}>
                              Today
                            </span>
                          )}
                          {hasSlots && (
                            <div className={`text-xs mt-1 font-medium ${isSelected ? 'text-teal-100' : 'text-teal-600'}`}>
                              {slotCount} slot{slotCount !== 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Time Slots Panel */}
          <div className="lg:col-span-5">
            {selectedDate ? (
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden sticky top-8">
                <div className={`p-6 ${isCurrentMonth ? 'bg-gradient-to-r from-teal-500 to-teal-600' : 'bg-gradient-to-r from-gray-500 to-gray-600'} text-white`}>
                  <h3 className="text-2xl font-bold">
                    {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </h3>
                  <p className="text-white/80 text-sm mt-1">
                    {isCurrentMonth ? 'Select available time slots and set patient limits' : 'View-only mode'}
                  </p>
                </div>

                <div className="p-6">
                  {/* Time Slots Grid */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-700">Time Slots</label>
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((time) => {
                        const isSelected = selectedSlots.includes(time);
                        const slotKey = `${selectedDateStr}_${time}`;
                        const { max, available } = getSlotStatus(selectedDateStr, time);
                        
                        return (
                          <div key={time} className="relative">
                            <button
                              onClick={() => toggleTimeSlot(selectedDateStr, time, 5)}
                              disabled={!isCurrentMonth}
                              className={`
                                w-full py-4 text-center rounded-xl font-medium transition-all duration-300
                                ${isSelected 
                                  ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg' 
                                  : 'bg-gray-100 hover:bg-teal-100 text-gray-700'
                                }
                                ${!isCurrentMonth && 'cursor-not-allowed opacity-60'}
                              `}
                            >
                              {time}
                            </button>
                            
                            {isSelected && isCurrentMonth && (
                              <div className="mt-2">
                                <label className="block text-xs text-gray-600 mb-1">Max Patients</label>
                                <select
                                  value={max}
                                  onChange={(e) => updateMaxPatients(selectedDateStr, time, parseInt(e.target.value))}
                                  className="w-full px-3 py-2 border-2 border-teal-200 rounded-lg text-sm outline-none focus:border-teal-400"
                                >
                                  {maxPatientOptions.map(opt => (
                                    <option key={opt} value={opt}>{opt} patients</option>
                                  ))}
                                </select>
                                <p className="text-xs text-green-600 mt-1">
                                  {available} slots available
                                </p>
                              </div>
                            )}
                            
                            {!isSelected && !isCurrentMonth && (
                              <p className="text-xs text-center text-gray-400 mt-1">Unavailable</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Selected Slots Summary */}
                  {selectedSlots.length > 0 && (
                    <div className="mt-8 pt-6 border-t-2 border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold text-gray-700">Selected Slots</p>
                        <span className="text-xs bg-teal-100 text-teal-600 px-2 py-1 rounded-full">
                          {selectedSlots.length} slots
                        </span>
                      </div>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {selectedSlots.map((slot) => {
                          const slotKey = `${selectedDateStr}_${slot}`;
                          const max = maxPatients[slotKey] || 5;
                          return (
                            <div key={slot} className="flex items-center justify-between bg-teal-50 rounded-xl p-3">
                              <div>
                                <span className="font-medium text-gray-800">{slot}</span>
                                <p className="text-xs text-gray-500">Max: {max} patients</p>
                              </div>
                              {isCurrentMonth && (
                                <button
                                  onClick={() => toggleTimeSlot(selectedDateStr, slot, 5)}
                                  className="text-red-400 hover:text-red-600"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center mb-6">
                  <span className="text-5xl">📅</span>
                </div>
                <p className="text-xl font-semibold text-gray-600">No Date Selected</p>
                <p className="text-gray-400 mt-2">Click on a date from the calendar to set your availability</p>
              </div>
            )}
          </div>
        </div>

        {/* Monthly Summary */}
        <div className="mt-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-3xl p-6 border border-teal-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Days with Availability</p>
              <p className="text-3xl font-bold text-teal-600">{Object.keys(availability).length}</p>
              <p className="text-xs text-gray-400 mt-1">this month</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Time Slots</p>
              <p className="text-3xl font-bold text-teal-600">
                {Object.values(availability).reduce((sum, slots) => sum + slots.length, 0)}
              </p>
              <p className="text-xs text-gray-400 mt-1">across all days</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Average Slots/Day</p>
              <p className="text-3xl font-bold text-teal-600">
                {Object.keys(availability).length > 0 
                  ? (Object.values(availability).reduce((sum, slots) => sum + slots.length, 0) / Object.keys(availability).length).toFixed(1)
                  : '0'}
              </p>
              <p className="text-xs text-gray-400 mt-1">when available</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Patient Capacity</p>
              <p className="text-3xl font-bold text-teal-600">
                {Object.entries(maxPatients).reduce((sum, [key, value]) => sum + value, 0)}
              </p>
              <p className="text-xs text-gray-400 mt-1">across all slots</p>
            </div>
          </div>
          
          {!isCurrentMonth && (
            <div className="mt-4 pt-4 border-t border-teal-200">
              <p className="text-sm text-amber-600 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                View-only mode: You are viewing {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetAvailability;