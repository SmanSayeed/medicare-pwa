'use client'
import Container from "@/app/components/Layout/Container";
import AllAppointments from "@/app/components/Molecules/Appointment/AllAppointments";
import HomePageTop from "@/app/components/Molecules/HomePageTop";
import StaffHomePageTop from "@/app/components/Molecules/Staff/StaffHomePageTop";
import PatientSerial from "@/app/components/Organs/PatientSerial/PatientSerial";
import StaffManagePAppointments from "@/app/components/Organs/Staff/StaffManageAppointments";
import { useSearchParams } from "next/navigation";


export default function Page({params}) {
    const searchParams = useSearchParams()
  const doctorId = params.doctorId;
  const appointmentDate = searchParams.get('appointment_date');
  const doctor_name = searchParams.get('doctor_name');
  const department_name = searchParams.get('department_name');
console.log('appointment_date',appointmentDate)
  // const { data, error, isLoading } = useFetchAppointmentsByDoctorIdQuery(doctorId);
  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error loading appointments: {error.message}</p>;
  // console.log('data',data);
 
  return (
    <>
    
        {/*-- Home page top */}
        <HomePageTop />
      <div className="my-3">
        <Container>
          <PatientSerial doctor_id={doctorId} appointment_date={appointmentDate} doctor_name={doctor_name} department_name={department_name} />
        </Container>
      </div>
      <div className="pt-3"></div>
    </>
  );
}
