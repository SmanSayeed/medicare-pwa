import React from 'react';
import { useFetchDoctorsQuery } from '@/redux/api/doctorsApi';
import Link from 'next/link';

export default function StaffDoctors() {
  const { data, error, isLoading } = useFetchDoctorsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading doctors: {error.message}</p>;

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">Doctors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {data && data.doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white shadow-md rounded-lg p-4">
            <div className="p-4">
              <h3 className="text-xl font-semibold">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.department_name}</p>
              <Link
                href={`/appointments/${doctor.id}`}
                className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded"
              >
                Appointments
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}