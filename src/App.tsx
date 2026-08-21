import React, { useState, useEffect } from 'react';
import { DataProvider, useDepartmentData } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsCounter } from './components/StatsCounter';
import { AboutSection } from './components/AboutSection';
import { FacultySection } from './components/FacultySection';
import { CoursesSection } from './components/CoursesSection';
import { ResearchSection } from './components/ResearchSection';
import { EventsSection } from './components/EventsSection';
import { NoticeBoard } from './components/NoticeBoard';
import { AchievementsSection } from './components/AchievementsSection';
import { GallerySection } from './components/GallerySection';
import { BlogSection } from './components/BlogSection';
import { QuoteSection } from './components/QuoteSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { StudentPortalModal } from './components/StudentPortalModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { BackToTop } from './components/BackToTop';
import { AdminCMSModal } from './components/AdminCMSModal';
import { Sliders, Lock, Unlock } from 'lucide-react';

function AppContent() {
  const [activeSection, setActiveSection] = useState('home');
  const [isStudentPortalOpen, setIsStudentPortalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { setIsAdminOpen, isAdminLoggedIn } = useDepartmentData();

  // Scroll spy to update active section in header
  useEffect(() => {
    const sections = [
      'home',
      'about',
      'faculty',
      'courses',
      'research',
      'events',
      'notices',
      'achievements',
      'gallery',
      'blog',
      'contact'
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace('#', ''));
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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-blue-900 selection:text-white">
      {/* Sticky Top Header Navigation */}
      <Navbar
        activeSection={activeSection}
        onOpenStudentPortal={() => setIsStudentPortalOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={() => scrollToSection('about')}
          onFacultyClick={() => scrollToSection('faculty')}
          onOpenPortal={() => setIsStudentPortalOpen(true)}
        />

        {/* Welcome & Live Stats Counter Section */}
        <StatsCounter />

        {/* About the Department */}
        <AboutSection />

        {/* Faculty Directory */}
        <FacultySection />

        {/* Courses & Academic Programs */}
        <CoursesSection />

        {/* Research & Innovation Thrust Areas */}
        <ResearchSection />

        {/* Upcoming & Past Events */}
        <EventsSection />

        {/* Notice Board & Circulars */}
        <NoticeBoard />

        {/* Achievements & Honors */}
        <AchievementsSection />

        {/* Department Gallery & Lightbox */}
        <GallerySection />

        {/* Department Blog & Articles Hub */}
        <BlogSection />

        {/* Full-width Mathematical Quote Banner */}
        <QuoteSection />

        {/* Contact Us & Location */}
        <ContactSection />
      </main>

      {/* Collegiate Footer */}
      <Footer onOpenStudentPortal={() => setIsStudentPortalOpen(true)} />

      {/* Student Portal Modal */}
      <StudentPortalModal
        isOpen={isStudentPortalOpen}
        onClose={() => setIsStudentPortalOpen(false)}
      />

      {/* Quick Search Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(sectionId) => scrollToSection(sectionId)}
      />

      {/* Admin CMS & Content Management System Modal */}
      <AdminCMSModal />

      {/* Floating Admin CMS Access Trigger (Bottom-Left) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsAdminOpen(true)}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-lg border transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer text-xs font-bold ${
            isAdminLoggedIn
              ? 'bg-amber-400 text-slate-950 border-amber-500 hover:bg-amber-300'
              : 'bg-slate-900/90 text-white border-slate-700 hover:bg-slate-900 backdrop-blur-md'
          }`}
          title="Open Website Admin CMS to Edit Content"
        >
          {isAdminLoggedIn ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <Sliders className="w-4 h-4 text-slate-950" />
              <span className="hidden sm:inline">Admin CMS (Active)</span>
            </>
          ) : (
            <>
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Edit Website</span>
            </>
          )}
        </button>
      </div>

      {/* Back To Top Floating Progress Button */}
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
