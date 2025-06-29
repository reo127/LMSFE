"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PlusCircle, Wrench, ClipboardCheck } from 'lucide-react';

const navLinks = [
    { href: '/admin/add-course', label: 'Add Course', icon: PlusCircle },
    { href: '/admin/manage-courses', label: 'Manage Courses', icon: Wrench },
    { href: '/admin/assignments', label: 'Assignments', icon: ClipboardCheck },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden lg:block">
            <nav className="flex flex-col gap-1">
                {navLinks.map((link) => {
                    const isActive = pathname.startsWith(link.href);
                    const Icon = link.icon;
                    return (
                        <Button
                            key={link.href}
                            asChild
                            variant={isActive ? 'secondary' : 'ghost'}
                            className="w-full justify-start"
                        >
                            <Link href={link.href}>
                                <Icon className="mr-2 h-4 w-4" />
                                {link.label}
                            </Link>
                        </Button>
                    )
                })}
            </nav>
        </aside>
    );
}
