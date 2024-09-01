"use client";
import { useConvexAuth } from "convex/react";
import { LoaderCircle } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import Navigation from "./_components/navigation";

function MainLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderCircle className="animate-spin w-16 h-16 text-blue-500" />
      </div>
    );
  }
  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="h-full flex">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
}

export default MainLayout;
