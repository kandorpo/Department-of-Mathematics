import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Users,
  BookOpen,
  Calendar,
  Bell,
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';
import { useDepartmentData } from '../context/DataContext';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const {
    faculty: FACULTY_DATA,
    courses: COURSES_DATA,
    notices: NOTICES_DATA,
    events: EVENTS_DATA,
    researchAreas: RESEARCH_AREAS,
    blogs: DEFAULT_BLOG_POSTS
  } = useDepartmentData();
  const [query, setQuery] = useState('');

  // Keyboard shortcut Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return null;

    const faculty = FACULTY_DATA.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.specialization.toLowerCase().includes(q) ||
        f.designation.toLowerCase().includes(q)
    ).map((f) => ({ type: 'Faculty', title: f.name, desc: `${f.designation} • ${f.specialization}`, section: 'faculty' }));

    const courses = COURSES_DATA.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    ).map((c) => ({ type: 'Course', title: `${c.code}: ${c.name}`, desc: `${c.semester} • ${c.credits} Credits`, section: 'courses' }));

    const notices = NOTICES_DATA.filter(
      (n) => n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q)
    ).map((n) => ({ type: 'Notice', title: n.title, desc: `${n.category} • ${n.date}`, section: 'notices' }));

    const events = EVENTS_DATA.filter(
      (e) => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
    ).map((e) => ({ type: 'Event', title: e.title, desc: `${e.category} • ${e.date}`, section: 'events' }));

    const research = RESEARCH_AREAS.filter(
      (r) => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
    ).map((r) => ({ type: 'Research', title: r.title, desc: r.description, section: 'research' }));

    // Try reading dynamic blogs from localStorage or fallback
    let blogsList = DEFAULT_BLOG_POSTS;
    try {
      const stored = localStorage.getItem('dudhnoi_math_blog_posts');
      if (stored) blogsList = JSON.parse(stored);
    } catch (e) {}

    const blogs = blogsList.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.authorName.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q))
    ).map((b) => ({ type: 'Article', title: b.title, desc: `By ${b.authorName} • ${b.category}`, section: 'blog' }));

    return [...faculty, ...courses, ...blogs, ...notices, ...events, ...research];
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (sectionId: string) => {
    onNavigate(sectionId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden space-y-3 p-4">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search faculty, courses, research, notices, syllabus..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 px-1.5"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results / Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto space-y-1.5 p-1">
          {searchResults === null ? (
            <div className="p-6 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
              <div className="text-xs font-semibold text-slate-700">Quick Academic Search</div>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-600">
                {['Real Analysis', 'Dr. Mukul Kalita', 'Olympiad', 'NEP Syllabus', 'Fluid Dynamics', 'Exam Routine'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-900 text-slate-700 text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No results found for "<span className="font-semibold text-slate-700">{query}</span>"
            </div>
          ) : (
            searchResults.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(item.section)}
                className="w-full p-3 rounded-xl hover:bg-blue-50 text-left transition-colors flex items-center justify-between group cursor-pointer border border-transparent hover:border-blue-200"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 group-hover:bg-blue-100 text-slate-700 group-hover:text-blue-900">
                      {item.type}
                    </span>
                    <span className="text-xs font-bold text-slate-900 group-hover:text-blue-950">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 group-hover:text-slate-700 line-clamp-1">
                    {item.desc}
                  </p>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </button>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-3 py-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Search Departmental Repository</span>
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[10px] text-slate-600">ESC</kbd> to exit</span>
        </div>

      </div>
    </div>
  );
};
