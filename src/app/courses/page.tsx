"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Star } from 'lucide-react';
import { Label } from '@/components/ui/label';

export default function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [price, setPrice] = useState('all');
    const [level, setLevel] = useState('all');

    useEffect(() => {
        const fetchCourses = async () => {
            const res = await fetch('http://localhost:8000/api/youtube-courses/get-courses');
            const data = await res.json();
            if (data.success) {
                setCourses(data.data);
            }
        };
        fetchCourses();
    }, []);

    const uniqueCategories = useMemo(() => Array.from(new Set(courses.map((course: any) => course.category))), [courses]);
    const uniqueLevels = useMemo(() => Array.from(new Set(courses.map((course: any) => course.level))), [courses]);


    const filteredCourses = useMemo(() => {
        return courses.filter((course: any) => {
            const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || course.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = category === 'all' || course.category === category;
            const matchesPrice = price === 'all' || (price === 'free' && course.price === 0) || (price === 'paid' && course.price > 0);
            const matchesLevel = level === 'all' || course.level === level;
            return matchesSearch && matchesCategory && matchesPrice && matchesLevel;
        });
    }, [courses, searchTerm, category, price, level]);

    return (
        <div className="space-y-8">
            <div className="text-center py-10 bg-primary/10 rounded-lg">
                <h1 className="text-4xl font-bold tracking-tight text-primary">Explore Our Courses</h1>
                <p className="text-muted-foreground mt-2">Find the perfect course to boost your skills.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Filters</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
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
                                <Label>Level</Label>
                                <Select value={level} onValueChange={setLevel}>
                                    <SelectTrigger><SelectValue placeholder="All Levels" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Levels</SelectItem>
                                        {uniqueLevels.map(lvl => <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </aside>
                
                <div className="lg:col-span-3 space-y-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            id="search"
                            type="text"
                            placeholder="Search for courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-full"
                        />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map((course: any) => (
                                <Card key={course._id} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                                    <CardHeader className="p-0 relative">
                                        <Link href={`/courses/${course._id}`}>
                                            <Image
                                                src={course.thumbnail ? course.thumbnail : 'https://placehold.co/600x400.png'}
                                                alt={course.title}
                                                width={600}
                                                height={400}
                                                className="w-full h-48 object-cover"
                                            />
                                        </Link>
                                         <Badge className="absolute top-3 right-3">{course.category}</Badge>
                                    </CardHeader>
                                    <CardContent className="flex-1 p-6">
                                        <CardTitle className="mb-2 leading-tight">
                                             <Link href={`/courses/${course.id}`} className="hover:text-primary">{course.title}</Link>
                                        </CardTitle>
                                        <CardDescription>{course.description}</CardDescription>
                                    </CardContent>
                                    <CardFooter className="p-6 pt-0 flex justify-between items-center">
                                        <div className="text-2xl font-bold text-primary">
                                            {course.price === 0 ? 'Free' : `${course.price}`}
                                        </div>
                                        <Button asChild>
                                            <Link href={`/courses/${course._id}`}>View Course</Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))
                        ).reverse() : (
                            <p className="md:col-span-2 text-center text-muted-foreground">No courses match your criteria.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
