import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
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
    <div>
      <Routes>
        <Navbar>
          <Header />
          <Main />
          <Footer />
        </Navbar>
      </Routes>
    </div>
  )
}

export default App