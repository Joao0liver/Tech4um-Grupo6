import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import './index.css'
import Cadastro from './pages/Cadastro'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path ="/Chat" element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
