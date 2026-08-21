import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Calendar,
  Clock,
  User,
  Tag,
  Edit3,
  Trash2,
  Sparkles,
  ArrowRight,
  Heart,
  RefreshCw,
  SlidersHorizontal,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { BlogPost, BlogCategory } from '../types';
import { useDepartmentData } from '../context/DataContext';
import { BlogEditorModal } from './BlogEditorModal';
import { BlogReaderModal } from './BlogReaderModal';

const CATEGORY_TABS: (BlogCategory | 'All')[] = [
  'All',
  'Research Insights',
  'Student Articles',
  'Faculty Corner',
  'History of Math',
  'Olympiad & Problem Solving',
  'Computational Math & Tech'
];

export const BlogSection: React.FC = () => {
  const {
    blogs,
    addBlog,
    updateBlog,
    deleteBlog,
    likeBlog,
    resetAllToDefaults
  } = useDepartmentData();
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);
  
  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Add or Update Post Handler
  const handleSavePost = (post: BlogPost) => {
    const exists = blogs.some((b) => b.id === post.id);
    if (exists) {
      updateBlog(post);
      showToast('Blog article updated successfully.');
    } else {
      addBlog(post);
      showToast('New blog article published successfully.');
    }

    // If currently reading this post, update it too
    if (readingPost && readingPost.id === post.id) {
      setReadingPost(post);
    }
  };

  // Delete Post Handler
  const handleDeletePost = (id: string) => {
    deleteBlog(id);
    showToast('Blog post removed.');
    if (readingPost && readingPost.id === id) {
      setReadingPost(null);
    }
  };

  // Like Post Handler
  const handleLikePost = (id: string) => {
    likeBlog(id);
    if (readingPost && readingPost.id === id) {
      setReadingPost({ ...readingPost, likesCount: (readingPost.likesCount || 0) + 1 });
    }
  };

  // Restore Default Posts
  const handleRestoreDefaults = () => {
    if (window.confirm('Reset all blogs to original departmental default articles? Any custom edits will be replaced.')) {
      resetAllToDefaults();
      showToast('Restored departmental default articles.');
    }
  };

  // Filter logic
  const filteredBlogs = blogs.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCategory;

    const matchesSearch =
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.authorName.toLowerCase().includes(query) ||
      post.tags.some((t) => t.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogs.find((b) => b.featured) || blogs[0];

  return (
    <section id="blog" className="py-20 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      
      {/* Decorative background mathematics grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-blue-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 border border-amber-400">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 bg-blue-100 text-blue-900 rounded-lg">
                <BookOpen className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                Departmental Publications & Articles
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 tracking-tight">
              Mathematics Journal & Blog
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Thought leadership, undergraduate project insights, Olympiad strategies, and reflections by faculty members, scholars, and alumni of Dudhnoi College.
            </p>
          </div>

          {/* Action Buttons: Add New Post & Restore Defaults */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                setEditingPost(null);
                setIsEditorOpen(true);
              }}
              className="px-4 py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer border border-blue-800"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Write & Add New Article</span>
            </button>

            <button
              onClick={handleRestoreDefaults}
              title="Reset to default departmental articles"
              className="p-2.5 bg-white hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-300 text-xs transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs mb-8 space-y-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles by title, concept, author, or #tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Total Articles Count Badge */}
            <div className="text-xs text-slate-500 font-medium self-end md:self-center">
              Showing <strong className="text-blue-900 font-bold">{filteredBlogs.length}</strong> of {blogs.length} articles
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {CATEGORY_TABS.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-900 text-white font-bold shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post Hero Banner (if exists and no active search query) */}
        {!searchQuery && selectedCategory === 'All' && featuredPost && (
          <div className="mb-10 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden shadow-xl border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      Featured Department Article
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/10 text-slate-300">
                      {featuredPost.category}
                    </span>
                  </div>

                  <h3
                    onClick={() => setReadingPost(featuredPost)}
                    className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading text-white hover:text-amber-300 transition-colors cursor-pointer leading-snug"
                  >
                    {featuredPost.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    {featuredPost.authorAvatar ? (
                      <img
                        src={featuredPost.authorAvatar}
                        alt={featuredPost.authorName}
                        className="w-8 h-8 rounded-full object-cover border border-amber-400"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-800 text-amber-300 flex items-center justify-center font-bold text-xs">
                        {featuredPost.authorName.charAt(0)}
                      </div>
                    )}
                    <div className="text-xs">
                      <span className="font-bold text-white block">{featuredPost.authorName}</span>
                      <span className="text-[11px] text-slate-400">{featuredPost.date} • {featuredPost.readTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingPost(featuredPost);
                        setIsEditorOpen(true);
                      }}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-slate-200 text-xs rounded-lg font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                      title="Edit this featured article"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => setReadingPost(featuredPost)}
                      className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer transition-transform active:scale-95"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-transparent to-transparent"></div>
              </div>

            </div>
          </div>
        )}

        {/* Blog Cards Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-900 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No Articles Found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              No blog posts matched your query "{searchQuery}". Try searching for another topic or clear the filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold hover:bg-blue-950 cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Card Cover Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                    {/* Category pill on image */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-blue-950 shadow-xs backdrop-blur-xs">
                        {post.category}
                      </span>
                    </div>

                    {/* Quick Edit & Delete floating menu */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingPost(post);
                          setIsEditorOpen(true);
                        }}
                        className="p-1.5 bg-white/90 hover:bg-white text-slate-700 hover:text-blue-900 rounded-lg shadow-sm backdrop-blur-xs transition-colors cursor-pointer"
                        title="Edit this post"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Delete post "${post.title}"?`)) {
                            handleDeletePost(post.id);
                          }
                        }}
                        className="p-1.5 bg-white/90 hover:bg-red-50 text-slate-700 hover:text-red-700 rounded-lg shadow-sm backdrop-blur-xs transition-colors cursor-pointer"
                        title="Delete post"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Date and Read Time overlay */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-slate-200 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-amber-400" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 space-y-3">
                    <h3
                      onClick={() => setReadingPost(post)}
                      className="font-bold font-heading text-base sm:text-lg text-slate-900 group-hover:text-blue-900 transition-colors cursor-pointer leading-snug line-clamp-2"
                    >
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Tags List */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {post.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600 font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-[10px] text-slate-400 font-medium self-center">
                            +{post.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer: Author & Read Button */}
                <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {post.authorAvatar ? (
                      <img
                        src={post.authorAvatar}
                        alt={post.authorName}
                        className="w-7 h-7 rounded-full object-cover border border-slate-300"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-[10px]">
                        {post.authorName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <span className="text-xs font-bold text-slate-800 block leading-tight">
                        {post.authorName}
                      </span>
                      <span className="text-[10px] text-blue-800 font-medium">
                        {post.authorRole}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setReadingPost(post)}
                    className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1 group/btn cursor-pointer"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>

              </article>
            ))}
          </div>
        )}

      </div>

      {/* Editor Modal for Adding / Modifying Posts */}
      <BlogEditorModal
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingPost(null);
        }}
        onSave={handleSavePost}
        initialPost={editingPost}
      />

      {/* Reader Modal for Full Article View */}
      <BlogReaderModal
        isOpen={!!readingPost}
        post={readingPost}
        onClose={() => setReadingPost(null)}
        onEdit={(post) => {
          setEditingPost(post);
          setIsEditorOpen(true);
        }}
        onDelete={handleDeletePost}
        onLike={handleLikePost}
      />

    </section>
  );
};
