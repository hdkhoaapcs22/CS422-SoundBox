import { ToastContainer } from "react-toastify";
import React, { useContext } from "react";
import SideBar from "./components/Dashboard/SideBar";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import IntroAlbum from "./pages/IntroAlbum";
import IntroArtist from "./pages/IntroArtist";
import IntroSound from "./pages/IntroSound";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";

import Dashboard from "./pages/listener/Dashboard";
import Album from "./pages/listener/Album";
import Artist from "./pages/listener/Artist";
import Favorite from "./pages/listener/Favorite";
import Sound from "./pages/listener/Sound";
import EditProfile from "./pages/EditProfile";

import CreateAlbum from "./pages/artist/CreateAlbum";
import CreateSong from "./pages/artist/CreateSong";
import OwnProduct from "./pages/artist/OwnProduct";
import SongEdit from "./pages/artist/EditSong";
import AlbumEdit from "./pages/artist/EditAlbum";

import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateArtistAccount from "./pages/admin/CreateArtistAccount";

import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";
import SearchHeader from "./components/SearchHeader";
import Player from "./components/Player";
import { PlayerContext } from "./global/PlayerContext";
import AdminSideBar from "./components/Admin/Dashboard/AdminSideBar";
import SearchScreen from "./pages/SearchScreen";
import AlbumView from "./components/Album/AlbumView";
import ArtistView from "./components/Artist/ArtistView";
import Profile from "./pages/listener/Profile";

const App = () => {
  const { audioRef, track } = useContext(PlayerContext);
  const location = useLocation();
  const pagesWithNavbarAndFooter = [
    "/",
    "/intro-artist",
    "/intro-sound",
    "/intro-album",
  ];
  const noSidebarRoutes = [
    "/",
    "/intro-artist",
    "/intro-sound",
    "/intro-album",
    "/login",
    "/forgot-password",
    "/reset-password/:id",
  ];
  const pagesWithSearchHeaderandPlayer = [
    "/dashboard",
    "/album",
    "/artist",
    "/sound",
    "/search",
    "/favorite",
    "/profile",
  ];
  const isAdminRoute = ["/admin/dashboard", "/admin/add-artist"];
  return (
    <div className="w-full h-full gradient-bg overflow-hidden">
      <ToastContainer />
      {pagesWithNavbarAndFooter.includes(location.pathname) && <Navbar />}
      <div
        className={`flex ${
          !noSidebarRoutes.includes(location.pathname) ? "h-screen" : ""
        }`}
      >
        {!noSidebarRoutes.includes(location.pathname) && (
          <div
            className={`w-[15%] flex-none ${
              pagesWithSearchHeaderandPlayer.includes(location.pathname)
                ? "h-[90%]"
                : "h-screen"
            } bg-[#0E1B31] text-white`}
          >
            {isAdminRoute.includes(location.pathname) ? (
              <AdminSideBar />
            ) : (
              <SideBar />
            )}
          </div>
        )}
        <div className="flex-1 flex flex-col">
          {pagesWithSearchHeaderandPlayer.includes(location.pathname) && (
            <SearchHeader />
          )}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/intro-artist" element={<IntroArtist />} />
              <Route path="/intro-sound" element={<IntroSound />} />
              <Route path="/intro-album" element={<IntroAlbum />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:id/" element={<ResetPassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/album" element={<Album />} />
              <Route path="/artist" element={<Artist />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/artist/:artistId" element={<ArtistView />} />
              <Route path="/favorite" element={<Favorite />} />
              <Route path="/sound" element={<Sound />} />
              <Route path="/create-album" element={<CreateAlbum />} />
              <Route path="/create-song" element={<CreateSong />} />
              <Route path="/own-product" element={<OwnProduct />} />
              <Route path="/song/:songId" element={<SongEdit />} />
              <Route path="/album/:albumId" element={<AlbumEdit />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route
                path="/admin/add-artist"
                element={<CreateArtistAccount />}
              />
              <Route path="/search" element={<SearchScreen />} />
            </Routes>
          </div>
        </div>
      </div>
      {pagesWithNavbarAndFooter.includes(location.pathname) && <Footer />}
      {pagesWithSearchHeaderandPlayer.includes(location.pathname) && (
        <div className="h-[10%] fixed bottom-0 w-full">
          <Player />
          <audio ref={audioRef} src={track.audioUrl} preload="auto" />
        </div>
      )}
    </div>
  );
};
export default App;
