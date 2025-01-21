import { useState } from "react";
import ImageDecoration from "../components/Auth/ImageDecoration";
import AppTitle from "../components/AppTitle";
import Input from "../components/Input";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(email, userName);
            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/user/forgotpassword",
                { userName, email }
            );

            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-black text-white px-60 py-10 gap-40">
            <div className="w-full md:w-1/2">
                <AppTitle />
                <h2 className="text-3xl font-bold my-3">Forgot Password!</h2>
                <p className="text-gray-300 mb-6">
                    Enter the username and email that you have registered in the
                    Soundbox, We will send an email containing your username and
                    a link to reset your password
                </p>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Username"
                        type="text"
                        placeholder="williejennings@-example"
                        value={userName}
                        onChangeValue={setUserName}
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder={"williejennings@example.com"}
                        value={email}
                        onChangeValue={setEmail}
                    />

                    <button
                        type="submit"
                        className="w-full py-3 bg-[#B6FF52] text-black font-bold rounded-md hover:bg-[#a0e93a] transition"
                    >
                        Send
                    </button>
                </form>

                <div className="flex items-center mt-6">
                    <hr className="flex-grow border-gray-600" />
                    <span className="mx-4 text-gray-400">
                        Or, login with your email
                    </span>
                    <hr className="flex-grow border-gray-600" />
                </div>

                <p className="mt-4 text-center text-sm text-gray-300">
                    If you need help, please contact{" "}
                    <span
                        onClick={() => setCurrentState("Login")}
                        className="text-green-400 font-bold hover:underline cursor-pointer"
                    >
                        SoundBox Support
                    </span>
                </p>
            </div>

            <ImageDecoration />
        </div>
    );
};

export default ForgotPassword;
