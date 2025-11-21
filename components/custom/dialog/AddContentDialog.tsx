"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const lectureSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  speaker: z.string().min(1, "Speaker is required"),
  category: z.string().min(1, "Category is required"),
  videoUrl: z
    .string()
    .trim()
    .url("Invalid video URL")
    .max(500, "URL must be less than 500 characters"),
  description: z
    .string()
    .trim()
    .max(1000, "Description must be less than 1000 characters")
    .optional(),
  duration: z
    .string()
    .regex(/^\d{1,2}:\d{2}$/, "Duration must be in format MM:SS or HH:MM")
    .optional()
    .or(z.literal("")),
  thumbnailUrl: z
    .string()
    .trim()
    .url("Invalid URL")
    .optional()
    .or(z.literal("")),
});

type LectureFormValues = z.infer<typeof lectureSchema>;

interface AddContentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock data - replace with actual data from your database
const speakers = [
  "Sheikh Ahmad Al-Khalil",
  "Sheikh Muhammad Ibrahim",
  "Sheikh Abdullah Hassan",
  "Sheikh Omar Suleiman",
  "Sheikh Yasir Qadhi",
];

const categories = [
  "Faith & Belief",
  "Quran Studies",
  "Islamic History",
  "Family & Society",
  "Ramadan",
  "Prayer & Worship",
];

export function AddContentDialog({
  open,
  onOpenChange,
}: AddContentDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LectureFormValues>({
    resolver: zodResolver(lectureSchema),
    defaultValues: {
      title: "",
      speaker: "",
      category: "",
      videoUrl: "",
      description: "",
      duration: "",
      thumbnailUrl: "",
    },
  });

  const onSubmit = async (data: LectureFormValues) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual API call to save lecture
      console.log("Lecture data:", data);
      toast.success("Lecture added successfully");
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to add lecture");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add New Lecture</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Upload a new lecture to your content library.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Title *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="The Importance of Patience"
                      className="bg-background border-border text-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="speaker"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Speaker *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-background border-border text-foreground">
                          <SelectValue placeholder="Select speaker" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover border-border">
                        {speakers.map((speaker) => (
                          <SelectItem
                            key={speaker}
                            value={speaker}
                            className="text-foreground"
                          >
                            {speaker}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Category *
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-background border-border text-foreground">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover border-border">
                        {categories.map((category) => (
                          <SelectItem
                            key={category}
                            value={category}
                            className="text-foreground"
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Video URL *</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://youtube.com/watch?v=..."
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief description of the lecture content..."
                      className="bg-background border-border text-foreground resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Duration</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="45:23"
                        className="bg-background border-border text-foreground font-mono"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="thumbnailUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Thumbnail URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://..."
                        className="bg-background border-border text-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                {isLoading ? "Adding..." : "Add Lecture"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
