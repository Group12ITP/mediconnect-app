import { useState, useRef, useEffect } from 'react';
import ChatHeader from '../Components/Chatbot/ChatHeader';
import WelcomeScreen from '../Components/Chatbot/WelcomeScreen';
import ChatScreen from '../Components/Chatbot/ChatScreen';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  const patientName = "Kanchana"; // You can connect this to your auth later

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate AI response (replace with real API call to your AI Symptom Checker microservice later)
  const simulateAIResponse = async (userMessage) => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const reply = userMessage.toLowerCase().includes('symptom') ||
                  userMessage.toLowerCase().includes('feel')
      ? "Based on what you described, it could be fatigue or a minor infection. I recommend seeing a **General Physician**. Would you like me to show available doctors near you?"
      : "Thank you for your message. I suggest booking an appointment with a **General Practitioner**. Shall I help you search for doctors?";

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setIsTyping(false);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg = {
      id: Date.now(),
      type: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentMsg = inputValue;
    setInputValue('');

    await simulateAIResponse(currentMsg);
  };

  const handleSuggestionClick = (text) => {
    const userMsg = {
      id: Date.now(),
      type: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setTimeout(() => simulateAIResponse(text), 700);
  };

  // Show Welcome Screen if no messages yet
  if (messages.length === 0) {
    return (
      <WelcomeScreen
        patientName={patientName}
        onSuggestionClick={handleSuggestionClick}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSend={handleSendMessage}
      />
    );
  }

  // Show Chat Screen
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2 pt-0 " >
      <div className="w-full max-w-[1100px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[92vh] p-0">
        <ChatHeader patientName={patientName} />
        <ChatScreen
          messages={messages}
          isTyping={isTyping}
          chatContainerRef={chatContainerRef}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSend={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Chatbot;