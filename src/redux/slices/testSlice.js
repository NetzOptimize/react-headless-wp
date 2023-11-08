// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    fetchTodo: builder.query({
      query: (todoId) => `todos/${todoId}`,
    }),
  }),
});

export const { useFetchTodoQuery } = api;
export default api;
