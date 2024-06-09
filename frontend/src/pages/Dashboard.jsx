import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios
      .post("http://localhost:3000/auth/logout")
      .then(() => {
        // Clear client-side stored tokens if applicable
        document.cookie =
          "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // Always navigate to login page after logout attempt
        navigate("/login");
      })
      .catch((err) => {
        // Log the error for debugging
        console.log("Logout error:", err);

        // Navigate to login page even if there was an error
        navigate("/login");
      });
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="flex text-center justify-center font-bold text-6xl text-blue-500">
        Dashboard (Protected Route)
      </div>
      <div>
        <div className="text-white text-3xl font-bold mr-4">Welcome, User</div>
        <button
          onClick={handleHome}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded m-auto flex"
        >
          Home
        </button>{" "}
        <button
          onClick={handleLogout}
          className="bg-red-500 mt-8 text-white font-bold py-2 px-4 rounded m-auto flex"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
