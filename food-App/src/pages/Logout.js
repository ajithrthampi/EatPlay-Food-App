import React from 'react'
import { MdLogout } from 'react-icons/md'
import { Navigate, useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate();

    const logout = () => {
        navigate("/adminlogin")
    }

  return (
    <div >
        <p onClick={logout} >hellooo</p>
         
    </div>
  )
}

export default Logout