"use client";

import { useState } from "react";
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
import { useCreateLesson } from "@/hooks/useLessons";

// Helper function to format duration in MM:SS or HH:MM:SS format
const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

// Helper function to get audio duration from file
const getAudioDuration = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    const url = URL.createObjectURL(file);
    
    audio.addEventListener('loadedmetadata', () => {
      URL.revokeObjectURL(url);
      const duration = formatDuration(audio.duration);
      resolve(duration);
    });
    
    audio.addEventListener('error', () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load audio file'));
    });
    
    audio.src = url;
  });
};

const lessonSchema = z.object({
  lessonTitle: z.string().optional(),
  audioFile: z.instanceof(File, { message: "Audio file is required" }),
  orderIndex: z.number().min(1, "Order must be at least 1"),
  duration: z
    .string()
    .trim()
    .regex(/^(\d{1,2}:)?\d{1,2}:\d{2}$/, "Duration must be in format MM:SS or HH:MM:SS (e.g., 30:00 or 1:30:00)")
    .optional(),
});

type LessonFormData = z.infer<typeof lessonSchema>;

interface AddLessonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
  onSuccess?: () => void;
}

export function AddLessonDialog({ open, onOpenChange, courseId, onSuccess }: AddLessonDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCalculatingDuration, setIsCalculatingDuration] = useState(false);
  const createLessonMutation = useCreateLesson();

  const form = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      lessonTitle: "",
      orderIndex: 1,
      duration: "",
    },
  });

  const onSubmit = async (data: LessonFormData) => {
    try {
      await createLessonMutation.mutateAsync({
        courseId,
        lessonTitle: data.lessonTitle,
        orderIndex: data.orderIndex,
        file: data.audioFile,
        duration: data.duration,
      });
      form.reset();
      setSelectedFile(null);
      onOpenChange(false);
      onSuccess?.();
    } catch {
      // Error is handled by the mutation
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
      setSelectedFile(null);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add New Lesson</DialogTitle>
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
                  <FormLabel className="text-foreground">Audio File</FormLabel>
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
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file);
                              setSelectedFile(file);
                              
                              // Calculate duration automatically
                              setIsCalculatingDuration(true);
                              try {
                                const duration = await getAudioDuration(file);
                                form.setValue('duration', duration);
                              } catch (error) {
                                console.error('Failed to calculate audio duration:', error);
                                // Don't set duration if calculation fails
                              } finally {
                                setIsCalculatingDuration(false);
                              }
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
                          {isCalculatingDuration && (
                            <span className="text-xs text-primary ml-auto">
                              Calculating duration...
                            </span>
                          )}
                        </div>
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
                  <FormLabel className="text-foreground">Duration {isCalculatingDuration && "(calculating...)"}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="30:00 or 1:30:00"
                      className="bg-secondary border-border"
                      {...field}
                      disabled={isCalculatingDuration}
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
                disabled={createLessonMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90"
                disabled={createLessonMutation.isPending}
              >
                {createLessonMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Add Lesson"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
