import React from "react";
import HomePageTop from '../../Molecules/HomePageTop'
import Appointment from '../../Molecules/Appointment/Appointment'
import CurrentAppointment from '../../Molecules/Appointment/CurrentAppointment'
export default function PatientHome() {
  return (
    <>
      {/*-- Home page top */}
      <HomePageTop />

      <div className="my-3">
        <CurrentAppointment />
      </div>

      <Appointment />

      <div className="pt-3"></div>
    </>
  );
}
