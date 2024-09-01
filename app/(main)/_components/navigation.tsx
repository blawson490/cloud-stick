"use client";

import React from "react";

function Navigation() {
  return (
    <>
      <aside className="group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[100]">
        <div>
          <p>Action Items</p>
        </div>
        <div className="mt-4">
          <p>File Explorer</p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary right-0 top-0" />
      </aside>
    </>
  );
}

export default Navigation;
