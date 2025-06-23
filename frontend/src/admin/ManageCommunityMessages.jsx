import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

export function ManageCommunityMessages() {
  const [messages, setMessages] = useState(["This is a good post!", "This is a violent message!"]);

  const deleteMessage = (index) => {
    setMessages(messages.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-red-600 mb-4">🚨 Moderate Community Messages</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index} className="flex justify-between items-center p-2 border-b">
            <span>{msg}</span>
            <button onClick={() => deleteMessage(index)} className="text-red-500 hover:text-red-700">
              <Trash2 className="w-5 h-5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
