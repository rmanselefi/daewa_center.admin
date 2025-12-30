import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CourseService,
  CreateCourseDto,
  UpdateCourseDto,
} from "@/services/course.service";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const COURSE_KEYS = {
  all: ["courses"] as const,
  lists: () => [...COURSE_KEYS.all, "list"] as const,
  list: (filters: string) => [...COURSE_KEYS.lists(), { filters }] as const,
  details: () => [...COURSE_KEYS.all, "detail"] as const,
  detail: (id: string) => [...COURSE_KEYS.details(), id] as const,
};

export function useCourses() {
  return useQuery({
    queryKey: COURSE_KEYS.lists(),
    queryFn: () => CourseService.getAll(),
  });
}

export function useCourse(id: string) {
  return useQuery({
    queryKey: COURSE_KEYS.detail(id),
    queryFn: () => CourseService.getById(id),
    enabled: !!id,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCourseDto) => CourseService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSE_KEYS.lists() });
      toast.success("Course created successfully");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to create course");
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCourseDto }) =>
      CourseService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: COURSE_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: COURSE_KEYS.detail(data.id) });
      toast.success("Course updated successfully");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to update course");
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => CourseService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSE_KEYS.lists() });
      toast.success("Course deleted successfully");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to delete course");
    },
  });
}
