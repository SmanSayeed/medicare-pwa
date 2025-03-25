'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import PWAPopup from '@/app/components/Molecules/PWAPopup'
import Link from 'next/link'
import routeHelper from '@/helpers/routeHelper'
import WithAuth from '../../HOC/WithAuth'
import HomePageTop from '../../Molecules/HomePageTop'
import Appointment from '../../Molecules/Appointment/Appointment'
import CurrentAppointment from '../../Molecules/Appointment/CurrentAppointment'
import { useSelector } from 'react-redux'
import PatientHome from './PatientHome'
import StaffHome from './StaffHome'


 function HomePage() {

  const [role,setRole] = useState('');

  // write code to get user data from redux store and check if user is logged in and check the role too
  const user = useSelector(state => state.user);
  
  useEffect(() => {
    if(user.isAuthenticated){
      setRole(user.user.role);
    }
  }, [user])

  console.log('role :', role )

  const [welcomeToast, setWelcomeToast] = useState(true);

  const closeWelcomeToast = () => {
    setWelcomeToast(false);
  };

  return (
    <>
    {
      welcomeToast && (
        <PWAPopup close={closeWelcomeToast}/>
      )
    }

{
  role && role==='patient' && <PatientHome/>
}
{
  role && role==='staff' && <StaffHome/>
}

    </>
  )
}

// export default WithAuth(HomePage)
export default  HomePage;