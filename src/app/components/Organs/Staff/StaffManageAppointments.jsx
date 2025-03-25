'use client'
import { useFetchAppointmentMutation } from '@/redux/api/appointmentApi';
import React, { useState, useEffect } from 'react';
import FilterAppointments from '../../Molecules/Appointment/FilterAppointments';
import AppointmentsTable from '../../Molecules/Appointment/AppointmentsTable';


export default function StaffManagePAppointments({doctor_id}) {
    const [doctorId, setDoctorId] = useState(doctor_id);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [fetchAppointment, { data: appointments, error, isLoading }] = useFetchAppointmentMutation();
    const [appointmentData,setAppointmentData] = useState([]);

    useEffect(() => {
        fetchAppointment({ doctor_id: parseInt(doctorId), start_date: startDate, end_date: endDate, appointment_status: status, department_id: departmentId });
    }, [doctorId, startDate, endDate, status, departmentId, fetchAppointment]);

    useEffect(() => {
        if (appointments) {
            setAppointmentData(appointments);
        }
    },[appointments]);
    console.log('appontment data ',appointmentData);

    return (
        <div>
            <h3>Appointments</h3>
            <div className="my-3">
            <FilterAppointments 
                doctorId={doctorId}
                setDoctorId={setDoctorId}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                status={status}
                setStatus={setStatus}
                departmentId={departmentId}
                setDepartmentId={setDepartmentId}
            />
            </div>
          
            <AppointmentsTable 
                appointments={appointments}
                isLoading={isLoading}
                error={error}
            />
        </div>
    );
}