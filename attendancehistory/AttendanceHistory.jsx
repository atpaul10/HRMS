import { useSelector,useDispatch } from 'react-redux'
import { setCheckins,setError,setLoading } from '../../../Redux/attendanceSlice'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { getFirestore,collection,getDocs } from 'firebase/firestore'

const AttendanceHistory = ()=>{

    const dispatch = useDispatch()
    const db = getFirestore()
    const currentUser = JSON.parse(localStorage.getItem("CurrentUser"))

    const {checkins,loading}= useSelector((state)=>state.attendance)
    
    useEffect(()=>{
     if(currentUser){
        fetchAttendanceData()
     }
    },[])
    
    const fetchAttendanceData = async()=>{
        if(!currentUser){
            toast.error("User Not Found")
            return;
        }
        try {
            dispatch(setLoading(true));
            const checkinsRef = collection(db,"users",currentUser.uid,"checkins")
            const snapshot = await getDocs(checkinsRef)
            const data = snapshot.docs.map((doc)=>{
                const record = doc.data();
                return{
                    id:doc.id,
                    ...record,
                    timestamp: record.timestamp ? record.timestamp.toDate().toISOString():null                }
            })
            dispatch(setCheckins(data))
        } catch (error) {
            console.log(`Error in fetching attendance history`,error);
            toast.error("Failed to fetch attendance history")
            
        }finally{
            dispatch(setLoading(false))
        }
    }
    const formattedData = checkins.map((record) => ({
        ...record,
        date: record.timestamp ? new Date(record.timestamp).toLocaleDateString() : '',
        time: record.timestamp ? new Date(record.timestamp).toLocaleTimeString() : '',
        day: record.timestamp
          ? new Date(record.timestamp).toLocaleDateString('en-US', { weekday: 'long' })
          : '',
        month: record.timestamp
          ? new Date(record.timestamp).toLocaleDateString('en-US', { month: 'long' })
          : '',
      }));
      
      
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 py-6">
          <div className="w-full max-w-4xl bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold text-indigo-950 text-center mb-4">Attendance History</h2>
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-indigo-500 text-white">
                      <th className="px-4 py-2 border border-gray-200">Date</th>
                      <th className="px-4 py-2 border border-gray-200">Day</th>
                      <th className="px-4 py-2 border border-gray-200">Month</th>
                      <th className="px-4 py-2 border border-gray-200">Check-In Time</th>
                      <th className="px-4 py-2 border border-gray-200">Check-Out Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formattedData.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          No attendance records found.
                        </td>
                      </tr>
                    ) : (
                      formattedData.map((record) => (
                        <tr key={record.id} className="hover:bg-gray-100">
                          <td className="px-4 py-2 border border-gray-200">{record.date}</td>
                          <td className="px-4 py-2 border border-gray-200">{record.day}</td>
                          <td className="px-4 py-2 border border-gray-200">{record.month}</td>
                          <td className="px-4 py-2 border border-gray-200">
                            {record.type === 'check-in' ? record.time : ''}
                          </td>
                          <td className="px-4 py-2 border border-gray-200">
                            {record.type === 'check-out' ? record.time : ''}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      );



}

export default AttendanceHistory