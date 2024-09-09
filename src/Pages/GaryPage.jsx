import { useNavigate } from "react-router-dom";

const GaryPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gary</h2>
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mb-4 transition-colors"
      >
        Back
      </button>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-3">Asset Tag</th>
            <th className="px-4 py-3">Serial Number</th>
            <th className="px-4 py-3">Model</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Check Date</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default GaryPage;
