'use client';

import React from 'react';
import { useFetchDoctorsQuery } from '@/redux/api/doctorsApi';
import DoctorCard from '../../Molecules/DoctorCard'; // Adjust the path as per your project structure

const DoctorsPage = () => {
  const { data, error, isLoading } = useFetchDoctorsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    console.error('Error fetching doctors:', error);
    return <p>Failed to load doctors.</p>;
  }

  return (
    <div className="page-content-wrapper py-3">
      <div className="team-member-wrapper direction-rtl">
        <div className="container">
          <div className="row g-3">
            {data && data.doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;