// src/components/SignInForm.jsx
import React, { useState } from 'react';

export default function SignInForm() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // Step 1 = enter phone, Step 2 = enter OTP

  const handleSendOtp = () => {
    alert(`Sending OTP to ${phone}...`); // Replace with Firebase logic next
    setStep(2);
  };

  const handleVerifyOtp = () => {
    alert(`Verifying OTP: ${otp}`); // Replace with Firebase logic next
  };

  return (
    <div className="space-y-4">
      {step === 1 ? (
        <>
          <label className="block">Phone Number:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91..."
            className="border px-3 py-2 w-full rounded"
          />
          <button onClick={handleSendOtp} className="bg-blue-600 text-white px-4 py-2 rounded">
            Send OTP
          </button>
        </>
      ) : (
        <>
          <label className="block">Enter OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border px-3 py-2 w-full rounded"
          />
          <button onClick={handleVerifyOtp} className="bg-green-600 text-white px-4 py-2 rounded">
            Verify OTP
          </button>
        </>
      )}
    </div>
  );
}

