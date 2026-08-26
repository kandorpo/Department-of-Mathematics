import React, { useState } from 'react';
import {
  ArrowRight,
  Users,
  Compass,
  Sparkles,
  BookOpen,
  ChevronRight,
  Terminal,
  Activity,
  Award
} from 'lucide-react';
import { MathCanvas } from './MathCanvas';
import { useDepartmentData } from '../context/DataContext';

interface HeroProps {
  onExploreClick: () => void;
  onFacultyClick: () => void;
  onOpenPortal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onFacultyClick,
  onOpenPortal,
}) => {
  const { departmentInfo: DEPARTMENT_INFO } = useDepartmentData();
  const [activeFormula, setActiveFormula] = useState(0);
  
  const foundations = DEPARTMENT_INFO.heroFoundations;
  const equations = foundations.equations;

  const headerBgImage = (DEPARTMENT_INFO.imageUrls && DEPARTMENT_INFO.imageUrls.length > 0 && DEPARTMENT_INFO.imageUrls[0].trim().length > 5)
    ? DEPARTMENT_INFO.imageUrls[0]
    : null;

  return (
    <section id="home" className="relative bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden py-16 sm:py-24 lg:py-28">
      {/* Header Department Background Image */}
      {headerBgImage && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={headerBgImage}
            alt="Department Header Banner"
            className="w-full h-full object-cover object-center opacity-25"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-blue-950/80 to-slate-950/95" />
        </div>
      )}

      {/* Interactive Math Canvas Background */}
      <MathCanvas />

      {/* Decorative Radial Lighting Overlays */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy & CTAs */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* University Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/60 border border-blue-700/50 text-blue-200 text-xs font-semibold backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>DUDHNOI COLLEGE • ESTABLISHED 1972</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-heading">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-sky-100 to-amber-200">
                  {DEPARTMENT_INFO.heroTitle}
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-amber-300/90 font-serif-title tracking-wide">
                {DEPARTMENT_INFO.heroSubtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              {DEPARTMENT_INFO.heroDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-lg shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <span>Explore Department</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onFacultyClick}
                className="px-6 py-3 bg-slate-800/80 hover:bg-slate-700/90 text-slate-100 font-semibold text-sm rounded-lg border border-slate-700 hover:border-slate-500 backdrop-blur-md flex items-center gap-2 transition-all duration-200 cursor-pointer"
              >
                <Users className="w-4 h-4 text-sky-400" />
                <span>Meet Our Faculty</span>
              </button>
            </div>



          </div>

          {/* Right Side: Interactive Mathematical Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-blue-950/80 p-6 border border-slate-700/80 shadow-2xl backdrop-blur-xl space-y-5">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-300">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wide">
                      {foundations.title}
                    </h3>
                    <p className="text-[11px] text-slate-400">{foundations.subtitle}</p>
                  </div>
                </div>

                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-700/40 rounded">
                  LIVE REPO
                </span>
              </div>

              {/* Equation Showcase Switcher */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-3 relative overflow-hidden">
                <div className="absolute top-2 right-2 text-[10px] font-mono text-slate-500">
                  EQ #{activeFormula + 1}/4
                </div>

                <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-widest">
                  {equations[activeFormula].name}
                </div>

                <div className="py-2 text-2xl sm:text-3xl font-serif text-white tracking-wider font-academic select-none">
                  {equations[activeFormula].formula}
                </div>

                <p className="text-xs text-slate-400 italic">
                  "{equations[activeFormula].desc}"
                </p>

                {/* Equation Selector Dots */}
                <div className="flex justify-center gap-1.5 pt-2">
                  {equations.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveFormula(i)}
                      className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                        activeFormula === i
                          ? 'w-6 bg-amber-400'
                          : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                      aria-label={`Show formula ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Academic Info Grid */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/50">
                  <div className="text-[11px] text-slate-400 font-medium">{foundations.curriculumModel.title}</div>
                  <div className="text-xs font-bold text-white mt-0.5">{foundations.curriculumModel.value}</div>
                  <div className="text-[10px] text-sky-400 mt-1">{foundations.curriculumModel.subtitle}</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/50">
                  <div className="text-[11px] text-slate-400 font-medium">{foundations.researchCell.title}</div>
                  <div className="text-xs font-bold text-white mt-0.5">{foundations.researchCell.value}</div>
                  <div className="text-[10px] text-emerald-400 mt-1">{foundations.researchCell.subtitle}</div>
                </div>
              </div>

              {/* Student Portal Link inside hero */}
              <button
                onClick={onOpenPortal}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-900/50 hover:bg-blue-900/80 border border-blue-600/40 text-xs font-semibold text-blue-200 flex items-center justify-between group transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-amber-400" />
                  <span>Access Class Routines, Syllabus & Question Papers</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
