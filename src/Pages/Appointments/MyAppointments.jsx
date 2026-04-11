import { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import html2pdf from 'html2pdf.js';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const headers = () => {
  const token = localStorage.getItem('patientToken');
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
};

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [toast, setToast] = useState(null);
  const [generatingReceipt, setGeneratingReceipt] = useState(false);
  const { t } = useLanguage();

  const showToast = (type, msg) => { setToast({ type, msg }); setTimeout(() => setToast(null), 4000); };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/appointments/mine`, { headers: headers() });
      const json = await res.json();
      if (json.success) setAppointments(json.data);
    } catch { showToast('error', 'Failed to load appointments'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAppointments(); }, []);

  // Check Stripe return
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    if (sessionId) {
      fetch(`${API}/appointments/verify-payment?session_id=${sessionId}`)
        .then(r => r.json())
        .then(json => {
          if (json.success) {
            showToast('success', `✅ Appointment booked! ID: ${json.data.appointmentId}`);
            fetchAppointments();
            window.history.replaceState({}, '', window.location.pathname);
          }
        });
    }
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return;
    try {
      const res = await fetch(`${API}/appointments/${id}/cancel`, { method: 'PATCH', headers: headers() });
      const json = await res.json();
      if (json.success) {
        setAppointments(prev => prev.map(a => a._id === id ? { ...a, status: 'cancelled' } : a));
        showToast('success', 'Appointment cancelled');
      } else showToast('error', json.message);
    } catch { showToast('error', 'Error cancelling'); }
  };

  const handleJoinVideo = (apt) => {
    if (!apt.videoRoomId) return showToast('error', 'Video room not ready yet. Doctor must confirm first.');
    window.open(`https://meet.jit.si/${apt.videoRoomId}`, '_blank');
  };

  // Generate Receipt PDF using html2pdf
  const generateReceiptPDF = async (appointment) => {
    setGeneratingReceipt(true);
    try {
      showToast('info', 'Generating receipt...');
      
      // Create a temporary container
      const element = document.createElement('div');
      element.style.padding = '40px';
      element.style.backgroundColor = 'white';
      element.style.fontFamily = "'Helvetica', 'Arial', sans-serif";
      element.style.maxWidth = '800px';
      element.style.margin = '0 auto';
      element.style.lineHeight = '1.6';
      
      // Format dates
      const currentDate = new Date().toLocaleString();
      const appointmentDate = new Date(appointment.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      // Generate receipt HTML
      element.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="display: inline-block; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">🏥</div>
            <h1 style="color: #0d9488; margin-bottom: 5px; font-size: 28px; font-weight: bold;">MediConnect</h1>
            <p style="color: #6b7280; font-size: 12px;">Healthcare Management System</p>
          </div>
          <div style="margin-top: 20px; padding: 10px; background: linear-gradient(135deg, #0d9488, #0f766e); color: white; border-radius: 8px;">
            <h2 style="font-size: 20px; margin: 0;">PAYMENT RECEIPT</h2>
          </div>
        </div>
        
        <!-- Receipt Info -->
        <div style="display: flex; justify-content: space-between; margin-bottom: 30px; padding: 15px; background: #f9fafb; border-radius: 8px;">
          <div>
            <p style="color: #6b7280; font-size: 11px; margin-bottom: 5px;">RECEIPT NO</p>
            <p style="font-weight: bold; font-size: 14px;">${appointment.appointmentId || appointment._id}</p>
          </div>
          <div style="text-align: right;">
            <p style="color: #6b7280; font-size: 11px; margin-bottom: 5px;">DATE & TIME</p>
            <p style="font-weight: 500; font-size: 13px;">${currentDate}</p>
          </div>
        </div>
        
        <!-- Appointment Details -->
        <div style="margin-bottom: 25px;">
          <h3 style="color: #374151; margin-bottom: 15px; font-size: 16px; font-weight: bold; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">📋 Appointment Details</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div>
              <p style="color: #6b7280; font-size: 11px;">Appointment ID</p>
              <p style="font-weight: 600;">${appointment.appointmentId || 'N/A'}</p>
            </div>
            <div>
              <p style="color: #6b7280; font-size: 11px;">Status</p>
              <p style="font-weight: 600; color: ${appointment.status === 'completed' ? '#10b981' : '#f59e0b'};">${appointment.status.toUpperCase()}</p>
            </div>
            <div>
              <p style="color: #6b7280; font-size: 11px;">Appointment Date</p>
              <p style="font-weight: 600;">${appointmentDate}</p>
            </div>
            <div>
              <p style="color: #6b7280; font-size: 11px;">Appointment Time</p>
              <p style="font-weight: 600;">${appointment.time}</p>
            </div>
            <div>
              <p style="color: #6b7280; font-size: 11px;">Consultation Type</p>
              <p style="font-weight: 600;">${appointment.type || 'Video'} Consultation</p>
            </div>
          </div>
        </div>
        
        <!-- Doctor Information -->
        <div style="margin-bottom: 25px;">
          <h3 style="color: #374151; margin-bottom: 15px; font-size: 16px; font-weight: bold; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">👨‍⚕️ Doctor Information</h3>
          <div style="background: #f0fdf4; padding: 15px; border-radius: 8px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div>
                <p style="color: #6b7280; font-size: 11px;">Doctor Name</p>
                <p style="font-weight: 600; font-size: 15px;">${appointment.doctor?.name || 'N/A'}</p>
              </div>
              <div>
                <p style="color: #6b7280; font-size: 11px;">Specialization</p>
                <p>${appointment.specialty || appointment.doctor?.specialization || 'N/A'}</p>
              </div>
              ${appointment.doctor?.hospital ? `
              <div>
                <p style="color: #6b7280; font-size: 11px;">Hospital/Clinic</p>
                <p>${appointment.doctor.hospital}</p>
              </div>
              ` : ''}
              ${appointment.doctor?.licenseNumber ? `
              <div>
                <p style="color: #6b7280; font-size: 11px;">License Number</p>
                <p>${appointment.doctor.licenseNumber}</p>
              </div>
              ` : ''}
            </div>
          </div>
        </div>
        
       
        
        ${appointment.reason ? `
        <div style="margin-bottom: 25px;">
          <h3 style="color: #374151; margin-bottom: 10px; font-size: 14px; font-weight: bold;">📝 Reason for Visit</h3>
          <div style="background: #fffbeb; padding: 12px; border-radius: 8px;">
            <p style="font-size: 13px;">${appointment.reason}</p>
          </div>
        </div>
        ` : ''}
        
        <!-- Payment Summary -->
        <div style="margin-bottom: 25px;">
          <h3 style="color: #374151; margin-bottom: 15px; font-size: 16px; font-weight: bold; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">💰 Payment Summary</h3>
          <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); padding: 20px; border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span>Consultation Fee</span>
              <span><strong>LKR ${appointment.consultationFee?.toLocaleString() || '0'}</strong></span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span>Service Charge</span>
              <span>LKR 0.00</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span>Tax (GST)</span>
              <span>LKR 0.00</span>
            </div>
            <div style="border-top: 2px dashed #d1d5db; margin: 10px 0; padding-top: 10px;">
              <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold;">
                <span>TOTAL AMOUNT</span>
                <span style="color: #0d9488;">LKR ${appointment.consultationFee?.toLocaleString() || '0'}</span>
              </div>
            </div>
            <div style="margin-top: 15px; text-align: center;">
              <span style="background: #10b981; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px;">✓ PAID</span>
            </div>
          </div>
        </div>
        
        <!-- Payment Details -->
        <div style="margin-bottom: 25px;">
          <h3 style="color: #374151; margin-bottom: 10px; font-size: 14px; font-weight: bold;">💳 Payment Details</h3>
          <div style="background: #f9fafb; padding: 12px; border-radius: 8px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <div>
                <p style="color: #6b7280; font-size: 10px;">Payment Method</p>
                <p style="font-size: 13px;">Credit / Debit Card (Stripe)</p>
              </div>
              <div>
                <p style="color: #6b7280; font-size: 10px;">Payment Status</p>
                <p style="color: #10b981; font-weight: 600; font-size: 13px;">${appointment.paymentStatus?.toUpperCase() || 'PAID'}</p>
              </div>
              ${appointment.stripeReceiptUrl ? `
              <div>
                <p style="color: #6b7280; font-size: 10px;">Stripe Receipt</p>
                <p style="font-size: 12px;">Available online</p>
              </div>
              ` : ''}
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 9px; color: #9ca3af;">
          <p>This is a computer-generated receipt. Valid for payment verification.</p>
          <p>For any queries, please contact support@mediconnect.com</p>
          <p>© ${new Date().getFullYear()} MediConnect Healthcare System</p>
        </div>
      `;
      
      // Temporarily append to body
      document.body.appendChild(element);
      
      // PDF options
      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `receipt_${appointment.appointmentId || appointment._id}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          letterRendering: true
        },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };
      
      // Generate and save PDF
      await html2pdf().set(opt).from(element).save();
      
      // Clean up
      document.body.removeChild(element);
      
      showToast('success', 'Receipt downloaded successfully!');
    } catch (error) {
      console.error('Receipt generation failed:', error);
      showToast('error', `Failed to generate receipt: ${error.message}`);
    } finally {
      setGeneratingReceipt(false);
    }
  };

  // Alternative: View receipt in new tab
  const handleViewReceipt = async (appointment) => {
    setGeneratingReceipt(true);
    try {
      showToast('info', 'Preparing receipt...');
      
      // Create the same HTML as above
      const element = document.createElement('div');
      element.style.padding = '40px';
      element.style.backgroundColor = 'white';
      element.style.fontFamily = "'Helvetica', 'Arial', sans-serif";
      element.style.maxWidth = '800px';
      element.style.margin = '0 auto';
      
      const currentDate = new Date().toLocaleString();
      const appointmentDate = new Date(appointment.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      element.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="font-size: 48px; margin-bottom: 10px;">🏥</div>
          <h1 style="color: #0d9488; margin-bottom: 5px; font-size: 28px; font-weight: bold;">MediConnect</h1>
          <p style="color: #6b7280; font-size: 12px;">Healthcare Management System</p>
          <div style="margin-top: 20px; padding: 10px; background: linear-gradient(135deg, #0d9488, #0f766e); color: white; border-radius: 8px;">
            <h2 style="font-size: 20px; margin: 0;">PAYMENT RECEIPT</h2>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 30px; padding: 15px; background: #f9fafb; border-radius: 8px;">
          <div>
            <p style="color: #6b7280; font-size: 11px;">RECEIPT NO</p>
            <p style="font-weight: bold; font-size: 14px;">${appointment.appointmentId || appointment._id}</p>
          </div>
          <div style="text-align: right;">
            <p style="color: #6b7280; font-size: 11px;">DATE & TIME</p>
            <p style="font-weight: 500; font-size: 13px;">${currentDate}</p>
          </div>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h3 style="color: #374151; margin-bottom: 15px; font-size: 16px; font-weight: bold;">📋 Appointment Details</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div>
              <p style="color: #6b7280; font-size: 11px;">Appointment ID</p>
              <p><strong>${appointment.appointmentId || 'N/A'}</strong></p>
            </div>
            <div>
              <p style="color: #6b7280; font-size: 11px;">Date & Time</p>
              <p><strong>${appointmentDate} at ${appointment.time}</strong></p>
            </div>
          </div>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h3 style="color: #374151; margin-bottom: 15px; font-size: 16px; font-weight: bold;">👨‍⚕️ Doctor</h3>
          <div style="background: #f0fdf4; padding: 15px; border-radius: 8px;">
            <p><strong>${appointment.doctor?.name || 'N/A'}</strong></p>
            <p style="font-size: 13px;">${appointment.specialty || appointment.doctor?.specialization || 'N/A'}</p>
          </div>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h3 style="color: #374151; margin-bottom: 15px; font-size: 16px; font-weight: bold;">💰 Payment</h3>
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; text-align: center;">
            <p style="font-size: 24px; font-weight: bold; color: #0d9488;">LKR ${appointment.consultationFee?.toLocaleString() || '0'}</p>
            <p style="color: #10b981; font-weight: 600;">✓ PAID</p>
          </div>
        </div>
        
        <div style="margin-top: 30px; text-align: center; font-size: 9px; color: #9ca3af;">
          <p>Thank you for choosing MediConnect</p>
        </div>
      `;
      
      document.body.appendChild(element);
      
      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `receipt_${appointment.appointmentId || appointment._id}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };
      
      const worker = html2pdf().set(opt).from(element);
      const pdfBlob = await worker.outputPdf('blob');
      const url = URL.createObjectURL(pdfBlob);
      window.open(url, '_blank');
      
      setTimeout(() => {
        URL.revokeObjectURL(url);
        document.body.removeChild(element);
      }, 1000);
      
      showToast('success', 'Receipt opened in new tab');
    } catch (error) {
      console.error('View receipt failed:', error);
      showToast('error', 'Failed to open receipt');
    } finally {
      setGeneratingReceipt(false);
    }
  };

  const statusColor = (s) => ({
    pending: 'bg-amber-100 text-amber-700',
    confirmed: 'bg-emerald-100 text-emerald-700',
    completed: 'bg-blue-100 text-blue-700',
    cancelled: 'bg-red-100 text-red-600',
    rejected: 'bg-gray-100 text-gray-600',
  }[s] || 'bg-gray-100 text-gray-600');

  const statusIcon = (s) => ({ pending: '⏳', confirmed: '✅', completed: '✔️', cancelled: '❌', rejected: '🚫' }[s] || '📅');

  const filtered = appointments.filter(a => {
    const matchSearch = a.doctor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.appointmentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.specialty?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 rounded-3xl p-8 overflow-auto">
      {toast && <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl text-sm font-medium ${toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-500'} text-white`}>{toast.msg}</div>}
      
      {/* Loading overlay for PDF generation */}
      {generatingReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"/>
            <p className="text-gray-700 font-medium">Generating Receipt...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">{t('appointments.myAppointmentsTitle')}</h1>
              <p className="text-gray-500 mt-1">Track and manage your medical appointments</p>
            </div>
          </div>
          <div className="relative w-full lg:w-96">
            <input type="text" placeholder="Search by doctor, specialty or ID..." value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-white/80 border-2 border-gray-100 focus:border-emerald-400 rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none transition-all" />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total', count: appointments.length, color: 'emerald', icon: '📋' },
          { label: 'Upcoming', count: appointments.filter(a => ['pending','confirmed'].includes(a.status)).length, color: 'blue', icon: '⏰' },
          { label: 'Completed', count: appointments.filter(a => a.status === 'completed').length, color: 'purple', icon: '✅' },
          { label: 'Cancelled', count: appointments.filter(a => a.status === 'cancelled').length, color: 'red', icon: '❌' },
        ].map(s => (
          <div key={s.label} className={`bg-gradient-to-br from-${s.color}-50 to-${s.color}-100/50 rounded-2xl p-4 border border-${s.color}-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-${s.color}-600 text-sm font-medium`}>{s.label}</p>
                <p className={`text-2xl font-bold text-${s.color}-900`}>{s.count}</p>
              </div>
              <span className="text-xl">{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {['all', 'pending', 'confirmed', 'completed', 'cancelled', 'rejected'].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap text-sm capitalize ${filterStatus === s
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
            {s === 'all' ? 'All' : s}
            {s !== 'all' && <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">{appointments.filter(a => a.status === s).length}</span>}
          </button>
        ))}
      </div>

      {/* Cards */}
      {loading ? (
        <div className="flex justify-center py-20"><div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"/></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(apt => (
            <div key={apt._id} className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-mono text-xs text-gray-400">{apt.appointmentId}</p>
                    <p className="text-emerald-600 font-semibold text-sm mt-1">{apt.date} at {apt.time}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${statusColor(apt.status)}`}>
                    {statusIcon(apt.status)} {apt.status}
                  </span>
                </div>
                <div className="mb-4 p-4 bg-gray-50 rounded-2xl">
                  <p className="text-lg font-bold text-gray-800">{apt.doctor?.name || 'Doctor'}</p>
                  <p className="text-emerald-600 text-sm font-medium">{apt.specialty || apt.doctor?.specialization}</p>
                  <p className="text-xs text-gray-500 mt-1">🏥 {apt.doctor?.hospital}</p>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-gray-500">Fee Paid</span>
                  <span className="font-semibold text-emerald-600">LKR {apt.consultationFee?.toLocaleString()}</span>
                </div>
                {apt.reason && <p className="text-xs text-gray-500 mb-4 bg-amber-50 p-2 rounded-lg">📝 {apt.reason}</p>}
                <div className="flex gap-2">
                  
                  {apt.status === 'confirmed' && (
                    <button onClick={() => handleJoinVideo(apt)}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                      {t('dashboard.joinVideoCall')}
                    </button>
                  )}
                  {/* Updated Receipt Button with PDF generation */}
                  <div className="flex gap-2 flex-1">
                    <button
                      onClick={() => generateReceiptPDF(apt)}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
                      disabled={generatingReceipt}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Receipt
                    </button>
                    <button
                      onClick={() => handleViewReceipt(apt)}
                      className="border-2 border-gray-200 hover:border-emerald-400 bg-white hover:bg-emerald-50 py-2.5 rounded-xl text-sm font-semibold text-gray-700 transition-all flex items-center justify-center gap-2 px-3"
                      disabled={generatingReceipt}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-20">
          <span className="text-6xl block mb-4">📅</span>
          <p className="text-2xl font-semibold text-gray-400">{t('appointments.noAppointments')}</p>
          <p className="text-gray-400 mt-2">Book a new appointment to get started</p>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;