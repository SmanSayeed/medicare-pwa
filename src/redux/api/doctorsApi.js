import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery"; // Assume this correctly refers to the baseQuery file

export const doctorsApi = createApi({
  reducerPath: "doctorsApi",
  baseQuery, // Use the enhanced baseQuery
  endpoints: (builder) => ({
    fetchDoctors: builder.query({
      query: (department_id) => ({
        url: "/fetch/doctors", // Endpoint for fetching doctors
        method: "POST",
        body: { department_id: department_id }, // Payload to send in the request
      }),
    }),
    fetchAppointmentSlot: builder.mutation({
      query: (doctorId) => ({
        url: "/fetch/appointment-slot", // Endpoint for fetching appointment slots
        method: "POST",
        body: { doctor_id: doctorId }, // Payload to send in the request
      }),
    }),
    createAppointment: builder.mutation({
      query: (payload) => ({
        url: `/create/appointment`,
        method: "POST",
        body: payload,
      }),
    }),
    fetchDepartments: builder.query({
      query: () => ({
        url: "/fetch/departments", // Endpoint for fetching departments
        method: "GET",
      }),
    }),
  }),
});

export const {
  useFetchDoctorsQuery,
  useFetchAppointmentSlotMutation,
  useCreateAppointmentMutation,
  useFetchDepartmentsQuery,
} = doctorsApi;