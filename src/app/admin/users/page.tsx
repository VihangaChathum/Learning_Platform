'use client';

import * as React from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Users, Search, PlusCircle, CheckCircle, XCircle, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminUsersPage() {
  const [users, setUsers] = React.useState([
    { id: 'u-1', name: 'Maya Jayawardena', email: 'maya@oakwoodhigh.edu', role: 'School Student', status: 'Active', verified: true },
    { id: 'u-2', name: 'Mrs. Ananya Sharma', email: 'asharma@oakwoodhigh.edu', role: 'Teacher', status: 'Active', verified: true },
    { id: 'u-3', name: 'Dr. Kasun Dissanayake', email: 'kdissa@oakwoodhigh.edu', role: 'Lecturer', status: 'Pending Approval', verified: false },
    { id: 'u-4', name: 'Priyantha Jayawardena', email: 'priyantha.j@gmail.com', role: 'Parent', status: 'Active', verified: true },
  ]);

  const handleApprove = (id: string) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, status: 'Active', verified: true } : u)));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">User Roster & Verification</h1>
            <p className="text-xs text-slate-500 mt-1">
              Enforce role-based registration approvals. Teachers and faculty accounts must be verified.
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-xs flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>Invite New Member</span>
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Verification</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-bold text-slate-900">{u.name}</td>
                      <td className="p-4 text-slate-600">{u.email}</td>
                      <td className="p-4 font-medium text-slate-700">{u.role}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            u.verified
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {!u.verified ? (
                          <Button
                            size="sm"
                            onClick={() => handleApprove(u.id)}
                            className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700"
                          >
                            Approve Access
                          </Button>
                        ) : (
                          <span className="text-slate-400 text-[11px]">Authorized</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
