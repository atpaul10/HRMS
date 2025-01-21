import ProtectedRoute from "./Components/protectedRoute/ProtectedRoute";
import routes from "./routeList/routes";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
  
    <Router>
      <ToastContainer position="top-right"
       />
      <Routes>
        <Route path="/" element={<Navigate to= "/login"/>}/>

        {routes.map((route,index)=>{
          const{path,element,role}= route;
          const routeElement = role?(
            <ProtectedRoute role={role}>{element}</ProtectedRoute>
          ):(
            element
          )
          return <Route key={index} path={path} element={routeElement}/>
        })}

      </Routes>
    </Router>
  );
}
export default App;
