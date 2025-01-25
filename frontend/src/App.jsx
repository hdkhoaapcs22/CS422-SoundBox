import { ToastContainer } from "react-toastify";

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
import Profile from "./pages/listener/Profile";
import Sound from "./pages/listener/Sound";

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

const App = () => {
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
        "/login",
        "/forgot-password",
        "/reset-password/:id",
    ];
    return (
        <div className=" h-full bg-gradient-to-br from-[#031b47] to-[#0033a1]">
            <ToastContainer />
            {pagesWithNavbarAndFooter.includes(location.pathname) && <Navbar />}
            <div className="flex">
                {!noSidebarRoutes.includes(location.pathname) && <SideBar />}
                <div className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/intro-artist" element={<IntroArtist />} />
                        <Route path="/intro-sound" element={<IntroSound />} />
                        <Route path="/intro-album" element={<IntroAlbum />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/forgot-password"
                            element={<ForgotPassword />}
                        />
                        <Route
                            path="/reset-password/:id/"
                            element={<ResetPassword />}
                        />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/album" element={<Album />} />
                        <Route path="/artist" element={<Artist />} />
                        <Route path="/favorite" element={<Favorite />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/sound" element={<Sound />} />
                        <Route path="/create-album" element={<CreateAlbum />} />
                        <Route path="/create-song" element={<CreateSong />} />
                        <Route path="/own-product" element={<OwnProduct />} />
                        <Route path="/song/:id" element={<SongEdit />} />
                        <Route path="/album/:id" element={<AlbumEdit />} />

                        <Route
                            path="/admin/dashboard"
                            element={<AdminDashboard />}
                        />

                        <Route
                            path="/admin/add-artist"
                            element={<CreateArtistAccount />}
                        />
                    </Routes>
                </div>
            </div>
            {pagesWithNavbarAndFooter.includes(location.pathname) && <Footer />}
        </div>
    );
};
export default App;
