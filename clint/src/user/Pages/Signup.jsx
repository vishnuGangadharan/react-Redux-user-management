import React, { useState } from 'react'
import {Link , useNavigate} from 'react-router-dom'



function Signup() {

const [formData,setFormData] = useState({})
const [error,setError] = useState(false)
const [loading,setLoading] = useState(false)
const navigate = useNavigate()
  const handleFormChange=(e)=>{
    setFormData({...formData,[e.target.id]: e.target.value})
  }
  console.log("formData",formData);
const handleSubmit = async(e)=>{
  e.preventDefault()
  try {
    setLoading(true)
    setError(false)
    const res = await fetch('/api/auth/signup',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    console.log(data);
    setLoading(false)
    if(data.success === false){
      setError(true)
      return;
    }
    navigate('/sign-in')
  } catch (error) {
    setLoading(false)
    setError(true)
    console.log(error);
  }

}


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign up</h1>
      <form onSubmit={handleSubmit} action="" className='flex flex-col gap-4 '>
        <input 
          type="text" 
          placeholder='User Name' id='username' 
          className='bg-slate-100 p-3 rounded-lg' 
          onChange={handleFormChange}
          />
        <input 
          type="email" 
          placeholder='Email' id='email' 
          className='bg-slate-100 p-3 rounded-lg' 
          onChange={handleFormChange}
          />
        <input 
          type="number" 
          placeholder='Phone' id='phone' 
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
              {loading ? 'Loading....':'Sign Up'}
              </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
        <span className='text-blue-500'>Log in</span>
        </Link>
      </div>
      <p className='text-red-500 mt-5'>{error && 'Something wrong !'}</p>
    </div>
  )
}

export default Signup