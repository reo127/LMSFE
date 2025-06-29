"use client";

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'teacher';
}

const initialMessages: Message[] = [
    { id: 1, text: "Hi, I have a question about Server Components. How do they differ from regular React components?", sender: 'user' },
    { id: 2, text: "Great question! Server Components run only on the server, so they don't send any JavaScript to the client. This makes your app faster. They're great for fetching data or accessing backend resources directly.", sender: 'teacher' },
    { id: 3, text: "Thanks! That makes sense. So I can use `fs` or a database client directly inside a Server Component?", sender: 'user' }
];

export default function DoubtsTab() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;
        
        const userMessage: Message = {
            id: messages.length + 1,
            text: newMessage,
            sender: 'user',
        };
        
        setMessages([...messages, userMessage]);
        setNewMessage('');

        // Mock teacher reply
        setTimeout(() => {
            const teacherReply: Message = {
                id: messages.length + 2,
                text: "Yes, exactly! You can use server-side libraries directly in them. Just remember to keep sensitive keys out of your source code.",
                sender: 'teacher',
            };
            setMessages(prev => [...prev, teacherReply]);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[500px]">
            <h3 className="text-xl font-semibold mb-4">Ask a Doubt</h3>
            <ScrollArea className="flex-1 pr-4">
                <div className="space-y-6">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                             {msg.sender === 'teacher' && <Avatar className="w-8 h-8 border"><AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="teacher avatar" /><AvatarFallback>T</AvatarFallback></Avatar>}
                            <div className={`rounded-lg p-3 max-w-[75%] ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                            {msg.sender === 'user' && <Avatar className="w-8 h-8 border"><AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="user avatar" /><AvatarFallback>U</AvatarFallback></Avatar>}
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <div className="mt-4 flex gap-2">
                <Input 
                    placeholder="Type your question here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                    <Send className="w-4 h-4" />
                    <span className="sr-only">Send</span>
                </Button>
            </div>
        </div>
    );
}
