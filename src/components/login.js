import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setAdmin } from "../utils/productSlice";

const Login = () => {
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const isAdmin = useSelector((store) => store?.products?.isAdmin);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token || isAdmin) {
      navigate("/Admin");
    }
  }, [navigate, isAdmin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    adminApi();
  };

  const adminApi = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Please check admin");
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      dispatch(setAdmin());
      navigate("/Admin");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f3e7d9]">
      <div className="bg-white h-[500px] w-full max-w-sm border border-gray-300 p-6 shadow-md flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold text-center mb-6">Admin Login</h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              ref={emailRef}
              type="email"
              placeholder="Email address"
              className="w-full h-10 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="relative mb-4">
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className="w-full h-10 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button className="w-full h-10 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
