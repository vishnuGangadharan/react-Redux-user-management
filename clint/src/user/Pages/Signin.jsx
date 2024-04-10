import React, { useState } from 'react'
import {Link , useNavigate} from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSuccess ,signInFailure } from '../../redux/user/userSlice'


function Signin() {

const [formData,setFormData] = useState({})
const { loading , signInError} = useSelector((state)=> state.user)
const navigate = useNavigate()
const dispach = useDispatch()
  const handleFormChange=(e)=>{
    setFormData({...formData,[e.target.id]: e.target.value})
  }
  
const handleSubmit = async(e)=>{
  e.preventDefault()
  try {
    dispach(signInStart())
    const res = await fetch('/api/auth/signin',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    console.log(data);
   
    if(data.success === false){
      dispach(signInFailure(data))
      return;
    }
    dispach(signInSuccess(data))
    navigate('/')
  } catch (error) {
    dispach(signInFailure(error))
    console.log(error);
  }

}


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} action="" className='flex flex-col gap-4 '>
        
        <input 
          type="email" 
          placeholder='Email' id='email' 
          className='bg-slate-100 p-3 rounded-lg' 
          onChange={handleFormChange}
          />
        <input 
          type="password" 
          placeholder='Password' id='password' 
          className='bg-slate-100 p-3 rounded-lg' 
          onChange={handleFormChange}
          />
        <button disabled={loading} className='bg-slate-700 text-white p-3 
            rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
              {loading ? 'Loading....':'Sign In'}
              </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't Have an account?</p>
        <Link to='/sign-up'>
        <span className='text-blue-500'>Sign Up</span>
        </Link>
      </div>
      <p className='text-red-500 mt-5'>{signInError ? signInError.message ||'Something wrong !' : ''}</p>
    </div>
  )
}

export default Signin