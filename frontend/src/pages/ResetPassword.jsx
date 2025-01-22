import { useState } from "react";
import ImageDecoration from "../components/Auth/ImageDecoration";
import AppTitle from "../components/AppTitle";
import Input from "../components/Input";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isHiddenPassword, setIsHiddenPassword] = useState(true);
    const [isHiddenConfirmPassword, setIsHiddenConfirmPassword] =
        useState(true);

    const { id } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(
                import.meta.env.VITE_BACKEND_URL +
                    "/api/user/resetpassword/" +
                    id
            );
            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL +
                    "/api/user/resetpassword/" +
                    id,
                { newPassword }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
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
                <h2 className="text-3xl font-bold my-3">Reset Password!</h2>
                <p className="text-gray-300 mb-6">
                    Enter the new password and confirm password to reset.
                </p>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="New Password"
                        type="password"
                        placeholder="8+ characters required"
                        value={newPassword}
                        onChangeValue={setNewPassword}
                        isPassword={true}
                        isHiddenPassword={isHiddenPassword}
                        callbackHiddenPassword={() =>
                            setIsHiddenPassword(!isHiddenPassword)
                        }
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder={"8+ characters required"}
                        value={confirmPassword}
                        onChangeValue={setConfirmPassword}
                        isPassword={true}
                        isHiddenPassword={isHiddenConfirmPassword}
                        callbackHiddenPassword={() =>
                            setIsHiddenConfirmPassword(!isHiddenConfirmPassword)
                        }
                    />

                    <button
                        type="submit"
                        className="w-full py-3 bg-[#B6FF52] text-black font-bold rounded-md hover:bg-[#a0e93a] transition"
                    >
                        Send
                    </button>
                </form>

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

export default ResetPassword;
