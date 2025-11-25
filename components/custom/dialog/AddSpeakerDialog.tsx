import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCreateSpeaker, useUpdateSpeaker } from "@/hooks/useSpeakers";
import { Speaker } from "@/services/speaker.service";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const speakerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  bio: z
    .string()
    .trim()
    .max(500, "Bio must be less than 500 characters")
    .optional(),
  address: z
    .string()
    .trim()
    .max(255, "Address must be less than 255 characters")
    .optional(),
});

type SpeakerFormValues = z.infer<typeof speakerSchema>;

interface AddSpeakerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  speaker?: Speaker | null;
}

export function AddSpeakerDialog({
  open,
  onOpenChange,
  speaker,
}: AddSpeakerDialogProps) {
  const { mutate: createSpeaker, isPending: isCreating } = useCreateSpeaker();
  const { mutate: updateSpeaker, isPending: isUpdating } = useUpdateSpeaker();

  const isLoading = isCreating || isUpdating;
  const isEditMode = !!speaker;

  const form = useForm<SpeakerFormValues>({
    resolver: zodResolver(speakerSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      address: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (speaker) {
        form.reset({
          name: speaker.name,
          email: speaker.email,
          bio: speaker.bio || "",
          address: speaker.address || "",
        });
      } else {
        form.reset({
          name: "",
          email: "",
          bio: "",
          address: "",
        });
      }
    }
  }, [open, speaker, form]);

  const onSubmit = (data: SpeakerFormValues) => {
    if (isEditMode && speaker) {
      updateSpeaker(
        { id: speaker.id, data },
        {
          onSuccess: () => {
            form.reset();
            onOpenChange(false);
          },
        }
      );
    } else {
      createSpeaker(data, {
        onSuccess: () => {
          form.reset();
          onOpenChange(false);
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {isEditMode ? "Edit Speaker" : "Add New Speaker"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {isEditMode
              ? "Update speaker details."
              : "Add a new speaker to your platform. Fill in the details below."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Sheikh Ahmad Al-Khalil"
                      className="bg-background border-border text-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Email *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="ahmad@example.com"
                      className="bg-background border-border text-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief biography of the speaker..."
                      className="bg-background border-border text-foreground resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Main St, City, Country"
                      className="bg-background border-border text-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
                className="border-border"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading
                  ? isEditMode
                    ? "Updating..."
                    : "Adding..."
                  : isEditMode
                  ? "Update Speaker"
                  : "Add Speaker"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
