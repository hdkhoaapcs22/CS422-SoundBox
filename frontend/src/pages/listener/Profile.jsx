import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../global/AppContext";
import { getUserInformation } from "../../services/userServices";
import { FiEdit3 } from "react-icons/fi";
import assets from "../../assets/assets";
import { getTopListenedSongOfUser } from "../../services/songServices";
import TopTracks from "../../components/intro_sound/TopTrack";
import { IoHeartOutline } from "react-icons/io5";

const Profile = () => {
  const { userId, role } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [topSongs, setTopSongs] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId || !role) return;
      const res = await getUserInformation(userId, role);
      const songs = await getTopListenedSongOfUser(userId);
      if (res.success) {
        setUser(res.user);
      }
      setTopSongs(songs);
    };

    fetchUser();
  }, [userId, role]);

  if (!user) {
    return <div className="text-white px-10 pt-10">Loading...</div>;
  }

  return (
    <div className="h-[88%] flex flex-col text-white px-10 pb-8 overflow-hidden">
      <div className="flex flex-row justify-between">
        {/* Left: Avatar + Info */}
        <div className="flex items-center gap-10">
          <img
            src={user.avatarUrl || assets.defaultAvatarUser}
            alt="avatar"
            className="w-32 h-32 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-sm mt-1">{user.email}</p>
            {/* <div className="flex gap-6 mt-4 font-medium">
              <span>{user.likes || 0} Likes</span>
              <span>{user.following?.length || 0} Following</span>
              <span>{user.followers?.length || 0} Followed</span>
            </div> */}
          </div>
        </div>

        {/* Right: Edit Button */}
        <button className="flex h-16 items-center gap-2 border border-lime-300 text-lime-300 px-6 py-2 rounded-md hover:bg-lime-300 hover:text-black transition">
          <FiEdit3 />
          <span className="font-semibold">Edit</span>
        </button>
      </div>

      {/* Top Tracks*/}
      <h2 className="text-3xl font-bold pb-2">Top Tracks</h2>
      <p className="text-sm font-thin">
        Music that most listened by you this month
      </p>
      <div className="h-full overflow-y-auto scrollbar-hide">
        <table className="w-full text-white my-5">
          <thead>
            <tr className="text-left border-b border-gray-700 text-gray-300">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Song</th>
              <th className="py-2 px-4">Artist</th>
              <th className="py-2 px-4">Monthly Listeners</th>
              <th className="py-2 px-4">Likes</th>
            </tr>
          </thead>

          <tbody>
            {topSongs.map((item, index) => (
              <tr
                key={index + 1}
                className="hover:bg-[#05439f] hover:bg-opacity-20 cursor-pointer"
              >
                <td className="py-4 px-4">{index + 1}</td>
                <td className="py-4 px-4 flex items-center space-x-4">
                  <img
                    src={item.imageUrl}
                    alt={item.imageUrl}
                    className="w-10 h-10 rounded-lg"
                  />
                  <span>{item.title}</span>
                </td>
                <td className="py-4 px-4">{item.name}</td>

                <td className="py-4 px-4">{item.totalPlays}</td>
                <td className="py-4 px-4 flex items-center space-x-2">
                  <IoHeartOutline className="w-5 h-5" />
                  <span>{item.likes}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
