import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie';
import { envConfig } from '@/config/envConfig';

// Custom baseQuery with token
const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: envConfig.API_URL,
  prepareHeaders: (headers, { getState }) => {
    // Retrieve the token from Redux state or cookies
    const token = getState()?.user?.token || Cookies.get('token');
    
    // If we have a token, set it in the headers
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    fetchAppointment: builder.mutation({
      query: (body) => ({
        url: "/fetch/appointment",
        method: "POST",
        body,
      }),
    }),
    cancelAppointment: builder.mutation({
      query: (body) => ({
        url: "/update/appointment",
        method: "POST",
        body,
      }),
    }),
    updateAppointmentStatus: builder.mutation({
      query: ({ token, ...body }) => ({
        url: "/update/appointment",
        method: "POST",
        headers: { 'Authorization': `Bearer ${token}` },
        body,
      }),
    }),
    createAppointment: builder.mutation({
      query: (body) => ({
        url: "/create/appointment",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { 
  useFetchAppointmentMutation,
  useCancelAppointmentMutation,
  useUpdateAppointmentStatusMutation,
  useCreateAppointmentMutation,
} = appointmentApi;