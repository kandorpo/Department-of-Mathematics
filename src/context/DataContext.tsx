import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  FacultyMember,
  Course,
  ResearchArea,
  Publication,
  ResearchProject,
  EventItem,
  NoticeItem,
  AchievementItem,
  GalleryItem,
  DepartmentStat,
  DepartmentStudent,
  BlogPost,
  StudentProfile,
  StudentResource,
  RoutineSlot,
  StudentGrievance,
  HeroFoundations,
  CourseType,
  RoutineCourseEntry
} from '../types';
import {
  DEPARTMENT_INFO,
  DEPARTMENT_STATS,
  FACULTY_DATA,
  COURSES_DATA,
  RESEARCH_AREAS,
  RESEARCH_PROJECTS,
  RESEARCH_PUBLICATIONS,
  EVENTS_DATA,
  NOTICES_DATA,
  ACHIEVEMENTS_DATA,
  GALLERY_DATA,
  DEFAULT_DEPARTMENT_STUDENTS,
  DEFAULT_BLOG_POSTS,
  DEFAULT_STUDENT_PROFILES,
  STUDENT_RESOURCES,
  DEFAULT_ROUTINE_SLOTS,
  DEFAULT_GRIEVANCES
} from '../data/departmentData';

export interface DepartmentInfoType {
  name: string;
  college: string;
  affiliation: string;
  accreditation: string;
  establishedYear: number;
  address: string;
  email: string;
  phone: string;
  officeHours: string;
  hodName: string;
  hodTitle: string;
  hodMessage: string;
  vision: string;
  mission: string[];
  coreValues: { title: string; desc: string }[];
  facilities: { name: string; desc: string }[];
  logoUrl: string;
  imageUrls: string[];
  aboutOverview: string;
  aboutLegacy: string;
  aboutImageUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  cardHeaderBadgeText: string;
  cardHeaderLocation: string;
  cardHeaderTitle: string;
  welcomeBadgeText: string;
  welcomeTitle: string;
  welcomeDescription: string;
  heroFoundations: HeroFoundations;
}

export interface DepartmentCMSData {
  departmentInfo: DepartmentInfoType;
  stats: DepartmentStat[];
  faculty: FacultyMember[];
  courses: Course[];
  notices: NoticeItem[];
  events: EventItem[];
  researchAreas: ResearchArea[];
  researchProjects: ResearchProject[];
  publications: Publication[];
  achievements: AchievementItem[];
  gallery: GalleryItem[];
  departmentStudents?: DepartmentStudent[];
  blogs: BlogPost[];
  registeredStudentProfiles?: StudentProfile[];
  portalResources?: StudentResource[];
  routineSlots?: RoutineSlot[];
  studentGrievances?: StudentGrievance[];
}

const STORAGE_KEY = 'dudhnoi_math_cms_master_data_v2';
const AUTH_KEY = 'dudhnoi_math_admin_auth_status';
const PORTAL_PROFILES_KEY = 'dudhnoi_math_registered_students_list';

export interface VerificationResult {
  isEligible: boolean;
  matchedStudent?: DepartmentStudent;
  reason?: string;
}

interface DataContextType {
  // State
  departmentInfo: DepartmentInfoType;
  stats: DepartmentStat[];
  faculty: FacultyMember[];
  courses: Course[];
  notices: NoticeItem[];
  events: EventItem[];
  researchAreas: ResearchArea[];
  researchProjects: ResearchProject[];
  publications: Publication[];
  achievements: AchievementItem[];
  gallery: GalleryItem[];
  departmentStudents: DepartmentStudent[];
  blogs: BlogPost[];
  registeredStudentProfiles: StudentProfile[];
  portalResources: StudentResource[];
  routineSlots: RoutineSlot[];
  studentGrievances: StudentGrievance[];

  // Admin Modal & Auth
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminLoggedIn: boolean;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;

  // Mutators
  updateDepartmentInfo: (info: Partial<DepartmentInfoType>) => void;
  updateStats: (stats: DepartmentStat[]) => void;
  
  // Faculty
  addFaculty: (faculty: FacultyMember) => void;
  updateFaculty: (faculty: FacultyMember) => void;
  deleteFaculty: (id: string) => void;

  // Department Students Directory
  addDepartmentStudent: (student: DepartmentStudent) => void;
  updateDepartmentStudent: (student: DepartmentStudent) => void;
  deleteDepartmentStudent: (id: string) => void;
  bulkImportDepartmentStudents: (students: DepartmentStudent[]) => void;
  verifyStudentEligibility: (fullName: string, rollNo: string, courseProgram: string) => VerificationResult;

  // Portal Registered Student Profiles (Admin & Student full management)
  addRegisteredStudentProfile: (profile: StudentProfile) => void;
  updateRegisteredStudentProfile: (profile: StudentProfile) => void;
  deleteRegisteredStudentProfile: (id: string) => void;
  bulkImportRegisteredStudentProfiles: (profiles: StudentProfile[]) => void;

  // Portal Study Resources & Question Banks
  addPortalResource: (resource: StudentResource) => void;
  updatePortalResource: (resource: StudentResource) => void;
  deletePortalResource: (id: string) => void;

  // Portal Class & Lab Routines
  addRoutineSlot: (slot: RoutineSlot) => void;
  updateRoutineSlot: (slot: RoutineSlot) => void;
  deleteRoutineSlot: (id: string) => void;

  // Mentorship & Grievance Requests
  addStudentGrievance: (grievance: StudentGrievance) => void;
  updateStudentGrievance: (grievance: StudentGrievance) => void;
  deleteStudentGrievance: (id: string) => void;

  // Notices
  addNotice: (notice: NoticeItem) => void;
  updateNotice: (notice: NoticeItem) => void;
  deleteNotice: (id: string) => void;

  // Events
  addEvent: (event: EventItem) => void;
  updateEvent: (event: EventItem) => void;
  deleteEvent: (id: string) => void;

  // Courses
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;

  // Research
  addResearchArea: (area: ResearchArea) => void;
  updateResearchArea: (area: ResearchArea) => void;
  deleteResearchArea: (id: string) => void;

  // Research Projects
  addResearchProject: (project: ResearchProject) => void;
  updateResearchProject: (project: ResearchProject) => void;
  deleteResearchProject: (id: string) => void;

  // Publications
  addPublication: (publication: Publication) => void;
  updatePublication: (publication: Publication) => void;
  deletePublication: (id: string) => void;

  // Achievements
  addAchievement: (achievement: AchievementItem) => void;
  updateAchievement: (achievement: AchievementItem) => void;
  deleteAchievement: (id: string) => void;

  // Gallery
  addGalleryItem: (item: GalleryItem) => void;
  updateGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;

  // Blogs
  addBlog: (blog: BlogPost) => void;
  updateBlog: (blog: BlogPost) => void;
  deleteBlog: (id: string) => void;
  likeBlog: (id: string) => void;

  // Global utilities
  resetAllToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonStr: string) => boolean;
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Helper to normalize routine slot structure
const normalizeRoutineSlot = (slot: any): RoutineSlot => {
  const parseEntry = (val: any, defaultType: CourseType = 'Major'): RoutineCourseEntry => {
    if (!val) return { course: '', type: defaultType };
    if (typeof val === 'object' && val.course !== undefined) {
      return { course: val.course || '', type: val.type || defaultType };
    }
    return { course: String(val), type: defaultType };
  };

  return {
    id: slot.id || `slot-${Date.now()}`,
    timeSlot: slot.timeSlot || '09:15 - 10:15 AM',
    day: slot.day || 'Monday - Saturday',
    sem1: parseEntry(slot.sem1 || slot.sem1Major, 'Major'),
    sem2: parseEntry(slot.sem2, 'Minor'),
    sem3: parseEntry(slot.sem3 || slot.sem3Major, 'Major'),
    sem4: parseEntry(slot.sem4, 'Major/Minor'),
    sem5: parseEntry(slot.sem5 || slot.sem5Major, 'Major'),
    sem6: parseEntry(slot.sem6 || slot.mscSlot, 'Major'),
  };
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Master state
  const [departmentInfo, setDepartmentInfo] = useState<DepartmentInfoType>(DEPARTMENT_INFO);
  const [stats, setStats] = useState<DepartmentStat[]>(DEPARTMENT_STATS);
  const [faculty, setFaculty] = useState<FacultyMember[]>(FACULTY_DATA);
  const [courses, setCourses] = useState<Course[]>(COURSES_DATA);
  const [notices, setNotices] = useState<NoticeItem[]>(NOTICES_DATA);
  const [events, setEvents] = useState<EventItem[]>(EVENTS_DATA);
  const [researchAreas, setResearchAreas] = useState<ResearchArea[]>(RESEARCH_AREAS);
  const [researchProjects, setResearchProjects] = useState<ResearchProject[]>(RESEARCH_PROJECTS);
  const [publications, setPublications] = useState<Publication[]>(RESEARCH_PUBLICATIONS);
  const [achievements, setAchievements] = useState<AchievementItem[]>(ACHIEVEMENTS_DATA);
  const [gallery, setGallery] = useState<GalleryItem[]>(GALLERY_DATA);
  const [departmentStudents, setDepartmentStudents] = useState<DepartmentStudent[]>(DEFAULT_DEPARTMENT_STUDENTS);
  const [blogs, setBlogs] = useState<BlogPost[]>(DEFAULT_BLOG_POSTS);
  const [registeredStudentProfiles, setRegisteredStudentProfiles] = useState<StudentProfile[]>(DEFAULT_STUDENT_PROFILES);
  const [portalResources, setPortalResources] = useState<StudentResource[]>(STUDENT_RESOURCES);
  const [routineSlots, setRoutineSlots] = useState<RoutineSlot[]>(DEFAULT_ROUTINE_SLOTS.map(normalizeRoutineSlot));
  const [studentGrievances, setStudentGrievances] = useState<StudentGrievance[]>(DEFAULT_GRIEVANCES);

  // Admin UI State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to sync faculty count in stats
  const syncFacultyCount = (facList: FacultyMember[], statsList: DepartmentStat[]): DepartmentStat[] => {
    return statsList.map((st) => {
      if (st.label.toLowerCase().includes('faculty') || st.icon === 'Users') {
        return { ...st, value: facList.length };
      }
      return st;
    });
  };

  // Load initial from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      let currentFaculty = FACULTY_DATA;
      if (stored) {
        const parsed: Partial<DepartmentCMSData> = JSON.parse(stored);
        if (parsed.departmentInfo) {
          const merged = { ...DEPARTMENT_INFO, ...parsed.departmentInfo };
          const validImageUrls = (merged.imageUrls || []).filter(url => typeof url === 'string' && url.trim().length > 5);
          merged.imageUrls = validImageUrls.length > 0 ? validImageUrls : DEPARTMENT_INFO.imageUrls;
          if (!merged.logoUrl || typeof merged.logoUrl !== 'string' || merged.logoUrl.trim().length < 5) {
            merged.logoUrl = DEPARTMENT_INFO.logoUrl;
          }
          if (!merged.aboutImageUrl || typeof merged.aboutImageUrl !== 'string' || merged.aboutImageUrl.trim().length < 5) {
            merged.aboutImageUrl = DEPARTMENT_INFO.aboutImageUrl;
          }
          setDepartmentInfo(merged);
        }
        if (parsed.faculty) {
          currentFaculty = parsed.faculty;
          setFaculty(parsed.faculty);
        }
        if (parsed.stats) {
          setStats(syncFacultyCount(currentFaculty, parsed.stats));
        } else {
          setStats(syncFacultyCount(currentFaculty, DEPARTMENT_STATS));
        }
        if (parsed.courses) setCourses(parsed.courses);
        if (parsed.notices) setNotices(parsed.notices);
        if (parsed.events) setEvents(parsed.events);
        if (parsed.researchAreas) setResearchAreas(parsed.researchAreas);
        if (parsed.researchProjects) setResearchProjects(parsed.researchProjects);
        if (parsed.publications) setPublications(parsed.publications);
        if (parsed.achievements) setAchievements(parsed.achievements);
        if (parsed.gallery) setGallery(parsed.gallery);
        if (parsed.departmentStudents && Array.isArray(parsed.departmentStudents) && parsed.departmentStudents.length > 0) {
          setDepartmentStudents(parsed.departmentStudents);
        }
        if (parsed.blogs) setBlogs(parsed.blogs);
        if (parsed.registeredStudentProfiles && Array.isArray(parsed.registeredStudentProfiles) && parsed.registeredStudentProfiles.length > 0) {
          setRegisteredStudentProfiles(parsed.registeredStudentProfiles);
        }
        if (parsed.portalResources && Array.isArray(parsed.portalResources) && parsed.portalResources.length > 0) {
          setPortalResources(parsed.portalResources);
        }
        if (parsed.routineSlots && Array.isArray(parsed.routineSlots) && parsed.routineSlots.length > 0) {
          setRoutineSlots(parsed.routineSlots.map(normalizeRoutineSlot));
        }
        if (parsed.studentGrievances && Array.isArray(parsed.studentGrievances) && parsed.studentGrievances.length > 0) {
          setStudentGrievances(parsed.studentGrievances);
        }
      } else {
        setStats(syncFacultyCount(FACULTY_DATA, DEPARTMENT_STATS));
      }

      // Check portal standalone profiles key if available
      const portalProfilesStored = localStorage.getItem(PORTAL_PROFILES_KEY);
      if (portalProfilesStored) {
        try {
          const parsedProfiles = JSON.parse(portalProfilesStored);
          if (Array.isArray(parsedProfiles) && parsedProfiles.length > 0) {
            setRegisteredStudentProfiles(parsedProfiles);
          }
        } catch {
          // ignore
        }
      }

      const auth = localStorage.getItem(AUTH_KEY);
      if (auth === 'true') {
        setIsAdminLoggedIn(true);
      }
    } catch (e) {
      console.warn('Error loading data from localStorage:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save changes to localStorage helper
  const persist = (data: Partial<DepartmentCMSData>) => {
    console.log('Persisting data:', data);
    try {
      const currentStored = localStorage.getItem(STORAGE_KEY);
      const current: DepartmentCMSData = currentStored
        ? JSON.parse(currentStored)
        : {
            departmentInfo,
            stats,
            faculty,
            courses,
            notices,
            events,
            researchAreas,
            researchProjects,
            publications,
            achievements,
            gallery,
            departmentStudents,
            blogs,
            registeredStudentProfiles,
            portalResources,
            routineSlots,
            studentGrievances
          };
      const updated = { ...current, ...data };
      console.log('Final data to persist:', updated);
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e: any) {
        if (e.name === 'QuotaExceededError') {
          console.warn('LocalStorage quota exceeded, attempting to save without large images...');
          const reducedData = {
            ...updated,
            departmentInfo: {
              ...updated.departmentInfo,
              imageUrls: [],
              logoUrl: ''
            }
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(reducedData));
        } else {
          throw e;
        }
      }

      if (data.registeredStudentProfiles) {
        localStorage.setItem(PORTAL_PROFILES_KEY, JSON.stringify(data.registeredStudentProfiles));
      }
    } catch (e) {
      console.error('Failed to persist CMS data to localStorage:', e);
    }
  };

  // Auth handler
  const loginAdmin = (passcode: string): boolean => {
    // Default passcodes: "admin", "dudhnoi1972", "math1972", "admin123"
    const validPasscodes = ['dudhnoi1972', 'admin', 'math1972', 'admin123', 'dudhnoi'];
    if (validPasscodes.includes(passcode.trim().toLowerCase())) {
      setIsAdminLoggedIn(true);
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(AUTH_KEY);
  };

  // Mutators
  const updateDepartmentInfo = (info: Partial<DepartmentInfoType>) => {
    setDepartmentInfo((prev) => {
      const updated = { ...prev, ...info };
      persist({ departmentInfo: updated });
      return updated;
    });
  };

  const updateStats = (newStats: DepartmentStat[]) => {
    setStats(newStats);
    persist({ stats: newStats });
  };

  // Faculty
  const addFaculty = (member: FacultyMember) => {
    setFaculty((prev) => {
      const updated = [member, ...prev];
      setStats((prevStats) => {
        const newStats = syncFacultyCount(updated, prevStats);
        persist({ faculty: updated, stats: newStats });
        return newStats;
      });
      return updated;
    });
  };

  const updateFaculty = (member: FacultyMember) => {
    setFaculty((prev) => {
      const updated = prev.map((f) => (f.id === member.id ? member : f));
      setStats((prevStats) => {
        const newStats = syncFacultyCount(updated, prevStats);
        persist({ faculty: updated, stats: newStats });
        return newStats;
      });
      return updated;
    });
  };

  const deleteFaculty = (id: string) => {
    setFaculty((prev) => {
      const updated = prev.filter((f) => f.id !== id);
      setStats((prevStats) => {
        const newStats = syncFacultyCount(updated, prevStats);
        persist({ faculty: updated, stats: newStats });
        return newStats;
      });
      return updated;
    });
  };

  // Department Students Directory
  const addDepartmentStudent = (student: DepartmentStudent) => {
    setDepartmentStudents((prev) => {
      const updated = [student, ...prev];
      persist({ departmentStudents: updated });
      return updated;
    });
  };

  const updateDepartmentStudent = (student: DepartmentStudent) => {
    setDepartmentStudents((prev) => {
      const updated = prev.map((s) => (s.id === student.id ? student : s));
      persist({ departmentStudents: updated });
      return updated;
    });
  };

  const deleteDepartmentStudent = (id: string) => {
    console.log('Attempting to delete student with ID:', id);
    setDepartmentStudents((prev) => {
      console.log('Current students count:', prev.length);
      const updated = prev.filter((s) => s.id !== id);
      console.log('Students count after filter:', updated.length);
      persist({ departmentStudents: updated });
      return updated;
    });
  };

  const bulkImportDepartmentStudents = (newStudents: DepartmentStudent[]) => {
    setDepartmentStudents((prev) => {
      // Merge unique by rollNo or id
      const existingRolls = new Set(prev.map((s) => s.rollNo.toLowerCase()));
      const filteredNew = newStudents.filter((s) => !existingRolls.has(s.rollNo.toLowerCase()));
      const updated = [...filteredNew, ...prev];
      persist({ departmentStudents: updated });
      return updated;
    });
  };

  // Student verification for portal registration
  const verifyStudentEligibility = (fullName: string, rollNo: string, courseProgram: string): VerificationResult => {
    const normName = fullName.trim().toLowerCase().replace(/\s+/g, ' ');
    const normRoll = rollNo.trim().toLowerCase().replace(/[^a-z0-9]/g, '');

    if (!normName && !normRoll) {
      return {
        isEligible: false,
        reason: 'Full name and Roll Number are required for department enrollment verification.'
      };
    }

    // Search department active student list
    const matched = departmentStudents.find((s) => {
      const sRollClean = s.rollNo.toLowerCase().replace(/[^a-z0-9]/g, '');
      const sGuClean = s.guRegNo ? s.guRegNo.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
      const sNameClean = s.fullName.toLowerCase().replace(/\s+/g, ' ');

      // Primary check: Roll match
      if (normRoll && (sRollClean === normRoll || (sGuClean && sGuClean === normRoll))) {
        return true;
      }

      // Secondary check: Name matching
      if (normName && (sNameClean === normName || sNameClean.includes(normName) || normName.includes(sNameClean))) {
        // If name matches, also check if roll is at least partially related or absent
        if (!normRoll || sRollClean.includes(normRoll) || normRoll.includes(sRollClean)) {
          return true;
        }
      }

      return false;
    });

    if (!matched) {
      return {
        isEligible: false,
        reason: `No official record was found in the Department of Mathematics student roster for "${fullName}" (Roll: ${rollNo || 'N/A'}).`
      };
    }

    // Check course compatibility
    const studentProgClean = matched.courseProgram.toLowerCase();
    const studentSelectiveClean = matched.selectiveCourse.toLowerCase();
    const selectedProgClean = courseProgram.toLowerCase();

    const isMajor = selectedProgClean.includes('major') || selectedProgClean.includes('honours');
    const isMinor = selectedProgClean.includes('minor');
    const isMsc = selectedProgClean.includes('m.sc') || selectedProgClean.includes('msc');
    const isSec = selectedProgClean.includes('sec') || selectedProgClean.includes('value added') || selectedProgClean.includes('computing');

    const studentIsMajor = studentProgClean.includes('major') || studentProgClean.includes('honours');
    const studentIsMinor = studentProgClean.includes('minor');
    const studentIsMsc = studentProgClean.includes('m.sc') || studentProgClean.includes('msc');
    const studentIsSec = studentProgClean.includes('sec') || studentProgClean.includes('value added') || studentSelectiveClean.includes('sec');

    const courseMatched =
      studentProgClean === selectedProgClean ||
      (isMajor && studentIsMajor) ||
      (isMinor && studentIsMinor) ||
      (isMsc && studentIsMsc) ||
      (isSec && studentIsSec) ||
      studentProgClean.includes(selectedProgClean) ||
      selectedProgClean.includes(studentProgClean);

    if (!courseMatched) {
      return {
        isEligible: false,
        matchedStudent: matched,
        reason: `Course mismatch: Official department records show you are enrolled in "${matched.courseProgram}" (${matched.selectiveCourse}), but you selected "${courseProgram}".`
      };
    }

    return {
      isEligible: true,
      matchedStudent: matched
    };
  };

  // Portal Registered Student Profiles
  const addRegisteredStudentProfile = (profile: StudentProfile) => {
    setRegisteredStudentProfiles((prev) => {
      const updated = [profile, ...prev.filter((p) => p.id !== profile.id && p.rollNo.toLowerCase() !== profile.rollNo.toLowerCase())];
      persist({ registeredStudentProfiles: updated });
      return updated;
    });
  };

  const updateRegisteredStudentProfile = (profile: StudentProfile) => {
    setRegisteredStudentProfiles((prev) => {
      const updated = prev.map((p) => (p.id === profile.id ? profile : p));
      persist({ registeredStudentProfiles: updated });
      return updated;
    });
  };

  const deleteRegisteredStudentProfile = (id: string) => {
    setRegisteredStudentProfiles((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      persist({ registeredStudentProfiles: updated });
      return updated;
    });
  };

  const bulkImportRegisteredStudentProfiles = (profiles: StudentProfile[]) => {
    setRegisteredStudentProfiles((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const filtered = profiles.filter((p) => !existingIds.has(p.id));
      const updated = [...filtered, ...prev];
      persist({ registeredStudentProfiles: updated });
      return updated;
    });
  };

  // Portal Study Resources
  const addPortalResource = (resource: StudentResource) => {
    setPortalResources((prev) => {
      const updated = [resource, ...prev];
      persist({ portalResources: updated });
      return updated;
    });
  };

  const updatePortalResource = (resource: StudentResource) => {
    setPortalResources((prev) => {
      const updated = prev.map((r) => (r.id === resource.id ? resource : r));
      persist({ portalResources: updated });
      return updated;
    });
  };

  const deletePortalResource = (id: string) => {
    console.log('Deleting resource:', id);
    setPortalResources((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      console.log('Updated resources list:', updated);
      persist({ portalResources: updated });
      return updated;
    });
  };

  // Portal Routine Slots
  const addRoutineSlot = (slot: RoutineSlot) => {
    setRoutineSlots((prev) => {
      const updated = [...prev, slot];
      persist({ routineSlots: updated });
      return updated;
    });
  };

  const updateRoutineSlot = (slot: RoutineSlot) => {
    setRoutineSlots((prev) => {
      const updated = prev.map((s) => (s.id === slot.id ? slot : s));
      persist({ routineSlots: updated });
      return updated;
    });
  };

  const deleteRoutineSlot = (id: string) => {
    setRoutineSlots((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      persist({ routineSlots: updated });
      return updated;
    });
  };

  // Student Grievances / Mentorship Queries
  const addStudentGrievance = (grievance: StudentGrievance) => {
    setStudentGrievances((prev) => {
      const updated = [grievance, ...prev];
      persist({ studentGrievances: updated });
      return updated;
    });
  };

  const updateStudentGrievance = (grievance: StudentGrievance) => {
    setStudentGrievances((prev) => {
      const updated = prev.map((g) => (g.id === grievance.id ? grievance : g));
      persist({ studentGrievances: updated });
      return updated;
    });
  };

  const deleteStudentGrievance = (id: string) => {
    setStudentGrievances((prev) => {
      const updated = prev.filter((g) => g.id !== id);
      persist({ studentGrievances: updated });
      return updated;
    });
  };

  // Notices
  const addNotice = (notice: NoticeItem) => {
    setNotices((prev) => {
      const updated = [notice, ...prev];
      persist({ notices: updated });
      return updated;
    });
  };

  const updateNotice = (notice: NoticeItem) => {
    setNotices((prev) => {
      const updated = prev.map((n) => (n.id === notice.id ? notice : n));
      persist({ notices: updated });
      return updated;
    });
  };

  const deleteNotice = (id: string) => {
    setNotices((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      persist({ notices: updated });
      return updated;
    });
  };

  // Events
  const addEvent = (event: EventItem) => {
    setEvents((prev) => {
      const updated = [event, ...prev];
      persist({ events: updated });
      return updated;
    });
  };

  const updateEvent = (event: EventItem) => {
    setEvents((prev) => {
      const updated = prev.map((e) => (e.id === event.id ? event : e));
      persist({ events: updated });
      return updated;
    });
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      persist({ events: updated });
      return updated;
    });
  };

  // Courses
  const addCourse = (course: Course) => {
    setCourses((prev) => {
      const updated = [course, ...prev];
      persist({ courses: updated });
      return updated;
    });
  };

  const updateCourse = (course: Course) => {
    setCourses((prev) => {
      const updated = prev.map((c) => (c.id === course.id ? course : c));
      persist({ courses: updated });
      return updated;
    });
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      persist({ courses: updated });
      return updated;
    });
  };

  // Research Areas
  const addResearchArea = (area: ResearchArea) => {
    setResearchAreas((prev) => {
      const updated = [...prev, area];
      persist({ researchAreas: updated });
      return updated;
    });
  };

  const updateResearchArea = (area: ResearchArea) => {
    setResearchAreas((prev) => {
      const updated = prev.map((r) => (r.id === area.id ? area : r));
      persist({ researchAreas: updated });
      return updated;
    });
  };

  const deleteResearchArea = (id: string) => {
    setResearchAreas((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      persist({ researchAreas: updated });
      return updated;
    });
  };

  // Research Projects
  const addResearchProject = (project: ResearchProject) => {
    setResearchProjects((prev) => {
      const updated = [project, ...prev];
      persist({ researchProjects: updated });
      return updated;
    });
  };

  const updateResearchProject = (project: ResearchProject) => {
    setResearchProjects((prev) => {
      const updated = prev.map((p) => (p.id === project.id ? project : p));
      persist({ researchProjects: updated });
      return updated;
    });
  };

  const deleteResearchProject = (id: string) => {
    setResearchProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      persist({ researchProjects: updated });
      return updated;
    });
  };

  // Publications
  const addPublication = (publication: Publication) => {
    setPublications((prev) => {
      const updated = [publication, ...prev];
      persist({ publications: updated });
      return updated;
    });
  };

  const updatePublication = (publication: Publication) => {
    setPublications((prev) => {
      const updated = prev.map((p) => (p.id === publication.id ? publication : p));
      persist({ publications: updated });
      return updated;
    });
  };

  const deletePublication = (id: string) => {
    setPublications((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      persist({ publications: updated });
      return updated;
    });
  };

  // Achievements
  const addAchievement = (achievement: AchievementItem) => {
    setAchievements((prev) => {
      const updated = [achievement, ...prev];
      persist({ achievements: updated });
      return updated;
    });
  };

  const updateAchievement = (achievement: AchievementItem) => {
    setAchievements((prev) => {
      const updated = prev.map((a) => (a.id === achievement.id ? achievement : a));
      persist({ achievements: updated });
      return updated;
    });
  };

  const deleteAchievement = (id: string) => {
    setAchievements((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      persist({ achievements: updated });
      return updated;
    });
  };

  // Gallery
  const addGalleryItem = (item: GalleryItem) => {
    setGallery((prev) => {
      const updated = [item, ...prev];
      persist({ gallery: updated });
      return updated;
    });
  };

  const updateGalleryItem = (item: GalleryItem) => {
    setGallery((prev) => {
      const updated = prev.map((g) => (g.id === item.id ? item : g));
      persist({ gallery: updated });
      return updated;
    });
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => {
      const updated = prev.filter((g) => g.id !== id);
      persist({ gallery: updated });
      return updated;
    });
  };

  // Blogs
  const addBlog = (blog: BlogPost) => {
    setBlogs((prev) => {
      const updated = [blog, ...prev];
      persist({ blogs: updated });
      return updated;
    });
  };

  const updateBlog = (blog: BlogPost) => {
    setBlogs((prev) => {
      const updated = prev.map((b) => (b.id === blog.id ? blog : b));
      persist({ blogs: updated });
      return updated;
    });
  };

  const deleteBlog = (id: string) => {
    setBlogs((prev) => {
      const updated = prev.filter((b) => b.id !== id);
      persist({ blogs: updated });
      return updated;
    });
  };

  const likeBlog = (id: string) => {
    setBlogs((prev) => {
      const updated = prev.map((b) => (b.id === id ? { ...b, likesCount: (b.likesCount || 0) + 1 } : b));
      persist({ blogs: updated });
      return updated;
    });
  };

  // Global Utilities
  const resetAllToDefaults = () => {
    setDepartmentInfo(DEPARTMENT_INFO);
    setStats(syncFacultyCount(FACULTY_DATA, DEPARTMENT_STATS));
    setFaculty(FACULTY_DATA);
    setCourses(COURSES_DATA);
    setNotices(NOTICES_DATA);
    setEvents(EVENTS_DATA);
    setResearchAreas(RESEARCH_AREAS);
    setResearchProjects(RESEARCH_PROJECTS);
    setPublications(RESEARCH_PUBLICATIONS);
    setAchievements(ACHIEVEMENTS_DATA);
    setGallery(GALLERY_DATA);
    setDepartmentStudents(DEFAULT_DEPARTMENT_STUDENTS);
    setBlogs(DEFAULT_BLOG_POSTS);
    setRegisteredStudentProfiles(DEFAULT_STUDENT_PROFILES);
    setPortalResources(STUDENT_RESOURCES);
    setRoutineSlots(DEFAULT_ROUTINE_SLOTS.map(normalizeRoutineSlot));
    setStudentGrievances(DEFAULT_GRIEVANCES);

    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(PORTAL_PROFILES_KEY);
    } catch (e) {}
  };

  const exportDataJson = (): string => {
    const data: DepartmentCMSData = {
      departmentInfo,
      stats,
      faculty,
      courses,
      notices,
      events,
      researchAreas,
      researchProjects,
      publications,
      achievements,
      gallery,
      departmentStudents,
      blogs,
      registeredStudentProfiles,
      portalResources,
      routineSlots,
      studentGrievances
    };
    return JSON.stringify(data, null, 2);
  };

  const importDataJson = (jsonStr: string): boolean => {
    try {
      const parsed: DepartmentCMSData = JSON.parse(jsonStr);
      let facToUse = faculty;
      if (parsed.departmentInfo) setDepartmentInfo(parsed.departmentInfo);
      if (parsed.faculty) {
        facToUse = parsed.faculty;
        setFaculty(facToUse);
      }
      if (parsed.stats) {
        setStats(syncFacultyCount(facToUse, parsed.stats));
      } else {
        setStats(syncFacultyCount(facToUse, DEPARTMENT_STATS));
      }
      if (parsed.courses) setCourses(parsed.courses);
      if (parsed.notices) setNotices(parsed.notices);
      if (parsed.events) setEvents(parsed.events);
      if (parsed.researchAreas) setResearchAreas(parsed.researchAreas);
      if (parsed.researchProjects) setResearchProjects(parsed.researchProjects);
      if (parsed.publications) setPublications(parsed.publications);
      if (parsed.achievements) setAchievements(parsed.achievements);
      if (parsed.gallery) setGallery(parsed.gallery);
      if (parsed.departmentStudents) setDepartmentStudents(parsed.departmentStudents);
      if (parsed.blogs) setBlogs(parsed.blogs);
      if (parsed.registeredStudentProfiles) setRegisteredStudentProfiles(parsed.registeredStudentProfiles);
      if (parsed.portalResources) setPortalResources(parsed.portalResources);
      if (parsed.routineSlots) setRoutineSlots(parsed.routineSlots.map(normalizeRoutineSlot));
      if (parsed.studentGrievances) setStudentGrievances(parsed.studentGrievances);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      if (parsed.registeredStudentProfiles) {
        localStorage.setItem(PORTAL_PROFILES_KEY, JSON.stringify(parsed.registeredStudentProfiles));
      }
      return true;
    } catch (e) {
      console.error('Failed to import JSON data:', e);
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        departmentInfo,
        stats,
        faculty,
        courses,
        notices,
        events,
        researchAreas,
        researchProjects,
        publications,
        achievements,
        gallery,
        departmentStudents,
        blogs,
        registeredStudentProfiles,
        portalResources,
        routineSlots,
        studentGrievances,

        isAdminOpen,
        setIsAdminOpen,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,

        updateDepartmentInfo,
        updateStats,

        addFaculty,
        updateFaculty,
        deleteFaculty,

        addDepartmentStudent,
        updateDepartmentStudent,
        deleteDepartmentStudent,
        bulkImportDepartmentStudents,
        verifyStudentEligibility,

        addRegisteredStudentProfile,
        updateRegisteredStudentProfile,
        deleteRegisteredStudentProfile,
        bulkImportRegisteredStudentProfiles,

        addPortalResource,
        updatePortalResource,
        deletePortalResource,

        addRoutineSlot,
        updateRoutineSlot,
        deleteRoutineSlot,

        addStudentGrievance,
        updateStudentGrievance,
        deleteStudentGrievance,

        addNotice,
        updateNotice,
        deleteNotice,

        addEvent,
        updateEvent,
        deleteEvent,

        addCourse,
        updateCourse,
        deleteCourse,

        addResearchArea,
        updateResearchArea,
        deleteResearchArea,

        addResearchProject,
        updateResearchProject,
        deleteResearchProject,

        addPublication,
        updatePublication,
        deletePublication,

        addAchievement,
        updateAchievement,
        deleteAchievement,

        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,

        addBlog,
        updateBlog,
        deleteBlog,
        likeBlog,

        resetAllToDefaults,
        exportDataJson,
        importDataJson,
        isLoading
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDepartmentData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDepartmentData must be used within a DataProvider');
  }
  return context;
};
