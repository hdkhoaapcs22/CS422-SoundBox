import React, { useState, useContext } from "react";
import Input from "../../components/Input";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../../global/AppContext";
import assets from "../../assets/assets";

const CreateAlbum = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setArtistId } = useContext(AppContext);
    const [albumImage, setAlbumImage] = useState(null);
    const [albumTitle, setAlbumTitle] = useState("");
    const [songs, setSongs] = useState([
        {
            id: Date.now(),
            title: "",
            image: null,
            audio: null,
            genre: "Ballad",
            audioPreview: null,
        },
        {
            id: Date.now() + 1,
            title: "",
            image: null,
            audio: null,
            genre: "Ballad",
            audioPreview: null,
        },
    ]);
    const [conditionCheckedBox, setConditionCheckedBox] = useState(false);

    const handleSongChange = (songId, field, value) => {
        setSongs((prevSongs) => {
            const updatedSongs = [...prevSongs];

            const songIndex = updatedSongs.findIndex(
                (song) => song.id === songId
            );

            if (songIndex !== -1) {
                const song = updatedSongs[songIndex];

                if (field === "audio") {
                    if (song.audioPreview) {
                        URL.revokeObjectURL(song.audioPreview);
                    }

                    updatedSongs[songIndex] = {
                        ...song,
                        audio: value,
                        audioPreview: null,
                    };

                    if (value && value.size > 0) {
                        setTimeout(() => {
                            setSongs((prev) => {
                                const refreshedSongs = [...prev];
                                refreshedSongs[songIndex].audioPreview =
                                    URL.createObjectURL(value);
                                return refreshedSongs;
                            });
                        }, 0);
                    }
                } else {
                    updatedSongs[songIndex] = {
                        ...song,
                        [field]: value,
                    };
                }
            }

            return updatedSongs;
        });
    };

    const addSong = () => {
        setSongs((prevSongs) => [
            ...prevSongs,
            {
                id: Date.now(),
                title: "",
                image: null,
                audio: null,
                genre: "Ballad",
                audioPreview: null,
            },
        ]);
    };

    const removeSong = (songId) => {
        if (songs.length > 2) {
            setSongs(songs.filter((song) => song.id !== songId));
        } else {
            toast.error("At least two songs are required in the album.");
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!conditionCheckedBox) {
            toast.error("Please accept the terms and conditions.");
            return;
        }

        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append("albumTitle", albumTitle);
            formData.append("albumImage", albumImage);
            formData.append("id", setArtistId);

            songs.forEach((song, index) => {
                formData.append(`songs[image]`, song.image);
                formData.append(`songs[audio]`, song.audio);
                formData.append(`songs[title]`, song.title);
                formData.append(`songs[genre]`, song.genre);
            });

            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/artist/add-album",
                formData
            );

            if (response.data.success) {
                toast.success("Album uploaded successfully!");
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

                {songs.map((song) => (
                    <div
                        key={song.id}
                        className="mb-6 border p-4 rounded bg-white/15"
                    >
                        <h3 className="text-2xl font-semibold mb-4">Song</h3>

                        <div className="flex gap-20 mb-4">
                            <div>
                                <div className="font-semibold mb-2">
                                    Upload Song Image
                                </div>
                                <label htmlFor={`uploadSongImage-${song.id}`}>
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
                                                song.id,
                                                "image",
                                                e.target.files[0]
                                            )
                                        }
                                        type="file"
                                        id={`uploadSongImage-${song.id}`}
                                        hidden
                                        required
                                    />
                                </label>
                            </div>

                            <div>
                                <label
                                    className="font-semibold block mt-2"
                                    htmlFor={`uploadSongAudio-${song.id}`}
                                >
                                    Upload Song Audio
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
                            onClick={() => removeSong(song.id)}
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
