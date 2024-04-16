import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  useSelector,useDispatch } from 'react-redux'
import { signOut } from '../../redux/admin/adminSlice';
function HomeAdmin() {
  const [errorSearch, setErrorSearch] = useState(null);
 
  const {currentAdmin} = useSelector((state)=>state.admin)
  const [formData,setFormData] = useState({})
  const [users, setUsers] = useState([]);
const navigate = useNavigate()
const dispach = useDispatch()

  useEffect(() => {
    fetch('/api/adminAuth/userDetails')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

const handleEdit=(userId)=>{
  console.log('clicked');
  navigate(`/admin-edit/${userId}`)
}

const handleDelete = async (userId) => {
  try {
    const res = await fetch(`/api/adminAuth/deleteUser/${userId}`, {
      method: 'DELETE' 
    });
    const data = await res.json()
    if (res.success ===false) {
      return
    } else {
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));

      console.log('deleted');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

const handleSearch =  (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });
  console.log(formData);
};

const search = async () => {
  try {
    const res = await fetch('/api/adminAuth/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {
      console.log('Search unsuccessful');
      return;
    }
    if (data.error) {
      console.log(data.error);
      setError(data.error);
      return;
  }
    setUsers(data);
    console.log('Search successful');
  } catch (error) {
    console.log('Error searching:', error);
  }
};

const handleSignout =async()=>{
  try {
    fetch('/api/adminAuth/signout')
    dispach(signOut())
    
  } catch (error) {
    console.log(error);
  }
}

const createUser =()=>{
  navigate('/admin-createUser')
}

  return (
    <div  className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center mb-6">User Details</h1>
        <div className='flex justify-between'>
        <div>
        <input  onChange={handleSearch} type="text"  id='search' placeholder='enter name' className='bg-slate-200' />
        <button onClick={search} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">search</button>
        </div>
        <span onClick={handleSignout} className='text-red-700 cursor-pointer'>Sign out</span>
        <button onClick={createUser} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">create</button>

        </div>
        {errorSearch && <p className="text-red-500">{error}</p>}
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Edit</th>
              <th className="px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            
            {users.length === 0 ?
             (
            <tr>
            
            <td colSpan="5" className="border px-4 py-2 text-center">No users found</td>
            
          </tr>
          
            ) : (
            users.map(user => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.userName}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.phone}</td>
                <td className="border px-4 py-2">
                  <button onClick={()=>handleEdit(user._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Edit</button>
                </td>
                <td className="border px-4 py-2">
                  <button onClick={()=>handleDelete(user._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))
           ) }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomeAdmin;
