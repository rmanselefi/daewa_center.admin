"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, MoreVertical, Edit, Trash2, GripVertical, Play, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { AddLessonDialog } from "@/components/custom/dialog/AddLessonDialog";
import { EditLessonDialog } from "@/components/custom/dialog/EditLessonDialog";
import { DeleteLessonDialog } from "@/components/custom/dialog/DeleteLessonDialog";
import { useParams, useRouter } from "next/navigation";
import { useCourse } from "@/hooks/useCourses";
import type { Lesson } from "@/services/course.service";

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [isAddLessonDialogOpen, setIsAddLessonDialogOpen] = useState(false);
  const [isEditLessonDialogOpen, setIsEditLessonDialogOpen] = useState(false);
  const [isDeleteLessonDialogOpen, setIsDeleteLessonDialogOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  
  const { data: course, isLoading, error } = useCourse(id || "");

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <p className="text-muted-foreground">Loading course...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-muted-foreground">Course not found</p>
        <Button variant="outline" onClick={() => router.push("/course")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>
      </div>
    );
  }

  const handleEditLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsEditLessonDialogOpen(true);
  };

  const handleDeleteLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsDeleteLessonDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.push("/course")}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Course Info Card */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <CardTitle className="text-xl text-foreground">{course.title}</CardTitle>
                <span 
                  className={`px-2 py-1 rounded-full text-xs ${
                    course.status === 'Published' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {course.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{course.description}</p>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Course
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Speaker: </span>
                      <span className="text-foreground">{course.speaker?.name || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Category: </span>
                      <Badge variant="secondary">{course.category?.name || "N/A"}</Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Lessons: </span>
                      <span className="text-foreground">{course.lessons?.length || 0}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Created: </span>
                      <span className="text-foreground">
                        {course.createdAt ? new Date(course.createdAt).toLocaleDateString() : "N/A"}
                      </span>
                    </div>
          </div>
        </CardContent>
      </Card>

      {/* Lessons Card */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground">Lessons</CardTitle>
            <Button 
              onClick={() => setIsAddLessonDialogOpen(true)} 
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Lesson
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {course.lessons && course.lessons.length > 0 ? (
            <div className="space-y-2">
              {course.lessons.map((lesson) => (
                <div 
                  key={lesson.id} 
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border hover:bg-secondary/70 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {lesson.orderIndex}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{lesson.lessonTitle}</h4>
                      
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Play className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditLesson(lesson);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteLesson(lesson);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                <Play className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-foreground mb-1">No lessons yet</h3>
              <p className="text-sm text-muted-foreground mb-4">Add your first lesson to this course</p>
              <Button 
                onClick={() => setIsAddLessonDialogOpen(true)}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Lesson
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <AddLessonDialog 
        open={isAddLessonDialogOpen} 
        onOpenChange={setIsAddLessonDialogOpen}
        courseId={id || ""}
        onSuccess={() => setIsAddLessonDialogOpen(false)}
      />

      <EditLessonDialog 
        open={isEditLessonDialogOpen} 
        onOpenChange={(open) => {
          setIsEditLessonDialogOpen(open);
          if (!open) setSelectedLesson(null);
        }}
        lesson={selectedLesson}
        onSuccess={() => {
          setIsEditLessonDialogOpen(false);
          setSelectedLesson(null);
        }}
      />

      <DeleteLessonDialog 
        open={isDeleteLessonDialogOpen} 
        onOpenChange={(open) => {
          setIsDeleteLessonDialogOpen(open);
          if (!open) setSelectedLesson(null);
        }}
        lesson={selectedLesson}
        courseId={id || ""}
      />
    </div>
  );
}
