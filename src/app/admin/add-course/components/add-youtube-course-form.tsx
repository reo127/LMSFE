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
import { PlusCircle, Trash2, UploadCloud } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Toast } from "radix-ui";

const youtubeCourseSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters.").max(100),
  description: z.string().min(10, "Description must be at least 10 characters.").max(2000),
  price: z.coerce.number().min(0, "Price must be a positive number."),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  category: z.string().min(1, "Category is required."),
  topics: z.array(z.object({ value: z.string().min(1, "Topic cannot be empty.") })).min(1, "At least one topic is required."),
  thumbnail: z.any().refine(file => file instanceof File, "Thumbnail is required."),
  videoUrl: z.string().url("Please enter a valid YouTube playlist URL."),
});

type YoutubeCourseFormValues = z.infer<typeof youtubeCourseSchema>;

// Fixed: Ensure all fields have consistent default values
const defaultValues: YoutubeCourseFormValues = {
  title: "",
  description: "",
  price: 0,
  level: 'beginner',
  category: "",
  topics: [{ value: "" }],
  thumbnail: null, 
  videoUrl: "",
};

export default function AddYoutubeCourseForm() {
    const { toast } = useToast();
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    const form = useForm<YoutubeCourseFormValues>({
        resolver: zodResolver(youtubeCourseSchema),
        defaultValues,
        mode: "onChange",
    });

    const { fields, append, remove } = useFieldArray({
        name: "topics",
        control: form.control,
    });

    const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            form.setValue("thumbnail", file, { shouldValidate: true });
            setFileName(file.name);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("thumbnail", file, { shouldValidate: true });
            setFileName(file.name);
        }
    };

    async function onSubmit(data: YoutubeCourseFormValues) {
        const session = await getSession();
        
        // Check if user is authenticated
        if (!session?.user?.token) {
            toast({
                title: "Authentication Required",
                description: "Please log in to add a course.",
                variant: "destructive",
            });
            return;
        }
    
        try {
            // Create FormData object
            const formData = new FormData();
            
            // Add basic fields
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('price', data.price.toString());
            formData.append('level', data.level);
            formData.append('category', data.category);
            formData.append('videoUrl', data.videoUrl);
            
            // Add topics as separate form entries
            data.topics.forEach(topic => {
                formData.append('topics[]', topic.value);
            });
            
            // Add thumbnail file
            if (data.thumbnail instanceof File) {
                formData.append('thumbnail', data.thumbnail);
            }
            
            // Add duration (you might want to make this configurable)
            formData.append('duration', '120');
    
            // Make API call
            const response = await fetch('http://localhost:8000/api/youtube-courses/add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session?.user?.token || ''}`, 
                },
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
            
            toast({
                title: "YouTube Course Submitted!",
                description: "The new course has been successfully added.",
            });
            
            // Fixed: Reset with explicit values to prevent undefined state
            form.reset(defaultValues);
            setFileName(null);
            
        } catch (error) {
            console.error('Error submitting course:', error);
            toast({
                title: "Error",
                description: "Failed to submit the course. Please try again.",
                variant: "destructive",
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardHeader><CardTitle>YouTube Course Details</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <FormField control={form.control} name="videoUrl" render={({ field }) => (
                            <FormItem>
                                <FormLabel>YouTube Playlist URL</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="https://www.youtube.com/playlist?list=PL..." 
                                        {...field} 
                                        value={field.value || ""} // Ensure value is never undefined
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="e.g. Advanced TypeScript" 
                                        {...field} 
                                        value={field.value || ""} // Ensure value is never undefined
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea 
                                        rows={4} 
                                        placeholder="A detailed summary of what the course covers." 
                                        {...field} 
                                        value={field.value || ""} // Ensure value is never undefined
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="price" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="number" 
                                            placeholder="0.00" 
                                            {...field} 
                                            value={field.value || 0} // Ensure value is never undefined
                                            disabled 
                                        />
                                    </FormControl>
                                    <FormDescription>YouTube courses are free.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="level" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Level</FormLabel>
                                    <Select 
                                        onValueChange={field.onChange} 
                                        value={field.value || "beginner"} // Ensure value is never undefined
                                    >
                                        <FormControl><SelectTrigger><SelectValue placeholder="Select a level" /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="beginner">Beginner</SelectItem>
                                            <SelectItem value="intermediate">Intermediate</SelectItem>
                                            <SelectItem value="advanced">Advanced</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        <FormField control={form.control} name="category" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="e.g. Programming" 
                                        {...field} 
                                        value={field.value || ""} // Ensure value is never undefined
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Course Topics</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {fields.map((field, index) => (
                                <FormField
                                    control={form.control}
                                    key={field.id}
                                    name={`topics.${index}.value`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className={cn(index !== 0 && "sr-only")}>Topics</FormLabel>
                                            <div className="flex items-center gap-2">
                                                <FormControl>
                                                    <Input 
                                                        {...field} 
                                                        placeholder={`Topic ${index + 1}`}
                                                        value={field.value || ""} // Ensure value is never undefined
                                                    />
                                                </FormControl>
                                                {fields.length > 1 && (
                                                    <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Remove topic</span>
                                                    </Button>
                                                )}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => append({ value: "" })}>
                                <PlusCircle className="h-4 w-4 mr-2" /> Add Topic
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Thumbnail</CardTitle></CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="thumbnail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        className={cn(
                                            "flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted transition-colors",
                                            isDragging && "border-primary bg-muted"
                                        )}
                                        onDragEnter={handleDragEnter}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                    >
                                        <FormControl>
                                            <Input 
                                                type="file" 
                                                className="hidden" 
                                                accept="image/*" 
                                                onChange={handleFileChange}
                                                // Don't spread field props for file input
                                            />
                                        </FormControl>
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                                            <p className="mb-2 text-sm text-muted-foreground">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </FormLabel>
                                    {fileName && <p className="text-sm mt-2 text-muted-foreground">Selected file: {fileName}</p>}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Adding Course..." : "Add YouTube Course"}
                </Button>
            </form>
        </Form>
    );
}