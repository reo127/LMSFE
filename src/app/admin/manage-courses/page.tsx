import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function ManageCoursesPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Manage Courses</CardTitle>
            <CardDescription>
                Here you can edit, delete, and manage all existing courses.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Course management functionality will be implemented here.</p>
        </CardContent>
    </Card>
  );
}
