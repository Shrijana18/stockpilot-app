// Unique Software Name: StockPilot

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const securityQuestions = [
  "What was your childhood nickname?",
  "What is the name of your first pet?",
  "What is your mother’s maiden name?",
  "What is the name of your first school?",
  "What was your dream job as a child?"
];

export default function HomePage() {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <img
          src="/logo.png"
          alt="StockPilot Logo"
          className="mx-auto w-28 h-28 mb-4"
        />
        <div className="text-sm text-gray-600 mb-4">
          Current Time: {currentTime.toLocaleTimeString()}
        </div>
        {!isRegistered ? (
          <Card className="w-full max-w-xl p-6 rounded-2xl shadow-lg">
            <CardContent>
              <h1 className="text-2xl font-bold mb-4">Sign In to StockPilot</h1>
              <Input placeholder="Email or Phone Number" className="mb-3" />
              <Input type="password" placeholder="Password" className="mb-3" />
              <Button className="w-full mb-2">Send OTP</Button>
              <p className="text-sm text-center">
                New User?{' '}
                <span
                  className="text-indigo-600 cursor-pointer"
                  onClick={() => setShowRegister(true)}
                >
                  Register here
                </span>
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="text-green-600 text-xl font-semibold">
            Welcome to your dashboard, StockPilot User!
          </div>
        )}

        {showRegister && (
          <Card className="w-full max-w-2xl mt-6 p-6 rounded-2xl shadow-xl bg-white">
            <CardContent>
              <h2 className="text-xl font-bold mb-4">Register Your Business</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Title (Mr/Ms/Mrs)" />
                <Input placeholder="Registered Business Name" />
                <Input placeholder="Business Purpose" />
                <Input placeholder="Owner Name" />
                <Input placeholder="Co-Owner Name" />
                <Input placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <div>
                  <Input placeholder="Confirm Email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />
                  {confirmEmail.length > 0 && (
                    <p className={`text-sm mt-1 ${email === confirmEmail ? 'text-green-600' : 'text-red-600'}`}>
                      {email === confirmEmail ? "Emails match ✅" : "Emails do not match ❌"}
                    </p>
                  )}
                </div>
                <Input placeholder="Phone Number with Country Code" />
                <select className="border rounded p-2">
                  {securityQuestions.map((q, idx) => (
                    <option key={idx} value={q}>{q}</option>
                  ))}
                </select>
                <Input placeholder="Security Answer" />
                <Input placeholder="Business Type" />
                <Input placeholder="Sub Category (Searchable)" />
                <Input placeholder="Physical Address" />
                <Input placeholder="Street, Zip Code, City, Country" />
                <Input placeholder="Billing Address or Same as Physical" />
              </div>
              <Button className="mt-4 w-full" onClick={handleRegisterClick}>
                Register & Send OTP
              </Button>
            </CardContent>
          </Card>
        )}

        {otpSent && (
          <Card className="w-full max-w-md mt-6 p-6 bg-white rounded-2xl shadow-md">
            <CardContent>
              <h2 className="text-xl font-semibold mb-3">Verify OTP</h2>
              <Input placeholder="Enter OTP received on email/phone" value={otp} onChange={(e) => setOtp(e.target.value)} className="mb-3" />
              <p className="text-sm text-gray-600 mb-2">OTP expires in: {Math.floor(otpTimer / 60)}:{(otpTimer % 60).toString().padStart(2, '0')}</p>
              <Button className="w-full" onClick={handleOtpValidation}>
                Confirm and Create Account
              </Button>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}