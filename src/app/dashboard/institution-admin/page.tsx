'use client';

import * as React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useAuth } from '@/context/auth-context';
import {
  Building,
  Users,
  BookOpen,
  Settings,
  ShieldCheck,
  UserPlus,
  BarChart3,
  FileText,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function InstitutionAdminDashboard() {
  const { user } = useAuth();

  const pendingApprovals = [
    { name: 'Dr. Kasun Dissanayake', role: 'Lecturer / Senior Faculty', department: 'Data Science', applied: '2 days ago' },
    { name: 'Ms. Sanduni Fernando', role: 'Teacher', department: 'Humanities', applied: '3 days ago' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-700 to-blue-800 text-white shadow-lg">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-medium mb-2">
            <Building className="h-3.5 w-3.5" />
            <span>Institution Tenant Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {user?.institution_name || 'Oakwood Educational Board'}
          </h1>
          <p className="text-cyan-100 text-xs sm:text-sm mt-1">
            Supervise faculty registrations, curriculum standards, class enrollments, and academic compliance.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-cyan-600">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Total Students</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">1,240</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Faculty Staff</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">82</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-600">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Active Courses</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">48 Modules</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-600">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Pending Approvals</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">2 Requests</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <UserPlus className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending approvals section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Faculty & Staff Approvals</h2>
            <span className="text-xs text-slate-500">Security Rule: Teachers cannot register without admin sign-off</span>
          </div>

          <div className="space-y-3">
            {pendingApprovals.map((req) => (
              <Card key={req.name}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{req.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {req.role} • {req.department} • Applied {req.applied}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="text-xs text-rose-600">
                      Decline
                    </Button>
                    <Button size="sm" className="text-xs bg-cyan-700 hover:bg-cyan-800">
                      Verify & Approve
                    </Button>
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
