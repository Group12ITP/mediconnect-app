import { useState } from 'react';

const DoctorSidebar = ({ activePage, setActivePage }) => {
  const [openSections, setOpenSections] = useState({ schedule: true });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const menuItems = [
    { id: 'doctor-dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'profile', label: 'My Profile', icon: '👤' },
    { id: 'schedule', label: 'My Schedule', icon: '📅', hasSubmenu: true },
    { id: 'appointment-requests', label: 'Appointment Requests', icon: '📬' },
    { id: 'video-consultations', label: 'Video Consultations', icon: '📹' },
    { id: 'prescriptions', label: 'Issue Prescriptions', icon: '💊' },
    { id: 'patient-reports', label: 'Patient Reports', icon: '📋' },
    { id: 'my-patients', label: 'My Patients', icon: '👥' },
  ];

  return (
    <div className="w-72 bg-white border-r border-gray-200 h-screen flex flex-col shadow-sm">
      {/* Doctor Logo/Header */}
      <div className="px-6 py-5 border-b flex items-center gap-x-3">
        <div className="w-9 h-9 bg-teal-600 rounded-2xl flex items-center justify-center text-white text-3xl">🩺</div>
        <div>
          <span className="text-2xl font-bold tracking-tight text-gray-900">HealthAI</span>
          <span className="block text-xs font-medium text-teal-600 -mt-1">DOCTOR PORTAL</span>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        {menuItems.map((item) => (
          <div key={item.id} className="mb-1">
            <button
              onClick={() => {
                setActivePage(item.id);
                if (item.hasSubmenu) toggleSection(item.id);
              }}
              className={`w-full flex items-center gap-x-3 px-4 py-3 rounded-2xl text-left text-sm font-medium transition-all ${
                activePage === item.id ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.hasSubmenu && (
                <span className={`text-xs transition-transform ${openSections[item.id] ? 'rotate-180' : ''}`}>▼</span>
              )}
            </button>

            {/* Submenu for Schedule */}
            {item.hasSubmenu && openSections[item.id] && (
              <div className="ml-9 mt-1 space-y-1">
                <button
                  onClick={() => setActivePage('set-availability')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Set Availability
                </button>
                <button
                  onClick={() => setActivePage('view-schedule')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  View Full Schedule
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Doctor Info Footer */}
      <div className="mx-4 mb-6 p-4 bg-teal-50 border border-teal-100 rounded-3xl flex items-center gap-x-3">
        <div className="w-10 h-10 bg-teal-100 text-teal-700 rounded-2xl flex items-center justify-center text-2xl">👨‍⚕️</div>
        <div>
          <p className="font-semibold">Dr. Kanchana Silva</p>
          <p className="text-xs text-teal-600">Cardiologist • Online</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorSidebar;