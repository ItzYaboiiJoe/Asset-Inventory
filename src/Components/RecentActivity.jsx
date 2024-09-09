import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const RecentActivity = () => {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const collections = ["Computer", "Monitor", "Server", "Switches", "iPads"];
    let allActivities = [];

    const fetchRecentActivity = () => {
      const unsubscribeArray = collections.map((collectionName) => {
        const q = query(collection(db, collectionName));
        return onSnapshot(q, (snapshot) => {
          const activities = snapshot.docs.map((doc) => {
            const data = doc.data();
            const checkInDate = data.checkIn ? data.checkIn.toDate() : null;
            const checkOutDate = data.checkOut ? data.checkOut.toDate() : null;
            const latestDate =
              checkInDate > checkOutDate ? checkInDate : checkOutDate;

            const formattedDate = latestDate
              ? latestDate.toLocaleString()
              : "N/A";

            return {
              AssetTag: doc.id,
              value:
                collectionName === "Computer"
                  ? data.owner || "N/A"
                  : collectionName === "Monitor"
                  ? data.model || "N/A"
                  : data.serialNumber || "N/A",
              location: data.currentLocation || "N/A",
              checkDate: formattedDate,
              checkType:
                checkInDate > checkOutDate ? "Checked In" : "Checked Out",
              collection: collectionName,
            };
          });

          allActivities = [
            ...allActivities.filter(
              (activity) => activity.collection !== collectionName
            ),
            ...activities,
          ];

          allActivities.sort(
            (a, b) => new Date(b.checkDate) - new Date(a.checkDate)
          );

          setActivityData(allActivities.slice(0, 5));
        });
      });

      return () => {
        unsubscribeArray.forEach((unsubscribe) => unsubscribe());
      };
    };

    fetchRecentActivity();
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
