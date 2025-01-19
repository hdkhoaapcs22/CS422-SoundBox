import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import assets from "../../assets/assets";

const UserComment = () => {
    const comments = [
        {
            name: "Dianne Russell",
            role: "Marketing Coordinator",
            image: assets.avatarUser1,
            feedback:
                "The soundbox website platform really makes it easy for me to find songs that are going viral on TikTok.",
        },
        {
            name: "Cameron Williamson",
            role: "Trust Administrator",
            image: assets.avatarUser2,
            feedback:
                "I think this is very good and the features used are very satisfying, you should try this platform.",
        },
        {
            name: "Kristin Watson",
            role: "President of Sales",
            image: assets.avatarUser3,
            feedback:
                "With the existence of the soundbox website platform, many people are helped, from creators to music lovers.",
        },
        {
            name: "Mc Donald",
            role: "Food Blogger",
            image: assets.avatarUser4,
            feedback:
                "I think this is very good and the features used are very satisfying, you should try this platform.",
        },
    ];

    const leftSlider = () => {
        let slider = document.getElementById("slider");
        slider.scrollLeft -= 250;
    };

    const rightSlider = () => {
        let slider = document.getElementById("slider");
        slider.scrollLeft += 250;
    };

    return (
        <div className=" text-white py-16 items-center">
            <div className="flex gap-36 justify-center">
                <div className="text-4xl font-bold w-72 justify-start ">
                    WHAT ARE THEY SAYING?
                </div>
                <p className="justify-start mb-8 w-[420px] text-base ">
                    It has been proven that thousands of users are satisfied
                    with the features we provide, here are some words from them
                </p>
            </div>
            {/* Navigation Buttons Row */}
            <div className="flex gap-4 mb-6 pl-[900px]">
                <button
                    onClick={leftSlider}
                    className="bg-white/10 p-3 rounded-lg hover:bg-gray-500"
                >
                    <FaArrowLeftLong className="text-2xl" />
                </button>

                <button
                    onClick={rightSlider}
                    className="bg-white/10 p-3 rounded-lg hover:bg-gray-500"
                >
                    <FaArrowRightLong className="text-2xl" />
                </button>
            </div>

            {/* Feedback Section (Single Line Scrollable) */}
            <div className="relative max-w-[86%] overflow-hidden mx-52">
                <div
                    id="slider"
                    className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
                >
                    {comments.map((comment, index) => (
                        <div
                            key={index}
                            className="min-w-[300px] bg-white/10 shadow-lg text-white rounded-lg px-6 py-4"
                        >
                            {/* User Info */}
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={comment.image}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
                                />
                                <div>
                                    <p className="text-lg font-bold">
                                        {comment.name}
                                    </p>
                                    <p className="text-sm text-white/70">
                                        {comment.role}
                                    </p>
                                </div>
                            </div>

                            {/* Feedback */}
                            <p className="text-sm leading-relaxed">
                                {comment.feedback}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserComment;
