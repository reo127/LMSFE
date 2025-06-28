export interface Lesson {
  id: string;
  title: string;
  duration: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  progress: number;
  imageUrl: string;
  imageHint: string;
  modules: Module[];
  resources: { name: string; url: string }[];
}

export const courses: Course[] = [
  {
    id: 'nextjs-fundamentals',
    title: 'Next.js 14 Fundamentals',
    description: 'Master the basics of Next.js and build modern web applications.',
    longDescription: 'This course provides a comprehensive introduction to Next.js 14. You will learn about the App Router, Server Components, data fetching, and more. By the end, you will have the skills to build fast, scalable, and SEO-friendly web applications.',
    progress: 65,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'web development',
    modules: [
      {
        id: 'module-1',
        title: 'Introduction to Next.js',
        lessons: [
          { id: 'l1-1', title: 'What is Next.js?', duration: '8:42' },
          { id: 'l1-2', title: 'Setting up your environment', duration: '12:15' },
          { id: 'l1-3', title: 'Pages and Routing', duration: '15:30' },
        ],
      },
      {
        id: 'module-2',
        title: 'Styling and Components',
        lessons: [
          { id: 'l2-1', title: 'CSS Modules', duration: '10:05' },
          { id: 'l2-2', title: 'Using Tailwind CSS', duration: '14:20' },
          { id: 'l2-3', title: 'Building Reusable Components', duration: '18:55' },
        ],
      },
      {
        id: 'module-3',
        title: 'Data Fetching',
        lessons: [
          { id: 'l3-1', title: 'Server Components vs. Client Components', duration: '20:10' },
          { id: 'l3-2', title: 'Fetching data with fetch()', duration: '11:45' },
          { id: 'l3-3', title: 'Server Actions', duration: '16:00' },
        ],
      },
    ],
    resources: [
      { name: 'Course Slides (PDF)', url: '#' },
      { name: 'Project Source Code (ZIP)', url: '#' },
      { name: 'External Reading List', url: '#' },
    ],
  },
  {
    id: 'react-deep-dive',
    title: 'React Deep Dive',
    description: 'Go beyond the surface and understand the core concepts of React.',
    longDescription: 'In this advanced course, we explore React\'s reconciliation algorithm, hooks in-depth, state management patterns, and performance optimization techniques. This course is for developers who are already comfortable with React and want to become experts.',
    progress: 25,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'react javascript',
    modules: [
      {
        id: 'module-1',
        title: 'Advanced Hooks',
        lessons: [
          { id: 'l1-1', title: 'useMemo and useCallback', duration: '15:00' },
          { id: 'l1-2', title: 'Custom Hooks', duration: '18:30' },
          { id: 'l1-3', title: 'useTransition and useDeferredValue', duration: '22:10' },
        ],
      },
      {
        id: 'module-2',
        title: 'State Management',
        lessons: [
          { id: 'l2-1', title: 'Context API at Scale', duration: '17:45' },
          { id: 'l2-2', title: 'Introduction to Zustand', duration: '13:20' },
        ],
      },
    ],
    resources: [
      { name: 'Official React Docs', url: '#' },
      { name: 'Sample Code Snippets', url: '#' },
    ],
  },
];

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}
