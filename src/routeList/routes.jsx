import LoginComponent from "../Components/loginEmplove/LoginComponent";
import RegisterEmploye from "../Components/registerEmploye/RegisterEmploye";
import ForgotPassword from "../Components/forgotPassword/ForgotPassword";
import AdminDashboard from "../Components/Admin Management/adminDashboard/AdminDashboard";
import UserDashboard from "../Components/User Management/userDashboard/UserDashboard";
import EmployeeDirctory from "../Components/Admin Management/employeeManagement/EmployeeDirectory";
import AddEmployee from "../Components/Admin Management/employeeManagement/AddEmployee";
import Layout from "../Components/Admin Management/Layout/layout";
import UserLayout from "../Components/User Management/Layout/UserLayout";
import CheckInCheckOut from "../Components/User Management/check-in-check-out/CheckInCheckOut";

const routes = [
  {
    path: "/login",
    element: <LoginComponent />,
  },
  {
    path: "/register",
    element: <RegisterEmploye />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },

  // protected routes
  {
    path: "/admindashboard",
    element: (
      <Layout>
        <AdminDashboard />,
      </Layout>
    ),
    role: "Admin",
  },
  {
    path: "/userdashboard",
    element:(
      <UserLayout>
        <UserDashboard />
      </UserLayout>
    ), 
    role: "User",
  },
  {
    path: "/employee-directory",
    element: (
      <Layout>
        <EmployeeDirctory />,
      </Layout>
    ),
    role: "Admin",
  },
  {
    path: "/add-employee",
    element: (
      <Layout>
        <AddEmployee />,
      </Layout>
    ),
    role: "Admin",  
  },
 { path: "/check-in-check-out",
  element:(
    <UserLayout>
      <CheckInCheckOut/>
    </UserLayout>
  ),
  role: "User"
 }
];

export default routes;
