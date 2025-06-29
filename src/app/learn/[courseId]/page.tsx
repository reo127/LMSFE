import { getCourseById } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import CoursePlayer from "./components/course-player";

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const course = getCourseById(params.courseId);

  if (!course) {
    notFound();
  }

  return <CoursePlayer course={course} />;
}
