import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <div className="flex text-center justify-center font-bold text-6xl text-blue-500">
        Home
      </div>
      <button
        onClick={handleDashboard}
        className="bg-blue-500 mt-8 text-white font-bold py-2 px-4 rounded m-auto flex"
      >
        Dashboard
      </button>
    </div>
  );
};

export default Home;
