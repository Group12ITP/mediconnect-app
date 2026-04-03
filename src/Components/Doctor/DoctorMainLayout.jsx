import { useState } from 'react';
import DoctorSidebar from './DoctorSidebar';
import AppointmentRequests from '../../Pages/Doctors/AppointmentRequests';
import DoctorProfile from '../../Pages/Doctors/DoctorProfile';
import IssuePrescriptions from '../../Pages/Doctors/IssuePrescriptions';

const DoctorMainLayout = ({ children }) => {
  const [activePage, setActivePage] = useState('doctor-dashboard');

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <DoctorSidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="flex-1 flex flex-col">    
        
        <div className="flex-1 overflow-auto p-4 pt-2">
            {activePage === 'doctor-dashboard' && children} 

        {activePage === 'appointment-requests' && <AppointmentRequests />}  
        {activePage === 'profile' && <DoctorProfile />}
        {activePage === 'issue-prescriptions' && <IssuePrescriptions />}
        
        </div>
      </div>
    </div>
  );
};

export default DoctorMainLayout;