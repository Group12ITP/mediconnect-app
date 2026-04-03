import { useState } from 'react';

const Sidebar = ({ activePage, setActivePage }) => {
  const [openSections, setOpenSections] = useState({ appointments: true, records: true });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', onClick: () => setActivePage('dashboard') },
    { id: 'doctors', label: 'Browse Doctors', icon: '👨‍⚕️', onClick: () => setActivePage('doctors') },
    { id: 'appointments', label: 'Appointments', icon: '📅', hasSubmenu: true,
      submenu: [
        { label: 'Book Appointment', onClick: () => setActivePage('book') },
        { label: 'My Appointments', onClick: () => setActivePage('my-appointments') },
      ]
    },
    { id: 'chatbot', label: 'AI Symptom Checker', icon: '🧬', onClick: () => setActivePage('chatbot') },
    { id: 'telemedicine', label: 'Video Consultations', icon: '📹', onClick: () => setActivePage('telemedicine') },
    { id: 'records', label: 'Medical Records', icon: '📋', hasSubmenu: true,
      submenu: [
        { label: 'Upload Reports', onClick: () => setActivePage('upload-reports') },
        { label: 'Medical History', onClick: () => setActivePage('history') },
        { label: 'Prescriptions', onClick: () => setActivePage('prescriptions') },
      ]
    },
  ];

  return (
    <div className="w-72 bg-white border-r border-gray-200 h-screen flex flex-col shadow-sm">
      {/* Logo */}
      <div className="px-6 py-5 border-b flex items-center gap-x-3">
        <div className="w-9 h-9 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl">🧬</div>
        <div>
          <span className="text-2xl font-bold tracking-tight text-gray-900">MediConnect</span>
          <span className="block text-xs font-medium text-emerald-600 -mt-1">SMART HEALTHCARE</span>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        {menuItems.map((item) => (
          <div key={item.id} className="mb-1">
            <button
              onClick={() => {
                item.onClick?.();
                if (item.hasSubmenu) toggleSection(item.id);
              }}
              className={`w-full flex items-center gap-x-3 px-4 py-3 rounded-2xl text-left text-sm font-medium transition-all ${
                activePage === item.id ? 'bg-emerald-600 text-white' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.hasSubmenu && <span className={`text-xs transition-transform ${openSections[item.id] ? 'rotate-180' : ''}`}>▼</span>}
            </button>

            {item.hasSubmenu && openSections[item.id] && (
              <div className="ml-9 mt-1 space-y-1">
                {item.submenu.map((sub, i) => (
                  <button
                    key={i}
                    onClick={sub.onClick}
                    className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl flex items-center gap-x-2"
                  >
                    <span className="text-emerald-500">•</span> {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Help Box */}
      <div className="mx-4 mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-3xl">
        <div className="flex items-start gap-x-3">
          <div className="text-3xl">🛟</div>
          <div className="flex-1">
            <p className="font-semibold text-emerald-900 text-sm">Need help?</p>
            <p className="text-xs text-emerald-700 mt-0.5">Contact support instantly</p>
            <button className="mt-3 text-xs font-medium bg-white border border-emerald-200 hover:bg-emerald-100 px-4 py-2 rounded-2xl w-full">
              Go to Help Center →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;