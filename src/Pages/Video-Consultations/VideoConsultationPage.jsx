import { useState, useEffect } from 'react';
import PatientInfoPanel from '../../Components/Video-Consultations/PatientInfoPanel';
import VideoArea from '../../Components/Video-Consultations/VideoArea';
import ChatPanel from '../../Components/Video-Consultations/ChatPanel';
import Toolbar from '../../Components/Video-Consultations/Toolbar';

const VideoConsultationPage = () => {
  const [timeLeft, setTimeLeft] = useState(11 * 60 + 29); // 11:29 in seconds
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Doctor', text: 'Good afternoon, Olivia! How are you feeling today?', time: '10:20' },
    { id: 2, sender: 'Patient', text: "I'm good, looking forward for the appointment 😊", time: '10:25' },
    { id: 3, sender: 'Doctor', text: 'Hey, Olivia! Are you ready for a call?', time: '12:59' },
    { id: 4, sender: 'Patient', text: "Hello, Dr. Lopez. I'm 5 minutes late, sorry!", time: '13:02' },
    { id: 5, sender: 'Doctor', text: 'No worries, take your time ❤️', time: '13:03' },
  ]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'Patient',
        text: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="h-full bg-white rounded-3xl shadow-inner overflow-hidden flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Patient Info + Chat */}
        <div className="w-96 border-r flex flex-col bg-gray-50">
          <PatientInfoPanel />
          <ChatPanel messages={messages} onSendMessage={handleSendMessage} />
        </div>

        {/* Main Video Area */}
        <div className="flex-1 flex flex-col">
          <VideoArea timeLeft={formatTime(timeLeft)} />
        </div>
      </div>

      {/* Bottom Toolbar */}
      <Toolbar />
    </div>
  );
};

export default VideoConsultationPage;