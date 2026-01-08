import api from "@/lib/api";

export type Content = {
  id: string;
  title: string;
  speakerId?: string;
  categoryId?: string;
  description?: string;
  audioUrl: string;
  duration?: string | null;
  playCount?: number;
  isPublished?: boolean | null;
  status?: "Published" | "Draft" | "Archived";
  createdAt?: string;
  updatedAt?: string;
  isFeatured?: boolean;
  speaker?: {
    id: string;
    name: string;
    bio?: string;
    address?: string;
    image?: string | null;
  };
  category?: {
    id: string;
    name: string;
    slug?: string;
    description?: string;
    imageUrl?: string | null;
  };
};

export type ContentListResponse = {
  data: Content[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type ContentQueryParams = {
  search?: string;
  page?: number;
  limit?: number;
};

export type CreateContentDto = {
  title: string;
  speakerId: string;
  categoryId: string;
  description?: string;
  audioFile: File;
};

export type UpdateContentDto = Partial<Omit<CreateContentDto, "audioFile">> & {
  audioFile?: File;
  status?: "Published" | "Draft" | "Archived";
  isFeatured?: boolean;
};

export const ContentService = {
  async getAll(params?: ContentQueryParams) {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append("search", params.search);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    
    const queryString = queryParams.toString();
    const url = `/api/v1/content${queryString ? `?${queryString}` : ""}`;
    const response = await api.get<ContentListResponse>(url);
    
    return response.data;
  },

  async getById(id: string) {
    const response = await api.get<Content>(`/api/v1/content/${id}`);
    return response.data;
  },

  async create(data: CreateContentDto) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("speakerId", data.speakerId);
    formData.append("categoryId", data.categoryId);
    if (data.description) formData.append("description", data.description);
    formData.append("file", data.audioFile);

    const response = await api.post<Content>("/api/v1/content", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async update(id: string, data: UpdateContentDto) {
    // Check if we have a file to upload
    const hasFile = data.audioFile instanceof File;
    
    if (hasFile) {
      // Use FormData for file uploads
      const formData = new FormData();
      if (data.title) formData.append("title", data.title);
      if (data.speakerId) formData.append("speakerId", data.speakerId);
      if (data.categoryId) formData.append("categoryId", data.categoryId);
      if (data.description !== undefined) formData.append("description", data.description || "");
      if (data.status) formData.append("status", data.status);
      if (data.isFeatured !== undefined) formData.append("isFeatured", data.isFeatured.toString());
      if (data.audioFile) formData.append("file", data.audioFile);

      const response = await api.patch<Content>(`/api/v1/content/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } else {
      // Use regular JSON for non-file updates
      const response = await api.patch<Content>(`/api/v1/content/${id}`, data);
      return response.data;
    }
  },

  async delete(id: string) {
    const response = await api.delete(`/api/v1/content/${id}`);
    return response.data;
  },
};
