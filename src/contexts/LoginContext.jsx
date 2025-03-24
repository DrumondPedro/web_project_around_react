import { createContext, useState } from 'react';

import auth from '../utils/auth';
import { useLocation, useNavigate } from 'react-router-dom';

export const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [isLoggedIn, setIsloggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = async (registerData) => {
    try {
      const data = await auth.register('/signup', registerData);
      navigate('/signin');
      return;
    } catch (err) {
      console.log(`${err} - Erro no POST /signup`);
    }
  };

  const handleLogin = async (loginData) => {
    try {
      const token = await auth.authorize('/signin', loginData);
      setIsloggedIn(true);
      const redirectPath = location.state?.from?.pathname || '/';
      navigate(redirectPath);
      return token;
    } catch (err) {
      console.log(`${err} - Erro no POST /signin`);
    }
  };

  return (
    <LoginContext.Provider
      value={{ handleRegister, handleLogin, isLoggedIn, setIsloggedIn }}
    >
      {children}
    </LoginContext.Provider>
  );
}
