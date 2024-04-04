
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../../redux/user/userSlice';
import { deleteUserStart, deleteUserSuccess, deleteUserFailure ,signOut} from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';


function Edit() {
const {id} = useParams()
console.log(id);
const [image, setImage] = useState(undefined)
  const {currentUser} = useSelector((state)=> state.user)
  const [ user,setUsers] =useState({
    userName: '',
    phone:'',
    password:'',
    email:''
  })
  console.log(currentUser);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [dataForm, setDataForm] = useState({
    // username: currentUser.userName,
    // email: currentUser.email,
    // phone: currentUser.phone,
  });
  
const imageRef = useRef(null)

    
    const handleChange=(e)=>{
      setDataForm({...dataForm,[e.target.id]:e.target.value})
    }
console.log('form',dataForm);
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

console.log("my",user);

useEffect(()=>{
  if(image){
    const imageURL = URL.createObjectURL(image);
      document.getElementById('upload').src = imageURL;
  }
},[image])

// const handleImageUpload= async( image)=>{
//   console.log('image',image);
// }

    const handleSubmit = async(e)=>{
      e.preventDefault()
      const formData = new FormData();
      const image = imageRef.current.files[0];
      if(image){
       formData.append('image', image);
      }
      formData.append('username', dataForm.username);
      formData.append('email',dataForm.email)
      formData.append('phone',dataForm.phone)
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
    }catch(error){
      dispatch(updateUserFailure(error))
      console.log(error);
    }
  }
  
const handleDeleteAc=async()=>{
  try {
    dispatch(deleteUserStart())
    const res = await fetch(`api/user/delete/${currentUser._id}`,{
      method :'DELETE',
    })
    const data = await res.json()
    if(data.success === false){
      dispatch(deleteUserFailure(data))
      return
    }
    dispatch(deleteUserSuccess(data))
    navigate('/sign-in')
  } catch (error) {
    dispatch(deleteUserFailure(error))
  }
}


const handleSignout= async()=>{
  try {
    await fetch('api/auth/signout')
    dispatch(signOut())
  } catch (error) {
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

        <img src={user.profilePicture} alt="profile pic" id='upload' name='profile'
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
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteAc} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignout} className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>

  )
}

export default Edit