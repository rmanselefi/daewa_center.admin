import api from "@/lib/api";

export type User = {
  id: string;
  fullname: string;
  email: string;
  role: "Admin" | "User";
  status: "Active" | "Inactive" | "Suspended";
  joined?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateUserDto = {
  fullname: string;
  email: string;
  role: "Admin" | "User";
  password: string;
  phone?: string;
};

export type UpdateUserDto = Partial<CreateUserDto> & {
  status?: "Active" | "Inactive" | "Suspended";
};

export const UserService = {
  async getAll() {
    const response = await api.get<User[]>("/api/v1/user");
    return response.data;
  },

  async getById(id: string) {
    const response = await api.get<User>(`/api/v1/user/${id}`);
    return response.data;
  },

  async create(data: CreateUserDto) {
    const response = await api.post<User>("/api/v1/user", data);
    return response.data;
  },

  async update(id: string, data: UpdateUserDto) {
    const response = await api.patch<User>(`/api/v1/user/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/api/v1/user/${id}`);
    return response.data;
  },
};
