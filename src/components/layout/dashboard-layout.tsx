'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { getRoleDisplayName, getRoleDashboardPath, cn } from '@/lib/utils';
import { UserRole } from '@/types';
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Users,
  MessageSquare,
  Sparkles,
  ShieldAlert,
  Settings,
  Bell,
  LogOut,
  Building,
  CheckSquare,
  BarChart3,
  Award,
  Compass,
  FileText,
  UserCheck,
  ChevronDown,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, role, logout, setUser } = useAuth();
  const pathname = usePathname();
  const [roleSwitcherOpen, setRoleSwitcherOpen] = React.useState(false);

  // Role-specific navigation items
  const getNavItems = (currentRole: UserRole | null): NavItem[] => {
    switch (currentRole) {
      case 'school_student':
        return [
          { title: 'My Classes & Subjects', href: '/dashboard/school-student', icon: BookOpen },
          { title: 'Assignments & Exams', href: '/lms/assignments', icon: CheckSquare },
          { title: 'School Timetable', href: '/timetable', icon: Calendar },
          { title: 'Grades & Report Card', href: '/grades', icon: Award },
          { title: 'Study Circles', href: '/social/study-groups', icon: Users },
          { title: 'Safe Q&A & Feed', href: '/social/feed', icon: MessageSquare },
          { title: 'AI Study Buddy', href: '/ai-assistant', icon: Sparkles },
        ];
      case 'university_student':
        return [
          { title: 'Faculty & Degree Overview', href: '/dashboard/university-student', icon: GraduationCap },
          { title: 'Semester Courses', href: '/lms/courses', icon: BookOpen },
          { title: 'Lecture Notes & Slides', href: '/lms/materials', icon: FileText },
          { title: 'Projects & Submissions', href: '/lms/assignments', icon: CheckSquare },
          { title: 'GPA & Academic Progress', href: '/grades', icon: BarChart3 },
          { title: 'Campus Community', href: '/social/feed', icon: Users },
          { title: 'Research & Discussions', href: '/social/study-groups', icon: MessageSquare },
          { title: 'AI Research Assistant', href: '/ai-assistant', icon: Sparkles },
        ];
      case 'independent_learner':
        return [
          { title: 'Learning Overview', href: '/dashboard/independent-learner', icon: Compass },
          { title: 'Browse All Courses', href: '/lms/courses', icon: BookOpen },
          { title: 'Study Planner', href: '/timetable', icon: Calendar },
          { title: 'Certificates & Skills', href: '/grades', icon: Award },
          { title: 'Peer Study Groups', href: '/social/study-groups', icon: Users },
          { title: 'AI Tutor', href: '/ai-assistant', icon: Sparkles },
        ];
      case 'teacher':
        return [
          { title: 'Teacher Cockpit', href: '/dashboard/teacher', icon: BookOpen },
          { title: 'Class Management', href: '/lms/courses', icon: Users },
          { title: 'Assignment & Quiz Creator', href: '/lms/assignments', icon: CheckSquare },
          { title: 'Submissions & Grading', href: '/lms/grading', icon: Award },
          { title: 'Attendance Tracker', href: '/timetable', icon: Calendar },
          { title: 'Parent Communication', href: '/messages', icon: MessageSquare },
          { title: 'Class Discussions', href: '/social/feed', icon: Layers },
        ];
      case 'lecturer':
        return [
          { title: 'Lecturer Console', href: '/dashboard/lecturer', icon: GraduationCap },
          { title: 'Course & Syllabus Manager', href: '/lms/courses', icon: BookOpen },
          { title: 'Lecture Slides & Repos', href: '/lms/materials', icon: FileText },
          { title: 'Assessments & Exams', href: '/lms/assignments', icon: CheckSquare },
          { title: 'Student Analytics & Grading', href: '/lms/grading', icon: BarChart3 },
          { title: 'Academic Circles', href: '/social/feed', icon: Users },
          { title: 'AI Syllabus Assistant', href: '/ai-assistant', icon: Sparkles },
        ];
      case 'parent':
        return [
          { title: 'Ward Supervision', href: '/dashboard/parent', icon: UserCheck },
          { title: 'Academic Progress & GPA', href: '/grades', icon: BarChart3 },
          { title: 'Attendance & Schedule', href: '/timetable', icon: Calendar },
          { title: 'Assignment Due Dates', href: '/lms/assignments', icon: CheckSquare },
          { title: 'Direct Teacher Chat', href: '/messages', icon: MessageSquare },
        ];
      case 'institution_admin':
        return [
          { title: 'Institution Command', href: '/dashboard/institution-admin', icon: Building },
          { title: 'Faculty & Departments', href: '/admin/departments', icon: Layers },
          { title: 'Students & Staff Roster', href: '/admin/users', icon: Users },
          { title: 'Curriculum & Courses', href: '/lms/courses', icon: BookOpen },
          { title: 'Institutional Analytics', href: '/admin/reports', icon: BarChart3 },
          { title: 'Settings & Domains', href: '/admin/settings', icon: Settings },
        ];
      case 'super_admin':
        return [
          { title: 'Global Platform Overview', href: '/dashboard/super-admin', icon: ShieldAlert },
          { title: 'All Institutions', href: '/admin/institutions', icon: Building },
          { title: 'Global User Accounts', href: '/admin/users', icon: Users },
          { title: 'Platform Security & Logs', href: '/admin/audit-logs', icon: ShieldAlert },
          { title: 'System Policies', href: '/admin/settings', icon: Settings },
        ];
      case 'moderator':
        return [
          { title: 'Moderation Queue', href: '/dashboard/moderator', icon: ShieldAlert },
          { title: 'Reported Content & Posts', href: '/moderation/reports', icon: FileText },
          { title: 'Minors Safety Violations', href: '/moderation/minors-safety', icon: ShieldAlert },
          { title: 'Account Restrictions', href: '/moderation/actions', icon: Users },
          { title: 'Audit Trail', href: '/admin/audit-logs', icon: BarChart3 },
        ];
      default:
        return [
          { title: 'Dashboard', href: '/dashboard/independent-learner', icon: BookOpen },
        ];
    }
  };

  const navItems = getNavItems(role);

  const rolesList: UserRole[] = [
    'school_student',
    'university_student',
    'independent_learner',
    'teacher',
    'lecturer',
    'parent',
    'institution_admin',
    'super_admin',
    'moderator',
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 z-30">
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100 gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              EduCore
            </span>
            <span className="text-[10px] block font-medium uppercase tracking-wider text-slate-400">
              Smart LMS & Social
            </span>
          </div>
        </div>

        {/* Quick Role Switcher Pill (Great for evaluation across all 9 personas) */}
        <div className="p-3 mx-3 mt-3 rounded-lg bg-slate-100 border border-slate-200 relative">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Active Persona</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <button
            onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
            className="w-full text-left text-xs font-medium flex items-center justify-between text-slate-800 hover:text-blue-600"
          >
            <span className="truncate">{role ? getRoleDisplayName(role) : 'Select Persona'}</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          {roleSwitcherOpen && (
            <div className="absolute left-0 right-0 top-16 bg-white border border-slate-200 shadow-xl rounded-lg py-1 z-50 max-h-64 overflow-y-auto">
              <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase">
                Switch Test Role Interface
              </div>
              {rolesList.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    const demo = require('@/context/auth-context').DEMO_PROFILES[r];
                    setUser(demo);
                    setRoleSwitcherOpen(false);
                    window.location.href = getRoleDashboardPath(r);
                  }}
                  className={cn(
                    'w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 hover:text-blue-700 transition-colors',
                    role === r && 'bg-blue-50/80 font-semibold text-blue-700'
                  )}
                >
                  {getRoleDisplayName(r)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                )}
              >
                <Icon className={cn('h-4 w-4', isActive ? 'text-white' : 'text-slate-500')} />
                <span>{item.title}</span>
              </Link>
            );
          })}

          <div className="pt-4 px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Community & Live Chat
          </div>
          <Link
            href="/social/feed"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            <MessageSquare className="h-4 w-4 text-slate-500" />
            <span>Community Feed</span>
          </Link>
          <Link
            href="/messages"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            <Users className="h-4 w-4 text-slate-500" />
            <span>Realtime Chat</span>
          </Link>
          <Link
            href="/ai-assistant"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-indigo-600 bg-indigo-50/60 hover:bg-indigo-100/70"
          >
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <span>AI Assistant</span>
          </Link>
        </nav>

        {/* User Footer Card */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100/70 transition-colors">
            <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center text-sm">
              {user?.full_name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">{user?.full_name || 'Guest User'}</p>
              <p className="text-[11px] text-slate-400 truncate">{user?.institution_name || 'EduCore Platform'}</p>
            </div>
            <button
              onClick={() => logout()}
              title="Sign Out"
              className="text-slate-400 hover:text-rose-600 p-1 rounded-md"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col pl-64">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {role ? getRoleDisplayName(role) : 'Portal'}
            </span>
            <span className="text-xs text-slate-500">
              {user?.institution_name ? `• ${user.institution_name}` : ''}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/notifications">
              <Button variant="ghost" size="icon" className="relative text-slate-600">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500"></span>
              </Button>
            </Link>

            <Link href="/profile">
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
                <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center font-medium text-xs text-slate-700">
                  {user?.full_name?.slice(0, 2).toUpperCase() || 'ED'}
                </div>
              </div>
            </Link>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
