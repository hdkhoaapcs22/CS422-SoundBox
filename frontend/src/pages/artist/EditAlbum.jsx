import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../global/AppContext";

const EditAlbum = () => {
    const { albumId } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const [album, setAlbum] = useState([]);
    useEffect(async () => {
        try {
            const response = await axios.get(
                import.meta.env.VITE_BACKEND_URL +
                    "/api/artist/album/" +
                    userId +
                    "/" +
                    albumId
            );
            console.log(response);
            // if (response.data.success) {
            //     setAlbum(response.data.album);
            // }
        } catch (error) {
            console.error("Error fetching album data:", error);
            toast.error("Failed to fetch album data.");
        }
    }, []);

    const toggleEdit = () => {
        setIsEdit(!isEdit);
    };

    return (
        <div className="text-white p-10">
            <div className="flex justify-between">
                <span className="text-3xl font-bold">YOUR ALBUM</span>
                <button
                    type="button"
                    className={` px-6 py-2 rounded mb-4
                        ${isEdit ? "bg-red-500" : "bg-green-500"}
                      `}
                    onClick={toggleEdit}
                >
                    {isEdit ? "Cancel" : "Edit"}
                </button>
            </div>
            {/* <form onSubmit={onSubmitHandler}>
                <div className="mb-4">
                    <div className="font-semibold mb-2">Upload Album Image</div>
                    <label htmlFor="uploadAlbumImage">
                        <img
                            className="w-32 h-32 object-cover rounded-lg mb-4"
                            src={
                                albumImage
                                    ? URL.createObjectURL(albumImage)
                                    : assets.uploadArea
                            }
                            alt="Album Cover"
                        />
                        <input
                            onChange={(e) => setAlbumImage(e.target.files[0])}
                            type="file"
                            id="uploadAlbumImage"
                            hidden
                            required
                            disabled={!isEdit}
                        />
                    </label>
                    <Input
                        type="text"
                        label="Album Title"
                        placeholder="Enter album title"
                        value={albumTitle}
                        onChangeValue={setAlbumTitle}
                        required={true}
                        disabled={isEdit}
                    />
                </div>

                {songs.map((song) => (
                    <div
                        key={song.id}
                        className="mb-6 border p-4 rounded bg-white/15"
                    >
                        <div className="flex flex-row justify-between">
                            <h3 className="text-2xl text-white font-semibold mb-4">
                                Song
                            </h3>
                            <button
                                type="button"
                                onClick={() => removeSong(song.id)}
                                className="bg-red-500 text-white text-2xl rounded-full hover:bg-red-600 h-10 w-10 flex items-center justify-center"
                            >
                                <MdDelete />
                            </button>
                        </div>

                        <div className="flex gap-20 mb-4">
                            <div>
                                <div className="font-semibold mb-2">
                                    Song Image
                                </div>
                                <label htmlFor={`uploadSongImage-${song.id}`}>
                                    <img
                                        className="w-32 h-32 object-cover rounded-lg"
                                        src={
                                            !song.image
                                                ? assets.uploadArea
                                                : URL.createObjectURL(
                                                      song.image
                                                  )
                                        }
                                        alt=""
                                    />
                                    <input
                                        onChange={(e) =>
                                            handleSongChange(
                                                song.id,
                                                "image",
                                                e.target.files[0]
                                            )
                                        }
                                        type="file"
                                        id={`uploadSongImage-${song.id}`}
                                        hidden
                                        required
                                        disabled={!isEdit}
                                    />
                                </label>
                            </div>

                            <div>
                                <label
                                    className="font-semibold block mb-2"
                                    htmlFor={`uploadSongAudio-${song.id}`}
                                >
                                    Song Audio
                                </label>
                                <input
                                    id={`uploadSongAudio-${song.id}`}
                                    type="file"
                                    accept="audio/*"
                                    onChange={(e) =>
                                        handleSongChange(
                                            song.id,
                                            "audio",
                                            e.target.files[0]
                                        )
                                    }
                                    required
                                    disabled={!isEdit}
                                />

                                {song.audioPreview && (
                                    <div className="my-4">
                                        <label className="font-semibold block pb-2">
                                            Preview Audio
                                        </label>
                                        <audio controls className="w-full">
                                            <source
                                                src={song.audioPreview}
                                                type="audio/mpeg"
                                            />
                                        </audio>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Input
                            type="text"
                            label="Song Title"
                            placeholder="Enter song title"
                            value={song.title}
                            onChangeValue={(value) =>
                                handleSongChange(song.id, "title", value)
                            }
                        />
                        <div className="mb-6">
                            <label className="block font-semibold">Genre</label>
                            <select
                                value={song.genre}
                                onChange={(e) =>
                                    handleSongChange(
                                        song.id,
                                        "genre",
                                        e.target.value
                                    )
                                }
                                className="w-full mt-1 p-3 bg-gray-400 text-white rounded"
                            >
                                <option value="ballad">Ballad</option>
                                <option value="edm">EDM</option>
                                <option value="pop">Pop</option>
                                <option value="rock">Rock</option>
                                <option value="jazz">Jazz</option>
                                <option value="hip-hop">Hip-Hop</option>
                            </select>
                        </div>

                        <div className="mt-4">
                            <h4 className="text-lg font-semibold">
                                Collaborators
                            </h4>
                            {song.collaborators.map((collaborator, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 mb-2"
                                >
                                    <input
                                        type="text"
                                        placeholder="Enter collaborator name"
                                        value={collaborator}
                                        onChange={(e) =>
                                            handleCollaboratorChange(
                                                song.id,
                                                index,
                                                e.target.value
                                            )
                                        }
                                        className="flex-1 p-2 bg-transparent border border-[#B6FF52] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeCollaborator(song.id, index)
                                        }
                                        className="p-2 bg-red-500 text-white rounded"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addCollaborator(song.id)}
                                className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Add Collaborator
                            </button>
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addSong}
                    className="bg-blue-500 text-white p-2 rounded mb-4"
                >
                    + Add Song
                </button>
                {isEdit && (
                    <>
                        <div className="mb-6">
                            <label className="flex items-center space-x-2 text-sm mb-4">
                                <input
                                    type="checkbox"
                                    className="accent-green-400"
                                    onClick={() =>
                                        setConditionCheckedBox(
                                            !conditionCheckedBox
                                        )
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
                    </>
                )}
            </form> */}
        </div>
    );
};

export default EditAlbum;
