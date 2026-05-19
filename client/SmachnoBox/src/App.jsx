import React from 'react'
import { Routes, Route } from "react-router-dom";
import './App.module.css'

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard'

import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

import Checkout from './pages/Checkout/Checkout';

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
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checkout" element={<Checkout totalAmount={850} cartItems={[]} />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App