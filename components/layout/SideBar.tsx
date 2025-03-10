"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  CreditCard,
  History,
  BarChart2,
  Users,
  ShoppingBag,
  Briefcase,
  Settings,
  LogOut,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

interface SidebarProps {
  navItems: NavItem[];
  userType?: "farmer" | "lender" | "admin";
}

const Sidebar: React.FC<SidebarProps> = ({ navItems, userType = "farmer" }) => {
  const pathname = usePathname();

  // Map icon string to Lucide icon component
  const getIcon = (iconName: string, active: boolean) => {
    const className = active
      ? "text-green-600"
      : "text-gray-500 group-hover:text-gray-900";
    const size = 20;

    switch (iconName) {
      case "dashboard":
      case "home":
        return <Home size={size} className={className} />;
      case "user":
      case "profile":
        return <User size={size} className={className} />;
      case "loans":
      case "credit":
        return <CreditCard size={size} className={className} />;
      case "transactions":
      case "history":
        return <History size={size} className={className} />;
      case "stats":
      case "analytics":
        return <BarChart2 size={size} className={className} />;
      case "users":
        return <Users size={size} className={className} />;
      case "marketplace":
        return <ShoppingBag size={size} className={className} />;
      case "portfolio":
        return <Briefcase size={size} className={className} />;
      case "settings":
        return <Settings size={size} className={className} />;
      case "help":
        return <HelpCircle size={size} className={className} />;
      case "risk":
        return <AlertTriangle size={size} className={className} />;
      default:
        return <Home size={size} className={className} />;
    }
  };

  // Get brand color and logo based on user type
  const getBrandDetails = () => {
    switch (userType) {
      case "farmer":
        return { color: "bg-green-600", name: "Farmer Portal" };
      case "lender":
        return { color: "bg-blue-600", name: "Lender Portal" };
      case "admin":
        return { color: "bg-purple-600", name: "Admin Portal" };
      default:
        return { color: "bg-gray-800", name: "Agri-Finance Platform" };
    }
  };

  const brand = getBrandDetails();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
        {/* Sidebar header / logo area */}
        <div
          className={`flex items-center h-16 flex-shrink-0 px-4 ${brand.color}`}
        >
          <Link href="/" className="flex items-center">
            <img
              className="h-8 w-auto"
              src="/logo.svg"
              alt="Agri-Finance Platform"
            />
            <span className="ml-2 text-white font-medium text-lg">
              {brand.name}
            </span>
          </Link>
        </div>

        {/* Navigation links */}
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? "bg-gray-100 text-green-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {getIcon(item.icon, isActive)}
                  <span className="ml-3">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom section with help and logout */}
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <Link href="/help" className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div>
                <HelpCircle className="inline-block h-5 w-5 text-gray-500 group-hover:text-gray-900" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Help Center
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <button className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div>
                <LogOut className="inline-block h-5 w-5 text-gray-500 group-hover:text-gray-900" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Sign Out
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
