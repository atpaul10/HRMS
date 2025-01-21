import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { setLoading } from "../../../Redux/attendanceSlice";
import { useDispatch } from "react-redux";

const CheckInCheckOut = () => {
  const db = getFirestore();
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("CurrentUser"));

  const handleCheckInOut = async (type) => {
    if (!currentUser) {
      toast.error("User Not Found ");
      return;
    }
    try {
      dispatch(setLoading(true));
      const checkinsRef = collection(db, "users", currentUser.uid, "checkins");
      await addDoc(checkinsRef, {
        type: type,
        timestamp: serverTimestamp(),
      });
      toast.success(`${type} Recorded Succesfully`);
    } catch (error) {
      console.log(`Error recording ${type}`);
      toast.error(`Failed in record ${type}`);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-[#EDF1D6] py-6 rounded ">
        
        <div className="w-full max-w-md bg-white rounded-lg p-6">
          <h1 className="text-xl font-semibold text-indigo-950 text-center mb-1">
            {" "}
            Check-In / Check-Out
          </h1>
          <div className="flex justify-around mb-6">
            <button
              className="px-4  py-2  bg-[#40513B] text-white rounded hover:bg-[#9DC08B] transition "
              onClick={() => handleCheckInOut("check-in")}
            >
              {" "}
              Check-In
            </button>

            <button
              className="px-4 py-2 bg-red-500 text-white  rounded hover:bg-red-600 transition"
              onClick={() => handleCheckInOut("check-out")}
            >
              {" "}
              Check-Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default CheckInCheckOut;
