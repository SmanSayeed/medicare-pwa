import React from 'react';
import DoctorImage from '../Atoms/Images/DoctorImage';
import Link from 'next/link'
import { envConfig } from '@/config/envConfig';
import routeHelper from '@/helpers/routeHelper'

// Define department color mapping
const departmentColors = {
  Cardiology: 'bg-danger',
  Neurology: 'bg-info',
  Pediatrics: 'bg-success',
  default: 'bg-secondary',
};

const DoctorCard = ({ doctor, className = '' }) => {
  const departmentColor = departmentColors[doctor.department_name] || departmentColors.default;
  console.log(envConfig.BACKEND_URL);
  return (
    <div className={`col-sm-12 col-md-6 ${className}`}>
      <div className="card team-member-card shadow">
        <div className="card-body">
          {/* Member Image */}
          <div className="team-member-img shadow-sm">
            <DoctorImage imageUrl={envConfig.BACKEND_URL+'storage/doctor_images/'+doctor.user_img} />
          </div>
          {/* Team Info */}
          <div className="team-info">
            <h6 className="mb-1 fz-14">{doctor.name}</h6>
            <p className="mb-0 fz-12">{doctor.degree}</p>
            <p className="mb-0 fz-12">{doctor.department_name}</p>
          </div>
        </div>
       
        {/* Action Buttons */}
        <div className="d-flex justify-content-around p-2">
          
        <p className="mb-0 text-truncate">{doctor.email || 'care@example.com'}</p>
        </div>
         {/* Contact Info */}
         <hr/>
         <div className={`contact-info flex justify-between items-center`}>
          
         {/* <button className="btn btn-sm btn-primary">Schedule Appointment</button> */}
         <Link href={routeHelper.home} className="btn btn-sm btn-primary">Schedule Appointment</Link>
          <button className={`btn btn-sm btn-secondary  ${departmentColor}`}>View</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;