'use client'
import Container from "@/app/components/Layout/Container";
import AllAppointments from "@/app/components/Molecules/Appointment/AllAppointments";
import StaffHomePageTop from "@/app/components/Molecules/Staff/StaffHomePageTop";
import StaffManagePAppointments from "@/app/components/Organs/Staff/StaffManageAppointments";
import { useRouter } from "next/router";

export default function Page({params}) {
  const doctorId = params.doctorId;
  // const { data, error, isLoading } = useFetchAppointmentsByDoctorIdQuery(doctorId);
  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error loading appointments: {error.message}</p>;
  // console.log('data',data);
 
  return (
    <>
      {/*-- Home page top */}
      <StaffHomePageTop />
      
      <div className="my-3">
        <Container>
          <StaffManagePAppointments doctor_id={doctorId} />
        </Container>
      </div>
      <div className="pt-3"></div>
    </>
  );
}
