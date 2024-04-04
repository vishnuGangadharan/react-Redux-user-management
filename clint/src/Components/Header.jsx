import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const {currentUser } = useSelector((state)=> state.user)
  return (
    <div className='bg-slate-200'>
        <div className='font-bold flex justify-between items-center max-w-6xl mx-auto p-3'>
         <h1>Auth Contol</h1>
            <ul className='flex gap-4'>
                <Link to='/'>
                 <li>Home</li> 
                </Link>
                <Link to='/sign-up'>
                <li>SignUp</li>
                </Link>
                <Link to='/profile'>
                  { currentUser ? (
                    <img src={currentUser.profilePicture} alt="pic" className='h-7 w-7 rounded-full object-cover'/>
                  ):(
                    
                    <li>Login</li>
                  )}
                </Link>
                
            </ul>
        </div>
    </div>
  )
}

export default Header