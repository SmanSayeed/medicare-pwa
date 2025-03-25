import React from "react";
import Appointment from "../../Molecules/Appointment/Appointment";
import CurrentAppointment from "../../Molecules/Appointment/CurrentAppointment";
import StaffHomePageTop from "../../Molecules/Staff/StaffHomePageTop";
import AllAppointments from "../../Molecules/Appointment/AllAppointments";
import Container from "../../Layout/Container";
import StaffDoctors from "../../Molecules/Staff/StaffDoctors";

export default function StaffHome() {
  return (
    <>
      {/*-- Home page top */}
      <StaffHomePageTop />

      <div className="my-3">
        <Container>
          <StaffDoctors/>
        </Container>
      </div>
      <div className="pt-3"></div>
    </>
  );
}
