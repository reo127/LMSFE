"use client";

import { useState } from "react";
import { summarizeNotes } from "@/ai/flows/summarize-notes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Bold, Italic, Underline } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function NotesTab() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!notes.trim()) {
      toast({
        title: "No notes to summarize",
        description: "Please write some notes before summarizing.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSummary("");

    try {
      const result = await summarizeNotes({ notes });
      setSummary(result.summary);
    } catch (error) {
      console.error("Summarization failed:", error);
      toast({
        title: "Summarization Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Your Notes</h3>
        <p className="text-muted-foreground mb-4">
          Jot down your thoughts and key takeaways. Use the AI assistant to summarize them.
        </p>
        
        <div className="rounded-md border border-input">
            <div className="p-2 border-b">
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Underline className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <Textarea
              placeholder="Start writing your notes here..."
              rows={8}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-background border-0 rounded-t-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
        </div>

        <Button onClick={handleSummarize} disabled={isLoading} className="mt-4">
          <Wand2 className="w-4 h-4 mr-2" />
          {isLoading ? "Summarizing..." : "Summarize with AI"}
        </Button>
      </div>

      {(isLoading || summary) && (
        <Card>
          <CardHeader>
            <CardTitle>AI Summary</CardTitle>
            <CardDescription>A concise summary of your notes, generated by AI.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[75%]" />
              </div>
            ) : (
              <p className="text-sm whitespace-pre-wrap">{summary}</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
