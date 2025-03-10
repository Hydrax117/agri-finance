"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Bell, Settings, HelpCircle, User } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const pathname = usePathname();

  // Determine user type from URL path
  const getUserType = () => {
    if (pathname?.includes("/farmer")) return "farmer";
    if (pathname?.includes("/lender")) return "lender";
    if (pathname?.includes("/admin")) return "admin";
    return null;
  };

  const userType = getUserType();
  const displayTitle =
    title ||
    (userType === "farmer"
      ? "Farmer Portal"
      : userType === "lender"
      ? "Lender Portal"
      : userType === "admin"
      ? "Admin Portal"
      : "Agri-Finance Platform");

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <div className="md:hidden">
            {/* Mobile menu button - in a real app, this would toggle the sidebar */}
            <Button size="sm" className="mr-2">
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>

          <h1 className="text-xl font-semibold text-gray-800">
            {displayTitle}
          </h1>

          {/* Breadcrumbs could go here for deeper navigation */}
        </div>

        <div className="flex items-center space-x-2">
          {/* Notification bell */}
          <Button size="sm" className="text-gray-600 hover:text-gray-900">
            <Bell size={20} />
          </Button>

          {/* Help */}
          <Button size="sm" className="text-gray-600 hover:text-gray-900">
            <HelpCircle size={20} />
          </Button>

          {/* Settings */}
          <Button size="sm" className="text-gray-600 hover:text-gray-900">
            <Settings size={20} />
          </Button>

          {/* User menu */}
          <div className="relative ml-2">
            <button
              className="flex items-center focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <span className="ml-2 hidden md:block text-sm font-medium text-gray-700">
                {userType === "farmer"
                  ? "Jane Farmer"
                  : userType === "lender"
                  ? "John Lender"
                  : userType === "admin"
                  ? "Admin User"
                  : "Guest"}
              </span>
            </button>

            {/* Dropdown menu would go here in a real implementation */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
