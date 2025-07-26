import AppSidebar from "@/components/AppSidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
        {/* Navbar (fixed height, z-indexed) */}
        <Navbar />

        {/* Main area with Sidebar and Content */}
        <div className="flex flex-1 pt-16">
          {/* Sidebar */}
          <div className="w-64 bg-gray-900 border-r border-teal-800">
            <AppSidebar />
          </div>

          {/* Main Content + Footer */}
          <div className="flex-1 flex flex-col bg-gray-950">
            <main className="flex-1 p-4 bg-gray-950">
              <Outlet />
            </main>

            <Footer className="w-full bg-gray-900 border-t border-teal-800 py-3 text-center text-sm text-gray-400" />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
