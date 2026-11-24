'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, DEMO_PROFILES } from '@/context/auth-context';
import { getRoleDashboardPath } from '@/lib/utils';
import { UserRole } from '@/types';
import { GraduationCap, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [selectedDemoRole, setSelectedDemoRole] = React.useState<UserRole>('school_student');
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide email and password');
      return;
    }

    // Sign in with selected role configuration
    const demo = DEMO_PROFILES[selectedDemoRole];
    setUser({
      ...demo,
      email: email,
    });
    router.push(getRoleDashboardPath(selectedDemoRole));
  };

  const handleDemoSignIn = (role: UserRole) => {
    setSelectedDemoRole(role);
    const demo = DEMO_PROFILES[role];
    setUser(demo);
    router.push(getRoleDashboardPath(role));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900">EduCore</span>
        </Link>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
          Sign in to your Educational Account
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Enter your institutional or personal credentials to access your portal.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Select your persona or type your credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email or Student/Staff ID
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="student@school.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Portal Persona
                </label>
                <select
                  value={selectedDemoRole}
                  onChange={(e) => setSelectedDemoRole(e.target.value as UserRole)}
                  className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="school_student">School Student Portal</option>
                  <option value="university_student">University Student Portal</option>
                  <option value="independent_learner">Independent Learner</option>
                  <option value="teacher">Teacher Portal</option>
                  <option value="lecturer">Lecturer Portal</option>
                  <option value="parent">Parent / Guardian Portal</option>
                  <option value="institution_admin">Institution Administrator</option>
                  <option value="super_admin">Platform Super Administrator</option>
                  <option value="moderator">Community Safety Moderator</option>
                </select>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600" />
                  <span className="text-slate-600">Remember me</span>
                </label>
                <a href="#" className="font-semibold text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Sign In to Portal
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 text-center">
                Instant Demo Access
              </p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <button
                  type="button"
                  onClick={() => handleDemoSignIn('school_student')}
                  className="p-1.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 hover:bg-blue-100"
                >
                  School Student
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoSignIn('teacher')}
                  className="p-1.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700 hover:bg-amber-100"
                >
                  Teacher
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoSignIn('institution_admin')}
                  className="p-1.5 rounded text-[11px] font-medium bg-cyan-50 text-cyan-700 hover:bg-cyan-100"
                >
                  Admin
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-center border-t border-slate-100 text-xs text-slate-600">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="ml-1 font-semibold text-blue-600 hover:underline">
              Create an account
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
