"use client";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import Link from "next/link";
import React from "react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

function Navbar() {
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "z-10 bg-transparent fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <p
        className={cn(
          "font-semibold text-nowrap hidden md:block",
          font.className
        )}
      >
        CloudStick
      </p>
      <div className="md:ml-auto, md:justify-end justify-between w-full flex items-center gap-x-2">
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant={"ghost"} size={"sm"}>
              Login
            </Button>
          </SignInButton>
        </SignedOut>

        <SignedOut>
          <SignUpButton mode="modal">
            <Button className={"text-white"} size={"sm"}>
              Get CloudStick Free
            </Button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <Button variant={"ghost"} size={"sm"} asChild>
            <Link href={"/sticks"}>Enter CloudStick</Link>
          </Button>
        </SignedIn>

        <SignedIn>
          <UserButton afterSwitchSessionUrl="/" userProfileMode="modal" />
        </SignedIn>

        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
