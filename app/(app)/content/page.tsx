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
import { AddContentDialog } from "@/components/custom/dialog/AddContentDialog";
import { EditContentDialog } from "@/components/custom/dialog/EditContentDialog";
import { DeleteContentDialog } from "@/components/custom/dialog/DeleteContentDialog";
import { useContents } from "@/hooks/useContents";
import { Content } from "@/services/content.service";
import { format } from "date-fns";
import { Switch } from "@radix-ui/react-switch";

export default function ContentPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);

  const { data: contents, isLoading, error } = useContents();

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

  const handleEdit = (content: Content) => {
    setSelectedContent(content);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (content: Content) => {
    setSelectedContent(content);
    setIsDeleteDialogOpen(true);
  };

  const toggleFeatured = () => {
    // TODO: Implement featured toggle functionality
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading content...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-destructive">
        Failed to load content
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Content Management
          </h1>
          <p className="text-muted-foreground">
            Manage your lectures and videos
          </p>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Lecture
        </Button>
      </div>

      <AddContentDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />

      <EditContentDialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open);
          if (!open) setSelectedContent(null);
        }}
        content={selectedContent}
      />

      <DeleteContentDialog
        open={isDeleteDialogOpen}
        onOpenChange={(open) => {
          setIsDeleteDialogOpen(open);
          if (!open) setSelectedContent(null);
        }}
        content={selectedContent}
      />

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search lectures..."
                className="pl-10 bg-background border-border"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Title</TableHead>
                <TableHead className="text-muted-foreground">Speaker</TableHead>
                <TableHead className="text-muted-foreground">
                  Category
                </TableHead>
                <TableHead className="text-muted-foreground">
                  Duration
                </TableHead>
                <TableHead className="text-muted-foreground">Views</TableHead>
                <TableHead className="text-muted-foreground">
                  Featured
                </TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contents?.map((item) => (
                <TableRow
                  key={item.id}
                  className="border-border hover:bg-secondary/50"
                >
                  <TableCell className="font-medium text-foreground">
                    {item.title}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {item.speaker?.name || "-"}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {item.category?.name || "-"}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {item.duration || "-"}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {item.views || 0}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={item.isFeatured}
                      onCheckedChange={() => toggleFeatured(item.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === "Published"
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-foreground">
                    {item.createdAt
                      ? format(new Date(item.createdAt), "yyyy-MM-dd")
                      : "-"}
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
                          onClick={() => handleEdit(item)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive hover:bg-destructive/10 cursor-pointer"
                          onClick={() => handleDelete(item)}
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
