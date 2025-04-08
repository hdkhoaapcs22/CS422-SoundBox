import React, { useState, useContext } from "react";
import Input from "../../components/Input";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../../global/AppContext";
import assets from "../../assets/assets";

const CreateSong = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useContext(AppContext);
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [songTitle, setSongTitle] = useState("");
  const [genre, setGenre] = useState("ballad");
  const [collaborators, setCollaborators] = useState([]);
  const [conditionCheckedBox, setconditionCheckedBox] = useState(false);
  const [audioDuration, setAudioDuration] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (!conditionCheckedBox) {
        toast.error("Please accept the terms and conditions.");
        return;
      }

      if (collaborators[collaborators.length - 1]?.trim() === "") {
        collaborators.pop();
      }

      const formData = new FormData();
      formData.append("songTitle", songTitle);
      formData.append("genre", genre);
      formData.append("collaborators", collaborators);
      formData.append("image", image);
      formData.append("audio", audio);
      formData.append("artistID", userId);
      formData.append("duration", audioDuration);

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/artist/add-song",
        formData
      );

      if (response.data.success) {
        setSongTitle("");
        setGenre("ballad");
        setCollaborators([]);
        setImage(null);
        setAudio(null);
        document.getElementById("artistUploadSingleSongImage").value = "";
        document.getElementById("artistUploadSingleSongAudio").value = "";
        toast.success("Song uploaded successfully!");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addCollaborator = () => {
    for (let i = 0; i < collaborators.length; ++i) {
      if (collaborators[i] === "") {
        toast.error("Please fill the collaborator field");
        return;
      }
    }
    setCollaborators([...collaborators, ""]);
  };

  const removeCollaborator = (index) => {
    setCollaborators(collaborators.filter((_, i) => i !== index));
  };

  const isEmptyCollaborator = () => {
    for (const collaborator of collaborators) {
      if (collaborator === "") {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="min-h-screen p-10 text-gray-300">
      <h2 className="text-4xl text-white font-bold mb-6">Let Your Imagination Run Wild</h2>

      <form onSubmit={onSubmitHandler}>
        <div className="mb-4">
          <div className="flex gap-20">
            <div>
              <div className="font-semibold mb-2">Upload Song Image</div>
              <label htmlFor="artistUploadSingleSongImage">
                <img
                  className="w-32 h-32 object-cover rounded-lg"
                  src={!image ? assets.uploadArea : URL.createObjectURL(image)}
                  alt=""
                />
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  name=""
                  id="artistUploadSingleSongImage"
                  hidden
                  required
                />
              </label>
            </div>
            <div>
              <label className="font-semibold mb-2 block">
                Upload Sound File
              </label>
              <input
                id="artistUploadSingleSongAudio"
                type="file"
                name="soundFile"
                accept="audio/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setAudio(file);
                  if (file) {
                    // setAudioPreview(URL.createObjectURL(file));
                    const audioUrl = URL.createObjectURL(file);
                    setAudioPreview(audioUrl);
                    const audioElement = new Audio(audioUrl);
                    audioElement.onloadedmetadata = () => {
                      setAudioDuration(audioElement.duration);
                    };
                  } else {
                    setAudioPreview(null);
                    setAudioDuration(null);
                  }
                }}
                className="text-white rounded"
                required
              />
              {audioPreview && (
                <div className="my-4">
                  <label className="font-semibold block pb-2">
                    Preview Audio
                  </label>
                  <audio controls key={audioPreview} className="w-full">
                    <source src={audioPreview} type="audio/mpeg" />
                    Your browser does not support the audio tag.
                  </audio>
                </div>
              )}
            </div>
          </div>
        </div>
        <Input
          type={"text"}
          label={"Song Title"}
          placeholder={"Enter song title"}
          value={songTitle}
          onChangeValue={setSongTitle}
        />

        <div className="mb-6">
          <label className="block font-semibold">Genre</label>
          <select
            name="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full mt-1 mb-4 p-3 bg-gray-400 border border-[#B6FF52] rounded-md text-white text-lg focus:outline-none focus:ring-1 focus:ring-green-400"
            required
          >
            <option value="ballad">Ballad</option>
            <option value="edm">EDM</option>
            <option value="pop">Pop</option>
            <option value="rock">Rock</option>
            <option value="jazz">Jazz</option>
            <option value="hip-hop">Hip-Hop</option>
          </select>
        </div>

        {collaborators.map((collaborator, index) => (
          <div key={index} className="mb-4 flex items-center justify-center">
            <input
              type="text"
              placeholder="Enter collaborator"
              value={collaborator}
              onChange={(e) => {
                const updated = [...collaborators];
                updated[index] = e.target.value;
                setCollaborators(updated);
              }}
              className="w-full mt-1 mb-4 p-3 bg-transparent border border-[#B6FF52] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-400 "
            />
            <button
              type="button"
              onClick={() => removeCollaborator(index)}
              className="ml-2 mt-1 mb-4 p-3 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addCollaborator}
          className={`p-2 rounded mb-4 font-bold text-white ${
            isEmptyCollaborator()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Add Collaborator
        </button>

        <div className="mb-6">
          <label className="flex items-center space-x-2 text-sm mb-4">
            <input
              type="checkbox"
              className="accent-green-400"
              onClick={() => setconditionCheckedBox(!conditionCheckedBox)}
            />
            <span className="text-gray-300">
              I accept the{" "}
              <a href="#" className="text-green-400 font-bold hover:underline">
                Terms of use
              </a>{" "}
              and{" "}
              <a href="#" className="text-green-400 font-bold hover:underline">
                Subscription
              </a>
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-green-400 text-white p-2 rounded font-bold"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div
                className="w-4 h-4 border-4 border-white
                                        border-t-transparent rounded-full 
                                        animate-spin"
              ></div>
              Uploading...
            </div>
          ) : (
            "Upload"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateSong;
