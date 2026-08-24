import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Lock,
  Unlock,
  Building2,
  Users,
  GraduationCap,
  Bell,
  Calendar,
  BookOpen,
  FlaskConical,
  Trophy,
  Image as ImageIcon,
  FileText,
  Save,
  Plus,
  Trash2,
  Edit3,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  LogOut,
  Sliders,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Search,
  MonitorCheck,
  Layers,
  UserPlus,
  ShieldAlert,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { useDepartmentData } from '../context/DataContext';
import { AdminStudentsSection } from './AdminStudentsSection';
import { AdminPortalManager } from './AdminPortalManager';
import {
  FacultyMember,
  NoticeItem,
  EventItem,
  Course,
  ResearchArea,
  ResearchProject,
  Publication,
  AchievementItem,
  GalleryItem,
  BlogPost,
  AdminAccount
} from '../types';

type AdminTab =
  | 'general'
  | 'hero'
  | 'card-header'
  | 'faculty'
  | 'students'
  | 'portal'
  | 'notices'
  | 'events'
  | 'courses'
  | 'research'
  | 'achievements'
  | 'gallery'
  | 'blogs'
  | 'welcome'
  | 'stats'
  | 'foundations'
  | 'backup'
  | 'admins';

export const AdminCMSModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,

    departmentInfo,
    updateDepartmentInfo,
    stats,
    updateStats,

    faculty,
    addFaculty,
    updateFaculty,
    deleteFaculty,

    departmentStudents,
    addDepartmentStudent,
    updateDepartmentStudent,
    deleteDepartmentStudent,
    bulkImportDepartmentStudents,

    notices,
    addNotice,
    updateNotice,
    deleteNotice,

    events,
    addEvent,
    updateEvent,
    deleteEvent,

    courses,
    addCourse,
    updateCourse,
    deleteCourse,

    researchAreas,
    addResearchArea,
    updateResearchArea,
    deleteResearchArea,

    researchProjects,
    addResearchProject,
    updateResearchProject,
    deleteResearchProject,

    publications,
    addPublication,
    updatePublication,
    deletePublication,

    achievements,
    addAchievement,
    updateAchievement,
    deleteAchievement,

    gallery,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,

    blogs,
    deleteBlog,

    resetAllToDefaults,
    exportDataJson,
    importDataJson,

    admins,
    currentAdmin,
    adminRegistrationRequests,
    addAdminAccount,
    updateAdminAccount,
    deleteAdminAccount,
    submitAdminRegistrationRequest,
    approveAdminRegistrationRequest,
    rejectAdminRegistrationRequest
  } = useDepartmentData();

  // Local tab state
  const [activeTab, setActiveTab] = useState<AdminTab>('general');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // Administrative registration states
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRole, setRegRole] = useState<'HOD' | 'Department Admin' | 'Faculty Editor'>('Department Admin');
  const [regPassword, setRegPassword] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccessMsg, setRegSuccessMsg] = useState('');

  // Form states for adding/editing specific items
  const [editingFaculty, setEditingFaculty] = useState<FacultyMember | null>(null);
  const [editingNotice, setEditingNotice] = useState<NoticeItem | null>(null);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingResearchArea, setEditingResearchArea] = useState<ResearchArea | null>(null);
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null);
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<AchievementItem | null>(null);

  // Admin account management states
  const [editingAdmin, setEditingAdmin] = useState<AdminAccount | null>(null);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [adminFormState, setAdminFormState] = useState<Partial<AdminAccount>>({
    fullName: '',
    username: '',
    email: '',
    role: 'Department Admin',
    passwordHash: '',
    status: 'Active'
  });

  // General info form local state
  const [generalForm, setGeneralForm] = useState(departmentInfo);

  // Sync generalForm whenever departmentInfo changes or admin modal opens
  useEffect(() => {
    if (isAdminOpen) {
      setGeneralForm(departmentInfo);
    }
  }, [departmentInfo, isAdminOpen]);

  // File import ref
  const importFileRef = useRef<HTMLInputElement>(null);

  if (!isAdminOpen) return null;

  const showStatus = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const compressAndReadImage = (file: File, callback: (dataUrl: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (!src) return;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 800;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_DIM) {
            height *= MAX_DIM / width;
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width *= MAX_DIM / height;
            height = MAX_DIM;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.6);
          callback(compressed);
        } else {
          callback(src);
        }
      };
      img.onerror = () => callback(src);
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!username.trim() || !password.trim()) {
      setLoginError('Please enter both your Username/Email and Password.');
      return;
    }
    const success = loginAdmin(username, password);
    if (success) {
      setUsername('');
      setPassword('');
      setGeneralForm(departmentInfo);
      showStatus('Admin control panel unlocked successfully.');
    } else {
      setLoginError('Invalid Username/Email or Password. Check your credentials and try again.');
    }
  };



  const handleAdminRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    setRegSuccessMsg('');

    if (!regFullName.trim() || !regUsername.trim() || !regEmail.trim() || !regPassword.trim()) {
      setRegError('All fields are strictly required.');
      return;
    }

    const normalizedUser = regUsername.trim().toLowerCase();
    const normalizedEmail = regEmail.trim().toLowerCase();
    const isDuplicate = admins.some(a => a.username.toLowerCase() === normalizedUser || a.email.toLowerCase() === normalizedEmail);
    if (isDuplicate) {
      setRegError('An administrator account with this Username or Email is already registered.');
      return;
    }

    const isDuplicateRequest = (adminRegistrationRequests || []).some(
      r => r.status === 'Pending' && (r.username.toLowerCase() === normalizedUser || r.email.toLowerCase() === normalizedEmail)
    );
    if (isDuplicateRequest) {
      setRegError('A pending registration request with this Username or Email already exists.');
      return;
    }

    submitAdminRegistrationRequest({
      fullName: regFullName.trim(),
      username: regUsername.trim(),
      email: regEmail.trim(),
      role: regRole,
      passwordHash: regPassword.trim()
    });

    setRegSuccessMsg('Your registration request has been submitted successfully! Please wait for authorization/approval from Super Admin Kandorpo Barman.');
    
    setRegFullName('');
    setRegUsername('');
    setRegEmail('');
    setRegPassword('');
  };

  const handleSaveAdminAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminFormState.fullName?.trim() || !adminFormState.username?.trim() || !adminFormState.email?.trim() || !adminFormState.passwordHash?.trim()) {
      alert('All fields including password are required.');
      return;
    }

    if (editingAdmin) {
      const updated: AdminAccount = {
        ...editingAdmin,
        fullName: adminFormState.fullName,
        username: adminFormState.username,
        email: adminFormState.email,
        role: adminFormState.role as any,
        passwordHash: adminFormState.passwordHash,
        status: adminFormState.status as any
      };
      updateAdminAccount(updated);
      showStatus(`Admin account "${updated.fullName}" updated successfully.`);
    } else {
      // Check duplicate
      const cleanUser = adminFormState.username.trim().toLowerCase();
      const cleanEmail = adminFormState.email.trim().toLowerCase();
      const duplicate = (admins || []).some(a => a.username.toLowerCase() === cleanUser || a.email.toLowerCase() === cleanEmail);
      if (duplicate) {
        alert('An account with this Username or Email already exists.');
        return;
      }

      const newAdmin: AdminAccount = {
        id: 'admin-' + Date.now(),
        fullName: adminFormState.fullName.trim(),
        username: adminFormState.username.trim(),
        email: adminFormState.email.trim(),
        role: adminFormState.role as any,
        passwordHash: adminFormState.passwordHash.trim(),
        status: adminFormState.status as any
      };
      addAdminAccount(newAdmin);
      showStatus(`New admin account "${newAdmin.fullName}" created successfully.`);
    }

    // Reset Form
    setEditingAdmin(null);
    setShowAdminForm(false);
    setAdminFormState({
      fullName: '',
      username: '',
      email: '',
      role: 'Department Admin',
      passwordHash: '',
      status: 'Active'
    });
  };

  const handleEditAdmin = (admin: AdminAccount) => {
    setEditingAdmin(admin);
    setAdminFormState({
      fullName: admin.fullName,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      passwordHash: admin.passwordHash,
      status: admin.status
    });
    setShowAdminForm(true);
  };

  const handleDeleteAdmin = (id: string) => {
    const isSuperAdmin = currentAdmin?.role === 'Super Admin' || currentAdmin?.username?.toLowerCase() === 'kandorpo';
    if (!isSuperAdmin) {
      showStatus('Unauthorized access: Only a Super Admin can delete administrator accounts.');
      return;
    }
    if (currentAdmin && currentAdmin.id === id) {
      showStatus('Security violation: You cannot delete your own logged-in administrator profile.');
      return;
    }
    const target = (admins || []).find(a => a.id === id);
    if (!target) return;
    deleteAdminAccount(id);
    showStatus(`Administrator account "${target.fullName}" removed.`);
  };

  const handleSaveGeneralInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateDepartmentInfo(generalForm);
    showStatus('Department General Information saved and updated live.');
  };

  const handleFacultyImageUpload = (file: File | undefined) => {
    if (!file || !editingFaculty) return;
    compressAndReadImage(file, (dataUrl) => {
      setEditingFaculty({ ...editingFaculty, image: dataUrl });
      showStatus(`${file.name} uploaded and set as profile picture.`);
    });
  };

  const handleFileUpload = (file: File | undefined, imageKey: 'logoUrl' | 'imageUrls') => {
    if (!file) return;

    compressAndReadImage(file, (dataUrl) => {
      if (imageKey === 'imageUrls') {
        const updatedImages = [...(generalForm.imageUrls || []), dataUrl];
        const updatedForm = { ...generalForm, imageUrls: updatedImages };
        setGeneralForm(updatedForm);
        updateDepartmentInfo(updatedForm);
        showStatus(`${file.name} uploaded and added to header images.`);
      } else {
        const updatedForm = { ...generalForm, [imageKey]: dataUrl };
        setGeneralForm(updatedForm);
        updateDepartmentInfo(updatedForm);
        showStatus(`${file.name} uploaded and updated.`);
      }
    });
  };

  const handleExportJson = () => {
    const jsonStr = exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dudhnoi_math_website_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showStatus('Website data exported successfully.');
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importDataJson(content);
        if (success) {
          showStatus('Website backup data imported successfully!');
        } else {
          alert('Invalid JSON backup file. Please check file format.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-cms-title"
    >
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-900 text-white border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-400 text-slate-950 rounded-xl shadow-xs" aria-hidden="true">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                  Dudhnoi College CMS
                </span>
                {isAdminLoggedIn && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Admin Active
                  </span>
                )}
              </div>
              <h3 id="admin-cms-title" className="text-base sm:text-lg font-bold font-heading text-white">
                Website Content Management System & Editor
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Logout of Admin Mode"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification Toast */}
        {statusMsg && (
          <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-bold flex items-center justify-between shrink-0 animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{statusMsg}</span>
            </div>
            <button onClick={() => setStatusMsg(null)} className="text-white/80 hover:text-white text-xs">
              ✕
            </button>
          </div>
        )}

        {/* Content Body */}
        {!isAdminLoggedIn ? (
          authMode === 'login' ? (
            /* Login Screen */
            <div className="p-8 sm:p-12 flex flex-col items-center justify-center max-w-md mx-auto text-center my-auto space-y-6 w-full animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center shadow-inner border border-blue-100">
                <Lock className="w-8 h-8 text-blue-900" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-bold font-heading text-slate-900">
                  Department Administrator Login
                </h4>
                <p className="text-xs text-slate-600">
                  Enter your administrative credentials to manage faculty members, syllabus routines, notices, student portals, and department records.
                </p>
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2 w-full text-left">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="w-full space-y-4 text-left">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Username or Admin Email
                  </label>
                  <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none transition-all"
                    autoFocus
                  />
                </div>

                <div className="space-y-1.5 relative">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Security Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Unlock className="w-4 h-4 text-amber-400" />
                  <span>Unlock Control Panel</span>
                </button>
              </form>

              {/* Toggle to Registration Form */}
              <div className="pt-2 w-full text-center">
                <p className="text-xs text-slate-500">
                  Are you an HOD or Department Admin?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setRegError('');
                      setRegSuccessMsg('');
                      setAuthMode('register');
                    }}
                    className="text-blue-900 font-bold hover:underline cursor-pointer"
                  >
                    Submit Registration Request
                  </button>
                </p>
              </div>


            </div>
          ) : (
            /* Register Screen */
            <div className="p-8 sm:p-12 flex flex-col items-center justify-center max-w-lg mx-auto text-center my-auto space-y-6 w-full animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shadow-inner border border-amber-100">
                <UserPlus className="w-8 h-8 text-amber-600" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-bold font-heading text-slate-900">
                  Admin Registration Portal
                </h4>
                <p className="text-xs text-slate-600">
                  Submit a secure authorization request to register as an HOD or Department Admin editor.
                </p>
              </div>

              {/* High Contrast Super Admin Approval Warning */}
              <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl text-left space-y-2">
                <p className="text-amber-900 font-bold text-xs flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Super Admin Authorization Enforced</span>
                </p>
                <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
                  To protect the integrity of official college web content, all HOD and Department Admin accounts require explicit verification and manual approval by <strong>Super Admin Kandorpo Barman</strong> before access is active.
                </p>
              </div>

              {regError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2 w-full text-left">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{regError}</span>
                </div>
              )}

              {regSuccessMsg && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex flex-col gap-2 w-full text-left">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-bold">{regSuccessMsg}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleAdminRegistration} className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Full Display Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Barnali Kalita"
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Official Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. barnali@dudhnoicollege.ac.in"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Requested Account Role
                  </label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none transition-all"
                  >
                    <option value="HOD">HOD (Department Head)</option>
                    <option value="Department Admin">Department Admin (Editor)</option>
                    <option value="Faculty Editor">Faculty Editor (Read-only contributor)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Desired Username
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. barnali_math"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value.replace(/\s+/g, ''))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none transition-all font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Account Security Password
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Provide secure password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none transition-all font-mono"
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4 text-white" />
                    <span>Submit Registration Request</span>
                  </button>
                </div>
              </form>

              {/* Back to Login */}
              <div className="pt-2 w-full text-center">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-xs text-blue-900 font-bold hover:underline cursor-pointer flex items-center justify-center gap-1.5 mx-auto"
                >
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  <span>Back to Administrator Login</span>
                </button>
              </div>
            </div>
          )
        ) : (
          /* Admin Tabs & Editing Panels */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation Tabs */}
            <div className="w-full md:w-56 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-2 sm:p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto shrink-0 text-xs">
              <button
                onClick={() => setActiveTab('general')}
                className={`px-3 py-2 rounded-xl font-bold flex items-center gap-2 text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'general'
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Building2 className="w-4 h-4 shrink-0" />
                <span>General Info</span>
              </button>

              <button
                onClick={() => setActiveTab('hero')}
                className={`px-3 py-2 rounded-xl font-bold flex items-center gap-2 text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'hero'
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Hero Section</span>
              </button>

              <button
                onClick={() => setActiveTab('card-header')}
                className={`px-3 py-2 rounded-xl font-bold flex items-center gap-2 text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'card-header'
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Sliders className="w-4 h-4 shrink-0" />
                <span>Card Header</span>
              </button>

              <button
                onClick={() => setActiveTab('faculty')}
                className={`px-3 py-2 rounded-xl font-bold flex items-center gap-2 text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'faculty'
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Users className="w-4 h-4 shrink-0" />
                <span>Faculty ({faculty.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('students')}
                className={`px-3 py-2 rounded-xl font-bold flex items-center gap-2 text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'students'
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <GraduationCap className="w-4 h-4 shrink-0 text-amber-500" />
                <span>Students Roster ({departmentStudents.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('portal')}
                className={`px-3 py-2 rounded-xl font-bold flex items-center gap-2 text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'portal'
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Layers className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Student Portal & Routines</span>
              </button>

              <button
                onClick={() => setActiveTab('notices')}
                className={`px-3 py-2 rounded-xl font-bold flex items-center gap-2 text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'notices'
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Bell className="w-4 h-4 shrink-0" />
                <span>Notices ({notices.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('events')}
                className={`px-3 py-2 rounded-xl font-bold flex items-center gap-2 text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'events'
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Events ({events.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('courses')}
                className={`px-3 py-2 rounded-xl font-bold flex items-center gap-2 text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'courses'
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>Courses & NEP ({courses.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('research')}
                className={`px-3 py-2 rounded-xl font-bold flex items-center gap-2 text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'research'
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <FlaskConical className="w-4 h-4 shrink-0" />
                <span>Research & Papers</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-3 py-2 rounded-xl font-bold flex items-center gap-2 text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'gallery'
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <ImageIcon className="w-4 h-4 shrink-0" />
                <span>Gallery ({gallery.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('achievements')}
                className={`px-3 py-2 rounded-xl font-bold flex items-center gap-2 text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'achievements'
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Trophy className="w-4 h-4 shrink-0" />
                <span>Achievements ({achievements.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('welcome')}
                className={`px-3 py-2 rounded-xl font-bold flex items-center gap-2 text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'welcome'
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Welcome Section</span>
              </button>

              <button
                onClick={() => setActiveTab('stats')}
                className={`px-3 py-2 rounded-xl font-bold flex items-center gap-2 text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'stats'
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <MonitorCheck className="w-4 h-4 shrink-0" />
                <span>Stats Counter</span>
              </button>

              <button
                onClick={() => setActiveTab('foundations')}
                className={`px-3 py-2 rounded-xl font-bold flex items-center gap-2 text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'foundations'
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Foundations</span>
              </button>

              <button
                onClick={() => setActiveTab('admins')}
                className={`px-3 py-2 rounded-xl font-bold flex items-center gap-2 text-left whitespace-nowrap transition-colors cursor-pointer mt-auto border-t border-slate-200 pt-3 ${
                  activeTab === 'admins'
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Lock className="w-4 h-4 shrink-0" />
                <span>Admin Accounts ({admins?.length || 3})</span>
              </button>
            </div>

            {/* Main Panel Content Area */}
            <div className="flex-1 p-5 sm:p-7 overflow-y-auto max-h-[calc(94vh-120px)] space-y-6">
              
              {/* TAB 1: General Info */}
              {activeTab === 'general' && (
                <form onSubmit={handleSaveGeneralInfo} className="space-y-5 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-heading">
                        General Department Credentials & Overview
                      </h4>
                      <p className="text-slate-500 text-[11px]">
                        Updates will reflect immediately in the header, about section, contact cards, and footer.
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Save className="w-4 h-4 text-amber-400" />
                      <span>Save All Changes</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Department Name</label>
                      <input
                        type="text"
                        value={generalForm.name}
                        onChange={(e) => setGeneralForm({ ...generalForm, name: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">College Name</label>
                      <input
                        type="text"
                        value={generalForm.college}
                        onChange={(e) => setGeneralForm({ ...generalForm, college: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">University Affiliation</label>
                      <input
                        type="text"
                        value={generalForm.affiliation}
                        onChange={(e) => setGeneralForm({ ...generalForm, affiliation: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">NAAC Accreditation Grade</label>
                      <input
                        type="text"
                        value={generalForm.accreditation}
                        onChange={(e) => setGeneralForm({ ...generalForm, accreditation: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Official Email</label>
                      <input
                        type="email"
                        value={generalForm.email}
                        onChange={(e) => setGeneralForm({ ...generalForm, email: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Phone / Telephone</label>
                      <input
                        type="text"
                        value={generalForm.phone}
                        onChange={(e) => setGeneralForm({ ...generalForm, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">HOD Name</label>
                      <input
                        type="text"
                        value={generalForm.hodName}
                        onChange={(e) => setGeneralForm({ ...generalForm, hodName: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">HOD Title & Designation</label>
                      <input
                        type="text"
                        value={generalForm.hodTitle}
                        onChange={(e) => setGeneralForm({ ...generalForm, hodTitle: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block font-bold text-slate-700 mb-2">Logo Image</label>
                      <input
                        type="text"
                        value={generalForm.logoUrl}
                        onChange={(e) => setGeneralForm({ ...generalForm, logoUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900 mb-2"
                        placeholder="Paste URL..."
                      />
                      <div 
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          handleFileUpload(e.dataTransfer.files?.[0], 'logoUrl');
                        }}
                        className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center text-xs text-slate-500 hover:border-blue-900 hover:bg-blue-50 transition-colors cursor-pointer"
                      >
                        <p>Drag & Drop or</p>
                        <input
                          type="file"
                          accept="image/*, application/pdf"
                          onChange={(e) => handleFileUpload(e.target.files?.[0], 'logoUrl')}
                          className="hidden"
                          id="logo-upload"
                        />
                        <label htmlFor="logo-upload" className="block mt-2 font-bold text-blue-900 cursor-pointer">
                          Browse Files
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-2">Department Header Images</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {(generalForm.imageUrls || []).map((url, index) => (
                          <div key={index} className="relative w-20 h-20 border border-slate-200 rounded-lg overflow-hidden group shadow-sm bg-slate-100">
                            <img src={url} alt={`Header ${index + 1}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => {
                                const updatedImages = generalForm.imageUrls.filter((_, i) => i !== index);
                                const updatedForm = { ...generalForm, imageUrls: updatedImages };
                                setGeneralForm(updatedForm);
                                updateDepartmentInfo(updatedForm);
                                showStatus('Header image removed.');
                              }}
                              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 shadow hover:bg-red-700 transition-colors cursor-pointer"
                              title="Remove image"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <textarea
                        value={(generalForm.imageUrls || []).join('\n')}
                        onChange={(e) => {
                          const updatedImages = e.target.value.split('\n').map(s => s.trim()).filter(Boolean);
                          const updatedForm = { ...generalForm, imageUrls: updatedImages };
                          setGeneralForm(updatedForm);
                          updateDepartmentInfo(updatedForm);
                        }}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900 mb-2 text-xs font-mono min-h-[80px]"
                        placeholder="One image URL per line..."
                      />
                      <div 
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          handleFileUpload(e.dataTransfer.files?.[0], 'imageUrls');
                        }}
                        className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center text-xs text-slate-500 hover:border-blue-900 hover:bg-blue-50 transition-colors cursor-pointer"
                      >
                        <p>Drag & Drop or</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e.target.files?.[0], 'imageUrls')}
                          className="hidden"
                          id="header-upload"
                        />
                        <label htmlFor="header-upload" className="block mt-2 font-bold text-blue-900 cursor-pointer">
                          Browse Files
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Campus Physical Address</label>
                    <input
                      type="text"
                      value={generalForm.address}
                      onChange={(e) => setGeneralForm({ ...generalForm, address: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">HOD Welcome Message</label>
                    <textarea
                      rows={3}
                      value={generalForm.hodMessage}
                      onChange={(e) => setGeneralForm({ ...generalForm, hodMessage: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Vision Statement</label>
                    <textarea
                      rows={2}
                      value={generalForm.vision}
                      onChange={(e) => setGeneralForm({ ...generalForm, vision: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">About Department Overview (Paragraph 1)</label>
                    <textarea
                      rows={3}
                      value={generalForm.aboutOverview || ''}
                      onChange={(e) => setGeneralForm({ ...generalForm, aboutOverview: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">About Department Legacy & Curriculum (Paragraph 2)</label>
                    <textarea
                      rows={3}
                      value={generalForm.aboutLegacy || ''}
                      onChange={(e) => setGeneralForm({ ...generalForm, aboutLegacy: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">About Section Feature Image (Drag & Drop or Upload)</label>
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files?.[0];
                        if (file && file.type.startsWith('image/')) {
                          compressAndReadImage(file, (dataUrl) => {
                            setGeneralForm({ ...generalForm, aboutImageUrl: dataUrl });
                            showStatus('About feature image uploaded successfully from device.');
                          });
                        }
                      }}
                      className="border-2 border-dashed border-slate-300 hover:border-blue-900 rounded-xl p-4 text-center bg-slate-50 transition-colors cursor-pointer relative group"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            compressAndReadImage(file, (dataUrl) => {
                              setGeneralForm({ ...generalForm, aboutImageUrl: dataUrl });
                              showStatus('About feature image uploaded successfully from device.');
                            });
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex items-center justify-center space-x-3 pointer-events-none">
                        {generalForm.aboutImageUrl ? (
                          <>
                            <img
                              src={generalForm.aboutImageUrl}
                              alt="About Preview"
                              className="w-12 h-12 object-cover rounded-lg border border-slate-200"
                              referrerPolicy="no-referrer"
                            />
                            <div className="text-left">
                              <p className="text-xs font-bold text-slate-900">Image Loaded</p>
                              <p className="text-[10px] text-slate-500">Click or drag another image to replace</p>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center space-y-1">
                            <Upload className="w-5 h-5 text-slate-400 group-hover:text-blue-900 mb-0.5" />
                            <p className="text-xs font-bold text-slate-700">Drag & drop image here, or click to browse</p>
                            <p className="text-[10px] text-slate-400">Supports PNG, JPG, WEBP, GIF</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* TAB: Welcome Section */}
              {activeTab === 'welcome' && (
                <form onSubmit={handleSaveGeneralInfo} className="space-y-5 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-heading">
                        Welcome Section
                      </h4>
                      <p className="text-slate-500 text-[11px]">
                        Edit the badge, title, and description for the home page welcome section.
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Save className="w-4 h-4 text-amber-400" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Badge Text</label>
                    <input
                      type="text"
                      value={generalForm.welcomeBadgeText}
                      onChange={(e) => setGeneralForm({ ...generalForm, welcomeBadgeText: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={generalForm.welcomeTitle}
                      onChange={(e) => setGeneralForm({ ...generalForm, welcomeTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Description</label>
                    <textarea
                      rows={5}
                      value={generalForm.welcomeDescription}
                      onChange={(e) => setGeneralForm({ ...generalForm, welcomeDescription: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                    ></textarea>
                  </div>
                </form>
              )}

              {/* TAB: Hero Section */}
              {activeTab === 'hero' && (
                <form onSubmit={handleSaveGeneralInfo} className="space-y-5 text-xs">
                   <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h4 className="text-base font-bold text-slate-900 font-heading">
                      Hero Section Settings
                    </h4>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Save className="w-4 h-4 text-amber-400" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Hero Title</label>
                      <input
                        type="text"
                        value={generalForm.heroTitle}
                        onChange={(e) => setGeneralForm({ ...generalForm, heroTitle: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Hero Subtitle</label>
                      <input
                        type="text"
                        value={generalForm.heroSubtitle}
                        onChange={(e) => setGeneralForm({ ...generalForm, heroSubtitle: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Hero Description</label>
                      <textarea
                        value={generalForm.heroDescription}
                        onChange={(e) => setGeneralForm({ ...generalForm, heroDescription: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                        rows={3}
                      />
                    </div>
                  </div>
                </form>
              )}

              {/* TAB: Card Header Settings */}
              {activeTab === 'card-header' && (
                <form onSubmit={handleSaveGeneralInfo} className="space-y-5 text-xs">
                   <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h4 className="text-base font-bold text-slate-900 font-heading">
                      Card Header Settings
                    </h4>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Save className="w-4 h-4 text-amber-400" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={generalForm.cardHeaderBadgeText}
                        onChange={(e) => setGeneralForm({ ...generalForm, cardHeaderBadgeText: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={generalForm.cardHeaderLocation}
                        onChange={(e) => setGeneralForm({ ...generalForm, cardHeaderLocation: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Card Title</label>
                      <input
                        type="text"
                        value={generalForm.cardHeaderTitle}
                        onChange={(e) => setGeneralForm({ ...generalForm, cardHeaderTitle: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                  </div>
                </form>
              )}



              {/* TAB 2: Faculty Management */}
              {activeTab === 'faculty' && (
                <div className="space-y-5 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-heading">
                        Faculty Directory & Profiles ({faculty.length})
                      </h4>
                      <p className="text-slate-500 text-[11px]">
                        Add new professors, edit profiles, qualifications, and research areas.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const newFac: FacultyMember = {
                          id: `faculty-${Date.now()}`,
                          name: 'New Faculty Member',
                          designation: 'Assistant Professor',
                          qualification: 'M.Sc., Ph.D. (Gauhati University)',
                          specialization: 'Pure Mathematics',
                          email: 'faculty@dudhnoicollege.ac.in',
                          phone: '+91 94350 00000',
                          roomNo: 'Room 205, Science Block',
                          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
                          bio: 'Dedicated educator and researcher in the department.',
                          researchInterests: ['Algebra', 'Analysis'],
                          recentPublications: [],
                          coursesTaught: ['Calculus', 'Real Analysis']
                        };
                        addFaculty(newFac);
                        setEditingFaculty(newFac);
                        showStatus('New faculty entry added. Edit details below.');
                      }}
                      className="px-3.5 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-amber-400" />
                      <span>Add Faculty Member</span>
                    </button>
                  </div>

                  {/* Editing Drawer / Form if active */}
                  {editingFaculty && (
                    <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-blue-950 text-sm">
                          Editing Profile: {editingFaculty.name}
                        </span>
                        <button
                          onClick={() => setEditingFaculty(null)}
                          className="text-slate-400 hover:text-slate-700 font-bold"
                        >
                          ✕ Close Form
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                          <input
                            type="text"
                            value={editingFaculty.name}
                            onChange={(e) =>
                              setEditingFaculty({ ...editingFaculty, name: e.target.value })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Designation</label>
                          <select
                            value={editingFaculty.designation}
                            onChange={(e) =>
                              setEditingFaculty({
                                ...editingFaculty,
                                designation: e.target.value as any
                              })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          >
                            <option value="Professor">Professor</option>
                            <option value="Associate Professor">Associate Professor</option>
                            <option value="Assistant Professor">Assistant Professor</option>
                            <option value="Guest Faculty">Guest Faculty</option>
                            <option value="Guest Lecturer">Guest Lecturer</option>
                          </select>
                        </div>

                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Qualification</label>
                          <input
                            type="text"
                            value={editingFaculty.qualification}
                            onChange={(e) =>
                              setEditingFaculty({ ...editingFaculty, qualification: e.target.value })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Specialization</label>
                          <input
                            type="text"
                            value={editingFaculty.specialization}
                            onChange={(e) =>
                              setEditingFaculty({ ...editingFaculty, specialization: e.target.value })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Email</label>
                          <input
                            type="email"
                            value={editingFaculty.email}
                            onChange={(e) =>
                              setEditingFaculty({ ...editingFaculty, email: e.target.value })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                          <input
                            type="text"
                            value={editingFaculty.phone || ''}
                            onChange={(e) =>
                              setEditingFaculty({ ...editingFaculty, phone: e.target.value })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                            placeholder="+91..."
                          />
                        </div>

                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Office Room</label>
                          <input
                            type="text"
                            value={editingFaculty.roomNo || ''}
                            onChange={(e) =>
                              setEditingFaculty({ ...editingFaculty, roomNo: e.target.value })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                            placeholder="e.g. Room 205"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Consultation Hours</label>
                          <input
                            type="text"
                            value={editingFaculty.officeHours || ''}
                            onChange={(e) =>
                              setEditingFaculty({ ...editingFaculty, officeHours: e.target.value })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                            placeholder="e.g. Mon-Wed, 2PM - 4PM"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="font-bold text-slate-700 block mb-2">Faculty Profile Photo</label>
                          <input
                            type="text"
                            value={editingFaculty.image}
                            onChange={(e) =>
                              setEditingFaculty({ ...editingFaculty, image: e.target.value })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none mb-2"
                            placeholder="Paste image URL..."
                          />
                          <div 
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              handleFacultyImageUpload(e.dataTransfer.files?.[0]);
                            }}
                            className="border-2 border-dashed border-slate-300 rounded-lg p-3 text-center text-xs text-slate-500 hover:border-blue-900 hover:bg-blue-50 transition-colors cursor-pointer"
                          >
                            <p>Drag & Drop or</p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFacultyImageUpload(e.target.files?.[0])}
                              className="hidden"
                              id="faculty-img-upload"
                            />
                            <label htmlFor="faculty-img-upload" className="block mt-1 font-bold text-blue-900 cursor-pointer">
                              Browse
                            </label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Bio / Profile Overview</label>
                        <textarea
                          rows={2}
                          value={editingFaculty.bio}
                          onChange={(e) =>
                            setEditingFaculty({ ...editingFaculty, bio: e.target.value })
                          }
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                        ></textarea>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Research Interests (One per line)</label>
                          <textarea
                            rows={3}
                            value={(editingFaculty.researchInterests || []).join('\n')}
                            onChange={(e) =>
                              setEditingFaculty({
                                ...editingFaculty,
                                researchInterests: e.target.value.split('\n').filter(Boolean)
                              })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none whitespace-pre-wrap"
                          ></textarea>
                        </div>
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Courses Taught (One per line)</label>
                          <textarea
                            rows={3}
                            value={(editingFaculty.coursesTaught || []).join('\n')}
                            onChange={(e) =>
                              setEditingFaculty({
                                ...editingFaculty,
                                coursesTaught: e.target.value.split('\n').filter(Boolean)
                              })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none whitespace-pre-wrap"
                          ></textarea>
                        </div>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Selected Publications (One per line)</label>
                        <textarea
                          rows={3}
                          value={(editingFaculty.recentPublications || []).join('\n')}
                          onChange={(e) =>
                            setEditingFaculty({
                              ...editingFaculty,
                              recentPublications: e.target.value.split('\n').filter(Boolean)
                            })
                          }
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none whitespace-pre-wrap"
                        ></textarea>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Google Scholar URL</label>
                          <input
                            type="text"
                            value={editingFaculty.scholarUrl || ''}
                            onChange={(e) =>
                              setEditingFaculty({ ...editingFaculty, scholarUrl: e.target.value })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                            placeholder="https://scholar.google.com/..."
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">ResearchGate URL</label>
                          <input
                            type="text"
                            value={editingFaculty.researchGateUrl || ''}
                            onChange={(e) =>
                              setEditingFaculty({ ...editingFaculty, researchGateUrl: e.target.value })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                            placeholder="https://researchgate.net/..."
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="isHodCheck"
                          checked={editingFaculty.isHod || false}
                          onChange={(e) =>
                            setEditingFaculty({ ...editingFaculty, isHod: e.target.checked })
                          }
                          className="w-4 h-4 text-blue-900 border-slate-300 rounded focus:ring-blue-900"
                        />
                        <label htmlFor="isHodCheck" className="font-bold text-slate-700">
                          Is Head of Department (HOD)
                        </label>
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            updateFaculty(editingFaculty);
                            setEditingFaculty(null);
                            showStatus('Faculty profile updated successfully.');
                          }}
                          className="px-4 py-2 bg-blue-900 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Faculty Profile</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* List of current faculty cards */}
                  <div className="space-y-2">
                    {faculty.map((f) => (
                      <div
                        key={f.id}
                        className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3 hover:border-slate-300 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={f.image}
                            alt={f.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-300"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">{f.name}</span>
                            <span className="text-slate-500 text-[11px]">
                              {f.designation} • {f.specialization}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingFaculty(f)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-900 rounded-lg font-semibold flex items-center gap-1 cursor-pointer border border-slate-200"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              deleteFaculty(f.id);
                              showStatus('Faculty member removed.');
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                            title="Delete faculty"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: Department Students Categorized by Selective Courses */}
              {activeTab === 'students' && (
                <AdminStudentsSection
                  students={departmentStudents}
                  faculty={faculty}
                  onAddStudent={addDepartmentStudent}
                  onUpdateStudent={updateDepartmentStudent}
                  onDeleteStudent={deleteDepartmentStudent}
                  onBulkImport={bulkImportDepartmentStudents}
                  showStatus={showStatus}
                />
              )}

              {/* TAB: Student Portal & Routines Manager */}
              {activeTab === 'portal' && (
                <AdminPortalManager />
              )}

              {/* TAB 3: Notices & Circulars */}
              {activeTab === 'notices' && (
                <div className="space-y-5 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-heading">
                        Notice Board & Circulars ({notices.length})
                      </h4>
                      <p className="text-slate-500 text-[11px]">
                        Publish exam schedules, routine circulars, and admission notifications.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const newNotice: NoticeItem = {
                          id: `notice-${Date.now()}`,
                          title: 'New Departmental Notice / Circular',
                          date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                          category: 'Latest Notices',
                          isNew: true,
                          isUrgent: false,
                          description: 'Important circular regarding department academic schedules and classes.'
                        };
                        addNotice(newNotice);
                        setEditingNotice(newNotice);
                        showStatus('New notice created. Edit details below.');
                      }}
                      className="px-3.5 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-amber-400" />
                      <span>Post New Notice</span>
                    </button>
                  </div>

                  {editingNotice && (
                    <div className="p-4 bg-amber-50.50 border border-amber-200 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-950 text-sm">Editing Notice</span>
                        <button
                          onClick={() => setEditingNotice(null)}
                          className="text-slate-400 hover:text-slate-700 font-bold"
                        >
                          ✕ Close
                        </button>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Notice Title *</label>
                        <input
                          type="text"
                          value={editingNotice.title}
                          onChange={(e) =>
                            setEditingNotice({ ...editingNotice, title: e.target.value })
                          }
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Category</label>
                          <select
                            value={editingNotice.category}
                            onChange={(e) =>
                              setEditingNotice({ ...editingNotice, category: e.target.value as any })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          >
                            <option value="Latest Notices">Latest Notices</option>
                            <option value="Examination">Examination</option>
                            <option value="Circular">Circular</option>
                            <option value="Seminars & Workshops">Seminars & Workshops</option>
                            <option value="Admissions">Admissions</option>
                          </select>
                        </div>

                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Date</label>
                          <input
                            type="text"
                            value={editingNotice.date}
                            onChange={(e) =>
                              setEditingNotice({ ...editingNotice, date: e.target.value })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Ref Number</label>
                          <input
                            type="text"
                            value={editingNotice.refNo || ''}
                            onChange={(e) =>
                              setEditingNotice({ ...editingNotice, refNo: e.target.value })
                            }
                            placeholder="DC/MATH/2026/..."
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Notice Description</label>
                        <textarea
                          rows={2}
                          value={editingNotice.description}
                          onChange={(e) =>
                            setEditingNotice({ ...editingNotice, description: e.target.value })
                          }
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                        ></textarea>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!editingNotice.isUrgent}
                            onChange={(e) =>
                              setEditingNotice({ ...editingNotice, isUrgent: e.target.checked })
                            }
                            className="w-4 h-4 rounded text-blue-900"
                          />
                          <span className="font-bold text-red-700">Mark as Urgent Notice</span>
                        </label>

                        <button
                          type="button"
                          onClick={() => {
                            updateNotice(editingNotice);
                            setEditingNotice(null);
                            showStatus('Notice saved successfully.');
                          }}
                          className="px-4 py-2 bg-blue-900 text-white font-bold rounded-xl cursor-pointer"
                        >
                          Save Notice
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {notices.map((n) => (
                      <div
                        key={n.id}
                        className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3 hover:border-slate-300"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 text-[10px] font-bold">
                              {n.category}
                            </span>
                            {n.isUrgent && (
                              <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-bold">
                                URGENT
                              </span>
                            )}
                            <span className="text-[11px] text-slate-400">{n.date}</span>
                          </div>
                          <span className="font-bold text-slate-900 block">{n.title}</span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setEditingNotice(n)}
                            className="p-1.5 text-slate-600 hover:text-blue-900 hover:bg-slate-100 rounded-lg"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                                deleteNotice(n.id);
                                showStatus('Notice deleted.');
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: Events & Seminars */}
              {activeTab === 'events' && (
                <div className="space-y-5 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-heading">
                        Events, Seminars & Workshops ({events.length})
                      </h4>
                      <p className="text-slate-500 text-[11px]">
                        Organize national math days, Olympiad awareness, and guest lectures.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const newEvent: EventItem = {
                          id: `event-${Date.now()}`,
                          title: 'New Mathematical Seminar / Workshop',
                          category: 'Seminar',
                          date: 'September 15, 2026',
                          time: '10:00 AM - 3:30 PM',
                          venue: 'Auditorium Hall, Dudhnoi College',
                          speaker: 'Guest Scholar',
                          description: 'Interactive sessions and computational mathematics demonstrations.',
                          isUpcoming: true,
                          registrationOpen: true
                        };
                        addEvent(newEvent);
                        setEditingEvent(newEvent);
                        showStatus('New event added. Edit details below.');
                      }}
                      className="px-3.5 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-amber-400" />
                      <span>Add Event</span>
                    </button>
                  </div>

                  {editingEvent && (
                    <div className="p-4 bg-slate-50 border border-slate-300 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">Editing Event</span>
                        <button
                          onClick={() => setEditingEvent(null)}
                          className="text-slate-400 hover:text-slate-700 font-bold"
                        >
                          ✕ Close
                        </button>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Event Title *</label>
                        <input
                          type="text"
                          value={editingEvent.title}
                          onChange={(e) =>
                            setEditingEvent({ ...editingEvent, title: e.target.value })
                          }
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Date</label>
                          <input
                            type="text"
                            value={editingEvent.date}
                            onChange={(e) =>
                              setEditingEvent({ ...editingEvent, date: e.target.value })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Venue</label>
                          <input
                            type="text"
                            value={editingEvent.venue}
                            onChange={(e) =>
                              setEditingEvent({ ...editingEvent, venue: e.target.value })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Speaker / Keynote</label>
                          <input
                            type="text"
                            value={editingEvent.speaker || ''}
                            onChange={(e) =>
                              setEditingEvent({ ...editingEvent, speaker: e.target.value })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            updateEvent(editingEvent);
                            setEditingEvent(null);
                            showStatus('Event updated successfully.');
                          }}
                          className="px-4 py-2 bg-blue-900 text-white font-bold rounded-xl cursor-pointer"
                        >
                          Save Event
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {events.map((ev) => (
                      <div
                        key={ev.id}
                        className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3 hover:border-slate-300"
                      >
                        <div>
                          <span className="font-bold text-slate-900 block">{ev.title}</span>
                          <span className="text-slate-500 text-[11px]">
                            {ev.date} • {ev.venue}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingEvent(ev)}
                            className="p-1.5 text-slate-600 hover:text-blue-900 hover:bg-slate-100 rounded-lg"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              deleteEvent(ev.id);
                              showStatus('Event deleted.');
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: Courses & NEP 2020 */}
              {activeTab === 'courses' && (
                <div className="space-y-5 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-heading">
                        Courses & Academic Syllabi ({courses.length})
                      </h4>
                      <p className="text-slate-500 text-[11px]">
                        Manage NEP 2020 FYUGP Minor/Major courses, credit allocations, and course outlines.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const newC: Course = {
                          id: `course-${Date.now()}`,
                          code: 'MAT-NEW-101',
                          name: 'New Mathematics Course',
                          level: 'UG',
                          semester: '1st Semester',
                          credits: 4,
                          type: 'Major / Core',
                          description: 'Course description and syllabus overview.',
                          syllabusOutline: ['Module 1: Foundations', 'Module 2: Advanced Topics'],
                          textbooks: ['Standard Reference Book'],
                          learningOutcomes: ['Understanding fundamental mathematical principles']
                        };
                        setEditingCourse(newC);
                        showStatus('Configure new course details below and click Save.');
                      }}
                      className="px-3.5 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-amber-400" />
                      <span>Add Course</span>
                    </button>
                  </div>

                  {editingCourse && (
                    <div className="p-4 bg-slate-50 border border-slate-300 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">Editing Course</span>
                        <button
                          onClick={() => setEditingCourse(null)}
                          className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer"
                        >
                          ✕ Close
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Course Code *</label>
                          <input
                            type="text"
                            value={editingCourse.code}
                            onChange={(e) => setEditingCourse({ ...editingCourse, code: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="font-bold text-slate-700 block mb-1">Course Name *</label>
                          <input
                            type="text"
                            value={editingCourse.name}
                            onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Academic Level</label>
                          <select
                            value={editingCourse.level}
                            onChange={(e) => setEditingCourse({ ...editingCourse, level: e.target.value as any })}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          >
                            <option value="UG">UG</option>
                            <option value="PG">PG</option>
                            <option value="Research">Research</option>
                            <option value="Add-on">Add-on</option>
                          </select>
                        </div>
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Semester</label>
                          <input
                            type="text"
                            value={editingCourse.semester}
                            onChange={(e) => setEditingCourse({ ...editingCourse, semester: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Credits</label>
                          <input
                            type="number"
                            value={editingCourse.credits}
                            onChange={(e) => setEditingCourse({ ...editingCourse, credits: Number(e.target.value) })}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Course Type</label>
                          <select
                            value={editingCourse.type}
                            onChange={(e) => setEditingCourse({ ...editingCourse, type: e.target.value as any })}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          >
                            <option value="Major / Core">Major / Core</option>
                            <option value="Minor">Minor</option>
                            <option value="Skill Enhancement (SEC)">Skill Enhancement (SEC)</option>
                            <option value="Discipline Elective">Discipline Elective</option>
                            <option value="Value Added">Value Added</option>
                            <option value="Postgraduate Core">Postgraduate Core</option>
                          </select>
                        </div>
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Prerequisites</label>
                          <input
                            type="text"
                            value={editingCourse.prerequisites || ''}
                            onChange={(e) => setEditingCourse({ ...editingCourse, prerequisites: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={editingCourse.description}
                          onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                        ></textarea>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            const exists = courses.some((c) => c.id === editingCourse.id);
                            if (exists) {
                              updateCourse(editingCourse);
                              showStatus('Course updated successfully.');
                            } else {
                              addCourse(editingCourse);
                              showStatus('New course added successfully.');
                            }
                            setEditingCourse(null);
                          }}
                          className="px-4 py-2 bg-blue-900 text-white font-bold rounded-xl cursor-pointer"
                        >
                          Save Course
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {courses.map((c) => (
                      <div
                        key={c.id}
                        className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-[10px]">
                              {c.code}
                            </span>
                            <span className="text-[11px] text-slate-500 font-semibold">{c.semester} • {c.credits} Credits</span>
                            <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                              {c.type}
                            </span>
                          </div>
                          <span className="font-bold text-slate-900 block text-xs">{c.name}</span>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{c.description}</p>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => setEditingCourse(c)}
                            className="p-1.5 text-slate-600 hover:text-blue-900 hover:bg-slate-100 rounded-lg cursor-pointer"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              deleteCourse(c.id);
                              showStatus('Course deleted.');
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: Research & Publications */}
              {activeTab === 'research' && (
                <div className="space-y-6 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-heading">
                        Research Thrust Areas & Faculty Publications
                      </h4>
                      <p className="text-slate-500 text-[11px]">
                        Thrust areas ({researchAreas.length}) and publications ({publications.length}).
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const newRA: ResearchArea = {
                            id: `research-area-${Date.now()}`,
                            title: 'New Research Thrust Area',
                            iconName: 'FlaskConical',
                            description: 'Description of mathematical research domain.',
                            keyTopics: ['Topic 1', 'Topic 2'],
                            facultyInvolved: ['Dr. Faculty Name'],
                            activeProjectsCount: 1
                          };
                          setEditingResearchArea(newRA);
                          showStatus('Configure new research area details below.');
                        }}
                        className="px-3 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 text-amber-400" />
                        <span>Add Thrust Area</span>
                      </button>
                      <button
                        onClick={() => {
                          const newPub: Publication = {
                            id: `pub-${Date.now()}`,
                            title: 'Research Paper Title',
                            authors: 'Faculty Authors',
                            journal: 'International Journal of Mathematics',
                            year: 2026,
                            type: 'Journal',
                            impactFactor: '3.4'
                          };
                          setEditingPublication(newPub);
                          showStatus('Configure new publication details below.');
                        }}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 text-amber-400" />
                        <span>Add Publication</span>
                      </button>
                    </div>
                  </div>

                  {editingResearchArea && (
                    <div className="p-4 bg-slate-50 border border-slate-300 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">Editing Research Thrust Area</span>
                        <button onClick={() => setEditingResearchArea(null)} className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer">✕ Close</button>
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Title *</label>
                        <input
                          type="text"
                          value={editingResearchArea.title}
                          onChange={(e) => setEditingResearchArea({ ...editingResearchArea, title: e.target.value })}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={editingResearchArea.description}
                          onChange={(e) => setEditingResearchArea({ ...editingResearchArea, description: e.target.value })}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                        ></textarea>
                      </div>
                      <div className="flex justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            const exists = researchAreas.some((r) => r.id === editingResearchArea.id);
                            if (exists) {
                              updateResearchArea(editingResearchArea);
                              showStatus('Research area updated.');
                            } else {
                              addResearchArea(editingResearchArea);
                              showStatus('Research area added.');
                            }
                            setEditingResearchArea(null);
                          }}
                          className="px-4 py-2 bg-blue-900 text-white font-bold rounded-xl cursor-pointer"
                        >
                          Save Research Area
                        </button>
                      </div>
                    </div>
                  )}

                  {editingPublication && (
                    <div className="p-4 bg-slate-50 border border-slate-300 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">Editing Publication</span>
                        <button onClick={() => setEditingPublication(null)} className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer">✕ Close</button>
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Paper Title *</label>
                        <input
                          type="text"
                          value={editingPublication.title}
                          onChange={(e) => setEditingPublication({ ...editingPublication, title: e.target.value })}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Authors *</label>
                          <input
                            type="text"
                            value={editingPublication.authors}
                            onChange={(e) => setEditingPublication({ ...editingPublication, authors: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Journal / Conference *</label>
                          <input
                            type="text"
                            value={editingPublication.journal}
                            onChange={(e) => setEditingPublication({ ...editingPublication, journal: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Year</label>
                          <input
                            type="number"
                            value={editingPublication.year}
                            onChange={(e) => setEditingPublication({ ...editingPublication, year: Number(e.target.value) })}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Type</label>
                          <select
                            value={editingPublication.type}
                            onChange={(e) => setEditingPublication({ ...editingPublication, type: e.target.value as any })}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          >
                            <option value="Journal">Journal</option>
                            <option value="Conference">Conference</option>
                            <option value="Book Chapter">Book Chapter</option>
                          </select>
                        </div>
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Impact Factor</label>
                          <input
                            type="text"
                            value={editingPublication.impactFactor || ''}
                            onChange={(e) => setEditingPublication({ ...editingPublication, impactFactor: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            const exists = publications.some((p) => p.id === editingPublication.id);
                            if (exists) {
                              updatePublication(editingPublication);
                              showStatus('Publication updated.');
                            } else {
                              addPublication(editingPublication);
                              showStatus('Publication added.');
                            }
                            setEditingPublication(null);
                          }}
                          className="px-4 py-2 bg-blue-900 text-white font-bold rounded-xl cursor-pointer"
                        >
                          Save Publication
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <h5 className="font-bold text-slate-800 text-xs">Research Thrust Areas:</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {researchAreas.map((ra) => (
                        <div key={ra.id} className="p-3 bg-white border border-slate-200 rounded-xl flex flex-col justify-between">
                          <div>
                            <span className="font-bold text-blue-950 block mb-1 text-xs">{ra.title}</span>
                            <p className="text-slate-600 text-[11px] line-clamp-2 mb-2">{ra.description}</p>
                          </div>
                          <div className="flex items-center justify-end gap-1 pt-2 border-t border-slate-100">
                            <button onClick={() => setEditingResearchArea(ra)} className="p-1 text-slate-600 hover:text-blue-900 cursor-pointer"><Edit3 className="w-3.5 h-3.5" /></button>
                            <button onClick={() => { deleteResearchArea(ra.id); showStatus('Research area deleted.'); }} className="p-1 text-slate-400 hover:text-red-700 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <h5 className="font-bold text-slate-800 text-xs pt-2">Faculty Publications & Papers:</h5>
                    <div className="space-y-2">
                      {publications.map((p) => (
                        <div key={p.id} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="font-bold text-slate-700 text-[10px] bg-slate-100 px-2 py-0.5 rounded">{p.type}</span>
                              <span className="text-[11px] text-slate-500 font-medium">{p.journal} ({p.year})</span>
                              {p.impactFactor && <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">IF: {p.impactFactor}</span>}
                            </div>
                            <span className="font-bold text-slate-900 block text-xs">{p.title}</span>
                            <p className="text-[11px] text-slate-500 mt-0.5">Authors: {p.authors}</p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button onClick={() => setEditingPublication(p)} className="p-1.5 text-slate-600 hover:text-blue-900 cursor-pointer"><Edit3 className="w-4 h-4" /></button>
                            <button onClick={() => { deletePublication(p.id); showStatus('Publication deleted.'); }} className="p-1.5 text-slate-400 hover:text-red-700 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: Photo & Magazine Gallery */}
              {activeTab === 'gallery' && (
                <div className="space-y-5 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-heading">
                        Photo & Magazine Gallery ({gallery.length})
                      </h4>
                      <p className="text-slate-500 text-[11px]">
                        Upload photos, classroom captures, cultural events, seminars, and annual math magazine covers.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const newItem: GalleryItem = {
                          id: `gallery-${Date.now()}`,
                          title: 'New Department Photo',
                          category: 'Department Events',
                          image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
                          caption: 'Description of the gallery item.',
                          date: '2026'
                        };
                        setEditingGallery(newItem);
                        showStatus('Configure new gallery item details below and click Save.');
                      }}
                      className="px-3.5 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-amber-400" />
                      <span>Add Gallery Photo</span>
                    </button>
                  </div>

                  {editingGallery && (
                    <div className="p-4 bg-slate-50 border border-slate-300 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">Editing Gallery Item</span>
                        <button
                          onClick={() => setEditingGallery(null)}
                          className="text-slate-400 hover:text-slate-700 font-bold"
                        >
                          ✕ Close
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Title *</label>
                          <input
                            type="text"
                            value={editingGallery.title}
                            onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Category *</label>
                          <select
                            value={editingGallery.category}
                            onChange={(e) => setEditingGallery({ ...editingGallery, category: e.target.value as any })}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          >
                            <option value="Department Events">Department Events</option>
                            <option value="Cultural Events">Cultural Events</option>
                            <option value="Classroom">Classroom</option>
                            <option value="Magazine">Magazine</option>
                            <option value="Seminars">Seminars</option>
                            <option value="Student Activities">Student Activities</option>
                            <option value="Math Day">Math Day</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Upload or Drag & Drop Image *</label>
                          <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              const file = e.dataTransfer.files?.[0];
                              if (file && file.type.startsWith('image/')) {
                                compressAndReadImage(file, (dataUrl) => {
                                  setEditingGallery({ ...editingGallery, image: dataUrl });
                                  showStatus('Image uploaded successfully from device.');
                                });
                              }
                            }}
                            className="border-2 border-dashed border-slate-300 hover:border-blue-900 rounded-xl p-4 text-center bg-slate-50 transition-colors cursor-pointer relative group"
                          >
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  compressAndReadImage(file, (dataUrl) => {
                                    setEditingGallery({ ...editingGallery, image: dataUrl });
                                    showStatus('Image uploaded successfully from device.');
                                  });
                                }
                              }}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex items-center justify-center space-x-3 pointer-events-none">
                              {editingGallery.image ? (
                                <>
                                  <img
                                    src={editingGallery.image}
                                    alt="Preview"
                                    className="w-12 h-12 object-cover rounded-lg border border-slate-200"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="text-left">
                                    <p className="text-xs font-bold text-slate-900">Image Loaded</p>
                                    <p className="text-[10px] text-slate-500">Click or drag another image to replace</p>
                                  </div>
                                </>
                              ) : (
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <Upload className="w-5 h-5 text-slate-400 group-hover:text-blue-900 mb-0.5" />
                                  <p className="text-xs font-bold text-slate-700">Drag & drop image here, or click to browse</p>
                                  <p className="text-[10px] text-slate-400">Supports PNG, JPG, WEBP, GIF</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="font-bold text-slate-700 block mb-1">Or Image URL</label>
                            <input
                              type="text"
                              value={editingGallery.image}
                              onChange={(e) => setEditingGallery({ ...editingGallery, image: e.target.value })}
                              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none text-xs"
                              placeholder="https://images.unsplash.com/..."
                            />
                          </div>
                          <div>
                            <label className="font-bold text-slate-700 block mb-1">Date / Year</label>
                            <input
                              type="text"
                              value={editingGallery.date}
                              onChange={(e) => setEditingGallery({ ...editingGallery, date: e.target.value })}
                              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none text-xs"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Caption / Description</label>
                        <textarea
                          rows={2}
                          value={editingGallery.caption}
                          onChange={(e) => setEditingGallery({ ...editingGallery, caption: e.target.value })}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                        ></textarea>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            const exists = gallery.some((g) => g.id === editingGallery.id);
                            if (exists) {
                              updateGalleryItem(editingGallery);
                              showStatus('Gallery item updated successfully.');
                            } else {
                              addGalleryItem(editingGallery);
                              showStatus('New gallery item added successfully.');
                            }
                            setEditingGallery(null);
                          }}
                          className="px-4 py-2 bg-blue-900 text-white font-bold rounded-xl cursor-pointer"
                        >
                          Save Gallery Item
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {gallery.map((g) => (
                      <div key={g.id} className="p-3 bg-white border border-slate-200 rounded-xl space-y-2 group flex flex-col justify-between">
                        <div>
                          <img
                            src={g.image}
                            alt={g.title}
                            className="w-full h-28 object-cover rounded-lg mb-2"
                            referrerPolicy="no-referrer"
                          />
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900 mb-1">
                            {g.category}
                          </span>
                          <span className="font-bold text-slate-900 block text-xs line-clamp-1">{g.title}</span>
                          <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{g.caption}</p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <span className="text-[10px] text-slate-400 font-mono">{g.date}</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setEditingGallery(g)}
                              className="p-1.5 text-slate-600 hover:text-blue-900 hover:bg-slate-100 rounded-lg cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                  deleteGalleryItem(g.id);
                                  showStatus('Gallery photo deleted.');
                              }}
                              className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 8: Achievements */}
              {activeTab === 'achievements' && (
                <div className="space-y-5 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-heading">
                        Student & Faculty Accolades ({achievements.length})
                      </h4>
                      <p className="text-slate-500 text-[11px]">
                        IIT JAM rankers, CSIR-NET qualifiers, and research fellowships.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const newA: AchievementItem = {
                          id: `achievement-${Date.now()}`,
                          title: 'All India Rank 15 in IIT JAM Mathematics',
                          recipient: 'Student Name',
                          role: 'Student',
                          category: 'Exam Qualification',
                          year: '2026',
                          description: 'Secured top rank in national entrance examination.',
                          badgeText: 'IIT JAM AIR 15'
                        };
                        setEditingAchievement(newA);
                        showStatus('Configure new achievement details below.');
                      }}
                      className="px-3.5 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-amber-400" />
                      <span>Add Achievement</span>
                    </button>
                  </div>

                  {editingAchievement && (
                    <div className="p-4 bg-slate-50 border border-slate-300 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">Editing Achievement</span>
                        <button onClick={() => setEditingAchievement(null)} className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer">✕ Close</button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Recipient *</label>
                          <input
                            type="text"
                            value={editingAchievement.recipient}
                            onChange={(e) => setEditingAchievement({ ...editingAchievement, recipient: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Badge Text *</label>
                          <input
                            type="text"
                            value={editingAchievement.badgeText}
                            onChange={(e) => setEditingAchievement({ ...editingAchievement, badgeText: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                            placeholder="e.g. CSIR NET JRF"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Title / Accolade *</label>
                        <input
                          type="text"
                          value={editingAchievement.title}
                          onChange={(e) => setEditingAchievement({ ...editingAchievement, title: e.target.value })}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Role</label>
                          <select
                            value={editingAchievement.role}
                            onChange={(e) => setEditingAchievement({ ...editingAchievement, role: e.target.value as any })}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          >
                            <option value="Student">Student</option>
                            <option value="Faculty">Faculty</option>
                            <option value="Alumni">Alumni</option>
                            <option value="Department">Department</option>
                          </select>
                        </div>
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Category</label>
                          <select
                            value={editingAchievement.category}
                            onChange={(e) => setEditingAchievement({ ...editingAchievement, category: e.target.value as any })}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          >
                            <option value="Exam Qualification">Exam Qualification</option>
                            <option value="Academic Award">Academic Award</option>
                            <option value="Research Fellowship">Research Fellowship</option>
                            <option value="Olympiad Rank">Olympiad Rank</option>
                            <option value="University Rank">University Rank</option>
                          </select>
                        </div>
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Year</label>
                          <input
                            type="text"
                            value={editingAchievement.year}
                            onChange={(e) => setEditingAchievement({ ...editingAchievement, year: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={editingAchievement.description}
                          onChange={(e) => setEditingAchievement({ ...editingAchievement, description: e.target.value })}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                        ></textarea>
                      </div>
                      <div className="flex justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            const exists = achievements.some((a) => a.id === editingAchievement.id);
                            if (exists) {
                              updateAchievement(editingAchievement);
                              showStatus('Achievement updated successfully.');
                            } else {
                              addAchievement(editingAchievement);
                              showStatus('Achievement added successfully.');
                            }
                            setEditingAchievement(null);
                          }}
                          className="px-4 py-2 bg-blue-900 text-white font-bold rounded-xl cursor-pointer"
                        >
                          Save Achievement
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {achievements.map((a) => (
                      <div key={a.id} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                              {a.badgeText}
                            </span>
                            <span className="text-[11px] text-slate-500 font-semibold">{a.role} • {a.year}</span>
                          </div>
                          <span className="font-bold text-slate-900 block text-xs">{a.recipient}</span>
                          <p className="text-[11px] text-slate-600">{a.title}</p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button onClick={() => setEditingAchievement(a)} className="p-1.5 text-slate-600 hover:text-blue-900 cursor-pointer"><Edit3 className="w-4 h-4" /></button>
                          <button onClick={() => { deleteAchievement(a.id); showStatus('Achievement deleted.'); }} className="p-1.5 text-slate-400 hover:text-red-700 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

               {/* TAB: Stats Section */}
               {activeTab === 'stats' && (
                <div className="space-y-5 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-heading">
                        Stats Counter Settings
                      </h4>
                      <p className="text-slate-500 text-[11px]">
                        Edit labels, values, suffixes, and subtext for the home page statistics.
                      </p>
                    </div>
                  </div>
                  
                  {stats.map((stat, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div>
                            <label className="block font-bold text-slate-700 mb-1">Label</label>
                            <input
                              type="text"
                              value={stat.label}
                              onChange={(e) => {
                                const newStats = [...stats];
                                newStats[index].label = e.target.value;
                                updateStats(newStats);
                              }}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                            />
                        </div>
                        <div>
                            <label className="block font-bold text-slate-700 mb-1">Value</label>
                            <input
                              type="number"
                              value={stat.value}
                              onChange={(e) => {
                                const newStats = [...stats];
                                newStats[index].value = Number(e.target.value);
                                updateStats(newStats);
                              }}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                            />
                        </div>
                        <div>
                            <label className="block font-bold text-slate-700 mb-1">Suffix</label>
                            <input
                              type="text"
                              value={stat.suffix}
                              onChange={(e) => {
                                const newStats = [...stats];
                                newStats[index].suffix = e.target.value;
                                updateStats(newStats);
                              }}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                            />
                        </div>
                        <div>
                            <label className="block font-bold text-slate-700 mb-1">Subtext</label>
                            <input
                              type="text"
                              value={stat.subtext}
                              onChange={(e) => {
                                const newStats = [...stats];
                                newStats[index].subtext = e.target.value;
                                updateStats(newStats);
                              }}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                             <label className="block font-bold text-slate-700 mb-1">Icon (Key)</label>
                             <input
                               type="text"
                               value={stat.icon}
                               onChange={(e) => {
                                 const newStats = [...stats];
                                 newStats[index].icon = e.target.value;
                                 updateStats(newStats);
                               }}
                               className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                               placeholder="e.g. Award, Users, GraduationCap, BookOpen"
                             />
                        </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB: Mathematical Foundations Section */}
              {activeTab === 'foundations' && (
                <div className="space-y-6 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-heading">
                        Foundations Section
                      </h4>
                      <p className="text-slate-500 text-[11px]">
                        Edit the mathematical foundations showcase in the hero section.
                      </p>
                    </div>
                  </div>

                  {/* Showcase Title & Subtitle */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Section Title</label>
                      <input
                        type="text"
                        value={generalForm.heroFoundations.title}
                        onChange={(e) => setGeneralForm({ ...generalForm, heroFoundations: { ...generalForm.heroFoundations, title: e.target.value } })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Section Subtitle</label>
                      <input
                        type="text"
                        value={generalForm.heroFoundations.subtitle}
                        onChange={(e) => setGeneralForm({ ...generalForm, heroFoundations: { ...generalForm.heroFoundations, subtitle: e.target.value } })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                  </div>

                  {/* Equations */}
                  <div>
                    <h5 className="font-bold text-slate-800 mb-2">Equations</h5>
                    {generalForm.heroFoundations.equations.map((eq, index) => (
                      <div key={index} className="space-y-2 p-3 bg-slate-50 rounded-lg border border-slate-200 mb-2">
                        <input
                          type="text"
                          value={eq.name}
                          onChange={(e) => {
                             const newEquations = [...generalForm.heroFoundations.equations];
                             newEquations[index].name = e.target.value;
                             setGeneralForm({ ...generalForm, heroFoundations: { ...generalForm.heroFoundations, equations: newEquations } });
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded"
                          placeholder="Name"
                        />
                        <input
                          type="text"
                          value={eq.formula}
                          onChange={(e) => {
                             const newEquations = [...generalForm.heroFoundations.equations];
                             newEquations[index].formula = e.target.value;
                             setGeneralForm({ ...generalForm, heroFoundations: { ...generalForm.heroFoundations, equations: newEquations } });
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded"
                          placeholder="Formula"
                        />
                        <input
                          type="text"
                          value={eq.desc}
                          onChange={(e) => {
                             const newEquations = [...generalForm.heroFoundations.equations];
                             newEquations[index].desc = e.target.value;
                             setGeneralForm({ ...generalForm, heroFoundations: { ...generalForm.heroFoundations, equations: newEquations } });
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded"
                          placeholder="Description"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Curriculum & Research */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Curriculum Value</label>
                      <input
                        type="text"
                        value={generalForm.heroFoundations.curriculumModel.value}
                        onChange={(e) => setGeneralForm({ ...generalForm, heroFoundations: { ...generalForm.heroFoundations, curriculumModel: { ...generalForm.heroFoundations.curriculumModel, value: e.target.value } } })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Research Value</label>
                      <input
                        type="text"
                        value={generalForm.heroFoundations.researchCell.value}
                        onChange={(e) => setGeneralForm({ ...generalForm, heroFoundations: { ...generalForm.heroFoundations, researchCell: { ...generalForm.heroFoundations.researchCell, value: e.target.value } } })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                  </div>
                </div>
              )}



              {/* TAB 11: Admin Accounts Management */}
              {activeTab === 'admins' && (
                <div className="space-y-6 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-heading">
                        System Administrator Accounts
                      </h4>
                      <p className="text-slate-500 text-[11px]">
                        Register new administrators, update access roles, and monitor system logins.
                      </p>
                    </div>
                    {!showAdminForm && (
                      <button
                        onClick={() => {
                          setEditingAdmin(null);
                          setAdminFormState({
                            fullName: '',
                            username: '',
                            email: '',
                            role: 'Department Admin',
                            passwordHash: '',
                            status: 'Active'
                          });
                          setShowAdminForm(true);
                        }}
                        className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Plus className="w-4 h-4 text-amber-400" />
                        <span>Add New Admin</span>
                      </button>
                    )}
                  </div>

                  {/* Active Admin Identity Badge */}
                  {currentAdmin && (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {currentAdmin.fullName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">
                            {currentAdmin.fullName}{' '}
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-full ml-1.5">
                              {currentAdmin.role}
                            </span>
                          </p>
                          <p className="text-slate-500 text-[11px]">
                            Logged in as <span className="font-mono text-slate-700 font-semibold">{currentAdmin.username}</span> • {currentAdmin.email}
                          </p>
                        </div>
                      </div>
                      <div className="text-slate-400 text-[10px] text-right font-medium">
                        Current Session Token Active
                      </div>
                    </div>
                  )}

                  {showAdminForm ? (
                    /* Admin Form */
                    <form onSubmit={handleSaveAdminAccount} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                      <h5 className="font-bold text-slate-950 text-sm">
                        {editingAdmin ? `Edit Administrator Profile: ${editingAdmin.fullName}` : 'Create New Administrator Account'}
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block font-bold text-slate-700">Full Display Name</label>
                          <input
                            type="text"
                            value={adminFormState.fullName || ''}
                            onChange={(e) => setAdminFormState({ ...adminFormState, fullName: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-900"
                            placeholder="e.g. Dr. Jane Doe"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block font-bold text-slate-700">Username</label>
                          <input
                            type="text"
                            value={adminFormState.username || ''}
                            onChange={(e) => setAdminFormState({ ...adminFormState, username: e.target.value.replace(/\s+/g, '') })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-900 font-mono"
                            placeholder="e.g. jane_doe"
                            disabled={!!editingAdmin}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block font-bold text-slate-700">Official Email</label>
                          <input
                            type="email"
                            value={adminFormState.email || ''}
                            onChange={(e) => setAdminFormState({ ...adminFormState, email: e.target.value.trim() })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-900"
                            placeholder="e.g. jane@dudhnoicollege.ac.in"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block font-bold text-slate-700">Security Password</label>
                          <input
                            type="text"
                            value={adminFormState.passwordHash || ''}
                            onChange={(e) => setAdminFormState({ ...adminFormState, passwordHash: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-900 font-mono"
                            placeholder="Specify account password"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block font-bold text-slate-700">Authorization Role</label>
                          <select
                            value={adminFormState.role || 'Department Admin'}
                            onChange={(e) => setAdminFormState({ ...adminFormState, role: e.target.value as any })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-900"
                          >
                            <option value="Super Admin">Super Admin (All Capabilities)</option>
                            <option value="HOD">HOD (Department Head)</option>
                            <option value="Department Admin">Department Admin (Standard Editor)</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block font-bold text-slate-700">Account Status</label>
                          <select
                            value={adminFormState.status || 'Active'}
                            onChange={(e) => setAdminFormState({ ...adminFormState, status: e.target.value as any })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-900"
                          >
                            <option value="Active">Active / Approved</option>
                            <option value="Suspended">Suspended / Read-only</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2.5 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAdmin(null);
                            setShowAdminForm(false);
                          }}
                          className="px-4 py-2 border border-slate-300 hover:bg-slate-100 rounded-xl font-bold cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl cursor-pointer"
                        >
                          {editingAdmin ? 'Update Account' : 'Register Administrator'}
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Admin Table and Registration Requests Segment */
                    <div className="space-y-6">
                      
                      {/* Sub-panel 1: Pending Requests with Super Admin authorization gate */}
                      <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50 p-5 space-y-4">
                        <div>
                          <h5 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                            <UserCheck className="w-4 h-4 text-amber-500" />
                            <span>Pending Administrator Registration Requests</span>
                            {adminRegistrationRequests?.filter(r => r.status === 'Pending').length > 0 && (
                              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-bold rounded-full animate-pulse">
                                {adminRegistrationRequests.filter(r => r.status === 'Pending').length} Pending
                              </span>
                            )}
                          </h5>
                          <p className="text-slate-500 text-[11px] mt-0.5">
                            New registrants waiting for validation and active approval from Super Admin.
                          </p>
                        </div>

                        {(!adminRegistrationRequests || adminRegistrationRequests.filter(r => r.status === 'Pending').length === 0) ? (
                          <div className="text-center py-6 text-slate-400 bg-white border border-slate-200 border-dashed rounded-xl">
                            <p className="font-medium text-xs">No pending administrator registration requests.</p>
                          </div>
                        ) : (
                          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-slate-100 border-b border-slate-200 text-[9px] text-slate-500 uppercase tracking-wider font-bold">
                                  <th className="py-2.5 px-3">Registrant Name & Email</th>
                                  <th className="py-2.5 px-3">Username</th>
                                  <th className="py-2.5 px-3">Requested Role</th>
                                  <th className="py-2.5 px-3">Date Submitted</th>
                                  <th className="py-2.5 px-3 text-right">Approval Actions</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 text-[11px] text-slate-700">
                                {adminRegistrationRequests.filter(r => r.status === 'Pending').map((req) => (
                                  <tr key={req.id} className="hover:bg-slate-50/40">
                                    <td className="py-2.5 px-3">
                                      <div className="font-bold text-slate-900">{req.fullName}</div>
                                      <div className="text-slate-500 text-[10px]">{req.email}</div>
                                    </td>
                                    <td className="py-2.5 px-3 font-mono font-bold text-slate-600">{req.username}</td>
                                    <td className="py-2.5 px-3">
                                      <span className="px-2 py-0.5 bg-amber-50 text-amber-800 text-[9px] font-bold rounded-full border border-amber-200">
                                        {req.role}
                                      </span>
                                    </td>
                                    <td className="py-2.5 px-3 text-slate-500 font-mono">{req.requestDate}</td>
                                    <td className="py-2.5 px-3 text-right">
                                      {(currentAdmin?.role === 'Super Admin' || currentAdmin?.username?.toLowerCase() === 'kandorpo') ? (
                                        <div className="flex items-center justify-end gap-1.5">
                                          <button
                                            onClick={() => {
                                              approveAdminRegistrationRequest(req.id);
                                              showStatus(`Administrator account "${req.fullName}" has been approved & activated.`);
                                            }}
                                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] cursor-pointer shadow-2xs"
                                          >
                                            Approve & Activate
                                          </button>
                                          <button
                                            onClick={() => {
                                              rejectAdminRegistrationRequest(req.id);
                                              showStatus(`Registration request for "${req.fullName}" declined.`);
                                            }}
                                            className="px-2 py-1 border border-slate-300 hover:bg-red-50 hover:text-red-700 hover:border-red-200 text-slate-600 font-bold rounded-lg text-[10px] cursor-pointer"
                                          >
                                            Decline
                                          </button>
                                        </div>
                                      ) : (
                                        <span className="text-[10px] text-amber-600 font-bold flex items-center justify-end gap-1">
                                          <Lock className="w-3 h-3" />
                                          <span>Awaiting Super Admin Approval</span>
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>

                      {/* Sub-panel 2: List of Active Administrators */}
                      <div className="space-y-3">
                        <h5 className="font-bold text-slate-900 text-sm">
                          Active Department Administrators ({admins?.length || 0})
                        </h5>
                        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                                <th className="py-3 px-4">Full Name & Email</th>
                                <th className="py-3 px-4">Username</th>
                                <th className="py-3 px-4">Role</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4">Last Login</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                              {(admins || []).map((adm) => (
                                <tr key={adm.id} className="hover:bg-slate-50/50">
                                  <td className="py-3 px-4">
                                    <div className="font-bold text-slate-900">{adm.fullName}</div>
                                    <div className="text-slate-500 text-[10px]">{adm.email}</div>
                                  </td>
                                  <td className="py-3 px-4 font-mono font-bold text-slate-600">{adm.username}</td>
                                  <td className="py-3 px-4">
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                      adm.role === 'Super Admin' 
                                        ? 'bg-purple-100 text-purple-800' 
                                        : adm.role === 'HOD' 
                                          ? 'bg-indigo-100 text-indigo-800' 
                                          : 'bg-blue-100 text-blue-800'
                                    }`}>
                                      {adm.role}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4">
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                      adm.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                      {adm.status}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 text-slate-500 font-mono text-[10px]">
                                    {adm.lastLogin || 'Never logged in'}
                                  </td>
                                  <td className="py-3 px-4 text-right">
                                    <div className="flex items-center justify-end gap-1.5">
                                      <button
                                        onClick={() => handleEditAdmin(adm)}
                                        className="p-1.5 hover:bg-slate-100 text-blue-900 rounded-lg transition-colors cursor-pointer"
                                        title="Edit admin properties"
                                      >
                                        <Edit3 className="w-3.5 h-3.5" />
                                      </button>
                                      {(currentAdmin?.role === 'Super Admin' || currentAdmin?.username?.toLowerCase() === 'kandorpo' || isAdminLoggedIn) && (
                                        <button
                                          onClick={() => handleDeleteAdmin(adm.id)}
                                          className={`p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors cursor-pointer ${
                                            currentAdmin?.id === adm.id ? 'opacity-30 cursor-not-allowed' : ''
                                          }`}
                                          disabled={currentAdmin?.id === adm.id}
                                          title={currentAdmin?.id === adm.id ? "Cannot delete yourself" : "Delete account"}
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
