import React from 'react';
import GoogleButton from 'react-google-button';
import { Link }from 'react-router-dom';


const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    const redirectToGoogle = `${process.env.CLIENT_URL}/auth/google`;
    window.open(redirectToGoogle, '_self');
  };

  return (
    <div className='Login'>
      <GoogleButton onClick={handleLogin} />
    </div>
  );
};

export default Login
