import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  SpeakerService,
  CreateSpeakerDto,
  UpdateSpeakerDto,
} from "@/services/speaker.service";
import { toast } from "sonner";

export const SPEAKER_KEYS = {
  all: ["speakers"] as const,
  lists: () => [...SPEAKER_KEYS.all, "list"] as const,
  list: (filters: string) => [...SPEAKER_KEYS.lists(), { filters }] as const,
  details: () => [...SPEAKER_KEYS.all, "detail"] as const,
  detail: (id: string) => [...SPEAKER_KEYS.details(), id] as const,
};

export function useSpeakers() {
  return useQuery({
    queryKey: SPEAKER_KEYS.lists(),
    queryFn: () => SpeakerService.getAll(),
  });
}

export function useSpeaker(id: string) {
  return useQuery({
    queryKey: SPEAKER_KEYS.detail(id),
    queryFn: () => SpeakerService.getById(id),
    enabled: !!id,
  });
}

export function useCreateSpeaker() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSpeakerDto) => SpeakerService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SPEAKER_KEYS.lists() });
      toast.success("Speaker added successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add speaker");
    },
  });
}

export function useUpdateSpeaker() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSpeakerDto }) =>
      SpeakerService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: SPEAKER_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: SPEAKER_KEYS.detail(data.id) });
      toast.success("Speaker updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update speaker");
    },
  });
}

export function useDeleteSpeaker() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => SpeakerService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SPEAKER_KEYS.lists() });
      toast.success("Speaker deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete speaker");
    },
  });
}
