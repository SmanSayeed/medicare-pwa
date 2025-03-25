import React from 'react';
import DoctorImage from '../Atoms/Images/DoctorImage';

// Define department color mapping
const departmentColors = {
  Cardiology: 'bg-danger',
  Neurology: 'bg-info',
  Pediatrics: 'bg-success',
  default: 'bg-secondary',
};

const DoctorCardAppointment = ({ doctor, className = '' }) => {

  return (
    <div className={`w-[300px] ${className}`}>
      <div className="shadow bg-white rounded-lg">
        <div className="flex gap-2 justify-start items-center p-2">
          <div className='rounded-full w-[80px] h-[80px] border-2 border-red-100 flex justify-center items-center text-black'>
          <i className="bi bi-person-circle text-[80px]"></i>
          </div>
          <div className="team-info">
            <h6 className="mb-1 fz-14">{doctor.name}</h6>
            <p className="mb-0 fz-12">{doctor.department_name}</p>
            <p className="mb-0 fz-12">{doctor.email}</p>
          </div>
        </div>     
      </div>
    </div>
  );
};

export default DoctorCardAppointment;