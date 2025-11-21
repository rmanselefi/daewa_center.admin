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
import { Badge } from "@/components/ui/badge";
import { AddCategoryDialog } from "@/components/custom/dialog/AddCategoryDialog";

const categoriesData = [
  { 
    id: 1, 
    name: "Faith & Belief", 
    slug: "faith-belief",
    lectureCount: 124, 
    totalViews: "856K",
    color: "bg-blue-500/20 text-blue-500",
    status: "Active"
  },
  { 
    id: 2, 
    name: "Quran Studies", 
    slug: "quran-studies",
    lectureCount: 98, 
    totalViews: "672K",
    color: "bg-green-500/20 text-green-500",
    status: "Active"
  },
  { 
    id: 3, 
    name: "Islamic History", 
    slug: "islamic-history",
    lectureCount: 76, 
    totalViews: "534K",
    color: "bg-purple-500/20 text-purple-500",
    status: "Active"
  },
  { 
    id: 4, 
    name: "Family & Society", 
    slug: "family-society",
    lectureCount: 89, 
    totalViews: "612K",
    color: "bg-orange-500/20 text-orange-500",
    status: "Active"
  },
  { 
    id: 5, 
    name: "Ramadan", 
    slug: "ramadan",
    lectureCount: 145, 
    totalViews: "1.2M",
    color: "bg-teal-500/20 text-teal-500",
    status: "Active"
  },
  { 
    id: 6, 
    name: "Prayer & Worship", 
    slug: "prayer-worship",
    lectureCount: 67, 
    totalViews: "445K",
    color: "bg-pink-500/20 text-pink-500",
    status: "Active"
  },
  { 
    id: 7, 
    name: "Spiritual Growth", 
    slug: "spiritual-growth",
    lectureCount: 52, 
    totalViews: "389K",
    color: "bg-indigo-500/20 text-indigo-500",
    status: "Inactive"
  },
];

export default function Categories() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Categories Management</h1>
          <p className="text-muted-foreground">Organize your content with categories</p>
        </div>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <AddCategoryDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                className="pl-10 bg-background border-border"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Category</TableHead>
                <TableHead className="text-muted-foreground">Slug</TableHead>
                <TableHead className="text-muted-foreground">Lectures</TableHead>
                <TableHead className="text-muted-foreground">Total Views</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoriesData.map((category) => (
                <TableRow key={category.id} className="border-border hover:bg-secondary/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={category.color}>
                        {category.name}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground font-mono text-sm">{category.slug}</TableCell>
                  <TableCell className="text-foreground">{category.lectureCount}</TableCell>
                  <TableCell className="text-foreground">{category.totalViews}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        category.status === "Active"
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {category.status}
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
