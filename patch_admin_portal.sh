#!/bin/bash

# We want to replace lines 1078 to 1185 with our new simplified layout.
# We will create a temporary file with the new content, then use sed to replace the range.

cat << 'INNER_EOF' > replacement.txt
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
INNER_EOF

sed -i -e '1078,1185c\' -e "$(cat replacement.txt | sed 's/$/\\/')" -e '$s/\\$//' src/components/AdminPortalManager.tsx

