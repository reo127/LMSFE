import Link from 'next/link';
import Image from 'next/image';
import { courses } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
        <p className="text-muted-foreground">Here are your courses in progress. Keep learning!</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader className="p-0">
              <Image
                src={course.imageUrl}
                alt={course.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
                data-ai-hint={course.imageHint}
              />
            </CardHeader>
            <CardContent className="flex-1 p-6">
              <CardTitle className="mb-2">{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4 p-6 pt-0">
              <div className="w-full">
                <p className="text-sm text-muted-foreground mb-2">{course.progress}% complete</p>
                <Progress value={course.progress} aria-label={`${course.progress}% complete`} />
              </div>
              <Button asChild className="w-full">
                <Link href={`/courses/${course.id}`}>
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Continue Learning
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
