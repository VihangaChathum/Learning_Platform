'use client';

import * as React from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ShieldAlert, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ModerationReportsPage() {
  const [incidents, setIncidents] = React.useState([
    {
      id: 'inc-101',
      type: 'Minors Safety Violation',
      target: 'User_491',
      description: 'Attempted to initiate private direct message to minor student without shared class membership.',
      status: 'Open',
      severity: 'Critical',
      timestamp: '25 mins ago',
    },
    {
      id: 'inc-102',
      type: 'Offensive Language',
      target: 'Post_Comment_82',
      description: 'Harassing comment detected in Grade 10 Math community group.',
      status: 'Open',
      severity: 'Medium',
      timestamp: '2 hours ago',
    },
  ]);

  const handleResolve = (id: string, action: string) => {
    setIncidents(incidents.filter((i) => i.id !== id));
    alert(`Report ${id} handled: ${action}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Community Safety & Moderation Queue</h1>
          <p className="text-xs text-slate-500 mt-1">
            Review reported items, enforce student protection rules, and maintain audit logs.
          </p>
        </div>

        <div className="space-y-3">
          {incidents.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-xs text-slate-500">
                <CheckCircle className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                All pending reports have been successfully reviewed and resolved!
              </CardContent>
            </Card>
          ) : (
            incidents.map((inc) => (
              <Card key={inc.id} className="border-l-4 border-l-rose-500">
                <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700">
                        {inc.severity}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm">{inc.type}</h3>
                      <span className="text-[11px] text-slate-400">Target: {inc.target}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{inc.description}</p>
                    <span className="text-[10px] text-slate-400 block mt-1">{inc.timestamp}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleResolve(inc.id, 'Dismissed')}
                      className="text-xs"
                    >
                      Dismiss
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleResolve(inc.id, 'User Muted & Warning Issued')}
                      className="text-xs bg-amber-600 hover:bg-amber-700"
                    >
                      Issue Warning
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleResolve(inc.id, 'Account Suspended')}
                      className="text-xs bg-rose-600 hover:bg-rose-700"
                    >
                      Suspend Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
