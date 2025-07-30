import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-300 text-purple-600 '>
       <div className="flex justify-between items-center px-4 sm:h-13  sm:py-5 py-2">
        <div className='logo font-bold text-purple-950 text-2xl'>
          <span className='text-purple-600'>&lt;</span>
          Password Manager
          <span className='text-purple-600'>/&gt;</span>
          </div>
        {/* <ul>
            <li className='flex gap-4'>
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href="#">About us</a>
                <a className='hover:font-bold' href="#">Contact</a>
                
            </li>
        </ul> */}
        <button className='hover:cursor-pointer sm:flex gap-1 github sm:ring-white sm:ring-1 sm:rounded-full sm:p-1'>
          <img src="icons/github.svg" alt="" />GitHub
        </button>
        </div>
    </nav>
  )
}

export default Navbar