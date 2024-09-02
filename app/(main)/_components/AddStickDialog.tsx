"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Form
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import StickSizeRadioGroup from "./StickSizeRadioGroup";
import CombinedLabelSelect from "@/components/ui/combined-label-select";

// Hooks
import { useMutation } from "convex/react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

//api
import { api } from "@/convex/_generated/api";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  expiration: z.enum(["24h", "7d", "30d"], {
    required_error: "Please select an expiration period.",
  }),
  size: z.number().int().positive().max(500, {
    message: "Size must be 1, 250, or 500 MB.",
  }),
});

// Stick Sizes
const sizeOptions = [
  {
    name: "Small",
    description: "For sharing small images",
    value: 1,
  },
  {
    name: "Medium",
    description: "For sharing compressed folders, or small files",
    value: 250,
  },
  {
    name: "Large",
    description: "For sharing larger files",
    value: 500,
  },
];

export default function AddStickDialog() {
  const { toast } = useToast();
  const createCloudStick = useMutation(api.cloudsticks.createCloudStick);
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      expiration: undefined,
      size: 250,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createCloudStick({
      name: values.name,
      expiration: values.expiration,
      size: values.size,
    });

    form.reset();

    setIsFileDialogOpen(false);
    toast({
      variant: "default",
      title: "Stick created successfully",
      description: "Successfully created a new CloudStick",
    });
  }

  return (
    <Dialog
      open={isFileDialogOpen}
      onOpenChange={(isOpen) => {
        setIsFileDialogOpen(isOpen);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button>New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>New Stick</DialogTitle>
              <DialogDescription>
                Create a new stick to upload files to and share with others.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My New CloudStick" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiration"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CombinedLabelSelect
                      labelText="Expiration"
                      selectPlaceholder="Select an expiration"
                      selectOptions={[
                        { value: "24h", label: "24 hours" },
                        { value: "7d", label: "7 days" },
                        { value: "30d", label: "30 days" },
                      ]}
                      onSelectChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    This is when your CloudStick expires. It can be renewed
                    later.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <StickSizeRadioGroup
                      groupName="CloudStick Size"
                      options={sizeOptions}
                      defaultValue={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="justify-end md:justify-between">
              <DialogClose asChild disabled={form.formState.isSubmitting}>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="flex gap-1"
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
