'use client';

import * as React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useAuth } from '@/context/auth-context';
import { CheckSquare, Clock, PlusCircle, AlertCircle, FileCheck, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AssignmentsPage() {
  const { role } = useAuth();

  const assignments = [
    {
      id: 'asg-1',
      title: 'Algebra Quadratic Equations Worksheet',
      course: 'Grade 10 Mathematics',
      due: 'Today at 11:59 PM',
      points: 100,
      status: 'Pending Submission',
      isUrgent: true,
    },
    {
      id: 'asg-2',
      title: 'Distributed Raft Consensus Implementation',
      course: 'CS301 Distributed Systems',
      due: 'Oct 30, 2026',
      points: 100,
      status: 'Submitted (Awaiting Grade)',
      isUrgent: false,
    },
    {
      id: 'asg-3',
      title: 'Comparative Literature Essay: Shakespeare',
      course: 'English Literature',
      due: 'Nov 02, 2026',
      points: 50,
      status: 'Graded (Score: 47/50)',
      isUrgent: false,
    },
  ];

  const canCreate = role === 'teacher' || role === 'lecturer';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Assignments & Assessments</h1>
            <p className="text-xs text-slate-500 mt-1">
              Track due dates, upload homework files, and review teacher feedback.
            </p>
          </div>
          {canCreate && (
            <Link href="/lms/assignments/new">
              <Button className="bg-blue-600 hover:bg-blue-700 text-xs flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>Create New Assignment</span>
              </Button>
            </Link>
          )}
        </div>

        <div className="space-y-3">
          {assignments.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {item.course}
                    </span>
                    {item.isUrgent && (
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                        Due Today
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{item.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                    <span>Deadline: {item.due}</span>
                    <span>Max Points: {item.points}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-600">{item.status}</span>
                  <Link href={`/lms/assignments/${item.id}`}>
                    <Button size="sm" variant="outline" className="text-xs">
                      Open Submission
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
