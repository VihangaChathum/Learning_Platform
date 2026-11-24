'use client';

import * as React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useAuth } from '@/context/auth-context';
import { BookOpen, PlusCircle, Search, Filter, Layers, Users, Clock, Award } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CoursesPage() {
  const { role } = useAuth();
  const [searchTerm, setSearchTerm] = React.useState('');

  const courses = [
    {
      id: 'course-1',
      code: 'CS301',
      title: 'Distributed Systems & Cloud Infrastructure',
      instructor: 'Prof. Rohana Wickramasinghe',
      level: 'Undergraduate',
      lessonsCount: 14,
      studentsCount: 110,
      description: 'Fundamentals of distributed consensus, Raft algorithm, horizontal scaling, and cloud reliability.',
      coverColor: 'from-blue-600 to-indigo-700',
    },
    {
      id: 'course-2',
      code: 'MATH-10',
      title: 'Grade 10 Mathematics: Advanced Algebra',
      instructor: 'Mrs. Ananya Sharma',
      level: 'Secondary School',
      lessonsCount: 20,
      studentsCount: 62,
      description: 'Comprehensive coverage of quadratic equations, coordinate geometry, and trigonometry basics.',
      coverColor: 'from-emerald-600 to-teal-700',
    },
    {
      id: 'course-3',
      code: 'AI-201',
      title: 'Applied AI & Practical Prompt Engineering',
      instructor: 'Dr. Senanayake',
      level: 'Open / All Levels',
      lessonsCount: 8,
      studentsCount: 240,
      description: 'Build real-world LLM pipelines, RAG systems, and AI-assisted educational assistants.',
      coverColor: 'from-purple-600 to-pink-700',
    },
  ];

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const canCreateCourse = role === 'teacher' || role === 'lecturer' || role === 'institution_admin' || role === 'super_admin';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Courses & Syllabus Directory</h1>
            <p className="text-xs text-slate-500 mt-1">
              Browse syllabus modules, access video lectures, download course slides, and check requirements.
            </p>
          </div>
          {canCreateCourse && (
            <Link href="/lms/courses/new">
              <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 text-xs">
                <PlusCircle className="h-4 w-4" />
                <span>Create New Course</span>
              </Button>
            </Link>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by course code, title, or instructor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((c) => (
            <Card key={c.id} className="overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className={`h-24 bg-gradient-to-tr ${c.coverColor} p-4 flex flex-col justify-between text-white`}>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 backdrop-blur-sm">
                      {c.code}
                    </span>
                    <span className="text-[11px] font-medium opacity-90">{c.level}</span>
                  </div>
                  <h3 className="font-bold text-base line-clamp-1">{c.title}</h3>
                </div>

                <CardContent className="p-4 space-y-3">
                  <p className="text-xs text-slate-600 line-clamp-2">{c.description}</p>
                  <p className="text-[11px] text-slate-500 font-medium">Instructor: {c.instructor}</p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5 text-blue-600" />
                      <span>{c.lessonsCount} Lessons</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-indigo-600" />
                      <span>{c.studentsCount} Enrolled</span>
                    </span>
                  </div>
                </CardContent>
              </div>

              <div className="p-4 pt-0">
                <Link href={`/lms/courses/${c.id}`}>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    View Course Modules & Lessons
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
