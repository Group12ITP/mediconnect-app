import { useState } from 'react';
import Chatbot from './Pages/Chatbot';
import BrowseDoctors from './Pages/Doctors/BrowseDoctors';
import MainLayout from './Components/Layout/MainLayout';
import VideoConsultationPage from './Pages/Video-Consultations/VideoConsultationPage';
import UploadReports from './Pages/MedicalRecords/UploadReports';
import Prescriptions from './Pages/MedicalRecords/ViewPrescriptions';
import BookAppointment from './Pages/Appointments/BookAppointment';
import MyAppointments from './Pages/Appointments/MyAppointments';

function App() {
  const [activePage, setActivePage] = useState('doctors');

  const renderPage = () => {
    console.log('Rendering page:', activePage); // Debug log
    
    switch(activePage) {
      case 'doctors':
        return <BrowseDoctors />;
      case 'chatbot':
        return <Chatbot />;
      case 'telemedicine':
        return <VideoConsultationPage />;
      case 'upload-reports':
        return <UploadReports />;
      case 'prescriptions':
        return <Prescriptions />;
      case 'book':
        return <BookAppointment />;
      case 'my-appointments':
        return <MyAppointments />;
      default:
        return <BrowseDoctors />;
    }
  };

  return (
    <MainLayout activePage={activePage} setActivePage={setActivePage}>
      {renderPage()}
    </MainLayout>
  );
}

export default App;