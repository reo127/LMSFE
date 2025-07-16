import AddCourseForm from './components/add-course-form';
import AddYoutubeCourseForm from './components/add-youtube-course-form';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function AddCoursePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Add New Course</h1>
      <Tabs defaultValue="regular">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="regular" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Regular Course</TabsTrigger>
          <TabsTrigger value="community" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Community Course (YouTube)</TabsTrigger>
        </TabsList>
        <TabsContent value="regular">
          <AddCourseForm />
        </TabsContent>
        <TabsContent value="community">
          <AddYoutubeCourseForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
