import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Forgot Password Component using React Hook Form
function ForgotPassword() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    document.title = "Forgot Password";
  });
  // Function to handle form submission
  const onSubmit = (data) => {
    const { email } = data;
    const users = JSON.parse(localStorage.getItem("user")) || []; // Get users from local storage

    const userIndex = users.findIndex((user) => user.email === email); // Find user by email

    // Check if user exists
    if (userIndex !== -1) {
      localStorage.setItem("user", JSON.stringify(users));
      setMessage("Password is: " + users[userIndex].password); // Display password
    } else {
      setMessage("Email not found Please Register");
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center text-indigo-900 mb-4">
            {" "}
            Forgot Password
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="Email"
                className="block text-grey-700 font-medium mb-1"
              >
                {" "}
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                placeholder="Enter Your Email"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-900 text-white rounded-lg focus:outline-none"
            >
              Submit
            </button>
          </form>
          {message && (
            <p className=" text-sm text-grey-500 text-center mt-1">{message}</p>
          )}

          <p
            onClick={() => navigate("/login")}
            className="text-sm text-indigo-600 text-center mt-4 cursor-pointer hover:underline "
          >
            {" "}
            Back to Login
          </p>
        </div>
      </div>
    </>
  );
}
export default ForgotPassword;
