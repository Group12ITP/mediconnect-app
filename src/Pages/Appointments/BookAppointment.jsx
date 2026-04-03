import { useState, useEffect } from 'react';
import { specialties, doctorsWithAvailability } from '../../data/appointmentData';

const BookAppointment = () => {
  const [step, setStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [paymentDone, setPaymentDone] = useState(false);
  const [appointmentId, setAppointmentId] = useState('');
  const [animated, setAnimated] = useState(false);

  const progress = Math.round(((step - 1) / 4) * 100);

  useEffect(() => {
    setAnimated(true);
    const timer = setTimeout(() => setAnimated(false), 500);
    return () => clearTimeout(timer);
  }, [step]);

  // Progress Steps Component
  const ProgressSteps = () => (
    <div className="mb-12">
      <div className="flex justify-between mb-4">
        {['Specialty', 'Doctor', 'Schedule', 'Payment', 'Confirm'].map((label, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
              ${step > idx + 1 ? 'bg-emerald-600 text-white' : 
                step === idx + 1 ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-200 ring-4 ring-emerald-100' : 
                'bg-gray-100 text-gray-400'}
            `}>
              {step > idx + 1 ? '✓' : idx + 1}
            </div>
            <span className={`text-xs mt-2 font-medium ${step === idx + 1 ? 'text-emerald-600' : 'text-gray-400'}`}>
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );

  // Step 1: Choose Specialty
  if (step === 1) {
    return (
      <div className="min-h-full bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 rounded-3xl p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <ProgressSteps />

          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl mb-6 shadow-lg">
              <span className="text-5xl">👨‍⚕️</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
              Find Your Perfect Doctor
            </h1>
            <p className="text-gray-500 text-lg">Select a specialty to get started with your health journey</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {specialties.map((spec, idx) => (
              <button
                key={spec.id}
                onClick={() => {
                  setSelectedSpecialty(spec);
                  setStep(2);
                }}
                className="group relative bg-white rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-emerald-200"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {spec.icon}
                </div>
                <h3 className="font-semibold text-gray-800 text-lg mb-2">{spec.name}</h3>
                <p className="text-emerald-600 text-xs font-medium">{spec.count} doctors available</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Select Doctor
  if (step === 2) {
    const filteredDoctors = doctorsWithAvailability.filter(
      (d) => d.specialty === selectedSpecialty.name
    );

    return (
      <div className="min-h-full bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 rounded-3xl p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <ProgressSteps />
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setStep(1)} 
                className="group flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-2xl hover:border-emerald-400 hover:shadow-lg transition-all"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-medium">Back</span>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Choose Your Doctor</h1>
                <p className="text-gray-500 mt-1">{selectedSpecialty.name} • {filteredDoctors.length} specialists available</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor, idx) => (
              <div
                key={doctor.id}
                onClick={() => {
                  setSelectedDoctor(doctor);
                  setStep(3);
                }}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative p-6">
                  {/* Availability Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-emerald-700">Available</span>
                    </div>
                  </div>

                  {/* Doctor Avatar */}
                  <div className="flex justify-center mb-4">
                    <div className="w-28 h-28 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl flex items-center justify-center text-6xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      {doctor.avatar}
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{doctor.name}</h3>
                    <p className="text-emerald-600 font-medium text-sm">{doctor.specialty}</p>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Experience</span>
                      <span className="font-medium text-gray-700">{doctor.experience}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Location</span>
                      <span className="font-medium text-gray-700">{doctor.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Fee</span>
                      <span className="font-bold text-emerald-600 text-lg">LKR {doctor.price}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Next available</span>
                      <span className="text-emerald-600 font-medium">{doctor.nextAvailable}</span>
                    </div>
                  </div>

                  <button className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                    Select Doctor →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Date & Time Selection
  if (step === 3 && selectedDoctor) {
    const dates = Object.keys(selectedDoctor.availability);
    const currentDateSlots = selectedDate ? selectedDoctor.availability[selectedDate] || [] : [];
    const booked = selectedDate ? selectedDoctor.bookedSlots[selectedDate] || [] : [];
    
    const timeSlots = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

    return (
      <div className="min-h-full bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 rounded-3xl p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <ProgressSteps />
          
          <button onClick={() => setStep(2)} className="group flex items-center gap-2 mb-6 text-emerald-600 font-medium hover:gap-3 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to doctors
          </button>

          <div className="grid grid-cols-12 gap-8">
            {/* Doctor Info Card */}
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-gradient-to-br from-white to-emerald-50 rounded-3xl p-6 shadow-xl sticky top-8">
                <div className="flex justify-center mb-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl flex items-center justify-center text-7xl shadow-xl">
                    {selectedDoctor.avatar}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">{selectedDoctor.name}</h2>
                <p className="text-emerald-600 text-center font-medium">{selectedDoctor.specialty}</p>
                
                <div className="mt-6 space-y-3 p-4 bg-white rounded-2xl">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Consultation Fee</span>
                    <span className="font-bold text-emerald-600 text-lg">LKR {selectedDoctor.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Experience</span>
                    <span className="text-gray-700">{selectedDoctor.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location</span>
                    <span className="text-gray-700">{selectedDoctor.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar Section */}
            <div className="col-span-12 lg:col-span-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Select Your Schedule</h3>
                
                {/* Date Selection */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Choose a Date</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
                    {dates.map((date) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`group text-center py-4 rounded-2xl transition-all duration-300 ${
                          selectedDate === date
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-200 scale-105'
                            : 'bg-gray-50 hover:bg-emerald-50 border-2 border-transparent hover:border-emerald-200 text-gray-700'
                        }`}
                      >
                        <div className="text-xs opacity-80">
                          {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="text-2xl font-bold mt-1">
                          {new Date(date).getDate()}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div className="animate-fadeIn">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Available Time Slots</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {timeSlots.map((time) => {
                        const isAvailable = currentDateSlots.includes(time);
                        const isBooked = booked.includes(time);
                        return (
                          <button
                            key={time}
                            disabled={!isAvailable}
                            onClick={() => setSelectedTime(time)}
                            className={`
                              py-4 text-center rounded-2xl font-semibold transition-all duration-300
                              ${isBooked 
                                ? 'bg-red-50 text-red-400 line-through cursor-not-allowed border border-red-200'
                                : isAvailable
                                  ? selectedTime === time
                                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-200 transform scale-105'
                                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:scale-105 cursor-pointer'
                                  : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                              }
                            `}
                          >
                            {time}
                            {isBooked && <span className="block text-xs">Booked</span>}
                            {isAvailable && !isBooked && selectedTime !== time && <span className="block text-xs">Available</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <button
                  disabled={!selectedTime}
                  onClick={() => setStep(4)}
                  className="mt-10 w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-300 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg"
                >
                  Continue to Payment →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 4: Payment
  if (step === 4) {
    return (
      <div className="min-h-full bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 rounded-3xl p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <ProgressSteps />
          
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mt-8">
            {/* Payment Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white text-center">
              <div className="text-5xl mb-3">💳</div>
              <h2 className="text-2xl font-bold">Secure Payment</h2>
              <p className="text-emerald-100 text-sm mt-1">SSL Encrypted Transaction</p>
            </div>

            <div className="p-8">
              {/* Amount */}
              <div className="bg-emerald-50 rounded-2xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Consultation Fee</span>
                  <div>
                    <span className="text-2xl font-bold text-emerald-600">LKR {selectedDoctor.price}</span>
                    <span className="text-gray-500 text-sm ml-1">+0 tax</span>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="4242 4242 4242 4242" 
                      className="w-full border-2 border-gray-200 focus:border-emerald-400 rounded-2xl p-4 pl-12 text-lg outline-none transition-all"
                    />
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                    <input 
                      type="text" 
                      placeholder="MM / YY" 
                      className="w-full border-2 border-gray-200 focus:border-emerald-400 rounded-2xl p-4 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                    <input 
                      type="text" 
                      placeholder="123" 
                      className="w-full border-2 border-gray-200 focus:border-emerald-400 rounded-2xl p-4 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <div className="flex gap-2">
                    <div className="w-10 h-6 bg-blue-600 rounded"></div>
                    <div className="w-10 h-6 bg-red-600 rounded"></div>
                    <div className="w-10 h-6 bg-orange-500 rounded"></div>
                  </div>
                  <span className="text-xs text-gray-400">We accept all major cards</span>
                </div>

                <button
                  onClick={() => {
                    setPaymentDone(true);
                    setAppointmentId(`APPT-${Date.now().toString().slice(-8)}`);
                    setStep(5);
                  }}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-5 rounded-2xl font-bold text-xl mt-6 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Pay LKR {selectedDoctor.price}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>256-bit SSL Secure Encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 5: Success
  if (step === 5) {
    return (
      <div className="min-h-full bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 rounded-3xl p-8 flex items-center justify-center">
        <div className="max-w-lg w-full text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 animate-fadeInUp">
            {/* Success Animation */}
            <div className="relative mb-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="absolute inset-0 w-32 h-32 mx-auto bg-emerald-400 rounded-full animate-ping opacity-20"></div>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-2">Appointment Confirmed! 🎉</h1>
            <p className="text-gray-500">Your appointment has been successfully booked</p>

            {/* Receipt Card */}
            <div className="mt-8 bg-gradient-to-br from-gray-50 to-emerald-50 rounded-2xl p-6 text-left">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">Appointment ID</span>
                <span className="font-mono font-bold text-emerald-600">{appointmentId}</span>
              </div>
              
              <div className="border-t border-dashed border-gray-200 my-4"></div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Doctor</span>
                  <span className="font-semibold text-gray-800">{selectedDoctor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Specialty</span>
                  <span className="text-gray-800">{selectedDoctor.specialty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-semibold text-gray-800">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="font-semibold text-gray-800">{selectedTime}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-600">Amount Paid</span>
                  <span className="font-bold text-emerald-600 text-lg">LKR {selectedDoctor.price}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => alert('Receipt downloaded as PDF')}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 rounded-2xl font-semibold transition-all hover:scale-105"
              >
                📄 Download Receipt
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex-1 border-2 border-emerald-500 text-emerald-600 py-4 rounded-2xl font-semibold hover:bg-emerald-50 transition-all"
              >
                Book Another
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">A confirmation has been sent to your email</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default BookAppointment;

// Add this to your global CSS or tailwind.config.js
// @keyframes fadeInUp {
//   from {
//     opacity: 0;
//     transform: translateY(30px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }
// 
// .animate-fadeInUp {
//   animation: fadeInUp 0.6s ease-out;
// }