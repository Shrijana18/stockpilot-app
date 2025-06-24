import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import SignInForm from '../components/SignInForm';

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(true);

  return (
    <div className="auth-container">
      {isRegistering ? (
        <RegisterForm onSwitchToLogin={() => setIsRegistering(false)} />
      ) : (
        <SignInForm onSwitchToRegister={() => setIsRegistering(true)} />
      )}
    </div>
  );
};

export default AuthPage;
