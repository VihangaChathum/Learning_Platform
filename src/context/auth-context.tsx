'use client';

import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile, UserRole } from '@/types';
import { createClient } from '@/lib/supabase/client';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  setUser: (user: UserProfile | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  isLoading: true,
  logout: async () => {},
  setUser: () => {},
});

// Demo/Default profile generator when Supabase is not configured yet
export const DEMO_PROFILES: Record<UserRole, UserProfile> = {
  school_student: {
    id: 'demo-school-student',
    email: 'student.maya@oakwoodhigh.edu',
    full_name: 'Maya Jayawardena',
    age_category: 'minor',
    primary_role: 'school_student',
    institution_id: 'inst-oakwood',
    institution_name: 'Oakwood International High School',
    is_profile_private: true,
    allow_messages_from: 'classmates',
    is_verified: true,
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  university_student: {
    id: 'demo-uni-student',
    email: 'aravinda.perera@colombo.ac.lk',
    full_name: 'Aravinda Perera',
    age_category: 'adult',
    primary_role: 'university_student',
    institution_id: 'inst-ucsc',
    institution_name: 'Faculty of Science, University of Colombo',
    is_profile_private: false,
    allow_messages_from: 'everyone',
    is_verified: true,
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  independent_learner: {
    id: 'demo-learner',
    email: 'sarah.connor@selfpaced.io',
    full_name: 'Sarah Connor',
    age_category: 'adult',
    primary_role: 'independent_learner',
    institution_id: null,
    institution_name: 'Self-Paced Learning',
    is_profile_private: false,
    allow_messages_from: 'everyone',
    is_verified: true,
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  teacher: {
    id: 'demo-teacher',
    email: 'mrs.sharma@oakwoodhigh.edu',
    full_name: 'Mrs. Ananya Sharma',
    age_category: 'adult',
    primary_role: 'teacher',
    institution_id: 'inst-oakwood',
    institution_name: 'Oakwood International High School',
    is_profile_private: false,
    allow_messages_from: 'everyone',
    is_verified: true,
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  lecturer: {
    id: 'demo-lecturer',
    email: 'prof.wickramasinghe@colombo.ac.lk',
    full_name: 'Prof. Rohana Wickramasinghe',
    age_category: 'adult',
    primary_role: 'lecturer',
    institution_id: 'inst-ucsc',
    institution_name: 'Department of Computer Science & AI',
    is_profile_private: false,
    allow_messages_from: 'everyone',
    is_verified: true,
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  parent: {
    id: 'demo-parent',
    email: 'priyantha.j@gmail.com',
    full_name: 'Priyantha Jayawardena',
    age_category: 'adult',
    primary_role: 'parent',
    institution_id: null,
    institution_name: 'Parent / Guardian Portal',
    is_profile_private: true,
    allow_messages_from: 'classmates',
    is_verified: true,
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  institution_admin: {
    id: 'demo-inst-admin',
    email: 'registrar@oakwoodhigh.edu',
    full_name: 'Dr. Arthur Pendelton',
    age_category: 'adult',
    primary_role: 'institution_admin',
    institution_id: 'inst-oakwood',
    institution_name: 'Oakwood Educational Board',
    is_profile_private: false,
    allow_messages_from: 'everyone',
    is_verified: true,
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  super_admin: {
    id: 'demo-super-admin',
    email: 'root@educore.global',
    full_name: 'EduCore Global Executive',
    age_category: 'adult',
    primary_role: 'super_admin',
    institution_id: null,
    institution_name: 'EduCore Global Systems',
    is_profile_private: false,
    allow_messages_from: 'everyone',
    is_verified: true,
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  moderator: {
    id: 'demo-moderator',
    email: 'safety-desk@educore.global',
    full_name: 'Clara Oswald (Safety Operations)',
    age_category: 'adult',
    primary_role: 'moderator',
    institution_id: null,
    institution_name: 'Safety & Trust Council',
    is_profile_private: false,
    allow_messages_from: 'everyone',
    is_verified: true,
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for active demo persona or active session
    const savedUser = localStorage.getItem('educore_active_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(DEMO_PROFILES.school_student);
      }
    } else {
      // Default to school student demo profile for quick instant preview
      setUser(DEMO_PROFILES.school_student);
    }
    setIsLoading(false);
  }, []);

  const logout = async () => {
    const supabase = createClient();
    try {
      await supabase.auth.signOut();
    } catch {
      // Handled silently
    }
    localStorage.removeItem('educore_active_user');
    setUser(null);
  };

  const handleSetUser = (newUser: UserProfile | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('educore_active_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('educore_active_user');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.primary_role || null,
        isLoading,
        logout,
        setUser: handleSetUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
