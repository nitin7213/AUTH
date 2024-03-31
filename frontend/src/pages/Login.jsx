import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  //Navigation to Dashboard page after clicking Login
  const navigate = useNavigate();

  // Entries
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Password Eye
  const [eye, setEye] = useState("password");
  const handleshowPass = () => {
    setEye(!eye);
  };

  axios.defaults.withCredentials = true; // Necessary for accessing cookies for auth

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Send login request to server
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      // Extract token & username from response data
      const { token, username } = response.data;

      // Store token and username in local storage
      localStorage.setItem("username", username);

      // Use JavaScript to set an HttpOnly cookie
      document.cookie = `token=${token}; path=/;`;

      // Redirect to home page
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="text-white text-center text-3xl font-bold bg-blue-500 flex justify-center w-36 m-auto p-2 rounded-3xl cursor-pointer">
        <Link to="/">Home</Link>
      </div>
      <div className="bg-gray-200 select-none flex rounded-xl  w-10/12   p-8 mt-20 mx-auto flex-col justify-center px-6 py-12 lg:px-8 md:mb-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>
        <div className="mt-0 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="w-full flex items-center justify-between py-5">
              <hr className="w-full bg-gray-400" />
              <hr className="w-full bg-gray-400" />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  value={email}
                  type="email"
                  autoComplete="email"
                  required
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm focus:ring-0 focus:border-gray-700"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  value={password}
                  type={eye ? "password" : "text"}
                  autoComplete="current-password"
                  required
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm focus:ring-0 focus:border-gray-700"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <input
                  id="show_password"
                  name="show_password"
                  onClick={handleshowPass}
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="show_password"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Show password
                </label>
              </div>
              <div className="text-sm">
                <Link
                  to="/forgetpass"
                  className="font-medium text-gray-900 hover:text-gray-700"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 mb-2"
              >
                Login
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not yet Register?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-gray-600 hover:text-gray-500"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
