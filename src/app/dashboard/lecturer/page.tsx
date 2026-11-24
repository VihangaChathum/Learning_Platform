'use client';

import * as React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useAuth } from '@/context/auth-context';
import {
  GraduationCap,
  BookOpen,
  Award,
  Users,
  FileText,
  BarChart3,
  PlusCircle,
  Share2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function LecturerDashboard() {
  const { user } = useAuth();

  const courses = [
    { code: 'CS301', title: 'Distributed Systems & Cloud Computing', enrolled: 110, term: 'Fall 2026' },
    { code: 'CS502', title: 'Advanced Scalable Architectures (Postgrad)', enrolled: 35, term: 'Fall 2026' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Banner */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-purple-800 to-indigo-900 text-white shadow-lg">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-medium mb-2">
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Faculty Console • Department of Computer Science</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Prof. {user?.full_name || 'Rohana Wickramasinghe'}
            </h1>
            <p className="text-purple-100 text-xs sm:text-sm mt-1">
              Curriculum, research circles, and student assessment management.
            </p>
          </div>
          <Link href="/lms/courses/new">
            <Button className="bg-white text-purple-900 hover:bg-purple-50 font-semibold shadow-md flex items-center gap-1.5">
              <PlusCircle className="h-4 w-4" />
              <span>Create Course / Syllabus</span>
            </Button>
          </Link>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-purple-600">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Active Courses</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">2 Modules</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Undergrad Students</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">145</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-indigo-600">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Research Papers</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">8 Repos</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Share2 className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-600">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Grade Rubrics</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">Calibrated</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course management */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Assigned Courses & Lecture Repositories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((c) => (
              <Card key={c.code} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded w-fit">
                    {c.code}
                  </span>
                  <CardTitle className="text-base mt-1">{c.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Enrolled: {c.enrolled} candidates</span>
                    <span>{c.term}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <Link href="/lms/materials">
                      <Button size="sm" variant="outline" className="text-xs">
                        Upload Slides
                      </Button>
                    </Link>
                    <Link href="/lms/grading">
                      <Button size="sm" className="text-xs bg-purple-700 hover:bg-purple-800">
                        View Analytics
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
