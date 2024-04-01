import React from 'react'
import { useSelector } from 'react-redux';



function Home() {
  const { loading,currentUser, error} = useSelector((state) => state.user)
  console.log("home",currentUser);
  return (
    <div>Home</div>
  )
}

export default Home