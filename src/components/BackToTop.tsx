import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScrollPercentage(Math.min(100, Math.max(0, progress)));
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (scrollPercentage / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="fixed bottom-6 right-6 z-40 p-2 rounded-full bg-blue-900 text-white shadow-xl hover:bg-blue-950 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center border border-blue-700 group"
    >
      {/* Circular Progress Ring */}
      <svg className="w-10 h-10 -rotate-90 pointer-events-none" viewBox="0 0 44 44">
        <circle
          cx="22"
          cy="22"
          r="18"
          stroke="currentColor"
          strokeWidth="3"
          className="text-blue-950 opacity-40"
          fill="transparent"
        />
        <circle
          cx="22"
          cy="22"
          r="18"
          stroke="#f59e0b"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-75"
        />
      </svg>

      <ArrowUp className="w-4 h-4 text-white absolute group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
};
