import React from 'react'
import {  useSelector } from 'react-redux'
import { Outlet ,Navigate } from 'react-router-dom'
function PrivetRoute() {
    const {currentUser} = useSelector((state)=>state.user)
  return currentUser ? <Outlet/> : <Navigate to='/sign-in' />
}

export default PrivetRoute