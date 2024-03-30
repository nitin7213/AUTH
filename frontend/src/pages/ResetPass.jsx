import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPass = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      alert("Password and confirm password do not match");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/auth/reset-password/${token}`,
        { password }
      );

      if (response.data.status) {
        navigate("/login");
      }
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="bg-gray-200 select-none flex rounded-xl w-10/12 p-8 mt-20 mx-auto flex-col justify-center px-6 py-12 lg:px-8 md:mb-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset Password
          </h2>
        </div>
        <div className="mt-0 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleReset} className="space-y-6">
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
                  type="password"
                  autoComplete="new-password"
                  required
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm focus:ring-0 focus:border-gray-700"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  type="password"
                  autoComplete="new-password"
                  required
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm focus:ring-0 focus:border-gray-700"
                />
              </div>
            </div>
            <br />
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 mb-2"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
