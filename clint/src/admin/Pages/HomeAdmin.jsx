import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function HomeAdmin() {
  const [users, setUsers] = useState([]);
const navigate = useNavigate()
  useEffect(() => {
    fetch('/api/adminAuth/userDetails')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

const handleEdit=(userId)=>{
  navigate(`/admin-edit/${userId}`)
}

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center mb-6">User Details</h1>
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
            {users.map(user => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.userName}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.phone}</td>
                <td className="border px-4 py-2">
                  <button onClick={()=>handleEdit(user._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Edit</button>
                </td>
                <td className="border px-4 py-2">
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomeAdmin;
