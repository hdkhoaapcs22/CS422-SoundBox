import { useState } from "react";
import Input from "../../components/Input";
import { toast } from "react-toastify";
import axios from "axios";

const CreateArtistAccount = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [identityCard, setIdentityCard] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("male");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isHiddenPassword, setIsHiddenPassword] = useState(true);
    const [isHiddenConfirmPassword, setIsHiddenConfirmPassword] =
        useState(true);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            if (password.length < 8) {
                toast.error("Password must be at least 8 characters");
                return;
            }

            if (password !== confirmPassword) {
                toast.error("Password does not match");
                return;
            }

            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/admin/create-artist",
                {
                    name,
                    identityCard,
                    phone,
                    email,
                    password,
                    dob,
                    gender,
                }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                setName("");
                setIdentityCard("");
                setPhone("");
                setEmail("");
                setPassword("");
                setDob("");
                setGender("male");
                setConfirmPassword("");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full text-white p-10 w-3/5">
            <p className="text-5xl pt-10 font-bold mb-6">
                Add new artist account
            </p>
            <form onSubmit={onSubmitHandler}>
                <Input
                    label="Name"
                    placeholder="Enter name"
                    type="text"
                    value={name}
                    onChangeValue={setName}
                />
                <Input
                    value={identityCard}
                    onChangeValue={setIdentityCard}
                    label="Identity Card"
                    placeholder="Enter identity"
                    type="text"
                />
                <Input
                    label="Phone"
                    placeholder="Enter phone"
                    type="text"
                    value={phone}
                    onChangeValue={setPhone}
                />
                <Input
                    label="Email"
                    placeholder="Enter email"
                    type="email"
                    value={email}
                    onChangeValue={setEmail}
                />
                <div className="flex gap-8 mb-4">
                    <div className="flex flex-col">
                        <label className="block text-gray-300" htmlFor="dob">
                            Date of Birth
                        </label>
                        <input
                            id="dob"
                            name="dob"
                            type="date"
                            className="w-full mt-1 p-3 bg-transparent border border-[#B6FF52] rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>
                    <select
                        className="w-full mt-7 ml-4 p-3 bg-gray-400 border border-[#B6FF52] rounded-md  focus:outline-none focus:ring-2 focus:ring-green-400"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

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
                <Input
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChangeValue={setConfirmPassword}
                    placeholder={"8+ characters required"}
                    isPassword={true}
                    isHiddenPassword={isHiddenConfirmPassword}
                    callbackHiddenPassword={() =>
                        setIsHiddenConfirmPassword(!isHiddenConfirmPassword)
                    }
                />
                <button
                    type="submit"
                    className="w-full bg-green-400 text-white p-2 rounded font-bold"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div
                                className="w-4 h-4 border-4 border-white
                                        border-t-transparent rounded-full 
                                        animate-spin"
                            ></div>
                            Creating...
                        </div>
                    ) : (
                        "Create"
                    )}
                </button>
            </form>
        </div>
    );
};

export default CreateArtistAccount;
