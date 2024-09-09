const MonitorsFields = () => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Model</label>
        <input
          type="text"
          name="model"
          placeholder="Monitor Model"
          required
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
    </>
  );
};

export default MonitorsFields;
