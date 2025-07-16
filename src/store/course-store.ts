
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface YoutubeCourseState {
  isLoading: boolean;
  error: string | null;
  addYoutubeCourse: (courseData: FormData, token: string) => Promise<void>;
}

export const useYoutubeCourseStore = create<YoutubeCourseState>()(
  devtools(
    (set) => ({
      isLoading: false,
      error: null,
      addYoutubeCourse: async (courseData, token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('http://localhost:5000/api/youtube-courses', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: courseData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to add course.');
          }

          set({ isLoading: false });
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
        }
      },
    }),
    { name: 'YoutubeCourseStore' }
  )
);
