import React, { Children } from "react";
import Navbar from "./_components/navbar";

function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-blue-500/20 dark:from-background dark:to-blue-500/40">
      <Navbar />
      <main className="h-screen pt-40">{children}</main>
    </div>
  );
}

export default MarketingLayout;
