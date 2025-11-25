import api from "@/lib/api";

export type Speaker = {
  id: string;
  name: string;
  email: string;
  bio?: string;
  address?: string;
  lecturesCount?: number;
  totalViews?: string;
  status: "Active" | "Inactive";
  createdAt?: string;
  updatedAt?: string;
};

export type CreateSpeakerDto = {
  name: string;
  email: string;
  bio?: string;
  address?: string;
};

export type UpdateSpeakerDto = Partial<CreateSpeakerDto> & {
  status?: "Active" | "Inactive";
};

export const SpeakerService = {
  async getAll() {
    const response = await api.get<Speaker[]>("/api/speaker");
    return response.data;
  },

  async getById(id: string) {
    const response = await api.get<Speaker>(`/api/speaker/${id}`);
    return response.data;
  },

  async create(data: CreateSpeakerDto) {
    const response = await api.post<Speaker>("/api/speaker", data);
    return response.data;
  },

  async update(id: string, data: UpdateSpeakerDto) {
    const response = await api.patch<Speaker>(`/api/speaker/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/api/speaker/${id}`);
    return response.data;
  },
};
