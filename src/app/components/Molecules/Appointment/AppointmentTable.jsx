import React from "react";
import Badge from "../../Atoms/Badge/Badge";
import { formatDate, formatTime } from "@/helpers/formatter";
import Link from "next/link";
import routeHelper from "@/helpers/routeHelper";
import { StatusBadge } from "../../Atoms/Badge/StatusBadge";
import SerialStatusBadge from "../../Atoms/Badge/SerialStatusBadge";
import { useSelector } from "react-redux";

export default function AppointmentTable({ appointments, onCancel }) {
  const user = useSelector((state) => state.user);
  const userId = user.id;
  console.log("user",user);
  return (
    <table className="table table-bordered table-hover">
      <thead className="thead-dark">
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Time</th>
          <th>Serial</th>
          <th>Doctor</th>
          <th>Visiting time (Aprx)</th>
          <th className="w-[120px]">Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment, index) => (
          <tr key={appointment.appointment_id}>
            <td>{index + 1}</td>
            <td>{formatDate(appointment.appointment_date)}</td>
            <td>{formatTime(appointment.approx_appointment_time)}</td>
            <td>{appointment.serial_number}</td>
            <td>{appointment.doctor_name} ({appointment.department_name})</td>
        
            <td>
              {formatTime(appointment.visiting_start_time)} -{" "}
              {formatTime(appointment.visiting_end_time)}
            </td>

            <td>
              <SerialStatusBadge status={appointment.appointment_status} />
            </td>
            <td>
              <div className="d-flex gap-2">
              <Link href={routeHelper.serial(appointment.doctor_id,appointment.appointment_date,appointment.doctor_name,appointment.department_name)} className="btn btn-primary btn-sm">
                Serial
              </Link>
              {appointment.appointment_status !== "canceled" && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    onCancel(appointment.appointment_id, "canceled")
                  }
                >
                  X
                </button>
              )}
            
              </div>
              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
