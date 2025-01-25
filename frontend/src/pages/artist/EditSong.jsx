import { useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../global/AppContext";
import assets from "../../assets/assets";
import Input from "../../components/Input";

const EditSong = () => {
    const { songId } = useParams();
    const { artistId } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [songTitle, setSongTitle] = useState("");
    const [genre, setGenre] = useState("Ballad");
    const [songImage, setSongImage] = useState(null);
    const [audio, setAudio] = useState(null);
    const [audioPreview, setAudioPreview] = useState(null);
    const [collaborators, setCollaborators] = useState([]);
    const [conditionCheckedBox, setconditionCheckedBox] = useState(false);

    const fetchSongInformation = async () => {
        try {
            const response = await axios.get(
                import.meta.env.VITE_BACKEND_URL +
                    "/api/artist/song/" +
                    artistId +
                    "/" +
                    songId
            );
            if (response.data.success) {
                setSongTitle(response.data.song.title);
                setGenre(response.data.song.genre);
                setCollaborators(response.data.song.collaborators);
                setSongImage(response.data.song.imageUrl);
                setAudio(response.data.song.audioUrl);
                setAudioPreview(response.data.song.audioUrl);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchSongInformation();
    }, []);

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
            formData.append("image", songImage);
            formData.append("audio", audio);
            formData.append("id", artistId);

            // const response = await axios.post(
            //     import.meta.env.VITE_BACKEND_URL + "/api/artist/update-song",
            //     formData
            // );

            // if (response.data.success) {
            //     toast.success("Song uploaded successfully!");
            // } else {
            //     toast.error(response.message);
            // }
            console.log("Submit");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
            setIsEdit(false);
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
        <div className="w-full h-full text-white p-10">
            <div className="flex justify-between">
                <span className="text-3xl font-bold">YOUR SONG</span>
                <button
                    type="button"
                    className={` px-6 py-2 rounded mb-4
                        ${isEdit ? "bg-red-500" : "bg-green-500"}
                      `}
                    onClick={() => setIsEdit(!isEdit)}
                >
                    {isEdit ? "Cancel" : "Edit"}
                </button>
            </div>
            <form onSubmit={onSubmitHandler}>
                <div className="mb-4">
                    <div className="flex gap-20">
                        <div>
                            <div className="font-semibold mb-2">Song Image</div>
                            <label htmlFor="artistViewSingleSongImage">
                                <img
                                    className="w-20"
                                    src={
                                        !songImage
                                            ? assets.uploadArea
                                            : songImage
                                    }
                                    alt=""
                                />
                                <input
                                    onChange={(e) =>
                                        setSongImage(e.target.files[0])
                                    }
                                    type="file"
                                    name=""
                                    id="artistViewSingleSongImage"
                                    hidden
                                    disabled={!isEdit}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            {isEdit && (
                                <>
                                    <label
                                        className="font-semibold block"
                                        htmlFor="artistViewSingleSongAudio"
                                    >
                                        Sound File
                                    </label>
                                    <input
                                        id="artistViewSingleSongAudio"
                                        type="file"
                                        name="soundFile"
                                        accept="audio/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setAudio(file);
                                            if (file) {
                                                setAudioPreview(
                                                    URL.createObjectURL(file)
                                                );
                                            } else {
                                                setAudioPreview(null);
                                            }
                                        }}
                                        className="text-white p-2 rounded"
                                        required
                                    />
                                </>
                            )}
                            {audioPreview && (
                                <div className="my-4">
                                    <label className="font-semibold block pb-2 mr-48">
                                        Preview Audio
                                    </label>
                                    <audio controls className="w-full">
                                        <source
                                            src={audioPreview}
                                            type="audio/mpeg"
                                        />
                                        Your browser does not support the audio
                                        tag.
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
                    isDisabled={!isEdit}
                />
                <div className="mb-6">
                    <label className="block font-semibold">Genre</label>
                    <select
                        name="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="w-full mt-1 mb-4 p-3 bg-gray-400 border border-[#B6FF52] rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        disabled={!isEdit}
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
                {collaborators.length > 0 ? (
                    <>
                        <div className="font-semibold">Collaborators</div>
                        {collaborators.map((collaborator, index) => (
                            <div key={index} className="mb-4 flex items-center">
                                <input
                                    type="text"
                                    placeholder="Enter collaborator"
                                    value={collaborator}
                                    onChange={(e) => {
                                        const updated = [...collaborators];
                                        updated[index] = e.target.value;
                                        setCollaborators(updated);
                                    }}
                                    disabled={!isEdit}
                                    className="w-full mt-1 mb-4 p-3 bg-transparent border border-[#B6FF52] rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 "
                                />
                                {isEdit && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeCollaborator(index)
                                        }
                                        className="ml-2 bg-red-500 p-2 rounded"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                    </>
                ) : (
                    !isEdit && <p>No collaborators added yet.</p>
                )}

                {isEdit && (
                    <>
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
                        <label className="flex items-center space-x-2 text-sm mb-4">
                            <input
                                type="checkbox"
                                className="accent-green-400"
                                onClick={() =>
                                    setconditionCheckedBox(!conditionCheckedBox)
                                }
                            />
                            <span className="text-gray-300">
                                I accept the{" "}
                                <a
                                    href="#"
                                    className="text-green-400 font-bold hover:underline"
                                >
                                    Terms of use
                                </a>{" "}
                                and{" "}
                                <a
                                    href="#"
                                    className="text-green-400 font-bold hover:underline"
                                >
                                    Subscription
                                </a>
                            </span>
                        </label>
                        <button
                            type="submit"
                            className="w-full bg-green-400 text-white p-2 rounded font-bold mt-6"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div
                                        className="w-4 h-4 border-4 border-white
                                        border-t-transparent rounded-full 
                                        animate-spin"
                                    ></div>
                                    Updating...
                                </div>
                            ) : (
                                "Update"
                            )}
                        </button>
                    </>
                )}
            </form>
        </div>
    );
};

export default EditSong;
