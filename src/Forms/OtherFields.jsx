const OtherFields = () => {
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
    </>
  );
};

export default OtherFields;
