import { FaSearch } from "react-icons/fa";
import { Input } from "./ui/input";

const SearchBox = () => {
  return (
    <form className="relative w-full">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400 text-sm">
        <FaSearch />
      </span>
      <Input
        placeholder="Search here..."
        className="h-9 w-full pl-10 pr-4 rounded-md bg-gray-800 border border-teal-700 text-gray-100 placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-teal-500 hover:border-teal-400 transition-all duration-200"
      />
    </form>
  );
};

export default SearchBox;
