import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [totalComputers, setTotalComputers] = useState(0);
  const [totalMonitors, setTotalMonitors] = useState(0);
  const [totalServers, setTotalServers] = useState(0);
  const [totalSwitches, setTotalSwitches] = useState(0);
  const [totalIpads, setTotalIpads] = useState(0);
  const [totalGary, setTotalGary] = useState(0);

  useEffect(() => {
    const unsubscribeComputers = onSnapshot(
      collection(db, "Computer"),
      (snapshot) => {
        setTotalComputers(snapshot.size);
      }
    );

    const unsubscribeMonitors = onSnapshot(
      collection(db, "Monitor"),
      (snapshot) => {
        setTotalMonitors(snapshot.size);
      }
    );

    const unsubscribeServers = onSnapshot(
      collection(db, "Server"),
      (snapshot) => {
        setTotalServers(snapshot.size);
      }
    );

    const unsubscribeSwitches = onSnapshot(
      collection(db, "Switches"),
      (snapshot) => {
        setTotalSwitches(snapshot.size);
      }
    );

    const unsubscribeIpads = onSnapshot(collection(db, "iPads"), (snapshot) => {
      setTotalIpads(snapshot.size);
    });

    const unsubscribeGary = onSnapshot(collection(db, "Gary"), (snapshot) => {
      setTotalGary(snapshot.size);
    });

    return () => {
      unsubscribeComputers();
      unsubscribeMonitors();
      unsubscribeServers();
      unsubscribeSwitches();
      unsubscribeIpads();
      unsubscribeGary();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
      <div className="bg-teal-500 p-6 text-white rounded-lg">
        <motion.h2
          className="text-2xl font-bold"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          key={totalComputers}
        >
          {totalComputers}
        </motion.h2>
        <p className="text-sm uppercase">Total Computers</p>
        <Link to="/computers" className="mt-4 text-sm hover:underline">
          More Info
        </Link>
      </div>
      <div className="bg-red-500 p-6 text-white rounded-lg">
        <motion.h2
          className="text-2xl font-bold"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          key={totalMonitors}
        >
          {totalMonitors}
        </motion.h2>
        <p className="text-sm uppercase">Total Monitors</p>
        <Link to="/monitors" className="mt-4 text-sm hover:underline">
          More Info
        </Link>
      </div>
      <div className="bg-blue-500 p-6 text-white rounded-lg">
        <motion.h2
          className="text-2xl font-bold"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          key={totalServers}
        >
          {totalServers}
        </motion.h2>
        <p className="text-sm uppercase">Total Servers</p>
        <Link to="/servers" className="mt-4 text-sm hover:underline">
          More Info
        </Link>
      </div>
      <div className="bg-orange-500 p-6 text-white rounded-lg">
        <motion.h2
          className="text-2xl font-bold"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          key={totalSwitches}
        >
          {totalSwitches}
        </motion.h2>
        <p className="text-sm uppercase">Total Switches</p>
        <Link to="/switches" className="mt-4 text-sm hover:underline">
          More Info
        </Link>
      </div>
      <div className="bg-purple-500 p-6 text-white rounded-lg">
        <motion.h2
          className="text-2xl font-bold"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          key={totalIpads}
        >
          {totalIpads}
        </motion.h2>
        <p className="text-sm uppercase">Total iPads</p>
        <Link to="/ipads" className="mt-4 text-sm hover:underline">
          More Info
        </Link>
      </div>

      <div className="relative bg-green-500 p-6 text-white rounded-lg">
        <motion.h2
          className="text-2xl font-bold relative z-10"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          key={totalGary}
        >
          {totalGary}
        </motion.h2>
        <p className="text-sm uppercase relative z-10">Total Gary</p>
        <Link to="/gary" className="mt-4 text-sm hover:underline relative z-10">
          More Info
        </Link>
        <img
          src="/Gary.png"
          alt="Gary"
          className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-lg"
        />
      </div>
    </div>
  );
};

export default Dashboard;
