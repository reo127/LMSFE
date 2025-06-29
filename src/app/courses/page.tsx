"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { courses, type Course } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Star } from 'lucide-react';
import { Label } from '@/components/ui/label';

const uniqueCategories = Array.from(new Set(courses.map(course => course.category)));

export default function CoursesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [price, setPrice] = useState('all');
    const [audience, setAudience] = useState('all');

    const filteredCourses = useMemo(() => {
        return courses.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || course.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = category === 'all' || course.category === category;
            const matchesPrice = price === 'all' || (price === 'free' && course.price === 0) || (price === 'paid' && course.price > 0);
            const matchesAudience = audience === 'all' || course.targetAudience === audience;
            return matchesSearch && matchesCategory && matchesPrice && matchesAudience;
        });
    }, [searchTerm, category, price, audience]);

    return (
        <div className="space-y-8">
            <div className="text-center py-10 bg-primary/10 rounded-lg">
                <h1 className="text-4xl font-bold tracking-tight text-primary">Explore Our Courses</h1>
                <p className="text-muted-foreground mt-2">Find the perfect course to boost your skills.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end p-4 border rounded-lg bg-card">
                <div className="md:col-span-4">
                    <Label htmlFor="search">Search Courses</Label>
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            id="search"
                            type="text"
                            placeholder="Search for courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>
                <div>
                    <Label>Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger><SelectValue placeholder="All Categories" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {uniqueCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label>Price</Label>
                    <Select value={price} onValueChange={setPrice}>
                        <SelectTrigger><SelectValue placeholder="All Prices" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Prices</SelectItem>
                            <SelectItem value="free">Free</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label>Audience</Label>
                    <Select value={audience} onValueChange={setAudience}>
                        <SelectTrigger><SelectValue placeholder="All Audiences" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Audiences</SelectItem>
                            <SelectItem value="Students">Students</SelectItem>
                            <SelectItem value="Professionals">Professionals</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                        <Card key={course.id} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <CardHeader className="p-0 relative">
                                <Link href={`/courses/${course.id}`}>
                                    <Image
                                        src={course.imageUrl}
                                        alt={course.title}
                                        width={600}
                                        height={400}
                                        className="w-full h-48 object-cover"
                                        data-ai-hint={course.imageHint}
                                    />
                                </Link>
                                 <Badge className="absolute top-3 right-3">{course.category}</Badge>
                            </CardHeader>
                            <CardContent className="flex-1 p-6">
                                <CardTitle className="mb-2 leading-tight">
                                     <Link href={`/courses/${course.id}`} className="hover:text-primary">{course.title}</Link>
                                </CardTitle>
                                <CardDescription>{course.description}</CardDescription>
                                <div className="flex items-center mt-4 text-sm text-muted-foreground">
                                    <Star className="w-4 h-4 mr-1.5 text-yellow-500 fill-yellow-500" />
                                    <span>{course.rating}</span>
                                    <span className="mx-2">|</span>
                                    <span>{course.reviewsCount.toLocaleString()} reviews</span>
                                </div>
                            </CardContent>
                            <CardFooter className="p-6 pt-0 flex justify-between items-center">
                                <div className="text-2xl font-bold text-primary">
                                    {course.price === 0 ? 'Free' : `$${course.price}`}
                                </div>
                                <Button asChild>
                                    <Link href={`/courses/${course.id}`}>View Course</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <p className="md:col-span-4 text-center text-muted-foreground">No courses match your criteria.</p>
                )}
            </div>
        </div>
    );
}
