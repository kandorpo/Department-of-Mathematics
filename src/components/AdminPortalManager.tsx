import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  Search,
  Plus,
  Edit3,
  Trash2,
  Download,
  Upload,
  Calendar,
  HelpCircle,
  BookOpen,
  CheckCircle2,
  Clock,
  MessageSquare,
  FileText,
  Save,
  X,
  ExternalLink,
  ShieldCheck,
  Award,
  Sparkles,
  Layers,
  Phone,
  Mail,
  UserCheck,
  AlertCircle,
  Sliders
} from 'lucide-react';
import { useDepartmentData } from '../context/DataContext';
import { StudentProfile, StudentResource, RoutineSlot, StudentGrievance, CourseType, RoutineCourseEntry } from '../types';
import { Skeleton } from './Skeleton';

type PortalSubTab = 'accounts' | 'resources' | 'routines' | 'grievances' | 'settings';

export const AdminPortalManager: React.FC = () => {
  const {
    registeredStudentProfiles,
    addRegisteredStudentProfile,
    updateRegisteredStudentProfile,
    deleteRegisteredStudentProfile,
    bulkImportRegisteredStudentProfiles,

    portalResources,
    addPortalResource,
    updatePortalResource,
    deletePortalResource,

    routineSlots,
    addRoutineSlot,
    updateRoutineSlot,
    deleteRoutineSlot,

    studentGrievances,
    updateStudentGrievance,
    deleteStudentGrievance,
    addStudentGrievance,
    
    // General Info for site settings
    departmentInfo,
    updateDepartmentInfo,
    
    isLoading
  } = useDepartmentData();

  // General info form local state
  const [generalForm, setGeneralForm] = useState({
    ...departmentInfo,
    imageUrls: (departmentInfo.imageUrls || []).join(', ')
  });

  useEffect(() => {
    setGeneralForm({
      ...departmentInfo,
      imageUrls: (departmentInfo.imageUrls || []).join(', ')
    });
  }, [departmentInfo]);

  const handleSaveGeneralInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateDepartmentInfo({
      ...generalForm,
      imageUrls: generalForm.imageUrls.split(',').map(s => s.trim()).filter(Boolean)
    });
    showStatus('Department General Information saved and updated live.');
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const [subTab, setSubTab] = useState<PortalSubTab>('accounts');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // Modals / forms state
  const [editingStudent, setEditingStudent] = useState<StudentProfile | null>(null);
  const [isAddingStudent, setIsAddingStudent] = useState(false);

  const [editingResource, setEditingResource] = useState<StudentResource | null>(null);
  const [isAddingResource, setIsAddingResource] = useState(false);

  const [editingRoutine, setEditingRoutine] = useState<RoutineSlot | null>(null);
  const [isAddingRoutine, setIsAddingRoutine] = useState(false);

  const [respondingGrievance, setRespondingGrievance] = useState<StudentGrievance | null>(null);

  // File import ref
  const importAccountsRef = useRef<HTMLInputElement>(null);

  const showStatus = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(null), 3500);
  };

  // Student Profile Form State
  const [studentForm, setStudentForm] = useState<Partial<StudentProfile>>({
    fullName: '',
    rollNo: '',
    guRegNo: '',
    classSection: 'Section A',
    email: '',
    phone: '',
    semester: 'B.Sc. 1st Semester (Major)',
    program: 'B.Sc. Mathematics (Honours/Major)',
    selectiveCourse: 'MAT-MAJ-101: Calculus & Analytical Geometry',
    batch: '2024 - 2028',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
    bio: '',
    mentorName: 'Dr. Bidyut Kalita (HOD)',
    interests: ['Calculus', 'Python', 'Linear Algebra'],
    registeredDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    cgpa: 8.5,
    admissionYear: '2024',
    dob: '',
    fatherName: '',
    bloodGroup: 'O+',
    address: '',
    careerGoals: ''
  });

  // Resource Form State
  const [resourceForm, setResourceForm] = useState<Partial<StudentResource>>({
    title: '',
    category: 'Syllabus',
    description: '',
    fileType: 'PDF (2.5 MB)',
    downloadLink: '',
    semester: 'All Semesters',
    uploadedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  });

  // Routine Form State
  const [routineForm, setRoutineForm] = useState<Partial<RoutineSlot>>({
    timeSlot: '09:15 - 10:15 AM',
    day: 'Monday - Saturday',
    sem1: { course: '', type: 'Major' },
    sem2: { course: '', type: 'Minor' },
    sem3: { course: '', type: 'Major' },
    sem4: { course: '', type: 'Major/Minor' },
    sem5: { course: '', type: 'Major' },
    sem6: { course: '', type: 'Major' }
  });

  // Grievance Response State
  const [grievanceReply, setGrievanceReply] = useState('');
  const [grievanceStatus, setGrievanceStatus] = useState<StudentGrievance['status']>('Resolved');

  // Open Edit Student
  const handleOpenEditStudent = (student: StudentProfile) => {
    setEditingStudent(student);
    setStudentForm({ ...student });
    setIsAddingStudent(false);
  };

  // Open Add Student
  const handleOpenAddStudent = () => {
    setEditingStudent(null);
    setStudentForm({
      id: `stu-${Date.now()}`,
      fullName: '',
      rollNo: '',
      guRegNo: '',
      classSection: 'Section A',
      email: '',
      phone: '+91 94350 ',
      semester: 'B.Sc. 1st Semester (Major)',
      program: 'B.Sc. Mathematics (Honours/Major)',
      selectiveCourse: 'MAT-MAJ-101: Calculus & Analytical Geometry',
      batch: '2024 - 2028',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
      bio: 'Enthusiastic mathematics student at Dudhnoi College.',
      mentorName: 'Dr. Bidyut Kalita (HOD)',
      interests: ['Number Theory', 'Computational Python'],
      registeredDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      cgpa: 8.0,
      admissionYear: '2024',
      dob: '2005-01-01',
      fatherName: '',
      bloodGroup: 'B+',
      address: 'Dudhnoi, Goalpara, Assam',
      careerGoals: 'Higher Research in Pure Mathematics'
    });
    setIsAddingStudent(true);
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentForm.fullName || !studentForm.rollNo) {
      alert('Student Full Name and Roll No are required.');
      return;
    }

    const payload: StudentProfile = {
      id: studentForm.id || `stu-${Date.now()}`,
      fullName: studentForm.fullName.trim(),
      rollNo: studentForm.rollNo.trim(),
      guRegNo: studentForm.guRegNo?.trim() || '',
      classSection: studentForm.classSection || '',
      email: studentForm.email?.trim() || `${studentForm.rollNo?.toLowerCase().replace(/[^a-z0-9]/g, '')}@student.dudhnoicollege.ac.in`,
      phone: studentForm.phone?.trim() || '',
      semester: studentForm.semester || 'B.Sc. 1st Semester (Major)',
      program: (studentForm.program as any) || 'B.Sc. Mathematics (Honours/Major)',
      selectiveCourse: studentForm.selectiveCourse || '',
      batch: studentForm.batch || '2024 - 2028',
      avatar: studentForm.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
      bio: studentForm.bio || '',
      mentorName: studentForm.mentorName || 'Dr. Bidyut Kalita (HOD)',
      interests: Array.isArray(studentForm.interests)
        ? studentForm.interests
        : typeof studentForm.interests === 'string'
        ? (studentForm.interests as string).split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      registeredDate: studentForm.registeredDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      cgpa: Number(studentForm.cgpa) || 8.0,
      admissionYear: studentForm.admissionYear || '2024',
      dob: studentForm.dob || '',
      fatherName: studentForm.fatherName || '',
      bloodGroup: studentForm.bloodGroup || '',
      address: studentForm.address || '',
      careerGoals: studentForm.careerGoals || ''
    };

    if (editingStudent) {
      updateRegisteredStudentProfile(payload);
      showStatus(`Updated student profile for ${payload.fullName} (${payload.rollNo}).`);
    } else {
      addRegisteredStudentProfile(payload);
      showStatus(`Added new portal student account for ${payload.fullName}.`);
    }

    setEditingStudent(null);
    setIsAddingStudent(false);
  };

  // Resources Save
  const handleSaveResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceForm.title || !resourceForm.description) {
      alert('Title and description are required.');
      return;
    }
    const payload: StudentResource = {
      id: resourceForm.id || `res-${Date.now()}`,
      title: resourceForm.title.trim(),
      category: (resourceForm.category as any) || 'Syllabus',
      description: resourceForm.description.trim(),
      fileType: resourceForm.fileType || 'PDF Document',
      downloadLink: resourceForm.downloadLink || '#',
      semester: resourceForm.semester || 'All Semesters',
      uploadedDate: resourceForm.uploadedDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    if (editingResource) {
      updatePortalResource(payload);
      showStatus(`Updated study material: ${payload.title}`);
    } else {
      addPortalResource(payload);
      showStatus(`Added new study material: ${payload.title}`);
    }
    setEditingResource(null);
    setIsAddingResource(false);
  };

  // Routine Save
  const handleSaveRoutine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!routineForm.timeSlot) {
      alert('Time Slot is required.');
      return;
    }
    const payload: RoutineSlot = {
      id: routineForm.id || `slot-${Date.now()}`,
      timeSlot: routineForm.timeSlot.trim(),
      day: routineForm.day || 'Monday - Saturday',
      sem1: routineForm.sem1 || { course: '', type: 'Major' },
      sem2: routineForm.sem2 || { course: '', type: 'Minor' },
      sem3: routineForm.sem3 || { course: '', type: 'Major' },
      sem4: routineForm.sem4 || { course: '', type: 'Major/Minor' },
      sem5: routineForm.sem5 || { course: '', type: 'Major' },
      sem6: routineForm.sem6 || { course: '', type: 'Major' }
    };

    if (editingRoutine) {
      updateRoutineSlot(payload);
      showStatus(`Updated schedule slot: ${payload.timeSlot}`);
    } else {
      addRoutineSlot(payload);
      showStatus(`Added new routine slot: ${payload.timeSlot}`);
    }
    setEditingRoutine(null);
    setIsAddingRoutine(false);
  };

  // Grievance Reply Save
  const handleSaveGrievanceReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!respondingGrievance) return;

    const updated: StudentGrievance = {
      ...respondingGrievance,
      status: grievanceStatus,
      adminResponse: grievanceReply.trim(),
      responseDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    updateStudentGrievance(updated);
    showStatus(`Sent advisory response for Reference #${updated.refNo} to ${updated.studentName}.`);
    setRespondingGrievance(null);
  };

  // Export Registered Profiles to CSV
  const handleExportAccountsCsv = () => {
    if (registeredStudentProfiles.length === 0) {
      alert('No student accounts to export.');
      return;
    }
    const headers = [
      'Full Name',
      'Roll No',
      'GU Reg No',
      'Class/Section',
      'Program',
      'Current Semester',
      'Email',
      'Phone',
      'Batch',
      'Assigned Mentor',
      'CGPA',
      'Admission Year',
      'Blood Group',
      'Address',
      'Interests',
      'Bio'
    ];

    const rows = registeredStudentProfiles.map((s) => [
      `"${s.fullName || ''}"`,
      `"${s.rollNo || ''}"`,
      `"${s.guRegNo || ''}"`,
      `"${s.classSection || ''}"`,
      `"${s.program || ''}"`,
      `"${s.semester || ''}"`,
      `"${s.email || ''}"`,
      `"${s.phone || ''}"`,
      `"${s.batch || ''}"`,
      `"${s.mentorName || ''}"`,
      `"${s.cgpa || ''}"`,
      `"${s.admissionYear || ''}"`,
      `"${s.bloodGroup || ''}"`,
      `"${s.address || ''}"`,
      `"${(s.interests || []).join('; ')}"`,
      `"${(s.bio || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `dudhnoi_math_portal_registered_students_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showStatus('Exported student portal directory to CSV.');
  };

  // Filter students based on search query
  const filteredStudents = registeredStudentProfiles.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.fullName.toLowerCase().includes(q) ||
      s.rollNo.toLowerCase().includes(q) ||
      (s.guRegNo && s.guRegNo.toLowerCase().includes(q)) ||
      s.email.toLowerCase().includes(q) ||
      s.semester.toLowerCase().includes(q) ||
      (s.classSection && s.classSection.toLowerCase().includes(q)) ||
      (s.mentorName && s.mentorName.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-5 text-slate-800">
      
      {/* Top Banner & Tab Controls */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-2xl p-5 text-white shadow-md border border-blue-800/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-mono">
                Full Portal Access
              </span>
              <span className="text-xs text-blue-200">
                Department ERP Master Controls
              </span>
            </div>
            <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>Student Portal Manager</span>
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Administrators have full access to view, create, edit, and delete everything on the portal — including student profiles, study materials, class routines, and mentorship grievances.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/15 backdrop-blur-xs text-xs">
            <div className="text-center px-2">
              <span className="block text-amber-300 font-bold text-lg font-mono">{registeredStudentProfiles.length}</span>
              <span className="text-[10px] text-slate-300">Active Accounts</span>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center px-2">
              <span className="block text-blue-300 font-bold text-lg font-mono">{portalResources.length}</span>
              <span className="text-[10px] text-slate-300">Study Files</span>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center px-2">
              <span className="block text-emerald-300 font-bold text-lg font-mono">{studentGrievances.length}</span>
              <span className="text-[10px] text-slate-300">Mentorship Logs</span>
            </div>
          </div>
        </div>

        {/* Sub-tab switcher */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/10">
          <button
            onClick={() => setSubTab('accounts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              subTab === 'accounts'
                ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Student Accounts & Details ({registeredStudentProfiles.length})</span>
          </button>

          <button
            onClick={() => setSubTab('resources')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              subTab === 'resources'
                ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Study Materials & Papers ({portalResources.length})</span>
          </button>

          <button
            onClick={() => setSubTab('routines')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              subTab === 'routines'
                ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Class & Lab Routines ({routineSlots.length} Slots)</span>
          </button>

          <button
            onClick={() => setSubTab('grievances')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              subTab === 'grievances'
                ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Mentorship Queries ({studentGrievances.length})</span>
          </button>

          <button
            onClick={() => setSubTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              subTab === 'settings'
                ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Site Settings & Visuals</span>
          </button>
        </div>
      </div>

      {/* Status Toast Alert */}
      {statusMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">{statusMsg}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 1: STUDENT ACCOUNTS & FULL PROFILE EDITING */}
      {/* ========================================================================= */}
      {subTab === 'accounts' && (
        <div className="space-y-4">
          
          {/* Controls Bar: Search & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, roll no, GU reg, email, class, or mentor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleExportAccountsCsv}
                className="px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Download CSV of all registered student portal accounts"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={handleOpenAddStudent}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>Create Student Account</span>
              </button>
            </div>
          </div>

          {/* Student Accounts Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-3">Student Info</th>
                    <th className="p-3">Roll & Registration</th>
                    <th className="p-3">Course / Program</th>
                    <th className="p-3">Semester & Batch</th>
                    <th className="p-3">Assigned Mentor</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((stu) => (
                      <tr key={stu.id} className="hover:bg-blue-50/40 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={stu.avatar}
                              alt={stu.fullName}
                              className="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <span className="font-bold text-slate-900 block text-xs">{stu.fullName}</span>
                              {stu.classSection && (
                                <span className="text-[10px] text-slate-500 font-medium">{stu.classSection}</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="font-mono font-bold text-blue-950 block">{stu.rollNo}</span>
                          <span className="text-[10px] text-slate-500 font-mono">GU: {stu.guRegNo || '—'}</span>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold text-slate-800 block">{stu.program}</span>
                          {stu.selectiveCourse && (
                            <span className="text-[10px] text-slate-500 line-clamp-1">{stu.selectiveCourse}</span>
                          )}
                        </td>
                        <td className="p-3">
                          <span className="font-medium text-slate-700 block">{stu.semester}</span>
                          <span className="text-[10px] text-slate-500">{stu.batch}</span>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block text-[11px]">
                            {stu.mentorName || 'Dr. Bidyut Kalita (HOD)'}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="text-slate-600 block text-[11px]">{stu.email}</span>
                          <span className="text-slate-500 block text-[10px] font-mono">{stu.phone || '—'}</span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditStudent(stu)}
                              className="p-1.5 text-blue-800 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                              title="Edit all student details"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                  deleteRegisteredStudentProfile(stu.id);
                                  showStatus(`Deleted student account ${stu.fullName}.`);
                              }}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete account"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400">
                        No student accounts found matching "{searchQuery}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 2: STUDY MATERIALS & QUESTION BANKS */}
      {/* ========================================================================= */}
      {subTab === 'resources' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Official Curriculum & Downloadable Resources</h4>
              <p className="text-xs text-slate-500">
                Add, update syllabus PDFs, question archives, LaTeX templates, and computational manuals.
              </p>
            </div>
            <button
              onClick={() => {
                setEditingResource(null);
                setResourceForm({
                  id: `res-${Date.now()}`,
                  title: '',
                  category: 'Syllabus',
                  description: '',
                  fileType: 'PDF (2.0 MB)',
                  downloadLink: '',
                  semester: 'All Semesters',
                  uploadedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                });
                setIsAddingResource(true);
              }}
              className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Add New Study Material</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {portalResources.map((res) => (
              <div
                key={res.id}
                className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase">
                      {res.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{res.fileType}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs">{res.title}</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{res.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400">Sem: {res.semester || 'All'}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setEditingResource(res);
                        setResourceForm({ ...res });
                        setIsAddingResource(false);
                      }}
                      className="px-2.5 py-1 text-blue-900 hover:bg-blue-50 font-semibold rounded text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete resource "${res.title}"?`)) {
                          deletePortalResource(res.id);
                          showStatus(`Deleted resource "${res.title}".`);
                        }
                      }}
                      className="p-1 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                      title="Delete"
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

      {/* ========================================================================= */}
      {/* SUBTAB 3: CLASS & LAB ROUTINES */}
      {/* ========================================================================= */}
      {subTab === 'routines' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Master Timetable & Practical Laboratory Slots</h4>
              <p className="text-xs text-slate-500">
                Configure weekly time slots, assigned faculties, theory papers, and computer lab practicals.
              </p>
            </div>
            <button
              onClick={() => {
                setEditingRoutine(null);
                setRoutineForm({
                  id: `slot-${Date.now()}`,
                  timeSlot: '02:00 - 03:00 PM',
                  day: 'Monday - Saturday',
                  sem1: { course: '', type: 'Major' },
                  sem2: { course: '', type: 'Minor' },
                  sem3: { course: '', type: 'Major' },
                  sem4: { course: '', type: 'Major/Minor' },
                  sem5: { course: '', type: 'Major' },
                  sem6: { course: '', type: 'Major' }
                });
                setIsAddingRoutine(true);
              }}
              className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Add Schedule Slot</span>
            </button>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-x-auto shadow-xs bg-white">
            <table className="w-full text-left border-collapse text-xs min-w-[750px]">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3">Time Slot</th>
                  <th className="p-3">Sem 1</th>
                  <th className="p-3">Sem 2</th>
                  <th className="p-3">Sem 3</th>
                  <th className="p-3">Sem 4</th>
                  <th className="p-3">Sem 5</th>
                  <th className="p-3">Sem 6</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {routineSlots.map((rawSlot) => {
                  const slot: RoutineSlot = {
                    id: rawSlot.id,
                    timeSlot: rawSlot.timeSlot,
                    day: rawSlot.day,
                    sem1: rawSlot.sem1 || { course: (rawSlot as any).sem1Major || '', type: 'Major' },
                    sem2: rawSlot.sem2 || { course: '', type: 'Minor' },
                    sem3: rawSlot.sem3 || { course: (rawSlot as any).sem3Major || '', type: 'Major' },
                    sem4: rawSlot.sem4 || { course: '', type: 'Major/Minor' },
                    sem5: rawSlot.sem5 || { course: (rawSlot as any).sem5Major || '', type: 'Major' },
                    sem6: rawSlot.sem6 || { course: (rawSlot as any).mscSlot || '', type: 'Major' },
                  };
                  return (
                    <tr key={slot.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono">
                        <span className="font-bold text-blue-900 block">{slot.timeSlot}</span>
                        <span className="text-[10px] text-slate-500">{slot.day || 'Mon-Sat'}</span>
                      </td>
                      {[slot.sem1, slot.sem2, slot.sem3, slot.sem4, slot.sem5, slot.sem6].map((sem, i) => (
                        <td key={i} className="p-3">
                          {sem.course ? (
                            <div>
                              <span className="font-medium text-slate-800 block">{sem.course}</span>
                              <span className={`inline-block mt-0.5 px-1.5 py-0.5 text-[9px] font-bold rounded ${
                                sem.type === 'Major' ? 'bg-blue-100 text-blue-900' :
                                sem.type === 'Minor' ? 'bg-amber-100 text-amber-900' : 'bg-purple-100 text-purple-900'
                              }`}>
                                {sem.type}
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate-300">—</span>
                          )}
                        </td>
                      ))}
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setEditingRoutine(rawSlot);
                              setRoutineForm({ ...rawSlot });
                              setIsAddingRoutine(false);
                            }}
                            className="p-1 text-blue-800 hover:bg-blue-50 rounded"
                            title="Edit routine slot"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete time slot ${slot.timeSlot}?`)) {
                                deleteRoutineSlot(slot.id);
                                showStatus(`Deleted routine slot ${slot.timeSlot}.`);
                              }
                            }}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Delete slot"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 4: MENTORSHIP & GRIEVANCE QUERIES */}
      {/* ========================================================================= */}
      {subTab === 'grievances' && (
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm">Department Mentorship & Academic Query Registry</h4>
            <p className="text-xs text-slate-500">
              Review student consultation requests, project allocations, and provide official faculty mentor responses.
            </p>
          </div>

          <div className="space-y-3">
            {studentGrievances.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold bg-blue-50 text-blue-900 px-2 py-0.5 rounded border border-blue-200">
                      #{item.refNo}
                    </span>
                    <span className="font-bold text-slate-900 text-xs">{item.studentName}</span>
                    <span className="text-[11px] text-slate-500 font-mono">({item.rollNo})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        item.status === 'Resolved'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : item.status === 'In Review'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-[10px] text-slate-400">{item.submittedAt}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] bg-slate-50/70 p-2.5 rounded-lg">
                  <div>
                    <span className="text-slate-500">Semester & Program: </span>
                    <strong className="text-slate-800">{item.semester} ({item.course})</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Assigned Mentor: </span>
                    <strong className="text-amber-800">{item.mentorName}</strong>
                  </div>
                </div>

                <div className="text-xs text-slate-700 space-y-1">
                  <span className="font-semibold text-slate-900 block text-[11px]">Query / Message:</span>
                  <p className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 italic">
                    "{item.message}"
                  </p>
                </div>

                {item.adminResponse && (
                  <div className="text-xs bg-emerald-50/70 p-3 rounded-lg border border-emerald-200 space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-bold text-emerald-900">
                      <span>Official Faculty / Mentor Response:</span>
                      <span>{item.responseDate || 'Updated'}</span>
                    </div>
                    <p className="text-emerald-950 font-medium">
                      {item.adminResponse}
                    </p>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setRespondingGrievance(item);
                      setGrievanceReply(item.adminResponse || '');
                      setGrievanceStatus(item.status);
                    }}
                    className="px-3 py-1.5 bg-blue-900 hover:bg-blue-950 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{item.adminResponse ? 'Update Response' : 'Reply & Advise'}</span>
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete query #${item.refNo}?`)) {
                        deleteStudentGrievance(item.id);
                        showStatus(`Deleted query #${item.refNo}.`);
                      }
                    }}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                    title="Delete query"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 5: SITE SETTINGS & VISUALS */}
      {/* ========================================================================= */}
      {subTab === 'settings' && (
        <form onSubmit={handleSaveGeneralInfo} className="space-y-5 text-xs bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="text-base font-bold text-slate-900 font-heading">
                Portal Site Settings & Visual Configuration
              </h4>
              <p className="text-slate-500 text-[11px]">
                Manage website branding, logo, and department imagery directly from the portal.
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Website Logo URL</label>
              <input
                type="text"
                value={generalForm.logoUrl}
                onChange={(e) => setGeneralForm({ ...generalForm, logoUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Department Header Images (Comma separated URLs)</label>
              <textarea
                value={generalForm.imageUrls}
                onChange={(e) => setGeneralForm({ ...generalForm, imageUrls: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-900"
                rows={3}
              />
            </div>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT STUDENT FULL PROFILE (ADMIN) */}
      {/* ========================================================================= */}
      {(isAddingStudent || editingStudent) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-900" />
                <h4 className="font-bold text-base text-slate-900">
                  {editingStudent ? `Edit Student Profile: ${editingStudent.fullName}` : 'Create New Portal Student Account'}
                </h4>
              </div>
              <button
                onClick={() => {
                  setEditingStudent(null);
                  setIsAddingStudent(false);
                }}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="space-y-4 text-xs">
              
              {/* Row 1: Full Name, Roll No, GU Reg */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={studentForm.fullName || ''}
                    onChange={(e) => setStudentForm({ ...studentForm, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Class Roll No / GU Roll *</label>
                  <input
                    type="text"
                    required
                    value={studentForm.rollNo || ''}
                    onChange={(e) => setStudentForm({ ...studentForm, rollNo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">GU Registration No.</label>
                  <input
                    type="text"
                    value={studentForm.guRegNo || ''}
                    onChange={(e) => setStudentForm({ ...studentForm, guRegNo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white font-mono"
                  />
                </div>
              </div>

              {/* Row 2: Program, Semester */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Program / Course *</label>
                  <select
                    value={studentForm.program || 'B.Sc. Mathematics (Honours/Major)'}
                    onChange={(e) => setStudentForm({ ...studentForm, program: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                  >
                    <option value="B.Sc. Mathematics (Honours/Major)">B.Sc. Mathematics (Honours/Major)</option>
                    <option value="B.Sc. Mathematics (Minor)">B.Sc. Mathematics (Minor)</option>
                    <option value="M.Sc. Mathematics">M.Sc. Mathematics</option>
                    <option value="FYUGP Mathematics (Major)">FYUGP Mathematics (Major)</option>
                    <option value="FYUGP Mathematics (Minor)">FYUGP Mathematics (Minor)</option>
                    <option value="Skill Enhancement (SEC/VAC)">Skill Enhancement (SEC/VAC)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Current Semester *</label>
                  <select
                    value={studentForm.semester || 'B.Sc. 1st Semester (Major)'}
                    onChange={(e) => setStudentForm({ ...studentForm, semester: e.target.value })}
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
                    <option>Graduated (Alumni)</option>
                  </select>
                </div>
              </div>

              {/* Row 3: CGPA, Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Current CGPA / Percentage</label>
                  <input
                    type="number"
                    step="0.01"
                    value={studentForm.cgpa || ''}
                    onChange={(e) => setStudentForm({ ...studentForm, cgpa: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={studentForm.phone || ''}
                    onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                  />
                </div>
              </div>
$s/\$//

              {/* Row 5: Avatar Image URL */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Avatar / Photo URL</label>
                <div className="flex items-center gap-3">
                  <img
                    src={studentForm.avatar}
                    alt="Preview"
                    className="w-10 h-10 rounded-lg object-cover border border-slate-300 bg-slate-100"
                    referrerPolicy="no-referrer"
                  />
                  <input
                    type="text"
                    value={studentForm.avatar || ''}
                    onChange={(e) => setStudentForm({ ...studentForm, avatar: e.target.value })}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                  />
                </div>
              </div>

              {/* Row 6: Areas of Interest */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Special Mathematical Interests (comma-separated)</label>
                <input
                  type="text"
                  value={Array.isArray(studentForm.interests) ? studentForm.interests.join(', ') : (studentForm.interests as any) || ''}
                  onChange={(e) => setStudentForm({ ...studentForm, interests: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                />
              </div>

              {/* Row 7: Bio */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Student Bio / Statement</label>
                <textarea
                  rows={2}
                  value={studentForm.bio || ''}
                  onChange={(e) => setStudentForm({ ...studentForm, bio: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white resize-none"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setEditingStudent(null);
                    setIsAddingStudent(false);
                  }}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingStudent ? 'Save Student Details' : 'Create Account'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT STUDY RESOURCE (ADMIN) */}
      {/* ========================================================================= */}
      {(isAddingResource || editingResource) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h4 className="font-bold text-base text-slate-900">
                {editingResource ? 'Edit Study Material' : 'Add New Study Material / Paper'}
              </h4>
              <button
                onClick={() => {
                  setEditingResource(null);
                  setIsAddingResource(false);
                }}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveResource} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Resource Title *</label>
                <input
                  type="text"
                  required
                  value={resourceForm.title || ''}
                  onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })}
                  placeholder="e.g. FYUGP Major Syllabus (NEP 2020)"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={resourceForm.category || 'Syllabus'}
                    onChange={(e) => setResourceForm({ ...resourceForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="Syllabus">Syllabus</option>
                    <option value="Question Bank">Question Bank</option>
                    <option value="Lab Manual">Lab Manual</option>
                    <option value="Templates">Templates</option>
                    <option value="Competitive Exams">Competitive Exams</option>
                    <option value="Schedule">Schedule</option>
                    <option value="Lecture Notes">Lecture Notes</option>
                    <option value="Assignments">Assignments</option>
                    <option value="Reference Books">Reference Books</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">File Format / Size</label>
                  <input
                    type="text"
                    value={resourceForm.fileType || 'PDF (2.4 MB)'}
                    onChange={(e) => setResourceForm({ ...resourceForm, fileType: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Download URL or Link</label>
                <input
                  type="text"
                  value={resourceForm.downloadLink || ''}
                  onChange={(e) => setResourceForm({ ...resourceForm, downloadLink: e.target.value })}
                  placeholder="https://... or /downloads/file.pdf"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={resourceForm.description || ''}
                  onChange={(e) => setResourceForm({ ...resourceForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setEditingResource(null);
                    setIsAddingResource(false);
                  }}
                  className="px-4 py-2 bg-slate-200 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 text-white rounded-lg font-bold"
                >
                  Save Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT ROUTINE SLOT (ADMIN) */}
      {/* ========================================================================= */}
      {(isAddingRoutine || editingRoutine) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h4 className="font-bold text-base text-slate-900">
                {editingRoutine ? 'Edit Schedule Slot' : 'Add Routine Time Slot'}
              </h4>
              <button
                onClick={() => {
                  setEditingRoutine(null);
                  setIsAddingRoutine(false);
                }}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRoutine} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Time Slot *</label>
                  <input
                    type="text"
                    required
                    value={routineForm.timeSlot || ''}
                    onChange={(e) => setRoutineForm({ ...routineForm, timeSlot: e.target.value })}
                    placeholder="09:15 - 10:15 AM"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Days / Schedule</label>
                  <input
                    type="text"
                    value={routineForm.day || 'Monday - Saturday'}
                    onChange={(e) => setRoutineForm({ ...routineForm, day: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              {(['sem1', 'sem2', 'sem3', 'sem4', 'sem5', 'sem6'] as const).map((semKey, idx) => {
                const rawForm = routineForm as any;
                const semData = rawForm[semKey] || {
                  course: rawForm[semKey === 'sem1' ? 'sem1Major' : semKey === 'sem3' ? 'sem3Major' : semKey === 'sem5' ? 'sem5Major' : ''] || '',
                  type: idx % 2 === 0 ? 'Major' : 'Minor'
                };
                const semLabel = `B.Sc. ${idx + 1}${idx === 0 ? 'st' : idx === 1 ? 'nd' : idx === 2 ? 'rd' : 'th'} Semester`;

                return (
                  <div key={semKey} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-slate-800">{semLabel}</label>
                      <select
                        value={semData.type || 'Major'}
                        onChange={(e) => {
                          const val = e.target.value as CourseType;
                          setRoutineForm({
                            ...routineForm,
                            [semKey]: { ...semData, type: val }
                          });
                        }}
                        className="px-2 py-1 bg-white border border-slate-300 rounded font-bold text-[11px] text-blue-900 focus:ring-2 focus:ring-blue-900 outline-none"
                      >
                        <option value="Major">Major</option>
                        <option value="Minor">Minor</option>
                        <option value="Major/Minor">Major/Minor</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      value={semData.course || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setRoutineForm({
                          ...routineForm,
                          [semKey]: { ...semData, course: val }
                        });
                      }}
                      placeholder="Course title, paper code & teacher name"
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 font-medium text-slate-800"
                    />
                  </div>
                );
              })}

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setEditingRoutine(null);
                    setIsAddingRoutine(false);
                  }}
                  className="px-4 py-2 bg-slate-200 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 text-white rounded-lg font-bold"
                >
                  Save Routine Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: RESPOND TO MENTORSHIP GRIEVANCE (ADMIN) */}
      {/* ========================================================================= */}
      {respondingGrievance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h4 className="font-bold text-base text-slate-900">
                Respond to Mentorship Query #{respondingGrievance.refNo}
              </h4>
              <button
                onClick={() => setRespondingGrievance(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1">
              <p><strong>Student:</strong> {respondingGrievance.studentName} ({respondingGrievance.rollNo})</p>
              <p><strong>Program & Sem:</strong> {respondingGrievance.semester} • {respondingGrievance.course}</p>
              <p className="pt-1 text-slate-700 italic">"{respondingGrievance.message}"</p>
            </div>

            <form onSubmit={handleSaveGrievanceReply} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={grievanceStatus}
                  onChange={(e) => setGrievanceStatus(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900"
                >
                  <option value="Resolved">Resolved</option>
                  <option value="In Review">In Review</option>
                  <option value="Pending">Pending</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Mentor / HOD Advice & Response *</label>
                <textarea
                  rows={4}
                  required
                  value={grievanceReply}
                  onChange={(e) => setGrievanceReply(e.target.value)}
                  placeholder="Provide instructions, meeting time, lab access approval, or academic guidance..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setRespondingGrievance(null)}
                  className="px-4 py-2 bg-slate-200 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 text-white rounded-lg font-bold"
                >
                  Send Advisory Response
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
