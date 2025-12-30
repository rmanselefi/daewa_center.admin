import api from "@/lib/api";

export type Lesson = {
  id: string;
  title: string;
  lessonTitle?: string;
  duration?: string;
  order: number;
  orderIndex: number;
  courseId: string;
  audioUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateLessonDto = {
  courseId: string;
  lessonTitle?: string;
  orderIndex: number;
  file: File;
};

export type UpdateLessonDto = {
  lessonTitle?: string;
  orderIndex?: number;
  file?: File;
};

export const LessonService = {
  async create(data: CreateLessonDto) {
    const formData = new FormData();
    formData.append("courseId", data.courseId);
    formData.append("orderIndex", data.orderIndex.toString());
    if (data.lessonTitle) formData.append("lessonTitle", data.lessonTitle);
    formData.append("file", data.file);

    const response = await api.post<Lesson>("/api/v1/course-lesson", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async update(id: string, data: UpdateLessonDto) {
    const formData = new FormData();
    if (data.lessonTitle !== undefined) formData.append("lessonTitle", data.lessonTitle || "");
    if (data.orderIndex !== undefined) formData.append("orderIndex", data.orderIndex.toString());
    if (data.file) formData.append("file", data.file);

    const response = await api.patch<Lesson>(`/api/v1/course-lesson/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/api/v1/course-lesson/${id}`);
    return response.data;
  },
};
