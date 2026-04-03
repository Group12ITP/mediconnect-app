import { useState } from 'react';
import Chatbot from './Pages/Chatbot';
import BrowseDoctors from './Pages/Doctors/BrowseDoctors';
import MainLayout from './Components/Layout/MainLayout';

function App() {
  const [activePage, setActivePage] = useState('doctors');

  const renderPage = () => {
    console.log('Rendering page:', activePage); // Debug log
    
    switch(activePage) {
      case 'doctors':
        return <BrowseDoctors />;
      case 'chatbot':
        return <Chatbot />;
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