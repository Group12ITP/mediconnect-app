import { useState, useRef, useEffect } from 'react';
import ChatHeader from '../Components/Chatbot/ChatHeader';
import WelcomeScreen from '../Components/Chatbot/WelcomeScreen';
import ChatScreen from '../Components/Chatbot/ChatScreen';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  const patientName = "Kanchana";

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Medical API integration
  const getMedicalResponse = async (userMessage) => {
    try {
      // Option 1: Using Google Gemini API (Recommended - Free)
      const GEMINI_API_KEY = 'AIzaSyCKgUgoMVosHSeS-FlxsjKokuJumbl5b2Y'; // Get from https://makersuite.google.com/app/apikey
      const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

      const medicalPrompt = `You are a helpful medical assistant. Provide accurate, safe, and educational health information. Always include a disclaimer to consult a doctor. User question: ${userMessage}`;

      const response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: medicalPrompt
            }]
          }],
          safetySettings: [
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;
      
      return aiResponse + "\n\n⚠️ *Disclaimer: This information is for educational purposes only. Please consult a healthcare professional for medical advice.*";

    } catch (error) {
      console.error('Gemini API error:', error);
      
      // Fallback to Hugging Face API (Alternative free option)
      try {
        return await getHuggingFaceResponse(userMessage);
      } catch (fallbackError) {
        return getFallbackResponse(userMessage);
      }
    }
  };

  // Hugging Face API Fallback (Free)
  const getHuggingFaceResponse = async (userMessage) => {
    const HF_API_KEY = 'YOUR_HUGGINGFACE_API_KEY'; // Get from https://huggingface.co/settings/tokens
    const HF_URL = 'https://api-inference.huggingface.co/models/google/flan-t5-large';

    const response = await fetch(HF_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `Medical question: ${userMessage}. Provide helpful medical information:`,
        parameters: {
          max_length: 200,
          temperature: 0.7,
        }
      }),
    });

    if (!response.ok) throw new Error('HF API failed');
    
    const data = await response.json();
    let reply = Array.isArray(data) ? data[0].generated_text : data.generated_text;
    
    return reply + "\n\n⚠️ *Please consult a healthcare professional for medical advice.*";
  };

  // Intelligent fallback responses when APIs fail
  const getFallbackResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    const responses = {
      fever: "Fever is often a sign that your body is fighting an infection. Common causes include viral or bacterial infections. I recommend: \n• Rest and stay hydrated\n• Monitor temperature\n• Consult a doctor if fever exceeds 103°F (39.4°C) or lasts more than 3 days\n\n⚠️ *Please consult a healthcare professional for proper diagnosis.*",
      
      headache: "Headaches can be caused by stress, dehydration, lack of sleep, or eye strain. For relief: \n• Rest in a dark, quiet room\n• Stay hydrated\n• Apply cold or warm compresses\n• Consult a doctor if severe or persistent\n\n⚠️ *Please consult a healthcare professional for proper diagnosis.*",
      
      cough: "Coughing helps clear your airways. Common causes include colds, allergies, or infections. Suggestions: \n• Stay hydrated\n• Use honey in warm tea\n• Rest your voice\n• Seek medical help if persistent for more than 2 weeks\n\n⚠️ *Please consult a healthcare professional for proper diagnosis.*",
      
      stomach: "Stomach issues can result from diet, stress, or infections. Recommendations: \n• Eat bland foods (BRAT diet)\n• Stay hydrated\n• Avoid spicy/greasy foods\n• Consult a doctor if severe pain or blood present\n\n⚠️ *Please consult a healthcare professional for proper diagnosis.*",
      
      default: `Thank you for your health question. Based on what you described: "${userMessage}"\n\nFor accurate medical advice, I recommend:\n1. Consulting with a healthcare professional\n2. Visiting your nearest clinic\n3. Calling your doctor's office\n\nWould you like me to help you find a doctor nearby or provide general health information?\n\n⚠️ *This is not medical advice. Please consult a healthcare professional.*`
    };

    // Find matching response
    for (const [key, response] of Object.entries(responses)) {
      if (msg.includes(key)) return response;
    }
    
    return responses.default;
  };

  // Enhanced symptom checker
  const analyzeSymptoms = (message) => {
    const symptoms = {
      respiratory: ['cough', 'sneeze', 'breath', 'chest', 'lung'],
      digestive: ['stomach', 'nausea', 'vomit', 'diarrhea', 'constipation'],
      neurological: ['headache', 'dizzy', 'confusion', 'numb'],
      skin: ['rash', 'itch', 'redness', 'swelling'],
      general: ['fever', 'fatigue', 'pain', 'weakness']
    };

    let detectedCategory = null;
    for (const [category, keywords] of Object.entries(symptoms)) {
      if (keywords.some(keyword => message.toLowerCase().includes(keyword))) {
        detectedCategory = category;
        break;
      }
    }
    
    return detectedCategory;
  };

  const simulateAIResponse = async (userMessage) => {
    setIsTyping(true);
    
    // Add slight delay for realistic typing effect
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    try {
      // Try API first
      const reply = await getMedicalResponse(userMessage);
      
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (error) {
      console.error('Error getting response:', error);
      
      // Fallback to local responses
      const category = analyzeSymptoms(userMessage);
      let reply = getFallbackResponse(userMessage);
      
      // Add doctor recommendation based on symptoms
      if (category) {
        const doctorTypes = {
          respiratory: 'Pulmonologist',
          digestive: 'Gastroenterologist',
          neurological: 'Neurologist',
          skin: 'Dermatologist',
          general: 'General Physician'
        };
        
        reply += `\n\nBased on your symptoms, you may want to consult a **${doctorTypes[category]}**. Would you like help finding one near you?`;
      }
      
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
    
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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2 pt-0">
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