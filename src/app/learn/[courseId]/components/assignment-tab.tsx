"use client";

import type { Assignment } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp, Clock } from "lucide-react";

interface AssignmentTabProps {
    assignments: Assignment[];
}

export default function AssignmentTab({ assignments }: AssignmentTabProps) {
    if (!assignments || assignments.length === 0) {
        return (
            <div className="text-center text-muted-foreground py-10">
                <p>No assignments for this course yet. Check back later!</p>
            </div>
        );
    }
    
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold">Assignments</h3>
            <div className="space-y-4">
                {assignments.map((assignment) => (
                    <Card key={assignment.id}>
                        <CardHeader>
                            <CardTitle>{assignment.title}</CardTitle>
                            <CardDescription className="flex items-center pt-1">
                                <Clock className="w-4 h-4 mr-2" />
                                Due: {assignment.dueDate}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{assignment.description}</p>
                        </CardContent>
                        <CardFooter>
                            <Button>
                                <FileUp className="w-4 h-4 mr-2" />
                                Submit Assignment
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
