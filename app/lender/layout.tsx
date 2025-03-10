import React from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/SideBar";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Lender Portal | Agri-Finance Platform",
  description:
    "Access financial opportunities by investing in agricultural loans",
};

async function LenderLayout({ children }: { children: React.ReactNode }) {
  // Check for authenticated session - in a real app, validate lender role
  const session = await getServerSession();

  //   if (!session) {
  //     redirect("/login?callbackUrl=/lender");
  //   }

  const navItems = [
    { name: "Dashboard", href: "/lender", icon: "dashboard" },
    { name: "Marketplace", href: "/lender/marketplace", icon: "marketplace" },
    { name: "Portfolio", href: "/lender/portfolio", icon: "portfolio" },
    { name: "Profile", href: "/lender/profile", icon: "user" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar navItems={navItems} userType="lender" />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Lender Portal" />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>

        <footer className="bg-white p-4 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Agri-Finance Platform. All rights
            reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}

export default LenderLayout;
