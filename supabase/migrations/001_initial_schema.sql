-- ==============================================================================
-- EDUCORE DATABASE SCHEMA & ROW LEVEL SECURITY (RLS) POLICIES
-- PostgreSQL / Supabase
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUMS & TYPES
DO $$ BEGIN
    CREATE TYPE user_role_type AS ENUM (
        'school_student',
        'university_student',
        'independent_learner',
        'teacher',
        'lecturer',
        'parent',
        'institution_admin',
        'super_admin',
        'moderator'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE institution_type AS ENUM ('school', 'university', 'academy', 'independent');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE age_category_type AS ENUM ('minor', 'adult');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE assignment_submission_status AS ENUM ('draft', 'submitted', 'graded', 'returned');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 2. INSTITUTIONS
CREATE TABLE IF NOT EXISTS public.institutions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    type institution_type NOT NULL DEFAULT 'school',
    domain TEXT,
    logo_url TEXT,
    description TEXT,
    address TEXT,
    contact_email TEXT,
    is_verified BOOLEAN DEFAULT false,
    settings JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROFILES (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    date_of_birth DATE,
    age_category age_category_type NOT NULL DEFAULT 'adult',
    primary_role user_role_type NOT NULL DEFAULT 'independent_learner',
    institution_id UUID REFERENCES public.institutions(id) ON DELETE SET NULL,
    is_profile_private BOOLEAN DEFAULT false,
    allow_messages_from TEXT DEFAULT 'everyone', -- 'everyone', 'classmates', 'none'
    is_verified BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'active', -- 'active', 'suspended', 'flagged'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. USER ROLES (Allows secondary or multi-role grants e.g. teacher + moderator)
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role user_role_type NOT NULL,
    institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, role, institution_id)
);

-- 5. PARENT / GUARDIAN LINKS (For minors supervision)
CREATE TABLE IF NOT EXISTS public.parent_guardian_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    verification_code TEXT,
    is_verified BOOLEAN DEFAULT false,
    verified_at TIMESTAMPTZ,
    relationship TEXT DEFAULT 'parent', -- 'parent', 'guardian'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(parent_id, student_id)
);

-- 6. DEPARTMENTS & FACULTIES (For Universities & Schools)
CREATE TABLE IF NOT EXISTS public.departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    head_profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(institution_id, code)
);

-- 7. CLASSES & SUBJECTS (K-12 School level)
CREATE TABLE IF NOT EXISTS public.classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- e.g. Grade 10-A
    grade_level INTEGER NOT NULL,
    academic_year TEXT NOT NULL,
    class_teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. COURSES (LMS core entity for Schools, Universities, and Independent learners)
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE,
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    instructor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    code TEXT, -- e.g. CS101 or MATH-10
    description TEXT,
    syllabus TEXT,
    level TEXT DEFAULT 'all_levels', -- 'school', 'undergraduate', 'postgraduate', 'open'
    cover_image_url TEXT,
    is_published BOOLEAN DEFAULT false,
    requires_approval BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. COURSE ENROLLMENTS
CREATE TABLE IF NOT EXISTS public.course_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'active', -- 'active', 'completed', 'dropped'
    progress_percentage NUMERIC(5,2) DEFAULT 0.0,
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    UNIQUE(course_id, student_id)
);

-- 10. LESSONS & MODULES
CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    summary TEXT,
    content TEXT, -- rich markdown / html
    order_index INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. LEARNING MATERIALS & ATTACHMENTS
CREATE TABLE IF NOT EXISTS public.learning_materials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    file_type TEXT NOT NULL, -- 'pdf', 'video', 'slide', 'document', 'link'
    file_url TEXT NOT NULL,
    file_size_bytes BIGINT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. ASSIGNMENTS
CREATE TABLE IF NOT EXISTS public.assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    due_date TIMESTAMPTZ NOT NULL,
    max_score NUMERIC(6,2) DEFAULT 100.0,
    allow_late_submission BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. ASSIGNMENT SUBMISSIONS
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignment_id UUID NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT,
    file_urls TEXT[] DEFAULT '{}',
    status assignment_submission_status DEFAULT 'submitted',
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    grade NUMERIC(6,2),
    feedback TEXT,
    graded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    graded_at TIMESTAMPTZ,
    UNIQUE(assignment_id, student_id)
);

-- 14. QUIZZES
CREATE TABLE IF NOT EXISTS public.quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    time_limit_minutes INTEGER DEFAULT 30,
    passing_score NUMERIC(5,2) DEFAULT 50.0,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. QUIZ QUESTIONS
CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type TEXT DEFAULT 'multiple_choice', -- 'multiple_choice', 'true_false', 'short_answer'
    options JSONB, -- Array of { text: string, id: string }
    correct_answer TEXT NOT NULL,
    points NUMERIC(4,1) DEFAULT 1.0,
    order_index INTEGER DEFAULT 0
);

-- 16. QUIZ ATTEMPTS
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    answers JSONB NOT NULL DEFAULT '{}'::jsonb,
    score NUMERIC(5,2) DEFAULT 0.0,
    passed BOOLEAN DEFAULT false,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- 17. ATTENDANCE & TIMETABLE
CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'present', -- 'present', 'absent', 'late', 'excused'
    notes TEXT,
    recorded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(institution_id, course_id, student_id, date)
);

-- 18. EDUCATIONAL SOCIAL FEED: POSTS
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE,
    group_id UUID, -- Optional foreign key to study groups
    title TEXT,
    content TEXT NOT NULL,
    subject TEXT, -- e.g. 'Mathematics', 'Computer Science'
    attachment_urls TEXT[] DEFAULT '{}',
    visibility TEXT DEFAULT 'public', -- 'public', 'institution_only', 'group_only'
    is_pinned BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. POST COMMENTS
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    parent_comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. REACTIONS
CREATE TABLE IF NOT EXISTS public.reactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
    comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    reaction_type TEXT NOT NULL DEFAULT 'like', -- 'like', 'helpful', 'insightful', 'question'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, post_id, reaction_type)
);

-- 21. FRIENDSHIPS & CONNECTIONS (Minors safety guarded)
CREATE TABLE IF NOT EXISTS public.friendships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'accepted', 'declined', 'blocked'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(sender_id, receiver_id)
);

-- 22. STUDY GROUPS & COMMUNITIES
CREATE TABLE IF NOT EXISTS public.groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE,
    creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT DEFAULT 'study_group', -- 'study_group', 'research', 'subject_club'
    is_private BOOLEAN DEFAULT false,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 23. GROUP MEMBERS
CREATE TABLE IF NOT EXISTS public.group_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'member', -- 'admin', 'moderator', 'member'
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(group_id, user_id)
);

-- 24. CONVERSATIONS & CHAT ROOMS
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL DEFAULT 'direct', -- 'direct', 'group', 'class', 'course'
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
    title TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 25. CONVERSATION MEMBERS
CREATE TABLE IF NOT EXISTS public.conversation_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    last_read_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(conversation_id, user_id)
);

-- 26. MESSAGES
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    attachment_urls TEXT[] DEFAULT '{}',
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 27. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- 'assignment_due', 'grade_posted', 'message', 'announcement', 'reply'
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    link TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 28. REPORTS & SAFETY (Flagging toxic behavior / harassment)
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    reported_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    post_id UUID REFERENCES public.posts(id) ON DELETE SET NULL,
    comment_id UUID REFERENCES public.comments(id) ON DELETE SET NULL,
    message_id UUID REFERENCES public.messages(id) ON DELETE SET NULL,
    reason TEXT NOT NULL,
    details TEXT,
    status TEXT DEFAULT 'pending', -- 'pending', 'resolved', 'dismissed'
    resolved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    resolution_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

-- 29. MODERATION ACTIONS & AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.moderation_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    moderator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    target_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    action_type TEXT NOT NULL, -- 'warning', 'mute', 'suspend', 'ban'
    reason TEXT NOT NULL,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL, -- 'login', 'update_role', 'delete_course', 'export_grades'
    resource_type TEXT NOT NULL,
    resource_id TEXT,
    ip_address TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_guardian_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function: Check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND primary_role IN ('super_admin', 'institution_admin')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles: Users can read public profiles or fellow institution members; can only edit own profile
CREATE POLICY "Profiles readable by authenticated users"
ON public.profiles FOR SELECT
TO authenticated
USING (
    is_profile_private = false 
    OR id = auth.uid()
    OR public.is_admin()
    OR EXISTS (
        SELECT 1 FROM public.parent_guardian_links
        WHERE parent_id = auth.uid() AND student_id = profiles.id AND is_verified = true
    )
);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (id = auth.uid());

-- Courses: Anyone can view published courses; instructors and admins can create/manage
CREATE POLICY "View published courses"
ON public.courses FOR SELECT
TO authenticated
USING (is_published = true OR instructor_id = auth.uid() OR public.is_admin());

CREATE POLICY "Instructors manage own courses"
ON public.courses FOR ALL
TO authenticated
USING (instructor_id = auth.uid() OR public.is_admin());

-- Submissions: Students view own; Instructors view course submissions
CREATE POLICY "Students see own submissions"
ON public.submissions FOR SELECT
TO authenticated
USING (student_id = auth.uid());

CREATE POLICY "Students submit own assignments"
ON public.submissions FOR INSERT
TO authenticated
WITH CHECK (student_id = auth.uid());

CREATE POLICY "Instructors see and grade submissions"
ON public.submissions FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.assignments a
        JOIN public.courses c ON c.id = a.course_id
        WHERE a.id = submissions.assignment_id AND c.instructor_id = auth.uid()
    ) OR public.is_admin()
);

-- Conversations & Messages: STRICT Authorization - Only members can view and send
CREATE POLICY "View conversation if member"
ON public.conversations FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.conversation_members
        WHERE conversation_id = conversations.id AND user_id = auth.uid()
    )
);

CREATE POLICY "Read messages if member of conversation"
ON public.messages FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.conversation_members
        WHERE conversation_id = messages.conversation_id AND user_id = auth.uid()
    )
);

CREATE POLICY "Send message if member of conversation"
ON public.messages FOR INSERT
TO authenticated
WITH CHECK (
    sender_id = auth.uid() AND
    EXISTS (
        SELECT 1 FROM public.conversation_members
        WHERE conversation_id = messages.conversation_id AND user_id = auth.uid()
    )
);

-- Parent Guardian Access: Parents can see their verified child's grades and submissions
CREATE POLICY "Parents view ward submissions"
ON public.submissions FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.parent_guardian_links pgl
        WHERE pgl.parent_id = auth.uid() AND pgl.student_id = submissions.student_id AND pgl.is_verified = true
    )
);

-- Notifications: Only owner can view or mark read
CREATE POLICY "Users view own notifications"
ON public.notifications FOR ALL
TO authenticated
USING (user_id = auth.uid());
