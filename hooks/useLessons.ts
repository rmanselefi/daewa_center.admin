import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  LessonService,
  CreateLessonDto,
  UpdateLessonDto,
} from "@/services/lesson.service";
import { toast } from "sonner";
import { COURSE_KEYS } from "./useCourses";
import { AxiosError } from "axios";

export function useCreateLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLessonDto) => LessonService.create(data),
    onSuccess: (data) => {
      // Invalidate the course query to refresh the lessons list
      queryClient.invalidateQueries({ queryKey: COURSE_KEYS.detail(data.courseId) });
      queryClient.invalidateQueries({ queryKey: COURSE_KEYS.lists() });
      toast.success("Lesson created successfully");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to create lesson");
    },
  });
}

export function useUpdateLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLessonDto }) =>
      LessonService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: COURSE_KEYS.detail(data.courseId) });
      queryClient.invalidateQueries({ queryKey: COURSE_KEYS.lists() });
      toast.success("Lesson updated successfully");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to update lesson");
    },
  });
}

export function useDeleteLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, courseId }: { id: string; courseId: string }) =>
      LessonService.delete(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: COURSE_KEYS.detail(variables.courseId) });
      queryClient.invalidateQueries({ queryKey: COURSE_KEYS.lists() });
      toast.success("Lesson deleted successfully");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to delete lesson");
    },
  });
}
