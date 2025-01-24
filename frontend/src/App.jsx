import { ToastContainer } from "react-toastify";

import SideBar from "./components/Dashboard/SideBar";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import IntroAlbum from "./pages/IntroAlbum";
import IntroArtist from "./pages/IntroArtist";
import IntroSound from "./pages/IntroSound";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";

import AdminSideBar from "./components/Admin/Dashboard/AdminSideBar";

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
                <Route path="/dashboard" element={<SideBar />} />

                <Route path="/admin/dashboard" element={<AdminSideBar />} />
            </Routes>
            {pagesWithNavbarAndFooter.includes(location.pathname) && <Footer />}
        </div>
    );
};
export default App;
