import { useState, useEffect, useContext } from "react";
import { AppContext } from "../global/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "../components/Input";

const EditProfile = () => {
  const { role, userId } = useContext(AppContext);
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [identityCard, setIdentityCard] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/user/" + role + "/" + userId
      );
      console.log(response.data.user);
      if (response.data.success) {
        setUser(response.data.user);
        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setPhone(response.data.user.phone);
        const formattedDate = new Date(response.data.user.dob)
          .toISOString()
          .split("T")[0];
        setDob(formattedDate);
        setGender(
          response.data.user.gender.toLowerCase() === "female"
            ? "Female"
            : "Male"
        );
        console.log(gender);
        setIdentityCard(response.data.user.identityCard);
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const toggleEdit = () => {
    if (isEdit) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setAvatarUrl(user.avatarUrl);
      const formattedDate = new Date(user.dob).toISOString().split("T")[0];
      setDob(formattedDate);
      setGender(user.gender);
      setIdentityCard(user.identityCard);
    }
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("dob", dob);
      formData.append("gender", gender);
      if (typeof avatarUrl !== "string")
        formData.append("avatarUrl", avatarUrl);

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL +
          "/api/user/update-profile/" +
          role +
          "/" +
          userId,
        formData
      );
      console.log(response.data);
      if (response.data.success) {
        toast.success("Profile uploaded successfully!");
      } else {
        toast.error(response.data.message);
      }
      setIsEdit(false);
      console.log("Submit");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full items-center justify-center text-white p-10">
      <span className="text-3xl font-bold">YOUR PROFILE</span>
      <form onSubmit={onSubmitHandler}>
        <div className="flex flex-row gap-12 mt-10">
          <label htmlFor="userUploadAvatarProfile">
            <div className="justify-center items-center">
              <img
                className="w-40 h-40 rounded-xl object-cover"
                src={
                  !avatarUrl ? user.avatarUrl : URL.createObjectURL(avatarUrl)
                }
                alt="No image"
              />
            </div>

            <input
              onChange={(e) => setAvatarUrl(e.target.files[0])}
              type="file"
              name="image"
              id="userUploadAvatarProfile"
              disabled={!isEdit}
              hidden
            />
          </label>
          <div className="flex flex-col">
            <Input
              label="Name"
              value={name}
              onChangeValue={setName}
              placeholder="Enter name"
              isDisabled={!isEdit}
            />
            <div className="flex flex-row gap-4">
              <Input
                label="Email"
                value={email}
                onChangeValue={setEmail}
                placeholder="Enter email"
                isDisabled={!isEdit}
              />
              <Input
                label="Phone"
                value={phone}
                onChangeValue={setPhone}
                placeholder="Enter phone"
                isDisabled={!isEdit}
              />
            </div>
            <Input
              label="Identity Card"
              value={identityCard}
              onChangeValue={setIdentityCard}
              placeholder="Enter identity card"
              isDisabled={!isEdit}
            />
            <div className="flex gap-4 mb-4">
              <div className="flex flex-col">
                <label className="block text-gray-300 font-semibold" htmlFor="dob">
                  Date of Birth
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  className="w-full mt-1 p-3 bg-transparent border border-[#B6FF52] rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={dob}
                  disabled={!isEdit}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-300 font-semibold" htmlFor="gender">
                  Gender
                </label>
                <select
                  className="w-full mt-1 p-[15px] bg-white bg-opacity-15 border border-[#B6FF52] rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  disabled={!isEdit}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <button
                type="button"
                className={`p-2 rounded mb-4 text-white font-bold
                        ${
                          isEdit
                            ? "bg-red-500"
                            : "bg-green-400 hover:bg-green-600"
                        }
                      `}
                onClick={toggleEdit}
              >
                {isEdit ? "Cancel" : "Edit"}
              </button>
              <button
                type="submit"
                className="w-full bg-[#B6FF52] hover:bg-[#a5e749] text-black p-2 rounded font-bold mb-10"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className="w-4 h-4 border-4 border-white
                                        border-t-transparent rounded-full 
                                        animate-spin"
                    ></div>
                    Updating...
                  </div>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
