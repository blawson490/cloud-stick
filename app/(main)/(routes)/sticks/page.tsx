import { Button } from "@/components/ui/button";
import React from "react";

function SticksPage() {
  return (
    <div className="flex flex-col w-full h-full cursor-default">
      <div className="bg-secondary h-9 pl-11 flex flex-row items-center">
        <p>Sticks</p>
      </div>
      <div className="py-8 px-2 overflow-y-auto">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-medium">My Sticks</h1>
          <Button size={"sm"}>New Stick</Button>
        </div>
      </div>
    </div>
  );
}

export default SticksPage;
