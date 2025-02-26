import { useState } from 'react'
import './App.css'
import CreateDealerAccount from './pages/CreateDealerAccount'

function App() {
  const [userToken, setUserToken] = useState(null)

  const handleToken = (token) => {
    setFormData({ username: '', password: '' })
    setUserToken(token)
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      
      <CreateDealerAccount />

    </>
  )
}

export default App
