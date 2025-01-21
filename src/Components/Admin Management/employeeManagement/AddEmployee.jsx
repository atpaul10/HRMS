import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import useGenerateId from "./Hooks/useGenerateId";
import { addEmployee } from "../../../Redux/employeeSlice";
import {useEffect} from "react";
import {toast} from "react-toastify" 

const AddEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

   useEffect(() => {document.title = "Add Employee"})

  const dispatch = useDispatch();
  const generateId = useGenerateId();
  

  const onSubmit = async (data) => {
  
    try {
      const uniqueId = generateId(data.department);
      const employeeData = { ...data, employeeId: uniqueId };
      await dispatch(addEmployee(employeeData)).unwrap
      toast.success("Employee Detail Added Successfully");
      reset();  
    } catch (error) {
      console.log("Error in adding data", error);
      toast.error("Failure");
    }
  };  
  return (
    <div className="flex justify-center items-center h-full ">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add Employee
        </h2>

        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Full Name and Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                {...register("fullName", { required: "Full Name is required" })}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter Full Name"
              />
              {errors.fullName && (
                <p className="text-red-600 text-sm">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Address</label>
              <input
                type="text"
                {...register("address", { required: "Address is required" })}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter Address"
              />
              {errors.address && (
                <p className="text-red-600 text-sm">{errors.address.message}</p>
              )}
            </div>
          </div>

          {/* Phone and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">Phone</label>
              <input
                type="text"
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit phone number",
                  },
                })}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter Phone Number"
              />
              {errors.phone && (
                <p className="text-red-600 text-sm">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter Email"
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Job Title and Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">Job Title</label>
              <input
                type="text"
                {...register("jobTitle", { required: "Job Title is required" })}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter Job Title"
              />
              {errors.jobTitle && (
                <p className="text-red-600 text-sm">{errors.jobTitle.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Department</label>
              <input
                type="text"
                {...register("department", {
                  required: "Department is required",
                })}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter Department"
              />
              {errors.department && (
                <p className="text-red-600 text-sm">{errors.department.message}</p>
              )}
            </div>
          </div>

          {/* Blood Group and Date of Joining */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">Blood Group</label>
              <input
                type="text"
                {...register("bloodGroup", {
                  required: "Blood Group is required",
                })}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter Blood Group"
              />
              {errors.bloodGroup && (
                <p className="text-red-600 text-sm">{errors.bloodGroup.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Date of Joining</label>
              <input
                type="date"
                {...register("dateOfJoining", {
                  required: "Date of Joining is required",
                })}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.dateOfJoining && (
                <p className="text-red-600 text-sm">{errors.dateOfJoining.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Date of Birth</label>
              <input
                type="date"
                {...register("dateOfBirth", {
                  required: "Date of Birth is required",
                })}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.dateOfJoining && (
                <p className="text-red-600 text-sm">{errors.dateOfBirth.message}</p>
              )}
            </div>


          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="font-medium mb-2">Emergency Contact</h3>
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input
                type="text"
                {...register("emergencyName", {
                  required: "Emergency Name is required",
                })}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter Emergency Contact Name"
              />
              {errors.emergencyName && (
                <p className="text-red-600 text-sm">{errors.emergencyName.message}</p>
              )}

              <label className="block font-medium mt-4 mb-1">Phone Number</label>
              <input
                type="text"
                {...register("emergencyNumber", {
                  required: "Emergency Phone Number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit phone number",
                  },
                })}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter Emergency Contact Number"
              />
              {errors.emergencyNumber && (
                <p className="text-red-600 text-sm">{errors.emergencyNumber.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white w-full py-3 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
         >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;