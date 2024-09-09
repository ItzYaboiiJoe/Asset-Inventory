const GaryFields = () => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Serial Number</label>
        <input
          type="text"
          name="serialNumber"
          placeholder="Serial Number"
          required
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Model</label>
        <input
          type="text"
          name="model"
          placeholder="Model"
          required
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Type</label>
        <input
          type="text"
          name="type"
          placeholder="Type"
          required
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
    </>
  );
};

export default GaryFields;
