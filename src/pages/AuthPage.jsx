// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import AuthToggleTabs from '../components/AuthToggleTabs';
import SignInForm from '../components/SignInForm';
import RegisterForm from '../components/RegisterForm';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('signin');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to StockPilot</h1>
      <AuthToggleTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="w-full max-w-3xl bg-white shadow-md p-6 rounded">
        {activeTab === 'signin' ? <SignInForm /> : <RegisterForm />}
      </div>
    </div>
  );
}

