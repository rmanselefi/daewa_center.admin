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

const speakersData = [
  { 
    id: 1, 
    name: "Sheikh Ahmad Al-Khalil", 
    email: "ahmad@example.com",
    lectures: 45, 
    totalViews: "342K",
    status: "Active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad"
  },
  { 
    id: 2, 
    name: "Sheikh Muhammad Ibrahim", 
    email: "muhammad@example.com",
    lectures: 38, 
    totalViews: "287K",
    status: "Active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Muhammad"
  },
  { 
    id: 3, 
    name: "Sheikh Abdullah Hassan", 
    email: "abdullah@example.com",
    lectures: 52, 
    totalViews: "421K",
    status: "Active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abdullah"
  },
  { 
    id: 4, 
    name: "Sheikh Omar Suleiman", 
    email: "omar@example.com",
    lectures: 31, 
    totalViews: "198K",
    status: "Inactive",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar"
  },
  { 
    id: 5, 
    name: "Sheikh Yasir Qadhi", 
    email: "yasir@example.com",
    lectures: 67, 
    totalViews: "534K",
    status: "Active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yasir"
  },
];

export default function Speakers() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Speakers Management</h1>
          <p className="text-muted-foreground">Manage your lecture speakers and their profiles</p>
        </div>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Speaker
        </Button>
      </div>

      <AddSpeakerDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />

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
                <TableHead className="text-muted-foreground">Lectures</TableHead>
                <TableHead className="text-muted-foreground">Total Views</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {speakersData.map((speaker) => (
                <TableRow key={speaker.id} className="border-border hover:bg-secondary/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={speaker.avatar} alt={speaker.name} />
                        <AvatarFallback>{speaker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className="text-foreground">{speaker.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">{speaker.email}</TableCell>
                  <TableCell className="text-foreground">{speaker.lectures}</TableCell>
                  <TableCell className="text-foreground">{speaker.totalViews}</TableCell>
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
                      <DropdownMenuContent align="end" className="bg-popover border-border">
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
