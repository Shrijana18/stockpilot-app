import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';

const RegisterForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    city: '',
  });

  const generateUserID = () => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `SP-${timestamp}_${randomStr}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registered Successfully! 🎉");
      console.log("User ID:", generateUserID());
    } catch (error) {
      console.error("Error during registration:", error.message);
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="businessName" placeholder="Business Name" onChange={handleChange} required />
        <input name="ownerName" placeholder="Owner Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input name="city" placeholder="City / Location" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <button onClick={onSwitchToLogin}>Login</button>
      </p>
    </div>
  );
};

export default RegisterForm;
