"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const courseSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters long." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long." }),
  longDescription: z.string().min(20, { message: "Long description must be at least 20 characters long." }),
  category: z.string().min(1, { message: "Category is required." }),
  price: z.coerce.number().min(0, { message: "Price must be a positive number." }),
  targetAudience: z.enum(['Students', 'Professionals']),
  instructorName: z.string().min(1, { message: "Instructor name is required." }),
  instructorTitle: z.string().min(1, { message: "Instructor title is required." }),
  instructorBio: z.string().min(10, { message: "Instructor bio must be at least 10 characters long." }),
  whatYoullLearn: z.array(z.object({ value: z.string().min(1, "Learning objective cannot be empty") })).min(1, "At least one learning objective is required."),
  imageUrl: z.string().url({ message: "Please enter a valid image URL." }),
  imageHint: z.string().min(1, { message: "Image hint is required." }),
  instructorAvatarUrl: z.string().url({ message: "Please enter a valid avatar URL." }),
});

type CourseFormValues = z.infer<typeof courseSchema>;

const defaultValues: Partial<CourseFormValues> = {
  price: 0,
  targetAudience: "Students",
  whatYoullLearn: [{ value: "" }],
};

export default function AddCourseForm() {
    const { toast } = useToast();
    const form = useForm<CourseFormValues>({
        resolver: zodResolver(courseSchema),
        defaultValues,
        mode: "onChange",
    });

    const { fields, append, remove } = useFieldArray({
        name: "whatYoullLearn",
        control: form.control,
    });

    function onSubmit(data: CourseFormValues) {
        console.log("New course data:", data);
        toast({
          title: "Course Submitted!",
          description: "The new course has been successfully added.",
        });
        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardHeader><CardTitle>Course Details</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl><Input placeholder="e.g. Next.js 14 Fundamentals" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Short Description</FormLabel>
                                <FormControl><Textarea placeholder="A brief summary of the course." {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="longDescription" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Long Description</FormLabel>
                                <FormControl><Textarea rows={5} placeholder="A detailed description of the course content." {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="category" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl><Input placeholder="e.g. Web Development" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="price" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl><Input type="number" placeholder="49.99" {...field} /></FormControl>
                                    <FormDescription>Enter 0 for a free course.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                         <FormField control={form.control} name="targetAudience" render={({ field }) => (
                             <FormItem>
                                <FormLabel>Target Audience</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select a target audience" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="Students">Students</SelectItem>
                                        <SelectItem value="Professionals">Professionals</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Learning Objectives</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {fields.map((field, index) => (
                                <FormField
                                    control={form.control}
                                    key={field.id}
                                    name={`whatYoullLearn.${index}.value`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className={cn(index !== 0 && "sr-only")}>What you'll learn</FormLabel>
                                            <div className="flex items-center gap-2">
                                                <FormControl><Input {...field} placeholder={`Learning objective ${index + 1}`} /></FormControl>
                                                {fields.length > 1 && (
                                                    <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Remove objective</span>
                                                    </Button>
                                                )}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => append({ value: "" })}>
                                <PlusCircle className="h-4 w-4 mr-2" /> Add Objective
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Instructor Details</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <FormField control={form.control} name="instructorName" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Instructor Name</FormLabel>
                                <FormControl><Input placeholder="e.g. Jane Smith" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="instructorTitle" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Instructor Title</FormLabel>
                                <FormControl><Input placeholder="e.g. Senior Frontend Engineer" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="instructorBio" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Instructor Bio</FormLabel>
                                <FormControl><Textarea placeholder="A short bio about the instructor." {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Media</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <FormField control={form.control} name="imageUrl" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course Image URL</FormLabel>
                                <FormControl><Input placeholder="https://placehold.co/600x400.png" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="imageHint" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image Hint</FormLabel>
                                <FormControl><Input placeholder="e.g. 'web development'" {...field} /></FormControl>
                                <FormDescription>One or two keywords for AI image search.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="instructorAvatarUrl" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Instructor Avatar URL</FormLabel>
                                <FormControl><Input placeholder="https://placehold.co/100x100.png" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </CardContent>
                </Card>

                <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Adding Course..." : "Add Course"}
                </Button>
            </form>
        </Form>
    );
}