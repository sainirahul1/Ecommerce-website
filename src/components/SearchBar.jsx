function SearchBar({ onSearch }) {
  return (
    <div className="flex justify-center my-8">
      <input
        type="text"
        placeholder="Search for products..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full max-w-2xl px-6 py-4 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-black transition"
      />
    </div>
  );
}

export default SearchBar;