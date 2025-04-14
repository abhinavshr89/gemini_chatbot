import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the API slice
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/gemini/api/' }),
    endpoints: (builder) => ({
        processContent: builder.mutation({
            query: (content) => ({
                url: 'process-content',
                method: 'POST',
                body: { content },
            }),
        }),
    }),
});

// Export the auto-generated hook for the mutation
export const { useProcessContentMutation } = apiSlice;


