"use client";

import { useConvexAuth } from "convex/react";
import Footer from "./_components/footer";
import Heading from "./_components/heading";
import { Loader, LoaderCircle, LoaderPinwheel } from "lucide-react";

export default function MarketingPage() {
  const { isLoading } = useConvexAuth();
  return (
    <div className="min-h-full flex flex-col">
      {isLoading ? (
        <div className=" absolute top-0 left-0 flex w-screen h-screen items-center justify-center">
          <LoaderCircle className="animate-spin w-16 h-16 text-blue-500" />
        </div>
      ) : (
        <>
          <div className="flex h-full flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10">
            <Heading />
            {/* Hero images/screenshots */}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
