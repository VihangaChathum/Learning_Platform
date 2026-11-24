'use client';

import * as React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useAuth } from '@/context/auth-context';
import {
  BookOpen,
  Users,
  CheckSquare,
  Award,
  PlusCircle,
  FileText,
  Calendar,
  MessageSquare,
  BarChart2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function TeacherDashboard() {
  const { user } = useAuth();

  const myClasses = [
    { name: 'Grade 10-A Mathematics', students: 32, pendingGrades: 14, nextSession: 'Today, 10:30 AM' },
    { name: 'Grade 10-B Mathematics', students: 30, pendingGrades: 0, nextSession: 'Tomorrow, 9:00 AM' },
    { name: 'Grade 11 Advanced Calculus', students: 24, pendingGrades: 6, nextSession: 'Tomorrow, 1:30 PM' },
  ];

  const pendingSubmissions = [
    { student: 'Maya Jayawardena', assignment: 'Quadratic Equations Worksheet', submitted: '1 hour ago' },
    { student: 'Devin Silva', assignment: 'Quadratic Equations Worksheet', submitted: '3 hours ago' },
    { student: 'Kavindu Sen', assignment: 'Calculus Optimization Quiz', submitted: 'Yesterday' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Banner */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-lg">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-medium mb-2">
              <span>Teacher Workspace • Department of Mathematics</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Hello, {user?.full_name || 'Mrs. Sharma'}
            </h1>
            <p className="text-amber-100 text-xs sm:text-sm mt-1">
              You have 20 assignments pending review across your 3 assigned classes.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/lms/assignments/new">
              <Button className="bg-white text-amber-800 hover:bg-amber-50 font-semibold shadow-md flex items-center gap-1.5">
                <PlusCircle className="h-4 w-4" />
                <span>Create Assignment</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Assigned Classes</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">3 Classes</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Total Students</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">86</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-rose-500">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Needs Grading</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">20 Submissions</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <CheckSquare className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Avg Class Score</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">84.2%</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <BarChart2 className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Classes and Submissions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-slate-800">My Classes & Rosters</h2>
            <div className="space-y-3">
              {myClasses.map((cls) => (
                <Card key={cls.name}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{cls.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {cls.students} Enrolled Students • Next: {cls.nextSession}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {cls.pendingGrades > 0 && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-100 text-rose-700">
                          {cls.pendingGrades} pending
                        </span>
                      )}
                      <Link href="/lms/grading">
                        <Button variant="outline" size="sm" className="text-xs">
                          Open Gradebook
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>Recent Submissions</span>
                  <Link href="/lms/grading" className="text-xs font-normal text-blue-600 hover:underline">
                    View all
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingSubmissions.map((sub, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-50 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-800">{sub.student}</p>
                      <p className="text-slate-500 text-[11px]">{sub.assignment}</p>
                    </div>
                    <Link href="/lms/grading">
                      <Button size="sm" variant="outline" className="text-xs h-7 px-2">
                        Grade
                      </Button>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
