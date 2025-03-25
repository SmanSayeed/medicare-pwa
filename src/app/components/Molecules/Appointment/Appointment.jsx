import React from 'react'
import Container from '../../Layout/Container'
import SectionHeader from '../../Atoms/Header/SectionHeader'
import { useFetchDoctorsQuery } from '@/redux/api/doctorsApi';
import { useSelector } from 'react-redux';
import App from 'next/app';
import AppointmentSlotFetcher from './AppointmentSlotFetcher';

export default function Appointment() {
    const {data,error,isLoading}=useFetchDoctorsQuery();
    const {user} = useSelector(state => state.user);
  return (
    <>
    <Container>
        <SectionHeader className=''>
         Make Appointment
        </SectionHeader>
       <AppointmentSlotFetcher/>
    </Container>
    
        </>
  )
}
