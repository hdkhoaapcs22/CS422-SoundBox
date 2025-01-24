import { useState, useContext } from "react";
import ImageDecoration from "../components/Auth/ImageDecoration";
import AppTitle from "../components/AppTitle";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../global/AppContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isHiddenConfirmPassword, setIsHiddenConfirmPassword] =
        useState(true);
    const [conditionCheckedBox, setconditionCheckedBox] = useState(false);
    const [isHiddenPassword, setIsHiddenPassword] = useState(true);
    const [currentState, setCurrentState] = useState("Login");
    const navigate = useNavigate();
    const { setRole, setArtistId, setListenerId } = useContext(AppContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (currentState === "Sign Up") {
                if (!conditionCheckedBox) {
                    return toast.error(
                        "Please accept the terms and conditions"
                    );
                }

                if (password.length < 8) {
                    return toast.error(
                        "Password must be at least 8 characters long"
                    );
                }

                if (password !== confirmPassword) {
                    return toast.error("Passwords do not match");
                }

                const response = await axios.post(
                    import.meta.env.VITE_BACKEND_URL + "/api/user/register",
                    { email, password }
                );
                if (response.data.success) {
                    setListenerId(response.data.id);
                    navigate("/dashboard");
                } else {
                    toast.error(response.data.message);
                }
            } else {
                const response = await axios.post(
                    import.meta.env.VITE_BACKEND_URL + "/api/user/login",
                    { email, password }
                );
                if (response.data.success) {
                    const role = response.data.role;
                    setArtistId(response.data.id);
                    setRole(role);
                    if (role === "admin") {
                        navigate("/admin/dashboard");
                    } else {
                        navigate("/dashboard");
                    }
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-black text-white px-60 py-10 gap-40">
            {/* Left Side - Login Form */}
            <div className="w-full md:w-1/2">
                <AppTitle />
                <h2 className="text-3xl font-bold my-3">
                    {currentState == "Login" ? "Hi, Welcome Back!" : "Sign Up"}
                </h2>
                <p className="text-gray-300 mb-6">
                    Enjoy the best music collection of your choice, login now
                </p>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="williejennings@example.com"
                        value={email}
                        onChangeValue={setEmail}
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChangeValue={setPassword}
                        placeholder={"8+ characters required"}
                        isPassword={true}
                        isHiddenPassword={isHiddenPassword}
                        callbackHiddenPassword={() =>
                            setIsHiddenPassword(!isHiddenPassword)
                        }
                    />

                    {currentState == "Sign Up" && (
                        <Input
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChangeValue={setConfirmPassword}
                            placeholder={"8+ characters required"}
                            isPassword={true}
                            isHiddenPassword={isHiddenConfirmPassword}
                            callbackHiddenPassword={() =>
                                setIsHiddenConfirmPassword(
                                    !isHiddenConfirmPassword
                                )
                            }
                        />
                    )}

                    <div className="flex justify-between items-center mb-4 text-sm">
                        <label className="flex items-center space-x-2"></label>
                        <Link
                            to="/forgot-password"
                            className="text-green-400 hover:underline"
                        >
                            Forgot password
                        </Link>
                    </div>

                    {currentState == "Sign Up" && (
                        <label className="flex items-center space-x-2 text-sm mb-4">
                            <input
                                type="checkbox"
                                className="accent-green-400"
                                onClick={() => {
                                    setconditionCheckedBox(
                                        !conditionCheckedBox
                                    );
                                }}
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
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 bg-[#B6FF52] text-black font-bold rounded-md hover:bg-[#a0e93a] transition"
                    >
                        {currentState == "Login" ? "Login" : "Sign up"}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center mt-6">
                    <hr className="flex-grow border-gray-600" />
                    <span className="mx-4 text-gray-400">
                        Or, login with your email
                    </span>
                    <hr className="flex-grow border-gray-600" />
                </div>

                {/* Google Login Button */}
                <button className="mt-4 w-full flex items-center justify-center py-3 border border-[#B6FF52] text-white rounded-md hover:bg-[#add47b] transition">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                        alt="Google Logo"
                        className="w-5 h-5 mr-2"
                    />
                    {currentState == "Login"
                        ? "Login with Google"
                        : "Sign up with google"}
                </button>

                {/* Create Account Link */}
                <p className="mt-4 text-center text-sm text-gray-300">
                    Don't have an account yet?{" "}
                    {currentState === "Login" ? (
                        <span
                            onClick={() => {
                                setCurrentState("Sign Up");
                                setEmail("");
                                setPassword("");
                            }}
                            className="text-green-400 font-bold hover:underline cursor-pointer"
                        >
                            Create new account
                        </span>
                    ) : (
                        <span
                            onClick={() => {
                                setEmail("");
                                setconditionCheckedBox(false);
                                setPassword("");
                                setConfirmPassword("");
                                setCurrentState("Login");
                            }}
                            className="text-green-400 font-bold hover:underline cursor-pointer"
                        >
                            Login here
                        </span>
                    )}
                </p>
            </div>

            {/* Right Side - Image Section */}
            <ImageDecoration />
        </div>
    );
};

export default Login;
