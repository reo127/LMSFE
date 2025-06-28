"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Save } from 'lucide-react';

export default function FeedbackTab() {
    const [feedback, setFeedback] = useState("");
    const [submittedFeedback, setSubmittedFeedback] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = () => {
        setSubmittedFeedback(feedback);
        setIsEditing(false);
    };

    const handleEdit = () => {
        setFeedback(submittedFeedback);
        setIsEditing(true);
    };
    
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold">Course Feedback</h3>
            
            {!submittedFeedback || isEditing ? (
                <div>
                    <p className="text-muted-foreground mb-4">
                        {isEditing 
                            ? "You can edit your feedback below." 
                            : "We'd love to hear your thoughts on this course. What did you like? What could be improved?"}
                    </p>
                    <Textarea
                        placeholder="Enter your feedback here..."
                        rows={6}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                    <Button onClick={handleSubmit} className="mt-4">
                        <Save className="w-4 h-4 mr-2" />
                        {isEditing ? "Save Changes" : "Submit Feedback"}
                    </Button>
                </div>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Your Submitted Feedback</CardTitle>
                        <CardDescription>Thank you for your valuable input!</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground whitespace-pre-wrap">{submittedFeedback}</p>
                    </CardContent>
                    <CardContent>
                        <Button variant="outline" onClick={handleEdit}>
                           <Edit className="w-4 h-4 mr-2" />
                            Edit Feedback
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
