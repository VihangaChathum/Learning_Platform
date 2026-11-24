'use client';

import * as React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { BookOpen, Video, FileText, CheckCircle2, ArrowLeft, Download, MessageSquare } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function CourseDetailPage() {
  const [activeLesson, setActiveLesson] = React.useState(0);

  const course = {
    title: 'Distributed Systems & Cloud Infrastructure (CS301)',
    instructor: 'Prof. Rohana Wickramasinghe',
    description: 'Learn fault tolerance, replication, consensus algorithms, and distributed storage systems.',
    lessons: [
      {
        id: 'l-1',
        title: '1. Introduction to Distributed Systems & Fallacies',
        duration: '45 mins',
        content: `
### Key Concepts:
Distributed systems are collections of independent computing entities that communicate via networks to achieve a unified goal.

#### The 8 Fallacies of Distributed Computing:
1. The network is reliable.
2. Latency is zero.
3. Bandwidth is infinite.
4. The network is secure.
5. Topology doesn't change.
6. There is one administrator.
7. Transport cost is zero.
8. The network is homogeneous.
        `,
        materials: [
          { title: 'Lecture 01 Slides (PDF)', type: 'pdf', size: '2.4 MB' },
          { title: 'Lab 01: Socket Communication Repo', type: 'link', size: 'External' },
        ],
      },
      {
        id: 'l-2',
        title: '2. Consensus & The Raft Protocol',
        duration: '60 mins',
        content: `
### The Raft Consensus Algorithm
Raft achieves consensus via an elected leader. The leader receives log entries from clients, replicates them across other servers, and tells them when it is safe to apply them to their state machines.

#### Core Subproblems:
- **Leader Election:** Heartbeats and election timeouts.
- **Log Replication:** AppendEntries RPC.
- **Safety:** Leaders never overwrite or truncate their logs.
        `,
        materials: [
          { title: 'Raft Paper (Ongaro & Ousterhout)', type: 'pdf', size: '1.8 MB' },
        ],
      },
      {
        id: 'l-3',
        title: '3. Data Partitioning & Consistent Hashing',
        duration: '50 mins',
        content: `
Consistent hashing minimizes the number of keys that must be remapped when the hash table slots are modified. Widely adopted in Cassandra, DynamoDB, and Memcached.
        `,
        materials: [
          { title: 'Lecture 03 Slides (PDF)', type: 'pdf', size: '3.1 MB' },
        ],
      },
    ],
  };

  const current = course.lessons[activeLesson];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Link href="/lms/courses" className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:underline">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to courses</span>
        </Link>

        {/* Header */}
        <div className="p-6 rounded-xl bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Undergraduate LMS</span>
            <h1 className="text-xl sm:text-2xl font-bold mt-1">{course.title}</h1>
            <p className="text-slate-300 text-xs mt-0.5">Instructor: {course.instructor}</p>
          </div>
          <Link href="/messages">
            <Button variant="outline" size="sm" className="bg-slate-800 text-white border-slate-700 text-xs flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4" />
              <span>Course Discussion Room</span>
            </Button>
          </Link>
        </div>

        {/* Content Viewer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lessons Syllabus Sidebar */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-800">Course Syllabus & Lessons</h2>
            <div className="space-y-2">
              {course.lessons.map((lesson, idx) => (
                <div
                  key={lesson.id}
                  onClick={() => setActiveLesson(idx)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors text-xs ${
                    activeLesson === idx
                      ? 'bg-blue-50 border-blue-300 text-blue-900 font-semibold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <p className="line-clamp-1">{lesson.title}</p>
                  <span className="text-[10px] text-slate-400 block mt-1">{lesson.duration}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lesson Main Reader */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-lg">{current.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="prose prose-slate max-w-none text-xs leading-relaxed whitespace-pre-line text-slate-700">
                  {current.content}
                </div>

                {/* Attached Learning Materials */}
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-slate-800 mb-2">Lesson Files & Handouts</h3>
                  <div className="space-y-2">
                    {current.materials.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-slate-800">{m.title}</span>
                          <span className="text-slate-400 text-[10px]">({m.size})</span>
                        </div>
                        <Button size="sm" variant="ghost" className="h-7 text-blue-600 text-xs flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          <span>Download</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
