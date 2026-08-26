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
  DollarSign,
  Download,
  X
} from 'lucide-react';
import { useDepartmentData } from '../context/DataContext';
import { ResearchArea, Publication } from '../types';
import { downloadResearchPubPDF } from '../utils/downloadHelper';

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
    publications: RESEARCH_PUBLICATIONS
  } = useDepartmentData();
  const [activeTab, setActiveTab] = useState<'areas' | 'publications'>('areas');
  const [selectedArea, setSelectedArea] = useState<ResearchArea | null>(null);
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);

  const handleDownloadCitation = (pub: Publication) => {
    if (pub.pdfUrl) {
      const link = document.createElement('a');
      link.href = pub.pdfUrl;
      link.download = `${pub.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_citation.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      downloadResearchPubPDF(pub);
    }
  };

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
            Advancing boundaries across pure, applied, and computational mathematics with international journal publications, and interdisciplinary collaboration.
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
                  className="p-5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200/90 academic-shadow transition-all space-y-2 group cursor-pointer hover:border-blue-900/40 hover:shadow-xs"
                  onClick={() => setSelectedPub(pub)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded uppercase">
                          {pub.type} • {pub.year}
                        </span>
                        {pub.impactFactor && (
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                            IF: {pub.impactFactor}
                          </span>
                        )}
                        {pub.hIndex && (
                          <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                            H-Index: {pub.hIndex}
                          </span>
                        )}
                        {pub.i10Index && (
                          <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                            i10-Index: {pub.i10Index}
                          </span>
                        )}
                        {pub.scopusId && (
                          <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                            Scopus: {pub.scopusId}
                          </span>
                        )}
                        {pub.specialisation && (
                          <span className="text-[10px] font-semibold bg-pink-100 text-pink-800 px-2 py-0.5 rounded">
                            {pub.specialisation}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors pt-1">
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

                  <div className="pt-2 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="italic font-serif">{pub.journal}</span>
                      {pub.doi && (
                        <span className="text-[11px] font-mono text-blue-800">
                          DOI: {pub.doi}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedPub(pub)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-md text-[11px] transition-colors border border-slate-300 cursor-pointer shadow-xs active:scale-95"
                      >
                        View Full Details
                      </button>
                      <button
                        onClick={() => handleDownloadCitation(pub)}
                        className="px-2.5 py-1 bg-blue-50 hover:bg-blue-900 hover:text-white text-blue-900 font-semibold rounded-md text-[11px] flex items-center gap-1 transition-colors border border-blue-200 hover:border-blue-900 cursor-pointer shadow-xs active:scale-95"
                        title="Download Official Citation & Abstract PDF"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download Citation PDF</span>
                      </button>
                      {pub.paperLink && (
                        <a
                          href={pub.paperLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-900 hover:text-white text-emerald-900 font-semibold rounded-md text-[11px] flex items-center gap-1 transition-colors border border-emerald-200 hover:border-emerald-900 cursor-pointer shadow-xs active:scale-95"
                          title="Open Full Paper / Publisher Link"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Open Link</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Detailed Publication View Modal */}
      {selectedPub && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-5 border-b border-slate-200/80 flex items-center justify-between bg-slate-50">
              <div className="space-y-1">
                <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {selectedPub.type} • Published in {selectedPub.year}
                </span>
                <h3 className="text-sm font-bold text-slate-900 font-heading pt-1">
                  Research Publication Details
                </h3>
              </div>
              <button
                onClick={() => setSelectedPub(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-xl transition-all cursor-pointer active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6 overflow-y-auto text-xs text-slate-700">
              <div className="space-y-2">
                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {selectedPub.title}
                </h4>
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <span className="font-semibold text-slate-800 block mb-0.5">Authors:</span>
                  <p className="text-slate-600 font-medium">{selectedPub.authors}</p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-slate-50/50 border border-slate-200 rounded-xl space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Journal / Volume</span>
                  <p className="font-serif italic text-slate-900 text-xs font-semibold">{selectedPub.journal}</p>
                </div>

                <div className="p-3.5 bg-slate-50/50 border border-slate-200 rounded-xl space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Specialisation</span>
                  <p className="font-semibold text-slate-900">{selectedPub.specialisation || 'Not Specified'}</p>
                </div>

                <div className="p-3.5 bg-slate-50/50 border border-slate-200 rounded-xl space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">DOI Identifier</span>
                  <p className="font-mono text-blue-900 font-semibold">{selectedPub.doi || 'Not Available'}</p>
                </div>

                <div className="p-3.5 bg-slate-50/50 border border-slate-200 rounded-xl space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Impact Factor</span>
                  <p className="font-mono text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md inline-block">
                    {selectedPub.impactFactor || 'N/A'}
                  </p>
                </div>
              </div>

              {/* Indexing Metrics Card */}
              <div className="p-4 bg-blue-50/40 border border-blue-100 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-blue-950 block">Bibliometric Indexes</span>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white p-2.5 rounded-xl border border-blue-100">
                    <span className="text-[10px] text-slate-500 block uppercase">H-Index</span>
                    <span className="font-bold text-slate-900 text-sm">{selectedPub.hIndex || '-'}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-blue-100">
                    <span className="text-[10px] text-slate-500 block uppercase">i10-Index</span>
                    <span className="font-bold text-slate-900 text-sm">{selectedPub.i10Index || '-'}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-blue-100">
                    <span className="text-[10px] text-slate-500 block uppercase">Scopus ID</span>
                    <span className="font-mono font-bold text-slate-900 text-xs overflow-hidden text-ellipsis block whitespace-nowrap" title={selectedPub.scopusId}>
                      {selectedPub.scopusId || '-'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400">
                Mathematics Research Archives • Dudhnoi College
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleDownloadCitation(selectedPub)}
                  className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Citation PDF</span>
                </button>
                {selectedPub.paperLink && (
                  <a
                    href={selectedPub.paperLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Research Paper</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
