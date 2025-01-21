import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {deleteEmployee,editEmployee,fetchEmployees} from "../../../Redux/employeeSlice";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";

const EmployeeDirectory = () => {
  const employees = useSelector((state) => state.employee.employees || []);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [viewEmployee, setViewEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("employeeId");

  useEffect(() => {
    document.title = "Employee Directory";
    dispatch(fetchEmployees()).then((response) => {
      console.log("Fetched Employees:", response.payload);
    });
  }, [dispatch]);

  const handleDelete = (id) => {
    console.log("Deleting the emp with Firestore document ID:", id);
    dispatch(deleteEmployee(id))
      .unwrap()
      .then(() => {
        console.log("Employee deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setIsEditing(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(editEmployee(currentEmployee))
      .unwrap()
      .then(() => {
        toast.success("Employee Update Successfully")
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
      });
  };

  const handleView = (employee) => {
    setViewEmployee(employee);
  };
  const filteredEmployees = employees.filter((employee) => {
    if (!searchQuery) return true;
    return employee[filterCategory]
      ?.toString()
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  const calaculateExperience = (dateOfJoining) => {
    const today = new Date();
    const joiningDate = new Date(dateOfJoining);
    const years = today.getFullYear() - joiningDate.getFullYear();
    const months = today.getMonth() - joiningDate.getMonth();
    return `${years} Years ${months < 0 ? 12 + months : months} Months `;
  };

  return (
    <>
      <div className="p-6 ">
        <h2 className="text-lg font-semibold mb-4">Employee Directory</h2>

        <div className="mb-4 flex gap -4">
          <select
            className="px-3 py-2 border-rounded"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="employeeId">Employee Id</option>
            <option value="fullName">Full Name</option>
            <option value="department">Department</option>
            <option value="bloodGroup">Blood Group</option>
          </select>
          <input
            type="text"
            className="w-96  px-3  border py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search For Employee"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {filteredEmployees.length === 0 ? (
          <p className="text-gray-500">
            No Employee Matchs for the Search criteria
          </p>
        ) : (
          <table className="w-full bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-indigo-900 text-white">
                <th className="p-2 text-left">Employee ID</th>
                <th className="p-2 text-left">Full Name</th>
                <th className="p-2 text-left">Address</th>
                <th className="p-2 text-left">Phone</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Date of Joining</th>
                <th className="p-2 text-left">Date of Birth</th>
                <th className="p-2 text-left">Job Title</th>
                <th className="p-2 text-left">Department</th>
                <th className="p-2 text-left">Experience</th>
                <th className="p-2 text-left">Blood Group</th>
                <th className="p-2 text-left">Emergency Contact</th>
                <th className="p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{employee.employeeId}</td>
                  <td className="p-2">{employee.fullName}</td>
                  <td className="p-2">{employee.address}</td>
                  <td className="p-2">{employee.phone}</td>
                  <td className="p-2">{employee.email}</td>
                  <td className="p-2">{employee.dateOfJoining}</td>
                  <td className="p-2">{employee.dateOfBirth}</td>
                  <td className="p-2">{employee.jobTitle}</td>
                  <td className="p-2">{employee.department}</td>
                  <td className="p-2">
                    {calaculateExperience(employee.dateOfJoining)}
                  </td>
                  <td className="p-2">{employee.bloodGroup}</td>
                  <td className="p-2">
                    {employee.emergencyName} ({employee.emergencyNumber})
                  </td>
                  <td className="p-2 flex justify-center gap-2">
                    <FaEye
                      className="text-blue-500 cursor-pointer"
                      title="View"
                      onClick={() => handleView(employee)}
                    />
                    <FaEdit
                      className="text-green-500 cursor-pointer"
                      title="Edit"
                      onClick={() => handleEdit(employee)}
                    />
                    <FaTrash
                      className="text-red-700 cursor-pointer"
                      title="Delete"
                      onClick={() => handleDelete(employee.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {isEditing && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4">Edit Employee</h3>

              <form onSubmit={handleUpdate}>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={currentEmployee.fullName}
                    onChange={(e) =>
                      setCurrentEmployee({
                        ...currentEmployee,
                        fullName: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium">
                    Address
                  </label>
                  <input
                    type="text"
                    value={currentEmployee.address}
                    onChange={(e) =>
                      setCurrentEmployee({
                        ...currentEmployee,
                        address: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={currentEmployee.phone}
                    onChange={(e) =>
                      setCurrentEmployee({
                        ...currentEmployee,
                        phone: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    value={currentEmployee.email}
                    onChange={(e) =>
                      setCurrentEmployee({
                        ...currentEmployee,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                {/* dateOfJoining  */}
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium">
                    Date Of Joining
                  </label>
                  <input
                    type="date"
                    value={currentEmployee.dateOfJoining}
                    onChange={(e) =>
                      setCurrentEmployee({
                        ...currentEmployee,
                        dateOfJoining: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                {/* dateOfBirth  */}
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium">
                    Date Of Birth
                  </label>
                  <input
                    type="date"
                    value={currentEmployee.dateOfBirth}
                    onChange={(e) =>
                      setCurrentEmployee({
                        ...currentEmployee,
                        dateOfJBirth: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                {/* jobTitle  */}
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={currentEmployee.jobTitle}
                    onChange={(e) =>
                      setCurrentEmployee({
                        ...currentEmployee,
                        jobTitle: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded  hover:bg-indigo-700"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {viewEmployee && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-1/3">
              <h3 className="text-lg font-semibold mb-4">Employee Detail</h3>
              <div className="mb-4">
                <p>
                  <strong>Employee ID: </strong> {viewEmployee.employeeId}
                </p>
                <p>
                  <strong>Full Name: </strong> {viewEmployee.fullName}
                </p>
                <p>
                  <strong>Address: </strong> {viewEmployee.address}
                </p>
                <p>
                  <strong>Phone: </strong> {viewEmployee.phone}
                </p>
                <p>
                  <strong>Email: </strong> {viewEmployee.email}
                </p>
                <p>
                  <strong>Job Title: </strong> {viewEmployee.jobTitle}
                </p>
                <p>
                  <strong>Date of Joining: </strong>{" "}
                  {viewEmployee.dateOfJoining}
                </p>
                <p>
                  <strong>Date of Birth: </strong> {viewEmployee.dateOfBirth}
                </p>
                <p>
                  <strong>Department: </strong> {viewEmployee.department}
                </p>
                <p>
                  <strong>Blood Group: </strong> {viewEmployee.bloodGroup}
                </p>
                <p>
                  <strong>Emergency Contact: </strong>{" "}
                  {viewEmployee.emergencyName} {viewEmployee.emergencyNumber}
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  onClick={() => setViewEmployee(null)}
                  className="px-4 py-2 bg-grey-300 rounded"
                >
                  {" "}
                  close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default EmployeeDirectory;
EmployeeDirectory.js;