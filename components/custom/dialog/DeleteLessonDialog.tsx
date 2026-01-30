"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteLesson } from "@/hooks/useLessons";
import type { Lesson } from "@/services/course.service";

interface DeleteLessonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lesson: Lesson | null;
  courseId: string;
  onSuccess?: () => void;
}

export function DeleteLessonDialog({
  open,
  onOpenChange,
  lesson,
  courseId,
  onSuccess,
}: DeleteLessonDialogProps) {
  const { mutate: deleteLesson, isPending } = useDeleteLesson();

  if (!lesson) return null;

  const handleDelete = () => {
    deleteLesson(
      { id: lesson.id, courseId },
      {
        onSuccess: () => {
          onOpenChange(false);
          onSuccess?.();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Are you sure?</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-medium text-foreground">
              {lesson.lessonTitle || "this lesson"}
            </span>{" "}
            and remove it from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="bg-background text-foreground border-border hover:bg-secondary"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
