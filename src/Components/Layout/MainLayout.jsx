import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = ({ children }) => {
  const [activePage, setActivePage] = useState('chatbot');

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Left Sidebar - Shared Navigation */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">


        {/* Page Content - Your Chatbot goes here */}
        <div className="flex-1 overflow-auto p-4 pt-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;