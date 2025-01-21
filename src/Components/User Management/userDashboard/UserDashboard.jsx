import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const UserDashboard = () => {
  const [userData, setUserData] = useState({});
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = JSON.parse(localStorage.getItem("CurrentUser"));

      if (currentUser) {
        setUserData(currentUser); 
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <div>
      <h1>Welcome, {userData.name}</h1>
      <p>Your role: {userData.role}</p>
    </div>
  );
};

export default UserDashboard;
