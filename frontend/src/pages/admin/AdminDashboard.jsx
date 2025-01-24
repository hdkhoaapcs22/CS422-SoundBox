import React from "react";
import ShortUserInfo from "../../components/ShortUserInfo";

const AdminDashboard = () => {
    return (
        <div className="pl-10 text-white flex h-full w-full">
            <span className="text-5xl pt-10 font-bold">HELLO, GOOD DAY</span>
            <ShortUserInfo name="Admin" email='admin@gmail.com' />
        </div>
    );
};

export default AdminDashboard;
