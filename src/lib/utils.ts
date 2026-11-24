import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'N/A';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDateTime(dateString: string | null | undefined): string {
  if (!dateString) return 'N/A';
  const d = new Date(dateString);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function getRoleDashboardPath(role: string): string {
  switch (role) {
    case 'school_student':
      return '/dashboard/school-student';
    case 'university_student':
      return '/dashboard/university-student';
    case 'independent_learner':
      return '/dashboard/independent-learner';
    case 'teacher':
      return '/dashboard/teacher';
    case 'lecturer':
      return '/dashboard/lecturer';
    case 'parent':
      return '/dashboard/parent';
    case 'institution_admin':
      return '/dashboard/institution-admin';
    case 'super_admin':
      return '/dashboard/super-admin';
    case 'moderator':
      return '/dashboard/moderator';
    default:
      return '/dashboard/independent-learner';
  }
}

export function getRoleDisplayName(role: string): string {
  const map: Record<string, string> = {
    school_student: 'School Student',
    university_student: 'University Student',
    independent_learner: 'Independent Learner',
    teacher: 'Teacher',
    lecturer: 'Lecturer / Professor',
    parent: 'Parent / Guardian',
    institution_admin: 'Institution Administrator',
    super_admin: 'Super Administrator',
    moderator: 'Community Moderator',
  };
  return map[role] || role;
}
