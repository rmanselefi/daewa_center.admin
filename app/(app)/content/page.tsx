"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const contentData = [
  {
    id: 1,
    title: "The Importance of Patience",
    speaker: "Sheikh Ahmad Al-Khalil",
    duration: "45:23",
    views: "15.2K",
    status: "Published",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "Understanding Tawheed",
    speaker: "Sheikh Muhammad Ibrahim",
    duration: "52:18",
    views: "12.8K",
    status: "Published",
    date: "2024-01-14",
  },
  {
    id: 3,
    title: "The Virtues of Ramadan",
    speaker: "Sheikh Abdullah Hassan",
    duration: "38:45",
    views: "18.5K",
    status: "Published",
    date: "2024-01-13",
  },
  {
    id: 4,
    title: "Quranic Reflections",
    speaker: "Sheikh Omar Suleiman",
    duration: "41:30",
    views: "9.3K",
    status: "Draft",
    date: "2024-01-12",
  },
  {
    id: 5,
    title: "The Path to Paradise",
    speaker: "Sheikh Yasir Qadhi",
    duration: "49:12",
    views: "11.7K",
    status: "Published",
    date: "2024-01-11",
  },
];

export default function Content() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

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
          onClick={() => setIsAddDialogOpen(true)}
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
                  Duration
                </TableHead>
                <TableHead className="text-muted-foreground">Views</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contentData.map((item) => (
                <TableRow
                  key={item.id}
                  className="border-border hover:bg-secondary/50"
                >
                  <TableCell className="font-medium text-foreground">
                    {item.title}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {item.speaker}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {item.duration}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {item.views}
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
                  <TableCell className="text-foreground">{item.date}</TableCell>
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
                        <DropdownMenuItem className="text-foreground hover:bg-secondary cursor-pointer">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive hover:bg-destructive/10 cursor-pointer">
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
