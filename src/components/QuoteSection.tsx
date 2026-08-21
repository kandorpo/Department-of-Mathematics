import React, { useState, useEffect } from 'react';
import { Quote as QuoteIcon, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { FAMOUS_QUOTES } from '../data/departmentData';

export const QuoteSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % FAMOUS_QUOTES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const quote = FAMOUS_QUOTES[currentIdx];

  return (
    <section className="relative py-20 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden border-y border-slate-800">
      {/* Subtle Background Math Graphics */}
      <div className="absolute inset-0 math-dark-grid opacity-30 pointer-events-none"></div>
      
      {/* Decorative Golden Ratio curves */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-64 h-64 border border-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 border border-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Quote Icon */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-sm mx-auto">
          <QuoteIcon className="w-6 h-6" />
        </div>

        {/* The Quote Statement */}
        <div className="min-h-[120px] flex items-center justify-center">
          <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-academic font-normal italic tracking-wide text-slate-100 max-w-3xl mx-auto leading-relaxed transition-all duration-500">
            "{quote.quote}"
          </blockquote>
        </div>

        {/* Author & Designation */}
        <div className="space-y-1">
          <div className="text-base font-bold text-amber-400 font-heading tracking-wide">
            — {quote.author}
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-widest font-mono">
            {quote.role}
          </div>
        </div>

        {/* Quote Carousel Dots & Controls */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={() => setCurrentIdx((currentIdx - 1 + FAMOUS_QUOTES.length) % FAMOUS_QUOTES.length)}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-1.5">
            {FAMOUS_QUOTES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                  currentIdx === idx ? 'w-6 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Go to quote ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentIdx((currentIdx + 1) % FAMOUS_QUOTES.length)}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Next quote"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
