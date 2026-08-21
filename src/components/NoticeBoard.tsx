import React, { useState, useMemo } from 'react';
import {
  Bell,
  FileText,
  Calendar,
  AlertCircle,
  Download,
  Search,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useDepartmentData } from '../context/DataContext';
import { NoticeItem } from '../types';

export const NoticeBoard: React.FC = () => {
  const { notices: NOTICES_DATA, setIsAdminOpen } = useDepartmentData();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [viewAllModal, setViewAllModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Latest Notices', 'Examination', 'Circular', 'Seminars & Workshops', 'Admissions'];

  const filteredNotices = useMemo(() => {
    return NOTICES_DATA.filter((n) => {
      const matchesCat = activeCategory === 'All' || n.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        n.title.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q) ||
        (n.refNo && n.refNo.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="notices" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold uppercase tracking-wider border border-amber-200">
              <Bell className="w-3.5 h-3.5 text-amber-700 animate-bounce" />
              <span>Official Departmental Circulars</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 font-heading">
              Notice Board & Circulars
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
              Stay updated with sessional examination routines, Olympiad notifications, merit lists, project deadlines, and administrative orders.
            </p>
          </div>

          <button
            onClick={() => setViewAllModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs rounded-xl transition-colors shadow-xs cursor-pointer self-start md:self-auto"
          >
            <span>View All Notices & Archive</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>

        {/* Category Pills & Search */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search circulars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-900 focus:bg-white outline-none"
            />
          </div>
        </div>

        {/* Notice List Cards */}
        <div className="space-y-3">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => setSelectedNotice(notice)}
              className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group ${
                notice.isUrgent
                  ? 'bg-amber-50/40 hover:bg-amber-50/80 border-amber-200 shadow-xs'
                  : 'bg-slate-50 hover:bg-white border-slate-200/90 academic-shadow-hover'
              }`}
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                    {notice.category}
                  </span>

                  {notice.isNew && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                      New
                    </span>
                  )}

                  {notice.isUrgent && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300">
                      <AlertCircle className="w-3 h-3" />
                      Urgent
                    </span>
                  )}

                  <span className="text-xs text-slate-500 flex items-center gap-1 font-medium ml-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {notice.date}
                  </span>

                  {notice.refNo && (
                    <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                      Ref: {notice.refNo}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                  {notice.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-1">
                  {notice.description}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                <span className="text-xs font-bold text-blue-900 group-hover:underline flex items-center gap-1">
                  <span>Read Notice</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Notice Detail / PDF Preview Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                    {selectedNotice.category}
                  </span>
                  {selectedNotice.isUrgent && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                      Urgent Notice
                    </span>
                  )}
                  <span className="text-xs text-slate-500 font-medium">{selectedNotice.date}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  {selectedNotice.title}
                </h3>
                {selectedNotice.refNo && (
                  <p className="text-xs font-mono text-slate-500">
                    Official Reference: {selectedNotice.refNo}
                  </p>
                )}
              </div>

              <button
                onClick={() => setSelectedNotice(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                aria-label="Close notice"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Official Notice Letterhead Simulator */}
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4 text-xs text-slate-800 leading-relaxed font-sans">
              <div className="text-center border-b border-slate-200 pb-3 space-y-0.5">
                <h4 className="font-bold text-slate-900 uppercase tracking-wide">
                  Department of Mathematics • Dudhnoi College
                </h4>
                <p className="text-[11px] text-slate-500">
                  Dudhnoi, Goalpara, Assam - 783124 | Affiliated to Gauhati University
                </p>
              </div>

              <div className="py-2 space-y-3">
                <p className="text-slate-800 leading-relaxed font-medium">
                  {selectedNotice.description}
                </p>
                <p className="text-slate-600">
                  All concerned students, faculty members, and examination coordinators are requested to note the above instructions carefully. For any clarification, contact the Departmental Office during working hours.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-between items-end text-[11px] text-slate-600">
                <div>
                  <div>Date of Issue: {selectedNotice.date}</div>
                  <div>Issued by: Office of the Head, Dept. of Mathematics</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">Dr. Mukul Chandra Kalita</div>
                  <div>Head, Department of Mathematics</div>
                </div>
              </div>
            </div>

            {/* Download & Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-blue-900" />
                <span>Signed PDF Circular ({selectedNotice.fileSize || '380 KB'})</span>
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    alert(`Downloading official circular: ${selectedNotice.title}`);
                  }}
                  className="flex-1 sm:flex-none px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Signed PDF</span>
                </button>
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* View All Notices Full Archive Modal */}
      {viewAllModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  All Departmental Circulars & Notifications Archive
                </h3>
                <p className="text-xs text-slate-500">Historical repository of all official orders</p>
              </div>
              <button
                onClick={() => setViewAllModal(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {NOTICES_DATA.map((not) => (
                <div
                  key={not.id}
                  onClick={() => {
                    setViewAllModal(false);
                    setSelectedNotice(not);
                  }}
                  className="p-4 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 transition-all cursor-pointer space-y-1"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-[10px]">
                      {not.category}
                    </span>
                    <span className="text-slate-400">{not.date}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800">{not.title}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setViewAllModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg"
              >
                Close Archive
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
