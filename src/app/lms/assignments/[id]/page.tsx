'use client';

import * as React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { CheckSquare, Upload, ArrowLeft, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AssignmentDetailPage() {
  const [submissionText, setSubmissionText] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <Link href="/lms/assignments" className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:underline">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to assignments</span>
        </Link>

        <Card>
          <CardHeader>
            <span className="text-xs font-bold text-blue-700">Grade 10 Mathematics</span>
            <CardTitle className="text-xl">Algebra Quadratic Equations Worksheet</CardTitle>
            <p className="text-xs text-slate-500">Due: Today at 11:59 PM • Max Score: 100 points</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
              <h3 className="font-bold text-slate-900">Instructions:</h3>
              <p>1. Solve problems 1 through 15 on pages 84-86 of your course workbook.</p>
              <p>2. Show all intermediate factorization steps and discriminant calculations (\(b^2 - 4ac\)).</p>
              <p>3. Submit your typed working or upload scanned handwritten PDF pages below.</p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-lg bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle className="h-10 w-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-900">Assignment Successfully Submitted!</h4>
                <p className="text-xs text-emerald-700">
                  Your submission has been recorded. Your teacher will grade and post feedback shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Typed Solution / Answer Notes
                  </label>
                  <textarea
                    rows={5}
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    placeholder="Type or paste your solutions here..."
                    className="w-full rounded-md border border-input p-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                    required
                  />
                </div>

                <div className="p-4 border-2 border-dashed border-slate-200 rounded-lg text-center cursor-pointer hover:bg-slate-50">
                  <Upload className="h-6 w-6 text-slate-400 mx-auto mb-1" />
                  <p className="text-xs font-medium text-slate-700">Click to upload solution file (PDF, DOCX, ZIP)</p>
                  <p className="text-[10px] text-slate-400">File size up to 25MB • Secure Supabase Storage</p>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-xs">
                  Submit Assignment for Grading
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
