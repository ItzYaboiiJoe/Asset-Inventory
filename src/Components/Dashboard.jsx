import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <div className="bg-teal-500 p-6 text-white rounded-lg">
        <h2 className="text-2xl font-bold">1373</h2>
        <p className="text-sm uppercase">Total Computers</p>
        <Link to="/computers" className="mt-4 text-sm underline">
          More Info
        </Link>
      </div>
      <div className="bg-blue-500 p-6 text-white rounded-lg">
        <h2 className="text-2xl font-bold">1373</h2>
        <p className="text-sm uppercase">Total Servers</p>
        <Link to="/servers" className="mt-4 text-sm underline">
          More Info
        </Link>
      </div>
      <div className="bg-red-500 p-6 text-white rounded-lg">
        <h2 className="text-2xl font-bold">50</h2>
        <p className="text-sm uppercase">Total Monitors</p>
        <Link to="/monitors" className="mt-4 text-sm underline">
          More Info
        </Link>
      </div>
      <div className="bg-orange-500 p-6 text-white rounded-lg">
        <h2 className="text-2xl font-bold">4</h2>
        <p className="text-sm uppercase">Total Switches</p>
        <Link to="/switches" className="mt-4 text-sm underline">
          More Info
        </Link>
      </div>
      <div className="bg-purple-500 p-6 text-white rounded-lg">
        <h2 className="text-2xl font-bold">3</h2>
        <p className="text-sm uppercase">Total iPads</p>
        <Link to="/ipads" className="mt-4 text-sm underline">
          More Info
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
