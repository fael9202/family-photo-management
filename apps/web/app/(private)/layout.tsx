import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { Toaster } from "@/components/ui/toaster";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
import Header from "@/components/header/header";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }
  return (
    <Header>
      {children}
      <Toaster />
    </Header>
  );
}
