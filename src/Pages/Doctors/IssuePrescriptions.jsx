import { useState, useRef, useEffect } from 'react';

const IssuePrescriptions = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({ name: '', dosage: '', frequency: '', days: '' });
  const [notes, setNotes] = useState('');
  const [issued, setIssued] = useState(false);
  const [signatureData, setSignatureData] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const canvasRef = useRef(null);
  const signaturePadRef = useRef(null);

  const doctorInfo = {
    name: "Dr. Kanchana Silva",
    specialization: "General Physician",
    licenseNumber: "SLMC-12345",
    hospital: "City General Hospital",
    signature: null // Will be loaded from backend in future
  };

  const myPatients = [
    { id: 1, name: "Kanchana Perera", avatar: "👩🏻", age: 32, gender: "Female", lastVisit: "2 days ago", bloodGroup: "O+" },
    { id: 2, name: "Nimal Silva", avatar: "👨🏻", age: 45, gender: "Male", lastVisit: "1 week ago", bloodGroup: "B+" },
    { id: 3, name: "Dilini Rajapaksha", avatar: "👩🏽", age: 28, gender: "Female", lastVisit: "Yesterday", bloodGroup: "A+" },
    { id: 4, name: "Ruwan Jayasinghe", avatar: "👨🏾", age: 55, gender: "Male", lastVisit: "3 days ago", bloodGroup: "AB+" },
  ];

  const commonMedicines = [
    "Amlodipine 5mg", "Atorvastatin 20mg", "Metformin 500mg",
    "Pantoprazole 40mg", "Sertraline 50mg", "Ciprofloxacin 500mg",
    "Paracetamol 500mg", "Omeprazole 20mg", "Losartan 50mg"
  ];

  // Signature Pad Functions
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0d9488';
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    setSignatureData(canvas.toDataURL());
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureData(null);
  };

  const addMedicine = () => {
    if (!newMedicine.name) return;
    setMedicines([...medicines, { ...newMedicine, id: Date.now() }]);
    setNewMedicine({ name: '', dosage: '', frequency: '', days: '' });
  };

  const removeMedicine = (id) => {
    setMedicines(medicines.filter(m => m.id !== id));
  };

  const handleIssue = () => {
    if (!selectedPatient || medicines.length === 0) {
      alert("Please select a patient and add at least one medicine.");
      return;
    }
    if (!signatureData && !doctorInfo.signature) {
      setShowSignaturePad(true);
      alert("Please add your digital signature first");
      return;
    }
    
    setIssued(true);
    setTimeout(() => {
      alert(`✅ Digital Prescription issued successfully for ${selectedPatient.name}!`);
      // Reset form
      setMedicines([]);
      setNotes('');
      setSignatureData(null);
      setShowSignaturePad(false);
      setIssued(false);
    }, 800);
  };

  const generatePrescriptionPDF = () => {
    // This would integrate with a PDF library in production
    alert("Generating PDF with digital signature...");
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 via-white to-teal-50/30 rounded-3xl p-8 overflow-auto">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Issue Digital Prescription
            </h1>
            <p className="text-gray-500 mt-1">Create and sign electronic prescriptions securely</p>
          </div>
        </div>

        {!issued ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT: Patient Selection */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden sticky top-8">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <h3 className="text-xl font-semibold">Select Patient</h3>
                  </div>
                  <p className="text-teal-100 text-sm mt-1">Choose from your recent patients</p>
                </div>
                
                <div className="p-6 space-y-3 max-h-[600px] overflow-y-auto">
                  {myPatients.map((patient) => (
                    <div
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient)}
                      className={`group relative cursor-pointer transition-all duration-300 ${
                        selectedPatient?.id === patient.id
                          ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-200'
                          : 'bg-gray-50 hover:bg-teal-50 border-2 border-transparent hover:border-teal-200'
                      } rounded-2xl p-4`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`text-5xl transition-transform group-hover:scale-110 ${
                          selectedPatient?.id === patient.id ? 'text-white' : ''
                        }`}>
                          {patient.avatar}
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
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              selectedPatient?.id === patient.id 
                                ? 'bg-white/20 text-white' 
                                : 'bg-gray-200 text-gray-600'
                            }`}>
                              {patient.bloodGroup}
                            </span>
                          </div>
                          <p className={`text-xs mt-1 ${
                            selectedPatient?.id === patient.id ? 'text-teal-100' : 'text-gray-500'
                          }`}>
                            Last visit: {patient.lastVisit}
                          </p>
                        </div>
                        {selectedPatient?.id === patient.id && (
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Prescription Builder */}
            <div className="lg:col-span-8">
              {selectedPatient ? (
                <div className="space-y-6">
                  {/* Doctor & Patient Info Bar */}
                  <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-5 border border-teal-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white text-xl">
                            👨‍⚕️
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Prescribing Doctor</p>
                            <p className="font-semibold text-gray-800">{doctorInfo.name}</p>
                            <p className="text-xs text-gray-500">{doctorInfo.specialization} • {doctorInfo.licenseNumber}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-gray-500">Patient:</span>
                          <span className="font-semibold text-gray-800">{selectedPatient.name}</span>
                        </div>
                        <p className="text-xs text-gray-500">Age: {selectedPatient.age} • Gender: {selectedPatient.gender}</p>
                      </div>
                    </div>
                  </div>

                  {/* Add Medicine Form */}
                  <div className="bg-white rounded-3xl shadow-xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 13H9L8 4z" />
                      </svg>
                      Add Medication
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="md:col-span-2">
                        <select
                          value={newMedicine.name}
                          onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                          className="w-full border-2 border-gray-200 focus:border-teal-400 rounded-xl px-4 py-3 text-sm outline-none transition-all"
                        >
                          <option value="">Select medicine</option>
                          {commonMedicines.map((med) => (
                            <option key={med} value={med}>{med}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Dosage (e.g., 5mg)"
                          value={newMedicine.dosage}
                          onChange={(e) => setNewMedicine({ ...newMedicine, dosage: e.target.value })}
                          className="w-full border-2 border-gray-200 focus:border-teal-400 rounded-xl px-4 py-3 text-sm outline-none transition-all"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Frequency (e.g., twice daily)"
                          value={newMedicine.frequency}
                          onChange={(e) => setNewMedicine({ ...newMedicine, frequency: e.target.value })}
                          className="w-full border-2 border-gray-200 focus:border-teal-400 rounded-xl px-4 py-3 text-sm outline-none transition-all"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Duration (e.g., 7 days)"
                          value={newMedicine.days}
                          onChange={(e) => setNewMedicine({ ...newMedicine, days: e.target.value })}
                          className="w-full border-2 border-gray-200 focus:border-teal-400 rounded-xl px-4 py-3 text-sm outline-none transition-all"
                        />
                      </div>
                    </div>
                    <button
                      onClick={addMedicine}
                      className="mt-4 w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-3 rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-lg"
                    >
                      + Add to Prescription
                    </button>
                  </div>

                  {/* Current Medicines List */}
                  {medicines.length > 0 && (
                    <div className="bg-white rounded-3xl shadow-xl p-6">
                      <h4 className="font-semibold text-gray-800 mb-4 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                          </svg>
                          Prescription Items ({medicines.length})
                        </span>
                      </h4>
                      <div className="space-y-3">
                        {medicines.map((med, idx) => (
                          <div key={med.id} className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-teal-50/30 rounded-xl p-4 group hover:shadow-md transition-all">
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <span className="text-teal-600 font-bold text-sm">#{idx + 1}</span>
                                <p className="font-semibold text-gray-800">{med.name}</p>
                              </div>
                              <p className="text-sm text-gray-500 mt-1 ml-6">
                                {med.dosage} • {med.frequency} • {med.days}
                              </p>
                            </div>
                            <button
                              onClick={() => removeMedicine(med.id)}
                              className="text-red-400 hover:text-red-600 transition-colors p-2"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Notes */}
                  <div className="bg-white rounded-3xl shadow-xl p-6">
                    <label className="block font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Additional Instructions
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="w-full border-2 border-gray-200 focus:border-teal-400 rounded-xl px-5 py-4 outline-none transition-all resize-none"
                      placeholder="Take after meals. Avoid alcohol. Follow up in 2 weeks..."
                    />
                  </div>

                  {/* Digital Signature Section */}
                  <div className="bg-white rounded-3xl shadow-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                        <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                        Digital Signature
                      </h4>
                      <button
                        onClick={() => setShowSignaturePad(!showSignaturePad)}
                        className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                      >
                        {showSignaturePad ? 'Hide Signature Pad' : 'Sign Here'}
                      </button>
                    </div>

                    {showSignaturePad && (
                      <div className="mb-4">
                        <div className="border-2 border-teal-200 rounded-xl overflow-hidden bg-white">
                          <canvas
                            ref={canvasRef}
                            width={600}
                            height={200}
                            className="w-full h-40 cursor-crosshair"
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                          />
                        </div>
                        <div className="flex gap-3 mt-3">
                          <button
                            onClick={clearSignature}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                          >
                            Clear Signature
                          </button>
                          {signatureData && (
                            <div className="flex-1 text-right">
                              <span className="text-xs text-green-600">✓ Signature captured</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Display saved signature */}
                    {(signatureData || doctorInfo.signature) && !showSignaturePad && (
                      <div className="mt-3 p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm text-gray-500 mb-2">Doctor's Signature:</p>
                        <img src={signatureData || doctorInfo.signature} alt="Doctor's Signature" className="h-16 object-contain" />
                      </div>
                    )}
                  </div>

                  {/* Issue Button */}
                  <button
                    onClick={handleIssue}
                    className="w-full py-5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white text-xl font-semibold rounded-2xl transition-all transform hover:scale-[1.02] shadow-xl"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Issue Digital Prescription
                    </div>
                  </button>
                </div>
              ) : (
                <div className="h-[600px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
                      <span className="text-6xl">👤</span>
                    </div>
                    <p className="text-2xl font-semibold text-gray-400">No Patient Selected</p>
                    <p className="text-gray-400 mt-2">Please select a patient to start prescribing</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Success Screen */
          <div className="flex items-center justify-center min-h-[600px]">
            <div className="text-center max-w-md mx-auto">
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-teal-400 to-teal-500 rounded-full flex items-center justify-center animate-bounce">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="absolute inset-0 w-32 h-32 mx-auto bg-teal-400 rounded-full animate-ping opacity-20"></div>
              </div>
              <h2 className="text-3xl font-bold text-teal-600 mb-3">Prescription Issued Successfully!</h2>
              <p className="text-gray-600">A digital copy has been sent to the patient's mobile number and email.</p>
              <div className="mt-6 p-4 bg-teal-50 rounded-xl">
                <p className="text-sm text-teal-800">✓ Prescription ID: RX-{Date.now().toString().slice(-8)}</p>
                <p className="text-sm text-teal-800 mt-1">✓ Digitally signed by {doctorInfo.name}</p>
              </div>
              <div className="flex gap-3 mt-8">
                <button
                  onClick={generatePrescriptionPDF}
                  className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => {
                    setIssued(false);
                    setSelectedPatient(null);
                    setMedicines([]);
                    setNotes('');
                    setSignatureData(null);
                    setShowSignaturePad(false);
                  }}
                  className="flex-1 border-2 border-teal-500 text-teal-600 py-3 rounded-xl font-semibold hover:bg-teal-50 transition-all"
                >
                  New Prescription
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssuePrescriptions;