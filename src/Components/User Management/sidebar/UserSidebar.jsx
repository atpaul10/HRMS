import {
    FaUsers,
    FaCalendarAlt,
    FaDollarSign,
    FaClipboardList,
    FaFileInvoiceDollar,
    FaPlusCircle,
    FaBars,
    FaHome,
  } from "react-icons/fa";
  import { Link } from "react-router-dom";
  import { TbReportAnalytics } from "react-icons/tb";
  import { FcRules } from "react-icons/fc";
  
  const Sidebar = () => {
    return (
      <div className="bg-[#40513B] text-white h-screen w-60 fixed top-0 left-0 overflow-y-auto z-20">
        <div className="p-4 flex">
          <FaBars className="text-white text-xl cursor-pointer" />
        </div>
        <div className="space-y-1 px-4">
          <Link
            to="/userdashboard"
            className="flex items-center space-x-2 py-2 text-sm hover:bg-[#609966] rounded-md px-2"
          >
            <FaHome />
            <span className="ml-2">Dashboard</span>
          </Link>
  
          {/* Employee Management */}
          <div className="space-y-2">
            <button className="flex items-center space-x-2 py-2 text-sm w-full hover:bg-[#609966] rounded-md px-2">
              <FaUsers />
              <span className="ml-2">Attendance Tracking </span>
            </button>
            <div className="pl-6">
              <Link
                to="/my-attendance-dashboard"
                className="py-2 text-sm flex items-center space-x-2 hover:bg-[#609966] rounded-md px-2"
              >
                <FaClipboardList />
                <span> My Attendance Dashboard</span>
              </Link>
              <Link
                to="/check-in-check-out"
                className="py-2 text-sm flex items-center space-x-2 hover:bg-[#609966] rounded-md px-2"
              >
                <FaPlusCircle />
                <span>Check-In/Check-Out</span>
              </Link>
              <Link
                to="/attendance-history"
                className="py-2 text-sm flex items-center space-x-2 hover:bg-[#609966] rounded-md px-2"
              >
                <FaPlusCircle />
                <span>Attendance History</span>
              </Link>

              <Link
                to="/leave-balance"
                className="py-2 text-sm flex items-center space-x-2 hover:bg-[#609966] rounded-md px-2"
              >
                <FaPlusCircle />
                <span>Leave Balance</span>
              </Link>
            </div>
          </div>
  
          {/* Attendance & Leave */}
          <div className="space-y-2">
            <button className="flex items-center space-x-2 py-2 text-sm w-full px-2">
              <FaCalendarAlt />
              <span className="ml-2">Attendance & Leave</span>
            </button>
  
            <div className="pl-6">
              <Link
                to="/employee-attendance-management"
                className="py-2 text-sm flex items-center space-x-2 hover:bg-indigo-800 rounded-md px-2"
              >
                <FaCalendarAlt />
                <span>Employee Attendance Management</span>
              </Link>
  
              <Link
              to="/attendance-report"
              className="py-4 text-sm flex items-center space-x-2 hover:bg-indigo-800 rounded-md px-2"
              >
                <TbReportAnalytics />
                <span> Attendance Report </span>
              </Link>
              <Link
              to="/attendance-rule-setup"
              className="py-2 text-sm flex items-center space-x-2 hover:bg-indigo-800 rounded-md px-2"
              >
                <FcRules /> 
                <span> Attendance Rule Setup </span>
              </Link>
              <Link
                to="/leave-requests"
                className="py-2 text-sm flex items-center space-x-2 hover:bg-indigo-800 rounded-md px-2"
              >
                <FaClipboardList />
                <span>Leave Request Management </span>
              </Link>
  
              <Link
                to="/leave-requests"
                className="py-2 text-sm flex items-center space-x-2 hover:bg-indigo-800 rounded-md px-2"
              >
                <FaClipboardList />
                <span>Leave Balance Management </span>
              </Link>
  
              
            </div>
          </div>
  
          {/* Payroll Management */}
          <div className="space-y-2">
            <button className="flex items-center space-x-2 py-2 text-sm w-full hover:bg-indigo-800 rounded-md px-2">
              <FaDollarSign />
              <span className="ml-2">Payroll Management</span>
            </button>
            <div className="pl-6">
              <Link
                to="/salary-processing"
                className="py-2 text-sm flex items-center space-x-2 hover:bg-indigo-800 rounded-md px-2"
              >
                <FaDollarSign />
                <span>Salary Processing</span>
              </Link>
              <Link
                to="/pay-slip"
                className="py-2 text-sm flex items-center space-x-2 hover:bg-indigo-800 rounded-md px-2"
              >
                <FaFileInvoiceDollar />
                <span>Pay Slip Generation</span>
              </Link>
            </div>
          </div>
  
          {/* Recruitment & Onboarding */}
          <div className="space-y-2">
            <button className="flex items-center space-x-2 py-2 text-sm w-full hover:bg-indigo-800 rounded-md px-2">
              <FaClipboardList />
              <span className="ml-2">Recruitment & Onboarding</span>
            </button>
            <div className="pl-6">
              <Link
                to="/job-openings"
                className="py-2 text-sm flex items-center space-x-2 hover:bg-indigo-800 rounded-md px-2"
              >
                <FaClipboardList />
                <span>Job Openings</span>
              </Link>
              <Link
                to="/applicant-tracking"
                className="py-2 text-sm flex items-center space-x-2 hover:bg-indigo-800 rounded-md px-2"
              >
                <FaClipboardList />
                <span>Applicant Tracking</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  