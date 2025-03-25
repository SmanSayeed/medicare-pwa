import React, { useState } from "react";
import {
  useFetchAppointmentSlotMutation,
  useFetchDoctorsQuery,
  useFetchDepartmentsQuery,
} from "@/redux/api/doctorsApi";
import MakeAppointment from "./MakeAppointment";

const AppointmentSlotFetcher = () => {
  const [departmentId, setDepartmentId] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [fetchAppointmentSlot, { data, error, isLoading }] =
    useFetchAppointmentSlotMutation();
  const {
    data: doctors,
    error: doctorsError,
    isLoading: doctorsLoading,
  } = useFetchDoctorsQuery(departmentId, { skip: !departmentId });
  const {
    data: departments,
    error: departmentsError,
    isLoading: departmentsLoading,
  } = useFetchDepartmentsQuery();

  const handleFetchSlots = async (id) => {
    if (!id) {
      console.error(
        "Please select a doctor before fetching appointment slots."
      );
      return;
    }
    try {
      await fetchAppointmentSlot(id).unwrap();
    } catch (err) {
      console.error("Error fetching appointment slots:", err);
    }
  };

  const setDoctor = async (id) => {
    const selectedDoctor = doctors.doctors.find(
      (doctor) => doctor.id === parseInt(id, 10)
    );
    setDoctorInfo(selectedDoctor);
    setDoctorId(id);
    await handleFetchSlots(id);
  };

  const handleDepartmentChange = (e) => {
    const selectedDepartmentId = e.target.value;
    setDepartmentId(selectedDepartmentId);
    setDoctorId(null);
    setDoctorInfo(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <label>Select Department</label>
        <select
          className="p-2 border border-gray-300 rounded"
          value={departmentId || ""}
          onChange={handleDepartmentChange}
        >
          <option value="" disabled>
            {departmentsLoading ? "Loading..." : "Select a Department"}
          </option>
          {departments &&
            departments.departments.map((department) => (
              <option key={department.department_id} value={department.department_id}>
                {department.department_name}
              </option>
            ))}
        </select>
        {departmentsError && (
          <p className="text-red-500">
            Error loading departments: {departmentsError.message}
          </p>
        )}
      </div>

      {departmentId && (
        <div className="flex flex-col">
          <label>Select Doctor</label>
          <select
            className="p-2 border border-gray-300 rounded"
            value={doctorId || ""}
            onChange={(e) => setDoctor(e.target.value)}
          >
            <option value="" disabled>
              {doctorsLoading ? "Loading..." : "Select a Doctor"}
            </option>
            {doctors &&
              doctors.doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
          </select>
          {doctorsError && (
            <p className="text-red-500">
              Error loading doctors: {doctorsError.message}
            </p>
          )}
        </div>
      )}

      <MakeAppointment doctorInfo={doctorInfo} isLoading={isLoading} error={error} data={data} />
    </div>
  );
};

export default AppointmentSlotFetcher;