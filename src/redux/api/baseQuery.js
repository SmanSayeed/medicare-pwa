import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { envConfig } from '@/config/envConfig';  // Ensure this path is correct

export const baseQuery = fetchBaseQuery({
  baseUrl: envConfig.API_URL, // Base URL for your API
  prepareHeaders: (headers, { getState }) => {
    // Get the token from Redux state
    const token = getState().user.token;
    // Include the token in the Authorization header if it exists
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});