import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginFormValue, LoginResponse } from "../types/types";

export const loginApiSlice = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    credentials: "include",
  }),
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginFormValue>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApiSlice;
