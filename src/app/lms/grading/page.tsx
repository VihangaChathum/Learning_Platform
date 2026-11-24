'use client';

import * as React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Award, CheckCircle, Clock, Search, Filter } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function GradingPage() {
  const [submissions, setSubmissions] = React.useState([
    {
      id: 'sub-1',
      student: 'Maya Jayawardena',
      course: 'Grade 10 Mathematics',
      assignment: 'Algebra Quadratic Equations Worksheet',
      submittedAt: 'Today, 9:30 AM',
      grade: 92,
      feedback: 'Excellent breakdown of discriminant and factor pairs.',
      isGraded: true,
    },
    {
      id: 'sub-2',
      student: 'Devin Silva',
      course: 'Grade 10 Mathematics',
      assignment: 'Algebra Quadratic Equations Worksheet',
      submittedAt: 'Today, 8:15 AM',
      grade: null as number | null,
      feedback: '',
      isGraded: false,
    },
    {
      id: 'sub-3',
      student: 'Aravinda Perera',
      course: 'CS301 Distributed Systems',
      assignment: 'Raft Consensus Implementation',
      submittedAt: 'Yesterday',
      grade: 96,
      feedback: 'Clean state machine recovery handling and unit tests.',
      isGraded: true,
    },
  ]);

  const [activeGrade, setActiveGrade] = React.useState<number | ''>('');
  const [activeFeedback, setActiveFeedback] = React.useState('');
  const [selectedSubId, setSelectedSubId] = React.useState<string | null>(null);

  const handleSaveGrade = (id: string) => {
    if (activeGrade === '') return;
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              grade: Number(activeGrade),
              feedback: activeFeedback,
              isGraded: true,
            }
          : s
      )
    );
    setSelectedSubId(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Grading & Submissions Review</h1>
          <p className="text-xs text-slate-500 mt-1">
            Review student work, assign scores, and deliver constructive academic feedback.
          </p>
        </div>

        <div className="space-y-4">
          {submissions.map((sub) => (
            <Card key={sub.id} className="border-l-4 border-l-amber-500">
              <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800">{sub.student}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                      {sub.course}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mt-1">{sub.assignment}</h3>
                  <p className="text-xs text-slate-500">Submitted: {sub.submittedAt}</p>

                  {sub.isGraded && (
                    <div className="mt-2 text-xs">
                      <span className="font-bold text-emerald-700">Score: {sub.grade}/100</span>
                      <p className="text-slate-600 italic mt-0.5">Feedback: &ldquo;{sub.feedback}&rdquo;</p>
                    </div>
                  )}
                </div>

                <div>
                  {selectedSubId === sub.id ? (
                    <div className="space-y-2 w-full md:w-64 p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <Input
                        type="number"
                        placeholder="Grade (0-100)"
                        value={activeGrade}
                        onChange={(e) => setActiveGrade(e.target.value === '' ? '' : Number(e.target.value))}
                        className="h-8 text-xs"
                      />
                      <Input
                        type="text"
                        placeholder="Feedback note..."
                        value={activeFeedback}
                        onChange={(e) => setActiveFeedback(e.target.value)}
                        className="h-8 text-xs"
                      />
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSaveGrade(sub.id)}
                          className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 flex-1"
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedSubId(null)}
                          className="h-7 text-xs"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedSubId(sub.id);
                        setActiveGrade(sub.grade || '');
                        setActiveFeedback(sub.feedback || '');
                      }}
                      className="text-xs bg-blue-600 hover:bg-blue-700"
                    >
                      {sub.isGraded ? 'Edit Grade' : 'Grade Submission'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
