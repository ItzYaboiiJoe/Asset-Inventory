const LocationField = () => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Location</label>
      <input
        type="text"
        name="location"
        placeholder="Branch/Department"
        required
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
    </div>
  );
};

export default LocationField;
