import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { Signin } from "@/store/auth/AuthAction";

interface SignInData {
  username: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const loading = useSelector((state: any) => state.auth.loading);
  const error = useSelector((state: any) => state.auth.error);
  const token = useSelector((state: any) => state.auth.userToken);
  console.log(token);

  const [userData, setUserData] = useState<SignInData>({
    username: "",
    password: "",
  });

  const handleLogin: any = (token: string) => {
    // Save the token in localStorage
    localStorage.setItem("token", token);
    // Perform navigation to another page
    router.push("/profile");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("values are", userData);
    dispatch(
      Signin({
        values: userData, // Use userData instead of values
        extra: { action: handleLogin }, // Pass handleLogin as the action
      })
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={userData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      <ToastContainer />
    </>
  );
};

export default LoginForm;
