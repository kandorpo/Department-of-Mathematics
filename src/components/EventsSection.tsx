import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Sparkles,
  ArrowRight,
  X,
  CheckCircle2,
  Ticket,
  ChevronRight
} from 'lucide-react';
import { useDepartmentData } from '../context/DataContext';
import { EventItem } from '../types';

export const EventsSection: React.FC = () => {
  const { events: EVENTS_DATA, setIsAdminOpen } = useDepartmentData();
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [regSuccess, setRegSuccess] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Upcoming' | 'Past'>('All');

  const filteredEvents = EVENTS_DATA.filter((evt) => {
    if (filterType === 'Upcoming') return evt.isUpcoming;
    if (filterType === 'Past') return !evt.isUpcoming;
    return true;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) return;
    setRegSuccess(true);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setRegSuccess(false);
    setRegName('');
    setRegEmail('');
    setRegPhone('');
  };

  return (
    <section id="events" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-blue-800" />
              <span>Seminars & Symposia</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 font-heading">
              Upcoming & Past Departmental Events
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
              Fostering academic discourse, problem-solving passion, and scientific networking through national conferences, workshops, and student Olympiads.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="inline-flex p-1 bg-white rounded-xl border border-slate-200 shadow-xs self-start md:self-auto">
            {(['All', 'Upcoming', 'Past'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterType(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterType === tab
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab} Events
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden academic-shadow academic-shadow-hover flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                {/* Image & Category Badge */}
                {event.image && (
                  <div className="relative h-44 bg-slate-100 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                    
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-900/90 text-white backdrop-blur-xs border border-white/10 uppercase tracking-wider">
                      {event.category}
                    </span>

                    {event.isUpcoming && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-slate-950 shadow-sm flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping"></span>
                        Upcoming
                      </span>
                    )}

                    <div className="absolute bottom-2 left-3 right-3 text-white flex items-center gap-1 text-[11px] font-medium">
                      <Calendar className="w-3.5 h-3.5 text-amber-300" />
                      <span>{event.date}</span>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-2">
                    {event.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                    {event.speaker && (
                      <div className="flex items-center gap-1.5 text-blue-900 font-medium">
                        <User className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                        <span className="truncate">{event.speaker}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => setSelectedEvent(event)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    event.registrationOpen
                      ? 'bg-blue-900 hover:bg-blue-950 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <span>{event.registrationOpen ? 'Register / View Details' : 'View Event Archives'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Event Details & Registration Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-900 border border-blue-200">
                  {selectedEvent.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading mt-1">
                  {selectedEvent.title}
                </h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Event Key Info Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Calendar className="w-4 h-4 text-blue-900" />
                <span><strong>Date:</strong> {selectedEvent.date}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="w-4 h-4 text-blue-900" />
                <span><strong>Time:</strong> {selectedEvent.time}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="w-4 h-4 text-blue-900" />
                <span><strong>Venue:</strong> {selectedEvent.venue}</span>
              </div>
              {selectedEvent.coordinator && (
                <div className="flex items-center gap-2 text-slate-700">
                  <User className="w-4 h-4 text-blue-900" />
                  <span><strong>Coordinator:</strong> {selectedEvent.coordinator}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider">About this Event</h4>
              <p>{selectedEvent.description}</p>
              {selectedEvent.speaker && (
                <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 mt-2">
                  <div className="font-bold text-blue-950">Distinguished Speaker:</div>
                  <div className="text-slate-800 font-medium">{selectedEvent.speaker}</div>
                  {selectedEvent.speakerAffiliation && (
                    <div className="text-slate-500 text-[11px]">{selectedEvent.speakerAffiliation}</div>
                  )}
                </div>
              )}
            </div>

            {/* Registration Form / Confirmation */}
            {selectedEvent.registrationOpen && (
              <div className="border-t border-slate-200 pt-4 space-y-4">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Ticket className="w-4 h-4 text-amber-600" />
                  <span>Participant Registration (No Registration Fee)</span>
                </h4>

                {regSuccess ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 text-xs">
                    <div className="flex items-center gap-2 font-bold text-emerald-950">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Registration Confirmed!</span>
                    </div>
                    <p>
                      Thank you <strong>{regName}</strong>! Your seat has been reserved. A confirmation ticket has been logged with Registration ID <strong>#MATH-2026-{Math.floor(1000 + Math.random() * 9000)}</strong>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Barsha Rabha"
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="barsha@gmail.com"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Institution / Department / Semester</label>
                      <input
                        type="text"
                        placeholder="e.g. Dudhnoi College, B.Sc. 3rd Semester"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Confirm Event Registration
                    </button>
                  </form>
                )}
              </div>
            )}

            <div className="flex justify-end pt-2 border-t border-slate-200">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
