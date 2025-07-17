
import {create} from 'zustand';
import axios from 'axios';

type Course = {
  title: string;
  description: string;
  instructor: string;
  price: number;
  duration: number;
  level: string;
  category: string;
  topics: string[];
  thumbnail: string;
  videoUrl: string;
};

type CourseStore = {
  courses: Course[];
  addCourse: (course: Course) => Promise<void>;
};

export const useYoutubeCourseStore = create<CourseStore>((set) => ({
  courses: [],
  addCourse: async (course) => {
    try {
      const response = await axios.post('/api/youtube-courses', course);
      set((state) => ({
        courses: [...state.courses, response.data],
      }));
    } catch (error) {
      console.error('Failed to add course:', error);
    }
  },
}));
