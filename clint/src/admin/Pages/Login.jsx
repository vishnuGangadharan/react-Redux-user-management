import React, { useState } from 'react'
// import { UseDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signInStart,signInSuccess,signInFailure } from '../../redux/admin/adminSlice'
import { useDispatch ,useSelector} from 'react-redux'

function Login() {
    const dispatch = useDispatch()
    const {error} = useSelector((state)=>state.admin)
    // console.log('qqqqqqqqqq',error);
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    const handleChange = (e)=>{
        setFormData({...formData,[e.target.id]: e.target.value})
    }

    const handleSubmit =async(e)=>{
        e.preventDefault()
        try {
            dispatch(signInStart())
            const res = await fetch('/api/adminAuth/admin-signin',{
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify(formData)
            })
            const data = await res.json()
            console.log('ssssssssss',data.message);
            if(data.success=== false){
                console.log('failed to add');
                dispatch(signInFailure(data))
                return
            }
            dispatch(signInSuccess(data))
            navigate('/admin-home')
        } catch (error) {
            dispatch(signInFailure(data)) 
            console.log("mmmmmmm",error);
        }
    }


  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign Up Admin </h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4' action="">
            <input type="text" placeholder='Enter Email'  id='email' className='bg-slate-100  p-3
            rounded-lg'
            onChange={handleChange}
            />
            <input type="password" placeholder='password'  id='password' className='bg-slate-100  p-3
            rounded-lg'
            onChange={handleChange}
            />
            <button className='bg-slate-700 text-white p-3 rounded-lg 
            uppercase hover:opacity-95 disabled:opacity-80
            '>Sign In</button>
        </form> 
        <p className='text-red-500 mt-5'>{error ? error.message || 'Something wrong !' : ''}</p>
    </div>
  )
}

export default Login