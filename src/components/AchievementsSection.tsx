import React, { useState } from 'react';
import {
  Award,
  Trophy,
  Sparkles,
  Medal,
  GraduationCap,
  Star,
  Users,
  CheckCircle2
} from 'lucide-react';
import { useDepartmentData } from '../context/DataContext';
import { AchievementItem } from '../types';

export const AchievementsSection: React.FC = () => {
  const { achievements: ACHIEVEMENTS_DATA, departmentInfo: DEPARTMENT_INFO } = useDepartmentData();
  const [selectedRole, setSelectedRole] = useState<string>('All');

  const roles = ['All', 'Student', 'Faculty', 'Alumni', 'Department'];

  const filteredAchievements = ACHIEVEMENTS_DATA.filter((item) => {
    if (selectedRole === 'All') return true;
    return item.role === selectedRole;
  });

  return (
    <section id="achievements" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider border border-amber-300">
            <Trophy className="w-3.5 h-3.5 text-amber-700" />
            <span>Honors & Accolades</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 font-heading">
            Departmental Achievements & Milestones
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Celebrating the stellar triumphs of our students, alumni, and faculty in national competitive examinations, university gold medals, and research excellence.
          </p>
        </div>

        {/* Role Filter Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-white rounded-xl border border-slate-200 shadow-xs">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedRole === role
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {role === 'All' ? 'All Accolades' : `${role}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        {filteredAchievements.length === 0 ? (
          <div className="text-center py-12 px-4 bg-white border border-dashed border-slate-300 rounded-2xl max-w-xl mx-auto space-y-2">
            <Trophy className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-700">No Achievements Records Listed</h3>
            <p className="text-xs text-slate-500">
              There are currently no accolades or honors listed in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 academic-shadow academic-shadow-hover flex flex-col justify-between group transition-all duration-300 relative overflow-hidden"
              >
                {/* Subtle gold corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-400/10 to-transparent rounded-bl-full pointer-events-none"></div>

                <div className="space-y-4">
                  
                  {/* Header Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 shadow-xs">
                      <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                      <span>{item.badgeText}</span>
                    </span>

                    <span className="text-xs font-mono font-bold text-slate-400">
                      {item.year}
                    </span>
                  </div>

                  {/* Title & Recipient */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {item.role} • {item.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors mt-2">
                      {item.title}
                    </h3>
                    <div className="text-xs font-semibold text-slate-700 mt-1 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-blue-800 shrink-0" />
                      <span>{item.recipient}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Department Record</span>
                  </span>
                  <span className="font-mono text-slate-400">{DEPARTMENT_INFO.college || 'Dudhnoi College'}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
