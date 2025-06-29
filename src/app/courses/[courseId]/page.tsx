import { getCourseById } from "@/lib/mock-data";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight, Star, User, Clock, BookOpen, BarChart } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import FloatingPurchaseCard from "./components/assignment-tab";

export default function CourseLandingPage({ params }: { params: { courseId: string } }) {
  const course = getCourseById(params.courseId);

  if (!course) {
  }
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const totalDuration = course.modules.reduce((acc, module) => {
    return acc + module.lessons.reduce((lessonAcc, lesson) => {
      const parts = lesson.duration.split(':');
      return lessonAcc + (parseInt(parts[0], 10) * 60) + parseInt(parts[1], 10);
    }, 0);
  }, 0);
  const totalHours = Math.floor(totalDuration / 3600);
  const totalMinutes = Math.floor((totalDuration % 3600) / 60);

  return (
    <>
      <div className="bg-primary/5">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <nav className="text-sm mb-4">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <Link href="/courses" className="text-primary hover:underline">Courses</Link>
                  <ChevronRight className="h-4 w-4 mx-1" />
                </li>
                <li className="flex items-center text-muted-foreground">
                  <span>{course.category}</span>
                </li>
              </ol>
            </nav>
            <h1 className="text-4xl font-bold tracking-tight">{course.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{course.description}</p>
            <div className="mt-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                    <span className="font-bold text-yellow-600">{course.rating}</span>
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                </div>
                <span>({course.reviewsCount.toLocaleString()} ratings)</span>
                <span>Created by {course.instructor.name}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* What you'll learn */}
            <div className="border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                {course.whatYoullLearn.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-3 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Course content */}
            <div>
                <h2 className="text-2xl font-bold mb-2">Course content</h2>
                <p className="text-sm text-muted-foreground mb-4">
                    {course.modules.length} modules &middot; {totalLessons} lessons &middot; {totalHours}h {totalMinutes}m total length
                </p>
                <Accordion type="single" collapsible className="w-full border rounded-lg">
                    {course.modules.map(module => (
                        <AccordionItem value={module.id} key={module.id}>
                            <AccordionTrigger className="px-6 hover:no-underline font-semibold bg-muted/50">{module.title}</AccordionTrigger>
                            <AccordionContent className="p-0">
                                <ul className="divide-y">
                                    {module.lessons.map(lesson => (
                                        <li key={lesson.id} className="flex justify-between items-center p-4 px-6">
                                            <span className="flex items-center">
                                                <BookOpen className="h-4 w-4 mr-3 text-muted-foreground" />
                                                {lesson.title}
                                            </span>
                                            <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            {/* Instructor */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Instructor</h2>
              <div className="flex items-start gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={course.instructor.avatarUrl} data-ai-hint="instructor photo" />
                  <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg text-primary">{course.instructor.name}</h3>
                  <p className="text-muted-foreground">{course.instructor.title}</p>
                  <p className="mt-2">{course.instructor.bio}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
             <div className="hidden lg:block">
                <FloatingPurchaseCard course={course} />
             </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t p-2 z-10">
          <FloatingPurchaseCard course={course} isMobile={true} />
      </div>
    </>
  );
}
