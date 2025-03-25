'use client'
import { useFetchAppointmentMutation } from '@/redux/api/appointmentApi';
import React, { useState, useEffect } from 'react';
import FilterAppointments from '../../Molecules/Appointment/FilterAppointments';
import PatientsSerialList from '../../Molecules/Appointment/PatientsSerialList';


export default function PatientSerial({doctor_id,appointment_date,doctor_name,department_name}) {
    const [doctorId, setDoctorId] = useState(doctor_id);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [fetchAppointment, { data: appointments, error, isLoading }] = useFetchAppointmentMutation();
    const [appointmentData,setAppointmentData] = useState([]);

    useEffect(() => {
        fetchAppointment({ doctor_id: parseInt(doctorId), start_date: appointment_date, end_date: appointment_date, appointment_status: status, department_id: departmentId });
    }, [doctorId, startDate, endDate, status, departmentId, fetchAppointment]);

    useEffect(() => {
        if (appointments) {
            setAppointmentData(appointments);
        }
    },[appointments]);
    console.log('appontment data ',appointmentData);

    return (
        <div>
            <div className='my-3'>
                <h3>Doctor Serial</h3>
                <p>Doctor Name: {doctor_name}</p>
                <p>Department: {department_name}</p>
                <p>Appointment Date: {appointment_date}</p>
            </div>
            <h3>Appointments</h3>
          
          
            <PatientsSerialList 
                appointments={appointments}
                isLoading={isLoading}
                error={error}
            />
        </div>
    );
}