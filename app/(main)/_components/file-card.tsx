import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Api
import { Doc } from "@/convex/_generated/dataModel";

// Hooks
import { useUser } from "@clerk/nextjs";

export function FileCard({ file }: { file: Doc<"files"> }) {
  const user = useUser();
  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex gap-2 text-base font-normal">
          {file.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[200px] flex justify-center items-center"></CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2 text-xs text-gray-700 w-40 items-center">
          <Avatar className="w-6 h-6">
            <AvatarImage src={user.user?.imageUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {user.user?.fullName}
        </div>
      </CardFooter>
    </Card>
  );
}
