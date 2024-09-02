"use client";
import React from "react";
import AddStickDialog from "../../_components/AddStickDialog";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import { StickCard } from "../../_components/stick-card";
import Link from "next/link";
function Placeholder() {
  return (
    <div className="flex flex-col gap-8 w-full items-center mt-24">
      <div className="text-2xl">You have no files, upload one now</div>
      <AddStickDialog />
    </div>
  );
}

function SticksPage() {
  const sticks = useQuery(api.cloudsticks.getCloudSticks, { query: "skip" });
  console.log(sticks);
  const isLoading = sticks === undefined;

  return (
    <div className="flex flex-col w-full h-full cursor-default">
      <div className="bg-secondary h-9 pl-11 flex flex-row items-center">
        <p>Sticks</p>
      </div>
      <div className="py-8 px-4 overflow-y-auto">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-medium">My Sticks</h1>
          <AddStickDialog />
        </div>
        <div className="container mx-auto">
          {isLoading && (
            <div className="flex flex-col gap-8 w-full items-center mt-24">
              <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
              <div className="text-2xl">Loading your files...</div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            {sticks?.map((stick) => {
              return (
                <Link href={`/sticks/${stick._id}`}>
                  <StickCard key={stick._id} stick={stick} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SticksPage;
