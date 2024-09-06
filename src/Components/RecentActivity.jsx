import React, { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const RecentActivity = () => {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const collections = ["Computer", "Monitor", "Server", "Switches", "iPads"]; // Collections to fetch from

    const fetchRecentActivity = async () => {
      let allActivities = [];

      // Loop through each collection and fetch the items
      for (const collectionName of collections) {
        const q = query(collection(db, collectionName));
        const querySnapshot = await getDocs(q);

        const activities = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const checkInDate = data.checkIn ? data.checkIn.toDate() : null;
          const checkOutDate = data.checkOut ? data.checkOut.toDate() : null;

          // Determine the most recent date (check-in or check-out)
          const latestDate =
            checkInDate > checkOutDate ? checkInDate : checkOutDate;

          return {
            AssetTag: doc.id,
            value:
              collectionName === "Computer"
                ? data.owner || "N/A"
                : collectionName === "Monitor"
                ? data.model || "N/A"
                : data.serialNumber || "N/A", // Adjust field for each collection
            location: data.currentLocation || "N/A",
            checkDate: latestDate ? latestDate.toLocaleString() : "N/A",
            checkType:
              checkInDate > checkOutDate ? "Checked In" : "Checked Out",
            collection: collectionName,
          };
        });

        allActivities = [...allActivities, ...activities];
      }

      // Sort all activities by the check-in/check-out date (descending order)
      allActivities.sort((a, b) => (a.checkDate < b.checkDate ? 1 : -1));

      // Limit to 5 most recent activities
      setActivityData(allActivities.slice(0, 5));
    };

    fetchRecentActivity();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
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
