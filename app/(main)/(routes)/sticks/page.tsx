import { Button } from "@/components/ui/button";
import React from "react";
import AddStickDialog from "../../_components/AddStickDialog";

function SticksPage() {
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
        <div className="container mx-auto"></div>
      </div>
    </div>
  );
}

export default SticksPage;
