export interface HeroFoundations {
  title: string;
  subtitle: string;
  equations: { formula: string; name: string; desc: string }[];
  curriculumModel: { title: string; value: string; subtitle: string };
  researchCell: { title: string; value: string; subtitle: string };
}

export type AcademicLevel = 'UG' | 'PG' | 'Research' | 'Add-on';

export type FacultyDesignation = 'Professor' | 'Associate Professor' | 'Assistant Professor' | 'Guest Faculty' | 'Guest Lecturer';

export interface FacultyMember {
  id: string;
  name: string;
  designation: FacultyDesignation;
  qualification: string;
  specialization: string;
  email: string;
  phone?: string;
  roomNo?: string;
  image: string;
  bio: string;
  researchInterests: string[];
  recentPublications: string[];
  coursesTaught: string[];
  scholarUrl?: string;
  researchGateUrl?: string;
  officeHours?: string;
  isHod?: boolean;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  level: AcademicLevel;
  semester: string;
  credits: number;
  type: 'Major / Core' | 'Minor' | 'Skill Enhancement (SEC)' | 'Discipline Elective' | 'Value Added' | 'Postgraduate Core';
  description: string;
  prerequisites?: string;
  syllabusOutline: string[];
  textbooks: string[];
  learningOutcomes: string[];
}

export interface ResearchArea {
  id: string;
  title: string;
  iconName: string;
  description: string;
  keyTopics: string[];
  facultyInvolved: string[];
  activeProjectsCount: number;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi?: string;
  impactFactor?: string;
  type: 'Journal' | 'Conference' | 'Book Chapter';
}

export interface ResearchProject {
  id: string;
  title: string;
  fundingAgency: string;
  grantAmount: string;
  investigator: string;
  duration: string;
  status: 'Ongoing' | 'Completed';
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Seminar' | 'Workshop' | 'National Math Day' | 'Mathematics Olympiad' | 'Guest Lecture' | 'Orientation' | 'Colloquium';
  date: string;
  endDate?: string;
  time: string;
  venue: string;
  speaker?: string;
  speakerAffiliation?: string;
  description: string;
  isUpcoming: boolean;
  registrationOpen: boolean;
  registrationDeadline?: string;
  image?: string;
  coordinator?: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  date: string;
  category: 'Latest Notices' | 'Examination' | 'Circular' | 'Seminars & Workshops' | 'Admissions';
  isNew: boolean;
  isUrgent?: boolean;
  description: string;
  refNo?: string;
  downloadUrl?: string;
  fileSize?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  recipient: string;
  role: 'Student' | 'Faculty' | 'Alumni' | 'Department';
  category: 'Exam Qualification' | 'Academic Award' | 'Research Fellowship' | 'Olympiad Rank' | 'University Rank';
  year: string;
  description: string;
  badgeText: string;
  image?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Magazine' | 'Classroom' | 'Seminars' | 'Math Day' | 'Student Activities' | 'Department Events';
  image: string;
  caption: string;
  date: string;
}

export interface DepartmentStat {
  label: string;
  value: number;
  suffix: string;
  subtext: string;
  icon: string;
}

export interface DepartmentStudent {
  id: string;
  fullName: string;
  rollNo: string;
  classSection?: string; // e.g. "Section A", "Section B", "Room 204", "Morning Batch"
  guRegNo?: string;
  courseProgram: 'B.Sc. Mathematics (Honours/Major)' | 'B.Sc. Mathematics (Minor)' | 'M.Sc. Mathematics' | 'FYUGP Mathematics (Major)' | 'FYUGP Mathematics (Minor)' | 'Skill Enhancement (SEC/VAC)' | 'Value Added & SEC Computing';
  selectiveCourse: string; // e.g. "MAT-MAJ-101: Calculus & Geometry", "MAT-MIN-101: Principles of Mathematics", "MAT-SEC-301: Scientific Computing with Python", etc.
  semester: string;
  batch: string;
  email: string;
  phone?: string;
  status: 'Active' | 'Alumni' | 'Transferred' | 'Enrolled' | 'Graduated' | 'Suspended';
  mentorName?: string;
  admissionYear?: string;
  cgpa?: number;
  dob?: string;
  fatherName?: string;
  bloodGroup?: string;
  address?: string;
  notes?: string;
}

export interface StudentResource {
  id: string;
  title: string;
  category: 'Syllabus' | 'Question Bank' | 'Lab Manual' | 'Templates' | 'Competitive Exams' | 'Schedule' | 'Lecture Notes' | 'Assignments' | 'Reference Books';
  description: string;
  fileType: string;
  downloadLink: string;
  semester?: string;
  uploadedDate?: string;
}

export type CourseType = 'Major' | 'Minor' | 'Major/Minor';

export interface RoutineCourseEntry {
  course: string;
  type: CourseType;
}

export interface RoutineSlot {
  id: string;
  timeSlot: string;
  day?: string;
  sem1: RoutineCourseEntry;
  sem2: RoutineCourseEntry;
  sem3: RoutineCourseEntry;
  sem4: RoutineCourseEntry;
  sem5: RoutineCourseEntry;
  sem6: RoutineCourseEntry;
  // Legacy optional fallback fields
  sem1Major?: string;
  sem3Major?: string;
  sem5Major?: string;
  semMinor?: string;
  mscSlot?: string;
  room?: string;
}

export interface StudentGrievance {
  id: string;
  refNo: string;
  studentName: string;
  rollNo: string;
  semester: string;
  course: string;
  mentorName: string;
  queryType: 'Academic Guidance' | 'Examination & Marks' | 'Project / Guide Allocation' | 'Laboratory & Computing' | 'Remedial Class' | 'General Query';
  message: string;
  submittedAt: string;
  status: 'Pending' | 'In Review' | 'Resolved' | 'Closed';
  adminResponse?: string;
  responseDate?: string;
}

export interface StudentProfile {
  id: string;
  fullName: string;
  rollNo: string;
  guRegNo?: string;
  classSection?: string;
  email: string;
  phone: string;
  semester: string;
  program: 'B.Sc. Mathematics (Honours/Major)' | 'B.Sc. Mathematics (Minor)' | 'M.Sc. Mathematics' | 'FYUGP Mathematics (Major)' | 'FYUGP Mathematics (Minor)' | 'Skill Enhancement (SEC/VAC)';
  selectiveCourse?: string;
  batch: string;
  avatar: string;
  bio?: string;
  mentorName?: string;
  interests?: string[];
  registeredDate: string;
  cgpa?: number;
  admissionYear?: string;
  dob?: string;
  fatherName?: string;
  bloodGroup?: string;
  address?: string;
  githubOrPortfolio?: string;
  linkedinOrSocial?: string;
  careerGoals?: string;
}

export type BlogCategory =
  | 'Research Insights'
  | 'Student Articles'
  | 'Faculty Corner'
  | 'History of Math'
  | 'Olympiad & Problem Solving'
  | 'Computational Math & Tech';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: BlogCategory;
  authorName: string;
  authorRole: 'Faculty' | 'Student' | 'Alumni' | 'Guest Scholar';
  authorAvatar?: string;
  date: string;
  readTime: string;
  coverImage: string;
  excerpt: string;
  content: string; // multi-paragraph text or markdown formatted
  tags: string[];
  likesCount?: number;
  featured?: boolean;
}

