import { useNavigate } from "react-router-dom";

const IpadsPage = () => {
  const navigate = useNavigate();
  const ipadsData = [
    {
      AssetTag: "iPad Pro",
      owner: "Alice Johnson",
      location: "Headquarters",
      CheckOutDate: "2021-12-30",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">iPads</h2>
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mb-4 transition-colors"
      >
        Back
      </button>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2">Asset Tag</th>
            <th className="px-4 py-2">Owner</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Check Out Date</th>
          </tr>
        </thead>
        <tbody>
          {ipadsData.map((item, index) => (
            <tr key={index} className="text-center border-t">
              <td className="px-4 py-2">{item.AssetTag}</td>
              <td className="px-4 py-2">{item.owner}</td>
              <td className="px-4 py-2">{item.location}</td>
              <td className="px-4 py-2">{item.CheckOutDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IpadsPage;
