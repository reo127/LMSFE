import { BookOpen, Award } from 'lucide-react';

interface CertificateViewProps {
  courseName: string;
  studentName: string;
}

export default function CertificateView({ courseName, studentName }: CertificateViewProps) {
  const completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="p-8 border-4 border-primary/20 bg-background rounded-lg text-center relative overflow-hidden print:border-none print:shadow-none">
       <div className="absolute -top-16 -left-16 w-48 h-48 border-8 border-accent/30 rounded-full"></div>
       <div className="absolute -bottom-16 -right-16 w-48 h-48 border-8 border-accent/30 rounded-full"></div>
      
      <div className="mb-4">
        <div className="inline-block p-4 bg-primary/10 rounded-full">
            <Award className="w-12 h-12 text-primary" />
        </div>
      </div>
      
      <p className="text-lg font-medium text-muted-foreground mb-2">Certificate of Completion</p>
      <p className="text-sm text-muted-foreground mb-6">This certifies that</p>
      
      <h1 className="text-4xl font-bold text-primary mb-4">{studentName}</h1>
      
      <p className="text-sm text-muted-foreground mb-2">has successfully completed the course</p>
      <h2 className="text-2xl font-semibold mb-8">{courseName}</h2>
      
      <div className="flex justify-between items-center text-left mt-10">
        <div className="text-sm">
          <p className="font-semibold">EduSpace</p>
          <p className="text-muted-foreground">Your Modern Learning Platform</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Date of Completion</p>
          <p className="text-muted-foreground">{completionDate}</p>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 flex items-center text-primary">
        <BookOpen className="w-4 h-4 mr-2" />
        <span className="font-bold text-sm">EduSpace</span>
      </div>
    </div>
  );
}
