import React, { useState } from "react";
import { useUpdateAppointmentStatusMutation } from "@/redux/api/appointmentApi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatTime } from "@/helpers/formatter";

const AppointmentsTable = ({ appointments, isLoading, error }) => {
  const [collapsedRows, setCollapsedRows] = useState({});
  const [status, setStatus] = useState({});
  const [updateAppointmentStatus, { isLoading: isUpdating }] =
    useUpdateAppointmentStatusMutation();

  const toggleRow = (id) => {
    setCollapsedRows((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const doChangeStatus = async (appointmentId, newStatus) => {
    try {
      const res = await updateAppointmentStatus({
        appointment_id: appointmentId,
        appointment_status: newStatus,
      });
      console.log("res = ",res);
      toast.success('Status updated successfully');
      
     
    } catch (err) {
      toast.error("Failed to update status: ", err);
    }
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    if (window.confirm("Are you sure you want to change status?")) {
      doChangeStatus(appointmentId, newStatus);
    } else {
      toast.error('Cancel status change');
    }
  };

  return (
    <>
      {error && <div>Error loading appointments: {error.data}</div>}
      <table className="table table-bordered ">
        <thead className="thead-dark">
          <tr>
            <th width="50px"></th>
            <th>Serial</th>
            <th>Date</th>
            <th>Patient</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          ) : (
            <>
              {appointments?.appointments?.length > 0 ? (
                appointments?.appointments?.map((appointment, index) => {
                  const isCollapsed = collapsedRows[appointment.appointment_id];
                  return (
                    <React.Fragment key={appointment.appointment_id}>
                      <tr className="min-h-8">
                      <td className="">
                       
                          <button
                            className="p-2 bg-blue-500 text-white rounded-full w-[20px] h-[20px] flex justify-center items-center m-auto"
                            onClick={() =>
                              toggleRow(appointment.appointment_id)
                            }
                          >
                            {isCollapsed ? "-" : "+"}
                          </button>
                        </td>
                        <td>
                          <div className="flex items-center justify-start gap-3">
                            {appointment.serial_number}
                          </div>
                        </td>
                        <td>{appointment.appointment_date}</td>
                        <td>{appointment.patient_name}</td>
                        <td>
                          {/* <label>Change Status</label> */}
                          <select
                            disabled={isUpdating}
                            className="form-control bg-white h-5 pl-3 pr-6 py-1 rounded-lg text-base border-gray-300 placeholder-gray-500 text-gray-900"
                            value={
                              status[appointment.appointment_id] ||
                              appointment.appointment_status
                            }
                            onChange={(e) => {
                              setStatus({
                                ...status,
                                [appointment.appointment_id]: e.target.value,
                              });
                              handleStatusChange(
                                appointment.appointment_id,
                                e.target.value
                              );
                            }}
                          >
                            <option value="created">Created</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="checked_in">Checked In</option>
                            <option value="queue">Queue</option>
                            <option value="in_consultation">In Consultation</option>
                            <option value="completed">Completed</option>
                            <option value="no_show">No Show</option>
                            <option value="canceled">Canceled</option>
                          </select>
                        </td>
                      </tr>
                      {isCollapsed && (
                        <tr>
                          <td colSpan="5">
                            <div>
                              <strong>Time:</strong>{" "}
                              {formatTime(appointment.approx_appointment_time)}
                              <br />
                              <strong>Patient Name: </strong>
                              {appointment.patient_name}
                              <br />
                              <strong>Serial:</strong>{" "}
                              {appointment.serial_number}
                              <br />
                              <strong>Department:</strong>{" "}
                              {appointment.department_name}
                              <br />
                              <strong>Visiting Time (Aprx):</strong>{" "}
                              {appointment.approx_visiting_time}
                              <br />
                              <strong>Status:</strong>{" "}
                              {appointment.appointment_status}
                              <br />
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5">No available appointments</td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </>
  );
};

export default AppointmentsTable;