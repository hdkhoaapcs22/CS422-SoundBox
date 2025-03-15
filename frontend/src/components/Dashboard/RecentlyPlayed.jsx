import React from "react";
import assets from "../../assets/assets";
import SongList from "../SongList";

const recentlyPlayedSongs = [
  {
    id: 1,
    title: "POP!",
    name: "Nayeon",
    imageUrl: assets.reputation,
    likes: 922,
  },
  {
    id: 2,
    title: "Bad Habit",
    name: "Steve Lacy",
    imageUrl: assets.harry_house,
    likes: 922,
  },
  {
    id: 3,
    title: "Gunjou",
    name: "Yoasobi",
    imageUrl: assets.pink_venom,
    likes: 922,
  },
  {
    id: 4,
    title: "Flying High",
    name: "JKT48",
    imageUrl: assets.aespa,
    likes: 922,
  },
  {
    id: 5,
    title: "Until I Found You",
    name: "Stephen Sanchez",
    imageUrl: assets.sound_banner_1,
    likes: 922,
  },
  {
    id: 6,
    title: "Until I Found You",
    name: "Stephen Sanchez",
    imageUrl: assets.sound_banner_1,
    likes: 922,
  },
];

const RecentlyPlayed = () => {
  return <SongList title="Recently Played" songs={recentlyPlayedSongs} />;
};

export default RecentlyPlayed;
