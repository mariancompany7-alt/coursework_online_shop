import React from 'react'
import { Routes, Route } from "react-router";
import './App.module.css'

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'

import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className="app-container">
      {/* Header can contain the Navbar, or they can be siblings */}
      <Header>
        <Navbar />
      </Header>

      {/* Using your custom Main component instead of the native HTML tag */}
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Main>

      <Footer />
    </div>
  )
}

export default App