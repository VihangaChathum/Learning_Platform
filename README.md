# EduCore – Smart Learning Management & Educational Social Networking Platform

EduCore is a modern, unified educational web platform combining:
1. **Learning Management System (LMS)** – Courses, interactive lessons, rich learning materials, quizzes, and automated gradebooks.
2. **Educational Social Networking** – Academic feeds, subject-based communities, study circles, with strict child protection (COPPA/GDPR-K aligned) for minors.
3. **Real-time Communication** – Server-authorized direct, class, and study group messaging powered by Supabase Realtime.
4. **AI-Powered Learning Assistance** – Step-by-step conceptual explanations, revision summaries, and practice test generation with secure server-side API integration.
5. **Multi-Tenant Administration** – Discrete workflows for School Students, University Scholars, Independent Learners, Teachers, Lecturers, Parents, Institution Admins, Super Admins, and Community Moderators.

---

## 🚀 Distinct Persona Dashboards

EduCore does not serve a generic one-size-fits-all dashboard. Each user role has a custom workspace:

| Persona | Dashboard Route | Specialized Capabilities |
| :--- | :--- | :--- |
| **School Student** | `/dashboard/school-student` | Minor safety protection, subjects, timetable, homework, classmate study groups |
| **University Student** | `/dashboard/university-student` | Degree programs, semester courses, lecture notes, GPA tracker, research forums |
| **Independent Learner** | `/dashboard/independent-learner` | Self-paced courses, certificates, learning goals, study planner |
| **Teacher** | `/dashboard/teacher` | Class roster management, assignment/quiz publishing, grading and feedback |
| **Lecturer** | `/dashboard/lecturer` | Syllabus creation, lecture materials, grading rubrics, academic circles |
| **Parent / Guardian** | `/dashboard/parent` | Privacy-respecting supervision of linked wards, attendance, teacher chat |
| **Institution Admin** | `/dashboard/institution-admin` | Faculty approvals, departments, institution-level analytics, curriculum |
| **Platform Super Admin** | `/dashboard/super-admin` | Multi-institution tenant oversight, system audit logs, security policies |
| **Community Moderator** | `/dashboard/moderator` | Minors safety incident queue, harassment reports, warnings, suspensions |

---

## 🛠️ Technology Stack

- **Framework:** Next.js (App Router) with TypeScript
- **Styling:** Tailwind CSS, Lucide React, Radix UI primitives
- **Database & Auth:** Supabase PostgreSQL with 30+ normalized tables and Row Level Security (RLS)
- **Realtime & Storage:** Supabase Realtime and Storage buckets
- **Validation & Forms:** Zod, React Hook Form
- **AI Integration:** Server-side API endpoint (`/api/ai/chat`) supporting Google Gemini or OpenAI

---

## 📦 Getting Started

### 1. Prerequisites
- Node.js 18+ (tested on Node v22)
- npm or pnpm

### 2. Setup Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Supabase credentials and optional AI API Key:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-do-not-expose

# Optional: To enable live automated AI responses (e.g. Gemini 1.5 Flash)
AI_API_KEY=your-gemini-api-key
```

### 3. Database Migration
Run the comprehensive SQL migration in your Supabase SQL Editor:
```bash
supabase/migrations/001_initial_schema.sql
```
This sets up all entities (`profiles`, `institutions`, `courses`, `lessons`, `assignments`, `submissions`, `posts`, `messages`, `parent_guardian_links`, etc.) alongside strict Row-Level Security policies.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view EduCore. You can switch between any of the 9 personas on the landing page or using the active persona switcher in the dashboard navigation.

### 5. Automated Tests
```bash
npx vitest run
```
