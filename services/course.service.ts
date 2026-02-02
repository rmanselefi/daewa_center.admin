import api from "@/lib/api";

export type Course = {
  id: string;
  title: string;
  description?: string;
  speakerId?: string;
  categoryId?: string;
  thumbnail?: string;
  status: "Published" | "Draft" | "Archived";
  isPublished?: boolean;
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
  isPublished?: boolean;
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
    // API accepts JSON: { title?, description?, isPublished?, status?, speakerId?, categoryId? }
    const body: Record<string, string | boolean> = {};
    if (data.title !== undefined) body.title = data.title;
    if (data.description !== undefined) body.description = data.description ?? "";
    if (data.isPublished !== undefined) body.isPublished = data.isPublished;
    if (data.status !== undefined) body.status = data.status;
    if (data.speakerId !== undefined) body.speakerId = data.speakerId;
    if (data.categoryId !== undefined) body.categoryId = data.categoryId;

    const response = await api.patch<Course>(`/api/v1/course/${id}`, body);
    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/api/v1/course/${id}`);
    return response.data;
  },
};
