import { useLocation } from "react-router";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../../global/AppContext";
import assets from "../../assets/assets";
import { MdDelete } from "react-icons/md";

const EditAlbum = () => {
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);
    const location = useLocation();
    const { album: originalAlbum } = location.state || {};
    console.log(originalAlbum);
    const [albumImage, setAlbumImage] = useState(originalAlbum.image);
    const [albumTitle, setAlbumTitle] = useState(originalAlbum.name);
    const [songs, setSongs] = useState([]);
    const [tmpSongs, setTmpSongs] = useState([]);
    const { userId } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [conditionCheckedBox, setConditionCheckedBox] = useState(false);

    useEffect(() => {
        const fetchSongs = async () => {
            const songIds = originalAlbum.songs;
            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            try {
                let songs = await Promise.all(
                    songIds.map(async (songId) => {
                        const response = await axios.get(
                            `${backendUrl}/api/artist/song/${userId}/${songId}`
                        );
                        if (response.data.success) {
                            return response.data.song;
                        } else {
                            toast.error("Failed to fetch a song");
                            return null;
                        }
                    })
                );
                setSongs(songs.filter((song) => song !== null));
                songs.forEach((song) => (song.audioPreview = song.audioUrl));
                songs = songs.map((song) => {
                    if (
                        song.collaborators.length === 1 &&
                        song.collaborators[0] === ""
                    ) {
                        return { ...song, collaborators: [] };
                    }
                    return song;
                });
                console.log("tmp Songs: ", songs);
                setTmpSongs(songs.filter((song) => song !== null));
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch songs");
            }
        };

        fetchSongs();
    }, []);

    const addSong = (_) => {
        console.log("addSong");
        for (let i = 0; i < tmpSongs.length; ++i) {
            if (
                tmpSongs[i].title.trim() === "" &&
                audio === null &&
                image === null
            ) {
                toast.error("Please fill the song title, audio, and image.");
                return;
            }
            setTmpSongs((prevSongs) => [
                ...prevSongs,
                {
                    id: Date.now(),
                    title: "",
                    imageUrl: null,
                    audioUrl: null,
                    genre: "Ballad",
                    audioPreview: null,
                    duration: 0,
                    collaborators: [],
                },
            ]);
        }
    };

    const removeSong = (songId) => {
        console.log("removeSong");
        if (tmpSongs.length > 2) {
            setTmpSongs(tmpSongs.filter((song) => song._id !== songId));
        } else {
            toast.error("At least two songs are required in the album.");
        }
    };

    const toggleEdit = () => {
        if (isEdit) {
            setTmpSongs(songs);
        }
        setIsEdit(!isEdit);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log("onSubmitHandler");

        if (!conditionCheckedBox) {
            toast.error("Please accept the terms and conditions.");
            return;
        }

        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append("albumTitle", albumTitle);
            formData.append("albumImage", albumImage);
            formData.append("id", userId);
            formData.append("albumId", originalAlbum._id);

            tmpSongs.forEach((song, index) => {
                formData.append(`song[${index}][id]`, song._id);
                formData.append(`song[${index}][title]`, song.title);
                formData.append(`song[${index}][genre]`, song.genre);
                formData.append(`song[${index}][duration]`, song.duration);
                formData.append(
                    `song[${index}][collaborators]`,
                    song.collaborators
                );
                formData.append(`song[${index}][image]`, song.imageUrl);
                formData.append(`song[${index}][audio]`, song.audioUrl);
            });

            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/artist/update-album",
                formData
            );

            if (response.data.success) {
                toast.success("Album uploaded successfully!");
                setTimeout(() => {
                    navigate(-1); // -1 là quay lại trang trước
                }, 1500); // 1.5 giây
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const addCollaborator = (songId) => {
        console.log("addCollaborator");
        setTmpSongs((prevSongs) =>
            prevSongs.map((song) => {
                if (song._id === songId) {
                    for (let i = 0; i < song.collaborators.length; ++i) {
                        if (song.collaborators[i].trim() === "") {
                            toast.error("Please fill the collaborator field");
                            return song;
                        }
                    }
                    return {
                        ...song,
                        collaborators: [...song.collaborators, ""],
                    };
                }
                return song;
            })
        );
    };

    const handleCollaboratorChange = (songId, index, value) => {
        setSongs((prevSongs) =>
            prevSongs.map((song) => {
                if (song.id === songId) {
                    const updatedCollaborators = [...song.collaborators];
                    updatedCollaborators[index] = value;
                    return { ...song, collaborators: updatedCollaborators };
                }
                return song;
            })
        );
    };

    const removeCollaborator = (songId, index) => {
        e.preventDefault();
        console.log("removeCollaborator");
        setTmpSongs((prevSongs) =>
            prevSongs.map((song) => {
                if (song.id === songId) {
                    const updatedCollaborators = song.collaborators.filter(
                        (_, i) => i !== index
                    );
                    return { ...song, collaborators: updatedCollaborators };
                }
                return song;
            })
        );
    };

    const handleSongChange = (songId, field, value) => {
        console.log("songId: ", songId);
        setTmpSongs((prevSongs) => {
            const updatedSongs = [...prevSongs];

            const songIndex = updatedSongs.findIndex(
                (song) => song._id === songId
            );

            if (songIndex !== -1) {
                const song = updatedSongs[songIndex];

                if (field === "audioUrl") {
                    if (song.audioPreview) {
                        URL.revokeObjectURL(song.audioPreview);
                    }

                    updatedSongs[songIndex] = {
                        ...song,
                        audioUrl: value,
                        audioPreview: null,
                        duration: 0,
                    };

                    if (value && value.size > 0) {
                        setTimeout(() => {
                            setTmpSongs((prev) => {
                                const refreshedSongs = [...prev];
                                const audioUrl = URL.createObjectURL(value);
                                refreshedSongs[songIndex].audioPreview =
                                    audioUrl;

                                const audioElement = new Audio(audioUrl);
                                audioElement.onloadedmetadata = () => {
                                    console.log(audioElement.duration);
                                    refreshedSongs[songIndex].duration =
                                        audioElement.duration.toFixed(2);
                                };

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
            <form onSubmit={onSubmitHandler}>
                <div className="mb-4">
                    <div className="font-semibold mb-2">
                        Uploaded Album Image
                    </div>
                    <label htmlFor="uploadAlbumImage">
                        <img
                            className="w-32 h-32 object-cover rounded-lg mb-4"
                            src={
                                albumImage
                                    ? typeof albumImage === "string"
                                        ? albumImage
                                        : URL.createObjectURL(albumImage)
                                    : assets.uploadArea
                            }
                            alt="Album Cover"
                        />
                        <input
                            onChange={(e) => setAlbumImage(e.target.files[0])}
                            type="file"
                            id="uploadAlbumImage"
                            hidden
                            disabled={!isEdit}
                        />
                    </label>
                    <Input
                        type="text"
                        label="Album Title"
                        placeholder="Enter album title"
                        value={albumTitle}
                        onChangeValue={setAlbumTitle}
                        isDisabled={!isEdit}
                    />
                </div>

                {tmpSongs.map((song) => (
                    <div
                        key={song._id}
                        className="mb-6 border p-4 rounded bg-white/15"
                    >
                        <div className="flex flex-row justify-between">
                            <h3 className="text-2xl text-white font-semibold mb-4">
                                Song
                            </h3>
                            <button
                                type="button"
                                onClick={() => removeSong(song._id)}
                                disabled={!isEdit}
                                className={`text-white text-2xl rounded-full h-10 w-10 flex items-center justify-center
                                    ${
                                        isEdit
                                            ? "bg-red-500 hover:bg-red-600 cursor-pointer"
                                            : "bg-red-300 cursor-not-allowed"
                                    }
                                  `}
                            >
                                <MdDelete />
                            </button>
                        </div>

                        <div className="flex gap-20 mb-4">
                            <div>
                                <div className="font-semibold mb-2">
                                    Song Image
                                </div>
                                <label htmlFor={`uploadSongImage-${song._id}`}>
                                    <img
                                        className="w-32 h-32 object-cover rounded-lg"
                                        src={
                                            song.imageUrl
                                                ? typeof song.imageUrl ===
                                                  "string"
                                                    ? song.imageUrl
                                                    : URL.createObjectURL(
                                                          song.imageUrl
                                                      )
                                                : assets.uploadArea
                                        }
                                        alt=""
                                    />
                                    <input
                                        onChange={(e) =>
                                            handleSongChange(
                                                song._id,
                                                "imageUrl",
                                                e.target.files[0]
                                            )
                                        }
                                        type="file"
                                        id={`uploadSongImage-${song._id}`}
                                        hidden
                                        disabled={!isEdit}
                                    />
                                </label>
                            </div>

                            <div>
                                <label
                                    className="font-semibold block mb-2"
                                    htmlFor={`uploadSongAudio-${song._id}`}
                                >
                                    Song Audio
                                </label>
                                <input
                                    id={`uploadSongAudio-${song._id}`}
                                    type="file"
                                    accept="audio/*"
                                    onChange={(e) =>
                                        handleSongChange(
                                            song._id,
                                            "audioUrl",
                                            e.target.files[0]
                                        )
                                    }
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
                            isDisabled={!isEdit}
                            onChangeValue={(value) =>
                                handleSongChange(song._id, "title", value)
                            }
                        />
                        <div className="mb-6">
                            <label className="block font-semibold">Genre</label>
                            <select
                                value={song.genre}
                                onChange={(e) =>
                                    handleSongChange(
                                        song._id,
                                        "genre",
                                        e.target.value
                                    )
                                }
                                className="w-full mt-1 p-3 bg-gray-400 text-white rounded"
                                disabled={!isEdit}
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
                            {song.collaborators &&
                                song.collaborators.map(
                                    (collaborator, index) =>
                                        collaborator != "" && (
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
                                                            song._id,
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={!isEdit}
                                                    required
                                                    className="flex-1 p-2 bg-transparent border border-[#B6FF52] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeCollaborator(
                                                            song._id,
                                                            index
                                                        )
                                                    }
                                                    className="p-2 bg-red-500 text-white rounded"
                                                    disabled={!isEdit}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        )
                                )}
                            <button
                                type="button"
                                onClick={() => addCollaborator(song._id)}
                                className={`p-2 text-white rounded
                                    ${
                                        isEdit
                                            ? "bg-green-500 hover:bg-green-600 cursor-pointer"
                                            : "bg-green-300 cursor-not-allowed"
                                    }
                                  `}
                                disabled={!isEdit}
                            >
                                Add Collaborator
                            </button>
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addSong}
                    disabled={!isEdit}
                    className={`p-2  text-white rounded mb-4 ${
                        isEdit
                            ? "bg-blue-500 cursor-pointer"
                            : "bg-blue-300 cursor-not-allowed"
                    }   `}
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

export default EditAlbum;
