// src/components/SignInForm.jsx
import React, { useState } from 'react';
import { auth, RecaptchaVerifier } from '../firebaseConfig';
import { signInWithPhoneNumber } from 'firebase/auth';

export default function SignInForm() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [confirmationResult, setConfirmationResult] = useState(null);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: () => {
            // reCAPTCHA solved
          },
        },
        auth
      );
    }
  };

  const handleSendOtp = async () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      setStep(2);
      alert('OTP sent successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to send OTP. Check phone format and try again.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await confirmationResult.confirm(otp);
      alert('✅ OTP verified! User logged in.');
      // TODO: redirect to dashboard or fetch user data
    } catch (error) {
      console.error(error);
      alert('❌ Invalid OTP.');
    }
  };

  return (
    <div className="space-y-4">
      <div id="recaptcha-container"></div>

      {step === 1 ? (
        <>
          <label className="block">📱 Phone Number:</label>
          <input
            type="tel"
            placeholder="+91XXXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border px-3 py-2 w-full rounded"
          />
          <button onClick={handleSendOtp} className="bg-blue-600 text-white px-4 py-2 rounded">
            Send OTP
          </button>
        </>
      ) : (
        <>
          <label className="block">🔐 Enter OTP:</label>
          <input
            type="text"
            placeholder="123456"
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
