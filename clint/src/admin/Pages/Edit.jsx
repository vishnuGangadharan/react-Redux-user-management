
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';


function Edit() {
const {id} = useParams()
console.log(id);
const [image, setImage] = useState(undefined)
  const {currentAdmin} = useSelector((state)=> state.admin)
  const [ user,setUsers] =useState({
    userName: '',
    phone:'',
    password:'',
    email:'',
    profilePicture: ''
  })
  // console.log("currentuser",currentAdmin);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [dataForm, setDataForm] = useState({ });
  
const imageRef = useRef(null)

    
    const handleChange=(e)=>{
      setDataForm({...dataForm,[e.target.id]:e.target.value})
    }

useEffect(()=>{
    fetch(`/api/adminAuth/userDetails/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      return response.json();
    })
    .then(data => {
      setUsers(data);
      console.log(data);
    })
    .catch(error => {
      setError(error.message);
    })
},[id])

// console.log("my",user);

useEffect(()=>{
  if(image){
    const imageURL = URL.createObjectURL(image);
      document.getElementById('upload').src = imageURL;
  }
},[image])



    const handleSubmit = async(e)=>{
      e.preventDefault()
      const formData = new FormData();
      const image = imageRef.current.files[0];
      if(image){
       formData.append('image', image);
      }
      if (dataForm.username) {
      formData.append('username', dataForm.username);
      }
      if (dataForm.email) {
      formData.append('email',dataForm.email)
      }
      if (dataForm.phone) {
        formData.append('phone', dataForm.phone);
      }
      console.log('herrrrr');
        console.log('formdata',formData);
      try{
       dispatch(updateUserStart())
      const response = await fetch(`/api/adminAuth/userUpdate/${id}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if(data.success ===false){
        dispatch(updateUserFailure(data))
        return
      }
      dispatch(updateUserSuccess(data))
      navigate('/admin-home')
      alert('success')
    }catch(error){
      dispatch(updateUserFailure(error))
      console.log(error);
    }
  }
  





  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} action="" className='flex flex-col gap-4'>

        <input  type="file" name='image' ref={imageRef} hidden accept='image/*'
        onChange={(e)=>setImage(e.target.files[0])}
        />

        <img src={`/api/static/uploads/${user.profilePicture}`} alt="profile pic" id='upload' name='profile'
        className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
        onClick={()=>imageRef.current.click()}
        onChange={handleChange}
        />
        <input defaultValue={user.userName} type="text" id='username'    
        placeholder='UserName' className='bg-slate-100 rounded-lg p-3'
        onChange={handleChange}
        />
        <input defaultValue={user.email} type="email" id='email' 
        placeholder='email' className='bg-slate-100 rounded-lg p-3'
        onChange={handleChange}
        />
        <input  defaultValue={user.phone} type="number" id='phone' 
        placeholder='phone' className='bg-slate-100 rounded-lg p-3'
        onChange={handleChange}
        />
       
        <button className='bg-slate-700 text-white p-3 rounded-lg 
        uppercase hover:opacity-95 disabled:opacity-80 '>Update</button>
      </form>
     
    </div>

  )
}

export default Edit