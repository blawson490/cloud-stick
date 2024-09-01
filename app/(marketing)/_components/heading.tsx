"use client";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { SignInButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

function Heading() {
  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
          Share a digital usb stick with any one over the cloud. Welcome to{" "}
          <span className="text-primary text-nowrap">Cloud Stick</span>
        </h1>
        <h3 className="text-base sm:text-xl md:text-2xl font-medium">
          Cloud Stick is the best resource for sharing <br />
          usb sticks over the cloud.
        </h3>
      </div>
      <SignedIn>
        <Button asChild>
          <Link href={"/sticks"}>
            Enter Cloud Stick
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button className="text-white">
            Start using Cloud Stick
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}

export default Heading;
