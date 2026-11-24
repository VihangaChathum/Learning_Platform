import { describe, it, expect } from 'vitest';
import { getRoleDashboardPath, getRoleDisplayName, formatDate } from './utils';

describe('Role-Based Access Control and Navigation Utils', () => {
  it('correctly maps each of the 9 roles to their dedicated dashboard path', () => {
    expect(getRoleDashboardPath('school_student')).toBe('/dashboard/school-student');
    expect(getRoleDashboardPath('university_student')).toBe('/dashboard/university-student');
    expect(getRoleDashboardPath('independent_learner')).toBe('/dashboard/independent-learner');
    expect(getRoleDashboardPath('teacher')).toBe('/dashboard/teacher');
    expect(getRoleDashboardPath('lecturer')).toBe('/dashboard/lecturer');
    expect(getRoleDashboardPath('parent')).toBe('/dashboard/parent');
    expect(getRoleDashboardPath('institution_admin')).toBe('/dashboard/institution-admin');
    expect(getRoleDashboardPath('super_admin')).toBe('/dashboard/super-admin');
    expect(getRoleDashboardPath('moderator')).toBe('/dashboard/moderator');
  });

  it('provides readable display labels for all roles', () => {
    expect(getRoleDisplayName('school_student')).toBe('School Student');
    expect(getRoleDisplayName('super_admin')).toBe('Super Administrator');
    expect(getRoleDisplayName('moderator')).toBe('Community Moderator');
    expect(getRoleDisplayName('parent')).toBe('Parent / Guardian');
  });

  it('safely handles date formatting', () => {
    expect(formatDate(null)).toBe('N/A');
    expect(formatDate('2026-11-24T00:00:00Z')).toContain('2026');
  });
});
