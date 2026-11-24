import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  rememberMe: z.boolean().default(false),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  role: z.enum([
    'school_student',
    'university_student',
    'independent_learner',
    'teacher',
    'lecturer',
    'parent',
  ]),
  institutionCode: z.string().optional(),
  guardianEmail: z.string().email().optional().or(z.literal('')),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the privacy policy and terms',
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
