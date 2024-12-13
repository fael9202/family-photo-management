"use client";

import { Inter } from "next/font/google";
import "@/app/globals.css";
import Link from "next/link";
import { HeaderConfig } from "./header-config";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Session } from "next-auth";
const inter = Inter({ subsets: ["latin"] });

interface HeaderProps {
  children: ReactNode;
  session: Session;
}

export default function Header({ children, session }: HeaderProps) {
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
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0 md:hidden"
                      onClick={() => setIsSheetOpen(true)}
                    >
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <nav className="flex-1 grid gap-6 text-lg font-medium sm:space-x-8">
                      {HeaderConfig.map((item) => (
                        <Link
                          href={item.href}
                          key={item.label}
                          onClick={() => handleMenuItemClick(item.href)}
                          className={`transition-colors ${
                            isActive(item.href)
                              ? "text-foreground"
                              : "text-muted-foreground"
                          } hover:text-foreground`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                  </SheetContent>
                </Sheet>

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
                <p className="text-sm text-foreground mr-2">
                  {session.user?.email} /
                </p>
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
