"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/SideBar";
import { usePathname } from "next/navigation";

export default function FarmerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    {
      name: "Dashboard",
      href: "/farmer",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      name: "Loan Applications",
      href: "/farmer/loans",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
    {
      name: "Apply for Loan",
      href: "/farmer/loans/apply",
      icon: "M12 6v6m0 0v6m0-6h6m-6 0H6",
    },
    {
      name: "Transactions",
      href: "/farmer/transactions",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      name: "Profile",
      href: "/farmer/profile",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    },
  ];

  const isNavItemActive = (navItem: {
    name: string;
    href: string;
    icon: string;
  }) => {
    if (navItem.href === "/farmer") {
      return pathname === "/farmer";
    } else if (navItem.href === "/farmer/loans/apply") {
      return pathname === "/farmer/loans/apply";
    } else if (navItem.href === "/farmer/loans") {
      return pathname === "/farmer/loans";
    }
    return pathname.startsWith(navItem.href);
  };

  useEffect(() => {
    const currentPage = navigation.find((item) => isNavItemActive(item));
    if (currentPage) {
      setPageTitle(currentPage.name);
    }
  }, [pathname, navigation]);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 z-40 transition-opacity ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Header
          title={pageTitle}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={setUserMenuOpen}
        />

        <main className="flex-1 relative overflow-y-auto focus:outline-none p-6">
          <div className="max-w-7xl mx-auto">
            <div className="py-2">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
