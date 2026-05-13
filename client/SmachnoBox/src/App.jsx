import React from 'react'
import { Routes, Route } from "react-router";
import './App.module.css'

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'

import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className="app-container">
      <Header>
        <Navbar />
      </Header>

      {/* CHANGED: Use lowercase HTML <main> tag here! */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App