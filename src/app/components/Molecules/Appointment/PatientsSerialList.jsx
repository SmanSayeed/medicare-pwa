import React from "react";
import SerialStatusBadge from "../../Atoms/Badge/SerialStatusBadge";
import { formatTime } from "@/helpers/formatter";

const PatientsSerialList = ({ appointments, isLoading, error }) => {
  return (
    <div className="p-1">
      {error && (
        <div className="text-red-500 text-center mb-4">
          Error loading appointments: {error.data}
        </div>
      )}
      {isLoading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="overflow-x-auto ">
          <table className="table-auto w-full border-collapse border border-gray-300 bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Serial</th>
                <th className="border border-gray-300 px-4 py-2">Patient Name</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                {/* <th className="border border-gray-300 px-4 py-2">Doctor</th>
                <th className="border border-gray-300 px-4 py-2">Department</th>
                <th className="border border-gray-300 px-4 py-2">Date</th> */}
                <th className="border border-gray-300 px-4 py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {appointments?.appointments?.length > 0 ? (
                appointments?.appointments?.map((appointment, index) => {
                  const isInConsultation =
                    appointment.appointment_status === "in_consultation";
                  const isNextPatient =
                    index > 0 &&
                    appointments.appointments[index - 1].appointment_status ===
                      "in_consultation";

                  return (
                    <tr
                      key={appointment.appointment_id}
                      className={`${
                        isInConsultation
                          ? "bg-blue-100"
                          : isNextPatient
                          ? "bg-green-100"
                          : ""
                      }`}
                    >
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {appointment.serial_number || "N/A"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {appointment.patient_name || "Unknown Patient"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <SerialStatusBadge
                          status={appointment.appointment_status || "unknown"}
                        />
                      </td>
                      {/* <td className="border border-gray-300 px-4 py-2">
                        {appointment.doctor_name || "N/A"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {appointment.department_name || "N/A"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {appointment.appointment_date || "N/A"}
                      </td> */}
                      <td className="border border-gray-300 px-4 py-2">
                        {formatTime(appointment.approx_appointment_time) || "N/A"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                  >
                    No available appointments
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientsSerialList;