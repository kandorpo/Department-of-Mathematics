import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Save,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Tag,
  User,
  Clock,
  BookOpen,
  Calendar,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  FileText
} from 'lucide-react';
import { BlogPost, BlogCategory } from '../types';

interface BlogEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: BlogPost) => void;
  initialPost?: BlogPost | null;
}

const CATEGORIES: BlogCategory[] = [
  'Research Insights',
  'Student Articles',
  'Faculty Corner',
  'History of Math',
  'Olympiad & Problem Solving',
  'Computational Math & Tech'
];

const PRESET_COVERS = [
  {
    label: 'Calculus & Code',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800'
  },
  {
    label: 'Sacred Geometry & Theory',
    url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800'
  },
  {
    label: 'Library & Exam Prep',
    url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800'
  },
  {
    label: 'Differential Equations & Bio',
    url: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=800'
  },
  {
    label: 'Chalkboard Mathematics',
    url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800'
  },
  {
    label: 'Abstract Topology & Cosmos',
    url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=800'
  }
];

export const BlogEditorModal: React.FC<BlogEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialPost
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<BlogCategory>('Research Insights');
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState<'Faculty' | 'Student' | 'Alumni' | 'Guest Scholar'>('Faculty');
  const [authorAvatar, setAuthorAvatar] = useState('');
  const [date, setDate] = useState('');
  const [readTime, setReadTime] = useState('5 min read');
  const [coverImage, setCoverImage] = useState(PRESET_COVERS[0].url);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [featured, setFeatured] = useState(false);
  const [error, setError] = useState('');
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialPost) {
      setTitle(initialPost.title);
      setCategory(initialPost.category);
      setAuthorName(initialPost.authorName);
      setAuthorRole(initialPost.authorRole);
      setAuthorAvatar(initialPost.authorAvatar || '');
      setDate(initialPost.date);
      setReadTime(initialPost.readTime);
      setCoverImage(initialPost.coverImage);
      setExcerpt(initialPost.excerpt);
      setContent(initialPost.content);
      setTagsInput(initialPost.tags.join(', '));
      setFeatured(!!initialPost.featured);
    } else {
      // Default initial values for new blog post
      const today = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      setTitle('');
      setCategory('Research Insights');
      setAuthorName('');
      setAuthorRole('Faculty');
      setAuthorAvatar('');
      setDate(today);
      setReadTime('5 min read');
      setCoverImage(PRESET_COVERS[0].url);
      setExcerpt('');
      setContent('');
      setTagsInput('Mathematics, Dudhnoi College, Research');
      setFeatured(false);
    }
    setError('');
  }, [initialPost, isOpen]);

  if (!isOpen) return null;

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    if (file.size > 6 * 1024 * 1024) {
      alert('File size exceeds 6MB. Please choose a smaller image.');
      return;
    }

    setImageUploadLoading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCoverImage(event.target.result as string);
      }
      setImageUploadLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Please provide a title for the blog article.');
      return;
    }
    if (!authorName.trim()) {
      setError('Please provide the author name.');
      return;
    }
    if (!excerpt.trim()) {
      setError('Please provide a short summary/excerpt.');
      return;
    }
    if (!content.trim()) {
      setError('Please enter the full article content.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const postToSave: BlogPost = {
      id: initialPost ? initialPost.id : `blog-${Date.now()}`,
      title: title.trim(),
      slug: slug || `post-${Date.now()}`,
      category,
      authorName: authorName.trim(),
      authorRole,
      authorAvatar: authorAvatar.trim() || undefined,
      date: date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: readTime.trim() || '4 min read',
      coverImage: coverImage || PRESET_COVERS[0].url,
      excerpt: excerpt.trim(),
      content: content.trim(),
      tags: tags.length > 0 ? tags : ['Mathematics'],
      likesCount: initialPost ? initialPost.likesCount : Math.floor(10 + Math.random() * 20),
      featured
    };

    onSave(postToSave);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 p-5 sm:p-7 space-y-5">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-900 text-amber-400 rounded-xl shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {initialPost ? 'Edit Blog Article' : 'Department Blog Authoring'}
              </span>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                {initialPost ? 'Update Department Blog Post' : 'Publish New Mathematical Article'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Article Title */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Article Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Exploring Non-Euclidean Geometry in Modern General Relativity"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Category & Author Role Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Category / Column *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as BlogCategory)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Author Role / Affiliation *
              </label>
              <select
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none"
              >
                <option value="Faculty">Faculty Member</option>
                <option value="Student">Department Student</option>
                <option value="Alumni">Distinguished Alumni</option>
                <option value="Guest Scholar">Guest Scholar / Visiting Professor</option>
              </select>
            </div>
          </div>

          {/* Author Name, Date & Estimated Read Time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Author Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Bidyut Kalita or Ankur J. Rabha"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Publication Date
              </label>
              <input
                type="text"
                placeholder="e.g. August 20, 2026"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Estimated Reading Time
              </label>
              <input
                type="text"
                placeholder="e.g. 5 min read"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none"
              />
            </div>
          </div>

          {/* Cover Image Selector & Custom Upload */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-blue-900" />
                <span>Featured Cover Image</span>
              </label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1 bg-white hover:bg-slate-100 text-blue-900 border border-slate-300 rounded-lg font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload From Device</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              {coverImage && (
                <img
                  src={coverImage}
                  alt="Cover Preview"
                  className="w-full sm:w-36 h-20 rounded-lg object-cover border border-slate-300 shadow-2xs shrink-0"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="w-full space-y-1.5">
                <input
                  type="text"
                  placeholder="Or paste an image URL (https://...)"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 outline-none focus:ring-1 focus:ring-blue-900"
                />
                
                {/* Preset quick buttons */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] text-slate-500 font-medium">Presets:</span>
                  {PRESET_COVERS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCoverImage(preset.url)}
                      className={`text-[10px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                        coverImage === preset.url
                          ? 'bg-blue-900 text-white border-blue-900 font-bold'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Excerpt / Summary */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-800">
                Short Excerpt / Teaser Summary *
              </label>
              <span className="text-[11px] text-slate-400">
                Shown on the blog cards & preview grids
              </span>
            </div>
            <textarea
              rows={2}
              required
              placeholder="Provide a concise 1-2 sentence overview of the article's core arguments or findings..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none resize-none"
            ></textarea>
          </div>

          {/* Full Article Content */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-800">
                Full Article Content & Mathematical Discussion *
              </label>
              <span className="text-[11px] text-slate-400">
                Supports headings (###), paragraphs, and lists
              </span>
            </div>
            <textarea
              rows={8}
              required
              placeholder="Write or paste your full article here. Use ### for subheadings, bullet points with -, and math expressions..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none font-sans text-xs leading-relaxed"
            ></textarea>
          </div>

          {/* Tags & Featured Checkbox */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-center">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-slate-500" />
                <span>Keywords & Tags (comma-separated)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Real Analysis, Olympiad, Python, Topology"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none"
              />
            </div>

            <div className="pt-4 sm:pt-6">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-900 focus:ring-blue-900 border-slate-300"
                />
                <span className="font-bold text-slate-800 text-xs">
                  Pin as Featured Article
                </span>
              </label>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{initialPost ? 'Save Article Updates' : 'Publish Article to Blog'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
