import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white ">

      {/* 404 Text */}
      <h1 className="text-7xl font-bold text-purple-500 mb-4 animate-pulse">
        404
      </h1>

      {/* Message */}
      <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
        Page Not Found
      </h2>
<p className="text-5xl mb-4">😵</p>
      <p className="text-zinc-400 text-center max-w-md mb-8">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
        >
          Go Home
        </button>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition"
        >
          Go Back
        </button>

      </div>
    </div>
  );
};

export default NotFound;