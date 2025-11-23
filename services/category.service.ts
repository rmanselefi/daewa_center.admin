import api from "@/lib/api";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  lectureCount?: number;
  totalViews?: string;
  status?: "Active" | "Inactive";
  createdAt?: string;
  updatedAt?: string;
};

export type CreateCategoryDto = {
  name: string;
  slug: string;
  description?: string;
  color?: string;
};

export type UpdateCategoryDto = Partial<CreateCategoryDto>;

export const CategoryService = {
  async getAll() {
    const response = await api.get<Category[]>("/api/category");
    return response.data;
  },

  async getById(id: string) {
    const response = await api.get<Category>(`/api/category/${id}`);
    return response.data;
  },

  async create(data: CreateCategoryDto) {
    const response = await api.post<Category>("/api/category", data);
    return response.data;
  },

  async update(id: string, data: UpdateCategoryDto) {
    const response = await api.patch<Category>(`/api/category/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/api/category/${id}`);
    return response.data;
  },
};
