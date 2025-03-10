// Header.tsx
"use client";

import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  userMenuOpen: boolean;
  setUserMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  setSidebarOpen,
  userMenuOpen,
  setUserMenuOpen,
}) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    router.push("/login");
  };

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <button
        type="button"
        className="px-4 md:hidden border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <svg
          className="h-6 w-6"
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
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex items-center">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            {title}
          </h1>
        </div>

        <div className="ml-4 flex items-center md:ml-6">
          <button
            className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            aria-label="View notifications"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          <div className="ml-3 relative">
            <div>
              <button
                className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                <span className="hidden md:block mr-2 text-sm font-medium text-gray-700">
                  John Farmer
                </span>
                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                  JF
                </div>
              </button>
            </div>

            {userMenuOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <a
                  href="/farmer/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Your Profile
                </a>
                <a
                  href="/farmer/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Settings
                </a>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
