"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, MoreVertical, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AddSpeakerDialog } from "@/components/custom/dialog/AddSpeakerDialog";
import { DeleteSpeakerDialog } from "@/components/custom/dialog/DeleteSpeakerDialog";
import { useSpeakers } from "@/hooks/useSpeakers";
import { Speaker } from "@/services/speaker.service";

export default function Speakers() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  const { data: speakers, isLoading, error } = useSpeakers();

  const handleAdd = () => {
    setSelectedSpeaker(null);
    setIsAddDialogOpen(true);
  };

  const handleEdit = (speaker: Speaker) => {
    setSelectedSpeaker(speaker);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (speaker: Speaker) => {
    setSelectedSpeaker(speaker);
    setIsDeleteDialogOpen(true);
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading speakers...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-destructive">
        Failed to load speakers
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Speakers Management
          </h1>
          <p className="text-muted-foreground">
            Manage your lecture speakers and their profiles
          </p>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Speaker
        </Button>
      </div>

      <AddSpeakerDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        speaker={selectedSpeaker}
      />

      <DeleteSpeakerDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        speaker={selectedSpeaker}
      />

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search speakers..."
                className="pl-10 bg-background border-border"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Speaker</TableHead>
                <TableHead className="text-muted-foreground">Email</TableHead>
                <TableHead className="text-muted-foreground">Address</TableHead>
                <TableHead className="text-muted-foreground">
                  Lectures
                </TableHead>
                <TableHead className="text-muted-foreground">
                  Total Views
                </TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {speakers?.map((speaker) => (
                <TableRow
                  key={speaker.id}
                  className="border-border hover:bg-secondary/50"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {speaker.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-foreground">{speaker.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">
                    {speaker.email}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {speaker.address || "-"}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {speaker.lecturesCount || 0}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {speaker.totalViews || "0"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        speaker.status === "Active"
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {speaker.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-popover border-border"
                      >
                        <DropdownMenuItem
                          className="text-foreground hover:bg-secondary cursor-pointer"
                          onClick={() => handleEdit(speaker)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive hover:bg-destructive/10 cursor-pointer"
                          onClick={() => handleDelete(speaker)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
