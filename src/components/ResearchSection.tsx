import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  Award,
  BookOpen,
  FileText,
  ExternalLink,
  ChevronRight,
  Cpu,
  Waves,
  Network,
  Binary,
  Activity,
  GitBranch,
  BarChart3,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { useDepartmentData } from '../context/DataContext';
import { ResearchArea } from '../types';

const areaIconMap: Record<string, React.ReactNode> = {
  Waves: <Waves className="w-5 h-5 text-blue-700" />,
  Network: <Network className="w-5 h-5 text-indigo-700" />,
  Binary: <Binary className="w-5 h-5 text-amber-700" />,
  Activity: <Activity className="w-5 h-5 text-emerald-700" />,
  GitBranch: <GitBranch className="w-5 h-5 text-sky-700" />,
  BarChart3: <BarChart3 className="w-5 h-5 text-purple-700" />,
  Layers: <Layers className="w-5 h-5 text-rose-700" />,
  Cpu: <Cpu className="w-5 h-5 text-teal-700" />,
};

export const ResearchSection: React.FC = () => {
  const {
    researchAreas: RESEARCH_AREAS,
    publications: RESEARCH_PUBLICATIONS,
    researchProjects: RESEARCH_PROJECTS
  } = useDepartmentData();
  const [activeTab, setActiveTab] = useState<'areas' | 'publications' | 'projects'>('areas');
  const [selectedArea, setSelectedArea] = useState<ResearchArea | null>(null);

  return (
    <section id="research" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-wider border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-800" />
            <span>Scholarly Output & Innovation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 font-heading">
            Research & Academic Thrust Areas
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Advancing boundaries across pure, applied, and computational mathematics with funded research grants, international journal publications, and interdisciplinary collaboration.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setActiveTab('areas')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'areas'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Research Thrust Areas ({RESEARCH_AREAS.length})
            </button>
            <button
              onClick={() => setActiveTab('publications')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'publications'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Recent Publications
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Funded Projects & Grants
            </button>
          </div>
        </div>

        {/* Tab 1: Research Thrust Areas */}
        {activeTab === 'areas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
            {RESEARCH_AREAS.map((area) => (
              <div
                key={area.id}
                className="p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/90 academic-shadow academic-shadow-hover flex flex-col justify-between transition-all duration-300 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs group-hover:scale-110 transition-transform">
                      {areaIconMap[area.iconName] || <Layers className="w-5 h-5 text-blue-700" />}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded-full">
                      {area.activeProjectsCount} Projects
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                    {area.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {area.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Key Topics
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {area.keyTopics.slice(0, 3).map((topic, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-200/60 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Investigators: </span>
                  {area.facultyInvolved.join(', ')}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Recent Publications */}
        {activeTab === 'publications' && (
          <div className="space-y-4 max-w-4xl mx-auto animate-in fade-in duration-300">
            <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-blue-950 font-bold">
                <BookOpen className="w-4 h-4 text-blue-800" />
                <span>Peer-Reviewed Journal Papers & Book Chapters</span>
              </div>
              <span className="text-blue-800 font-semibold">Indexed in Scopus, WoS & UGC-CARE</span>
            </div>

            <div className="space-y-3">
              {RESEARCH_PUBLICATIONS.map((pub, idx) => (
                <div
                  key={pub.id}
                  className="p-5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200/90 academic-shadow transition-all space-y-2 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded uppercase">
                          {pub.type} • {pub.year}
                        </span>
                        {pub.impactFactor && (
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                            IF: {pub.impactFactor}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                        {pub.title}
                      </h4>
                      <p className="text-xs text-slate-600">
                        {pub.authors}
                      </p>
                    </div>

                    <span className="text-xs font-mono font-bold text-slate-400 shrink-0">
                      #{idx + 1}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                    <span className="italic font-serif">{pub.journal}</span>
                    {pub.doi && (
                      <span className="text-[11px] font-mono text-blue-800">
                        DOI: {pub.doi}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Funded Projects & Grants */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {RESEARCH_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      proj.status === 'Ongoing'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {proj.status}
                    </span>

                    <span className="text-xs font-bold text-blue-900 font-mono">
                      {proj.duration}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {proj.title}
                  </h4>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span><strong>Agency:</strong> {proj.fundingAgency}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                      <span><strong>Lead PI:</strong> {proj.investigator}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Sanctioned Outlay</span>
                  <span className="font-bold text-slate-900 font-mono text-sm bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                    {proj.grantAmount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
