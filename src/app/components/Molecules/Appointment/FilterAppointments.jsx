'use client'
import { useFetchDoctorsQuery } from '@/redux/api/doctorsApi';
// FilterAppointments.js
import React, { useEffect } from 'react';

const FilterAppointments = ({ doctorId, setDoctorId, startDate, setStartDate, endDate, setEndDate, status, setStatus, departmentId, setDepartmentId }) => {
   
    const { data: doctors , error, isLoading } = useFetchDoctorsQuery();

    useEffect(() => {
        if (error) {
            console.error('An error occurred: ', error.message);
        }
    }, [error]);

    if (isLoading) {
        return <h3>Loading...</h3>;
    }

    return (
        <div className="row mb-3">
             <div className="col-md-3">
                    <div className="form-group">
                        <label>Filter by Doctor</label>
                        <select 
                            className="form-control" 
                            value={doctorId} 
                            onChange={(e) => setDoctorId(e.target.value)}
                        >
                            <option value="">Select Doctor</option>
                            {doctors?.doctors?.map(doctor => (
                                <option key={doctor.id} value={doctor.id}>
                                    {doctor.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            <div className="col-md-3">
                <div className="form-group">
                    <label>Filter by Start Date</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                    />
                </div>
            </div>
            <div className="col-md-3">
                <div className="form-group">
                    <label>Filter by End Date</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                    />
                </div>
            </div>
            <div className="col-md-3">
                <div className="form-group">
                    <label>Filter by Status</label>
                    <select 
                        className="form-control" 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="created">Created</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>
            </div>
            {/* <div className="col-md-3">
                <div className="form-group">
                    <label>Filter by Department</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Department ID" 
                        value={departmentId} 
                        onChange={(e) => setDepartmentId(e.target.value)} 
                    />
                </div>
            </div> */}
        </div>
    );
};

export default FilterAppointments;