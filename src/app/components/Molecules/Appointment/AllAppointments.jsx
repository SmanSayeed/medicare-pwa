import React, { useEffect, useState } from 'react';
import { useFetchAppointmentsMutation } from '../../../../redux/api/appointmentApi';
import { useFetchDoctorsQuery } from '../../../../redux/api/doctorsApi';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

export default function AllAppointments() {
    const [doctorId, setDoctorId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('all');
    const [departmentId, setDepartmentId] = useState('');
    const [collapsedRows, setCollapsedRows] = useState({});

    const [appointments, setAppointments] = useState([]);
    const [fetchAppointments, { isLoading, error }] = useFetchAppointmentsMutation();

    const token = useSelector(state => state.user.token) || Cookies.get('token');
    const { data: doctorsResponse } = useFetchDoctorsQuery();
    const doctorsList = doctorsResponse?.doctors || [];

    const handleFetchAppointments = async () => {
        const formData = new FormData();
    
        if (doctorId !== '') formData.append('doctor_id', doctorId);
        if (startDate !== '') formData.append('start_date', startDate);
        if (endDate !== '') formData.append('end_date', endDate);
        if (status !== 'all') formData.append('appointment_status', status);
        if (departmentId !== '') formData.append('department_id', departmentId);

        try {
            const result = await fetchAppointments(formData).unwrap();
            if (result.status === 'success') {
                setAppointments(result.appointments || []);
            } else {
                console.error('Failed to fetch appointments');
            }
        } catch (err) {
            console.error("Error fetching appointments: ", err);
        }
    };

    useEffect(() => {
        handleFetchAppointments();
    }, []);

    const toggleRow = (id) => {
        setCollapsedRows(prevState => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    return (
        <div>
            <h3>Appointments</h3>
            <div className="row mb-3">
                {/* Your filtering controls */}
            </div>
            <button onClick={handleFetchAppointments} className="btn btn-primary mb-3">
                {isLoading ? 'Loading...' : 'Show Appointments'}
            </button>
            {error && <div>Error loading appointments: {error.data}</div>}
            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th width="50px"></th>
                        <th>Serial</th>
                        <th>Date</th>
                        <th>Doctor</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.length > 0 ? (
                        appointments.map((appointment, index) => {
                            const isCollapsed = collapsedRows[appointment.appointment_id];
                            return (
                                <React.Fragment key={appointment.appointment_id}>
                                    <tr>
                                       <td className='flex justify-center items-center'>
                                       <button 
                                                className="p-2 bg-blue-500 text-white rounded-full w-[20px] h-[20px] flex justify-center items-center" 
                                                onClick={() => toggleRow(appointment.appointment_id)}
                                            >
                                                {isCollapsed ? '-' : '+'}
                                            </button>
                                       </td>
                                        <td>
                                          
                                            <div className='flex items-center justify-start gap-3'> 
                                           
                                            {appointment.serial_number}
                                            </div>
                                            </td>
                                        <td>{appointment.appointment_date}</td>
                                        <td>{appointment.doctor_name}</td>
                                    </tr>
                                    {isCollapsed && (
                                        <tr>
                                            <td colSpan="4">
                                                <div>
                                                    <strong>Time:</strong> {appointment.approx_appointment_time}<br />
                                                    <strong>Patient Name: </strong>{appointment.patient_name}<br />
                                                    <strong>Serial:</strong> {appointment.serial_number}<br />
                                                    <strong>Department:</strong> {appointment.department_name}<br />
                                                    <strong>Visiting Time (Aprx):</strong> {appointment.approx_visiting_time}<br />
                                                    <strong>Status:</strong> {appointment.appointment_status}<br />
                                                    {/* Add more details or buttons here if needed */}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })
                    ) : (
                        <tr><td colSpan="4">No available appointments</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}