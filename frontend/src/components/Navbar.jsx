import logo from "@/assets/images/logo.png";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import SearchBox from "./SearchBox";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import defaultAvatar from "@/assets/images/defaultUserAvatar.png";
import { FaUser } from "react-icons/fa";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import DropdownAnimation from "@/components/DropdownAnimation";
import { useState } from "react";
import { showToast } from "@/helpers/showToast";
import { axiosInstance } from "@/lib/axios";
import { removeUser } from "@/redux/user/user.slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // handleLogout
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout", {});

      dispatch(removeUser());
      showToast("success", response.data.message);
      navigate("/");
    } catch (error) {
      const message =
        error.response.data.message ||
        "Something went wrong. Please try again.";
      showToast("error", message);
    }
  };

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
        {!user.isLoggedIn ? (
          <Button className="bg-teal-600 hover:bg-teal-500 text-gray-100 transition px-3">
            <Link to="/login" className="flex items-center gap-0.5 ">
              <IoLogIn className="text-base" />
              Sign In
            </Link>
          </Button>
        ) : (
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={user.user.profilePic || defaultAvatar} />
                <AvatarFallback className="text-red-500 text-lg font-bold">
                  !
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownAnimation open={dropdownOpen}>
              <DropdownMenuContent className="w-60 bg-gray-800 text-gray-100 border border-teal-800 shadow-md rounded-lg p-1 mr-3">
                <div className="px-3 py-2">
                  <p className="font-bold">{user.user.name}</p>
                  <p className="text-sm font-medium text-teal-400/80">
                    {user.user.email}
                  </p>
                </div>
                <DropdownMenuSeparator className="bg-teal-700" />
                <DropdownMenuItem asChild>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-3 py-2 rounded-md transition hover:bg-gray-700"
                  >
                    <FaUser className="text-teal-400 size-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    to=""
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-700 transition"
                  >
                    <MdOutlinePlaylistAdd className="text-teal-400 size-5" />
                    Create Blog
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-teal-700" />

                <DropdownMenuItem asChild>
                  <Button
                    onClick={handleLogout}
                    className="w-full bg-gray-800 hover:bg-gray-700"
                  >
                    <IoLogOut className="text-red-500/75" />
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownAnimation>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Navbar;
