import React, { useState, useEffect, useRef } from 'react';
import { Award, Users, GraduationCap, BookOpen, CheckCircle2, Building, MapPin, Sparkles, MonitorCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDepartmentData } from '../context/DataContext';
import { motion, AnimatePresence } from 'motion/react';

const iconMap: Record<string, React.ReactNode> = {
  Award: <Award className="w-6 h-6 text-amber-600" />,
  Users: <Users className="w-6 h-6 text-blue-600" />,
  GraduationCap: <GraduationCap className="w-6 h-6 text-emerald-600" />,
  BookOpen: <BookOpen className="w-6 h-6 text-indigo-600" />,
};

export const StatsCounter: React.FC = () => {
  const { stats: DEPARTMENT_STATS, departmentInfo: DEPARTMENT_INFO } = useDepartmentData();
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>(DEPARTMENT_STATS.map(() => 0));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 1800; // ms
    const steps = 50;
    const stepTime = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCounts(
        DEPARTMENT_STATS.map((stat) => Math.floor(stat.value * easeProgress))
      );
      if (step >= steps) {
        setCounts(DEPARTMENT_STATS.map((stat) => stat.value));
        clearInterval(timer);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [isVisible]);

  const filteredImages = (DEPARTMENT_INFO.imageUrls || []).filter(u => typeof u === 'string' && u.trim().length > 5);
  const images = filteredImages.length > 0
    ? filteredImages
    : [
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1200'
      ];

  const validIndex = currentImageIndex >= images.length ? 0 : currentImageIndex;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section ref={sectionRef} className="py-16 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-wider border border-blue-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
            <span>{DEPARTMENT_INFO.welcomeBadgeText}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 font-heading">
            {DEPARTMENT_INFO.welcomeTitle}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {DEPARTMENT_INFO.welcomeDescription}
          </p>
        </div>

        <div className="mb-14 relative group">
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900 h-72 sm:h-96 md:h-[420px] lg:h-[460px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={images[validIndex]}
                src={images[validIndex]}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                alt="Department"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('photo-1523050854058')) {
                    target.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200';
                  }
                }}
              />
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent pointer-events-none" />

            <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full text-white hover:bg-white/40 cursor-pointer">
                <ChevronLeft />
            </button>
            <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full text-white hover:bg-white/40 cursor-pointer">
                <ChevronRight />
            </button>
            
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold border border-white/20 shadow-sm">
                <Building className="w-3.5 h-3.5 text-amber-400" />
                <span>{DEPARTMENT_INFO.cardHeaderBadgeText}</span>
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 md:p-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="text-white space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-wider uppercase">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{DEPARTMENT_INFO.cardHeaderLocation}</span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-white">
                  {DEPARTMENT_INFO.cardHeaderTitle}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEPARTMENT_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/90 academic-shadow academic-shadow-hover transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-indigo-700 to-amber-500 opacity-80"></div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs group-hover:scale-110 transition-transform duration-200">
                  {iconMap[stat.icon] || <Award className="w-6 h-6 text-blue-600" />}
                </div>
                <span className="text-[11px] font-mono font-bold text-slate-400">
                  METRIC #{idx + 1}
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading flex items-baseline">
                  <span>{counts[idx]}</span>
                  <span className="text-amber-600 ml-0.5">{stat.suffix}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-800">
                  {stat.label}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {stat.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
