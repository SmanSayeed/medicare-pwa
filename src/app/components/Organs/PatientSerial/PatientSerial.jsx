'use client'
import { useFetchAppointmentMutation } from '@/redux/api/appointmentApi';
import React, { useState, useEffect } from 'react';
import FilterAppointments from '../../Molecules/Appointment/FilterAppointments';
import PatientsSerialList from '../../Molecules/Appointment/PatientsSerialList';

export default function PatientSerial({ doctor_id, appointment_date, doctor_name, department_name }) {
    const [patientSerial,setPatientSerial] = useState();
    const [doctorId, setDoctorId] = useState(doctor_id);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [fetchAppointment, { data: appointments, error, isLoading }] = useFetchAppointmentMutation();
    const [appointmentData, setAppointmentData] = useState([]);

    useEffect(() => {
        fetchAppointment({ doctor_id: parseInt(doctorId), start_date: appointment_date, end_date: appointment_date, appointment_status: status, department_id: departmentId });
    }, [doctorId, startDate, endDate, status, departmentId, fetchAppointment]);

    

    useEffect(() => {
        if (appointments) {
            setAppointmentData(appointments);
        }
    }, [appointments]);

    useEffect(() => {
       showPatientSerial();
    }, [patientSerial]);

    const handleReload = () => {
        fetchAppointment({ doctor_id: parseInt(doctorId), start_date: appointment_date, end_date: appointment_date, appointment_status: status, department_id: departmentId });
    };

    const showPatientSerial = () => {
       return (
        <>
        {patientSerial ? <div className="text-center my-3">Your Serial Number is: <span className="font-semibold bg-green-600 rounded-md ml-2 p-2 text-white">{patientSerial}</span></div> : "Loading..."}
        </>
       )
    };

   const showCurrentSerial = () =>{

   }
    return (
        <div>
            <div className='my-3'>
                <h3>Doctor Serial</h3>
                <p>Doctor Name: {doctor_name}</p>
                <p>Department: {department_name}</p>
                <p>Appointment Date: {appointment_date}</p>
            </div>
            <div className="my-3 shadow-lg p-4 text-center font-semibold text-lg">
                    Current Serial:  
                   { appointments?.appointments?.filter(appointment => appointment.appointment_status === 'in_consultation').map((appointment, index) => (
                    <span className="font-semibold bg-blue-600 rounded-md ml-2 p-2 text-white" key={appointment.appointment_id}>{appointment.serial_number}</span>   
                ))}
                <br/>
                {showPatientSerial()}
            </div>
            <div className="flex justify-between items-center">
                <h3>Appointments</h3>
                <button
                    onClick={handleReload}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    <i className="bi bi-arrow-clockwise"></i> Reload
                </button>
            </div>
            <PatientsSerialList
            setPatientSerial={setPatientSerial}
                appointments={appointments}
                isLoading={isLoading}
                error={error}
            />
        </div>
    );
}