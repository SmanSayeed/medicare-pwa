import React, { useEffect } from "react";
import Container from "../../Layout/Container";
import AppointmentTable from "./AppointmentTable"; // Import the table component
import {
  useFetchAppointmentMutation,
  useCancelAppointmentMutation,
} from "@/redux/api/appointmentApi";
import { useSelector } from "react-redux";
import SectionHeader from "../../Atoms/Header/SectionHeader";

export default function CurrentAppointment() {
  const [fetchAppointment, { data, error, isLoading }] =
    useFetchAppointmentMutation();
  const [cancelAppointment] = useCancelAppointmentMutation();
  const user = useSelector((state) => state.user?.user); // Ensure user is fetched correctly

  useEffect(() => {
    if (user?.id) {
      // Ensure patient_id is passed correctly
      fetchAppointment({ patient_id: user.id });
    }
  }, [fetchAppointment, user]);

  const handleCancel = async (appointment_id, appointment_status) => {
    try {
      await cancelAppointment({ appointment_id, appointment_status }).unwrap();
      alert("Appointment canceled successfully!");
      // Refresh appointments after cancellation
      if (user?.id) {
        fetchAppointment({ patient_id: user.id });
      }
    } catch (err) {
      console.error("Error canceling appointment:", err);
      alert("Failed to cancel the appointment.");
    }
  };

  const handleReload = () => {
    if (user?.id) {
      fetchAppointment({ patient_id: user.id });
    }
  };

  if (isLoading) return <Container>Loading...</Container>;
  if (error) return <Container>Error loading appointments</Container>;

  return (
    <Container>
      <div className="flex justify-between items-center">
        <SectionHeader className="">Current Appointment</SectionHeader>
        <button
          onClick={handleReload}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <i className="bi bi-arrow-clockwise"></i> Reload
        </button>
      </div>
      {data?.appointments?.length ? (
        <AppointmentTable
          appointments={data.appointments}
          onCancel={handleCancel}
        />
      ) : (
        <p>No appointments found.</p>
      )}
    </Container>
  );
}