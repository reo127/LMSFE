import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function AssignmentsPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Manage Assignments</CardTitle>
            <CardDescription>
                Here you can view, grade, and manage all course assignments.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Assignment management functionality will be implemented here.</p>
        </CardContent>
    </Card>
  );
}
