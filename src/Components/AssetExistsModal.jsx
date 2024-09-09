const AssetExistsModal = ({ isOpen, onClose, existingAsset }) => {
  if (!isOpen || !existingAsset) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4 text-red-600">
          Asset Already Logged
        </h2>
        <p className="mb-4 text-gray-600">
          The asset tag <strong>{existingAsset.AssetTag}</strong> has already
          been logged. Here are the existing details:
        </p>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-3">Asset Tag</th>
              <th className="px-4 py-3">Owner/Model/Serial Number</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Collection</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center border-t">
              <td className="px-4 py-2">{existingAsset.AssetTag}</td>
              <td className="px-4 py-2">{existingAsset.value}</td>
              <td className="px-4 py-2">{existingAsset.location}</td>
              <td className="px-4 py-2">{existingAsset.collection}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetExistsModal;
