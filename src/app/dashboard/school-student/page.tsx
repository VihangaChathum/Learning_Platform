'use client';

import * as React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useAuth } from '@/context/auth-context';
import {
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Sparkles,
  Users,
  Award,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SchoolStudentDashboard() {
  const { user } = useAuth();

  const subjects = [
    { name: 'Mathematics 10-A', teacher: 'Mrs. Sharma', progress: 82, nextClass: '10:30 AM (Room 204)', color: 'bg-blue-500' },
    { name: 'Integrated Science', teacher: 'Mr. Fernando', progress: 75, nextClass: 'Tomorrow, 9:00 AM', color: 'bg-emerald-500' },
    { name: 'English Literature', teacher: 'Ms. Perera', progress: 90, nextClass: 'Tomorrow, 11:15 AM', color: 'bg-purple-500' },
    { name: 'World History', teacher: 'Mr. Davis', progress: 68, nextClass: 'Thursday, 1:00 PM', color: 'bg-amber-500' },
  ];

  const assignments = [
    { title: 'Algebra Quadratic Equations Worksheet', subject: 'Mathematics', due: 'Today, 11:59 PM', urgent: true },
    { title: 'Photosynthesis Lab Experiment Report', subject: 'Integrated Science', due: 'Oct 28', urgent: false },
    { title: 'Shakespeare Sonnet Comparative Analysis', subject: 'English Literature', due: 'Nov 02', urgent: false },
  ];

  const studyCircles = [
    { name: 'Grade 10 Math Wizards', members: 6, activity: 'Discussing problem 14 on quadratic forms' },
    { name: 'Science Fair Pioneers', members: 4, activity: 'Shared lab safety guidelines document' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-medium mb-2 backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Minor Safety Shield Active (Protected Profile)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.full_name || 'Maya'}!
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm mt-1">
              Oakwood International High School • Grade 10-A • Academic Year 2026/2027
            </p>
          </div>
          <Link href="/ai-assistant">
            <Button className="bg-white text-blue-700 hover:bg-blue-50 font-semibold shadow-md flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <span>Ask AI Study Buddy</span>
            </Button>
          </Link>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Enrolled Subjects</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">6</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Pending Tasks</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">3</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Average Grade</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">88.5%</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-indigo-500">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Study Circles</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">2 Groups</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subjects & Due Work Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Subjects */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span>My Subjects & Classes</span>
              </h2>
              <Link href="/lms/courses" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
                <span>View all</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subjects.map((s) => (
                <Card key={s.name} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <span className={`h-2 w-2 rounded-full ${s.color}`}></span>
                      <span className="text-[11px] text-slate-400 font-medium">{s.teacher}</span>
                    </div>
                    <CardTitle className="text-base mt-1">{s.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Syllabus Progress</span>
                        <span className="font-semibold text-slate-700">{s.progress}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div className={`h-full ${s.color}`} style={{ width: `${s.progress}%` }}></div>
                      </div>
                    </div>
                    <div className="p-2 rounded bg-slate-50 text-[11px] text-slate-600 flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      <span>Next: {s.nextClass}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming Assignments & Safe Study Groups */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <span>Upcoming Due Dates</span>
                </h3>
                <Link href="/lms/assignments" className="text-xs text-blue-600 hover:underline">
                  All
                </Link>
              </div>

              <div className="space-y-2.5">
                {assignments.map((a) => (
                  <div
                    key={a.title}
                    className={`p-3 rounded-xl border transition-colors ${
                      a.urgent ? 'bg-amber-50/50 border-amber-200' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-slate-800 leading-snug">{a.title}</p>
                      {a.urgent && (
                        <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 text-[10px] font-bold">
                          Urgent
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500">
                      <span>{a.subject}</span>
                      <span className="font-medium text-slate-700">Due: {a.due}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* School Study Circles */}
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-indigo-600" />
                  <span>Classmate Study Groups</span>
                </h3>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Verified Only
                </span>
              </div>
              <div className="space-y-2">
                {studyCircles.map((c) => (
                  <div key={c.name} className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <p className="text-xs font-bold text-slate-800">{c.name}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{c.activity}</p>
                  </div>
                ))}
              </div>
              <Link href="/social/study-groups">
                <Button variant="outline" size="sm" className="w-full mt-3 text-xs">
                  Join Study Circles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
