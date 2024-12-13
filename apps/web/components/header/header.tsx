"use client";

import { Inter } from "next/font/google";
import "@/app/globals.css";
import Link from "next/link";
import { HeaderConfig } from "./header-config";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

interface HeaderProps {
  children: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  function handleLogout() {
    signOut().then(() => {
      toast.success("Conta desconectada com sucesso");
    });
  }

  const handleMenuItemClick = (href: string) => {
    setIsSheetOpen(false);
    window.location.href = href;
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-background border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-2xl font-bold">Photo App</span>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
                  {HeaderConfig.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => handleMenuItemClick(item.href)}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? "border-primary text-foreground"
                          : "border-transparent text-muted-foreground hover:border-gray-300 hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-foreground bg-background hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
