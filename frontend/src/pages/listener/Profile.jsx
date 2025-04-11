import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../global/AppContext";
import { getUserInformation } from "../../services/userServices";
import { FiEdit3 } from "react-icons/fi";
import assets from "../../assets/assets";

const Profile = () => {
  const { userId, role } = useContext(AppContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId || !role) return;
      const res = await getUserInformation(userId, role);
      if (res.success) {
        setUser(res.user);
      }
    };

    fetchUser();
  }, [userId, role]);

  if (!user) {
    return <div className="text-white px-10 pt-10">Loading...</div>;
  }

  return (
    <div className="text-white px-10 pb-8 min-h-screen">
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
            <div className="flex gap-6 mt-4 font-medium">
              <span>{user.likes || 0} Likes</span>
              <span>{user.following?.length || 0} Following</span>
              <span>{user.followers?.length || 0} Followed</span>
            </div>
          </div>
        </div>

        {/* Right: Edit Button */}
        <button className="flex h-16 items-center gap-2 border border-lime-300 text-lime-300 px-6 py-2 rounded-md hover:bg-lime-300 hover:text-black transition">
          <FiEdit3 />
          <span className="font-semibold">Edit</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
