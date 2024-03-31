import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForget = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/forgetpass/",
        { email }
      );

      if (response.data.status) {
        alert("Check your Email for reset Password !");
        navigate("/login");
      } else {
        alert("Failed to send reset password email");
      }
    } catch (error) {
      console.error("Error initiating forget password:", error);
      alert("Error initiating forget password. Please try again.");
    }
  };

  return (
    <div>
      <>
        {/* Forget password form */}
        <div className="bg-gray-200 select-none flex rounded-xl w-10/12 p-8 mt-20 mx-auto flex-col justify-center px-6 py-12 lg:px-8 md:mb-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Forget Password
            </h2>
          </div>
          <div className="mt-0 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleForget} className="space-y-6">
              {/* Email input field */}
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

              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 mb-2"
                >
                  Send mail
                </button>
              </div>
            </form>

            {/* Login link */}
            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold leading-6 text-gray-600 hover:text-gray-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </>
    </div>
  );
};

export default ForgetPass;
