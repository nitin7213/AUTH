import { Link } from "react-router-dom";

const Header = () => {
  // Retrieve the username from local storage
  // const username = localStorage.getItem("username");

  return (
    <div className="bg-blue-500 mx-auto text-center text-white p-2 mb-8">
      <div className="flex items-center justify-between">
        <div className="text-3xl font-bold ">Auth</div>
        <div className="flex gap-2">
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
        </div>
      </div>
    </div>
  );
};

export default Header;
