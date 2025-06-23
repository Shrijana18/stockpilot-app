// src/components/AuthToggleTabs.jsx
import React from 'react';

export default function AuthToggleTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex justify-center gap-4 my-4">
      <button
        className={`px-6 py-2 rounded ${
          activeTab === 'signin' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'
        }`}
        onClick={() => setActiveTab('signin')}
      >
        Sign In
      </button>
      <button
        className={`px-6 py-2 rounded ${
          activeTab === 'register' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'
        }`}
        onClick={() => setActiveTab('register')}
      >
        Register
      </button>
    </div>
  );
}

