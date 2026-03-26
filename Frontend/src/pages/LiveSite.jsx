import React, { useState,useEffect } from "react";
import { serverUrl } from "../App";
import axios from "axios";
import { useParams } from "react-router-dom";

const LiveSite = () => {
  const { id } = useParams();
  const [html, setHtml] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const handleGetWebsite = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/website/find-by-slug/${id}`,
          { withCredentials: true },
        );
        setHtml(result.data.latestCode);
      } catch (error) {
        const errMsg =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong";
        console.error("generateWebsite error", error);
        toast.error(errMsg);
        setError("site not founded");
      }
    };

    handleGetWebsite();
  }, [id]);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white text-red">
        {error}
      </div>
    );
  }

  return (
    <iframe
      title="Live Site"
      srcDoc={html}
      className="w-screen h-screen border-none bg-white"
      sandbox="allow-scripts allow-same-origin allow-forms"
    />
  );
};

export default LiveSite;
