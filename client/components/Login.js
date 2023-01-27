import React from 'react';
import GoogleButton from 'react-google-button';
import { Link }from 'react-router-dom';

const Login = () => {

  window.process = {
    env: {
        NODE_ENV: 'development',
        GOOGLE_URL: 'http://localhost:8080/auth/google'
    }
}
  const handleLogin = () => {
      const redirectToGoogle = process.env.GOOGLE_URL;
     console.log(redirectToGoogle)
     window.open(redirectToGoogle, '_self');
     };

  return (
    <div className='buttonDiv'>
      <GoogleButton onClick={handleLogin} />
    </div>
  );
};

export default Login

