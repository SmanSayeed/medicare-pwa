import React, { useState } from "react";
import Button from "../../Atoms/Button/Button";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useCreateAppointmentMutation, useFetchAppointmentMutation } from "@/redux/api/appointmentApi";
import { formatTime } from "@/helpers/formatter";

export default function SlotCard({ className, data, doctorId }) {
  const { user } = useSelector((state) => state.user); // Get patient_id from Redux
  const [appointmentDate, setAppointmentDate] = useState(""); // Appointment date state
  const [createAppointment, { error, isLoading }] = useCreateAppointmentMutation(); // RTK Query mutation
  const [fetchAppointment] = useFetchAppointmentMutation(); // RTK Query mutation for fetching appointments
  const [appointmentInfo, setAppointmentInfo] = useState(null);

  const makeAppointment = async (doctor_id, patient_id, appointment_date) => {
    if (!appointment_date) {
      toast.error("Please select an appointment date.");
      return;
    }

    // Confirm dialog
    const userConfirmed = window.confirm("Are you sure you want to create this appointment?");
    if (!userConfirmed) {
      toast.info("Appointment creation canceled.");
      return;
    }

    try {
      const response = await createAppointment({
        doctor_id,
        patient_id,
        appointment_date,
      }).unwrap();

      console.log("res - ", response);
      if (response.status === "success") {
        setAppointmentInfo({
          appointment_id: response.appointment_id,
          appointment_date: response.appointment_date,
          approx_appointment_time: response.approx_appointment_time,
          serial_number: response.serial_number,
        });

        toast.success(
          `Appointment created! ID: ${response.appointment_id}, Date: ${response.appointment_date}`
        );

        // Refetch current appointments after creating a new one
        await fetchAppointment({ patient_id: user.id });
      } else {
        console.error(response);
        toast.error(response.message);
      }
    } catch (err) {
      console.error("Error creating appointment:", err);
      if (err.status === 500) {
        toast.error("Something went wrong. Please try again later.");
      } else {
        toast.error("Failed to create appointment.");
      }
    }
  };

  return (
    <>
      {/* Appointment Date Input */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <label className="text-xl font-medium text-gray-700">
          Select Appointment Date:
        </label>
        <input
          type="date"
          name="appointment_date"
          className="p-2 border border-gray-300 rounded"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
        />
        <Button
          className=""
          color="btn-primary"
          onClick={() => makeAppointment(doctorId, user.id, appointmentDate)}
        >
          {isLoading ? "Loading..." : "Make Appointment"}
        </Button>
      </div>

      <div>
        {appointmentInfo && (
          <>
            <div className="flex flex-col bg-white rounded-lg my-3 font-bold text-center">
              <div className="bg-orange-400 text-white rounded-t">
                Appointment Date
              </div>
              <div>
                {appointmentInfo.appointment_date} (
                {appointmentInfo.approx_appointment_time})
              </div>

              <div>Serial {appointmentInfo.serial_number}</div>
            </div>
          </>
        )}
      </div>

      <h3 className="font-bold text-lg">Appointment Slots</h3>
      {/* Slot Cards */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ${className}`}>
        {data.appointment_slots.map((slot) => (
          <React.Fragment key={slot.slot_id}>
            <div className="border border-gray-300 p-4 rounded shadow-sm bg-white hover:bg-gray-100 hover:cursor-pointer">
              <h4 className="font-bold text-blue-600 uppercase">{slot.day}</h4>
              <p>
                <strong>Visiting Hours:</strong>{" "}
                {formatTime(slot.visiting_start_time)} -{" "}
                {formatTime(slot.visiting_end_time)}
              </p>
              <p>
                <strong>Approx Visit Time:</strong> {slot.approx_visiting_time}{" "}
                mins
              </p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}