import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const securityQuestions = [
  "What was your childhood nickname?",
  "What is the name of your first pet?",
  "What is your mother’s maiden name?",
  "What is the name of your first school?",
  "What was your dream job as a child?"
];

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [otpTimer, setOtpTimer] = useState(120);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const clock = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(clock);
  }, []);

  useEffect(() => {
    let timer;
    if (otpSent && otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpSent, otpTimer]);

  const handleRegisterClick = () => {
    setOtpSent(true);
    setOtpTimer(120);
    setTimeout(() => console.log("OTP Sent to Email/Phone"), 1000);
  };

  const handleOtpValidation = () => {
    if (otp === "123456") {
      setIsRegistered(true);
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom right, #eff6ff, #c7d2fe)' }}>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center' }}>
        <img src="/logo.png" alt="StockPilot Logo" style={{ width: 100, height: 100, marginBottom: 20 }} />
        <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: 16 }}>
          Current Time: {currentTime.toLocaleTimeString()}
        </div>
        {!isRegistered ? (
          <div style={{ maxWidth: 480, width: '100%', padding: 24, background: 'white', borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', marginBottom: 16 }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: 16 }}>Sign In to StockPilot</h1>
            <input placeholder="Email or Phone Number" style={{ width: '100%', padding: 8, marginBottom: 12 }} />
            <input type="password" placeholder="Password" style={{ width: '100%', padding: 8, marginBottom: 12 }} />
            <button style={{ width: '100%', padding: 12, backgroundColor: '#6366f1', color: 'white', borderRadius: 8 }}>Send OTP</button>
            <p style={{ fontSize: '0.875rem', textAlign: 'center', marginTop: 12 }}>
              New User? <span onClick={() => setShowRegister(true)} style={{ color: '#4f46e5', cursor: 'pointer' }}>Register here</span>
            </p>
          </div>
        ) : (
          <div style={{ color: '#16a34a', fontSize: '1.25rem', fontWeight: '600' }}>
            Welcome to your dashboard, StockPilot User!
          </div>
        )}

        {showRegister && (
          <div style={{ maxWidth: 640, width: '100%', marginTop: 24, padding: 24, borderRadius: 16, backgroundColor: 'white', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: 16 }}>Register Your Business</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <input placeholder="Title (Mr/Ms/Mrs)" />
              <input placeholder="Registered Business Name" />
              <input placeholder="Business Purpose" />
              <input placeholder="Owner Name" />
              <input placeholder="Co-Owner Name" />
              <input placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
              <div>
                <input placeholder="Confirm Email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />
                {confirmEmail.length > 0 && (
                  <p style={{ fontSize: '0.75rem', marginTop: 4, color: email === confirmEmail ? 'green' : 'red' }}>
                    {email === confirmEmail ? "Emails match ✅" : "Emails do not match ❌"}
                  </p>
                )}
              </div>
              <input placeholder="Phone Number with Country Code" />
              <select>
                {securityQuestions.map((q, idx) => (
                  <option key={idx} value={q}>{q}</option>
                ))}
              </select>
              <input placeholder="Security Answer" />
              <input placeholder="Business Type" />
              <input placeholder="Sub Category (Searchable)" />
              <input placeholder="Physical Address" />
              <input placeholder="Street, Zip Code, City, Country" />
              <input placeholder="Billing Address or Same as Physical" />
            </div>
            <button onClick={handleRegisterClick} style={{ width: '100%', marginTop: 16, padding: 12, backgroundColor: '#4f46e5', color: 'white', borderRadius: 8 }}>
              Register & Send OTP
            </button>
          </div>
        )}

        {otpSent && (
          <div style={{ maxWidth: 400, width: '100%', marginTop: 24, padding: 24, borderRadius: 16, backgroundColor: 'white', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: 12 }}>Verify OTP</h2>
            <input placeholder="Enter OTP received on email/phone" value={otp} onChange={(e) => setOtp(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 12 }} />
            <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: 8 }}>OTP expires in: {Math.floor(otpTimer / 60)}:{(otpTimer % 60).toString().padStart(2, '0')}</p>
            <button onClick={handleOtpValidation} style={{ width: '100%', padding: 12, backgroundColor: '#16a34a', color: 'white', borderRadius: 8 }}>
              Confirm and Create Account
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default App;
