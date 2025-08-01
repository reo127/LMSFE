"use client";

import { useState, useEffect } from 'react';
import type { Course, Lesson } from "@/lib/mock-data";
import ReactPlayer from 'react-player';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, CheckCircle2, Circle, Download, FileText, HelpCircle, MessageSquare, NotebookText, ClipboardCheck } from "lucide-react";
import NotesTab from './notes-tab';
import {
  AlertDialog,
  AlertDialogAction,
 AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import CertificateView from './certificate-view';
import DoubtsTab from './doubts-tab';
import FeedbackTab from './feedback-tab';
import AssignmentTab from './assignment-tab';
import { fetchYoutubePlaylist } from '@/lib/helper';

export default function CoursePlayer({ course }: { course: Course }) {
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [playlist, setPlaylist] = useState<Lesson[]>([]);

  useEffect(() => {
    fetchYoutubePlaylist("PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige").then((data) => {
      setPlaylist(data);
      if (data.length > 0) {
        setActiveLesson(data[0]);
      }
    }).catch((error) => {
      console.error("Error fetching playlist:", error);
    });
  }, []);

  console.log("active lession: ",activeLesson);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Video Player */}
          <Card className="overflow-hidden shadow-lg">
            <div className="aspect-video bg-muted flex items-center justify-center">
              {activeLesson?.videoId ? (
                <ReactPlayer
                  src={`https://www.youtube.com/watch?v=${activeLesson.videoId}`}
                  controls={true}
                  width="100%"
                  height="100%"
                  playing={false}
                  config={{
                    youtube: {
                      playerVars: {
                        showinfo: 1,
                        origin: window.location.origin
                      }
                    } as any
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">Loading playlist...</p>
                </div>
              )}
            </div>
          </Card>

          {/* Rest of the tabs section */}
          <Tabs defaultValue="overview" className="mt-6">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="resources"><FileText className="w-4 h-4 mr-1.5 hidden sm:inline-block" />Resources</TabsTrigger>
              <TabsTrigger value="notes"><NotebookText className="w-4 h-4 mr-1.5 hidden sm:inline-block" />Notes</TabsTrigger>
              <TabsTrigger value="doubts"><HelpCircle className="w-4 h-4 mr-1.5 hidden sm:inline-block" />Doubts</TabsTrigger>
              <TabsTrigger value="assignments"><ClipboardCheck className="w-4 h-4 mr-1.5 hidden sm:inline-block" />Assignments</TabsTrigger>
              <TabsTrigger value="feedback"><MessageSquare className="w-4 h-4 mr-1.5 hidden sm:inline-block" />Feedback</TabsTrigger>
            </TabsList>
            <Card className="mt-2">
              <CardContent className="p-6">
                <TabsContent value="overview">
                  <h3 className="text-xl font-semibold mb-2">About this course</h3>
                  <p className="text-muted-foreground">{course.longDescription}</p>
                </TabsContent>
                <TabsContent value="resources">
                  <h3 className="text-xl font-semibold mb-4">Downloads</h3>
                  <ul className="space-y-3">
                    {course.resources.map(resource => (
                      <li key={resource.name}>
                        <a href={resource.url} className="flex items-center text-primary hover:underline">
                          <Download className="w-4 h-4 mr-2" />
                          {resource.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="notes">
                  <NotesTab />
                </TabsContent>
                <TabsContent value="doubts">
                  <DoubtsTab />
                </TabsContent>
                <TabsContent value="assignments">
                  <AssignmentTab assignments={course.assignments} />
                </TabsContent>
                <TabsContent value="feedback">
                  <FeedbackTab />
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>

        </div>
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
              <div className="w-full">
                <h3 className="text-lg font-semibold mb-2">Playlist Videos</h3>
                <ul className="space-y-1">
                  {playlist.map((lesson) => (
                    <li key={lesson.id}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start h-auto py-2 px-3 text-left ${activeLesson?.id === lesson.id ? 'bg-primary/10 text-primary' : ''}`}
                        onClick={() => setActiveLesson(lesson)}
                      >
                        {activeLesson?.id === lesson.id ? (
                          <CheckCircle2 className="w-4 h-4 mr-3 text-primary" />
                        ) : (
                          <Circle className="w-4 h-4 mr-3 text-muted-foreground" />
                        )}
                        <span className="flex-1 whitespace-normal">{lesson.title}</span>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
          
          {/* Completion card */}
          <Card>
            <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold">Course Completion</h3>
                {!isCompleted ? (
                    <Button className="w-full" onClick={() => setIsCompleted(true)}>Mark as Complete</Button>
                ) : (
                    <div className="text-center p-4 bg-green-100 dark:bg-green-900/50 rounded-md">
                        <p className="font-semibold text-green-700 dark:text-green-300">Congratulations! You've completed the course.</p>
                    </div>
                )}
                
                {isCompleted && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Award className="w-4 h-4 mr-2" />
                          View Certificate
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="max-w-3xl">
                        <CertificateView courseName={course.title} studentName="Alex Doe" />
                        <AlertDialogFooter>
                           <AlertDialogCancel>Close</AlertDialogCancel>
                           <AlertDialogAction onClick={() => window.print()}>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                           </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                )}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
