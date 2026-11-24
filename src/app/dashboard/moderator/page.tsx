'use client';

import * as React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useAuth } from '@/context/auth-context';
import {
  ShieldAlert,
  AlertTriangle,
  UserX,
  CheckCircle,
  FileText,
  Lock,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ModeratorDashboard() {
  const { user } = useAuth();

  const reports = [
    {
      id: 'rep-1',
      reporter: 'School Safety Auto-Scanner',
      flaggedUser: 'Student_Guest_99',
      reason: 'Attempted unsolicited direct message to minor student',
      severity: 'Critical',
      time: '15 mins ago',
    },
    {
      id: 'rep-2',
      reporter: 'Maya Jayawardena',
      flaggedUser: 'Unverified_User',
      reason: 'Inappropriate language in public study group chat',
      severity: 'Medium',
      time: '1 hour ago',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-zinc-800 to-neutral-900 text-white shadow-lg">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-medium mb-2">
            <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />
            <span>Community Trust, Safety & Minors Protection Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Moderation Operations Console
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Enforcing student protection guidelines, harassment prevention, and safety audits.
          </p>
        </div>

        {/* Reports Queue */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Pending Safety Incident Queue</h2>
          <div className="space-y-3">
            {reports.map((rep) => (
              <Card key={rep.id} className="border-l-4 border-l-rose-500">
                <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-rose-100 text-rose-700">
                        {rep.severity}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm">Target: {rep.flaggedUser}</h3>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{rep.reason}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Reported by: {rep.reporter} • {rep.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      Dismiss
                    </Button>
                    <Button size="sm" className="text-xs bg-rose-600 hover:bg-rose-700">
                      Restrict & Suspend
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
