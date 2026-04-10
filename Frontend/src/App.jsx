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
import WebEditor from "./pages/Editor";
import LiveSite from "./pages/LiveSite";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Term from "./pages/Term";
import ScrollToTop from "./components/ScrollToTop";
import PaymentHistory from "./pages/PaymentHistory";
import NotFound from "./pages/NotFound";

export const serverUrl = "https://prompt2site-5tiq.onrender.com";

const App = () => {
  useGetCurrentUser();

  const { userData } = useSelector((state) => state.user);
  return (
    <div className="relative bg-[rgb(11,15,26)] text-white ">
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
        <ScrollToTop />
        {/* Pages WITH Navbar & Footer */}
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
             <Route path="/about" element={<About />} />
             <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Term />} />
          </Route>
          <Route element={<DashLayout />}>
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
            element={userData ? <WebEditor /> : <Home />}
          />
         
          <Route path="/payment-history" element={userData ? <PaymentHistory /> : <Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/site/:id" element={<LiveSite />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
