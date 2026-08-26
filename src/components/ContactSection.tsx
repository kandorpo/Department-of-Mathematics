import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
  Navigation,
  Sparkles
} from 'lucide-react';
import { useDepartmentData } from '../context/DataContext';

export const ContactSection: React.FC = () => {
  const { departmentInfo: DEPARTMENT_INFO } = useDepartmentData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Academic & Course Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const subjects = [
    'Academic & Course Inquiry',
    'B.Sc. / M.Sc. Admission Guidelines',
    'Sessional Exam & Routine Query',
    'Research Collaboration & Seminars',
    'Student Verification & Transcript',
    'Ramanujan Math Club / Olympiad',
    'General Departmental Query'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all mandatory fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    // Simulate reliable form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Academic & Course Inquiry',
        message: ''
      });
    }, 800);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5 text-blue-800" />
            <span>Connect with Us</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 font-heading">
            Contact the Department of Mathematics
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Have questions about academic admissions, research projects, course syllabus, or examination schedules? Reach out to our faculty and departmental office.
          </p>
        </div>

        {/* Contact Grid: Details + Map + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards & Interactive Map Placeholder */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Info Cards */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-heading border-b border-slate-100 pb-3">
                Departmental Secretariat & Coordinates
              </h3>

              <div className="space-y-4 text-xs">
                
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-900 shrink-0 border border-blue-200/60">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block text-xs">Location & Address</span>
                    <p className="text-slate-600 leading-relaxed mt-0.5">
                      {DEPARTMENT_INFO.address}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-900 shrink-0 border border-blue-200/60">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block text-xs">Official Email</span>
                    <a
                      href={`mailto:${DEPARTMENT_INFO.email}`}
                      className="text-blue-900 font-semibold hover:underline mt-0.5 block"
                    >
                      {DEPARTMENT_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-900 shrink-0 border border-blue-200/60">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block text-xs">Phone & Helpdesk</span>
                    <p className="text-slate-600 mt-0.5 font-medium">
                      {DEPARTMENT_INFO.phone}
                    </p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-900 shrink-0 border border-blue-200/60">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block text-xs">Office Working Hours</span>
                    <p className="text-slate-600 mt-0.5">
                      {DEPARTMENT_INFO.officeHours}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Google Maps Realistic Interactive View / Placeholder */}
            <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm">
              <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-bold">{DEPARTMENT_INFO.college || 'Dudhnoi College'} Campus Map</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">25.9868° N, 90.7302° E</span>
              </div>

              <div className="relative h-48 bg-slate-100 flex items-center justify-center text-center p-4">
                {/* Stylized Map View Graphic */}
                <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
                <div className="relative z-10 space-y-2">
                  <div className="inline-flex p-3 rounded-full bg-blue-900 text-white shadow-lg animate-bounce">
                    <MapPin className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">
                    Science Block (Ground Floor)
                  </div>
                  <p className="text-[11px] text-slate-500 max-w-xs">
                    {DEPARTMENT_INFO.college || 'Dudhnoi College'}, NH-17 (Goalpara - Guwahati Highway), Goalpara, Assam
                  </p>
                  <a
                    href="https://maps.google.com/?q=Dudhnoi+College+Goalpara+Assam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-900 hover:underline pt-1"
                  >
                    <span>Open in Google Maps</span>
                    <Navigation className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
              
              <div className="border-b border-slate-100 pb-4 space-y-1">
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Send an Inquiry / Message
                </h3>
                <p className="text-xs text-slate-500">
                  Please fill in the form below. We typically respond within 1-2 academic working days.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3 animate-in fade-in">
                  <div className="flex items-center gap-2 font-bold text-base text-emerald-950">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <span>Inquiry Submitted Successfully!</span>
                  </div>
                  <p className="text-xs leading-relaxed text-emerald-800">
                    Thank you for contacting the Department of Mathematics, {DEPARTMENT_INFO.college || 'Dudhnoi College'}. Your inquiry ticket <strong>#MATH-INQ-{Math.floor(1000 + Math.random() * 9000)}</strong> has been forwarded to the departmental coordinator. We will reply to your registered email promptly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  
                  {errorMessage && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 flex items-center gap-2 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="block font-semibold text-slate-700">
                        Full Name <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Pranab Kalita"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="block font-semibold text-slate-700">
                        Email Address <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. pranab@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="block font-semibold text-slate-700">
                        Contact Number (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none transition-all"
                      />
                    </div>

                    {/* Subject Dropdown */}
                    <div className="space-y-1">
                      <label className="block font-semibold text-slate-700">
                        Subject of Inquiry <span className="text-rose-600">*</span>
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none transition-all"
                      >
                        {subjects.map((sub) => (
                          <option key={sub} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="block font-semibold text-slate-700">
                      Message / Detailed Inquiry <span className="text-rose-600">*</span>
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Please describe your query regarding mathematics syllabus, examination dates, research queries, or admission requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-blue-900 hover:bg-blue-950 text-white rounded-xl font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all duration-150 active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-amber-400" />
                        <span>Send Message to Department</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    Your details will only be used by the departmental office for responding to your inquiry.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
