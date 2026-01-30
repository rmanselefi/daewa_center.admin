"use client";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useUpdateContent } from "@/hooks/useContents";
import { useSpeakers } from "@/hooks/useSpeakers";
import { useCategories } from "@/hooks/useCategories";
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
import { Loader2 } from "lucide-react";
import { Content } from "@/services/content.service";

// Helper function to format duration in MM:SS or HH:MM:SS format
const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

// Helper function to get audio duration from file
const getAudioDuration = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    const url = URL.createObjectURL(file);

    audio.addEventListener("loadedmetadata", () => {
      URL.revokeObjectURL(url);
      const duration = formatDuration(audio.duration);
      resolve(duration);
    });

    audio.addEventListener("error", () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load audio file"));
    });

    audio.src = url;
  });
};

const lectureSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  speakerId: z.string().min(1, "Speaker is required"),
  categoryId: z.string().min(1, "Category is required"),
  audioFile: z.instanceof(File).optional(),
  description: z
    .string()
    .trim()
    .max(1000, "Description must be less than 1000 characters")
    .optional(),
  status: z.enum(["Published", "Draft", "Archived"]).optional(),
  duration: z
    .string()
    .trim()
    .regex(/^(\d{1,2}:)?\d{1,2}:\d{2}$/, "Duration must be in format MM:SS or HH:MM:SS (e.g., 30:00 or 1:30:00)")
    .optional(),
});

type LectureFormValues = z.infer<typeof lectureSchema>;

interface EditContentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: Content | null;
}

export function EditContentDialog({
  open,
  onOpenChange,
  content,
}: EditContentDialogProps) {
  const { mutate: updateContent, isPending } = useUpdateContent();
  const { data: speakers } = useSpeakers();
  const { data: categories } = useCategories();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCalculatingDuration, setIsCalculatingDuration] = useState(false);

  const form = useForm<LectureFormValues>({
    resolver: zodResolver(lectureSchema),
    defaultValues: {
      title: "",
      speakerId: "",
      categoryId: "",
      description: "",
      status: "Draft",
      duration: "",
    },
  });

  useEffect(() => {
    if (open && content) {
      form.reset({
        title: content.title,
        speakerId: content.speakerId,
        categoryId: content.categoryId,
        description: content.description || "",
        status: content.status,
        duration: content.duration || "",
      });
      setSelectedFile(null);
    }
  }, [open, content, form]);

  const onSubmit = (data: LectureFormValues) => {
    if (!content) return;

    updateContent(
      {
        id: content.id,
        data: {
          title: data.title,
          speakerId: data.speakerId,
          categoryId: data.categoryId,
          description: data.description,
          audioFile: data.audioFile,
          status: data.status,
          duration: data.duration,
        },
      },
      {
        onSuccess: () => {
          form.reset();
          setSelectedFile(null);
          onOpenChange(false);
        },
      }
    );
  };

  if (!content) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Edit Lecture</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Update the lecture details below.
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
                name="speakerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Speaker *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-background border-border text-foreground">
                          <SelectValue placeholder="Select speaker" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover border-border">
                        {Array.isArray(speakers) && speakers.map((speaker) => (
                          <SelectItem
                            key={speaker.id}
                            value={speaker.id}
                            className="text-foreground"
                          >
                            {speaker.name}
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
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Category *
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-background border-border text-foreground">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover border-border">
                        {Array.isArray(categories) && categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id}
                            className="text-foreground"
                          >
                            {category.name}
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
              name="audioFile"
              render={({ field: { onChange, value: _value, ...fieldRest } }) => (
                <FormItem>
                  <FormLabel className="text-foreground">
                    Audio File (Optional)
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input
                        type="file"
                        accept="audio/*"
                        className="bg-background border-border text-foreground file:text-foreground"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setSelectedFile(file);
                            onChange(file);

                            // Calculate duration automatically
                            setIsCalculatingDuration(true);
                            try {
                              const duration = await getAudioDuration(file);
                              form.setValue("duration", duration);
                            } catch (error) {
                              console.error("Failed to calculate audio duration:", error);
                            } finally {
                              setIsCalculatingDuration(false);
                            }
                          }
                        }}
                        {...fieldRest}
                      />
                      {selectedFile && (
                        <p className="text-sm text-muted-foreground">
                          New file: {selectedFile.name} (
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                          {isCalculatingDuration && " — calculating duration..."}
                        </p>
                      )}
                      {!selectedFile && content.audioUrl && (
                        <p className="text-sm text-muted-foreground">
                          Current file: {content.audioUrl.split('/').pop() || 'Audio file'}
                        </p>
                      )}
                    </div>
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

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Duration</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="30:00 or 1:30:00"
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
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="Published" className="text-foreground">
                        Published
                      </SelectItem>
                      <SelectItem value="Draft" className="text-foreground">
                        Draft
                      </SelectItem>
                      <SelectItem value="Archived" className="text-foreground">
                        Archived
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
                className="border-border"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Lecture"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
