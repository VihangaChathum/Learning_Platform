'use client';

import * as React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useAuth } from '@/context/auth-context';
import {
  ShieldAlert,
  Building,
  Users,
  Activity,
  Lock,
  FileText,
  Server,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SuperAdminDashboard() {
  const { user } = useAuth();

  const auditLogs = [
    { action: 'NEW_INSTITUTION_REGISTERED', target: 'Oakwood International High School', ip: '192.168.1.1', time: '10 mins ago' },
    { action: 'SECURITY_RLS_POLICY_AUDIT', target: 'Public Profiles Policy Check', ip: 'System', time: '1 hour ago' },
    { action: 'MODERATOR_SANCTION', target: 'Account Muted (ID: 3048)', ip: '10.0.0.12', time: '3 hours ago' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-900 via-slate-900 to-slate-950 text-white shadow-lg">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-medium mb-2 border border-rose-500/30">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>EduCore Global Platform Super Administrator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Platform Master Console
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Global tenant provisioning, Row-Level Security policy enforcement, and platform telemetry.
          </p>
        </div>

        {/* Global Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-rose-500">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Onboarded Institutions</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">18 Tenants</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <Building className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Total Registered Users</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">14,280</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Database Health</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">100% Up</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Server className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-indigo-500">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">RLS Security Status</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">Enforced</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Lock className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Global Security Audit Log */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Platform Security Audit Log</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {auditLogs.map((log, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono font-bold text-slate-900">{log.action}</span>
                      <p className="text-slate-500 mt-0.5">{log.target} • IP: {log.ip}</p>
                    </div>
                    <span className="text-slate-400">{log.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
