import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ToTop from './components/ToTop.jsx';
import TopRibbon from './components/TopRibbon.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import Footer from './components/Footer.jsx'



export default function App(){
  return (
    <div>
      <TopRibbon/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/contacte" element={<Contact/>} />
        <Route path="/despre-noi" element={<About/>} />
      </Routes>
      <Footer/>
      <ToTop/>
    </div>
  )
}
