import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet ,Navigate} from 'react-router-dom'

function PrivetRoutAdmin() {
    console.log('ddddd');
    const {currentAdmin} = useSelector((state)=>state.admin)
    
    if (currentAdmin == null) {
        return <Outlet/> 
    }
    return currentAdmin ? <Outlet/> : <Navigate to='/admin-login' />
}

export default PrivetRoutAdmin