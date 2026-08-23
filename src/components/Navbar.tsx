import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Search,
  Menu,
  X,
  ChevronDown,
  FileText,
  Calendar,
  Award,
  BookOpen,
  Phone,
  Layers,
  Sparkles,
  ExternalLink,
  Sliders,
  Lock,
  Unlock
} from 'lucide-react';
import { useDepartmentData } from '../context/DataContext';

interface NavbarProps {
  activeSection: string;
  onOpenStudentPortal: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onOpenStudentPortal,
  onOpenSearch,
}) => {
  const { departmentInfo: DEPARTMENT_INFO, setIsAdminOpen, isAdminLoggedIn } = useDepartmentData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Faculty', href: '#faculty' },
    { name: 'Courses', href: '#courses' },
    { name: 'Research', href: '#research' },
    { name: 'Events', href: '#events' },
    { name: 'Notices', href: '#notices' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const quickLinks = [
    { title: 'FYUGP NEP 2020 Syllabus', desc: 'Download 4-Year B.Sc. Curriculum', action: onOpenStudentPortal, icon: BookOpen },
    { title: 'Sessional Examination Routine', desc: 'August 2026 Schedule', href: '#notices', icon: FileText },
    { title: 'Ramanujan Math Club', desc: 'Student Activities & Puzzles', href: '#gallery', icon: Sparkles },
    { title: 'National Mathematics Day 2026', desc: 'Symposium & Registration', href: '#events', icon: Calendar },
    { title: 'Assam Academy of Mathematics', desc: 'State Olympiad Portal', href: 'https://aam.org.in', external: true, icon: ExternalLink },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    setQuickLinksOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">

      {/* Main Sticky Navigation */}
      <nav
        className={`w-full bg-white/95 backdrop-blur-md transition-all duration-300 border-b ${
          isScrolled
            ? 'shadow-md border-slate-200/90 py-2.5'
            : 'border-slate-200/60 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Department Branding */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-3 group text-left"
          >
            {/* Academic Crest Emblem */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 flex items-center justify-center text-white shadow-sm border border-blue-800/40 relative overflow-hidden group-hover:scale-105 transition-transform duration-200">
              {DEPARTMENT_INFO.logoUrl ? (
                <img
                  src={DEPARTMENT_INFO.logoUrl}
                  alt="Logo"
                  className="w-full h-full object-contain p-0.5"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-[radial-gradient(#60a5fa_1px,transparent_1px)] [background-size:6px_6px] opacity-20"></div>
                  <span className="text-xl font-serif font-bold text-amber-400 select-none">
                    ∑
                  </span>
                  <span className="absolute bottom-0.5 right-1 text-[8px] font-mono text-blue-200 font-bold">
                    π
                  </span>
                </>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-heading group-hover:text-blue-950 transition-colors">
                  Department of Mathematics
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                Dudhnoi College • Goalpara, Assam
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'text-blue-900 bg-blue-50 font-bold'
                      : 'text-slate-600 hover:text-blue-900 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* Action Buttons: Quick Links, Search, Student Portal */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Quick Links Dropdown */}
            <div className="relative">
              <button
                onClick={() => setQuickLinksOpen(!quickLinksOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-md transition-colors border border-slate-200 cursor-pointer"
              >
                <span>Quick Links</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${quickLinksOpen ? 'rotate-180' : ''}`} />
              </button>

              {quickLinksOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setQuickLinksOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Academic Shortcuts
                      </p>
                    </div>
                    {quickLinks.map((item, idx) => {
                      const Icon = item.icon;
                      if (item.external) {
                        return (
                          <a
                            key={idx}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-2.5 px-3 py-2 text-xs hover:bg-slate-50 text-slate-700 hover:text-blue-900 transition-colors"
                            onClick={() => setQuickLinksOpen(false)}
                          >
                            <Icon className="w-4 h-4 text-blue-800 mt-0.5 shrink-0" />
                            <div>
                              <div className="font-semibold flex items-center gap-1">
                                {item.title}
                                <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                              </div>
                              <div className="text-[11px] text-slate-500">{item.desc}</div>
                            </div>
                          </a>
                        );
                      }
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            if (item.action) item.action();
                            else if (item.href) handleNavClick(item.href);
                            setQuickLinksOpen(false);
                          }}
                          className="w-full flex items-start gap-2.5 px-3 py-2 text-xs hover:bg-slate-50 text-slate-700 hover:text-blue-900 transition-colors text-left cursor-pointer"
                        >
                          <Icon className="w-4 h-4 text-blue-800 mt-0.5 shrink-0" />
                          <div>
                            <div className="font-semibold">{item.title}</div>
                            <div className="text-[11px] text-slate-500">{item.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Quick Search */}
            <button
              onClick={onOpenSearch}
              aria-label="Quick Search"
              className="p-2 text-slate-600 hover:text-blue-900 hover:bg-slate-100 rounded-md transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
              title="Search Faculty, Courses, Notices (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Student Portal CTA */}
            <button
              onClick={onOpenStudentPortal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-900 hover:bg-blue-950 text-white rounded-md text-xs font-semibold shadow-sm transition-all duration-150 active:scale-95 cursor-pointer border border-blue-950"
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Student Portal</span>
            </button>

            {/* Admin CMS Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-150 active:scale-95 cursor-pointer border ${
                isAdminLoggedIn
                  ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
              }`}
              title="Admin Content Management & Live Editor"
            >
              {isAdminLoggedIn ? (
                <Unlock className="w-3.5 h-3.5 text-slate-950" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-slate-600" />
              )}
              <span>{isAdminLoggedIn ? 'Admin CMS' : 'Edit Website'}</span>
            </button>
          </div>

          {/* Mobile Menu & Search Triggers */}
          <div className="flex items-center gap-1.5 xl:hidden">
            <button
              onClick={onOpenSearch}
              aria-label="Search"
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-md"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-2.5 py-1 bg-amber-400 text-slate-950 text-xs font-bold rounded-md flex items-center gap-1 cursor-pointer"
              title="Admin Editor"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>CMS</span>
            </button>
            <button
              onClick={onOpenStudentPortal}
              className="px-2.5 py-1 bg-blue-900 text-white text-xs font-semibold rounded-md flex items-center gap-1"
            >
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Portal</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-blue-900 hover:bg-slate-100 rounded-md cursor-pointer ml-1"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 gap-1 pb-3 border-b border-slate-100">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-left px-3 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 text-blue-900 font-bold border-l-2 border-blue-900'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStudentPortal();
                }}
                className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 shadow-sm"
              >
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>Open Student Portal (Syllabus & PYQs)</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
