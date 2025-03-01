import { useState, useEffect } from 'react';
import './App.css';
// import CreateDealerAccount from './pages/CreateDealerAccount'
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router";
import CreateDealerAccount from './pages/CreateDealerAccount';
import DealerSignIn from './pages/DealerSignIn';
import LoggedHome from './pages/LoggedHome';
import TokenContext from './contexts/TokenContext';

function App() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [userToken, setUserToken] = useState(() => localStorage.getItem('userToken') || ''); // Load token from localStorage

  const handleToken = (token) => {
    setFormData({ username: '', password: '' });
    setUserToken(token);
    localStorage.setItem('userToken', token);  // Persist token
  };

  // Manage input changes (for login form)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <TokenContext.Provider value={userToken}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<CreateDealerAccount />} />
          <Route path="/login" element={<DealerSignIn handleInputChange={handleInputChange} formData={formData} handleToken={handleToken} />} />
          <Route path="/home" element={<LoggedHome handleToken={handleToken} />} />
        </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
  );
}

export default App;
