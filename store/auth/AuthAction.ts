import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { setUserInfo } from "./AuthSlice";
interface SignInData {
  email?: string;
  password: string;
}
export const Signin = createAsyncThunk(
  "/auth/login",
  async (
    {
      values,
      extra,
    }: {
      values: SignInData;
      extra: { action: () => void };
    },
    { dispatch }
  ) => {
    const { username, password }: any = values;
    const { action } = extra;
    try {
      let loginUser = { username, password }; // Create an object with email and password
      console.log(loginUser);
      dispatch(setUserInfo(loginUser));

      const res = await axios.post(
        "https://dummyjson.com/auth/login",
        loginUser
      );
      localStorage.setItem(
        "access_token",
        JSON.stringify(res.data.access_token)
      );
      const temp = localStorage.getItem("access_token");
      if (res.data.success === false) {
        toast.error(res.data.message); // You need to import toast library or handle the error message differently
      } else {
        toast.success(`Logged in Successfully`); // 'role' is not defined, you may need to replace it with a specific role value
        action && action();
      }
      return res.data;
    } catch (error) {
      toast.error("Something Went Wrong"); // You need to import toast library or handle the error message differently
    }
  }
);
