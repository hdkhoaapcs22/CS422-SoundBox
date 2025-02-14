import React from "react";

const Subscription = () => {
    const onSubmitHandler = (event) => {
        event.preventDefault();
    };

    return (
        <div className="bg-white/15 shadow-lg text-center text-white rounded-lg border px-10 border-gray-500 py-4 ">
            <p className="text-4xl font-bold ">SUBCRIBE US</p>
            <p className="text-gray-400 mt-3 text-lg">
                You can upgrade, downgrade, or cancel your subscription anytime.
            </p>
            <form
                onSubmit={onSubmitHandler}
                className="flex gap-3 m-auto my-6 pl-3 "
            >
                <input
                    type="text"
                    placeholder="willie.jennings@example.com"
                    className="w-full outline-none rounded-lg px-4 py-3 bg-[#1e3b57]"
                />
                <button
                    type="submit"
                    className="bg-neonGreen py-2 px-6 cursor-pointer text-black rounded-lg font-semibold "
                >
                    SUBCRIBE
                </button>
            </form>
        </div>
    );
};

export default Subscription;
