import React from 'react'
import Logo from '../logo.png'
import {Link} from 'react-router-dom'

function NavBar() {
  return (
    <div className='border px-4 py-2 flex space-x-8 items-center'>
        <img src={Logo} className='w-[50px] md:w-[60px]' />
        <Link to="/" className='text-sky-400 font-bold text-xl md:text-3xl'>Movies</Link>
        <Link to="/favourites" className='text-sky-400 font-bold text-xl md:text-3xl'>Favourites</Link>

    </div>
  )
}

export default NavBar