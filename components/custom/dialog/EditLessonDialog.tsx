"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
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
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { useUpdateLesson } from "@/hooks/useLessons";
import type { Lesson as CourseLesson } from "@/services/course.service";

type Lesson = CourseLesson & {
  audioUrl?: string;
};

const lessonSchema = z.object({
  lessonTitle: z.string().optional(),
  audioFile: z.instanceof(File).optional(),
  orderIndex: z.number().min(1, "Order must be at least 1"),
  duration: z
    .string()
    .trim()
    .regex(/^(\d{1,2}:)?\d{1,2}:\d{2}$/, "Duration must be in format MM:SS or HH:MM:SS (e.g., 30:00 or 1:30:00)")
    .optional(),
});

type LessonFormData = z.infer<typeof lessonSchema>;

interface EditLessonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lesson: Lesson | null;
  onSuccess?: () => void;
}

export function EditLessonDialog({ open, onOpenChange, lesson, onSuccess }: EditLessonDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const updateLessonMutation = useUpdateLesson();

  const form = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      lessonTitle: "",
      orderIndex: 1,
      duration: "",
    },
  });

  useEffect(() => {
    if (open && lesson) {
      form.reset({
        lessonTitle: lesson.lessonTitle || "",
        orderIndex: lesson.orderIndex || 1,
        duration: lesson.duration || "",
      });
    }
  }, [open, lesson, form]);

  const onSubmit = async (data: LessonFormData) => {
    if (!lesson) return;

    try {
      await updateLessonMutation.mutateAsync({
        id: lesson.id,
        data: {
          lessonTitle: data.lessonTitle,
          orderIndex: data.orderIndex,
          file: data.audioFile,
          duration: data.duration,
        },
      });
      form.reset();
      setSelectedFile(null);
      onOpenChange(false);
      onSuccess?.();
    } catch {
      // Error is handled by the mutation
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      // Reset selected file when opening
      setSelectedFile(null);
    } else {
      // Reset form and selected file when closing
      form.reset();
      setSelectedFile(null);
    }
    onOpenChange(newOpen);
  };

  if (!lesson) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Edit Lesson</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="lessonTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Title (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter lesson title"
                      className="bg-secondary border-border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="audioFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Audio File (Optional)</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept="audio/*"
                          className="bg-secondary border-border"
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file);
                              setSelectedFile(file);
                            }
                          }}
                        />
                      </div>
                      {selectedFile && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 p-2 rounded">
                          <Upload className="h-4 w-4" />
                          <span className="truncate">{selectedFile.name}</span>
                          <span className="text-xs">
                            ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                          </span>
                        </div>
                      )}
                      {!selectedFile && lesson.audioUrl && (
                        <p className="text-xs text-muted-foreground">
                          Current file: {lesson.audioUrl.split('/').pop() || 'Audio file'}
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
              name="orderIndex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Lesson Order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      placeholder="1"
                      className="bg-secondary border-border"
                      value={field.value ?? 1}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
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
                      className="bg-secondary border-border"
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
                onClick={() => handleOpenChange(false)}
                className="border-border"
                disabled={updateLessonMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90"
                disabled={updateLessonMutation.isPending}
              >
                {updateLessonMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Lesson"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
