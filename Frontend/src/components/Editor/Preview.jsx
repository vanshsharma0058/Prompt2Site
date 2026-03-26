import {
  MessageSquare,
  Circle,
  Rocket,
  Code2,
  Monitor,
  Smartphone,
  Tablet,
  Home,
  LayoutDashboard,
  Check,
  Share,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../App";
import axios from "axios";

const Preview = ({ website, toggleChat, code, showCode, setShowCode }) => {
  const iframeRef = useRef(null);
  const [device, setDevice] = useState("desktop");
  const [copiedId, setCopiedId] = useState("");
  const navigate = useNavigate();

  const handleDeploy = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/website/deploy/${website._id}`,
        {
          withCredentials: true,
        },
      );
      //to open the url i use window.open and open in new tab
      window.open(`${result.data.url}`, "_blank");
    } catch (error) {
      error.response?.data?.message || error.message || "Something went wrong";
      console.error("Deploy error", error);
      toast.error(errMsg);
      setError(errMsg);
      setLoading(false);
    }
  };
  const handleCopyId = async (site) => {
    await navigator.clipboard.writeText(site.deployUrl);
    setCopiedId(site._id);
    setTimeout(() => {
      setCopiedId("");
    }, 2000);
    toast.success("URL Copied to clipboard");
  };
  useEffect(() => {
    if (!iframeRef.current || !code) return;

    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    iframeRef.current.src = url;

    return () => URL.revokeObjectURL(url);
  }, [code]);

  const deviceWidth =
    device === "mobile"
      ? "w-[375px]"
      : device === "tablet"
        ? "w-[768px]"
        : "w-full";
  const copied = copiedId === website._id;
  return (
    <div className="flex flex-col h-full ">
      {/* Top Bar */}
      <div
        className="h-14 flex items-center justify-between px-5 
        bg-white/5 backdrop-blur-xl border-b border-white/10"
      >
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            className="p-1 bg-white/10 rounded-lg "
            onClick={() => navigate("/dashboard")}
          >
            <LayoutDashboard size={16} />
          </button>
          <button
            onClick={toggleChat}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg"
          >
            <MessageSquare size={16} />
          </button>

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Circle className="text-green-500 animate-pulse" size={10} />
            Live Preview
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Device toggle */}
          <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-lg overflow-hidden">
            <button
              onClick={() => setDevice("desktop")}
              className={`p-2 ${device === "desktop" ? "bg-white/10" : ""}`}
            >
              <Monitor size={16} />
            </button>

            <button
              onClick={() => setDevice("tablet")}
              className={`p-2 ${device === "tablet" ? "bg-white/10" : ""}`}
            >
              <Tablet size={16} />
            </button>

            <button
              onClick={() => setDevice("mobile")}
              className={`p-2 ${device === "mobile" ? "bg-white/10" : ""}`}
            >
              <Smartphone size={16} />
            </button>
          </div>

          {/* Code button */}
          <button
            onClick={() => setShowCode(true)}
            className="p-2 bg-white/10 rounded-lg transition"
          >
            <Code2 size={16} />
          </button>

          {/* Deploy */}
          {website.deployed ? (
            <button
              onClick={() => handleCopyId(website)}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg 
            bg-linear-to-r from-purple-600 to-blue-600 
            hover:scale-105 transition shadow-lg shadow-purple-900/30"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  Link Copied
                </>
              ) : (
                <>
                  {" "}
                  <Share size={16} />
                  Share
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleDeploy}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg 
            bg-linear-to-r from-purple-600 to-blue-600 
            hover:scale-105 transition shadow-lg shadow-purple-900/30"
            >
              <Rocket size={14} />
              Deploy
            </button>
          )}
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center overflow-auto p-3 md:p-6">
        <div
          className={`h-full bg-white shadow-2xl rounded-lg overflow-hidden
transition-all duration-300 ${deviceWidth}`}
        >
          <iframe
            ref={iframeRef}
            className="w-full h-full border-none"
            title="website-preview"
          />
        </div>
      </div>
    </div>
  );
};

export default Preview;
