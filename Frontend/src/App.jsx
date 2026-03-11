import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Background from "./components/Background";
import Pricing from "./pages/Pricing";
import Docs from "./pages/Docs";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import Dashboard from "./pages/Dashboard";
import { useSelector } from "react-redux";
import DashLayout from "./layouts/DashLayout";
import Generate from "./pages/Generate";
import Editor from "./pages/Editor";
export const serverUrl = "http://localhost:3000";

const App = () => {
  useGetCurrentUser();

  const { userData } = useSelector((state) => state.user);
  return (
    <div className="relative bg-[#0b0f1a] text-white ">
      <Background />
      <div className="relative z-10 min-h-screen">
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: "#1f1f1f",
              color: "#fff",
              borderRadius: "12px",
            },
          }}
        />
        {/* Pages WITH Navbar & Footer */}
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/docs" element={<Docs />} />
          </Route>
          
            <Route
              path="/dashboard"
              element={userData ? <Dashboard /> : <Home />}
            />
            <Route
              path="/generate"
              element={userData ? <Generate /> : <Home />}
            />
            <Route
              path="/editor/:id"
              element={userData ? <Editor /> : <Home />}
            />

       
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
