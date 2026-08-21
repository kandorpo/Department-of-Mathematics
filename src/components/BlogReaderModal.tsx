import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  Heart,
  Share2,
  Edit3,
  Trash2,
  User,
  Tag,
  BookOpen,
  Check,
  Bookmark,
  Sparkles,
  ArrowLeft,
  GraduationCap
} from 'lucide-react';
import { BlogPost } from '../types';

interface BlogReaderModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
  onLike: (id: string) => void;
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({
  post,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onLike
}) => {
  const [copied, setCopied] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  if (!isOpen || !post) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLikeClick = () => {
    if (!hasLiked) {
      onLike(post.id);
      setHasLiked(true);
    }
  };

  // Render markdown-like sections (### headers, lists, paragraphs)
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return <div key={idx} className="h-3" />;
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3
            key={idx}
            className="text-lg font-bold text-slate-900 font-heading mt-6 mb-2 border-l-4 border-amber-400 pl-3"
          >
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2
            key={idx}
            className="text-xl font-bold text-blue-950 font-heading mt-7 mb-3"
          >
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      if (trimmed.startsWith('- ')) {
        return (
          <li key={idx} className="ml-5 text-slate-700 list-disc my-1 leading-relaxed">
            {trimmed.replace('- ', '')}
          </li>
        );
      }
      return (
        <p key={idx} className="text-slate-700 leading-relaxed text-sm my-2">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 p-5 sm:p-8 space-y-6">
        
        {/* Navigation & Actions Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Department Blog</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onEdit(post);
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-900 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
              title="Edit this post"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Article</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this blog post?')) {
                  onDelete(post.id);
                  onClose();
                }
              }}
              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-red-200"
              title="Delete this post"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200">
              {post.category}
            </span>
            {post.featured && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Featured Column
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 leading-tight">
            {post.title}
          </h1>

          {/* Author & Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-3">
              {post.authorAvatar ? (
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-full object-cover border border-amber-400 shadow-2xs"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold">
                  {post.authorName.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-bold text-slate-900">{post.authorName}</p>
                <p className="text-[11px] text-blue-800 font-medium">
                  {post.authorRole} • Department of Mathematics
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.coverImage && (
          <div className="relative rounded-2xl overflow-hidden shadow-md max-h-[380px] bg-slate-900">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover max-h-[380px]"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Lead Excerpt Callout */}
        <div className="p-4 rounded-xl bg-blue-50/70 border-l-4 border-blue-900 text-slate-800 italic text-sm leading-relaxed">
          "{post.excerpt}"
        </div>

        {/* Body Content */}
        <div className="prose max-w-none text-slate-800">
          {renderFormattedContent(post.content)}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              <span>Related Topics:</span>
            </span>
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer Interaction Bar (Clap/Like & Share) */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLikeClick}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                hasLiked
                  ? 'bg-rose-500 text-white shadow-xs scale-105'
                  : 'bg-white hover:bg-rose-50 hover:text-rose-600 text-slate-700 border border-slate-300'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
              <span>{post.likesCount ? post.likesCount + (hasLiked ? 1 : 0) : hasLiked ? 1 : 0} Applauds</span>
            </button>

            <button
              onClick={handleShare}
              className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Article</span>
                </>
              )}
            </button>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-500 block">Dudhnoi College</span>
            <span className="text-xs font-bold text-blue-900">Department of Mathematics</span>
          </div>
        </div>

      </div>
    </div>
  );
};
