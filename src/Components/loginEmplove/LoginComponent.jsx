import { useEffect } from "react";
import loginImage from "../../assets/loginImage.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore,doc,getDoc } from "firebase/firestore";

//* Login Component using React Hook Form
const LoginComponent = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  useEffect(() => {document.title ="Login"})

  const auth = getAuth();
  const db = getFirestore();


  // const onSubmit = async({name,email,password,role})=>{
  //     try{
  //       const userCredential = await signInWithEmailAndPassword(auth,email,password)
  //       const user = userCredential.user

  //       const userDocRef = doc(db,"users", user.uid)
  //       const userDoc = await getDoc(userDocRef)

  //       if(userDoc.exists()){
  //         const userData = userDoc.data()
          
  //           if(userData.role === role){

  //            const currentUser = {...userData , uid: user.uid, name: name}
  //            localStorage.setItem("CurrentUser",JSON.stringify(currentUser))

  //             role === "Admin" ? navigate("/admindashboard") : navigate("/userdashboard");
  //             toast.success("Login Successfully")
  //           }else{
  //             toast.error("Invaild role Selected")
  //           }
  //       }else{
  //         toast.error("User data Not found")
  //       }
  //     }catch(error){
  //       console.log("Error During Login",error)
  //       toast.error("Invaild Email or Password")
  //     }
   
  // }  
  const onSubmit = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
  
        // Store current user data locally
        const currentUser = { ...userData, uid: user.uid };
        localStorage.setItem("CurrentUser", JSON.stringify(currentUser));
  
        // Navigate to specific dashboard based on role
        if (userData.role === "Admin") {
          navigate("/admindashboard");
        } else if (userData.role === "User") {
          navigate("/userdashboard");
        } else {
          toast.error("Invalid role selected");
        }
  
        toast.success("Login Successfully");
      } else {
        toast.error("User data not found in Firestore.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Invalid Email or Password");
    }
  };
  
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side: Login Form */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-indigo-950 mb-6 ">
            Sign in to your account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
             {/* name  */}
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Name"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>
            {/* Email Field */}
            <div>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                placeholder="Email"
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
            {/* Password Field */}
            <div>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                placeholder="Password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center text-gray-700">
                <input
                  type="checkbox"
                  className="form-checkbox text-indigo-600"
                  {...register("remember")}
                />
                <span className="ml-2">Remember Me</span>
              </label>
              <a onClick={()=>navigate("/ForgotPassword")} className="text-indigo-600 hover:underline">
                Forgot Password?
              </a>
            </div>
              <div>
                  <select 
                  {...register("role", {required: "Role is required"})}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    errors.role ? "border-red-500" : "border-gray-300"
                  }`}
                  >
                    <option value="">Select Your Role</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
              </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 mt-4"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-gray-600 text-center mt-4">
            Do not have an account? {" "}
            <span
              onClick={() => navigate("/Register")}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              Register here
            </span>
          </p>
        </div>
      </div>

      {/* // Right Side: Image */}
      <div className="bg-indigo-500 flex items-center justify-center">
        <img
          src={loginImage} // Image Source
          alt="Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
export default LoginComponent;