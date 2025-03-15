import React from "react";
import RecentlyPlayed from "../../components/Dashboard/RecentlyPlayed";
import TodayTopChart from "../../components/Dashboard/TodayTopChart";
import BannerDashboard from "../../components/Dashboard/BannerDashboard";
import NewRelease from "../../components/Dashboard/NewRelease";
const Dashboard = () => {
  return (
    <div className="w-full h-[88%] flex flex-row overflow-hidden">
      <div className="w-[56%] h-full overflow-y-auto scrollbar-hide">
        <BannerDashboard />
        <RecentlyPlayed />
        <NewRelease />
      </div>
      <div className="w-[25%] h-full flex justify-center overflow-hidden">
        <TodayTopChart />
      </div>
    </div>
  );
};

export default Dashboard;
