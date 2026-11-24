'use client';

import * as React from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useAuth } from '@/context/auth-context';
import { SocialPost } from '@/types';
import {
  MessageSquare,
  Heart,
  Share2,
  Send,
  Sparkles,
  ShieldAlert,
  Flag,
  BookOpen,
  Filter,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SocialFeedPage() {
  const { user } = useAuth();
  const [posts, setPosts] = React.useState<SocialPost[]>([
    {
      id: 'p-1',
      author_id: 'user-1',
      author_name: 'Maya Jayawardena',
      author_role: 'school_student',
      title: 'How do you intuitively understand the discriminant in quadratic formula?',
      content:
        'When \\(b^2 - 4ac < 0\\), we know the roots are complex. Does anyone have a visual geometric intuition for why the parabola fails to touch the x-axis in that scenario? Working on problem set 4.',
      subject: 'Mathematics',
      attachment_urls: [],
      visibility: 'public',
      likes_count: 8,
      comments_count: 3,
      has_liked: false,
      created_at: '2 hours ago',
    },
    {
      id: 'p-2',
      author_id: 'user-2',
      author_name: 'Prof. Rohana Wickramasinghe',
      author_role: 'lecturer',
      title: 'Resource Recommendation: Raft Consensus Visualization Tool',
      content:
        'For all CS301 students struggling with log compaction and election terms, this interactive Raft simulator will help you step through network partitions interactively.',
      subject: 'Computer Science',
      attachment_urls: ['https://raft.github.io'],
      visibility: 'public',
      likes_count: 24,
      comments_count: 6,
      has_liked: true,
      created_at: '5 hours ago',
    },
  ]);

  const [newTitle, setNewTitle] = React.useState('');
  const [newContent, setNewContent] = React.useState('');
  const [newSubject, setNewSubject] = React.useState('General Education');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const newPost: SocialPost = {
      id: `p-${Date.now()}`,
      author_id: user?.id || 'demo-user',
      author_name: user?.full_name || 'Anonymous Student',
      author_role: user?.primary_role || 'school_student',
      title: newTitle || null,
      content: newContent,
      subject: newSubject,
      attachment_urls: [],
      visibility: 'public',
      likes_count: 0,
      comments_count: 0,
      has_liked: false,
      created_at: 'Just now',
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');
  };

  const handleLike = (id: string) => {
    setPosts(
      posts.map((p) => {
        if (p.id === id) {
          const nextLiked = !p.has_liked;
          return {
            ...p,
            has_liked: nextLiked,
            likes_count: nextLiked ? p.likes_count + 1 : p.likes_count - 1,
          };
        }
        return p;
      })
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Banner */}
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between text-xs text-blue-900">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span>
              <strong>Educational Feed Only:</strong> Share academic questions, study guides, and research discoveries.
            </span>
          </div>
          <span className="font-semibold text-blue-700">Moderated 24/7</span>
        </div>

        {/* Create Post Box */}
        <Card>
          <CardContent className="p-4">
            <form onSubmit={handleCreatePost} className="space-y-3">
              <Input
                type="text"
                placeholder="Question or Discussion Title (e.g., Question on calculus...)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="text-xs"
              />
              <textarea
                rows={3}
                placeholder="Share an educational question or helpful learning insight..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full rounded-md border border-input p-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                required
              />
              <div className="flex items-center justify-between pt-1">
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="h-8 rounded-md border border-input bg-transparent px-2 text-xs"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Physics">Physics</option>
                  <option value="Biology">Biology</option>
                  <option value="Literature">Literature</option>
                  <option value="General Education">General Education</option>
                </select>

                <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs flex items-center gap-1.5">
                  <Send className="h-3.5 w-3.5" />
                  <span>Publish to Feed</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Feed Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="hover:border-slate-300 transition-colors">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs">
                      {post.author_name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{post.author_name}</p>
                      <p className="text-[10px] text-slate-400 capitalize">{post.author_role.replace('_', ' ')} • {post.created_at}</p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                    {post.subject}
                  </span>
                </div>

                {post.title && <h3 className="font-bold text-slate-900 text-sm">{post.title}</h3>}
                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{post.content}</p>

                {post.attachment_urls.length > 0 && (
                  <div className="p-2 rounded bg-slate-50 border border-slate-200 text-[11px] text-blue-600 truncate">
                    Attached resource: <a href={post.attachment_urls[0]} target="_blank" rel="noreferrer" className="underline">{post.attachment_urls[0]}</a>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1 transition-colors ${
                        post.has_liked ? 'text-rose-600 font-bold' : 'hover:text-slate-800'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${post.has_liked ? 'fill-rose-600' : ''}`} />
                      <span>{post.likes_count}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-slate-800">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments_count} Replies</span>
                    </button>
                  </div>

                  <button
                    onClick={() => alert('Post flagged for community moderator review.')}
                    className="text-slate-400 hover:text-rose-500 flex items-center gap-1 text-[11px]"
                    title="Report post"
                  >
                    <Flag className="h-3.5 w-3.5" />
                    <span>Report</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
