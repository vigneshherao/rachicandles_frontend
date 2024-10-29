import React, { useRef } from "react";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white w-full max-w-sm border border-gray-300 p-6 shadow-md">
        <h2 className="text-xl font-bold text-center mb-6">Admin Login</h2>
        <form>
          <div className="relative mb-4 mt-6">
            <input
              ref={emailRef}
              type="email"
              placeholder="Email address"
              className={`w-full h-10 p-2 border 
               "border-gray-300"
              rounded-md`}
            />
          </div>

          <div className="relative mb-4 mt-6">
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className={`w-full h-10 p-2 border 
               "border-gray-300"
              rounded-md`}
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
