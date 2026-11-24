'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, DEMO_PROFILES } from '@/context/auth-context';
import { getRoleDashboardPath, getRoleDisplayName } from '@/lib/utils';
import { UserRole } from '@/types';
import { GraduationCap, ArrowRight, ShieldCheck, Sparkles, BookOpen, Users, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const router = useRouter();
  const { user, setUser } = useAuth();

  const handleSelectRole = (role: UserRole) => {
    const demoProfile = DEMO_PROFILES[role];
    setUser(demoProfile);
    router.push(getRoleDashboardPath(role));
  };

  const roles: { role: UserRole; title: string; desc: string; icon: string; color: string }[] = [
    {
      role: 'school_student',
      title: 'School Student',
      desc: 'Access classes, homework, safe classmate study groups, and timetable with minors protection.',
      icon: '🎒',
      color: 'border-blue-200 bg-blue-50/50 hover:border-blue-400',
    },
    {
      role: 'university_student',
      title: 'University Student',
      desc: 'Track degree programs, semester courses, GPA, faculty projects, and research groups.',
      icon: '🎓',
      color: 'border-indigo-200 bg-indigo-50/50 hover:border-indigo-400',
    },
    {
      role: 'independent_learner',
      title: 'Independent Learner',
      desc: 'Self-paced learning, explore open catalogs, certifications, and AI-guided study planner.',
      icon: '🧭',
      color: 'border-teal-200 bg-teal-50/50 hover:border-teal-400',
    },
    {
      role: 'teacher',
      title: 'School Teacher',
      desc: 'Manage classrooms, grade assignments, publish quizzes, monitor student attendance.',
      icon: '👩‍🏫',
      color: 'border-amber-200 bg-amber-50/50 hover:border-amber-400',
    },
    {
      role: 'lecturer',
      title: 'University Lecturer',
      desc: 'Syllabus development, lecture materials, grading rubrics, academic discussions.',
      icon: '🧑‍🏫',
      color: 'border-purple-200 bg-purple-50/50 hover:border-purple-400',
    },
    {
      role: 'parent',
      title: 'Parent / Guardian',
      desc: 'Privacy-respecting supervision of linked wards, academic results, and direct teacher messaging.',
      icon: '🛡️',
      color: 'border-emerald-200 bg-emerald-50/50 hover:border-emerald-400',
    },
    {
      role: 'institution_admin',
      title: 'Institution Admin',
      desc: 'School / University management, faculty rosters, departments, course accreditations.',
      icon: '🏛️',
      color: 'border-cyan-200 bg-cyan-50/50 hover:border-cyan-400',
    },
    {
      role: 'super_admin',
      title: 'Platform Super Admin',
      desc: 'Global tenant management, system security logs, global policies, audit trails.',
      icon: '⚡',
      color: 'border-rose-200 bg-rose-50/50 hover:border-rose-400',
    },
    {
      role: 'moderator',
      title: 'Community Moderator',
      desc: 'Review reported content, ensure minor safety compliance, resolve harassment tickets.',
      icon: '⚖️',
      color: 'border-slate-300 bg-slate-100 hover:border-slate-400',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">EduCore</span>
              <span className="text-[10px] block font-semibold uppercase tracking-wider text-blue-600">
                Unified LMS & Educational Social
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Create Account</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Next-Generation Multi-Tenant Educational Platform</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
          Where Learning Meets <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Collaborative Intelligence</span>
        </h1>
        <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
          Tailored interfaces for School Students, University Scholars, Teachers, Parents, and Administrators.
          Featuring dedicated LMS workflows, minors-safe social networking, real-time study chats, and AI assistance.
        </p>

        {/* Persona Launcher Grid */}
        <div className="mt-14 text-left">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Select a Dedicated Experience to Enter</span>
            </h2>
            <span className="text-xs text-slate-500">9 Distinct Portals Built with Strict RBAC</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((item) => (
              <div
                key={item.role}
                onClick={() => handleSelectRole(item.role)}
                className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${item.color} flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Role Portal
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-blue-700">
                  <span>Enter Dashboard</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Pillar Badges */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-t border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="h-10 w-10 mx-auto rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
              <BookOpen className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-slate-900">Complete LMS Suite</h4>
            <p className="text-xs text-slate-600 mt-1">
              Courses, interactive lessons, rich learning materials, quizzes, and automated gradebooks.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="h-10 w-10 mx-auto rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-slate-900">Minors Safety & Privacy</h4>
            <p className="text-xs text-slate-600 mt-1">
              COPPA/GDPR-K aligned child protection, verified guardian links, and restricted discovery for school students.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="h-10 w-10 mx-auto rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3">
              <Sparkles className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-slate-900">Secure AI Learning Buddy</h4>
            <p className="text-xs text-slate-600 mt-1">
              Server-side secured educational AI: step-by-step concept explanations, practice questions, and study assistance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
