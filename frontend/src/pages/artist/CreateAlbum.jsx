import React, { useState, useContext } from "react";
import Input from "../../components/Input";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../../global/AppContext";
import assets from "../../assets/assets";

const CreateAlbum = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useContext(AppContext);
    const [albumImage, setAlbumImage] = useState(null);
    const [albumTitle, setAlbumTitle] = useState("");
    const [songs, setSongs] = useState([
        {
            title: "",
            image: null,
            audio: null,
            genre: "Ballad",
            audioPreview: null,
        },
    ]);
    const [conditionCheckedBox, setConditionCheckedBox] = useState(false);

    const handleSongChange = (index, field, value) => {
        setSongs((prevSongs) => {
            const updatedSongs = [...prevSongs];

            if (field === "audio") {
                // Revoke the old object URL to free memory
                if (updatedSongs[index].audioPreview) {
                    URL.revokeObjectURL(updatedSongs[index].audioPreview);
                }

                // Force React to detect a change
                updatedSongs[index] = {
                    ...updatedSongs[index],
                    audio: value,
                    audioPreview: null, // Set to null first
                };

                setTimeout(() => {
                    setSongs((prev) => {
                        const refreshedSongs = [...prev];
                        refreshedSongs[index].audioPreview =
                            URL.createObjectURL(value);
                        return refreshedSongs;
                    });
                }, 0);
            } else {
                updatedSongs[index] = {
                    ...updatedSongs[index],
                    [field]: value,
                };
            }

            return updatedSongs;
        });
    };

    const addSong = () => {
        setSongs([
            ...songs,
            {
                title: "",
                image: null,
                audio: null,
                genre: "Ballad",
                audioPreview: null,
            },
        ]);
    };

    const removeSong = (index) => {
        if (songs.length > 1) {
            setSongs(songs.filter((_, i) => i !== index));
        } else {
            toast.error("At least one song is required in the album.");
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!conditionCheckedBox) {
            toast.error("Please accept the terms and conditions.");
            return;
        }
        if (songs.length < 1) {
            toast.error("Please add at least one song to the album.");
            return;
        }

        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("albumTitle", albumTitle);
            formData.append("albumImage", albumImage);
            formData.append("id", id);

            songs.forEach((song, index) => {
                formData.append(`songs[${index}][title]`, song.title);
                formData.append(`songs[${index}][genre]`, song.genre);
                formData.append(`songs[${index}][image]`, song.image);
                formData.append(`songs[${index}][audio]`, song.audio);
            });

            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/artist/add-album",
                formData
            );

            if (response.data.success) {
                toast.success("Album uploaded successfully!");
                setAlbumTitle("");
                setAlbumImage(null);
                setSongs([
                    {
                        title: "",
                        image: null,
                        audio: null,
                        genre: "Ballad",
                    },
                ]);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-10 text-gray-300">
            <h2 className="text-4xl font-bold mb-4">Create Your Music Album</h2>
            <form onSubmit={onSubmitHandler}>
                <div className="mb-4">
                    <div className="font-semibold mb-2">Upload Album Image</div>
                    <label htmlFor="uploadAlbumImage">
                        <img
                            className="w-20 mb-4"
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
                        />
                    </label>
                    <Input
                        type="text"
                        label="Album Title"
                        placeholder="Enter album title"
                        value={albumTitle}
                        onChangeValue={setAlbumTitle}
                    />
                </div>

                {songs.map((song, index) => (
                    <div
                        key={index}
                        className="mb-6 border p-4 rounded bg-white/15"
                    >
                        <h3 className="text-2xl font-semibold mb-4">
                            Song {index + 1}
                        </h3>

                        <div className="flex gap-20 mb-4">
                            <div>
                                <div className="font-semibold mb-2">
                                    Upload Song Image
                                </div>
                                <label
                                    htmlFor={`artistUploadSongImage${index}`}
                                >
                                    <img
                                        className="w-20"
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
                                                index,
                                                "image",
                                                e.target.files[0]
                                            )
                                        }
                                        type="file"
                                        name=""
                                        id={`artistUploadSongImage${index}`}
                                        hidden
                                        required
                                    />
                                </label>
                            </div>

                            <div>
                                <label
                                    className="font-semibold block mt-2"
                                    htmlFor={`artistUploadSongAudio${index}`}
                                >
                                    Upload Song Audio
                                </label>
                                <input
                                    id={`artistUploadSongAudio${index}`}
                                    type="file"
                                    name="soundFile"
                                    accept="audio/*"
                                    onChange={(e) =>
                                        handleSongChange(
                                            index,
                                            "audio",
                                            e.target.files[0]
                                        )
                                    }
                                    required
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
                                handleSongChange(index, "title", value)
                            }
                        />
                        <div className="mb-6">
                            <label className="block font-semibold">Genre</label>
                            <select
                                value={song.genre}
                                onChange={(e) =>
                                    handleSongChange(
                                        index,
                                        "genre",
                                        e.target.value
                                    )
                                }
                                className="w-full mt-1 p-2 bg-gray-400 text-white rounded"
                            >
                                <option value="ballad">Ballad</option>
                                <option value="edm">EDM</option>
                                <option value="pop">Pop</option>
                                <option value="rock">Rock</option>
                                <option value="jazz">Jazz</option>
                                <option value="hip-hop">Hip-Hop</option>
                            </select>
                        </div>

                        <button
                            type="button"
                            onClick={() => removeSong(index)}
                            className="bg-red-500 text-white p-2 rounded mt-2"
                        >
                            Remove Song
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addSong}
                    className="bg-blue-500 text-white p-2 rounded mb-4"
                >
                    + Add Song
                </button>
                <div className="mb-6">
                    <label className="flex items-center space-x-2 text-sm mb-4">
                        <input
                            type="checkbox"
                            className="accent-green-400"
                            onClick={() =>
                                setConditionCheckedBox(!conditionCheckedBox)
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
            </form>
        </div>
    );
};

export default CreateAlbum;
