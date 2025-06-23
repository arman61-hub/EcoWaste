import React, { useState } from 'react';
import { Users, MessageSquare, Award } from 'lucide-react';

const communityLeaders = [
  { name: "Arman", points: 1500 },
  { name: "Ankit", points: 1350 },
  { name: "Asheer", points: 1200 },
  { name: "Amit", points: 1100 },
];

export function CommunityEngagement() {
  const [messages, setMessages] = useState([
    { user: "Arman", text: "Recycling plastic bottles can save a lot of energy!" },
    { user: "Amit", text: "Does anyone know where to drop off e-waste?" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { user: "You", text: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">🌱 Community Engagement & Awareness</h2>
      <p className="text-gray-600 text-center mb-6">Join the conversation, learn, and make a difference!</p>

      {/* Leaderboard Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-green-700 flex items-center gap-2">
          <Award className="w-6 h-6 text-yellow-500" /> Community Leaderboard
        </h3>
        <ul className="mt-4 bg-green-100 p-4 rounded-lg shadow-md max-h-40 overflow-y-auto">
          {communityLeaders.map((leader, index) => (
            <li key={index} className="flex justify-between p-2 bg-white rounded-lg mb-2 shadow-sm">
              <span className="font-medium">{leader.name}</span>
              <span className="text-green-600 font-semibold">{leader.points} pts</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Discussion Forum */}
      <div>
        <h3 className="text-xl font-semibold text-green-700 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-blue-500" /> Community Forum
        </h3>
        <div className="mt-4 bg-blue-100 p-4 rounded-lg shadow-md max-h-60 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className="bg-white p-3 rounded-lg shadow-sm mb-2">
              <p className="text-gray-800 font-semibold">{msg.user}</p>
              <p className="text-gray-700">{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            className="flex-1 p-2 border rounded-lg"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage} className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
