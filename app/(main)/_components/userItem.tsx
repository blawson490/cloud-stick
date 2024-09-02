import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { SignOutButton, UserProfile, useUser } from "@clerk/nextjs";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import {
  ChevronsLeftRight,
  LogOut,
  Mail,
  MessageSquare,
  Moon,
  PlusCircle,
  Settings,
  Sun,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import React from "react";

import { useTheme } from "next-themes";

function UserItem() {
  const { user } = useUser();
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full p-2">
        <div className="rounded-lg bg-background border w-full justify-evenly flex flex-row p-2">
          <Avatar className="h-9 w-9 mr-2">
            <AvatarImage src={user?.imageUrl} />
          </Avatar>
          <div className="flex flex-col">
            <span className="text-start font-medium line-clamp-1 text-sm">
              {user?.fullName}
            </span>
            <span className="text-start text-xs text-muted-foreground">
              {user?.emailAddresses[0].emailAddress}
            </span>
          </div>

          <div className="flex flex-col">
            <ChevronsLeftRight className="rotate-90 text-muted-foreground h-4 w-4" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="start"
        alignOffset={11}
        forceMount
      >
        <DropdownMenuLabel className="flex flex-row">
          <Avatar className="h-9 w-9 mr-2">
            <AvatarImage src={user?.imageUrl} />
          </Avatar>
          <div className="flex flex-col">
            <span className="text-start font-medium line-clamp-1 text-sm">
              {user?.fullName}
            </span>
            <span className="text-start text-xs text-muted-foreground">
              {user?.emailAddresses[0].emailAddress}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <Users className="mr-2 h-4 w-4" />
            <span>Team</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Invite users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Message</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>More...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Sun className="mr-2 h-4 w-4 dark:hidden block" />
              <Moon className="mr-2 h-4 w-4 hidden dark:block" />
              <span>Toggle theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <SignOutButton>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserItem;
