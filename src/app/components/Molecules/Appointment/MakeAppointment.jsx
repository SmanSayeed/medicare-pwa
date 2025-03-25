// MakeAppointment.js
import React from "react";
import DoctorCardAppointment from "../DoctorCardAppointment";
import SlotCard from "./SlotCard";

const MakeAppointment = ({ doctorInfo, isLoading, error, data }) => {
  return (
    <div>
      {doctorInfo && <DoctorCardAppointment doctor={doctorInfo} />}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {isLoading && "Loading..."}
      {data && data.appointment_slots && (
        <div className="mt-6">
          <SlotCard data={data} doctorId={doctorInfo && doctorInfo.id} />
        </div>
      )}
    </div>
  );
};
export default MakeAppointment;