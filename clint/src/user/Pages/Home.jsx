import React from 'react'

import { useSelector } from 'react-redux';



function Home() {
  const { loading,currentUser, error} = useSelector((state) => state.user)
  return (
    <div classNames="flex justify-center items-center h-screen">
  <h1 className="text-4xl font-bold text-center">WELCOME {currentUser? currentUser.userName :''}</h1>
</div>
  )
}

export default Home