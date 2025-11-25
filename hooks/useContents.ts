import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ContentService,
  CreateContentDto,
  UpdateContentDto,
} from "@/services/content.service";
import { toast } from "sonner";

export const CONTENT_KEYS = {
  all: ["contents"] as const,
  lists: () => [...CONTENT_KEYS.all, "list"] as const,
  list: (filters: string) => [...CONTENT_KEYS.lists(), { filters }] as const,
  details: () => [...CONTENT_KEYS.all, "detail"] as const,
  detail: (id: string) => [...CONTENT_KEYS.details(), id] as const,
};

export function useContents() {
  return useQuery({
    queryKey: CONTENT_KEYS.lists(),
    queryFn: () => ContentService.getAll(),
  });
}

export function useContent(id: string) {
  return useQuery({
    queryKey: CONTENT_KEYS.detail(id),
    queryFn: () => ContentService.getById(id),
    enabled: !!id,
  });
}

export function useCreateContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateContentDto) => ContentService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTENT_KEYS.lists() });
      toast.success("Content created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create content");
    },
  });
}

export function useUpdateContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateContentDto }) =>
      ContentService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: CONTENT_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: CONTENT_KEYS.detail(data.id) });
      toast.success("Content updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update content");
    },
  });
}

export function useDeleteContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ContentService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTENT_KEYS.lists() });
      toast.success("Content deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete content");
    },
  });
}
