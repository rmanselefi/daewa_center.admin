import api from "@/lib/api";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User" | "Moderator";
  status: "Active" | "Inactive" | "Suspended";
  joined?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateUserDto = {
  name: string;
  email: string;
  role: "Admin" | "User" | "Moderator";
  status: "Active" | "Inactive" | "Suspended";
  password?: string; // Optional for now, maybe required for creation
};

export type UpdateUserDto = Partial<CreateUserDto>;

export const UserService = {
  async getAll() {
    const response = await api.get<User[]>("/api/user");
    return response.data;
  },

  async getById(id: string) {
    const response = await api.get<User>(`/api/user/${id}`);
    return response.data;
  },

  async create(data: CreateUserDto) {
    const response = await api.post<User>("/api/user", data);
    return response.data;
  },

  async update(id: string, data: UpdateUserDto) {
    const response = await api.patch<User>(`/api/user/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/api/user/${id}`);
    return response.data;
  },
};
