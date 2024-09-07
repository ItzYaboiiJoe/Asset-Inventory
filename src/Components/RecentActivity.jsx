import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";

const RecentActivity = () => {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const collections = ["Computer", "Monitor", "Server", "Switches", "iPads"];
    let allActivities = [];

    const unsubscribeArray = [];

    collections.forEach((collectionName) => {
      const q = query(collection(db, collectionName));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const activities = snapshot.docs.map((doc) => {
          const data = doc.data();
          const checkInDate = data.checkIn ? data.checkIn.toDate() : null;
          const checkOutDate = data.checkOut ? data.checkOut.toDate() : null;
          const latestDate =
            checkInDate > checkOutDate ? checkInDate : checkOutDate;

          if (latestDate) {
            return {
              AssetTag: doc.id,
              value:
                collectionName === "Computer"
                  ? data.owner || "N/A"
                  : collectionName === "Monitor"
                  ? data.model || "N/A"
                  : data.serialNumber || "N/A",
              location: data.currentLocation || "N/A",
              checkDate: latestDate ? latestDate.toLocaleString() : "N/A",
              checkType:
                checkInDate > checkOutDate ? "Checked In" : "Checked Out",
              collection: collectionName,
            };
          } else {
            return null;
          }
        });

        const validActivities = activities.filter(
          (activity) => activity !== null
        );
        allActivities = [...allActivities, ...validActivities];
        allActivities.sort(
          (a, b) => new Date(b.checkDate) - new Date(a.checkDate)
        );

        // Only keep the 5 most recent activities
        const uniqueActivities = allActivities
          .filter(
            (activity, index, self) =>
              index === self.findIndex((a) => a.AssetTag === activity.AssetTag)
          )
          .slice(0, 5);

        setActivityData(uniqueActivities);
      });

      unsubscribeArray.push(unsubscribe);
    });

    return () => {
      unsubscribeArray.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  const rowVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
      <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Asset Tag</th>
            <th className="px-4 py-2">Value</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Check Date</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Collection</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence initial={false}>
            {activityData.length === 0 ? (
              <motion.tr className="text-center">
                <td colSpan="6" className="py-4">
                  No recent activity available.
                </td>
              </motion.tr>
            ) : (
              activityData.map((activity, index) => (
                <motion.tr
                  key={activity.AssetTag}
                  variants={rowVariants}
                  initial={index === 0 ? "hidden" : "visible"}
                  animate="visible"
                  exit={index === 4 ? "exit" : undefined}
                  transition={{ duration: 0.5 }}
                  className="text-center border-t"
                >
                  <td className="px-4 py-2">{activity.AssetTag}</td>
                  <td className="px-4 py-2">{activity.value}</td>
                  <td className="px-4 py-2">{activity.location}</td>
                  <td className="px-4 py-2">{activity.checkDate}</td>
                  <td className="px-4 py-2">{activity.checkType}</td>
                  <td className="px-4 py-2">{activity.collection}</td>
                </motion.tr>
              ))
            )}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

export default RecentActivity;
