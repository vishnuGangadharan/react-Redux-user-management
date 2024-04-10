import React, { useState } from 'react'
import {Link , useNavigate} from 'react-router-dom'
import { signUpStart, signUpSuccess,signUpFailure } from '../../redux/user/userSlice'
import { useDispatch,useSelector } from 'react-redux'


function Signup() {

const [formData,setFormData] = useState({})
const { loading , signUpError} = useSelector((state)=> state.user)

const dispatch = useDispatch()
const navigate = useNavigate()
  const handleFormChange=(e)=>{
    setFormData({...formData,[e.target.id]: e.target.value})
  }
  //console.log("formData",formData);

const handleSubmit = async(e)=>{
  e.preventDefault()
  try {
   dispatch(signUpStart())
    const res = await fetch('/api/auth/signup',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData)
    })
    //console.log(res);
    const data = await res.json()
    if(data.success === false){
      dispatch(signUpFailure(data.message))
      return;
    }
    dispatch(signUpSuccess(data))
    navigate('/sign-in')
  } catch (error) {
   dispatch(signUpFailure(error))
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
      <p className='text-red-500 mt-5'>{signUpError ? signUpError ||'Something wrong !' : ''}</p>
    </div>
  )
}

export default Signup