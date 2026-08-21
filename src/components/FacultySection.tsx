import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Award,
  ExternalLink,
  X,
  Clock,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { useDepartmentData } from '../context/DataContext';
import { FacultyMember } from '../types';

export const FacultySection: React.FC = () => {
  const { faculty: FACULTY_DATA, setIsAdminOpen } = useDepartmentData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All Faculty');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);

  const categories = [
    'All Faculty',
    'Assistant Professors',
    'Guest Faculty'
  ];

  const filteredFaculty = useMemo(() => {
    return FACULTY_DATA.filter((faculty) => {
      // Category filter
      let matchesCategory = true;
      if (selectedCategory === 'Assistant Professors') {
        matchesCategory = faculty.designation === 'Assistant Professor';
      } else if (selectedCategory === 'Guest Faculty') {
        matchesCategory = faculty.designation === 'Guest Faculty' || faculty.designation.toLowerCase().includes('guest');
      }

      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        faculty.name.toLowerCase().includes(q) ||
        faculty.specialization.toLowerCase().includes(q) ||
        faculty.qualification.toLowerCase().includes(q) ||
        faculty.researchInterests.some((r) => r.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="faculty" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-wider border border-blue-200">
            <Users className="w-3.5 h-3.5 text-blue-800" />
            <span>Academic Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 font-heading">
            Meet Our Faculty Members
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Our distinguished faculty comprises dedicated researchers, Olympiad trainers, and passionate educators with doctorates and master’s degrees from premier institutions.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100/90 rounded-xl border border-slate-200/80 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search faculty or domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

        </div>

        {/* Faculty Grid */}
        {filteredFaculty.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <Users className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No faculty members found</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting the filter or search query.</p>
            <button
              onClick={() => {
                setSelectedCategory('All Faculty');
                setSearchQuery('');
              }}
              className="mt-3 px-3 py-1.5 bg-blue-900 text-white text-xs rounded-md font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFaculty.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden academic-shadow academic-shadow-hover flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  {/* Photo & HOD / Designation Badge */}
                  <div className="relative h-60 bg-slate-100 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                    {member.isHod && (
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-slate-950 shadow-md">
                        HOD
                      </span>
                    )}

                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-900/80 text-white backdrop-blur-xs border border-white/10">
                      {member.designation}
                    </span>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="text-base font-bold tracking-tight text-white">
                        {member.name}
                      </h3>
                      <p className="text-[11px] text-blue-200 font-medium">
                        {member.qualification}
                      </p>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Specialization
                      </span>
                      <p className="text-xs font-medium text-slate-800 leading-snug line-clamp-2 mt-0.5">
                        {member.specialization}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 truncate">
                        <Mail className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                        <span className="truncate text-[11px]">{member.email}</span>
                      </div>
                      {member.roomNo && (
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="text-[11px] truncate">{member.roomNo}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer Button */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => setSelectedFaculty(member)}
                    className="w-full py-2 bg-slate-100 hover:bg-blue-900 text-slate-700 hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer group-hover:border-blue-900"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Detailed Faculty Profile Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-5">
              <div className="flex items-start gap-4">
                <img
                  src={selectedFaculty.image}
                  alt={selectedFaculty.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-blue-900 shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                      {selectedFaculty.name}
                    </h3>
                    {selectedFaculty.isHod && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950">
                        HOD
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-blue-900 mt-0.5">
                    {selectedFaculty.designation} • Department of Mathematics
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    {selectedFaculty.qualification}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedFaculty(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                aria-label="Close profile"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Biography */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-blue-900" />
                <span>Academic Profile & Biography</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedFaculty.bio}
              </p>
            </div>

            {/* Research Interests */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Research Interests & Domain</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedFaculty.researchInterests.map((interest, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-blue-50 text-blue-900 border border-blue-200 rounded-md text-xs font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Publications */}
            {selectedFaculty.recentPublications && selectedFaculty.recentPublications.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Selected Publications</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside">
                  {selectedFaculty.recentPublications.map((pub, i) => (
                    <li key={i} className="leading-snug italic">
                      {pub}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Courses Taught */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Courses Taught (FYUGP & PG)</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedFaculty.coursesTaught.map((course, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-md text-xs"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

            {/* Office & Contact Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-semibold text-slate-500 block">Email Address</span>
                <a href={`mailto:${selectedFaculty.email}`} className="text-blue-900 font-bold hover:underline">
                  {selectedFaculty.email}
                </a>
              </div>

              {selectedFaculty.phone && (
                <div>
                  <span className="font-semibold text-slate-500 block">Phone</span>
                  <span className="text-slate-800 font-medium">{selectedFaculty.phone}</span>
                </div>
              )}

              {selectedFaculty.roomNo && (
                <div>
                  <span className="font-semibold text-slate-500 block">Office Room</span>
                  <span className="text-slate-800 font-medium">{selectedFaculty.roomNo}</span>
                </div>
              )}

              {selectedFaculty.officeHours && (
                <div>
                  <span className="font-semibold text-slate-500 block">Office Consultation Hours</span>
                  <span className="text-slate-800 font-medium flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {selectedFaculty.officeHours}
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedFaculty(null)}
                className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Close Profile
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
