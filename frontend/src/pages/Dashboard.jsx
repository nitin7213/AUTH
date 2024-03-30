import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    async () => {
      try {
        const response = axios.get("http://localhost:3000/auth/verify");
        if (response.data.status) console.log("User verified");
        else {
          console.log("User not verified");
          navigate("/");
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        // Handle error, e.g., redirect to login page
        navigate("/");
      }
    };
  }, [navigate]);

  //Handling Logout btn
  const handleLogout = () => {
    axios
      .get("http://localhost:3000/auth/logout")
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="flex text-center justify-center font-bold text-6xl text-blue-500">
        Dashboard
      </div>
      <div>
        <div className="text-white text-3xl font-bold mr-4">Welcome, User</div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded m-auto  flex"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
