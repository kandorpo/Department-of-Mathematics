import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  Layers,
  FileText,
  CheckCircle,
  X,
  Download,
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useDepartmentData } from '../context/DataContext';
import { Course, AcademicLevel } from '../types';
import { downloadCourseSyllabusPDF } from '../utils/downloadHelper';

export const CoursesSection: React.FC = () => {
  const { courses: COURSES_DATA } = useDepartmentData();
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const levelTabs = [
    { label: 'All Programs', value: 'All' },
    { label: 'Undergraduate (FYUGP)', value: 'UG' },
    { label: 'Postgraduate (M.Sc.)', value: 'PG' },
    { label: 'Skill & Add-on', value: 'Add-on' },
  ];

  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        course.name.toLowerCase().includes(q) ||
        course.code.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q);

      return matchesLevel && matchesSearch;
    });
  }, [selectedLevel, searchQuery]);

  return (
    <section id="courses" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-blue-800" />
            <span>Academic Curriculum</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 font-heading">
            Courses & Academic Programs
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Structured under the NEP 2020 FYUGP guidelines of Gauhati University, offering a balanced progression from fundamental calculus and algebra to modern computational simulations.
          </p>
        </div>

        {/* Level Tabs & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 shadow-xs w-full sm:w-auto">
            {levelTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedLevel(tab.value)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
                  selectedLevel === tab.value
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search course code or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all shadow-xs"
            />
          </div>

        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 academic-shadow academic-shadow-hover flex flex-col justify-between group transition-all duration-300 relative"
            >
              <div className="space-y-4">
                
                {/* Header with Code & Credits */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="font-mono font-bold text-xs text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                      {course.code}
                    </span>
                    <span className="ml-2 text-[11px] text-slate-500 font-medium">
                      {course.semester}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                    {course.credits} Credits
                  </span>
                </div>

                {/* Course Title & Type Badge */}
                <div>
                  <div className="inline-block mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {course.type}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                    {course.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {course.description}
                </p>

                {/* Prerequisites snippet if any */}
                {course.prerequisites && (
                  <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="font-semibold text-slate-700">Prerequisite: </span>
                    {course.prerequisites}
                  </div>
                )}

              </div>

              {/* Action Button */}
              <div className="pt-5 border-t border-slate-100 mt-4">
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="w-full py-2 bg-slate-50 hover:bg-blue-900 text-slate-700 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-200 hover:border-blue-900 cursor-pointer"
                >
                  <span>View Syllabus & Textbooks</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom NEP 2020 Note Card */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-bold text-amber-400 flex items-center gap-2 justify-center md:justify-start">
              <Sparkles className="w-4 h-4" />
              <span>FYUGP NEP 2020 Credit Structure & Guidelines</span>
            </h4>
            <p className="text-xs text-slate-300 max-w-2xl">
              Includes Core Major papers, Minor tracks for Physical & Computer Sciences, Skill Enhancement Courses (SEC) in Scientific Python & LaTeX, and Multidisciplinary Courses (MDC).
            </p>
          </div>

          <a
            href="https://gauhati.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold shrink-0 flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
          >
            <span>Gauhati Univ. NEP Matrix</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {selectedCourse.code}
                  </span>
                  <span className="text-xs font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                    {selectedCourse.type}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {selectedCourse.credits} Credits • {selectedCourse.semester}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  {selectedCourse.name}
                </h3>
              </div>

              <button
                onClick={() => setSelectedCourse(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <div className="space-y-1 text-xs text-slate-700 leading-relaxed">
              <p className="text-slate-600">{selectedCourse.description}</p>
              {selectedCourse.prerequisites && (
                <div className="mt-2 text-[11px] text-slate-500">
                  <strong className="text-slate-700">Prerequisite Knowledge:</strong> {selectedCourse.prerequisites}
                </div>
              )}
            </div>

            {/* Syllabus Units */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-900" />
                <span>Unit-wise Detailed Syllabus</span>
              </h4>

              <div className="space-y-2">
                {selectedCourse.syllabusOutline.map((unit, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 text-xs text-slate-700 leading-relaxed font-normal"
                  >
                    {unit}
                  </div>
                ))}
              </div>
            </div>

            {/* Course Outcomes */}
            {selectedCourse.learningOutcomes && selectedCourse.learningOutcomes.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Course Learning Outcomes (CLOs)</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                  {selectedCourse.learningOutcomes.map((clo, i) => (
                    <li key={i}>{clo}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommended Textbooks */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Recommended Standard Textbooks & Reference Literature</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                {selectedCourse.textbooks.map((book, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold">•</span>
                    <span>{book}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
              <span className="text-[11px] text-slate-500">
                Available in Departmental Seminar Library • NEP 2020 Aligned
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => downloadCourseSyllabusPDF(selectedCourse)}
                  className="flex-1 sm:flex-none px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Syllabus PDF</span>
                </button>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="flex-1 sm:flex-none px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
