
import { useEffect } from "react";

const AdminDashboard = () => {
  useEffect(()=>{document.title ="Admin Dashboard"})
  return (
    <>
    <h1>WElcome to the Admin </h1>
    </>
  );
};

export default AdminDashboard;
