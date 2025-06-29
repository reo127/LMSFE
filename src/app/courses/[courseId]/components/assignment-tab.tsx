"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Course } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Check } from "lucide-react";

interface FloatingPurchaseCardProps {
  course: Course;
  isMobile?: boolean;
}

export default function FloatingPurchaseCard({ course, isMobile = false }: FloatingPurchaseCardProps) {

  if (isMobile) {
    return (
       <div className="flex justify-between items-center w-full gap-4">
            <div className="text-2xl font-bold text-primary">
                {course.price === 0 ? 'Free' : `$${course.price}`}
            </div>
            <Button className="flex-grow" asChild>
                <Link href={`/learn/${course.id}`}>Enroll Now</Link>
            </Button>
       </div>
    );
  }
  
  return (
    <Card className="sticky top-24 shadow-lg">
      <CardHeader className="p-0">
        <Image
          src={course.imageUrl}
          alt={course.title}
          width={600}
          height={400}
          className="w-full h-auto object-cover rounded-t-lg"
          data-ai-hint={course.imageHint}
        />
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">
                {course.price === 0 ? 'Free' : `$${course.price}`}
            </span>
            {course.price > 0 && <span className="text-lg text-muted-foreground line-through">${(course.price * 1.5).toFixed(2)}</span>}
        </div>
        
        <Button size="lg" className="w-full" asChild>
            <Link href={`/learn/${course.id}`}>Enroll Now</Link>
        </Button>
        <Button size="lg" variant="outline" className="w-full">
            Add to Cart
        </Button>
        <p className="text-center text-xs text-muted-foreground">30-Day Money-Back Guarantee</p>
        
        <div className="space-y-2 pt-4">
            <h4 className="font-semibold">This course includes:</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> On-demand video</li>
                <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Assignments</li>
                <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Certificate of completion</li>
            </ul>
        </div>
      </CardContent>
    </Card>
  );
}
