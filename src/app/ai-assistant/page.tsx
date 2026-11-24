'use client';

import * as React from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useAuth } from '@/context/auth-context';
import { Sparkles, Send, BookOpen, AlertCircle, HelpCircle, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  isFallback?: boolean;
}

export default function AIAssistantPage() {
  const { user, role } = useAuth();
  const [messages, setMessages] = React.useState<AIChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: `Hello ${user?.full_name || 'there'}! I am your **EduCore AI Learning Assistant**.
How can I assist you with your studies today? You can ask me to:
- Explain difficult mathematical theorems or scientific models step-by-step.
- Generate revision flashcards or practice exam questions.
- Summarize lecture notes and recommend reading materials.`,
    },
  ]);
  const [prompt, setPrompt] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [statusNotice, setStatusNotice] = React.useState<string | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    const userText = prompt;
    setPrompt('');
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          subject: 'Computer Science & Mathematics',
          role: role,
        }),
      });

      const data = await res.json();
      if (!data.isConfigured) {
        setStatusNotice(data.message);
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'assistant',
            text: data.demoResponse || data.message,
            isFallback: true,
          },
        ]);
      } else {
        setStatusNotice(null);
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'assistant',
            text: data.response,
          },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: `An error occurred: ${err.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Banner */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-700 to-purple-800 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">EduCore AI Learning Assistant</h1>
              <p className="text-xs text-indigo-100">Step-by-step guidance, study summaries & practice quiz creator</p>
            </div>
          </div>
          <span className="text-[10px] bg-white/20 px-2 py-1 rounded font-medium">Server API Secured</span>
        </div>

        {statusNotice && (
          <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Notice for Administrator / Developer:</p>
              <p className="mt-0.5">{statusNotice}</p>
            </div>
          </div>
        )}

        {/* Chat Window */}
        <Card className="h-[550px] flex flex-col overflow-hidden">
          <CardContent className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[10px] text-slate-400 mb-1 px-1 font-medium">
                  {m.sender === 'user' ? 'You' : 'EduCore AI Assistant'}
                </span>
                <div
                  className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-slate-100 text-slate-800 rounded-bl-none whitespace-pre-line'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                <Sparkles className="h-3.5 w-3.5 animate-spin text-indigo-500" />
                <span>EduCore AI is formulating your step-by-step answer...</span>
              </div>
            )}
          </CardContent>

          {/* Prompt Input Form */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-200 flex items-center gap-2 bg-slate-50/50">
            <Input
              type="text"
              placeholder="Ask an educational question (e.g. Explain Raft consensus algorithm step-by-step)..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 text-xs bg-white"
            />
            <Button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-xs flex items-center gap-1.5"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Ask AI</span>
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
