export type UserRole =
  | 'school_student'
  | 'university_student'
  | 'independent_learner'
  | 'teacher'
  | 'lecturer'
  | 'parent'
  | 'institution_admin'
  | 'super_admin'
  | 'moderator';

export type AgeCategory = 'minor' | 'adult';
export type InstitutionType = 'school' | 'university' | 'academy' | 'independent';
export type SubmissionStatus = 'draft' | 'submitted' | 'graded' | 'returned';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string | null;
  bio?: string | null;
  date_of_birth?: string | null;
  age_category: AgeCategory;
  primary_role: UserRole;
  institution_id?: string | null;
  institution_name?: string | null;
  is_profile_private: boolean;
  allow_messages_from: 'everyone' | 'classmates' | 'none';
  is_verified: boolean;
  status: 'active' | 'suspended' | 'flagged';
  created_at: string;
  updated_at: string;
}

export interface Institution {
  id: string;
  name: string;
  slug: string;
  type: InstitutionType;
  domain?: string | null;
  logo_url?: string | null;
  description?: string | null;
  contact_email?: string | null;
  is_verified: boolean;
  created_at: string;
}

export interface Course {
  id: string;
  institution_id?: string | null;
  department_id?: string | null;
  instructor_id: string;
  instructor_name?: string;
  title: string;
  code?: string | null;
  description?: string | null;
  syllabus?: string | null;
  level: string;
  cover_image_url?: string | null;
  is_published: boolean;
  enrolled_count?: number;
  created_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  summary?: string | null;
  content?: string | null;
  order_index: number;
  is_published: boolean;
  created_at: string;
}

export interface LearningMaterial {
  id: string;
  course_id: string;
  lesson_id?: string | null;
  title: string;
  file_type: 'pdf' | 'video' | 'slide' | 'document' | 'link';
  file_url: string;
  file_size_bytes?: number | null;
  created_at: string;
}

export interface Assignment {
  id: string;
  course_id: string;
  course_title?: string;
  creator_id: string;
  title: string;
  description: string;
  due_date: string;
  max_score: number;
  allow_late_submission: boolean;
  submission_count?: number;
  created_at: string;
}

export interface Submission {
  id: string;
  assignment_id: string;
  student_id: string;
  student_name?: string;
  content?: string | null;
  file_urls: string[];
  status: SubmissionStatus;
  submitted_at: string;
  grade?: number | null;
  feedback?: string | null;
  graded_by?: string | null;
  graded_at?: string | null;
}

export interface Quiz {
  id: string;
  course_id: string;
  creator_id: string;
  title: string;
  description?: string | null;
  time_limit_minutes: number;
  passing_score: number;
  is_published: boolean;
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'short_answer';
  options?: { id: string; text: string }[] | null;
  correct_answer: string;
  points: number;
  order_index: number;
}

export interface SocialPost {
  id: string;
  author_id: string;
  author_name: string;
  author_role: UserRole;
  author_avatar?: string | null;
  institution_id?: string | null;
  title?: string | null;
  content: string;
  subject?: string | null;
  attachment_urls: string[];
  visibility: 'public' | 'institution_only' | 'group_only';
  likes_count: number;
  comments_count: number;
  has_liked?: boolean;
  created_at: string;
}

export interface PostComment {
  id: string;
  post_id: string;
  author_id: string;
  author_name: string;
  author_avatar?: string | null;
  content: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string;
  sender_avatar?: string | null;
  content: string;
  attachment_urls: string[];
  created_at: string;
}

export interface Conversation {
  id: string;
  type: 'direct' | 'group' | 'class' | 'course';
  title?: string | null;
  course_id?: string | null;
  group_id?: string | null;
  last_message?: string | null;
  last_message_at?: string | null;
  unread_count?: number;
  participants: {
    id: string;
    full_name: string;
    avatar_url?: string | null;
    primary_role: UserRole;
  }[];
}

export interface NotificationItem {
  id: string;
  user_id: string;
  type: 'assignment_due' | 'grade_posted' | 'message' | 'announcement' | 'reply';
  title: string;
  body: string;
  link?: string | null;
  is_read: boolean;
  created_at: string;
}
