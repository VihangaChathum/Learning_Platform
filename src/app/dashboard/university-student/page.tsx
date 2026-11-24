'use client';

import * as React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useAuth } from '@/context/auth-context';
import {
  GraduationCap,
  BookOpen,
  FileCode,
  Calendar,
  BarChart3,
  Sparkles,
  Users,
  CheckSquare,
  Award,
  Layers,
  FileText,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function UniversityStudentDashboard() {
  const { user } = useAuth();

  const courses = [
    { code: 'CS301', name: 'Distributed Systems & Cloud', credits: 4, faculty: 'Prof. Wickramasinghe', gpaTier: 'A' },
    { code: 'CS304', name: 'Artificial Intelligence & Neural Nets', credits: 4, faculty: 'Dr. Senanayake', gpaTier: 'A-' },
    { code: 'CS312', name: 'Database Engineering & RLS', credits: 3, faculty: 'Dr. Fernando', gpaTier: 'B+' },
    { code: 'MATH305', name: 'Applied Linear Algebra', credits: 3, faculty: 'Prof. Alahakoon', gpaTier: 'A' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white shadow-lg">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-medium mb-2 border border-indigo-400/20">
              <GraduationCap className="h-3.5 w-3.5" />
              <span>B.Sc. (Hons) in Computer Science & AI • Semester 6</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.full_name || 'Aravinda'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Faculty of Science, University of Colombo • Student Reg: SC/2023/1089
            </p>
          </div>
          <Link href="/ai-assistant">
            <Button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>AI Research Assistant</span>
            </Button>
          </Link>
        </div>

        {/* GPA & Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-indigo-600">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Cumulative GPA</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">3.84 / 4.00</h3>
                <span className="text-[11px] text-emerald-600 font-semibold">First Class Standing</span>
              </div>
              <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <BarChart3 className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Earned Credits</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">84 / 120</h3>
                <span className="text-[11px] text-slate-400">70% Degree Complete</span>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-600">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Semester Courses</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">4 Modules</h3>
                <span className="text-[11px] text-slate-400">14 Credits Total</span>
              </div>
              <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-600">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Research Circles</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">3 Active</h3>
                <span className="text-[11px] text-purple-600 font-semibold">NLP & BioMed lab</span>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses & Research Groups */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Layers className="h-5 w-5 text-indigo-600" />
              <span>Current Semester Courses</span>
            </h2>

            <div className="space-y-3">
              {courses.map((c) => (
                <Card key={c.code} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-100 text-indigo-700">
                          {c.code}
                        </span>
                        <h3 className="font-bold text-slate-900 text-sm">{c.name}</h3>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Instructor: {c.faculty} • {c.credits} Academic Credits
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">Est. Grade</span>
                        <span className="text-sm font-bold text-slate-800">{c.gpaTier}</span>
                      </div>
                      <Link href={`/lms/courses`}>
                        <Button variant="outline" size="sm" className="text-xs">
                          Lecture Notes
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Academic Communities & Submissions */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-indigo-600" />
                  <span>Project Deliverables</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="p-3 rounded-lg border border-slate-200">
                  <p className="font-bold text-slate-800">Distributed Raft Consensus Engine</p>
                  <p className="text-slate-500 mt-0.5">CS301 • Milestone 2 due Friday</p>
                </div>
                <div className="p-3 rounded-lg border border-slate-200">
                  <p className="font-bold text-slate-800">Transformer Attention Map Visualizer</p>
                  <p className="text-slate-500 mt-0.5">CS304 • Team Submission due Nov 05</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span>University Research Forums</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50">
                  <p className="font-bold text-slate-800">UCSC Artificial Intelligence Lab</p>
                  <p className="text-slate-500">Paper reading group: RAG benchmarks</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50">
                  <p className="font-bold text-slate-800">Systems & Infrastructure SIG</p>
                  <p className="text-slate-500">Weekly tech talk: PostgreSQL performance</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
