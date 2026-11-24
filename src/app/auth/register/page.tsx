'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, DEMO_PROFILES } from '@/context/auth-context';
import { getRoleDashboardPath } from '@/lib/utils';
import { UserRole } from '@/types';
import { GraduationCap, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [role, setRole] = React.useState<UserRole>('school_student');
  const [guardianEmail, setGuardianEmail] = React.useState('');
  const [institutionCode, setInstitutionCode] = React.useState('');
  const [agreed, setAgreed] = React.useState(false);
  const [isMinor, setIsMinor] = React.useState(false);

  // Compute age bracket when date of birth changes
  React.useEffect(() => {
    if (dateOfBirth) {
      const birth = new Date(dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      setIsMinor(age < 18);
    }
  }, [dateOfBirth]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert('Please agree to the privacy policy & community safety standards.');
      return;
    }

    // Role safety restrictions check:
    // Students cannot register themselves as verified teachers or admins without approval
    const isRestrictedRole = role === 'teacher' || role === 'lecturer' || role === 'institution_admin' || role === 'super_admin';
    const isVerified = !isRestrictedRole;

    const newProfile = {
      ...DEMO_PROFILES[role],
      full_name: fullName,
      email: email,
      date_of_birth: dateOfBirth,
      age_category: (isMinor ? 'minor' : 'adult') as 'minor' | 'adult',
      is_verified: isVerified,
      is_profile_private: isMinor, // Minors are ALWAYS private by default
      allow_messages_from: isMinor ? ('classmates' as const) : ('everyone' as const),
    };

    setUser(newProfile);
    router.push(getRoleDashboardPath(role));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900">EduCore</span>
        </Link>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
          Create your Educational Profile
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Equipped with safety-first guardrails for school students and tailored LMS workspaces.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4">
        <Card>
          <CardHeader>
            <CardTitle>Registration</CardTitle>
            <CardDescription>
              Provide your academic details to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Legal Name
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Maya Jayawardena"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password (8+ chars)
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date of Birth
                  </label>
                  <Input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                  />
                  {isMinor && (
                    <span className="text-[11px] font-medium text-emerald-600 block mt-1">
                      ✓ Minor Protection Mode will be enabled (Private profile, safe messaging)
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Account Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="school_student">School Student (K-12)</option>
                    <option value="university_student">University Student</option>
                    <option value="independent_learner">Independent Learner</option>
                    <option value="teacher">Teacher (Requires school code)</option>
                    <option value="lecturer">Lecturer / Academic</option>
                    <option value="parent">Parent / Guardian</option>
                  </select>
                </div>
              </div>

              {isMinor && (
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <label className="block text-xs font-semibold text-blue-900 mb-1">
                    Parent or Legal Guardian Email
                  </label>
                  <Input
                    type="email"
                    placeholder="parent@example.com"
                    value={guardianEmail}
                    onChange={(e) => setGuardianEmail(e.target.value)}
                  />
                  <p className="text-[10px] text-blue-700 mt-1">
                    A consent and linking confirmation will be sent to your guardian.
                  </p>
                </div>
              )}

              {(role === 'teacher' || role === 'lecturer') && (
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <label className="block text-xs font-semibold text-amber-900 mb-1">
                    Institution Verification Code or Domain
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. INST-OAKWOOD-2026"
                    value={institutionCode}
                    onChange={(e) => setInstitutionCode(e.target.value)}
                  />
                  <p className="text-[10px] text-amber-700 mt-1">
                    Teacher and Faculty accounts are kept pending until approved by Institution Admin.
                  </p>
                </div>
              )}

              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-blue-600"
                  required
                />
                <label htmlFor="terms" className="text-xs text-slate-600">
                  I agree to the <span className="text-blue-600 underline">Terms of Service</span>,{' '}
                  <span className="text-blue-600 underline">Privacy Policy</span>, and safety guidelines.
                </label>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Complete Registration
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center border-t border-slate-100 text-xs text-slate-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="ml-1 font-semibold text-blue-600 hover:underline">
              Sign In
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
