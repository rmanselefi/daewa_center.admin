import api from "@/lib/api";

export type UserResponse = {
  user?: {
    id: string;
    email?: string | null;
    displayName?: string | null;
    photoURL?: string | null;
    profile?: Record<string, unknown> | null;
  };
};

export const AuthService = {
  async login(email: string, password: string) {
    const response = await api.post(
      "/api/v1/auth/admin-login",
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  },

  async LogOut() {
    const response = await api.post("/api/v1/auth/logout");
    return response.data;
  },

  async getUserMe(): Promise<UserResponse> {
    const response = await api.get("/api/v1/auth/me");
    return response.data;
  },

  async registerWithEmailAndPassword(email: string, password: string) {
    const response = await api.post("/api/v1/auth/register", { email, password });
    return response.data;
  },
};
