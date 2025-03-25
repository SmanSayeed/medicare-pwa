import { logout } from '@/redux/slice/userSlice'
import { persistor } from '@/redux/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Logout() {
    const {isAuthenticated} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout());
    }
  return (
    <>
         
         {
          <a onClick={handleLogout} className='hover:cursor-pointer'><i className="bi bi-box-arrow-right hover:cursor-pointer" ></i> Logout</a>
         }
    
    </>
  )
}
