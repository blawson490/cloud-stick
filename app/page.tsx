"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
  UserProfile,
  useSession,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";

export default function Home() {
  const files = useQuery(api.files.getFiles);
  const createFile = useMutation(api.files.createFile);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedOut>
        <Button>
          <SignInButton mode="modal" />
        </Button>
      </SignedOut>
      <SignedIn>
        <UserButton />
        <Button variant={"destructive"}>
          <SignOutButton />
        </Button>

        {files?.map((file) => {
          return <div key={file._id}>{file.name}</div>;
        })}
        <Button
          onClick={() => {
            createFile({
              name: "hello world",
            });
          }}
        >
          Click Me!
        </Button>
      </SignedIn>
    </main>
  );
}
