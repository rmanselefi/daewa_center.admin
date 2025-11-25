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
import { useDeleteSpeaker } from "@/hooks/useSpeakers";
import { Speaker } from "@/services/speaker.service";

interface DeleteSpeakerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  speaker: Speaker | null;
}

export function DeleteSpeakerDialog({
  open,
  onOpenChange,
  speaker,
}: DeleteSpeakerDialogProps) {
  const { mutate: deleteSpeaker, isPending } = useDeleteSpeaker();

  if (!speaker) return null;

  const handleDelete = () => {
    deleteSpeaker(speaker.id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Are you sure?</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-medium text-foreground">{speaker.name}</span>{" "}
            and remove their data from our servers.
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
