import { ToastContainer } from "react-toastify";
import Setting from "./pages/Setting";
import Support from "./pages/Support";
import PlayView from "./pages/PlayView";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import Album from "./pages/Album";
import Artist from "./pages/Artist";
import Favorite from "./pages/Favorite";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Sound from "./pages/IntroSound";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import IntroArtist from "./pages/IntroArtist";
import IntroSound from "./pages/IntroSound";
import IntroAlbum from "./pages/IntroAlbum";

const App = () => {
    return (
        <div className=" h-screen bg-gradient-to-br from-[#031b47] to-[#0033a1]">
            <ToastContainer />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/intro-artist" element={<IntroArtist />} />
                <Route path="/intro-sound" element={<IntroSound />} />
                <Route path="/intro-album" element={<IntroAlbum />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sound" element={<Sound />} />
                <Route path="/artist" element={<Artist />} />
                <Route path="/favorite" element={<Favorite />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/album" element={<Album />} />
                <Route path="/community" element={<Community />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/play-view" element={<PlayView />} />
                <Route path="/support" element={<Support />} />
                <Route path="/setting" element={<Setting />} />
            </Routes>
        </div>
    );
};
export default App;
