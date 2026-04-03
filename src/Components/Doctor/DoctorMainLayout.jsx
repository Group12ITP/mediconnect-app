import { useState } from 'react';
import DoctorSidebar from './DoctorSidebar';


const DoctorMainLayout = ({ children }) => {
  const [activePage, setActivePage] = useState('doctor-dashboard');

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <DoctorSidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="flex-1 flex flex-col">    
        
        <div className="flex-1 overflow-auto p-4 pt-2">
        {activePage === 'doctor-dashboard' && children} 
          
        </div>
      </div>
    </div>
  );
};

export default DoctorMainLayout;