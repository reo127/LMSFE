// ManageCoursesPage.tsx – copy-paste ready
'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, PlusCircle } from 'lucide-react';
import { useForm } from "react-hook-form";
import { useFieldArray } from "react-hook-form";

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  level: string;
  category: string;
  topics: string[];
  videoUrl: string;
  thumbnail: string;
}

export default function ManageCoursesPage() {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  // react-hook-form setup
  const { register, control, handleSubmit, reset } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "topics",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/youtube-courses/get-courses', {
        headers: { Authorization: `Bearer ${session?.user?.token}` },
      });
      const data = await res.json();
      setCourses(data.data);
    } catch {
      alert('Failed to fetch courses');
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    reset({
      title: course.title,
      description: course.description,
      price: course.price,
      level: course.level,
      category: course.category,
      videoUrl: course.videoUrl,
      topics: course.topics.map(t => ({ value: t })),
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this course?')) return;
    try {
      await fetch(`http://localhost:8000/api/youtube-courses/delete/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session?.user?.token}` },
      });
      fetchCourses();
    } catch {
      alert('Failed to delete course');
    }
  };

  const onSubmit = async (data: any) => {
    if (!editingCourse) return;

    const fd = new FormData();
    fd.append('title', data.title);
    fd.append('description', data.description);
    fd.append('price', data.price);
    fd.append('level', data.level);
    fd.append('category', data.category);
    fd.append('videoUrl', data.videoUrl);
    data.topics.forEach((t: { value: string }) => fd.append('topics[]', t.value));
    if (thumbnail) fd.append('thumbnail', thumbnail);

    try {
      await fetch(`http://localhost:8000/api/youtube-courses/update/${editingCourse._id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${session?.user?.token}` },
        body: fd,
      });
      setIsEditDialogOpen(false);
      fetchCourses();
    } catch {
      alert('Failed to update course');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Courses</CardTitle>
        <CardDescription>Edit, delete, and manage all existing courses.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses?.map(c => (
              <TableRow key={c._id}>
                <TableCell>{c.title}</TableCell>
                <TableCell>{c.category}</TableCell>
                <TableCell>{c.level}</TableCell>
                <TableCell>${c.price}</TableCell>
                <TableCell>
                  <Button variant="outline" className="mr-2" onClick={() => handleEdit(c)}>Edit</Button>
                  <Button variant="destructive" onClick={() => handleDelete(c._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            )).reverse()}
          </TableBody>
        </Table>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Edit Course</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label>Title</label>
                <Input {...register('title')} />
              </div>
              <div>
                <label>Description</label>
                <Textarea {...register('description')} />
              </div>
              <div>
                <label>Price</label>
                <Input type="number" {...register('price', { valueAsNumber: true })} />
              </div>
              <div>
                <label>Level</label>
                <Select onValueChange={v => reset({ ...control._formValues, level: v })}>
                  <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label>Category</label>
                <Input {...register('category')} />
              </div>
              <div>
                <label>Video URL</label>
                <Input {...register('videoUrl')} />
              </div>
              <div>
                <label>Thumbnail</label>
                <Input type="file" accept="image/*" onChange={e => setThumbnail(e.target.files?.[0] || null)} />
              </div>

              {/* Course Topics Card */}
              <Card>
                <CardHeader><CardTitle>Course Topics</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {fields.map((f, idx) => (
                      <div key={f.id} className="flex items-center gap-2">
                        <Input {...register(`topics.${idx}.value`)} placeholder={`Topic ${idx + 1}`} />
                        {fields.length > 1 && (
                          <Button type="button" variant="destructive" size="icon" onClick={() => remove(idx)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => append({ value: '' })}>
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Topic
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" className="w-full">Update Course</Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}