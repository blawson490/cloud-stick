"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import UploadFileDialog from "@/app/(main)/_components/uploadFileDialog";
import { Id } from "@/convex/_generated/dataModel";
import { FileCard } from "@/app/(main)/_components/file-card";

function Placeholder() {
  return (
    <div className="flex flex-col gap-8 w-full items-center mt-24">
      <div className="text-2xl">You have no files, upload one now</div>
      <Button>Add Files</Button>
    </div>
  );
}

function Stick({ params }: { params: { id: string } }) {
  const id = params.id as Id<"cloudSticks">;
  const stick = useQuery(api.cloudsticks.getCloudStickById, { id });
  const files = useQuery(api.files.getFiles, { stickId: id });

  if (stick === undefined) {
    return (
      <div className="flex flex-col gap-8 w-full items-center mt-24">
        <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
        <div className="text-2xl">Loading your files...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full cursor-default">
      <div className="bg-secondary h-9 pl-11 flex flex-row items-center">
        <p>{stick?.name}</p>
      </div>
      <div className="py-8 px-4 overflow-y-auto">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-medium">{stick?.name}</h1>
          <UploadFileDialog stickId={stick?._id} />
        </div>
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-4">
            {files === undefined || files.length === 0 ? (
              <Placeholder />
            ) : (
              files.map((file) => (
                // <Link key={file._id} href={`${file.fileId}`}>
                <FileCard file={file} />
                // </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stick;
