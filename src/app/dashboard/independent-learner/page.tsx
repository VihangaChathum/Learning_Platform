'use client';

import * as React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useAuth } from '@/context/auth-context';
import {
  Compass,
  BookOpen,
  Award,
  Calendar,
  Sparkles,
  TrendingUp,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function IndependentLearnerDashboard() {
  const { user } = useAuth();

  const enrolled = [
    { title: 'Full-Stack Next.js 15 & Supabase Architecture', author: 'EduCore Academy', progress: 65, totalHours: '28 hrs' },
    { title: 'Applied Machine Learning & LLM Systems', author: 'Dr. Senanayake', progress: 40, totalHours: '42 hrs' },
    { title: 'System Design for Production Scale', author: 'Cloud Institute', progress: 90, totalHours: '15 hrs' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-teal-700 via-cyan-800 to-blue-800 text-white shadow-lg">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-200 text-xs font-medium mb-2 border border-teal-400/20">
              <Compass className="h-3.5 w-3.5" />
              <span>Self-Paced Professional & Personal Growth</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Keep building, {user?.full_name || 'Sarah'}!
            </h1>
            <p className="text-teal-100 text-xs sm:text-sm mt-1">
              You are on a 14-day study streak. Complete 2 more lessons to earn your Micro-Credential.
            </p>
          </div>
          <Link href="/lms/courses">
            <Button className="bg-white text-teal-800 hover:bg-teal-50 font-semibold shadow-md">
              Explore Course Catalog
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-teal-500">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Courses in Progress</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">3</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Earned Certificates</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">5</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Hours Invested</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">72.4 hrs</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Target Goals</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">80% Met</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <TrendingUp className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enrolled Courses */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">My Active Courses</h2>
            <Link href="/lms/courses" className="text-xs font-semibold text-teal-700 hover:underline">
              Browse More
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {enrolled.map((item) => (
              <Card key={item.title} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <span className="text-[10px] uppercase font-bold text-teal-600">{item.author}</span>
                  <CardTitle className="text-base mt-1 line-clamp-1">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>Progress</span>
                      <span className="font-bold">{item.progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-teal-600" style={{ width: `${item.progress}%` }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-500">{item.totalHours}</span>
                    <Link href="/lms/courses">
                      <Button size="sm" variant="outline" className="text-xs">
                        Resume
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
