import logo from "@/assets/images/logo.png";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import SearchBox from "./SearchBox";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-gray-900 px-6 border-b border-teal-800 shadow-sm">
      {/* Logo */}
      <div>
        <img
          src={logo}
          alt="BloggR Logo"
          width={140}
          className="object-contain"
        />
      </div>

      {/* Search */}
      <div className="w-2/6">
        <SearchBox />
      </div>

      {/* Sign In */}
      <div>
        <Button className="flex items-center gap-0.5 bg-teal-600 hover:bg-teal-500 text-gray-100 transition px-3">
          <IoLogIn className="text-base" />
          <Link to="/login">Sign In</Link>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
