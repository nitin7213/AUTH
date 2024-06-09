import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Header = () => {
  // State to store the user's name
  const [userName, setUserName] = useState("");
  const location = useLocation();

  useEffect(() => {
    // Function to fetch user's name from the backend
    const fetchUserName = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth/user", {
          withCredentials: true,
        });
        // Update the userName state with the user's name from the response
        setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error (e.g., redirect to login page)
      }
    };

    // Call the fetchUserName function when the component mounts or when the route changes
    fetchUserName();
  }, [location.pathname]); // Effect runs when the route changes

  return (
    <div className="bg-blue-500 mx-auto text-center text-white p-2 mb-8">
      <div className="flex items-center justify-between">
        <div className="text-3xl font-bold ">Auth</div>
        <div className="flex gap-2">
          {/* Display user's name if available, otherwise display login and register buttons */}
          {userName ? (
            <div className="text-white">{`Welcome, ${userName}`}</div>
          ) : (
            <>
              <Link to="/login" title="Login">
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                  Login
                </button>
              </Link>
              <Link to="/signup" title="Register">
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
