import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverUrl } from "../App";
import Header from "../components/Editor/Header";
import Chat from "../components/Editor/Chat";
import Preview from "../components/Editor/Preview";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import Editor from "@monaco-editor/react"
import toast from "react-hot-toast";
const WebEditor = () => {
  const { id } = useParams();
  const [website, setWebsite] = useState(null);
  const [error, setError] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    const handleGetWebsite = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/website/get-by-id/${id}`,
          { withCredentials: true },
        );
        setCode(result.data.latestCode);
        setWebsite(result.data);
        setMessage(result.data.conversation);
      } catch (error) {
        const errMsg =
        error.response?.data?.message || error.message || "Something went wrong";
      console.error("generateWebsite error", error);
      toast.error(errMsg);
        setError(error.response?.data || "Something went wrong");
      }
    };

    handleGetWebsite();
  }, [id]);

  // Error State
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  // Loading State
  if (!website) {
    return (
      <div className="h-screen flex items-center justify-center text-zinc-400">
        Loading Preview Page...
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0b0f1a] backdrop-blur-2xl text-white overflow-hidden">
      {/* Main Editor Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat Panel */}
        <aside
        initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3 }}
          className={`
      fixed md:relative
      top-0 left-0
      h-full
      w-85 md:w-90
      border-r border-white/10
      bg-[#0b0f1a]
      flex flex-col
      transition-transform duration-300
      z-50
      ${showChat ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
        >
          <Header website={website} onClose={() => setShowChat(false)} />
          <Chat
            website={website}
            message={message}
            prompt={prompt}
            setPrompt={setPrompt}
            setCode={setCode}
            setMessage={setMessage}
            id={id}
          />
        </aside>

        {/* Backdrop for mobile */}
        {showChat && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowChat(false)}
          />
        )}

        {/* Preview Panel */}
        <main className="flex-1 flex flex-col relative">
          <Preview
            website={website}
            code={code}
            showCode={showCode}
            setShowCode={setShowCode}
            toggleChat={() => setShowChat(!showChat)}
          />
        </main>
      </div>

      <AnimatePresence>
        {showCode && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full lg:w-[45%] z-50 bg-[#0b0f1a] flex flex-col"
          >
            <div className="flex items-center justify-between h-14 px-4 bg-[#1e1e1e] backdrop-blur-2xl border-b border-white/10">
              <span className="text-sm font-medium">index.html</span>
              <button onClick={() => setShowCode(false)}>
                <X size={18}/>
              </button>
            </div>
            <Editor
            theme="vs-dark"
            value={code}
            language="html"
            onChange={(v)=> setCode(v)}
            options={{
    fontSize: 14,
    minimap: { enabled: false },
    wordWrap: "on",
    automaticLayout: true
  }}
            />
          </motion.div>
        )}
      </AnimatePresence>

{/* <AnimatePresence>
  {showChat && (
    <motion.div
     initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0  z-50 bg-black/50 flex flex-col"
    >
      <Header website={website} onClose={() => setShowChat(false)} />
          <Chat
            website={website}
            message={message}
            prompt={prompt}
            setPrompt={setPrompt}
            setCode={setCode}
            setMessage={setMessage}
            id={id}
          />
       
    </motion.div>
  )}
</AnimatePresence> */}

    </div>
  );
};

export default WebEditor;
