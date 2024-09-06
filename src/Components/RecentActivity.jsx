import React from "react";

const RecentActivity = () => {
  const activityData = [
    {
      AssetTag: "Macbook Pro 13”",
      Owner: "Crystal Hyatt",
      location: "New Tampa",
      CheckOutDate: "2017-12-18 09:17 AM",
    },
    {
      AssetTag: "Macbook Pro 13”",
      Owner: "Crystal Hyatt",
      location: "New Tampa",
      CheckOutDate: "2017-12-18 09:17 AM",
    },
    {
      AssetTag: "Macbook Pro 13”",
      Owner: "Crystal Hyatt",
      location: "New Tampa",
      CheckOutDate: "2017-12-18 09:17 AM",
    },
    {
      AssetTag: "Macbook Pro 13”",
      Owner: "Crystal Hyatt",
      location: "New Tampa",
      CheckOutDate: "2017-12-18 09:17 AM",
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Asset Tag</th>
            <th className="px-4 py-2">Owner</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Check Out Date</th>
          </tr>
        </thead>
        <tbody>
          {activityData.map((activity, index) => (
            <tr key={index} className="text-center border-t">
              <td className="px-4 py-2">{activity.AssetTag}</td>
              <td className="px-4 py-2">{activity.Owner}</td>
              <td className="px-4 py-2">{activity.location}</td>
              <td className="px-4 py-2">{activity.CheckOutDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentActivity;
