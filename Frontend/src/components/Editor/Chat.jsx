import { Bot, User, Send } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { serverUrl } from "../../App";
import { useEffect, useRef, useState } from "react";

const Chat = ({
  website,
  id,
  prompt,
  message,
  setPrompt,
  setCode,
  setMessage,
}) => {
  const chatRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  
  const thinkingSteps = [
    "Analyzing your request...",
    "Planning website structure...",
    "Planning website structure...",
    "Generating HTML layout...",
    "Preparing the final version...",
  ];

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [website?.conversation]);

  const handleUpdate = async () => {
    if (!prompt?.trim()) {
      toast.error("Please enter a prompt to update the website.");
      return;
    }
    const text = prompt
    setPrompt("")
    setLoading(true);
    setMessage((m) => [...m, { role: "user", content: prompt }]);
    try {
      const result = await axios.post(
        `${serverUrl}/api/website/update/${id}`,
        { prompt:text },
        { withCredentials: true },
      );
      console.log(result);
      setLoading(false);
      setMessage((m) => [...m, { role: "ai", content: result.data.message }]);
      setCode(result.data.code);
     
    } catch (error) {
      setLoading(false);
      const errMsg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      console.error("updateWebsiteConversation error", error);
      toast.error(errMsg);
    }
  };

  useEffect(() => {
    if (!loading) {
      setIndex(0);
      return;
    }
    const i = setInterval(() => {
      setIndex((i) => (i + 1) % thinkingSteps.length);
    }, 1500);
    return () => clearInterval(i);
  }, [loading]);

  return (
    < >
      <div
      ref={chatRef}
        className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-6"
      >
        {message.map((message, index) => {
          const isUser = message.role === "user";

          return (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              {/* AI Avatar */}
              {!isUser && (
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-600/20 shrink-0">
                  <Bot size={16} />
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] md:max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed
${
  isUser
    ? "bg-purple-700 text-white rounded-tr-sm"
    : "bg-white/10 border border-white/10 text-zinc-200 rounded-tl-sm"
}`}
              >
                {message.content}
              </div>

              {/* User Avatar */}
              {isUser && (
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600/20 shrink-0">
                  <User size={16} />
                </div>
              )}
            </div>
          );
        })}

        { loading &&(
          <div className="flex items-start gap-3 justify-start">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-600/20 shrink-0">
              <Bot size={16} />
            </div>
            <div className="max-w-[85%] md:max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed bg-white/10 border border-white/10 text-zinc-200 rounded-tl-sm italic">
              {thinkingSteps[index]}
            </div>
          </div>

        )}
      </div>

      {/* Chat Input */}
      <div className="p-3 border-t border-white/10  backdrop-blur-xl">
        <div className="flex gap-2">
          <textarea
            rows={2}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            value={prompt}
            placeholder="Ask AI to update the website..."
            className="flex-1 resize-none rounded-xl px-4 py-3
bg-white/5 border border-white/10
text-sm outline-none focus:border-purple-500"
          />

          <button
            className="px-4 py-3 bg-purple-600 text-white rounded-xl
hover:bg-purple-700 transition flex items-center justify-center
disabled:bg-purple-900/70"
            onClick={handleUpdate}
            disabled={loading}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
