'use client';

import * as React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useAuth } from '@/context/auth-context';
import {
  ShieldCheck,
  UserCheck,
  Award,
  Calendar,
  CheckSquare,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ParentDashboard() {
  const { user } = useAuth();

  const linkedStudents = [
    {
      name: 'Maya Jayawardena',
      school: 'Oakwood International High School',
      grade: 'Grade 10-A',
      overallScore: '88.5%',
      attendance: '98%',
      missingAssignments: 0,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-800 text-white shadow-lg">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-medium mb-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Verified Guardian Access • Privacy Protected</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Parent Portal – {user?.full_name || 'Priyantha Jayawardena'}
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1">
            Supervise academic progress, attendance records, and communicate directly with teachers.
          </p>
        </div>

        {/* Linked Wards Card */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Linked Student Profiles</h2>
          {linkedStudents.map((child) => (
            <Card key={child.name} className="border-l-4 border-l-emerald-500">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{child.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {child.school} • {child.grade}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link href="/messages">
                      <Button variant="outline" size="sm" className="text-xs flex items-center gap-1.5">
                        <MessageSquare className="h-4 w-4" />
                        <span>Message Class Teacher</span>
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
                  <div className="p-3 rounded-lg bg-emerald-50/50">
                    <span className="text-xs text-emerald-800 font-medium">Academic Average</span>
                    <h4 className="text-2xl font-bold text-emerald-900 mt-0.5">{child.overallScore}</h4>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50/50">
                    <span className="text-xs text-blue-800 font-medium">Attendance Rate</span>
                    <h4 className="text-2xl font-bold text-blue-900 mt-0.5">{child.attendance}</h4>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-100">
                    <span className="text-xs text-slate-600 font-medium">Unsubmitted Tasks</span>
                    <h4 className="text-2xl font-bold text-slate-800 mt-0.5">{child.missingAssignments}</h4>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
