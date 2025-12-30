import api from "@/lib/api";

export type Course = {
  id: string;
  title: string;
  description?: string;
  speakerId?: string;
  categoryId?: string;
  thumbnail?: string;
  status: "Published" | "Draft" | "Archived";
  lessonsCount?: number;
  createdAt?: string;
  updatedAt?: string;
  speaker?: {
    id: string;
    name: string;
  };
  category?: {
    id: string;
    name: string;
  };
  lessons?: Lesson[];
};

export type Lesson = {
  id: string;
  lessonTitle: string;
  duration?: string;
  orderIndex: number;
  courseId: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateCourseDto = {
  title: string;
  description?: string;
  speakerId: string;
  categoryId: string;
  thumbnail?: File;
  status?: "Published" | "Draft" | "Archived";
};

export type UpdateCourseDto = Partial<Omit<CreateCourseDto, "thumbnail">> & {
  thumbnail?: File;
  status?: "Published" | "Draft" | "Archived";
};

export const CourseService = {
  async getAll() {
    const response = await api.get<Course[]>("/api/v1/course");
    return response.data;
  },

  async getById(id: string) {
    const response = await api.get<Course>(`/api/v1/course/${id}`);
    return response.data;
  },

  async create(data: CreateCourseDto) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("speakerId", data.speakerId);
    formData.append("categoryId", data.categoryId);
    if (data.description) formData.append("description", data.description);
    if (data.thumbnail) formData.append("thumbnail", data.thumbnail);
    if (data.status) formData.append("status", data.status);

    const response = await api.post<Course>("/api/v1/course", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async update(id: string, data: UpdateCourseDto) {
    const formData = new FormData();
    if (data.title) formData.append("title", data.title);
    if (data.speakerId) formData.append("speakerId", data.speakerId);
    if (data.categoryId) formData.append("categoryId", data.categoryId);
    if (data.description !== undefined) formData.append("description", data.description || "");
    if (data.thumbnail) formData.append("thumbnail", data.thumbnail);
    if (data.status) formData.append("status", data.status);

    const response = await api.patch<Course>(`/api/v1/course/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/api/v1/course/${id}`);
    return response.data;
  },
};
