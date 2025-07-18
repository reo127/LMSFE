"use client"
import Image from "next/image";

import Link from "next/link";
import { useEffect, useState, use } from "react";
import { Check, ChevronRight, Star, User, Clock, BookOpen, BarChart } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import FloatingPurchaseCard from "./components/assignment-tab";

export default function CourseLandingPage({ params }: { params: { courseId: string } }) {
  const courseId = use(params).courseId;
  const [course, setCourse] = useState(null);

  const fetchCourseById = async () => {
    const res = await fetch(`http://localhost:8000/api/youtube-courses/get-courses/${courseId}`);
    const course = await res.json();
    setCourse(course.data);
  }

  useEffect(() => {
    fetchCourseById();
  }, []);

  if (!course) {
    return <div>Course not found</div>;
  }

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
                {course.topics.map((item: any, index: number) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-3 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructor */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Instructor</h2>
              <div className="flex items-start gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg text-primary">{course.instructor.name}</h3>
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
