export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoId: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
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
  assignments: Assignment[];
  category: string;
  price: number;
  targetAudience: 'Students' | 'Professionals';
  instructor: {
    name: string;
    title: string;
    avatarUrl: string;
    bio: string;
  };
  whatYoullLearn: string[];
  rating: number;
  reviewsCount: number;
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
    category: 'Web Development',
    price: 49.99,
    targetAudience: 'Professionals',
    rating: 4.7,
    reviewsCount: 1250,
    whatYoullLearn: [
      'Build full-stack applications with Next.js 14',
      'Implement server and client components effectively',
      'Master the new App Router',
      'Optimize your application for performance and SEO',
    ],
    instructor: {
      name: 'Jane Smith',
      title: 'Senior Frontend Engineer',
      avatarUrl: 'https://placehold.co/100x100.png',
      bio: 'Jane is a seasoned frontend engineer with over a decade of experience building scalable web applications. She is passionate about React, Next.js, and sharing her knowledge with the community.',
    },
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
    assignments: [
      {
        id: 'assignment-1',
        title: 'Build a Personal Blog',
        description: 'Create a personal blog using Next.js App Router. It should have at least 3 blog posts and a simple, clean design.',
        dueDate: '2 weeks from start',
      },
      {
        id: 'assignment-2',
        title: 'Deploy to Vercel',
        description: 'Deploy your personal blog project to Vercel and submit the live URL.',
        dueDate: '3 weeks from start',
      },
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
    category: 'Web Development',
    price: 79.99,
    targetAudience: 'Professionals',
    rating: 4.9,
    reviewsCount: 2340,
    whatYoullLearn: [
      'Understand React\'s rendering behavior',
      'Create high-performance custom hooks',
      'Implement advanced state management solutions',
      'Debug and profile React applications effectively',
    ],
    instructor: {
      name: 'John Doe',
      title: 'Principal Software Architect',
      avatarUrl: 'https://placehold.co/100x100.png',
      bio: 'John has been working with React since its inception. He is a frequent conference speaker and a contributor to several open-source libraries in the React ecosystem.',
    },
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
    assignments: [
      {
        id: 'assignment-1',
        title: 'Create a Custom Hook',
        description: 'Build a custom hook for fetching and caching data. Demonstrate its use in a simple component.',
        dueDate: '1 week from start',
      },
    ],
  },
  {
    id: 'typescript-mastery',
    title: 'TypeScript Mastery',
    description: 'From fundamentals to advanced patterns, become a TypeScript expert.',
    longDescription: 'This course covers everything you need to know to use TypeScript effectively in your projects. We start with the basics of types and gradually move to advanced topics like generics, decorators, and type manipulation.',
    progress: 0,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'typescript code',
    category: 'Programming',
    price: 0,
    targetAudience: 'Students',
    rating: 4.8,
    reviewsCount: 5800,
    whatYoullLearn: [
      'Write strongly-typed JavaScript code',
      'Leverage generics for reusable components',
      'Integrate TypeScript with React and Node.js',
      'Understand and use advanced type-level programming',
    ],
    instructor: {
      name: 'Alice Johnson',
      title: 'Developer Advocate',
      avatarUrl: 'https://placehold.co/100x100.png',
      bio: 'Alice is a Developer Advocate specializing in TypeScript and developer tooling. She is passionate about making programming more accessible and robust through static typing.',
    },
    modules: [
      {
        id: 'module-1',
        title: 'TypeScript Basics',
        lessons: [
          { id: 'l1-1', title: 'Introduction to Static Typing', duration: '10:00' },
          { id: 'l1-2', title: 'Basic Types', duration: '14:30' },
          { id: 'l1-3', title: 'Interfaces and Classes', duration: '20:10' },
        ],
      },
      {
        id: 'module-2',
        title: 'Advanced Topics',
        lessons: [
          { id: 'l2-1', title: 'Generics', duration: '19:00' },
          { id: 'l2-2', title: 'Decorators', duration: '16:45' },
        ],
      },
    ],
    resources: [
      { name: 'TypeScript Handbook', url: '#' },
      { name: 'Project Starter Files', url: '#' },
    ],
    assignments: [],
  },
];

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}
