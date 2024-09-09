import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  collection,
  query,
  where,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const WeeklyGaryLogsChart = () => {
  const [weeklyData, setWeeklyData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const maxBarHeight = 200; // Maximum height for the bar

  useEffect(() => {
    const garyCollectionRef = collection(db, "Gary");
    const sevenDaysAgo = Timestamp.fromDate(
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );

    const q = query(garyCollectionRef, where("checkOut", ">=", sevenDaysAgo));

    // Using onSnapshot to listen for real-time updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const dayCount = [0, 0, 0, 0, 0, 0, 0];
      querySnapshot.forEach((doc) => {
        const logDate = doc.data().checkOut.toDate();
        const dayIndex = new Date(logDate).getDay();
        dayCount[dayIndex]++;
      });

      setWeeklyData(dayCount);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const colors = [
    "#F87171",
    "#FBBF24",
    "#34D399",
    "#60A5FA",
    "#A78BFA",
    "#F472B6",
    "#FCD34D",
  ]; // Different colors for each day

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      {" "}
      {/* Added margin-top */}
      <h3 className="text-lg font-semibold mb-4">
        Gary Collection Logs (Last 7 Days)
      </h3>
      <div className="flex space-x-4 items-end">
        {weeklyData.map((count, index) => {
          const barHeight =
            count === 0 ? 10 : (count / Math.max(...weeklyData)) * maxBarHeight; // Scale bar height

          return (
            <div key={index} className="flex flex-col items-center">
              <motion.div
                className="rounded-t"
                style={{
                  width: "40px",
                  backgroundColor: colors[index % colors.length],
                }}
                initial={{ height: "0px" }} // Start with a height of 0
                animate={{ height: `${barHeight}px` }} // Animate to the full bar height
                transition={{ duration: 1.5, ease: "easeOut" }} // Control duration and easing
              >
                <p className="text-center text-white">{count}</p>
              </motion.div>
              <p className="text-gray-600 mt-1">{days[index]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyGaryLogsChart;
