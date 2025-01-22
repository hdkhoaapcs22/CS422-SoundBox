import { ToastContainer } from "react-toastify";
import Album from "./pages/listener/Album";
import Artist from "./pages/listener/Artist";
import Dashboard from "./pages/listener/Dashboard";
import Favorite from "./pages/listener/Favorite";
import PlayView from "./pages/listener/PlayView";
import Profile from "./pages/listener/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import IntroAlbum from "./pages/IntroAlbum";
import IntroArtist from "./pages/IntroArtist";
import IntroSound from "./pages/IntroSound";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";

import CreateAlbum from "./pages/artist/CreateAlbum";
import CreateSong from "./pages/artist/CreateSong";
import EditAlbum from "./pages/artist/EditAlbum";
import EditSong from "./pages/artist/EditSong";
import OwnProduct from "./pages/artist/OwnProduct";

import AdminDashboard from "./pages/admin/AdminDashboard";

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
    return (
        <div className=" h-full bg-gradient-to-br from-[#031b47] to-[#0033a1]">
            <ToastContainer />
            {pagesWithNavbarAndFooter.includes(location.pathname) && <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/intro-artist" element={<IntroArtist />} />
                <Route path="/intro-sound" element={<IntroSound />} />
                <Route path="/intro-album" element={<IntroAlbum />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                    path="/reset-password/:id/"
                    element={<ResetPassword />}
                />
                <Route path="/artist" element={<Artist />} />
                <Route path="/favorite" element={<Favorite />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/album" element={<Album />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/play-view" element={<PlayView />} />

                <Route path="/artist/create-album" element={<CreateAlbum />} />
                <Route path="/artist/create-song" element={<CreateSong />} />
                <Route path="/artist/edit-album" element={<EditAlbum />} />
                <Route path="/artist/edit-song" element={<EditSong />} />
                <Route path="/artist/own-product" element={<OwnProduct />} />

                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
            {pagesWithNavbarAndFooter.includes(location.pathname) && <Footer />}
        </div>
    );
};
export default App;
