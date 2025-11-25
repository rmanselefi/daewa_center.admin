import api from "@/lib/api";

export type Content = {
  id: string;
  title: string;
  speakerId: string;
  categoryId: string;
  description?: string;
  audioUrl: string;
  duration?: string;
  views?: number;
  status: "Published" | "Draft" | "Archived";
  createdAt?: string;
  updatedAt?: string;
  speaker?: {
    name: string;
  };
  category?: {
    name: string;
  };
};

export type CreateContentDto = {
  title: string;
  speakerId: string;
  categoryId: string;
  description?: string;
  audioFile: File;
};

export type UpdateContentDto = Partial<Omit<CreateContentDto, "audioFile">> & {
  status?: "Published" | "Draft" | "Archived";
};

export const ContentService = {
  async getAll() {
    const response = await api.get<Content[]>("/api/content");
    return response.data;
  },

  async getById(id: string) {
    const response = await api.get<Content>(`/api/content/${id}`);
    return response.data;
  },

  async create(data: CreateContentDto) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("speakerId", data.speakerId);
    formData.append("categoryId", data.categoryId);
    if (data.description) formData.append("description", data.description);
    formData.append("file", data.audioFile);

    const response = await api.post<Content>("/api/content", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async update(id: string, data: UpdateContentDto) {
    const response = await api.patch<Content>(`/api/content/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/api/content/${id}`);
    return response.data;
  },
};
