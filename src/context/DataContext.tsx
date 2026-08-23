import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DOC_REF, onSnapshot, setDoc, OperationType, handleFirestoreError } from '../firebase';
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
  RoutineCourseEntry,
  AdminAccount,
  AdminRegistrationRequest
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
  admins?: AdminAccount[];
  adminRegistrationRequests?: AdminRegistrationRequest[];
}

const STORAGE_KEY = 'dudhnoi_math_cms_master_data_v2';
const AUTH_KEY = 'dudhnoi_math_admin_auth_status';
const AUTH_USER_KEY = 'dudhnoi_math_admin_auth_user_id';
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
  admins: AdminAccount[];
  currentAdmin: AdminAccount | null;
  adminRegistrationRequests: AdminRegistrationRequest[];
  isDatabaseQuotaExceeded: boolean;

  // Admin Modal & Auth
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminLoggedIn: boolean;
  loginAdmin: (usernameOrEmail: string, password: string) => boolean;
  logoutAdmin: () => void;
  addAdminAccount: (account: AdminAccount) => void;
  updateAdminAccount: (account: AdminAccount) => void;
  deleteAdminAccount: (id: string) => void;
  submitAdminRegistrationRequest: (req: Omit<AdminRegistrationRequest, 'id' | 'status' | 'requestDate'>) => void;
  approveAdminRegistrationRequest: (id: string) => void;
  rejectAdminRegistrationRequest: (id: string) => void;

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

const DEFAULT_ADMIN_ACCOUNTS: AdminAccount[] = [
  {
    id: 'admin-kandorpo',
    username: 'kandorpo',
    email: 'kandorpobarman@gmail.com',
    fullName: 'Kandorpo Barman',
    role: 'Super Admin',
    passwordHash: 'Daisuke34',
    status: 'Active'
  },
  {
    id: 'admin-hod',
    username: 'hod_math',
    email: 'hod@dudhnoicollege.ac.in',
    fullName: 'HOD Mathematics',
    role: 'HOD',
    passwordHash: 'math1972',
    status: 'Active'
  },
  {
    id: 'admin-dept',
    username: 'department_admin',
    email: 'math_dept@dudhnoicollege.ac.in',
    fullName: 'Department Coordinator',
    role: 'Department Admin',
    passwordHash: 'dudhnoi1972',
    status: 'Active'
  }
];

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
  const [admins, setAdmins] = useState<AdminAccount[]>(DEFAULT_ADMIN_ACCOUNTS);
  const [currentAdmin, setCurrentAdmin] = useState<AdminAccount | null>(null);
  const [adminRegistrationRequests, setAdminRegistrationRequests] = useState<AdminRegistrationRequest[]>([]);
  const [isDatabaseQuotaExceeded, setIsDatabaseQuotaExceeded] = useState(false);

  // Helper to sync faculty count in stats
  const syncFacultyCount = (facList: FacultyMember[], statsList: DepartmentStat[]): DepartmentStat[] => {
    return statsList.map((st) => {
      if (st.label.toLowerCase().includes('faculty') || st.icon === 'Users') {
        return { ...st, value: facList.length };
      }
      return st;
    });
  };

  // Load initial from localStorage & subscribe to Firestore live sync
  useEffect(() => {
    // 1. Initial quick load from localStorage for immediate render
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      let currentFaculty = FACULTY_DATA;
      let parsed: Partial<DepartmentCMSData> | null = null;
      if (stored) {
        parsed = JSON.parse(stored);
        if (parsed && parsed.departmentInfo) setDepartmentInfo((prev) => ({ ...prev, ...parsed!.departmentInfo }));
        if (Array.isArray(parsed.faculty)) {
          currentFaculty = parsed.faculty;
          setFaculty(parsed.faculty);
        }
        if (Array.isArray(parsed.stats)) {
          setStats(syncFacultyCount(currentFaculty, parsed.stats));
        } else {
          setStats(syncFacultyCount(currentFaculty, DEPARTMENT_STATS));
        }
        if (Array.isArray(parsed.courses)) setCourses(parsed.courses);
        if (Array.isArray(parsed.notices)) setNotices(parsed.notices);
        if (Array.isArray(parsed.events)) setEvents(parsed.events);
        if (Array.isArray(parsed.researchAreas)) setResearchAreas(parsed.researchAreas);
        if (Array.isArray(parsed.researchProjects)) setResearchProjects(parsed.researchProjects);
        if (Array.isArray(parsed.publications)) setPublications(parsed.publications);
        if (Array.isArray(parsed.achievements)) setAchievements(parsed.achievements);
        if (Array.isArray(parsed.gallery)) setGallery(parsed.gallery);
        if (Array.isArray(parsed.departmentStudents)) setDepartmentStudents(parsed.departmentStudents);
        if (Array.isArray(parsed.blogs)) setBlogs(parsed.blogs);
        if (Array.isArray(parsed.registeredStudentProfiles)) setRegisteredStudentProfiles(parsed.registeredStudentProfiles);
        if (Array.isArray(parsed.portalResources)) setPortalResources(parsed.portalResources);
        if (Array.isArray(parsed.admins)) setAdmins(parsed.admins);
        if (Array.isArray(parsed.adminRegistrationRequests)) setAdminRegistrationRequests(parsed.adminRegistrationRequests);
        if (Array.isArray(parsed.routineSlots)) setRoutineSlots(parsed.routineSlots.map(normalizeRoutineSlot));
        if (Array.isArray(parsed.studentGrievances)) setStudentGrievances(parsed.studentGrievances);
      }

      const auth = localStorage.getItem(AUTH_KEY);
      if (auth === 'true') {
        setIsAdminLoggedIn(true);
        const savedUid = localStorage.getItem(AUTH_USER_KEY);
        if (savedUid) {
          const matched = (parsed?.admins || DEFAULT_ADMIN_ACCOUNTS).find(a => a.id === savedUid);
          if (matched) {
            setCurrentAdmin(matched);
          } else {
            setCurrentAdmin(DEFAULT_ADMIN_ACCOUNTS[0]);
          }
        } else {
          setCurrentAdmin(DEFAULT_ADMIN_ACCOUNTS[0]);
        }
      }
    } catch (e) {
      console.warn('Error loading cached data from localStorage:', e);
    }

    // 2. Real-time Live Synchronization with Google Cloud Firestore with a 2-second timeout fallback
    const connectionTimeout = setTimeout(() => {
      console.warn('Firestore connection timeout: falling back to localStorage cache for initial render');
      setIsLoading(false);
      setIsDatabaseQuotaExceeded(true);
    }, 2000);

    let unsub: (() => void) | null = null;
    try {
      unsub = onSnapshot(
        DOC_REF,
        (docSnap) => {
          clearTimeout(connectionTimeout);
          setIsDatabaseQuotaExceeded(false);
          if (docSnap.exists()) {
            const data = docSnap.data() as Partial<DepartmentCMSData>;
            if (data.departmentInfo) setDepartmentInfo((prev) => ({ ...prev, ...data.departmentInfo }));
            if (Array.isArray(data.faculty)) {
              setFaculty(data.faculty);
              setStats((prevStats) => syncFacultyCount(data.faculty!, prevStats));
            }
            if (Array.isArray(data.stats)) setStats(data.stats);
            if (Array.isArray(data.courses)) setCourses(data.courses);
            if (Array.isArray(data.notices)) setNotices(data.notices);
            if (Array.isArray(data.events)) setEvents(data.events);
            if (Array.isArray(data.researchAreas)) setResearchAreas(data.researchAreas);
            if (Array.isArray(data.researchProjects)) setResearchProjects(data.researchProjects);
            if (Array.isArray(data.publications)) setPublications(data.publications);
            if (Array.isArray(data.achievements)) setAchievements(data.achievements);
            if (Array.isArray(data.gallery)) setGallery(data.gallery);
            if (Array.isArray(data.departmentStudents)) setDepartmentStudents(data.departmentStudents);
            if (Array.isArray(data.blogs)) setBlogs(data.blogs);
            if (Array.isArray(data.registeredStudentProfiles)) setRegisteredStudentProfiles(data.registeredStudentProfiles);
            if (Array.isArray(data.portalResources)) setPortalResources(data.portalResources);
            if (Array.isArray(data.routineSlots)) setRoutineSlots(data.routineSlots.map(normalizeRoutineSlot));
            if (Array.isArray(data.studentGrievances)) setStudentGrievances(data.studentGrievances);
            if (Array.isArray(data.adminRegistrationRequests)) setAdminRegistrationRequests(data.adminRegistrationRequests);
            if (Array.isArray(data.admins)) {
              setAdmins(data.admins);
              const savedUid = localStorage.getItem(AUTH_USER_KEY);
              if (savedUid) {
                const matched = data.admins.find(a => a.id === savedUid);
                if (matched) {
                  setCurrentAdmin(matched);
                } else {
                  setCurrentAdmin(data.admins.find(a => a.role === 'Super Admin') || data.admins[0] || DEFAULT_ADMIN_ACCOUNTS[0]);
                }
              } else {
                setCurrentAdmin(data.admins.find(a => a.role === 'Super Admin') || data.admins[0] || DEFAULT_ADMIN_ACCOUNTS[0]);
              }
            }

            // Update localStorage cache
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            } catch (err) {}
          } else {
            // Initial seed to Firestore if document does not exist yet
            const initialSeed: DepartmentCMSData = {
              departmentInfo: DEPARTMENT_INFO,
              stats: syncFacultyCount(FACULTY_DATA, DEPARTMENT_STATS),
              faculty: FACULTY_DATA,
              courses: COURSES_DATA,
              notices: NOTICES_DATA,
              events: EVENTS_DATA,
              researchAreas: RESEARCH_AREAS,
              researchProjects: RESEARCH_PROJECTS,
              publications: RESEARCH_PUBLICATIONS,
              achievements: ACHIEVEMENTS_DATA,
              gallery: GALLERY_DATA,
              departmentStudents: DEFAULT_DEPARTMENT_STUDENTS,
              blogs: DEFAULT_BLOG_POSTS,
              registeredStudentProfiles: DEFAULT_STUDENT_PROFILES,
              portalResources: STUDENT_RESOURCES,
              routineSlots: DEFAULT_ROUTINE_SLOTS.map(normalizeRoutineSlot),
              studentGrievances: DEFAULT_GRIEVANCES,
              admins: DEFAULT_ADMIN_ACCOUNTS,
              adminRegistrationRequests: []
            };
            setDoc(DOC_REF, initialSeed, { merge: true }).catch((err) => {
              console.warn('Initial Firestore seed warning handled gracefully:', err);
              if (err?.code === 'resource-exhausted' || err?.message?.includes('quota') || err?.message?.includes('payload')) {
                setIsDatabaseQuotaExceeded(true);
              }
            });
          }
          setIsLoading(false);
        },
        (error: any) => {
          clearTimeout(connectionTimeout);
          console.warn('Firestore real-time sync subscription error:', error);
          setIsLoading(false);
          setIsDatabaseQuotaExceeded(true);
          const errInfo = {
            error: error instanceof Error ? error.message : String(error),
            code: error?.code || null,
            operationType: 'get',
            path: 'department_cms/master'
          };
          console.error('Firestore Error Handled Gracefully (Falling back to local-only mode): ', JSON.stringify(errInfo));
        }
      );
    } catch (err) {
      clearTimeout(connectionTimeout);
      console.warn('Error establishing Firestore subscription:', err);
      setIsLoading(false);
    }

    return () => {
      clearTimeout(connectionTimeout);
      if (unsub) unsub();
    };
  }, []);

  // Save changes to localStorage AND Google Cloud Firestore for real-time multi-device sync
  const persist = (data: Partial<DepartmentCMSData>) => {
    console.log('Persisting data:', data);
    // 1. Save to localStorage
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
        }
      }

      if (data.registeredStudentProfiles) {
        localStorage.setItem(PORTAL_PROFILES_KEY, JSON.stringify(data.registeredStudentProfiles));
      }
    } catch (e) {
      console.error('Failed to persist CMS data to localStorage:', e);
    }

    // 2. Save to Google Cloud Firestore (triggers real-time update on all client screens)
    try {
      setDoc(DOC_REF, data, { merge: true }).catch((err: any) => {
        console.error('Failed to sync changes to Google Cloud Firestore:', err);
        if (err?.code === 'resource-exhausted' || err?.message?.includes('quota') || err?.message?.includes('payload')) {
          console.warn('Error: Cloud database quota has been exceeded or image size is too large.');
          setIsDatabaseQuotaExceeded(true);
        } else {
          console.warn('Warning: Cloud sync failed. Changes are saved locally.');
        }
        const errInfo = {
          error: err instanceof Error ? err.message : String(err),
          code: err?.code || null,
          operationType: 'write',
          path: 'department_cms/master'
        };
        console.error('Firestore Write Error Handled Gracefully: ', JSON.stringify(errInfo));
      });
    } catch (err) {
      console.error('Error invoking setDoc on Firestore:', err);
    }
  };

  // Auth handler
  const loginAdmin = (usernameOrEmail: string, password: string): boolean => {
    const cleanUser = usernameOrEmail.trim().toLowerCase();
    const cleanPass = password.trim();

    const matched = admins.find(a => 
      (a.username.toLowerCase() === cleanUser || a.email.toLowerCase() === cleanUser) &&
      a.passwordHash === cleanPass &&
      a.status === 'Active'
    );

    if (matched) {
      setIsAdminLoggedIn(true);
      setCurrentAdmin(matched);
      localStorage.setItem(AUTH_KEY, 'true');
      localStorage.setItem(AUTH_USER_KEY, matched.id);

      // Update last login
      const updatedAdmins = admins.map(a => 
        a.id === matched.id 
          ? { ...a, lastLogin: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) } 
          : a
      );
      setAdmins(updatedAdmins);
      persist({ admins: updatedAdmins });
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setCurrentAdmin(null);
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  };

  const addAdminAccount = (account: AdminAccount) => {
    const updated = [...admins, account];
    setAdmins(updated);
    persist({ admins: updated });
  };

  const updateAdminAccount = (account: AdminAccount) => {
    const updated = admins.map(a => a.id === account.id ? account : a);
    setAdmins(updated);
    persist({ admins: updated });
    if (currentAdmin && currentAdmin.id === account.id) {
      setCurrentAdmin(account);
    }
  };

  const deleteAdminAccount = (id: string) => {
    const updated = admins.filter(a => a.id !== id);
    setAdmins(updated);
    persist({ admins: updated });
  };

  const submitAdminRegistrationRequest = (req: Omit<AdminRegistrationRequest, "id" | "status" | "requestDate">) => {
    const newRequest: AdminRegistrationRequest = {
      ...req,
      id: "req-" + Date.now(),
      status: "Pending",
      requestDate: new Date().toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
    };
    const updated = [...adminRegistrationRequests, newRequest];
    setAdminRegistrationRequests(updated);
    persist({ adminRegistrationRequests: updated });
  };

  const approveAdminRegistrationRequest = (id: string) => {
    const request = adminRegistrationRequests.find(r => r.id === id);
    if (!request) return;

    const duplicate = admins.some(a => a.username.toLowerCase() === request.username.toLowerCase() || a.email.toLowerCase() === request.email.toLowerCase());
    if (duplicate) {
      alert("Cannot approve: An administrator with this Username or Email already exists.");
      return;
    }

    const newAdmin: AdminAccount = {
      id: "admin-" + Date.now(),
      username: request.username,
      email: request.email,
      fullName: request.fullName,
      role: request.role as any,
      passwordHash: request.passwordHash,
      status: "Active"
    };

    const updatedAdmins = [...admins, newAdmin];
    const updatedRequests = adminRegistrationRequests.map(r => r.id === id ? { ...r, status: "Approved" as const } : r);

    setAdmins(updatedAdmins);
    setAdminRegistrationRequests(updatedRequests);
    persist({ admins: updatedAdmins, adminRegistrationRequests: updatedRequests });
  };

  const rejectAdminRegistrationRequest = (id: string) => {
    const updatedRequests = adminRegistrationRequests.map(r => r.id === id ? { ...r, status: "Rejected" as const } : r);
    setAdminRegistrationRequests(updatedRequests);
    persist({ adminRegistrationRequests: updatedRequests });
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

    const initialSeed: DepartmentCMSData = {
      departmentInfo: DEPARTMENT_INFO,
      stats: syncFacultyCount(FACULTY_DATA, DEPARTMENT_STATS),
      faculty: FACULTY_DATA,
      courses: COURSES_DATA,
      notices: NOTICES_DATA,
      events: EVENTS_DATA,
      researchAreas: RESEARCH_AREAS,
      researchProjects: RESEARCH_PROJECTS,
      publications: RESEARCH_PUBLICATIONS,
      achievements: ACHIEVEMENTS_DATA,
      gallery: GALLERY_DATA,
      departmentStudents: DEFAULT_DEPARTMENT_STUDENTS,
      blogs: DEFAULT_BLOG_POSTS,
      registeredStudentProfiles: DEFAULT_STUDENT_PROFILES,
      portalResources: STUDENT_RESOURCES,
      routineSlots: DEFAULT_ROUTINE_SLOTS.map(normalizeRoutineSlot),
      studentGrievances: DEFAULT_GRIEVANCES
    };
    persist(initialSeed);

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

      persist(parsed);

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
        admins,
        currentAdmin,
        adminRegistrationRequests,
        addAdminAccount,
        updateAdminAccount,
        deleteAdminAccount,
        submitAdminRegistrationRequest,
        approveAdminRegistrationRequest,
        rejectAdminRegistrationRequest,

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
        isLoading,
        isDatabaseQuotaExceeded
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
