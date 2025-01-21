import UserNavbar from "../navbar/UserNavbar"
import UserSidebar from "../sidebar/UserSidebar"

const UserLayout = ({ children }) => {
  return (
    <div className="flex">
      <UserSidebar />
      <div className="flex-grow ml-60 p-8 overflow-y-auto "> 
        <UserNavbar />
        <div className="mt-16 p-4">{children}</div>
      </div>
    </div>
  );
};

export default UserLayout;
