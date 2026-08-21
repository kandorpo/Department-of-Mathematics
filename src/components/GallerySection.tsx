import React, { useState } from 'react';
import {
  Image as ImageIcon,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useDepartmentData } from '../context/DataContext';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const { gallery: GALLERY_DATA } = useDepartmentData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    'All',
    'Department Events',
    'Cultural Events',
    'Classroom',
    'Magazine',
    'Seminars',
    'Student Activities',
    'Math Day'
  ];

  const filteredGallery = GALLERY_DATA.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredGallery.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-wider border border-blue-200">
            <ImageIcon className="w-3.5 h-3.5 text-blue-800" />
            <span>Visual Glimpses</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 font-heading">
            Departmental Life & Event Gallery
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Memories from Ramanujan Day celebrations, computer laboratory practicals, annual magazine releases, and student problem-solving seminars.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredGallery.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer h-64 flex flex-col justify-end"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent group-hover:from-slate-950/95 transition-colors"></div>

              {/* Category Pill on top */}
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/80 text-blue-200 backdrop-blur-xs border border-white/10 uppercase tracking-wider">
                {item.category}
              </span>

              <div className="relative p-4 text-white space-y-1 z-10">
                <div className="flex items-center gap-1 text-[10px] text-amber-300 font-medium">
                  <Calendar className="w-3 h-3" />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-xs font-bold leading-snug line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-300 line-clamp-1 group-hover:line-clamp-2 transition-all">
                  {item.caption}
                </p>
              </div>

              <div className="absolute top-3 right-3 p-1.5 bg-white/20 backdrop-blur-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-white">
                <ZoomIn className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl space-y-3"
          >
            {/* Top Close Bar */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800 text-white">
              <div>
                <span className="text-[10px] font-mono uppercase bg-blue-900 text-blue-200 px-2 py-0.5 rounded border border-blue-700">
                  {filteredGallery[lightboxIndex].category}
                </span>
                <h4 className="text-sm font-bold text-white mt-1">
                  {filteredGallery[lightboxIndex].title}
                </h4>
              </div>

              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Container */}
            <div className="relative h-[55vh] sm:h-[65vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={filteredGallery[lightboxIndex].image}
                alt={filteredGallery[lightboxIndex].title}
                className="max-h-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />

              {/* Prev / Next Controls */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 transition-colors cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 transition-colors cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Caption & Date Footer */}
            <div className="p-4 bg-slate-950 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-300 gap-2 border-t border-slate-800">
              <p className="max-w-2xl">{filteredGallery[lightboxIndex].caption}</p>
              <div className="text-amber-400 text-[11px] font-mono shrink-0">
                {filteredGallery[lightboxIndex].date} ({lightboxIndex + 1} of {filteredGallery.length})
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
