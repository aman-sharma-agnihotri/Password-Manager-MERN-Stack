import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
 

  return (
    <>
    <Navbar />
    <div className='min-h-[calc(100vh-52px)] '>
    <Manager />
    </div>
    <Footer />
    </>
  )
}

export default App
