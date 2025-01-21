import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow ml-60 p-8 overflow-y-auto "> 
        <Navbar />
        <div className="mt-16 p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
