import AppSidebar from "@/components/AppSidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100 w-full">
        {/* Navbar (fixed height, z-indexed) */}
        <Navbar />

        {/* Main area with Sidebar and Content */}
        <div className="flex flex-1 pt-16">
          {/* Sidebar */}
          <div className="w-64 bg-gray-900 border-r border-teal-800">
            <AppSidebar />
          </div>

          {/* Main Content + Footer */}
          <div className="w-full flex flex-col">
            <main className="min-h-[93%] p-4 bg-gray-950">
              <Outlet />
            </main>

            <Footer />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
