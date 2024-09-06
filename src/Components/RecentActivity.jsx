import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const RecentActivity = () => {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const collections = ["Computer", "Monitor", "Server", "Switches", "iPads"]; // Collections to fetch from

    const unsubscribeArray = [];

    const fetchRecentActivity = () => {
      let allActivities = [];

      collections.forEach((collectionName) => {
        const q = query(collection(db, collectionName));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const activities = snapshot.docs.map((doc) => {
            const data = doc.data();
            const checkInDate = data.checkIn ? data.checkIn.toDate() : null;
            const checkOutDate = data.checkOut ? data.checkOut.toDate() : null;
            const latestDate =
              checkInDate > checkOutDate ? checkInDate : checkOutDate;

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
          });

          allActivities = [...allActivities, ...activities];
          allActivities.sort((a, b) => (a.checkDate < b.checkDate ? 1 : -1));
          setActivityData(allActivities.slice(0, 5));
        });

        unsubscribeArray.push(unsubscribe);
      });
    };

    fetchRecentActivity();

    return () => {
      unsubscribeArray.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

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
          {activityData.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No recent activity available.
              </td>
            </tr>
          ) : (
            activityData.map((activity, index) => (
              <tr key={index} className="text-center border-t">
                <td className="px-4 py-2">{activity.AssetTag}</td>
                <td className="px-4 py-2">{activity.value}</td>
                <td className="px-4 py-2">{activity.location}</td>
                <td className="px-4 py-2">{activity.checkDate}</td>
                <td className="px-4 py-2">{activity.checkType}</td>
                <td className="px-4 py-2">{activity.collection}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentActivity;
