import React, { useState, useEffect, useRef } from 'react';
import {
  GraduationCap,
  FileText,
  Download,
  BookOpen,
  Calendar,
  X,
  Sparkles,
  HelpCircle,
  Laptop,
  CheckCircle2,
  ExternalLink,
  UserPlus,
  LogIn,
  LogOut,
  User,
  Camera,
  Upload,
  Edit3,
  Save,
  Mail,
  Phone,
  Hash,
  ShieldCheck,
  ShieldAlert,
  Award,
  IdCard,
  Layers,
  ArrowRight,
  AlertCircle,
  RefreshCw,
  Info,
  AlertTriangle
} from 'lucide-react';
import { STUDENT_RESOURCES, DEFAULT_STUDENT_PROFILES } from '../data/departmentData';
import { StudentProfile } from '../types';
import { useDepartmentData } from '../context/DataContext';
import { downloadStudyResourcePDF, downloadClassRoutinePDF } from '../utils/downloadHelper';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY_STUDENT = 'dudhnoi_math_student_user';
const STORAGE_KEY_REGISTERED_LIST = 'dudhnoi_math_registered_students';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
];

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({ isOpen, onClose }) => {
  const { faculty, departmentStudents, verifyStudentEligibility, routineSlots } = useDepartmentData();

  const [activeTab, setActiveTab] = useState<'profile' | 'downloads' | 'routine'>('profile');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Stored / Logged-in Student state
  const [currentStudent, setCurrentStudent] = useState<StudentProfile | null>(null);
  const [registeredStudents, setRegisteredStudents] = useState<StudentProfile[]>(DEFAULT_STUDENT_PROFILES);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [regFullName, setRegFullName] = useState('');
  const [regRollNo, setRegRollNo] = useState('');
  const [regGuRegNo, setRegGuRegNo] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regProgram, setRegProgram] = useState<'B.Sc. Mathematics (Honours/Major)' | 'B.Sc. Mathematics (Minor)' | 'M.Sc. Mathematics'>('B.Sc. Mathematics (Honours/Major)');
  const [regSemester, setRegSemester] = useState('B.Sc. 1st Semester (Major)');
  const [regBatch, setRegBatch] = useState('2024 - 2028');
  const [regBio, setRegBio] = useState('');
  const [regInterests, setRegInterests] = useState('Calculus, Linear Algebra');
  const [regAvatar, setRegAvatar] = useState(PRESET_AVATARS[0]);
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);
  const [regError, setRegError] = useState('');

  // Rejection Alert Modal state for non-department students
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectionAttemptDetails, setRejectionAttemptDetails] = useState<{
    name: string;
    roll: string;
    course: string;
  } | null>(null);

  // Profile Edit state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editBio, setEditBio] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editInterests, setEditInterests] = useState('');
  const [avatarUploadLoading, setAvatarUploadLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const registerFileInputRef = useRef<HTMLInputElement>(null);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY_STUDENT);
      if (storedUser) {
        setCurrentStudent(JSON.parse(storedUser));
      }

      const storedList = localStorage.getItem(STORAGE_KEY_REGISTERED_LIST);
      if (storedList) {
        setRegisteredStudents(JSON.parse(storedList));
      } else {
        localStorage.setItem(STORAGE_KEY_REGISTERED_LIST, JSON.stringify(DEFAULT_STUDENT_PROFILES));
      }
    } catch (err) {
      console.error('Error loading student profile from localStorage:', err);
    }
  }, []);

  // Update edit form when current student changes
  useEffect(() => {
    if (currentStudent) {
      setEditBio(currentStudent.bio || '');
      setEditPhone(currentStudent.phone || '');
      setEditInterests(currentStudent.interests?.join(', ') || '');
    }
  }, [currentStudent]);

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const query = loginIdentifier.trim().toLowerCase();
    if (!query) {
      setLoginError('Please enter your Class Roll No, GU Roll No, or College Email.');
      return;
    }

    const found = registeredStudents.find(
      (s) =>
        s.rollNo.toLowerCase() === query ||
        s.email.toLowerCase() === query ||
        (s.guRegNo && s.guRegNo.toLowerCase() === query)
    );

    if (found) {
      setCurrentStudent(found);
      localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(found));
      setLoginIdentifier('');
      setLoginPassword('');
    } else {
      setLoginError('No registered student found with these credentials. Please check or register as a new student.');
    }
  };

  // Demo Login Quick-Fill
  const handleQuickDemoLogin = (demoStudent: StudentProfile) => {
    setCurrentStudent(demoStudent);
    localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(demoStudent));
    setLoginError('');
  };

  // Handle Registration with Mandatory Department Roster Verification
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (!regFullName.trim() || !regRollNo.trim() || !regEmail.trim()) {
      setRegError('Please fill in all mandatory fields (*)');
      return;
    }

    if (regPassword && regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match.');
      return;
    }

    // MANDATORY GATEKEEPER CHECK:
    // Check if the student exists in the official Department of Mathematics roster with matching Name and Course
    const verification = verifyStudentEligibility(regFullName, regRollNo, regProgram);

    if (!verification.isEligible) {
      // Trigger the explicit "YOU ARE NOT A STUDENT OF OUR DEPARTMENT" popup alert
      setRejectionReason(
        verification.reason ||
          'Your submitted full name and enrolled program do not match any authorized student in the Department of Mathematics roster.'
      );
      setRejectionAttemptDetails({
        name: regFullName.trim(),
        roll: regRollNo.trim(),
        course: regProgram
      });
      setRejectionModalOpen(true);
      setRegError('YOU ARE NOT A STUDENT OF OUR DEPARTMENT');
      return;
    }

    // Check duplicate in registered active portal users
    const exists = registeredStudents.some(
      (s) => s.rollNo.toLowerCase() === regRollNo.trim().toLowerCase() || s.email.toLowerCase() === regEmail.trim().toLowerCase()
    );

    if (exists) {
      setRegError('A student with this Roll Number or Email has already activated their portal account. Please log in.');
      return;
    }

    // Assign mentor (use matched student's assigned mentor or faculty member)
    const matched = verification.matchedStudent;
    const assignedMentor = matched?.mentorName || faculty[0]?.name || 'Dr. Bidyut Kalita (HOD)';

    const newStudent: StudentProfile = {
      id: `stu-${Date.now()}`,
      fullName: matched ? matched.fullName : regFullName.trim(),
      rollNo: matched ? matched.rollNo : regRollNo.trim(),
      guRegNo: regGuRegNo.trim() || matched?.guRegNo || `GU${Math.floor(24000000 + Math.random() * 999999)}`,
      email: regEmail.trim(),
      phone: regPhone.trim() || matched?.phone || '+91 94350 00000',
      program: regProgram,
      semester: matched?.semester || regSemester,
      batch: matched?.batch || regBatch,
      avatar: regAvatar,
      bio: regBio.trim() || `Verified student in the Department of Mathematics, Dudhnoi College (${matched?.selectiveCourse || 'Honours track'}).`,
      mentorName: assignedMentor,
      interests: regInterests.split(',').map((i) => i.trim()).filter(Boolean),
      registeredDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };

    const updatedList = [newStudent, ...registeredStudents];
    setRegisteredStudents(updatedList);
    setCurrentStudent(newStudent);

    localStorage.setItem(STORAGE_KEY_REGISTERED_LIST, JSON.stringify(updatedList));
    localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(newStudent));

    setRegSuccess(true);
    setTimeout(() => {
      setRegSuccess(false);
    }, 4000);
  };

  // Handle Logout
  const handleLogout = () => {
    setCurrentStudent(null);
    localStorage.removeItem(STORAGE_KEY_STUDENT);
    setIsEditingProfile(false);
    setActiveTab('profile');
  };

  // Profile Picture File Upload Handler (Data URL)
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>, isRegisterForm = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image file size should be under 5MB.');
      return;
    }

    setAvatarUploadLoading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (isRegisterForm) {
        setRegAvatar(dataUrl);
      } else if (currentStudent) {
        const updated = { ...currentStudent, avatar: dataUrl };
        setCurrentStudent(updated);
        localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(updated));

        // update list
        const updatedList = registeredStudents.map((s) => (s.id === updated.id ? updated : s));
        setRegisteredStudents(updatedList);
        localStorage.setItem(STORAGE_KEY_REGISTERED_LIST, JSON.stringify(updatedList));
      }
      setAvatarUploadLoading(false);
    };
    reader.readAsDataURL(file);
  };

  // Save Profile Edits
  const handleSaveProfileEdits = () => {
    if (!currentStudent) return;
    const updated: StudentProfile = {
      ...currentStudent,
      phone: editPhone.trim() || currentStudent.phone,
      bio: editBio.trim() || currentStudent.bio,
      interests: editInterests.split(',').map((i) => i.trim()).filter(Boolean)
    };

    setCurrentStudent(updated);
    localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(updated));

    const updatedList = registeredStudents.map((s) => (s.id === updated.id ? updated : s));
    setRegisteredStudents(updatedList);
    localStorage.setItem(STORAGE_KEY_REGISTERED_LIST, JSON.stringify(updatedList));

    setIsEditingProfile(false);
  };



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 p-5 sm:p-7 space-y-5">
        
        {/* Header Bar */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 sm:p-3 bg-blue-900 text-amber-400 rounded-xl shadow-xs">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Student Academic Hub & Profile
                </span>
                {currentStudent && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Logged In</span>
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading mt-0.5">
                Department of Mathematics Portal
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 border-b border-slate-100 pb-2.5">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{currentStudent ? 'My Student Profile' : 'Student Login & Register'}</span>
          </button>

          {currentStudent && (
            <>
              <button
                onClick={() => setActiveTab('downloads')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'downloads'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Study Materials & Papers</span>
              </button>

              <button
                onClick={() => setActiveTab('routine')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'routine'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>My Class Routine</span>
              </button>
            </>
          )}
        </div>

        {/* TAB 1: STUDENT PROFILE & AUTHENTICATION */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            
            {/* If Logged In: Display Profile & Profile Picture Changer */}
            {currentStudent ? (
              <div className="space-y-6">
                
                {/* Profile Header Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white shadow-lg border border-slate-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative z-10">
                    
                    {/* Avatar & Photo Upload Controls */}
                    <div className="flex items-center gap-4 sm:gap-5">
                      <div className="relative group">
                        <img
                          src={currentStudent.avatar}
                          alt={currentStudent.fullName}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-amber-400/80 shadow-md bg-slate-800"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          title="Change Profile Picture"
                          className="absolute -bottom-1.5 -right-1.5 p-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl shadow-lg border border-amber-300 transition-transform active:scale-95 cursor-pointer flex items-center justify-center"
                        >
                          <Camera className="w-3.5 h-3.5" />
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileChange(e, false)}
                          className="hidden"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40">
                            {currentStudent.program}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-300 bg-slate-800/80 border border-slate-700">
                            Batch {currentStudent.batch}
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                          {currentStudent.fullName}
                        </h2>
                        <p className="text-xs text-slate-300 flex flex-wrap items-center gap-2">
                          <span>Roll: <strong className="text-amber-300 font-mono">{currentStudent.rollNo}</strong></span>
                          <span>•</span>
                          <span>GU Reg: <strong className="text-slate-200 font-mono">{currentStudent.guRegNo}</strong></span>
                        </p>
                      </div>
                    </div>

                    {/* Actions: Edit Profile, Sign Out */}
                    <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-end">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 bg-slate-800/90 hover:bg-slate-700 text-amber-300 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                      </button>

                      <button
                        onClick={() => setIsEditingProfile(!isEditingProfile)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border flex items-center gap-1.5 transition-colors cursor-pointer ${
                          isEditingProfile
                            ? 'bg-blue-600 text-white border-blue-500'
                            : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                        }`}
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{isEditingProfile ? 'Cancel Edit' : 'Edit Profile'}</span>
                      </button>

                      <button
                        onClick={handleLogout}
                        className="px-3 py-1.5 bg-red-950/70 hover:bg-red-900 text-red-200 text-xs font-semibold rounded-lg border border-red-800/60 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>

                  {/* Preset Avatar Selector Quick Picker */}
                  <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Choose Avatar or Upload Custom Photo:</span>
                    </span>
                    <div className="flex items-center gap-2">
                      {PRESET_AVATARS.map((imgUrl, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            const updated = { ...currentStudent, avatar: imgUrl };
                            setCurrentStudent(updated);
                            localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(updated));
                            const updatedList = registeredStudents.map((s) => (s.id === updated.id ? updated : s));
                            setRegisteredStudents(updatedList);
                            localStorage.setItem(STORAGE_KEY_REGISTERED_LIST, JSON.stringify(updatedList));
                          }}
                          className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-transform hover:scale-110 cursor-pointer ${
                            currentStudent.avatar === imgUrl ? 'border-amber-400 ring-2 ring-amber-400/50' : 'border-slate-700 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={imgUrl} alt={`Avatar ${i + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Edit Profile Form (Conditional) */}
                {isEditingProfile && (
                  <div className="p-5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-4 animate-in fade-in duration-150 text-xs">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-blue-950 flex items-center gap-1.5">
                        <Edit3 className="w-4 h-4 text-blue-800" />
                        <span>Update Personal Details & Mathematical Interests</span>
                      </h4>
                      <span className="text-[11px] text-slate-500">Changes are saved instantly to your device</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Phone / WhatsApp Number</label>
                        <input
                          type="text"
                          value={editPhone}
                          onChange={(e) => setEditPhone(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Areas of Mathematical Interest (comma-separated)</label>
                        <input
                          type="text"
                          value={editInterests}
                          onChange={(e) => setEditInterests(e.target.value)}
                          placeholder="e.g. Number Theory, Differential Equations, SageMath"
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Short Bio / Academic Ambition</label>
                      <textarea
                        rows={2}
                        value={editBio}
                        onChange={(e) => setEditBio(e.target.value)}
                        placeholder="Tell the department about your academic pursuits, Olympiad prep, or research goals..."
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 resize-none"
                      ></textarea>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsEditingProfile(false)}
                        className="px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfileEdits}
                        className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Profile Changes</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Profile Details & Academic Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Left Column: Academic Credentials & Contact */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3.5 text-xs">
                      <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                        <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-blue-900" />
                          <span>Academic Enrollment Information</span>
                        </h4>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Active Student
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <span className="text-slate-500 block text-[11px]">Enrolled Program</span>
                          <span className="font-bold text-slate-800">{currentStudent.program}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[11px]">Current Semester</span>
                          <span className="font-bold text-slate-800">{currentStudent.semester}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[11px]">Official Student Email</span>
                          <span className="font-medium text-blue-900">{currentStudent.email}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[11px]">Contact Phone</span>
                          <span className="font-medium text-slate-800">{currentStudent.phone}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[11px]">Assigned Faculty Mentor</span>
                          <span className="font-bold text-amber-700">{currentStudent.mentorName || 'Dr. Bidyut Kalita (HOD)'}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[11px]">Registration Date</span>
                          <span className="font-medium text-slate-800">{currentStudent.registeredDate}</span>
                        </div>
                      </div>

                      {currentStudent.bio && (
                        <div className="pt-2 border-t border-slate-200/80">
                          <span className="text-slate-500 block text-[11px] mb-1">Student Bio / Statement:</span>
                          <p className="text-slate-700 italic bg-white p-2.5 rounded-lg border border-slate-200">
                            "{currentStudent.bio}"
                          </p>
                        </div>
                      )}

                      {currentStudent.interests && currentStudent.interests.length > 0 && (
                        <div className="pt-2">
                          <span className="text-slate-500 block text-[11px] mb-1.5">Special Interests & Coding:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {currentStudent.interests.map((tag, i) => (
                              <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-900 rounded border border-blue-200 text-[11px] font-medium">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Digital Student ID Badge */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-gradient-to-b from-blue-900 to-slate-900 text-white shadow-md border border-blue-800 text-xs space-y-3 relative overflow-hidden">
                      <div className="flex items-center justify-between border-b border-white/20 pb-2">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-amber-300 font-bold">Dudhnoi College</span>
                          <h5 className="font-bold text-white leading-tight">Digital Student ID Card</h5>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-serif font-bold flex items-center justify-center text-sm">
                          ∑
                        </div>
                      </div>

                      <div className="flex items-center gap-3 py-1">
                        <img
                          src={currentStudent.avatar}
                          alt={currentStudent.fullName}
                          className="w-14 h-14 rounded-lg object-cover border border-amber-300 shadow-xs"
                          referrerPolicy="no-referrer"
                        />
                        <div className="space-y-0.5">
                          <p className="font-bold text-sm text-amber-300">{currentStudent.fullName}</p>
                          <p className="text-[11px] text-slate-200">{currentStudent.semester}</p>
                          <p className="text-[10px] font-mono text-slate-300">{currentStudent.rollNo}</p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-300">
                        <span>Status: <strong className="text-emerald-400">VERIFIED</strong></span>
                        <span>Dept: <strong className="text-white">Mathematics</strong></span>
                      </div>

                      {/* Barcode representation */}
                      <div className="h-6 w-full bg-white/20 rounded flex items-center justify-center font-mono text-[9px] tracking-widest text-slate-200">
                        ||| | |||| | | |||| ||| ||
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1.5">
                      <span className="font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                        <span>Departmental Privileges</span>
                      </span>
                      <p className="text-[11px] text-amber-800 leading-relaxed">
                        Access granted to Computing Lab Workstations (SageMath/Python), Seminar Library borrowing (up to 4 volumes), and departmental seminar registrations.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              /* If NOT Logged In: Show Login / Register Switcher */
              <div className="space-y-5">
                
                {/* Switcher tabs */}
                <div className="flex items-center justify-center">
                  <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                    <button
                      onClick={() => {
                        setAuthMode('login');
                        setLoginError('');
                        setRegError('');
                      }}
                      className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        authMode === 'login'
                          ? 'bg-blue-900 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Existing Student Sign In</span>
                    </button>
                    <button
                      onClick={() => {
                        setAuthMode('register');
                        setLoginError('');
                        setRegError('');
                      }}
                      className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        authMode === 'register'
                          ? 'bg-blue-900 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Register As New Student</span>
                    </button>
                  </div>
                </div>

                {/* MODE A: LOGIN */}
                {authMode === 'login' && (
                  <div className="max-w-md mx-auto space-y-4">
                    <div className="text-center space-y-1">
                      <h4 className="text-base font-bold text-slate-900">Student Portal Sign In</h4>
                      <p className="text-xs text-slate-500">
                        Enter your Class Roll No, GU Roll Number, or College Email address.
                      </p>
                    </div>

                    {loginError && (
                      <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{loginError}</span>
                      </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-3.5 text-xs">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Roll No / GU Registration No / Email *
                        </label>
                        <div className="relative">
                          <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. US-241-102-0042 or ankur.rabha@student.dudhnoicollege.ac.in"
                            value={loginIdentifier}
                            onChange={(e) => setLoginIdentifier(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all text-xs text-slate-800"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Password (Optional for Demo Mode)
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all text-xs text-slate-800"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer text-xs"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Log In to Student Portal</span>
                      </button>
                    </form>

                    {/* Quick Demo Login Preset Buttons */}
                    <div className="pt-4 border-t border-slate-200 space-y-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                        Instant Quick Login (Demo Profiles)
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {registeredStudents.slice(0, 2).map((stu) => (
                          <button
                            key={stu.id}
                            type="button"
                            onClick={() => handleQuickDemoLogin(stu)}
                            className="p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-left transition-all flex items-center gap-2.5 cursor-pointer"
                          >
                            <img src={stu.avatar} alt={stu.fullName} className="w-8 h-8 rounded-full object-cover border border-slate-300" />
                            <div className="overflow-hidden">
                              <p className="font-bold text-[11px] text-slate-800 truncate">{stu.fullName}</p>
                              <p className="text-[10px] text-slate-500 font-mono">{stu.rollNo}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* MODE B: REGISTRATION */}
                {authMode === 'register' && (
                  <div className="space-y-4">
                    <div className="text-center space-y-1">
                      <h4 className="text-base font-bold text-slate-900">Department Student Registration</h4>
                      <p className="text-xs text-slate-500">
                        Create your student profile to access digital notes, track mentorship, and customize your avatar.
                      </p>
                    </div>

                    {/* Department Authorization Gatekeeper Notice */}
                    <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="font-bold text-amber-900">Department Roster Verification Active</p>
                        <p className="text-[11px] text-amber-800/90 leading-relaxed">
                          Registration is restricted to enrolled students of the Department of Mathematics. Please enter your name, roll number, and enrolled course as registered in official college records.
                        </p>
                      </div>
                    </div>

                    {regError && (
                      <div className="p-3.5 rounded-xl bg-red-50 border-2 border-red-300 text-red-800 text-xs flex items-center justify-between gap-2 shadow-2xs animate-in fade-in">
                        <div className="flex items-center gap-2.5">
                          <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
                          <div>
                            <p className="font-bold text-red-950 uppercase tracking-wide">{regError}</p>
                            <p className="text-[11px] text-red-700">The entered details do not match the authorized departmental roster.</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setRejectionModalOpen(true)}
                          className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] rounded-md transition-colors cursor-pointer shrink-0"
                        >
                          View Details
                        </button>
                      </div>
                    )}

                    {regSuccess && (
                      <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Registration successful! Welcome to the Department of Mathematics.</span>
                      </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-4 text-xs">
                      
                      {/* Photo Upload & Avatar Picker Section */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                        <span className="font-bold text-slate-800 block">
                          Profile Picture / Student Photo *
                        </span>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                          <div className="relative group shrink-0">
                            <img
                              src={regAvatar}
                              alt="Profile Preview"
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-blue-900 shadow-md bg-slate-200"
                            />
                            <button
                              type="button"
                              onClick={() => registerFileInputRef.current?.click()}
                              className="absolute -bottom-1 -right-1 p-1.5 bg-blue-900 text-white rounded-lg hover:bg-blue-950 shadow cursor-pointer"
                              title="Upload custom photo"
                            >
                              <Camera className="w-3.5 h-3.5" />
                            </button>
                            <input
                              ref={registerFileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageFileChange(e, true)}
                              className="hidden"
                            />
                          </div>

                          <div className="space-y-2 text-center sm:text-left">
                            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                              <button
                                type="button"
                                onClick={() => registerFileInputRef.current?.click()}
                                className="px-3 py-1.5 bg-white border border-slate-300 hover:border-blue-800 text-blue-900 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                              >
                                <Upload className="w-3.5 h-3.5" />
                                <span>Upload Photo From Computer/Phone</span>
                              </button>
                            </div>
                            <p className="text-[11px] text-slate-500">
                              Or pick one of our mathematics scholar avatar presets:
                            </p>
                            <div className="flex items-center gap-2 justify-center sm:justify-start">
                              {PRESET_AVATARS.map((url, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => setRegAvatar(url)}
                                  className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-transform hover:scale-110 cursor-pointer ${
                                    regAvatar === url ? 'border-blue-900 ring-2 ring-blue-400' : 'border-slate-300 opacity-70 hover:opacity-100'
                                  }`}
                                >
                                  <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Name & Roll Numbers */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Bhaskar Jyoti Nath"
                            value={regFullName}
                            onChange={(e) => setRegFullName(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Class Roll No / GU Roll *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. US-241-102-0055"
                            value={regRollNo}
                            onChange={(e) => setRegRollNo(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">GU Registration No.</label>
                          <input
                            type="text"
                            placeholder="e.g. GU24099812"
                            value={regGuRegNo}
                            onChange={(e) => setRegGuRegNo(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                          />
                        </div>
                      </div>

                      {/* Contact & Program */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">College / Personal Email *</label>
                          <input
                            type="email"
                            required
                            placeholder="student@dudhnoicollege.ac.in"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Mobile / WhatsApp Number</label>
                          <input
                            type="tel"
                            placeholder="+91 94350 XXXXX"
                            value={regPhone}
                            onChange={(e) => setRegPhone(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Program *</label>
                          <select
                            value={regProgram}
                            onChange={(e) => setRegProgram(e.target.value as any)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                          >
                            <option value="B.Sc. Mathematics (Honours/Major)">B.Sc. Mathematics (Major)</option>
                            <option value="B.Sc. Mathematics (Minor)">B.Sc. Mathematics (Minor)</option>
                            <option value="M.Sc. Mathematics">M.Sc. Mathematics</option>
                          </select>
                        </div>
                      </div>

                      {/* Semester & Batch */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Current Semester *</label>
                          <select
                            value={regSemester}
                            onChange={(e) => setRegSemester(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                          >
                            <option>B.Sc. 1st Semester (Major)</option>
                            <option>B.Sc. 2nd Semester (Major)</option>
                            <option>B.Sc. 3rd Semester (Major)</option>
                            <option>B.Sc. 4th Semester (Major)</option>
                            <option>B.Sc. 5th Semester (Major)</option>
                            <option>B.Sc. 6th Semester (Major)</option>
                            <option>M.Sc. 1st / 2nd Year</option>
                            <option>Minor / Multidisciplinary Course</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Academic Batch</label>
                          <input
                            type="text"
                            placeholder="e.g. 2024 - 2028"
                            value={regBatch}
                            onChange={(e) => setRegBatch(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Areas of Interest</label>
                          <input
                            type="text"
                            placeholder="e.g. Calculus, Python, Algebra"
                            value={regInterests}
                            onChange={(e) => setRegInterests(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                          />
                        </div>
                      </div>

                      {/* Bio */}
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Short Student Bio (Optional)</label>
                        <textarea
                          rows={2}
                          placeholder="Introduce yourself, your mathematical passion, or extracurricular interests..."
                          value={regBio}
                          onChange={(e) => setRegBio(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white resize-none"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer text-xs"
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>Register As Student & Create Profile</span>
                      </button>
                    </form>
                  </div>
                )}

              </div>
            )}

          </div>
        )}

        {/* TAB 2: DOWNLOADS & STUDY RESOURCES (Only after login) */}
        {activeTab === 'downloads' && currentStudent && (
          <div className="space-y-3">
            <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl text-blue-950 flex items-center justify-between">
              <div>
                <span className="font-bold block">Study Materials, Syllabus & Question Banks</span>
                <p className="text-[11px] text-slate-600">Confidential repository for enrolled department students.</p>
              </div>
              <span className="text-[10px] font-mono bg-white px-2 py-1 rounded border border-blue-200 font-bold text-blue-900">
                {currentStudent.semester}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STUDENT_RESOURCES.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-blue-900/40 hover:bg-white transition-all space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase">
                      {item.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-200/60 text-xs">
                    <span className="text-[10px] font-mono text-slate-400">{item.fileType}</span>
                    <button
                      onClick={() => downloadStudyResourcePDF(item)}
                      className="px-3 py-1.5 bg-blue-900 hover:bg-blue-950 text-white text-[11px] font-bold rounded-lg flex items-center gap-1 transition-colors cursor-pointer shadow-xs active:scale-95"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PERSONALIZED CLASS ROUTINE (Only after login, filtered by student's semester) */}
        {activeTab === 'routine' && currentStudent && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-blue-950 text-sm block">
                  Class Routine for Registered Semester: {currentStudent.semester}
                </span>
                <p className="text-[11px] text-slate-600">
                  Secure academic schedule mapped to your student profile • Autumn Semester 2026
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs font-mono font-bold bg-white text-blue-900 px-2.5 py-1 rounded border border-blue-200">
                  {currentStudent.program}
                </span>
                <button
                  onClick={() => downloadClassRoutinePDF(routineSlots, currentStudent.semester || 'Semester Routine')}
                  className="px-3 py-1.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs active:scale-95"
                  title="Download Routine PDF to Device"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save Timetable PDF</span>
                </button>
              </div>
            </div>

            {(() => {
              const semStr = (currentStudent.semester || '').toLowerCase();
              let semNum = 1;
              if (semStr.includes('1') || semStr.includes('first') || semStr.includes('i')) semNum = 1;
              else if (semStr.includes('2') || semStr.includes('second') || semStr.includes('ii')) semNum = 2;
              else if (semStr.includes('3') || semStr.includes('third') || semStr.includes('iii')) semNum = 3;
              else if (semStr.includes('4') || semStr.includes('fourth') || semStr.includes('iv')) semNum = 4;
              else if (semStr.includes('5') || semStr.includes('fifth') || semStr.includes('v')) semNum = 5;
              else if (semStr.includes('6') || semStr.includes('sixth') || semStr.includes('vi')) semNum = 6;

              const semKey = `sem${semNum}` as 'sem1' | 'sem2' | 'sem3' | 'sem4' | 'sem5' | 'sem6';

              return (
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white">
                  <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between font-bold text-slate-700">
                    <span>Time Slot & Day</span>
                    <span>B.Sc. / M.Sc. Semester {semNum} Lecture Plan</span>
                  </div>
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                        <th className="p-3">Time Slot & Schedule</th>
                        <th className="p-3">Course Title & Instructor</th>
                        <th className="p-3">Course Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {routineSlots.map((slot) => {
                        const entry = slot[semKey] || { course: '', type: 'Major' };
                        return (
                          <tr key={slot.id} className="hover:bg-slate-50">
                            <td className="p-3 font-mono">
                              <span className="font-bold text-blue-900 block">{slot.timeSlot}</span>
                              <span className="text-[10px] text-slate-500">{slot.day || 'Monday - Saturday'}</span>
                            </td>
                            <td className="p-3 font-medium">
                              {entry.course ? (
                                <span className="text-slate-900">{entry.course}</span>
                              ) : (
                                <span className="text-slate-300">— No Lecture Scheduled</span>
                              )}
                            </td>
                            <td className="p-3">
                              {entry.course ? (
                                <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded ${
                                  entry.type === 'Major' ? 'bg-blue-100 text-blue-900' :
                                  entry.type === 'Minor' ? 'bg-amber-100 text-amber-900' : 'bg-purple-100 text-purple-900'
                                }`}>
                                  {entry.type}
                                </span>
                              ) : (
                                <span className="text-slate-350">—</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </div>
        )}

        {/* Footer info & close */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
          <span className="text-[11px] text-slate-400">
            Dudhnoi College Mathematics Department • ERP & Academic Registry
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg cursor-pointer"
          >
            Close Portal
          </button>
        </div>

      </div>

      {/* REJECTION ALERT POPUP MODAL (Strict Gatekeeper Alert) */}
      {rejectionModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border-2 border-red-500 overflow-hidden text-slate-800">
            
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-red-700 via-red-800 to-rose-900 text-white p-6 text-center relative">
              <div className="w-16 h-16 rounded-full bg-white/15 border-2 border-white/40 flex items-center justify-center mx-auto mb-3 shadow-inner">
                <ShieldAlert className="w-9 h-9 text-amber-300 animate-pulse" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-red-200 bg-red-950/60 px-3 py-1 rounded-full border border-red-400/40 inline-block mb-1.5">
                Department Gatekeeper Alert
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-wide uppercase text-white leading-tight">
                YOU ARE NOT A STUDENT OF OUR DEPARTMENT
              </h2>
              <p className="text-xs text-red-100/90 mt-1 max-w-md mx-auto">
                Department of Mathematics, Dudhnoi College
              </p>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-4 text-xs">
              
              {/* Reason Explanation */}
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-red-950 space-y-1">
                <div className="flex items-center gap-2 font-bold text-red-900 text-xs">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Verification Failed</span>
                </div>
                <p className="text-xs text-red-800 leading-relaxed pl-6">
                  {rejectionReason || 'The name, roll number, or selective course you entered does not match any student currently enrolled in the Department of Mathematics records.'}
                </p>
              </div>

              {/* Submitted Details Review */}
              {rejectionAttemptDetails && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Details Provided in Registration Attempt:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-slate-500 block text-[10px]">Submitted Name:</span>
                      <strong className="text-slate-900 font-semibold">{rejectionAttemptDetails.name || '—'}</strong>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-slate-500 block text-[10px]">Submitted Roll No:</span>
                      <strong className="text-slate-900 font-mono font-semibold">{rejectionAttemptDetails.roll || '—'}</strong>
                    </div>
                    <div className="sm:col-span-2 bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-slate-500 block text-[10px]">Selected Program / Course:</span>
                      <strong className="text-slate-900 font-semibold">{rejectionAttemptDetails.course || '—'}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Helpful Steps */}
              <div className="space-y-1.5 text-slate-600 bg-blue-50/60 p-3.5 rounded-2xl border border-blue-100 text-[11px]">
                <span className="font-bold text-blue-950 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-blue-800" />
                  <span>How to resolve this issue:</span>
                </span>
                <ul className="list-disc pl-5 space-y-1 text-slate-700 leading-relaxed">
                  <li>Ensure your full name matches the spelling on your college admission slip.</li>
                  <li>Verify that you selected your correct course (B.Sc. Major vs Minor in Mathematics).</li>
                  <li>If you are a newly admitted student not yet listed in the department database, please contact HOD Dr. Bidyut Kalita or your mentor.</li>
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setRejectionModalOpen(false)}
                  className="w-full py-3 bg-red-700 hover:bg-red-800 active:bg-red-900 text-white font-bold rounded-2xl shadow-md transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>I Understand • Review & Correct Details</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
