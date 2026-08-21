import React from 'react';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  Sparkles,
  BookOpen,
  Award,
  Globe,
  FileText
} from 'lucide-react';
import { useDepartmentData } from '../context/DataContext';

interface FooterProps {
  onOpenStudentPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenStudentPortal }) => {
  const { departmentInfo: DEPARTMENT_INFO, setIsAdminOpen } = useDepartmentData();
  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const quickLinks = [
    { name: 'Home Overview', href: '#home' },
    { name: 'About Department', href: '#about' },
    { name: 'Faculty Directory', href: '#faculty' },
    { name: 'Undergraduate & PG Courses', href: '#courses' },
    { name: 'Research Thrust Areas', href: '#research' },
    { name: 'Upcoming Events & Seminars', href: '#events' },
    { name: 'Department Notices & Routine', href: '#notices' },
    { name: 'Student & Faculty Accolades', href: '#achievements' },
    { name: 'Photo & Magazine Gallery', href: '#gallery' },
    { name: 'Department Blog & Articles', href: '#blog' },
    { name: 'Contact & Office Hours', href: '#contact' },
  ];

  const academicLinks = [
    { name: 'Dudhnoi College Official Portal', url: 'https://dudhnoicollege.ac.in' },
    { name: 'Gauhati University Examination Portal', url: 'https://gauhati.ac.in' },
    { name: 'Assam Academy of Mathematics (AAM)', url: 'https://aam.org.in' },
    { name: 'National Board for Higher Mathematics (NBHM)', url: 'https://www.nbhm.dae.gov.in' },
    { name: 'University Grants Commission (UGC)', url: 'https://ugc.gov.in' },
    { name: 'SWAYAM / NPTEL Mathematics Courses', url: 'https://nptel.ac.in' },
    { name: 'Ramanujan Mathematical Society', url: 'https://www.ramanujanmathsociety.org' },
    { name: 'DST-SERB Mathematical Sciences', url: 'https://serb.gov.in' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 relative overflow-hidden">
      {/* Decorative math formula background */}
      <div className="absolute inset-0 math-dark-grid opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Department Branding & Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-900 to-indigo-950 flex items-center justify-center text-white border border-blue-700/50 shadow-md">
                <span className="text-xl font-serif font-bold text-amber-400">∑</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight font-heading">
                  Department of Mathematics
                </h3>
                <p className="text-xs text-amber-400 font-medium">
                  Dudhnoi College • Estd. 1972
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Dedicated to academic distinction, foundational proofs, and computational problem-solving. Fostering analytical minds and scientific leadership under Gauhati University and NEP 2020.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                Affiliated to GU
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-amber-400 font-semibold">
                NAAC Grade A
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                UGC 2(f) & 12(B)
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenStudentPortal}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer border border-blue-700"
              >
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>Open Student Resource Portal</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Department Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-slate-400 text-left cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Academic & External Portals (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Academic & Higher Portals
            </h4>
            <ul className="space-y-2 text-xs">
              {academicLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-300 transition-colors flex items-center gap-1.5 text-slate-400 group"
                  >
                    <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-blue-300" />
                    <span className="truncate">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Secretariat (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Department Desk
            </h4>
            
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight">Science Block, Dudhnoi College, Goalpara - 783124, Assam</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-[11px]">+91 (03663) 281432</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="mailto:mathematics@dudhnoicollege.ac.in" className="text-[11px] hover:text-white truncate">
                  mathematics@dudhnoicollege.ac.in
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Mandatory Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-left font-medium">
            ©️ 2026 Department of Mathematics, Dudhnoi College. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hover:text-slate-300 cursor-pointer" onClick={() => scrollToSection('#about')}>
              About
            </span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer" onClick={() => scrollToSection('#courses')}>
              FYUGP Syllabus
            </span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer" onClick={() => scrollToSection('#contact')}>
              Helpdesk
            </span>
            <span>•</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-amber-400 hover:text-amber-300 font-bold cursor-pointer transition-colors"
            >
              🔒 Admin CMS / Edit Website
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
