import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import { PlayerContext } from "../global/PlayerContext";

const UploadAudio = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [songResult, setSongResult] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const { playWithId } = useContext(PlayerContext);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setRecordedBlob(blob);
        setFile(null); // clear manual file if recording
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert(
        "Failed to start recording. Make sure you allow microphone access."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleUpload = async () => {
    const uploadFile = file || recordedBlob;
    if (!uploadFile) {
      alert("Please select or record a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadFile, "recorded_audio.webm");

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/song-identify/identify`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Song identification response:", response.data);
      setSongResult(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert(error.response.data.error || "Song not found.");
        setSongResult(null);
      } else {
        console.error("Failed to identify song:", error);
        alert("An error occurred while identifying the song.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAudio = () => {
    setFile(null);
    setRecordedBlob(null);
  };

  return (
    <div className="text-white py-5">
      {/* File Upload */}
      {/* <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="mb-4"
      /> */}

      <div className="flex flex-col left-0 space-y-4 mb-6">
        <button
          onClick={recording ? stopRecording : startRecording}
          className={`w-20 h-20 flex items-center justify-center rounded-full transition-colors duration-300 ${
            recording
              ? "bg-red-600 animate-pulse"
              : "bg-blue-500 hover:bg-blue-600"
          } shadow-lg`}
        >
          {recording ? (
            <FaMicrophoneSlash size={28} />
          ) : (
            <FaMicrophone size={28} />
          )}
        </button>
        <p className="text-sm text-gray-300">
          {recording ? "Recording... Tap to stop." : "Tap to start recording"}
        </p>
      </div>

      {recordedBlob && (
        <div className="flex flex-row gap-6 items-center pb-5 rounded-lg">
          {/* Playback recorded audio */}

          <div className="">
            <audio controls src={URL.createObjectURL(recordedBlob)} />
          </div>

          <button
            onClick={handleDeleteAudio}
            className="p-3 bg-red-600 rounded-full transition transform hover:scale-105"
          >
            <MdDeleteOutline size={24} />
          </button>
        </div>
      )}

      {/* Upload Button */}
      {recordedBlob && (
        <div className="pb-5">
          <button
            onClick={handleUpload}
            className="px-20 py-3 bg-[#B6FF52] text-black font-semibold rounded-full hover:bg-lime-400 transition"
            disabled={loading}
          >
            {loading ? (
              <div className="flex flex-row gap-5">
                <p>Identifying...</p>
                <ClipLoader color="#36d7b7" size={28} />
              </div>
            ) : (
              "Find Song"
            )}
          </button>
        </div>
      )}

      {/* Display Song Result */}
      {songResult && (
        <div
          onClick={() => playWithId(0, [songResult])}
          className="flex flex-col w-[200px] p-3 items-center rounded-lg cursor-pointer bg-slate-800 transition transform hover:scale-105"
        >
          <img
            src={songResult.imageUrl}
            alt={songResult.title}
            className="w-40 h-40 object-cover rounded-lg"
          />
          <div className="flex flex-row w-full justify-between">
            <div className="flex flex-col pt-2 px-2">
              <p className="text-lg font-bold">{songResult.title}</p>
              <p className="text-xs">{songResult.name || "Unknown Artist"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadAudio;
