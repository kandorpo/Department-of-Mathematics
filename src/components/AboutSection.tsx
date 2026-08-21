import React, { useState } from 'react';
import {
  Eye,
  Target,
  ShieldCheck,
  Building2,
  Sparkles,
  BookOpen,
  ArrowRight,
  X,
  Laptop,
  CheckCircle,
  Quote,
  Library
} from 'lucide-react';
import { useDepartmentData } from '../context/DataContext';

export const AboutSection: React.FC = () => {
  const { departmentInfo: DEPARTMENT_INFO } = useDepartmentData();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="about" className="py-20 bg-slate-50 relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Departmental Profile</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 font-heading">
              About the Department
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
              Nurturing generations of mathematical thinkers, researchers, and educators through five decades of academic distinction.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 text-blue-900 border border-slate-300 font-semibold text-xs rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <span>Read Full History & Facilities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Two-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Visual Representation & HOD Quote */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Classroom / Lab Image Card */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-300 shadow-md group">
              <img
                src={DEPARTMENT_INFO.aboutImageUrl || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=900"}
                alt="Mathematics Department Lecture Hall and Classroom"
                className="w-full h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('photo-1524178232363')) {
                    target.src = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=900";
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 text-xs font-medium text-amber-300 mb-1">
                  <Library className="w-4 h-4" />
                  <span>Science Block • Dudhnoi College</span>
                </div>
                <h4 className="text-base font-bold">
                  Modern Pedagogical & Computing Infrastructure
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Interactive lecture rooms, research workstations & 2,800+ volume seminar library.
                </p>
              </div>
            </div>

            {/* HOD Message Box */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
              <Quote className="w-8 h-8 text-blue-200 absolute top-4 right-4" />
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                  alt={`${DEPARTMENT_INFO.hodName} - HOD`}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-900"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{DEPARTMENT_INFO.hodName}</h4>
                  <p className="text-xs text-slate-500">{DEPARTMENT_INFO.hodTitle}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "{DEPARTMENT_INFO.hodMessage.substring(0, 220)}..."
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="text-xs font-bold text-blue-900 hover:text-blue-700 mt-3 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Read Full Message</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>

          {/* Right Column: Overview, Vision, Mission & Core Values */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Overview */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Academic Legacy & Departmental Philosophy
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {DEPARTMENT_INFO.aboutOverview}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {DEPARTMENT_INFO.aboutLegacy}
              </p>
            </div>

            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Vision Card */}
              <div className="p-5 rounded-xl bg-blue-900 text-white shadow-sm space-y-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-800 flex items-center justify-center text-amber-400">
                  <Eye className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white tracking-wide uppercase">
                  Our Vision
                </h4>
                <p className="text-xs text-blue-100 leading-relaxed">
                  {DEPARTMENT_INFO.vision}
                </p>
              </div>

              {/* Mission Card */}
              <div className="p-5 rounded-xl bg-slate-900 text-white shadow-sm space-y-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sky-400">
                  <Target className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white tracking-wide uppercase">
                  Our Mission
                </h4>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Impart comprehensive and rigorous mathematical training.</li>
                  <li>Promote research culture & Olympiad problem-solving.</li>
                  <li>Bridge abstract mathematics with scientific computing.</li>
                </ul>
              </div>

            </div>

            {/* Core Values 2x2 Grid */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Core Values
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DEPARTMENT_INFO.coreValues.map((val, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                      <span className="text-xs font-bold text-slate-800">{val.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed pl-5">
                      {val.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Full History & Facilities Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Department Archives</span>
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  Comprehensive Departmental Profile & Infrastructure
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* HOD Full Note */}
            <div className="p-5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
              <h4 className="text-sm font-bold text-blue-950">
                Message from the Head of the Department
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {DEPARTMENT_INFO.hodMessage}
              </p>
              <div className="pt-2 text-xs font-bold text-slate-900">
                — {DEPARTMENT_INFO.hodName}, {DEPARTMENT_INFO.hodTitle}
              </div>
            </div>

            {/* Department Facilities */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Laptop className="w-4 h-4 text-blue-900" />
                <span>Departmental Facilities & Infrastructure</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DEPARTMENT_INFO.facilities.map((fac, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{fac.name}</span>
                    </div>
                    <p className="text-xs text-slate-600">{fac.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* University Affiliation & NEP 2020 Model */}
            <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-700 space-y-2 border border-slate-200">
              <div className="font-bold text-slate-900">Affiliation & Accreditation</div>
              <p>
                Dudhnoi College is affiliated to Gauhati University, approved under Section 2(f) and 12(B) of the UGC Act, 1956, and accredited Grade A by NAAC. The Department of Mathematics strictly implements the FYUGP curriculum framework prescribed by Gauhati University and Assam Higher Education Council.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 bg-blue-900 text-white text-xs font-bold rounded-lg hover:bg-blue-950 transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
