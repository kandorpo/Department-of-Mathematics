import React, { useState, useMemo, useRef } from 'react';
import {
  Users,
  Search,
  Plus,
  Edit3,
  Trash2,
  Filter,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  BookOpen,
  Hash,
  Mail,
  Phone,
  UserCheck,
  ShieldAlert,
  Download,
  Upload,
  RefreshCw,
  Sparkles,
  Layers,
  X,
  Save,
  Check,
  AlertTriangle,
  FileSpreadsheet,
  CheckSquare,
  Square,
  SlidersHorizontal,
  Calendar,
  User,
  HeartPulse,
  MapPin,
  FileText,
  Building,
  Eye,
  Settings2
} from 'lucide-react';
import { DepartmentStudent, FacultyMember } from '../types';

interface AdminStudentsSectionProps {
  students: DepartmentStudent[];
  faculty: FacultyMember[];
  onAddStudent: (student: DepartmentStudent) => void;
  onUpdateStudent: (student: DepartmentStudent) => void;
  onDeleteStudent: (id: string) => void;
  onBulkImport: (students: DepartmentStudent[]) => void;
  showStatus: (msg: string) => void;
}

export const PRESET_SELECTIVE_COURSES = [
  'Mathematical Physics & Dynamical Systems',
  'Number Theory & Cryptography',
  'Fluid Dynamics & Continuum Mechanics',
  'Operations Research & Optimization Techniques',
  'Statistical Modeling & Data Analytics (Minor)',
  'Computer Programming in C/Python (SEC)',
  'Advanced Topology & Functional Analysis (PG)',
  'Algebra & Coordinate Geometry (Minor)',
  'MAT-MAJ-101: Calculus & Analytical Geometry',
  'MAT-MAJ-201: Real Analysis & Linear Algebra',
  'MAT-MIN-101: Principles of Mathematics & Elementary Calculus',
  'MAT-MIN-201: Differential Equations & Linear Algebra',
  'MAT-MIN-301: Probability, Statistics & Vector Analysis',
  'MAT-SEC-301: Scientific Computing with Python & LaTeX',
  'MAT-MSC-101: Advanced Topology & Functional Analysis',
  'MAT-MAJ-401: Differential Geometry & Tensor Calculus'
];

export const PRESET_PROGRAMS: DepartmentStudent['courseProgram'][] = [
  'B.Sc. Mathematics (Honours/Major)',
  'B.Sc. Mathematics (Minor)',
  'M.Sc. Mathematics',
  'FYUGP Mathematics (Major)',
  'FYUGP Mathematics (Minor)',
  'Skill Enhancement (SEC/VAC)',
  'Value Added & SEC Computing'
];

export const PRESET_SEMESTERS = [
  '1st Semester',
  '2nd Semester',
  '3rd Semester',
  '4th Semester',
  '5th Semester',
  '6th Semester',
  '7th Semester',
  '8th Semester',
  'B.Sc. 1st Semester (Major)',
  'B.Sc. 1st Semester (Minor)',
  'B.Sc. 3rd Semester (Major)',
  'B.Sc. 3rd Semester (Minor)',
  'B.Sc. 5th Semester (Major)',
  'B.Sc. 5th Semester (Minor)',
  'M.Sc. 1st Semester',
  'M.Sc. 2nd Semester',
  'M.Sc. 3rd Semester',
  'M.Sc. 4th Semester',
  'Graduated (Alumni)'
];

export const PRESET_CLASSES = [
  'B.Sc. 1st Year',
  'B.Sc. 2nd Year',
  'B.Sc. 3rd Year',
  'B.Sc. 4th Year (FYUGP)',
  'M.Sc. 1st Year',
  'M.Sc. 2nd Year',
  'Section A (Morning)',
  'Section B (Day)',
  'Room 101 Honours Lab',
  'Room 104 Computing Lab'
];

export const PRESET_STATUSES: DepartmentStudent['status'][] = [
  'Active',
  'Enrolled',
  'Alumni',
  'Graduated',
  'Transferred',
  'Suspended'
];

export const AdminStudentsSection: React.FC<AdminStudentsSectionProps> = ({
  students,
  faculty,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
  onBulkImport,
  showStatus
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProgram, setSelectedProgram] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grouped' | 'table'>('grouped');

  // Selected Student IDs for Batch Operations
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Bulk Edit Modal State
  const [isBulkEditOpen, setIsBulkEditOpen] = useState(false);
  const [bulkField, setBulkField] = useState<'semester' | 'courseProgram' | 'selectiveCourse' | 'classSection' | 'mentorName' | 'status' | 'batch'>('semester');
  const [bulkValue, setBulkValue] = useState('');

  // Bulk CSV Import Modal
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [csvImportError, setCsvImportError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal State for Add / Edit Single Student
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<DepartmentStudent | null>(null);

  // Form State - Full comprehensive properties editable
  const [formFullName, setFormFullName] = useState('');
  const [formRollNo, setFormRollNo] = useState('');
  const [formClassSection, setFormClassSection] = useState('');
  const [formGuRegNo, setFormGuRegNo] = useState('');
  const [formCourseProgram, setFormCourseProgram] = useState<DepartmentStudent['courseProgram']>('B.Sc. Mathematics (Honours/Major)');
  const [formSemester, setFormSemester] = useState('1st Semester');
  const [formCustomSemester, setFormCustomSemester] = useState('');
  const [formBatch, setFormBatch] = useState('2024 - 2028');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMentorName, setFormMentorName] = useState(faculty[0]?.name || 'Dr. Bidyut Kalita (HOD)');
  const [formCgpa, setFormCgpa] = useState('8.50');
  const [formStatus, setFormStatus] = useState<DepartmentStudent['status']>('Active');
  const [formAdmissionYear, setFormAdmissionYear] = useState('2024');
  const [formDob, setFormDob] = useState('');
  const [formFatherName, setFormFatherName] = useState('');
  const [formBloodGroup, setFormBloodGroup] = useState('O+');
  const [formAddress, setFormAddress] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formError, setFormError] = useState('');

  // Quick Inline Editing State in Table View
  const [inlineEditingId, setInlineEditingId] = useState<string | null>(null);
  const [inlineData, setInlineData] = useState<Partial<DepartmentStudent>>({});

  // Simulator / Test Verification Tool state
  const [testName, setTestName] = useState('');
  const [testRoll, setTestRoll] = useState('');
  const [testCourse, setTestCourse] = useState('B.Sc. Mathematics (Honours/Major)');
  const [testResult, setTestResult] = useState<{ evaluated: boolean; eligible: boolean; message: string; matchedStudent?: DepartmentStudent } | null>(null);

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingStudent(null);
    setFormFullName('');
    setFormRollNo('');
    setFormClassSection('B.Sc. 1st Year (Section A)');
    setFormGuRegNo(`GU${Math.floor(24000000 + Math.random() * 999999)}`);
    setFormCourseProgram('B.Sc. Mathematics (Honours/Major)');
    setFormSemester('B.Sc. 1st Semester (Major)');
    setFormCustomSemester('');
    setFormBatch('2024 - 2028');
    setFormEmail('');
    setFormPhone('+91 94350 00000');
    setFormMentorName(faculty[0]?.name || 'Dr. Bidyut Kalita (HOD)');
    setFormCgpa('8.50');
    setFormStatus('Active');
    setFormAdmissionYear('2024');
    setFormDob('2005-06-15');
    setFormFatherName('');
    setFormBloodGroup('O+');
    setFormAddress('Dudhnoi, Goalpara, Assam');
    setFormNotes('Authorized regular department student.');
    setFormError('');
    setIsModalOpen(true);
  };

  // Open Edit Modal with full fields populated
  const handleOpenEdit = (stu: DepartmentStudent) => {
    setEditingStudent(stu);
    setFormFullName(stu.fullName);
    setFormRollNo(stu.rollNo);
    setFormClassSection(stu.classSection || 'B.Sc. Mathematics Class');
    setFormGuRegNo(stu.guRegNo || '');
    setFormCourseProgram(stu.courseProgram);

    if (PRESET_SEMESTERS.includes(stu.semester)) {
      setFormSemester(stu.semester);
      setFormCustomSemester('');
    } else {
      setFormSemester('Other');
      setFormCustomSemester(stu.semester);
    }

    setFormBatch(stu.batch);
    setFormEmail(stu.email);
    setFormPhone(stu.phone || '');
    setFormMentorName(stu.mentorName || faculty[0]?.name || 'Dr. Bidyut Kalita (HOD)');
    setFormCgpa(stu.cgpa !== undefined ? stu.cgpa.toString() : '8.50');
    setFormStatus(stu.status || 'Active');
    setFormAdmissionYear(stu.admissionYear || '2024');
    setFormDob(stu.dob || '');
    setFormFatherName(stu.fatherName || '');
    setFormBloodGroup(stu.bloodGroup || 'O+');
    setFormAddress(stu.address || '');
    setFormNotes(stu.notes || '');
    setFormError('');
    setIsModalOpen(true);
  };

  // Save Single Student (Add or Edit)
  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formFullName.trim() || !formRollNo.trim()) {
      setFormError('Please fill in student name and roll number.');
      return;
    }

    const finalSemester =
      formSemester === 'Other' && formCustomSemester.trim()
        ? formCustomSemester.trim()
        : formSemester;

    // Check duplicate roll number in other students
    const duplicate = students.find(
      (s) =>
        s.rollNo.toLowerCase() === formRollNo.trim().toLowerCase() &&
        (!editingStudent || s.id !== editingStudent.id)
    );

    if (duplicate) {
      setFormError(`A student with Roll No "${formRollNo.trim()}" already exists (${duplicate.fullName}).`);
      return;
    }

    const studentData: DepartmentStudent = {
      id: editingStudent ? editingStudent.id : `dept-stu-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      fullName: formFullName.trim(),
      rollNo: formRollNo.trim(),
      classSection: undefined,
      guRegNo: formGuRegNo.trim() || undefined,
      courseProgram: formCourseProgram,
      selectiveCourse: 'Not Applicable',
      semester: finalSemester,
      batch: undefined,
      email: undefined,
      phone: formPhone.trim() || undefined,
      mentorName: undefined,
      cgpa: formCgpa ? parseFloat(formCgpa) : undefined,
      status: formStatus,
      admissionYear: formAdmissionYear.trim() || undefined,
      dob: undefined,
      fatherName: undefined,
      bloodGroup: undefined,
      address: undefined,
      notes: undefined
    };

    if (editingStudent) {
      onUpdateStudent(studentData);
      showStatus(`Student "${studentData.fullName}" (Roll: ${studentData.rollNo}) updated successfully.`);
    } else {
      onAddStudent(studentData);
      showStatus(`Student "${studentData.fullName}" added to authorized department roster.`);
    }

    setIsModalOpen(false);
  };

  // Inline table edit start
  const handleStartInlineEdit = (stu: DepartmentStudent) => {
    setInlineEditingId(stu.id);
    setInlineData({ ...stu });
  };

  // Inline table edit save
  const handleSaveInlineEdit = () => {
    if (!inlineEditingId || !inlineData.fullName || !inlineData.rollNo) return;
    const existing = students.find((s) => s.id === inlineEditingId);
    if (!existing) return;

    const updated: DepartmentStudent = {
      ...existing,
      ...inlineData
    } as DepartmentStudent;

    onUpdateStudent(updated);
    setInlineEditingId(null);
    setInlineData({});
    showStatus(`Quick edit saved for "${updated.fullName}".`);
  };

  // Inline table edit cancel
  const handleCancelInlineEdit = () => {
    setInlineEditingId(null);
    setInlineData({});
  };

  // Selection toggle
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredStudents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredStudents.map((s) => s.id));
    }
  };

  const toggleSelectStudent = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Bulk Delete
  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (
      confirm(
        `Are you sure you want to delete ${selectedIds.length} student record(s) from the official department database?`
      )
    ) {
      selectedIds.forEach((id) => onDeleteStudent(id));
      showStatus(`Removed ${selectedIds.length} student(s) from roster.`);
      setSelectedIds([]);
    }
  };

  // Bulk Update
  const handleApplyBulkEdit = () => {
    if (selectedIds.length === 0 || !bulkValue.trim()) return;

    selectedIds.forEach((id) => {
      const student = students.find((s) => s.id === id);
      if (student) {
        const updated: DepartmentStudent = {
          ...student,
          [bulkField]: bulkField === 'cgpa' ? parseFloat(bulkValue) || student.cgpa : bulkValue.trim()
        };
        onUpdateStudent(updated);
      }
    });

    showStatus(`Bulk updated ${selectedIds.length} student(s) ${bulkField} to "${bulkValue}".`);
    setIsBulkEditOpen(false);
    setBulkValue('');
  };

  // CSV Import handler
  const handleProcessCsvImport = () => {
    setCsvImportError('');
    if (!csvText.trim()) {
      setCsvImportError('Please paste valid CSV content or upload a CSV file.');
      return;
    }

    try {
      const lines = csvText.trim().split('\n');
      if (lines.length < 2) {
        setCsvImportError('CSV must have a header row and at least 1 student data row.');
        return;
      }

      const imported: DepartmentStudent[] = [];
      const dataRows = lines.slice(1);

      dataRows.forEach((row, idx) => {
        if (!row.trim()) return;
        // Basic regex to split CSV by commas while honoring quotes
        const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map((val) => val.trim().replace(/^"|"$/g, ''));

        const rollNo = cols[0] || `US-241-102-${String(100 + idx).padStart(4, '0')}`;
        const fullName = cols[1] || `Imported Student ${idx + 1}`;
        const guRegNo = cols[2] || undefined;
        const courseProgram = (cols[3] as any) || 'B.Sc. Mathematics (Honours/Major)';
        const selectiveCourse = cols[4] || PRESET_SELECTIVE_COURSES[0];
        const semester = cols[5] || '1st Semester';
        const batch = cols[6] || '2024 - 2028';
        const email = cols[7] || `student${idx + 1}@student.dudhnoicollege.ac.in`;
        const phone = cols[8] || undefined;
        const mentorName = cols[9] || faculty[0]?.name || 'Dr. Bidyut Kalita (HOD)';
        const cgpa = cols[10] ? parseFloat(cols[10]) : undefined;
        const status = (cols[11] as any) || 'Active';
        const classSection = cols[12] || 'B.Sc. Mathematics Class';

        imported.push({
          id: `dept-stu-import-${Date.now()}-${idx}-${Math.floor(Math.random() * 1000)}`,
          fullName,
          rollNo,
          classSection,
          guRegNo,
          courseProgram,
          selectiveCourse,
          semester,
          batch,
          email,
          phone,
          mentorName,
          cgpa,
          status
        });
      });

      if (imported.length === 0) {
        setCsvImportError('No valid rows found to import.');
        return;
      }

      onBulkImport(imported);
      showStatus(`Successfully imported ${imported.length} students into the department roster.`);
      setIsImportModalOpen(false);
      setCsvText('');
    } catch (err: any) {
      setCsvImportError(`Failed to parse CSV: ${err?.message || 'Check CSV formatting'}`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setCsvText(content);
      }
    };
    reader.readAsText(file);
  };

  // Unique list of all selective courses present in data + presets
  const allSelectiveCourses = useMemo(() => {
    const set = new Set<string>();
    PRESET_SELECTIVE_COURSES.forEach((c) => set.add(c));
    students.forEach((s) => {
      if (s.selectiveCourse) set.add(s.selectiveCourse);
    });
    return Array.from(set);
  }, [students]);

  // Grouped students by selective course
  const groupedBySelective = useMemo(() => {
    const map: Record<string, DepartmentStudent[]> = {};

    allSelectiveCourses.forEach((c) => {
      map[c] = [];
    });

    students.forEach((s) => {
      const cat = s.selectiveCourse || 'Unassigned';
      if (!map[cat]) map[cat] = [];
      map[cat].push(s);
    });

    return map;
  }, [students, allSelectiveCourses]);

  // Filtered students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        s.fullName.toLowerCase().includes(q) ||
        s.rollNo.toLowerCase().includes(q) ||
        (s.classSection && s.classSection.toLowerCase().includes(q)) ||
        (s.guRegNo && s.guRegNo.toLowerCase().includes(q)) ||
        s.email.toLowerCase().includes(q) ||
        s.selectiveCourse.toLowerCase().includes(q) ||
        s.semester.toLowerCase().includes(q) ||
        (s.phone && s.phone.toLowerCase().includes(q)) ||
        (s.mentorName && s.mentorName.toLowerCase().includes(q));

      const matchesCat = selectedCategory === 'all' || s.selectiveCourse === selectedCategory;
      const matchesProgram = selectedProgram === 'all' || s.courseProgram === selectedProgram;
      const matchesSemester = selectedSemester === 'all' || s.semester === selectedSemester;
      const matchesStatus = selectedStatusFilter === 'all' || s.status === selectedStatusFilter;

      return matchesSearch && matchesCat && matchesProgram && matchesSemester && matchesStatus;
    });
  }, [students, searchQuery, selectedCategory, selectedProgram, selectedSemester, selectedStatusFilter]);

  // Test registration verification simulator
  const handleRunVerificationTest = (e: React.FormEvent) => {
    e.preventDefault();
    const qName = testName.trim().toLowerCase().replace(/\s+/g, ' ');
    const qRoll = testRoll.trim().toLowerCase().replace(/[^a-z0-9]/g, '');

    if (!qName && !qRoll) {
      setTestResult({
        evaluated: true,
        eligible: false,
        message: 'Please provide at least a Name or Roll Number to simulate registration verification.'
      });
      return;
    }

    const matched = students.find((s) => {
      const sRollClean = s.rollNo.toLowerCase().replace(/[^a-z0-9]/g, '');
      const sGuClean = s.guRegNo ? s.guRegNo.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
      const sNameClean = s.fullName.toLowerCase().replace(/\s+/g, ' ');

      const rollMatch = qRoll && (sRollClean === qRoll || sGuClean === qRoll);
      const nameMatch = qName && (sNameClean === qName || sNameClean.includes(qName) || qName.includes(sNameClean));

      return rollMatch || (nameMatch && (sRollClean.includes(qRoll) || qRoll.includes(sRollClean)));
    });

    if (!matched) {
      setTestResult({
        evaluated: true,
        eligible: false,
        message: `YOU ARE NOT A STUDENT OF OUR DEPARTMENT: No authorized student admission record matches "${testName}" with Roll "${testRoll || 'N/A'}" in the Department of Mathematics roster.`
      });
      return;
    }

    // Check course
    const sProgClean = matched.courseProgram.toLowerCase();
    const tProgClean = testCourse.toLowerCase();

    const isMajor = tProgClean.includes('major') || tProgClean.includes('honours');
    const isMinor = tProgClean.includes('minor');
    const isMsc = tProgClean.includes('m.sc') || tProgClean.includes('msc');

    const studentIsMajor = sProgClean.includes('major') || sProgClean.includes('honours');
    const studentIsMinor = sProgClean.includes('minor');
    const studentIsMsc = sProgClean.includes('m.sc') || sProgClean.includes('msc');

    const courseMatched =
      sProgClean === tProgClean ||
      (isMajor && studentIsMajor) ||
      (isMinor && studentIsMinor) ||
      (isMsc && studentIsMsc) ||
      sProgClean.includes(tProgClean) ||
      tProgClean.includes(sProgClean);

    if (!courseMatched) {
      setTestResult({
        evaluated: true,
        eligible: false,
        matchedStudent: matched,
        message: `YOU ARE NOT A STUDENT OF OUR DEPARTMENT: Selected course "${testCourse}" does not match your officially assigned department curriculum "${matched.courseProgram}" (${matched.selectiveCourse}).`
      });
      return;
    }

    setTestResult({
      evaluated: true,
      eligible: true,
      matchedStudent: matched,
      message: `ELIGIBLE FOR REGISTRATION: Validated against Department Roster as "${matched.fullName}" (${matched.rollNo}), enrolled in ${matched.courseProgram} - Class: ${matched.classSection || 'N/A'} - Selective: ${matched.selectiveCourse}.`
    });
  };

  // Export Roster as CSV
  const handleExportCsv = () => {
    const headers = [
      'Roll No',
      'Full Name',
      'Class/Section',
      'GU Reg No',
      'Course Program',
      'Selective Course Track',
      'Semester',
      'Batch',
      'Email',
      'Phone',
      'Mentor',
      'CGPA',
      'Status',
      'Admission Year',
      'Father Name',
      'Blood Group',
      'Address',
      'Notes'
    ];
    const rows = students.map((s) => [
      `"${s.rollNo}"`,
      `"${s.fullName}"`,
      `"${s.classSection || ''}"`,
      `"${s.guRegNo || ''}"`,
      `"${s.courseProgram}"`,
      `"${s.selectiveCourse}"`,
      `"${s.semester}"`,
      `"${s.batch}"`,
      `"${s.email}"`,
      `"${s.phone || ''}"`,
      `"${s.mentorName || ''}"`,
      `"${s.cgpa || ''}"`,
      `"${s.status}"`,
      `"${s.admissionYear || ''}"`,
      `"${s.fatherName || ''}"`,
      `"${s.bloodGroup || ''}"`,
      `"${s.address || ''}"`,
      `"${s.notes || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Dudhnoi_Math_Student_Master_Roster_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showStatus('Student master list exported as CSV successfully.');
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Stats Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-2xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950">
                Department Master Student CMS
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-800 text-blue-200 border border-blue-700">
                Full Admin Edit Access Enabled
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
              Student Directory & Course-Track Manager
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Full administrative control over all student attributes: Name, Roll Number, Class/Section, Degree Program, Selective Course Track, Semester, Mentor, Contact, and Status.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleOpenAdd}
              className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 text-xs cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Department Student</span>
            </button>

            <button
              onClick={() => setIsImportModalOpen(true)}
              className="px-3 py-2 bg-blue-800/90 hover:bg-blue-700 text-white font-semibold rounded-xl border border-blue-600/60 transition-colors flex items-center gap-1.5 text-xs cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import CSV</span>
            </button>

            <button
              onClick={handleExportCsv}
              className="px-3 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 text-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 mt-4 border-t border-white/10 text-xs">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-300 block">Total Department Students</span>
            <span className="text-xl font-bold text-amber-300">{students.length}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-300 block">Selective Course Tracks</span>
            <span className="text-xl font-bold text-white">{allSelectiveCourses.length} Tracks</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-300 block">Major / Honours Enrolled</span>
            <span className="text-xl font-bold text-emerald-400">
              {students.filter((s) => s.courseProgram.includes('Major') || s.courseProgram.includes('Honours')).length}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-300 block">Minor / PG / SEC Students</span>
            <span className="text-xl font-bold text-sky-400">
              {students.filter((s) => !s.courseProgram.includes('Major') && !s.courseProgram.includes('Honours')).length}
            </span>
          </div>
        </div>
      </div>

      {/* Verification Rule Alert Box */}
      <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200/90 text-amber-950 flex flex-col sm:flex-row items-start gap-3 text-xs shadow-2xs">
        <div className="p-2 bg-amber-500 text-white rounded-lg shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-900 text-sm">Automated Registration Gatekeeping Active</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-200/80 text-amber-900 border border-amber-300">
              Mandate Enforced
            </span>
          </div>
          <p className="text-amber-800 leading-relaxed">
            When any student attempts to register on the Student Portal, the system validates their <strong>Full Name</strong>, <strong>Roll Number</strong>, and <strong>Enrolled Course</strong> against this official database. If the details do not match or the student is not in this roster, registration is blocked with the alert popup: <strong>"YOU ARE NOT A STUDENT OF OUR DEPARTMENT"</strong>.
          </p>
        </div>
      </div>

      {/* Interactive Registration Test Simulator */}
      <div className="p-4.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 text-blue-900 rounded-lg">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Student Portal Registration Validator & Simulator</h4>
              <p className="text-[11px] text-slate-500">Test how the verification gatekeeper evaluates any student credentials</p>
            </div>
          </div>
          {testResult && (
            <button
              onClick={() => setTestResult(null)}
              className="text-[11px] text-slate-400 hover:text-slate-700 underline cursor-pointer"
            >
              Clear Result
            </button>
          )}
        </div>

        <form onSubmit={handleRunVerificationTest} className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Student Full Name</label>
            <input
              type="text"
              placeholder="e.g. Bhaskar Jyoti Nath"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Class Roll / GU Roll</label>
            <input
              type="text"
              placeholder="e.g. US-241-102-0055"
              value={testRoll}
              onChange={(e) => setTestRoll(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Enrolled Course Selection</label>
            <select
              value={testCourse}
              onChange={(e) => setTestCourse(e.target.value)}
              className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white text-xs"
            >
              {PRESET_PROGRAMS.map((prog) => (
                <option key={prog} value={prog}>
                  {prog}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5 text-xs cursor-pointer h-[34px]"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Simulate Validation</span>
            </button>
          </div>
        </form>

        {testResult && (
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 animate-in fade-in ${
              testResult.eligible
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-red-50 border-red-200 text-red-900'
            }`}
          >
            {testResult.eligible ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <span className="font-bold text-sm block">
                {testResult.eligible ? '✅ Validation Passed: Student Authorized' : '🚫 Registration Blocked: NOT AUTHORIZED'}
              </span>
              <p className="leading-relaxed">{testResult.message}</p>
              {testResult.matchedStudent && (
                <div className="pt-1 text-[11px] text-slate-600 flex flex-wrap gap-x-3">
                  <span>Enrolled: <strong>{testResult.matchedStudent.courseProgram}</strong></span>
                  <span>Class: <strong>{testResult.matchedStudent.classSection || 'General'}</strong></span>
                  <span>Selective: <strong>{testResult.matchedStudent.selectiveCourse}</strong></span>
                  <span>Mentor: <strong>{testResult.matchedStudent.mentorName}</strong></span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Filter and Categorization Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        
        {/* Top Controls: Search, View Mode, Filter Dropdowns */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name, roll no, class, course, GU reg, mentor, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white text-slate-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter by Program */}
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-900 text-slate-700"
            >
              <option value="all">All Programs ({students.length})</option>
              {PRESET_PROGRAMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            {/* Filter by Semester */}
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-900 text-slate-700"
            >
              <option value="all">All Semesters</option>
              {PRESET_SEMESTERS.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>

            {/* Filter by Status */}
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-900 text-slate-700"
            >
              <option value="all">All Statuses</option>
              {PRESET_STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('grouped')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grouped'
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Categorized View
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Table View ({filteredStudents.length})
              </button>
            </div>
          </div>
        </div>

        {/* Selective Course Category Navigation Pills */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <span>Filter By Selective Course Track:</span>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-blue-900 hover:underline cursor-pointer lowercase"
              >
                Reset to all tracks
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto py-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-blue-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Tracks ({students.length})
            </button>

            {allSelectiveCourses.map((cat) => {
              const count = students.filter((s) => s.selectiveCourse === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span className="truncate max-w-[220px]">{cat}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${selectedCategory === cat ? 'bg-slate-950 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Batch Operation Bar (When items are selected) */}
        {selectedIds.length > 0 && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs animate-in fade-in">
            <div className="flex items-center gap-2 font-bold text-blue-950">
              <CheckSquare className="w-4 h-4 text-blue-700" />
              <span>{selectedIds.length} Student(s) Selected</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsBulkEditOpen(true)}
                className="px-3 py-1.5 bg-blue-900 hover:bg-blue-950 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Bulk Edit Selected</span>
              </button>

              <button
                onClick={handleBulkDelete}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Selected</span>
              </button>

              <button
                onClick={() => setSelectedIds([])}
                className="px-2.5 py-1.5 text-slate-600 hover:text-slate-900 underline cursor-pointer"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>

      {/* VIEW MODE 1: CATEGORIZED / GROUPED VIEW */}
      {viewMode === 'grouped' && (
        <div className="space-y-6">
          {(Object.entries(groupedBySelective) as [string, DepartmentStudent[]][])
            .filter(([catName, list]) => {
              if (selectedCategory !== 'all' && catName !== selectedCategory) return false;
              if (list.length === 0 && selectedCategory !== catName) return false;
              return true;
            })
            .map(([catName, list]) => {
              const displayed = list.filter((s) => {
                const q = searchQuery.toLowerCase().trim();
                const matchesSearch =
                  !q ||
                  s.fullName.toLowerCase().includes(q) ||
                  s.rollNo.toLowerCase().includes(q) ||
                  (s.classSection && s.classSection.toLowerCase().includes(q)) ||
                  (s.guRegNo && s.guRegNo.toLowerCase().includes(q)) ||
                  s.email.toLowerCase().includes(q) ||
                  s.semester.toLowerCase().includes(q);

                const matchesProgram = selectedProgram === 'all' || s.courseProgram === selectedProgram;
                const matchesSemester = selectedSemester === 'all' || s.semester === selectedSemester;
                const matchesStatus = selectedStatusFilter === 'all' || s.status === selectedStatusFilter;

                return matchesSearch && matchesProgram && matchesSemester && matchesStatus;
              });

              if (displayed.length === 0 && searchQuery) return null;

              return (
                <div
                  key={catName}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden"
                >
                  {/* Category Header */}
                  <div className="bg-slate-50/90 border-b border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-900 text-amber-300 rounded-xl">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-100/80 px-2 py-0.5 rounded">
                            Selective / Elective Track
                          </span>
                          <span className="text-xs font-bold text-slate-500">
                            {displayed.length} Enrolled Student{displayed.length === 1 ? '' : 's'}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 font-heading">
                          {catName}
                        </h4>
                      </div>
                    </div>

                  </div>

                  {/* Student Cards in Category */}
                  {displayed.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-xs">
                      No students found matching your filters in this selective track.
                    </div>
                  ) : (
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {displayed.map((stu) => {
                        const isSelected = selectedIds.includes(stu.id);
                        return (
                          <div
                            key={stu.id}
                            className={`p-3.5 rounded-xl border transition-all bg-white flex flex-col justify-between space-y-3 group ${
                              isSelected ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/20' : 'border-slate-200 hover:border-blue-300 hover:shadow-xs'
                            }`}
                          >
                            <div className="space-y-2">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-start gap-2">
                                  <button
                                    onClick={() => toggleSelectStudent(stu.id)}
                                    className="mt-0.5 text-slate-400 hover:text-blue-900 cursor-pointer"
                                  >
                                    {isSelected ? (
                                      <CheckSquare className="w-4 h-4 text-blue-900" />
                                    ) : (
                                      <Square className="w-4 h-4 text-slate-300" />
                                    )}
                                  </button>
                                  <div>
                                    <h5 className="font-bold text-slate-900 text-xs group-hover:text-blue-900 transition-colors">
                                      {stu.fullName}
                                    </h5>
                                    <p className="text-[11px] font-mono text-slate-500 font-medium">
                                      Roll: <strong className="text-blue-900">{stu.rollNo}</strong>
                                    </p>
                                  </div>
                                </div>
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    stu.status === 'Active'
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                      : stu.status === 'Alumni' || stu.status === 'Graduated'
                                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                      : 'bg-slate-100 text-slate-600'
                                  }`}
                                >
                                  {stu.status}
                                </span>
                              </div>

                              <div className="space-y-1 text-[11px] text-slate-600">
                                <p className="text-slate-800 font-medium truncate">
                                  🎓 {stu.courseProgram}
                                </p>
                                {stu.classSection && (
                                  <p className="text-slate-700 font-semibold text-[11px] flex items-center gap-1">
                                    <Building className="w-3 h-3 text-slate-400" />
                                    <span>Class: {stu.classSection}</span>
                                  </p>
                                )}
                                <p className="text-slate-500 flex items-center justify-between">
                                  <span>{stu.semester} ({stu.batch})</span>
                                  {stu.cgpa !== undefined && (
                                    <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                                      CGPA: {stu.cgpa.toFixed(2)}
                                    </span>
                                  )}
                                </p>
                                {stu.guRegNo && (
                                  <p className="text-slate-500 text-[10px] font-mono">
                                    GU Reg: {stu.guRegNo}
                                  </p>
                                )}
                                <p className="text-slate-500 truncate">
                                  ✉️ {stu.email}
                                </p>
                                {stu.phone && (
                                  <p className="text-slate-500 text-[10px]">
                                    📞 {stu.phone}
                                  </p>
                                )}
                                {stu.mentorName && (
                                  <p className="text-blue-900 font-medium text-[10px] pt-1 border-t border-slate-100">
                                    Mentor: {stu.mentorName}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Card Action Buttons - Full Edit Access */}
                            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                              <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                                <UserCheck className="w-3 h-3 text-emerald-600" />
                                <span>Verified Eligible</span>
                              </span>

                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => handleOpenEdit(stu)}
                                  className="px-2 py-1 text-blue-900 bg-blue-50 hover:bg-blue-100 font-bold rounded-md transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                                  title="Edit full student record (name, roll, class, course, etc.)"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`Remove "${stu.fullName}" (Roll: ${stu.rollNo}) from the official department roster? They will no longer be able to register in the Student Portal.`)) {
                                      onDeleteStudent(stu.id);
                                      showStatus(`Student "${stu.fullName}" removed from roster.`);
                                    }
                                  }}
                                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                                  title="Delete student record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}

      {/* VIEW MODE 2: TABLE VIEW WITH QUICK INLINE EDIT & BATCH SELECT */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                  <th className="py-3 px-3 w-10 text-center">
                    <button
                      onClick={toggleSelectAll}
                      className="text-slate-400 hover:text-blue-900 cursor-pointer"
                      title="Select all filtered students"
                    >
                      {selectedIds.length > 0 && selectedIds.length === filteredStudents.length ? (
                        <CheckSquare className="w-4 h-4 text-blue-900 mx-auto" />
                      ) : (
                        <Square className="w-4 h-4 mx-auto" />
                      )}
                    </button>
                  </th>
                  <th className="py-3 px-4">Student & Contact Details</th>
                  <th className="py-3 px-4">Roll No & Class / Section</th>
                  <th className="py-3 px-4">Program & Semester</th>
                  <th className="py-3 px-4">Selective Course Track</th>
                  <th className="py-3 px-4">Assigned Mentor</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-400">
                      No students found matching current filter parameters.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((stu) => {
                    const isSelected = selectedIds.includes(stu.id);
                    const isInline = inlineEditingId === stu.id;

                    if (isInline) {
                      return (
                        <tr key={stu.id} className="bg-amber-50/70 border-2 border-amber-300">
                          <td className="py-3 px-3 text-center">
                            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                          </td>
                          <td className="py-3 px-4 space-y-1.5">
                            <input
                              type="text"
                              value={inlineData.fullName || ''}
                              onChange={(e) => setInlineData({ ...inlineData, fullName: e.target.value })}
                              placeholder="Full Name"
                              className="w-full px-2 py-1 bg-white border border-amber-300 rounded font-bold text-xs"
                            />
                            <input
                              type="email"
                              value={inlineData.email || ''}
                              onChange={(e) => setInlineData({ ...inlineData, email: e.target.value })}
                              placeholder="Email"
                              className="w-full px-2 py-1 bg-white border border-amber-300 rounded text-[11px]"
                            />
                            <input
                              type="text"
                              value={inlineData.phone || ''}
                              onChange={(e) => setInlineData({ ...inlineData, phone: e.target.value })}
                              placeholder="Phone"
                              className="w-full px-2 py-1 bg-white border border-amber-300 rounded text-[10px]"
                            />
                          </td>
                          <td className="py-3 px-4 space-y-1.5">
                            <input
                              type="text"
                              value={inlineData.rollNo || ''}
                              onChange={(e) => setInlineData({ ...inlineData, rollNo: e.target.value })}
                              placeholder="Roll No"
                              className="w-full px-2 py-1 bg-white border border-amber-300 rounded font-mono font-bold text-xs"
                            />
                            <input
                              type="text"
                              value={inlineData.classSection || ''}
                              onChange={(e) => setInlineData({ ...inlineData, classSection: e.target.value })}
                              placeholder="Class / Section"
                              className="w-full px-2 py-1 bg-white border border-amber-300 rounded text-[11px]"
                            />
                            <input
                              type="text"
                              value={inlineData.guRegNo || ''}
                              onChange={(e) => setInlineData({ ...inlineData, guRegNo: e.target.value })}
                              placeholder="GU Reg No"
                              className="w-full px-2 py-1 bg-white border border-amber-300 rounded text-[10px] font-mono"
                            />
                          </td>
                          <td className="py-3 px-4 space-y-1.5">
                            <select
                              value={inlineData.courseProgram || stu.courseProgram}
                              onChange={(e) => setInlineData({ ...inlineData, courseProgram: e.target.value as any })}
                              className="w-full px-2 py-1 bg-white border border-amber-300 rounded text-[11px]"
                            >
                              {PRESET_PROGRAMS.map((p) => (
                                <option key={p} value={p}>
                                  {p}
                                </option>
                              ))}
                            </select>
                            <select
                              value={inlineData.semester || stu.semester}
                              onChange={(e) => setInlineData({ ...inlineData, semester: e.target.value })}
                              className="w-full px-2 py-1 bg-white border border-amber-300 rounded text-[11px]"
                            >
                              {PRESET_SEMESTERS.map((sem) => (
                                <option key={sem} value={sem}>
                                  {sem}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3 px-4 space-y-1.5">
                            <input
                              type="text"
                              value={inlineData.selectiveCourse || ''}
                              onChange={(e) => setInlineData({ ...inlineData, selectiveCourse: e.target.value })}
                              placeholder="Selective Course Track"
                              className="w-full px-2 py-1 bg-white border border-amber-300 rounded text-[11px]"
                            />
                            <div className="flex items-center gap-1 text-[11px]">
                              <span>CGPA:</span>
                              <input
                                type="number"
                                step="0.01"
                                value={inlineData.cgpa || ''}
                                onChange={(e) => setInlineData({ ...inlineData, cgpa: parseFloat(e.target.value) || undefined })}
                                className="w-16 px-1.5 py-0.5 bg-white border border-amber-300 rounded text-[11px]"
                              />
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={inlineData.mentorName || stu.mentorName}
                              onChange={(e) => setInlineData({ ...inlineData, mentorName: e.target.value })}
                              className="w-full px-2 py-1 bg-white border border-amber-300 rounded text-[11px]"
                            >
                              {faculty.map((f) => (
                                <option key={f.id} value={f.name}>
                                  {f.name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={inlineData.status || stu.status}
                              onChange={(e) => setInlineData({ ...inlineData, status: e.target.value as any })}
                              className="w-full px-2 py-1 bg-white border border-amber-300 rounded text-[11px]"
                            >
                              {PRESET_STATUSES.map((st) => (
                                <option key={st} value={st}>
                                  {st}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                            <button
                              onClick={handleSaveInlineEdit}
                              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-[11px] cursor-pointer"
                              title="Save Quick Edit"
                            >
                              <Check className="w-3.5 h-3.5 inline mr-0.5" /> Save
                            </button>
                            <button
                              onClick={handleCancelInlineEdit}
                              className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded font-bold text-[11px] cursor-pointer"
                              title="Cancel"
                            >
                              ✕
                            </button>
                          </td>
                        </tr>
                      );
                    }

                    return (
                      <tr
                        key={stu.id}
                        className={`hover:bg-slate-50/80 transition-colors ${
                          isSelected ? 'bg-blue-50/30' : ''
                        }`}
                      >
                        <td className="py-3 px-3 text-center">
                          <button
                            onClick={() => toggleSelectStudent(stu.id)}
                            className="text-slate-400 hover:text-blue-900 cursor-pointer"
                          >
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-blue-900 mx-auto" />
                            ) : (
                              <Square className="w-4 h-4 mx-auto text-slate-300" />
                            )}
                          </button>
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{stu.fullName}</div>
                          <div className="text-[11px] text-slate-500">{stu.email}</div>
                          {stu.phone && <div className="text-[10px] text-slate-400">📞 {stu.phone}</div>}
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            {stu.rollNo}
                          </span>
                          {stu.classSection && (
                            <div className="text-[11px] font-semibold text-slate-700 mt-0.5">
                              {stu.classSection}
                            </div>
                          )}
                          {stu.guRegNo && (
                            <div className="text-[10px] font-mono text-slate-500">
                              GU: {stu.guRegNo}
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-800">{stu.courseProgram}</div>
                          <div className="text-[11px] text-slate-500">{stu.semester} • {stu.batch}</div>
                        </td>

                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200 inline-block max-w-xs truncate">
                            {stu.selectiveCourse}
                          </span>
                          {stu.cgpa !== undefined && (
                            <div className="text-[10px] font-bold text-amber-800 mt-1">
                              CGPA: {stu.cgpa.toFixed(2)}
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-4 text-slate-700">
                          {stu.mentorName || '—'}
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              stu.status === 'Active'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : stu.status === 'Alumni' || stu.status === 'Graduated'
                                ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {stu.status}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex items-center gap-1">
                            <button
                              onClick={() => handleStartInlineEdit(stu)}
                              className="p-1.5 text-amber-700 hover:text-amber-900 hover:bg-amber-50 rounded-md transition-colors cursor-pointer"
                              title="Quick inline edit row"
                            >
                              <Settings2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleOpenEdit(stu)}
                              className="p-1.5 text-slate-500 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                              title="Full edit modal (Name, Roll, Class, Course, etc.)"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('Delete button clicked for student ID:', stu.id);
                                  onDeleteStudent(stu.id);
                                  showStatus(`Student "${stu.fullName}" removed.`);
                              }}
                              className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer pointer-events-auto"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FULL STUDENT EDIT / ADD MODAL POPUP (Admin Full Access) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-5 sm:p-6 space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-900 text-amber-300 rounded-xl">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    {editingStudent ? 'Edit Student Details (Full Access)' : 'Add New Department Student'}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {editingStudent
                      ? `Update all academic, roll, class, and curriculum properties for ${editingStudent.fullName}`
                      : 'Enroll student into department database for portal authorization'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Comprehensive Student Form */}
            <form onSubmit={handleSaveStudent} className="space-y-4 text-xs">
              
              {/* SECTION 1: PRIMARY IDENTITY & ROLL */}
              <div className="space-y-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-blue-900" />
                  <span>Student Identity & Identification</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Manash Jyoti Ray"
                      value={formFullName}
                      onChange={(e) => setFormFullName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Class Roll Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. US-241-102-0089"
                      value={formRollNo}
                      onChange={(e) => setFormRollNo(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 text-xs font-mono font-bold text-blue-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">Gauhati University Reg. No</label>
                    <input
                      type="text"
                      placeholder="e.g. GU24089123"
                      value={formGuRegNo}
                      onChange={(e) => setFormGuRegNo(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: ACADEMIC CURRICULUM & SELECTIVE COURSES */}
              <div className="space-y-3 p-3.5 bg-blue-50/40 rounded-xl border border-blue-100">
                <span className="text-[10px] uppercase font-bold text-blue-900 tracking-wider flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-blue-900" />
                  <span>Academic Course, Selective Track & Semester</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Degree Program *</label>
                    <select
                      value={formCourseProgram}
                      onChange={(e) => setFormCourseProgram(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 text-xs font-medium"
                    >
                      {PRESET_PROGRAMS.map((prog) => (
                        <option key={prog} value={prog}>
                          {prog}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Semester</label>
                    <select
                      value={formSemester}
                      onChange={(e) => setFormSemester(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 text-xs"
                    >
                      {PRESET_SEMESTERS.map((sem) => (
                        <option key={sem} value={sem}>
                          {sem}
                        </option>
                      ))}
                      <option value="Other">Custom Semester...</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Admission Year</label>
                    <input
                      type="text"
                      placeholder="e.g. 2024"
                      value={formAdmissionYear}
                      onChange={(e) => setFormAdmissionYear(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 text-xs"
                    />
                  </div>
                </div>

                {formSemester === 'Other' && (
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Custom Semester Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 4-Year UG 7th Semester (Honours with Research)"
                      value={formCustomSemester}
                      onChange={(e) => setFormCustomSemester(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 text-xs"
                    />
                  </div>
                )}
              </div>

              {/* SECTION 3: MENTOR, STATUS & SCORES */}
              <div className="space-y-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Performance & Department Status</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">CGPA / Performance</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      placeholder="8.50"
                      value={formCgpa}
                      onChange={(e) => setFormCgpa(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Department Status</label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 text-xs font-semibold"
                    >
                      {PRESET_STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 4: CONTACT & BACKGROUND DETAILS */}
              <div className="space-y-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-blue-900" />
                  <span>Contact Details</span>
                </span>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone / Mobile No.</label>
                  <input
                    type="text"
                    placeholder="+91 94350 12345"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900 text-xs"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingStudent ? 'Save All Changes' : 'Authorize & Save Student'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BULK EDIT POPUP MODAL */}
      {isBulkEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-blue-900" />
                <h4 className="text-sm font-bold text-slate-900">
                  Bulk Edit ({selectedIds.length} Students Selected)
                </h4>
              </div>
              <button
                onClick={() => setIsBulkEditOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Property to Update in Batch</label>
                <select
                  value={bulkField}
                  onChange={(e) => {
                    setBulkField(e.target.value as any);
                    setBulkValue('');
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-900"
                >
                  <option value="semester">Semester</option>
                  <option value="courseProgram">Degree Program</option>
                  <option value="selectiveCourse">Selective Course Track</option>
                  <option value="classSection">Class / Section</option>
                  <option value="mentorName">Assigned Mentor</option>
                  <option value="batch">Academic Batch</option>
                  <option value="status">Status</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">New Value to Apply</label>
                {bulkField === 'semester' ? (
                  <select
                    value={bulkValue}
                    onChange={(e) => setBulkValue(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  >
                    <option value="">-- Choose Semester --</option>
                    {PRESET_SEMESTERS.map((sem) => (
                      <option key={sem} value={sem}>
                        {sem}
                      </option>
                    ))}
                  </select>
                ) : bulkField === 'courseProgram' ? (
                  <select
                    value={bulkValue}
                    onChange={(e) => setBulkValue(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  >
                    <option value="">-- Choose Course Program --</option>
                    {PRESET_PROGRAMS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                ) : bulkField === 'selectiveCourse' ? (
                  <select
                    value={bulkValue}
                    onChange={(e) => setBulkValue(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  >
                    <option value="">-- Choose Selective Track --</option>
                    {PRESET_SELECTIVE_COURSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                ) : bulkField === 'mentorName' ? (
                  <select
                    value={bulkValue}
                    onChange={(e) => setBulkValue(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  >
                    <option value="">-- Choose Faculty Mentor --</option>
                    {faculty.map((f) => (
                      <option key={f.id} value={f.name}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                ) : bulkField === 'status' ? (
                  <select
                    value={bulkValue}
                    onChange={(e) => setBulkValue(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  >
                    <option value="">-- Choose Status --</option>
                    {PRESET_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    placeholder="Enter new value"
                    value={bulkValue}
                    onChange={(e) => setBulkValue(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setIsBulkEditOpen(false)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyBulkEdit}
                disabled={!bulkValue.trim()}
                className="px-4 py-1.5 bg-blue-900 hover:bg-blue-950 disabled:opacity-50 text-white rounded-lg font-bold shadow-xs cursor-pointer"
              >
                Apply to {selectedIds.length} Students
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSV BULK IMPORT MODAL */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Bulk Import Students via CSV</h4>
                  <p className="text-[11px] text-slate-500">Paste CSV data or upload a .csv file</p>
                </div>
              </div>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {csvImportError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                {csvImportError}
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Paste CSV Rows:</span>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".csv,text/csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <Upload className="w-3 h-3" />
                  <span>Choose .csv File</span>
                </button>
              </div>

              <textarea
                rows={7}
                placeholder={`Roll No,Full Name,GU Reg No,Course Program,Selective Course,Semester,Batch,Email,Phone,Mentor,CGPA,Status,Class
US-241-102-0099,Arunima Das,GU24089999,B.Sc. Mathematics (Honours/Major),Mathematical Physics & Dynamical Systems,1st Semester,2024 - 2028,arunima.das@student.dudhnoicollege.ac.in,+91 94350 99999,Dr. Bidyut Kalita,8.80,Active,B.Sc. 1st Year Section A`}
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-[11px] outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 text-[11px] text-slate-600">
              <span className="font-bold text-slate-800 block">Expected Column Headers:</span>
              <p className="font-mono text-[10px] text-slate-500">
                Roll No, Full Name, GU Reg No, Course Program, Selective Course Track, Semester, Batch, Email, Phone, Mentor, CGPA, Status, Class
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsImportModalOpen(false)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleProcessCsvImport}
                className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold shadow-xs cursor-pointer"
              >
                Import Students
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
