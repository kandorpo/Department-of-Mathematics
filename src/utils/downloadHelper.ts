import { jsPDF } from 'jspdf';
import { NoticeItem, Course, RoutineSlot, BlogPost, Publication } from '../types';

/**
 * Universal browser file trigger that forces direct native save on mobile (iOS/Android) and desktop.
 */
export const downloadBlob = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.style.display = 'none';
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();

  setTimeout(() => {
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
  }, 1500);
};

/**
 * Download any image URL (Unsplash, local, data-url, etc.) directly to device storage.
 */
export const downloadImageFile = async (imageUrl: string, filename: string) => {
  try {
    const response = await fetch(imageUrl, { mode: 'cors' });
    if (!response.ok) throw new Error('Fetch failed');
    const blob = await response.blob();
    downloadBlob(blob, filename.endsWith('.jpg') || filename.endsWith('.png') ? filename : `${filename}.jpg`);
  } catch {
    // Fallback using HTML5 Canvas
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || 1200;
      canvas.height = img.naturalHeight || 800;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            downloadBlob(blob, filename.endsWith('.jpg') || filename.endsWith('.png') ? filename : `${filename}.jpg`);
          } else {
            window.open(imageUrl, '_blank');
          }
        }, 'image/jpeg', 0.95);
      }
    };
    img.onerror = () => {
      // Direct anchor click fallback
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = filename;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    img.src = imageUrl;
  }
};

/**
 * Download Official Department Notice PDF
 */
export const downloadNoticePDF = (notice: NoticeItem) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  // Header Banner
  doc.setFillColor(15, 30, 75); // Navy blue
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('DUDHNOI COLLEGE', pageWidth / 2, 11, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('DEPARTMENT OF MATHEMATICS', pageWidth / 2, 17, { align: 'center' });
  doc.setFontSize(8);
  doc.text('Dudhnoi, Goalpara, Assam - 783124 | Affiliated to Gauhati University', pageWidth / 2, 23, { align: 'center' });

  y = 38;

  // Reference & Date Row
  doc.setTextColor(50, 50, 50);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(`Ref. No: ${notice.refNo || 'DC/MATH/2026/NOT-0' + notice.id}`, 18, y);
  doc.text(`Date of Issue: ${notice.date}`, pageWidth - 18, y, { align: 'right' });

  y += 6;
  doc.setDrawColor(200, 200, 200);
  doc.line(18, y, pageWidth - 18, y);

  y += 10;

  // Category Badge Box
  doc.setFillColor(240, 244, 255);
  doc.setDrawColor(30, 64, 175);
  doc.roundedRect(18, y, pageWidth - 36, 10, 2, 2, 'FD');
  doc.setTextColor(30, 64, 175);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(`OFFICIAL CIRCULAR: ${notice.category.toUpperCase()}${notice.isUrgent ? ' (URGENT)' : ''}`, pageWidth / 2, y + 6.5, { align: 'center' });

  y += 18;

  // Notice Title
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  const titleLines = doc.splitTextToSize(notice.title, pageWidth - 36);
  doc.text(titleLines, 18, y);
  y += titleLines.length * 6 + 6;

  // Main Notice Content
  doc.setTextColor(40, 40, 40);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const descLines = doc.splitTextToSize(notice.description, pageWidth - 36);
  doc.text(descLines, 18, y);
  y += descLines.length * 5.5 + 8;

  // Standard Instruction paragraph
  const noteText =
    'All concerned undergraduate and postgraduate students, teaching faculty members, and examination coordinators are hereby instructed to adhere to the aforementioned instructions. For further assistance or clarifications, kindly contact the Departmental Office during official working hours.';
  const noteLines = doc.splitTextToSize(noteText, pageWidth - 36);
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.text(noteLines, 18, y);
  y += noteLines.length * 5 + 16;

  // Signature Block
  if (y > 230) {
    doc.addPage();
    y = 30;
  }

  doc.setDrawColor(220, 220, 220);
  doc.line(pageWidth - 75, y, pageWidth - 18, y);
  y += 5;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('Dr. Mukul Chandra Kalita', pageWidth - 18, y, { align: 'right' });
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(70, 70, 70);
  doc.text('Head, Department of Mathematics', pageWidth - 18, y, { align: 'right' });
  y += 4;
  doc.text('Dudhnoi College, Assam', pageWidth - 18, y, { align: 'right' });

  // Official Stamp Box
  doc.setDrawColor(30, 64, 175);
  doc.roundedRect(18, y - 12, 42, 18, 2, 2, 'D');
  doc.setTextColor(30, 64, 175);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('DEPT. OF MATHEMATICS', 39, y - 6, { align: 'center' });
  doc.text('DUDHNOI COLLEGE', 39, y - 2, { align: 'center' });
  doc.text('VERIFIED & SIGNED', 39, y + 2, { align: 'center' });

  // Footer
  doc.setFontSize(7.5);
  doc.setTextColor(150, 150, 150);
  doc.text('Generated via Dudhnoi College Mathematics Department Portal • Official Document', pageWidth / 2, 287, { align: 'center' });

  const safeTitle = notice.title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30);
  const filename = `Notice_${notice.refNo || notice.id}_${safeTitle}.pdf`;
  doc.save(filename);
};

/**
 * Download Course Syllabus PDF
 */
export const downloadCourseSyllabusPDF = (course: Course) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  // Header
  doc.setFillColor(15, 30, 75);
  doc.rect(0, 0, pageWidth, 26, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('DUDHNOI COLLEGE • DEPARTMENT OF MATHEMATICS', pageWidth / 2, 11, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Four-Year Undergraduate Programme (FYUGP) / CBCS Syllabus Guide', pageWidth / 2, 18, { align: 'center' });

  y = 35;

  // Course Title Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(16, y, pageWidth - 32, 20, 2, 2, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(`${course.code}: ${course.name}`, 20, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`Type: ${course.type} | Credits: ${course.credits} | Level: ${course.semester}`, 20, y + 14);

  y += 26;

  // Course Description
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Course Overview & Objectives:', 16, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const descLines = doc.splitTextToSize(course.description, pageWidth - 32);
  doc.text(descLines, 16, y);
  y += descLines.length * 4.5 + 4;

  if (course.prerequisites) {
    doc.setFont('helvetica', 'bold');
    doc.text(`Prerequisites: `, 16, y);
    doc.setFont('helvetica', 'normal');
    doc.text(course.prerequisites, 40, y);
    y += 7;
  }

  // Syllabus Breakdown
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Unit-Wise Detailed Syllabus Outline:', 16, y);
  y += 5;

  course.syllabusOutline.forEach((unit, idx) => {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(16, y, pageWidth - 32, 11, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 58, 138);
    const unitLines = doc.splitTextToSize(`Unit ${idx + 1}: ${unit}`, pageWidth - 38);
    doc.text(unitLines, 20, y + 6);
    y += 14;
  });

  // Course Learning Outcomes
  if (course.learningOutcomes && course.learningOutcomes.length > 0) {
    if (y > 240) {
      doc.addPage();
      y = 20;
    }
    y += 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text('Expected Learning Outcomes (CLOs):', 16, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    course.learningOutcomes.forEach((clo) => {
      const cloLines = doc.splitTextToSize(`•  ${clo}`, pageWidth - 36);
      doc.text(cloLines, 18, y);
      y += cloLines.length * 4.2 + 1.5;
    });
  }

  // Recommended Books
  if (course.textbooks && course.textbooks.length > 0) {
    if (y > 240) {
      doc.addPage();
      y = 20;
    }
    y += 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text('Recommended Standard Textbooks & Reference Literature:', 16, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    course.textbooks.forEach((book) => {
      const bookLines = doc.splitTextToSize(`•  ${book}`, pageWidth - 36);
      doc.text(bookLines, 18, y);
      y += bookLines.length * 4.2 + 1.5;
    });
  }

  // Footer
  doc.setFontSize(7.5);
  doc.setTextColor(150, 150, 150);
  doc.text('Department of Mathematics, Dudhnoi College • NEP-2020 Aligned Syllabus', pageWidth / 2, 287, { align: 'center' });

  const safeName = course.name.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 25);
  doc.save(`Syllabus_${course.code}_${safeName}.pdf`);
};

/**
 * Download Study Resource / Question Paper / Notes Document
 */
export const downloadStudyResourcePDF = (resource: {
  title: string;
  category: string;
  description: string;
  fileType?: string;
  semester?: string;
}) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  // Header Banner
  doc.setFillColor(15, 30, 75);
  doc.rect(0, 0, pageWidth, 26, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('DUDHNOI COLLEGE • DEPARTMENT OF MATHEMATICS', pageWidth / 2, 11, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('E-Learning Portal & Academic Repository Resource', pageWidth / 2, 18, { align: 'center' });

  y = 36;

  // Document Badge
  doc.setFillColor(238, 242, 255);
  doc.setDrawColor(99, 102, 241);
  doc.roundedRect(16, y, pageWidth - 32, 18, 2, 2, 'FD');
  doc.setTextColor(49, 46, 129);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`CATEGORY: ${resource.category.toUpperCase()}`, 20, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(`Format: ${resource.fileType || 'PDF Document'} | Session: 2024-2026`, 20, y + 12);

  y += 25;

  // Document Title
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  const titleLines = doc.splitTextToSize(resource.title, pageWidth - 32);
  doc.text(titleLines, 16, y);
  y += titleLines.length * 6 + 4;

  // Overview / Synopsis
  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  const descLines = doc.splitTextToSize(resource.description, pageWidth - 32);
  doc.text(descLines, 16, y);
  y += descLines.length * 5 + 10;

  // Academic Guidelines Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(16, y, pageWidth - 32, 70, 2, 2, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Study Guide & Usage Instructions:', 20, y + 8);

  const instructions = [
    '1. This study material has been compiled and reviewed by the faculty members of the Department of Mathematics.',
    '2. Students are encouraged to solve all model problems and theoretical proofs step-by-step.',
    '3. For previous year examination questions, refer to the Gauhati University standard grading scheme.',
    '4. Additional reference books and journal articles are available in the Departmental Seminar Library.',
    '5. Unauthorized commercial reproduction or redistribution outside college enrollment is strictly prohibited.'
  ];

  let iy = y + 16;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  instructions.forEach((inst) => {
    const instLines = doc.splitTextToSize(inst, pageWidth - 42);
    doc.text(instLines, 20, iy);
    iy += instLines.length * 4.5 + 2;
  });

  // Footer
  doc.setFontSize(7.5);
  doc.setTextColor(150, 150, 150);
  doc.text('Dudhnoi College • Department of Mathematics Official Study Repository', pageWidth / 2, 287, { align: 'center' });

  const safeTitle = resource.title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30);
  doc.save(`${safeTitle}.pdf`);
};

/**
 * Download Class Routine Timetable PDF
 */
export const downloadClassRoutinePDF = (
  routineSlots: RoutineSlot[],
  semesterName: string
) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 14;

  // Header
  doc.setFillColor(15, 30, 75);
  doc.rect(0, 0, pageWidth, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('DUDHNOI COLLEGE • DEPARTMENT OF MATHEMATICS', pageWidth / 2, 8.5, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Official Academic Class Timetable • ${semesterName.toUpperCase()}`, pageWidth / 2, 15, { align: 'center' });

  y = 28;

  // Table Headers
  const startX = 14;
  const colWidths = [40, 42, 42, 42, 42, 42];
  const totalWidth = colWidths.reduce((a, b) => a + b, 0);

  doc.setFillColor(241, 245, 249);
  doc.rect(startX, y, totalWidth, 9, 'F');
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);

  const headers = ['Time Slot', 'Sem 1 (Major)', 'Sem 2 (Major)', 'Sem 3 (Major)', 'Sem 4 (Major)', 'Sem 5/6 (Major)'];
  let curX = startX;
  headers.forEach((h, i) => {
    doc.text(h, curX + 2, y + 6);
    curX += colWidths[i];
  });

  y += 9;

  // Rows
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);

  routineSlots.forEach((slot, rowIdx) => {
    if (rowIdx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(startX, y, totalWidth, 10, 'F');
    }
    doc.setDrawColor(226, 232, 240);
    doc.line(startX, y + 10, startX + totalWidth, y + 10);

    let cellX = startX;
    doc.setTextColor(30, 64, 175);
    doc.setFont('helvetica', 'bold');
    doc.text(slot.timeSlot, cellX + 2, y + 6.5);
    cellX += colWidths[0];

    const sems = [slot.sem1, slot.sem2, slot.sem3, slot.sem4, slot.sem5];
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);

    sems.forEach((s, idx) => {
      const txt = s?.course ? `${s.course} (${s.type})` : '—';
      const lines = doc.splitTextToSize(txt, colWidths[idx + 1] - 4);
      doc.text(lines, cellX + 2, y + 5);
      cellX += colWidths[idx + 1];
    });

    y += 10;
  });

  // Footer
  doc.setFontSize(7.5);
  doc.setTextColor(150, 150, 150);
  doc.text('Approved by Head of Department • Mathematics Academic Schedule', pageWidth / 2, 200, { align: 'center' });

  const safeName = semesterName.replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`Class_Routine_${safeName}.pdf`);
};

/**
 * Download Blog Post / Article PDF
 */
export const downloadBlogPostPDF = (post: BlogPost) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  // Header
  doc.setFillColor(15, 30, 75);
  doc.rect(0, 0, pageWidth, 24, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('DUDHNOI COLLEGE • DEPARTMENT OF MATHEMATICS', pageWidth / 2, 10, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('Departmental Column, Mathematical Essays & Academic Insights', pageWidth / 2, 17, { align: 'center' });

  y = 34;

  // Category & Meta
  doc.setTextColor(30, 64, 175);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(post.category.toUpperCase(), 16, y);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text(`${post.date}  •  ${post.readTime}`, pageWidth - 16, y, { align: 'right' });

  y += 7;

  // Title
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  const titleLines = doc.splitTextToSize(post.title, pageWidth - 32);
  doc.text(titleLines, 16, y);
  y += titleLines.length * 6.5 + 4;

  // Author Info
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(16, y, pageWidth - 32, 10, 2, 2, 'F');
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(`Author: ${post.authorName} (${post.authorRole})`, 20, y + 6.5);

  y += 16;

  // Excerpt
  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9.5);
  const excLines = doc.splitTextToSize(`"${post.excerpt}"`, pageWidth - 32);
  doc.text(excLines, 16, y);
  y += excLines.length * 5 + 6;

  // Content
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const contentLines = doc.splitTextToSize(post.content, pageWidth - 32);

  contentLines.forEach((line: string) => {
    if (y > 275) {
      doc.addPage();
      y = 20;
    }
    doc.text(line, 16, y);
    y += 4.8;
  });

  // Footer
  doc.setFontSize(7.5);
  doc.setTextColor(150, 150, 150);
  doc.text('Dudhnoi College Mathematics Departmental Blog & Publications', pageWidth / 2, 287, { align: 'center' });

  const safeTitle = post.title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30);
  doc.save(`Article_${safeTitle}.pdf`);
};

/**
 * Download Research Publication Citation & Abstract PDF
 */
export const downloadResearchPubPDF = (pub: Publication) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  // Header
  doc.setFillColor(15, 30, 75);
  doc.rect(0, 0, pageWidth, 24, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('DUDHNOI COLLEGE • DEPARTMENT OF MATHEMATICS', pageWidth / 2, 10, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('Research Repository & Scholarly Publications Archive', pageWidth / 2, 17, { align: 'center' });

  y = 35;

  // Publication Badge
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(34, 197, 94);
  doc.roundedRect(16, y, pageWidth - 32, 14, 2, 2, 'FD');
  doc.setTextColor(21, 128, 61);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(`PEER-REVIEWED PUBLICATION  •  ${pub.year}  •  ${pub.type.toUpperCase()}`, 20, y + 6);
  if (pub.impactFactor) {
    doc.text(`Impact Factor: ${pub.impactFactor}`, pageWidth - 20, y + 6, { align: 'right' });
  }

  y += 20;

  // Title
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  const titleLines = doc.splitTextToSize(pub.title, pageWidth - 32);
  doc.text(titleLines, 16, y);
  y += titleLines.length * 6 + 4;

  // Authors & Journal
  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('Authors:', 16, y);
  doc.setFont('helvetica', 'normal');
  doc.text(pub.authors, 35, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.text('Journal:', 16, y);
  doc.setFont('helvetica', 'italic');
  doc.text(pub.journal, 35, y);
  y += 6;

  if (pub.doi) {
    doc.setFont('helvetica', 'bold');
    doc.text('DOI:', 16, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 64, 175);
    doc.text(pub.doi, 35, y);
    y += 8;
  }

  // Citation Box
  y += 4;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(16, y, pageWidth - 32, 35, 2, 2, 'FD');
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('Standard Academic Citation (APA / IEEE):', 20, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  const citationText = `${pub.authors} (${pub.year}). "${pub.title}." ${pub.journal}. ${pub.doi ? 'https://doi.org/' + pub.doi : ''}`;
  const citLines = doc.splitTextToSize(citationText, pageWidth - 40);
  doc.text(citLines, 20, y + 14);

  // Footer
  doc.setFontSize(7.5);
  doc.setTextColor(150, 150, 150);
  doc.text('Department of Mathematics Research Portal • Dudhnoi College', pageWidth / 2, 287, { align: 'center' });

  const safeTitle = pub.title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30);
  doc.save(`Research_${safeTitle}.pdf`);
};
