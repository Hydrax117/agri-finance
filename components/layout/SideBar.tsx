// Sidebar.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();
  const router = useRouter();

  const navigation = [
    {
      name: "Dashboard",
      href: "/lender",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      name: "marketplace",
      href: "/lender/marketplace",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
    {
      name: "Portfolio",
      href: "/lender/portfolio",
      icon: "M12 6v6m0 0v6m0-6h6m-6 0H6",
    },

    {
      name: "Profile",
      href: "/lender/profile",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    },
  ];

  const isNavItemActive = (navItem: {
    name: string;
    href: string;
    icon: string;
  }) => {
    if (navItem.href === "/lender") {
      return pathname === "/lender";
    } else if (navItem.href === "/lender/marketplace") {
      return pathname === "/lender/marketplace";
    }
    return pathname.startsWith(navItem.href);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    router.push("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!sidebarOpen) return;

      const sidebarElement = document.getElementById("sidebar");
      if (sidebarElement && !sidebarElement.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen, setSidebarOpen]);

  return (
    <div
      id="sidebar"
      className={`fixed inset-y-0 left-0 flex flex-col bg-white border-r border-gray-200 w-64 lg:w-56 z-50 transform transition-transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:z-auto`}
    >
      <div className="flex items-center h-16 px-4bg-white border-r border-gray-200 flex-shrink-0">
        <Link href="/" className="flex items-center" aria-label="Home">
          <Image
            src="/logo.svg"
            alt="AgriFinance Logo"
            width={40}
            height={40}
            className="transition-transform hover:scale-105"
          />
          <span className="ml-2 text-xl font-bold text-gray-600">
            AgriFinance
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto pt-5 pb-4">
        <nav className="px-2 space-y-1">
          {navigation.map((item) => {
            const active = isNavItemActive(item);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors ${
                  active
                    ? "bg-gray-100 text-green-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <svg
                  className={`mr-3 h-6 w-6 flex-shrink-0 ${
                    active
                      ? "bg-gray-100 text-green-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={item.icon}
                  />
                </svg>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="h-9 w-9 rounded-full bg-green-600 flex items-center justify-center text-white font-medium">
            JF
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">John Farmer</p>
            <p className="text-xs text-gray-600">Premium Account</p>
          </div>
        </div>
        <button
          className="mt-3 w-full flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-green-700 hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={handleLogout}
          aria-label="Sign out"
        >
          <svg
            className="h-5 w-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
