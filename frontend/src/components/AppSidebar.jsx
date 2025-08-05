import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import { IoHomeSharp } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { FaBlog } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { GoDot } from "react-icons/go";

const AppSidebar = () => {
  return (
    <Sidebar className="bg-gray-950 text-gray-300 border-r border-teal-800 shadow-lg">
      {/* Sidebar Header */}
      <SidebarHeader className="bg-gray-900 flex items-center justify-center py-6">
        <img
          src={logo}
          alt="BloggR Logo"
          width={140}
          className="object-contain"
        />
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="bg-gray-900">
        <SidebarGroup>
          <SidebarMenu>
            {/* Home */}
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:text-teal-400 hover:bg-gray-800 transition-colors">
                <IoHomeSharp className="text-teal-400" />
                <Link to="">Home</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Categories */}
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:text-teal-400 hover:bg-gray-800 transition-colors">
                <BiSolidCategory className="text-teal-400" />
                <Link to="/categories">Categories</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Blogs */}
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:text-teal-400 hover:bg-gray-800 transition-colors">
                <FaBlog className="text-teal-400" />
                <Link to="">Blogs</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Comments */}
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:text-teal-400 hover:bg-gray-800 transition-colors">
                <FaComments className="text-teal-400" />
                <Link to="">Comments</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Users */}
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:text-teal-400 hover:bg-gray-800 transition-colors">
                <HiMiniUsers className="text-teal-400" />
                <Link to="">Users</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Secondary Group */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider mt-4 mb-1 px-4">
              Categories
            </SidebarGroupLabel>
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:text-teal-400 hover:bg-gray-800 transition-colors">
                <GoDot className="text-emerald-400" />
                <Link to="">Category Item</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
