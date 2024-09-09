const ConfirmationModal = ({ isOpen, onConfirm, onCancel, assetData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white p-6 rounded-lg w-full max-w-2xl shadow-lg z-50">
        <h2 className="text-xl font-bold mb-4">Move Asset to Gary</h2>
        <p className="mb-4">
          This asset exists in another collection. Would you like to move it to
          the Gary collection?
        </p>

        <table className="min-w-full bg-white border mb-4">
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
              <td className="px-4 py-2">{assetData.AssetTag}</td>
              <td className="px-4 py-2">{assetData.value}</td>
              <td className="px-4 py-2">{assetData.location}</td>
              <td className="px-4 py-2">{assetData.collection}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-lg mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Yes, Move
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
