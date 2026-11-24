'use client';

import * as React from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useAuth } from '@/context/auth-context';
import { Send, Users, ShieldCheck, Lock, Paperclip } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  sender: string;
  isSelf: boolean;
  text: string;
  time: string;
}

export default function RealtimeChatPage() {
  const { user } = useAuth();

  const channels = [
    { id: 'c-1', name: 'Grade 10-A Math Study Group', type: 'Class Group', unread: 2 },
    { id: 'c-2', name: 'Mrs. Sharma (Mathematics Teacher)', type: 'Direct Chat', unread: 0 },
    { id: 'c-3', name: 'CS301 Distributed Systems Discussion', type: 'Course Channel', unread: 5 },
  ];

  const [activeChannel, setActiveChannel] = React.useState(channels[0]);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 'm-1',
      sender: 'Maya Jayawardena',
      isSelf: false,
      text: 'Has anyone checked problem 12? Does the parabola intersect the y-axis at (0, -4)?',
      time: '10:14 AM',
    },
    {
      id: 'm-2',
      sender: 'Mrs. Sharma',
      isSelf: false,
      text: 'Yes Maya, setting x = 0 yields the constant term c = -4. Well done!',
      time: '10:16 AM',
    },
  ]);
  const [inputVal, setInputVal] = React.useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: user?.full_name || 'Me',
      isSelf: true,
      text: inputVal,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMsg]);
    setInputVal('');
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Left: Channels & Direct chats */}
        <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50/50">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-bold text-sm text-slate-800">Class & Study Chats</h2>
            <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              <span>Safe Channel</span>
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {channels.map((c) => (
              <div
                key={c.id}
                onClick={() => setActiveChannel(c)}
                className={`p-3.5 cursor-pointer transition-colors ${
                  activeChannel.id === c.id ? 'bg-white border-l-4 border-l-blue-600 shadow-sm' : 'hover:bg-slate-100/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 truncate">{c.name}</span>
                  {c.unread > 0 && (
                    <span className="h-4 w-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {c.unread}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 mt-0.5 block">{c.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Message Window */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Header */}
          <div className="h-14 px-6 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">{activeChannel.name}</h3>
              <p className="text-[11px] text-slate-400">{activeChannel.type} • Server-Authorized Members Only</p>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <Lock className="h-3 w-3 text-slate-400" />
              <span>RLS Row-Secured</span>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.isSelf ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[10px] text-slate-400 mb-1 px-1">
                  {m.sender} • {m.time}
                </span>
                <div
                  className={`max-w-md p-3 rounded-2xl text-xs leading-relaxed ${
                    m.isSelf
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-slate-100 text-slate-800 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-200 flex items-center gap-2">
            <button
              type="button"
              className="p-2 text-slate-400 hover:text-slate-600 rounded-md"
              title="Attach assignment or notes"
            >
              <Paperclip className="h-4 w-4" />
            </button>
            <Input
              type="text"
              placeholder={`Message ${activeChannel.name}...`}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 text-xs"
            />
            <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
