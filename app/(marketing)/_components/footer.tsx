import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import React from "react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

function Footer() {
  return (
    <div className="flex items-center w-full p-6 bg-transparent">
      {/* Logo Image */}
      <p
        className={cn(
          "font-semibold text-nowrap hidden md:block",
          font.className
        )}
      >
        Cloud Stick
      </p>
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
        <Button variant={"ghost"} size={"sm"}>
          Privacy Policy
        </Button>
        <Button variant={"ghost"} size={"sm"}>
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
}

export default Footer;
