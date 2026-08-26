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
  StudentProfile,
  DepartmentStudent,
  BlogPost,
  StudentResource,
  RoutineSlot,
  StudentGrievance,
  FooterLink,
} from '../types';

export const DEPARTMENT_INFO = {
  name: 'Department of Mathematics',
  college: 'Dudhnoi College',
  affiliation: 'Affiliated to Gauhati University (Estd. 1972)',
  accreditation: 'NAAC Accredited Grade A',
  establishedYear: 1972,
  address: 'Science Block (Ground Floor), Dudhnoi College, Dudhnoi, Goalpara, Assam - 783124, India',
  email: 'mathematics@dudhnoicollege.ac.in',
  phone: '+91 (03663) 281432 / +91 94350 82194',
  officeHours: 'Monday – Saturday: 9:00 AM – 4:30 PM (IST)',
  hodName: 'Dr. Bidyut Kalita',
  hodTitle: 'Assistant Professor & Head of the Department',
  hodMessageHeading: 'Message from the Head of the Department',
  hodMessage: `Welcome to the Department of Mathematics at Dudhnoi College. For over five decades, our department has stood as a beacon of intellectual rigor and academic distinction in Lower Assam. We believe that mathematics is not merely a collection of formulas, but a profound universal language that sharpens analytical thinking, unlocks scientific discoveries, and models complex real-world phenomena. Under the NEP 2020 framework, we integrate traditional mathematical foundations with modern computational tools such as Python, SageMath, and LaTeX. We invite you to explore our vibrant academic community.`,
  vision: `To emerge as a premier center of mathematical education and research in the region, fostering analytical intellect, logical reasoning, and interdisciplinary competence among students from diverse socio-economic backgrounds.`,
  mission: [
    `To impart comprehensive and rigorous mathematical education bridging foundational theory and computational applications.`,
    `To cultivate critical thinking, problem-solving skills, and a spirit of mathematical inquiry and research.`,
    `To organize national seminars, Olympiads, workshops, and mathematical awareness camps for the student community.`,
    `To prepare students for competitive careers in higher research, academia, data science, banking, and public service.`
  ],
  coreValues: [
    { title: 'Intellectual Rigor', desc: 'Promoting precision, logical consistency, and profound understanding of mathematical concepts.' },
    { title: 'Inclusivity & Mentorship', desc: 'Providing equitable access, peer mentoring, and personalized support for every student.' },
    { title: 'Research & Innovation', desc: 'Encouraging undergraduate research projects, computational modeling, and publishing.' },
    { title: 'Academic Integrity', desc: 'Instilling ethical scholarship, transparent evaluation, and collaborative spirit.' }
  ],
  facilities: [
    { name: 'Departmental Computing Lab', desc: '25 high-performance workstations equipped with Python, SageMath, R, MATLAB, and Maxima.' },
    { name: 'Seminar Library', desc: 'Over 2,800 specialized mathematics titles, reference volumes, research journals, and Olympiad archives.' },
    { name: 'Smart Lecture Rooms', desc: 'Interactive digital podiums, projection systems, and hybrid seminar audio-visual setup.' },
    { name: 'Ramanujan Mathematical Society Room', desc: 'A dedicated student hub for problem-solving circles, math puzzles, and wall-magazine curation.' }
  ],
  logoUrl: 'https://images.unsplash.com/photo-1596495577886-d920f1a14c6e?auto=format&fit=crop&q=80&w=200',
  imageUrls: [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200'
  ],
  aboutOverview: 'The Department of Mathematics at Dudhnoi College was instituted in 1972 to foster higher scientific and mathematical education in the rural and semi-urban periphery of Goalpara district and neighboring Meghalaya borders. Over 50 years, the department has grown into an esteemed academic body producing university rank holders, IIT graduates, CSIR-NET qualifiers, and respected school and collegiate educators.',
  aboutLegacy: 'Under the Four-Year Undergraduate Programme (FYUGP) aligned with National Education Policy (NEP 2020), our curriculum seamlessly bridges core mathematical pure theory with computational skill enhancements including Python, SageMath, and LaTeX.',
  aboutImageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=900',
  heroTitle: 'Department of Mathematics',
  heroSubtitle: 'Exploring Patterns. Solving Problems. Shaping the Future.',
  heroDescription: 'Fostering mathematical excellence, abstract reasoning, and computational mastery. Our department provides rigorous training in pure and applied mathematics, preparing scholars for frontiers in scientific research, technology, and analytical leadership under the NEP 2020 framework.',
  cardHeaderBadgeText: 'Science Block • Dudhnoi College',
  cardHeaderLocation: 'Dudhnoi, Goalpara, Assam - 783124',
  cardHeaderTitle: 'Department of Mathematics & Computing Facility',
  welcomeBadgeText: 'Academic Excellence & Heritage',
  welcomeTitle: 'Welcome to the Department of Mathematics',
  welcomeDescription: 'Established in 1972 alongside the founding of Dudhnoi College, the Department of Mathematics is dedicated to fostering deep conceptual understanding, analytical rigor, and mathematical innovation. We blend traditional mathematical proofs with modern scientific computing, empowering students to excel in higher education, research, and technical careers.',
  
  // Footer Customization
  footerTagline: 'Dedicated to academic distinction, foundational proofs, and computational problem-solving. Fostering analytical minds and scientific leadership under Gauhati University and NEP 2020.',
  footerBadges: ['Affiliated to GU', 'NAAC Grade A', 'UGC 2(f) & 12(B)'],
  footerDeskTitle: 'Department Desk',
  footerAddress: 'Science Block, Dudhnoi College, Goalpara - 783124, Assam',
  footerPhone: '+91 (03663) 281432',
  footerEmail: 'mathematics@dudhnoicollege.ac.in',
  footerCopyright: '© 2026 Department of Mathematics, Dudhnoi College. All Rights Reserved.',
  footerQuickLinks: [
    { id: 'fl-1', name: 'Home Overview', url: '#home' },
    { id: 'fl-2', name: 'About Department', url: '#about' },
    { id: 'fl-3', name: 'Faculty Directory', url: '#faculty' },
    { id: 'fl-4', name: 'Undergraduate & PG Courses', url: '#courses' },
    { id: 'fl-5', name: 'Research Thrust Areas', url: '#research' },
    { id: 'fl-6', name: 'Upcoming Events & Seminars', url: '#events' },
    { id: 'fl-7', name: 'Department Notices & Routine', url: '#notices' },
    { id: 'fl-8', name: 'Student & Faculty Accolades', url: '#achievements' },
    { id: 'fl-9', name: 'Photo & Magazine Gallery', url: '#gallery' },
    { id: 'fl-10', name: 'Contact & Office Hours', url: '#contact' },
  ] as FooterLink[],
  footerAcademicLinks: [
    { id: 'al-1', name: 'Dudhnoi College Official Portal', url: 'https://dudhnoicollege.ac.in', isExternal: true },
    { id: 'al-2', name: 'Gauhati University Examination Portal', url: 'https://gauhati.ac.in', isExternal: true },
    { id: 'al-3', name: 'Assam Academy of Mathematics (AAM)', url: 'https://aam.org.in', isExternal: true },
    { id: 'al-4', name: 'National Board for Higher Mathematics (NBHM)', url: 'https://www.nbhm.dae.gov.in', isExternal: true },
    { id: 'al-5', name: 'University Grants Commission (UGC)', url: 'https://ugc.gov.in', isExternal: true },
    { id: 'al-6', name: 'SWAYAM / NPTEL Mathematics Courses', url: 'https://nptel.ac.in', isExternal: true },
    { id: 'al-7', name: 'Ramanujan Mathematical Society', url: 'https://www.ramanujanmathsociety.org', isExternal: true },
    { id: 'al-8', name: 'DST-SERB Mathematical Sciences', url: 'https://serb.gov.in', isExternal: true },
  ] as FooterLink[],

  // Mathematical Foundations Showcase
  heroFoundations: {
    title: 'Mathematical Foundations',
    subtitle: 'Departmental Inquiry Focus',
    equations: [
      { formula: "e^{i\\pi} + 1 = 0", name: "Euler's Identity", desc: "Unifying analysis, geometry, and arithmetic" },
      { formula: "\\nabla \\times \\mathbf{B} = \\mu_0 \\mathbf{J}", name: "Maxwell-Ampère Law", desc: "Differential vector calculus in electrodynamics" },
      { formula: "\\zeta(s) = \\sum_{n=1}^{\\infty} n^{-s}", name: "Riemann Zeta Function", desc: "Distribution of prime numbers in analytic number theory" },
      { formula: "\\oint_{\\gamma} f(z) dz = 0", name: "Cauchy-Goursat Theorem", desc: "Foundational cornerstone of complex analysis" }
    ],
    curriculumModel: {
      title: 'Curriculum Model',
      value: 'NEP 2020 FYUGP',
      subtitle: 'Major, Minor & Honors'
    },
    researchCell: {
      title: 'Research Cell',
      value: 'MHD, Topology & Graph Theory',
      subtitle: 'Funded Projects Active'
    }
  }
};

export const DEPARTMENT_STATS: DepartmentStat[] = [
  {
    label: 'Years of Excellence',
    value: 52,
    suffix: '+',
    subtext: 'Nurturing mathematical minds since 1972',
    icon: 'Award'
  },
  {
    label: 'Faculty Members',
    value: 7,
    suffix: '',
    subtext: 'Ph.D. holders & UGC-NET / SLET scholars',
    icon: 'Users'
  },
  {
    label: 'Students Enrolled',
    value: 480,
    suffix: '+',
    subtext: 'B.Sc. Major, Minor & Postgraduates',
    icon: 'GraduationCap'
  },
  {
    label: 'Research Publications',
    value: 95,
    suffix: '+',
    subtext: 'Scopus, Web of Science & UGC-CARE indexed',
    icon: 'BookOpen'
  }
];

export const FACULTY_DATA: FacultyMember[] = [
  {
    id: 'fac-1',
    name: 'Dr. Bidyut Kalita',
    designation: 'Assistant Professor',
    qualification: 'M.Sc. (Gauhati University), Ph.D., SLET',
    specialization: 'Applied Mathematics, Fluid Dynamics & Mathematical Analysis',
    email: 'kbidyut73@yahoo.com',
    phone: '+91 94350 82194',
    roomNo: 'Science Block - Room 104',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    bio: 'Dr. Bidyut Kalita serves as Assistant Professor and Head of the Department of Mathematics at Dudhnoi College. With extensive teaching and research expertise in applied mathematics and boundary layer flow analysis, he provides academic leadership and mentors students in pure and applied mathematics.',
    researchInterests: ['Applied Mathematics', 'Fluid Dynamics', 'Boundary Layer Flow', 'Mathematical Modeling'],
    recentPublications: [
      'Analysis of unsteady boundary layer flow over stretching surfaces, Journal of Mathematical Sciences (2024)',
      'Mathematical modeling of convective heat transfer in porous media, Int. J. of Applied Mechanics (2022)'
    ],
    coursesTaught: ['Differential Equations (MAT-HC-2016)', 'Numerical Methods (MAT-HC-4026)', 'Calculus & Analytic Geometry (MAT-HC-1016)'],
    scholarUrl: 'https://scholar.google.com',
    researchGateUrl: 'https://researchgate.net',
    officeHours: 'Mon, Wed, Fri: 11:00 AM – 1:00 PM',
    isHod: true
  },
  {
    id: 'fac-2',
    name: 'Dr. Mridul Dutta',
    designation: 'Assistant Professor',
    qualification: 'M.Sc., Ph.D., SLET',
    specialization: 'Fluid Dynamics, Magnetohydrodynamics & Numerical Analysis',
    email: 'mridulduttamc@gmail.com',
    phone: '+91 98642 11093',
    roomNo: 'Science Block - Room 105',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    bio: 'Dr. Mridul Dutta is an Assistant Professor in the Department of Mathematics. His research encompasses magnetohydrodynamic flows, computational simulations, and nonlinear differential equations. He actively mentors students for university examinations and competitive tests.',
    researchInterests: ['Fluid Dynamics', 'MHD Flow in Porous Media', 'Numerical Analysis', 'Heat & Mass Transfer'],
    recentPublications: [
      'MHD boundary layer flow past a permeable surface with thermal radiation, Journal of Fluid Mechanics Research (2023)',
      'Numerical solutions of nonlinear differential systems in fluid mechanics, Applied Mathematics & Computation (2021)'
    ],
    coursesTaught: ['Real Analysis (MAT-HC-3016)', 'Classical Mechanics & Hydrodynamics (MAT-HC-5016)', 'Metric Spaces & Complex Analysis (MAT-HC-5026)'],
    scholarUrl: 'https://scholar.google.com',
    researchGateUrl: 'https://researchgate.net',
    officeHours: 'Tue, Thu: 10:00 AM – 12:00 PM',
    isHod: false
  },
  {
    id: 'fac-3',
    name: 'Dr. Tushar Kanti Das',
    designation: 'Assistant Professor',
    qualification: 'M.Sc., Ph.D., CSIR-NET (JRF)',
    specialization: 'Topology, Functional Analysis & Operator Theory',
    email: 'tusarkantidas1995@gmail.com',
    phone: '+91 91012 34589',
    roomNo: 'Science Block - Room 106',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    bio: 'Dr. Tushar Kanti Das joined the Department of Mathematics as Assistant Professor. His research expertise lies in general topology, topological algebraic structures, and functional operator theory. He coordinates departmental seminar sessions and computational workshops.',
    researchInterests: ['General Topology', 'Functional Analysis', 'Operator Algebras', 'Metric Fixed Point Theory'],
    recentPublications: [
      'Separation properties and compactness in generalized topological spaces, Topology and its Applications (2024)',
      'Fixed point theorems for generalized contractive mappings in b-metric spaces, Fixed Point Theory & Algorithms (2023)'
    ],
    coursesTaught: ['Topology (MAT-HC-6016)', 'Abstract Algebra (MAT-HC-3026)', 'Linear Algebra (MAT-HC-4016)'],
    scholarUrl: 'https://scholar.google.com',
    researchGateUrl: 'https://researchgate.net',
    officeHours: 'Mon, Thu: 2:00 PM – 4:00 PM',
    isHod: false
  },
  {
    id: 'fac-4',
    name: 'Dr. Dhajendra Rabha',
    designation: 'Assistant Professor',
    qualification: 'M.Sc., Ph.D., SLET',
    specialization: 'Algebra, Number Theory & Cryptography',
    email: 'rabhadhajendra@gmail.com',
    phone: '+91 97065 41203',
    roomNo: 'Science Block - Room 107',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600',
    bio: 'Dr. Dhajendra Rabha is an Assistant Professor specializing in algebra, discrete mathematics, and algebraic number theory. He leads the Ramanujan Math Club activities, coordinates mathematical awareness camps, and organizes student problem-solving circles.',
    researchInterests: ['Algebraic Number Theory', 'Diophantine Equations', 'Cryptography & Network Security', 'Graph Theory'],
    recentPublications: [
      'On explicit solutions of certain Diophantine equations involving recurrence sequences, Rocky Mountain J. Math. (2024)',
      'Topological indices and spectral properties of molecular graphs, Discrete Applied Mathematics (2022)'
    ],
    coursesTaught: ['Number Theory & Cryptography (MAT-HE-5016)', 'Discrete Mathematics (MAT-SE-3014)', 'Graph Theory & Linear Programming (MAT-HE-6016)'],
    scholarUrl: 'https://scholar.google.com',
    researchGateUrl: 'https://researchgate.net',
    officeHours: 'Wed, Fri: 1:30 PM – 3:30 PM',
    isHod: false
  },
  {
    id: 'fac-5',
    name: 'Dr. Anamika Das',
    designation: 'Assistant Professor',
    qualification: 'M.Sc. (GU), Ph.D., GATE (AIR 48), SLET',
    specialization: 'Mathematical Modelling, Biomathematics & Dynamical Systems',
    email: 'anamika.das@dudhnoicollege.ac.in',
    phone: '+91 97065 88120',
    roomNo: 'Science Block - Room 108',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600',
    bio: 'Dr. Anamika Das specializes in mathematical modeling, nonlinear dynamical systems, and differential biology equations. She coordinates student research dissertations and guides competitive exam circles for CSIR-NET and JAM aspirants.',
    researchInterests: ['Mathematical Biology', 'Nonlinear Dynamical Systems', 'Bifurcation Theory', 'Numerical Differential Equations'],
    recentPublications: [
      'Stability and optimal control analysis of a vector-borne epidemic model, Mathematical Biosciences (2024)',
      'Dynamics of eco-epidemiological prey-predator model with stage structure, Chaos, Solitons & Fractals (2022)'
    ],
    coursesTaught: ['Calculus & Analytic Geometry (MAT-HC-1016)', 'Mathematical Modelling (MAT-HE-6026)', 'Multivariate Calculus (MAT-HC-2026)'],
    scholarUrl: 'https://scholar.google.com',
    researchGateUrl: 'https://researchgate.net',
    officeHours: 'Wed, Fri: 1:30 PM – 3:30 PM',
    isHod: false
  },
  {
    id: 'fac-6',
    name: 'Jasmine Rabha',
    designation: 'Guest Faculty',
    qualification: 'M.Sc. (Mathematics), B.Ed., SLET Qualified',
    specialization: 'Pure Mathematics, Linear Algebra & Mathematical Statistics',
    email: 'jasminerbh@gmail.com',
    phone: '+91 99541 67812',
    roomNo: 'Science Block - Faculty Hall',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    bio: 'Jasmine Rabha is a dedicated educator serving as Guest Faculty in the Department of Mathematics. With a strong passion for pure mathematics and pedagogy, she conducts tutorial sessions, practical laboratory courses, and foundational math mentorship for undergraduate students.',
    researchInterests: ['Linear Algebra & Matrix Analysis', 'Mathematical Statistics & Probability', 'Calculus Pedagogical Methods', 'Mathematical Modeling'],
    recentPublications: [
      'A study on matrix decomposition techniques and their applications in data modeling, Journal of Mathematical Education (2023)'
    ],
    coursesTaught: ['Multivariate Calculus (MAT-HC-2026)', 'Probability & Statistics (MAT-HC-3036)', 'Computer Programming in Python (MAT-SE-4014)'],
    scholarUrl: 'https://scholar.google.com',
    researchGateUrl: 'https://researchgate.net',
    officeHours: 'Mon to Fri: 10:00 AM – 1:00 PM',
    isHod: false
  },
  {
    id: 'fac-7',
    name: 'Mr. Kalyan Jyoti Nath',
    designation: 'Guest Faculty',
    qualification: 'M.Sc. (IIT Kharagpur), GATE (AIR 112)',
    specialization: 'Computational Mathematics & Scientific Computing with Python',
    email: 'kalyan.nath@dudhnoicollege.ac.in',
    phone: '+91 86381 29405',
    roomNo: 'Mathematics Computer Lab',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
    bio: 'Mr. Kalyan Jyoti Nath holds a Master of Science from IIT Kharagpur with specialized training in high-performance scientific computing, parallel algorithms, and machine learning mathematics. He oversees the computer lab practicals and competitive exam problem workshops.',
    researchInterests: ['Numerical Partial Differential Equations', 'Finite Element Methods', 'Scientific Python & NumPy/SciPy', 'Computational Geometry'],
    recentPublications: [
      'High-order compact finite difference schemes for 2D Burgers equation, Computers & Mathematics with Applications (2023)'
    ],
    coursesTaught: ['Computer Programming in Python (MAT-SE-4014)', 'Numerical Analysis Practical (MAT-HC-4026P)', 'C Programming for Mathematics'],
    scholarUrl: 'https://scholar.google.com',
    officeHours: 'Mon to Fri: 3:00 PM – 4:30 PM',
    isHod: false
  }
];

export const COURSES_DATA: Course[] = [
  {
    id: 'crs-1',
    code: 'MAT-HC-1016',
    name: 'Calculus & Analytic Geometry',
    level: 'UG',
    semester: 'Semester I (FYUGP NEP 2020)',
    credits: 4,
    type: 'Major / Core',
    description: 'Foundational concepts of differential and integral calculus, hyperbolic functions, curve tracing, reduction formulas, and three-dimensional geometry of surfaces.',
    prerequisites: 'Higher Secondary (10+2) Mathematics with minimum 50% aggregate',
    syllabusOutline: [
      'Unit 1: Hyperbolic functions, Higher order derivatives, Leibniz rule and its applications.',
      'Unit 2: Concavity, Inflection points, Asymptotes, Curvature, Curve tracing in Cartesian and Polar coordinates.',
      'Unit 3: Reduction formulas for trigonometric integrals, Arc length, Surface area and Volume of solids of revolution.',
      'Unit 4: 3D Coordinate systems, Planes, Straight lines in space, Spheres, Cones, Cylinders and Quadric surfaces.'
    ],
    textbooks: [
      'G.B. Thomas and R.L. Finney, Calculus and Analytic Geometry, Pearson Education.',
      'H. Anton, I. Bivens and S. Davis, Calculus, John Wiley and Sons.',
      'S.L. Loney, The Elements of Coordinate Geometry, Macmillan and Company.'
    ],
    learningOutcomes: [
      'Understand the geometric and physical interpretation of calculus concepts.',
      'Trace algebraic and transcendental curves accurately.',
      'Compute arc lengths, areas, and volumes using single and double integrals.',
      'Analyze planes, spheres, and quadrics in three-dimensional Euclidean space.'
    ]
  },
  {
    id: 'crs-2',
    code: 'MAT-HC-2016',
    name: 'Differential Equations',
    level: 'UG',
    semester: 'Semester II',
    credits: 4,
    type: 'Major / Core',
    description: 'First order and higher order linear differential equations, Wronskian analysis, method of variation of parameters, Cauchy-Euler equations, and power series solutions.',
    prerequisites: 'MAT-HC-1016 (Calculus & Analytic Geometry)',
    syllabusOutline: [
      'Unit 1: First order ODEs, Exact equations, Integrating factors, Bernoulli equations, Orthogonal trajectories.',
      'Unit 2: Second order linear ODEs with constant coefficients, Method of undetermined coefficients, Variation of parameters.',
      'Unit 3: Cauchy-Euler and Legendre equations, Systems of linear differential equations, Operator method.',
      'Unit 4: Power series solutions about ordinary points, Frobenius method for regular singular points, Bessel and Legendre functions.'
    ],
    textbooks: [
      'S.L. Ross, Differential Equations, 3rd Ed., John Wiley and Sons.',
      'E.A. Coddington, An Introduction to Ordinary Differential Equations, Prentice-Hall.',
      'G.F. Simmons, Differential Equations with Applications and Historical Notes, McGraw-Hill.'
    ],
    learningOutcomes: [
      'Model physical phenomena such as harmonic oscillators and population dynamics.',
      'Solve non-homogeneous second-order linear differential equations rigorously.',
      'Construct series solutions for differential equations occurring in quantum and classical physics.'
    ]
  },
  {
    id: 'crs-3',
    code: 'MAT-HC-3016',
    name: 'Real Analysis',
    level: 'UG',
    semester: 'Semester III',
    credits: 4,
    type: 'Major / Core',
    description: 'A rigorous theoretical treatment of the real number system, completeness axiom, sequences, series convergence tests, Bolzano-Weierstrass theorem, and continuous functions.',
    prerequisites: 'Foundations of Mathematics & Logic',
    syllabusOutline: [
      'Unit 1: Algebraic and Order properties of ℝ, Supremum and Infimum, Completeness axiom, Archimedean property, Density of Rationals.',
      'Unit 2: Sequences of real numbers, Limit theorems, Monotone convergence theorem, Subsequences, Bolzano-Weierstrass theorem, Cauchy criterion.',
      'Unit 3: Infinite series, Tests for convergence (Comparison, Ratio, Root, Raabe, Gauss, Cauchy condensation), Alternating series, Leibniz test, Absolute and conditional convergence.',
      'Unit 4: Limits of functions, Sequential criterion, Continuity, Intermediate value theorem, Extreme value theorem, Uniform continuity.'
    ],
    textbooks: [
      'R.G. Bartle and D.R. Sherbert, Introduction to Real Analysis, John Wiley and Sons.',
      'Walter Rudin, Principles of Mathematical Analysis, McGraw-Hill.',
      'S.C. Malik and Savita Arora, Mathematical Analysis, New Age International.'
    ],
    learningOutcomes: [
      'Construct epsilon-delta proofs with high mathematical maturity.',
      'Understand the deep topological structure of the real line ℝ.',
      'Test convergence of challenging infinite series and sequences of functions.'
    ]
  },
  {
    id: 'crs-4',
    code: 'MAT-HC-3026',
    name: 'Abstract Algebra',
    level: 'UG',
    semester: 'Semester III',
    credits: 4,
    type: 'Major / Core',
    description: 'Comprehensive study of algebraic structures including Groups, Subgroups, Cyclic groups, Cosets, Lagrange theorem, Normal subgroups, Quotient groups, and Group homomorphisms.',
    prerequisites: 'Set Theory and Modular Arithmetic',
    syllabusOutline: [
      'Unit 1: Symmetries of a square, Definition and examples of groups, Elementary properties, Abelian groups, Subgroups, Center of a group.',
      'Unit 2: Cyclic groups, Generators, Classification of cyclic subgroups, Permutation groups, Cycle notation, Alternating group An.',
      'Unit 3: Cosets, Lagrange theorem and its corollaries, Fermat’s Little theorem, Normal subgroups, Quotient groups, Cauchy theorem for abelian groups.',
      'Unit 4: Group homomorphisms, Kernels, First, Second and Third Isomorphism Theorems, Cayley’s Theorem, Automorphisms of groups.'
    ],
    textbooks: [
      'Joseph A. Gallian, Contemporary Abstract Algebra, 9th Ed., Cengage Learning.',
      'David S. Dummit and Richard M. Foote, Abstract Algebra, John Wiley and Sons.',
      'I.N. Herstein, Topics in Algebra, Wiley Eastern.'
    ],
    learningOutcomes: [
      'Identify symmetries and algebraic invariants in diverse mathematical contexts.',
      'Apply Lagrange’s theorem and isomorphism theorems to classify group structures.',
      'Bridge pure group theory with modern cryptographic protocols.'
    ]
  },
  {
    id: 'crs-5',
    code: 'MAT-HC-4016',
    name: 'Linear Algebra',
    level: 'UG',
    semester: 'Semester IV',
    credits: 4,
    type: 'Major / Core',
    description: 'Vector spaces, subspaces, linear independence, basis, dimension, linear transformations, matrix representations, eigenvalues, eigenvectors, Cayley-Hamilton theorem, and inner product spaces.',
    prerequisites: 'Matrices and Systems of Linear Equations',
    syllabusOutline: [
      'Unit 1: Vector spaces over a field, Subspaces, Span, Linear independence, Dimension theorem, Direct sums.',
      'Unit 2: Linear transformations, Rank-Nullity Theorem, Matrix of a linear transformation, Change of basis matrix, Invertibility.',
      'Unit 3: Eigenvalues, Eigenvectors, Characteristic and Minimal polynomials, Cayley-Hamilton theorem, Diagonalizability of operators.',
      'Unit 4: Inner product spaces, Norms, Cauchy-Schwarz inequality, Gram-Schmidt orthogonalization process, Orthogonal complements.'
    ],
    textbooks: [
      'Stephen H. Friedberg, Arnold J. Insel, Lawrence E. Spence, Linear Algebra, Pearson.',
      'Gilbert Strang, Linear Algebra and Its Applications, Cengage Learning.',
      'Kenneth Hoffman and Ray Kunze, Linear Algebra, Prentice-Hall.'
    ],
    learningOutcomes: [
      'Perform matrix factorizations and diagonalizations efficiently.',
      'Construct orthogonal bases using Gram-Schmidt algorithms.',
      'Apply linear algebra in data science, PCA, and quantum mechanics formulation.'
    ]
  },
  {
    id: 'crs-6',
    code: 'MAT-HC-4026',
    name: 'Numerical Analysis & Scientific Computing',
    level: 'UG',
    semester: 'Semester IV',
    credits: 4,
    type: 'Major / Core',
    description: 'Numerical algorithms for root finding, polynomial interpolation, numerical differentiation, Newton-Cotes quadrature, and solution of initial value problems with Python/C implementations.',
    prerequisites: 'Calculus and Differential Equations',
    syllabusOutline: [
      'Unit 1: Errors in numerical calculations, Bisection method, Regula-Falsi, Secant and Newton-Raphson methods, Rate of convergence.',
      'Unit 2: Lagrange and Newton divided difference interpolation, Finite difference operators (Δ, ∇, δ, μ), Newton forward and backward formulas.',
      'Unit 3: Numerical differentiation, Trapezoidal rule, Simpson’s 1/3 and 3/8 rules, Gauss-Legendre quadrature formulas.',
      'Unit 4: Numerical solutions of ODEs: Euler’s method, Modified Euler, Runge-Kutta 2nd and 4th order methods.'
    ],
    textbooks: [
      'M.K. Jain, S.R.K. Iyengar and R.K. Jain, Numerical Methods for Scientific and Engineering Computation, New Age.',
      'S.S. Sastry, Introductory Methods of Numerical Analysis, PHI Learning.',
      'Kendall E. Atkinson, An Introduction to Numerical Analysis, John Wiley.'
    ],
    learningOutcomes: [
      'Implement numerical algorithms in Python and Scilab.',
      'Analyze truncation and round-off errors in scientific computation.',
      'Solve engineering and physics differential systems computationally.'
    ]
  },
  {
    id: 'crs-7',
    code: 'MAT-HC-5016',
    name: 'Complex Analysis',
    level: 'UG',
    semester: 'Semester V',
    credits: 4,
    type: 'Major / Core',
    description: 'Analytic functions, Cauchy-Riemann equations, contour integration, Cauchy integral formula, Liouville’s theorem, Taylor and Laurent series, Residue calculus and evaluation of real integrals.',
    prerequisites: 'MAT-HC-3016 (Real Analysis)',
    syllabusOutline: [
      'Unit 1: Complex numbers, Analytic functions, Cauchy-Riemann equations in Cartesian and Polar forms, Harmonic conjugates.',
      'Unit 2: Complex integration, Contours, Cauchy-Goursat Theorem, Cauchy Integral Formula, Morera’s Theorem, Liouville’s Theorem, Fundamental Theorem of Algebra.',
      'Unit 3: Taylor and Laurent series, Singularities (Poles, Removable, Essential), Picard’s Theorem.',
      'Unit 4: Residue theorem, Calculation of residues, Evaluation of improper real integrals of trigonometric and rational functions.'
    ],
    textbooks: [
      'J.W. Brown and R.V. Churchill, Complex Variables and Applications, McGraw-Hill.',
      'Lars V. Ahlfors, Complex Analysis, McGraw-Hill.',
      'H.S. Kasana, Complex Variables: Theory and Applications, PHI.'
    ],
    learningOutcomes: [
      'Verify analyticity and construct harmonic conjugates.',
      'Evaluate challenging real and complex contour integrals using the Residue theorem.',
      'Classify isolated singularities and construct Laurent series expansions.'
    ]
  },
  {
    id: 'crs-8',
    code: 'MAT-HC-6016',
    name: 'Topology',
    level: 'UG',
    semester: 'Semester VI',
    credits: 4,
    type: 'Major / Core',
    description: 'Topological spaces, basis, subbasis, subspace topology, closed sets, closure, interior, continuous functions, homeomorphisms, connectedness, compactness, and separation axioms.',
    prerequisites: 'Metric Spaces and Set Theory',
    syllabusOutline: [
      'Unit 1: Topological spaces, Examples (Discrete, Indiscrete, Co-finite, Standard ℝ), Basis and Subbasis for a topology, Subspace topology.',
      'Unit 2: Interior, Closure, Boundary, Limit points, Dense sets, Continuous functions between topological spaces, Homeomorphisms.',
      'Unit 3: Connected spaces, Connected components, Path connectedness, Compact spaces, Heine-Borel theorem for ℝⁿ, Finite intersection property.',
      'Unit 4: Separation axioms: T0, T1, T2 (Hausdorff) spaces, Regular and Normal spaces, Urysohn’s Lemma (statement and applications).'
    ],
    textbooks: [
      'James R. Munkres, Topology, 2nd Ed., Prentice Hall of India.',
      'G.F. Simmons, Introduction to Topology and Modern Analysis, McGraw-Hill.',
      'J. Dugundji, Topology, Allyn and Bacon.'
    ],
    learningOutcomes: [
      'Abstract the geometric notions of continuity and open sets beyond metric constraints.',
      'Prove topological invariants and classification of topological spaces.',
      'Prepare for advanced research in geometric topology and differential geometry.'
    ]
  },
  {
    id: 'crs-9',
    code: 'MAT-PG-101',
    name: 'Advanced Abstract Algebra (M.Sc.)',
    level: 'PG',
    semester: 'Postgraduate - Sem I',
    credits: 4,
    type: 'Postgraduate Core',
    description: 'Sylow theorems, Direct and Semidirect products, Solvable and Nilpotent groups, Ring theory, Unique Factorization Domains, Principal Ideal Domains, Euclidean Domains, and Module theory.',
    prerequisites: 'UG Major in Mathematics',
    syllabusOutline: [
      'Unit 1: Group actions, Orbit-Stabilizer theorem, Sylow p-subgroups, Sylow theorems and applications to simple group classification.',
      'Unit 2: Direct products, Fundamental Theorem of Finite Abelian Groups, Solvable groups, Jordan-Hölder theorem.',
      'Unit 3: Rings, Ideals, Maximal and Prime ideals, Polynomial rings over UFDs, Gauss’ Lemma, Eisenstein criterion.',
      'Unit 4: Modules, Submodules, Quotient modules, Free modules, Modules over a PID.'
    ],
    textbooks: [
      'D.S. Dummit and R.M. Foote, Abstract Algebra, 3rd Ed., John Wiley.',
      'Serge Lang, Algebra, Springer Graduate Texts in Mathematics.',
      'N. Jacobson, Basic Algebra I & II, Dover Publications.'
    ],
    learningOutcomes: [
      'Analyze finite groups using Sylow theory and group actions.',
      'Distinguish UFDs, PIDs, and Euclidean domains with counterexamples.',
      'Understand algebraic structures underlying algebraic geometry and Galois theory.'
    ]
  },
  {
    id: 'crs-10',
    code: 'MAT-PG-204',
    name: 'Functional Analysis (M.Sc.)',
    level: 'PG',
    semester: 'Postgraduate - Sem II',
    credits: 4,
    type: 'Postgraduate Core',
    description: 'Normed linear spaces, Banach spaces, Hahn-Banach theorem, Open Mapping Theorem, Closed Graph Theorem, Hilbert spaces, orthonormal bases, Riesz Representation Theorem, and spectral theory of compact operators.',
    prerequisites: 'Real Analysis & Metric Spaces',
    syllabusOutline: [
      'Unit 1: Normed spaces, Banach spaces, Equivalent norms, Finite dimensional normed spaces, Dual spaces.',
      'Unit 2: Fundamental theorems of functional analysis: Hahn-Banach theorem, Uniform Boundedness Principle, Open Mapping Theorem, Closed Graph Theorem.',
      'Unit 3: Hilbert spaces, Orthogonality, Projection theorem, Orthonormal sets, Bessel inequality, Parseval identity, Riesz Representation theorem.',
      'Unit 4: Bounded linear operators on Hilbert spaces, Adjoint operators, Self-adjoint, Unitary and Normal operators, Compact operators.'
    ],
    textbooks: [
      'Erwin Kreyszig, Introductory Functional Analysis with Applications, John Wiley & Sons.',
      'B.V. Limaye, Functional Analysis, New Age International Publishers.',
      'Walter Rudin, Functional Analysis, McGraw-Hill.'
    ],
    learningOutcomes: [
      'Master infinite-dimensional vector space analysis and duality principles.',
      'Apply projection and representation theorems in quantum mechanics and partial differential equations.',
      'Understand spectrum and spectral decompositions of self-adjoint operators.'
    ]
  },
  {
    id: 'crs-11',
    code: 'MAT-SEC-301',
    name: 'Scientific Computing with Python & LaTeX',
    level: 'Add-on',
    semester: 'Value Added / Skill Enhancement',
    credits: 2,
    type: 'Skill Enhancement (SEC)',
    description: 'Hands-on training in Python (NumPy, Matplotlib, SymPy, SciPy) for symbolic & numerical math, and professional mathematical document preparation using LaTeX and Overleaf.',
    prerequisites: 'Basic Computer Literacy',
    syllabusOutline: [
      'Unit 1: Python fundamentals, Control structures, NumPy arrays, Vectorized operations, Matrix manipulations.',
      'Unit 2: SymPy for symbolic calculus, limits, derivatives, integrals, solving algebraic and differential equations.',
      'Unit 3: 2D & 3D Mathematical visualization with Matplotlib, Phase portraits, Fourier series animation.',
      'Unit 4: LaTeX syntax: Equations, Matrices, TikZ geometric diagrams, BibTeX bibliography, Thesis and paper formatting.'
    ],
    textbooks: [
      'Hans Petter Langtangen, A Primer on Scientific Programming with Python, Springer.',
      'Leslie Lamport, LaTeX: A Document Preparation System, Addison-Wesley.',
      'Stefan Kottwitz, LaTeX Beginner’s Guide, Packt Publishing.'
    ],
    learningOutcomes: [
      'Generate publication-quality mathematical manuscripts in LaTeX.',
      'Simulate and visualize complex calculus and linear algebra systems in Python.',
      'Enhance employability for data science, modeling, and scientific research.'
    ]
  }
];

export const RESEARCH_AREAS: ResearchArea[] = [
  {
    id: 'res-1',
    title: 'Fluid Dynamics & Magnetohydrodynamics',
    iconName: 'Waves',
    description: 'Investigating convective boundary layer flows, heat and mass transfer, nanofluids, porous media dynamics, and the impact of magnetic fields on electrically conducting fluid flows.',
    keyTopics: ['MHD Boundary Layer Flow', 'Porous Media Transport', 'Thermal Radiation & Chemical Reaction', 'Nanofluid Convection'],
    facultyInvolved: ['Dr. Mukul Chandra Kalita', 'Mr. Kalyan Jyoti Nath'],
    activeProjectsCount: 2
  },
  {
    id: 'res-2',
    title: 'Fuzzy Topology & Soft Set Theory',
    iconName: 'Network',
    description: 'Exploring generalizations of topological structures using fuzzy sets, intuitionistic fuzzy topology, rough sets, and their applications in multi-criteria decision making and uncertainty modeling.',
    keyTopics: ['Intuitionistic Fuzzy Sets', 'Supra Topological Spaces', 'Separation Axioms', 'Fuzzy Decision Analysis'],
    facultyInvolved: ['Dr. Dipankar Sarma'],
    activeProjectsCount: 1
  },
  {
    id: 'res-3',
    title: 'Number Theory & Cryptography',
    iconName: 'Binary',
    description: 'Theoretical investigations into modular forms, Ramanujan mock theta functions, partition congruences, Diophantine equations, and algebraic curve cryptography.',
    keyTopics: ['Partition Congruences', 'Diophantine Equations', 'Elliptic Curve Cryptography', 'Modular Forms'],
    facultyInvolved: ['Dr. Pranab Jyoti Rabha'],
    activeProjectsCount: 2
  },
  {
    id: 'res-4',
    title: 'Mathematical Biology & Epidemiological Dynamics',
    iconName: 'Activity',
    description: 'Formulating nonlinear differential equations and dynamical systems to model infectious disease propagation, ecological prey-predator interactions, and optimal control strategies.',
    keyTopics: ['Nonlinear Epidemic Models', 'Eco-epidemiological Systems', 'Bifurcation & Stability Analysis', 'Optimal Vaccination Strategies'],
    facultyInvolved: ['Dr. Anamika Das'],
    activeProjectsCount: 1
  },
  {
    id: 'res-5',
    title: 'Graph Theory & Chemical Graph Indices',
    iconName: 'GitBranch',
    description: 'Studying topological molecular descriptors, distance-based and degree-based graph indices, spectral graph properties, and their correlation with physico-chemical properties of nanostructures.',
    keyTopics: ['Topological Indices in QSAR', 'Spectral Graph Theory', 'Corona & Composite Graphs', 'Network Centrality'],
    facultyInvolved: ['Mr. Bhabesh Chandra Medhi'],
    activeProjectsCount: 1
  },
  {
    id: 'res-6',
    title: 'Applied Statistics & Stochastic Queuing',
    iconName: 'BarChart3',
    description: 'Development of stochastic models, queuing theory with server breakdowns, reliability engineering, and time-series statistical modeling for agro-climatic datasets in Northeast India.',
    keyTopics: ['M/G/1 Vacation Queues', 'Time Series Forecasting', 'Reliability Modeling', 'Statistical Quality Control'],
    facultyInvolved: ['Dr. Hirendra Nath Roy'],
    activeProjectsCount: 2
  },
  {
    id: 'res-7',
    title: 'Functional Analysis & Operator Theory',
    iconName: 'Layers',
    description: 'Research into fixed point theorems in generalized metric spaces, frames and wavelets in Hilbert spaces, and spectral theory of bounded linear operators.',
    keyTopics: ['Fixed Point Theorems in b-Metric Spaces', 'Continuous Wavelet Transforms', 'Frame Theory', 'Hilbert Space Operators'],
    facultyInvolved: ['Ms. Ritu Moni Bora'],
    activeProjectsCount: 1
  },
  {
    id: 'res-8',
    title: 'Computational Mathematics & Numerical Modeling',
    iconName: 'Cpu',
    description: 'Developing high-accuracy compact finite difference algorithms, parallel scientific computing with Python, and numerical solutions for nonlinear partial differential equations.',
    keyTopics: ['Compact Finite Differences', 'Numerical Solutions of PDEs', 'Scientific Python Simulations', 'Finite Element Analysis'],
    facultyInvolved: ['Mr. Kalyan Jyoti Nath', 'Dr. Mukul Chandra Kalita'],
    activeProjectsCount: 1
  }
];

export const RESEARCH_PUBLICATIONS: Publication[] = [
  {
    id: 'pub-1',
    title: 'Effects of radiation and chemical reaction on unsteady MHD flow past an infinite vertical plate with variable temperature',
    authors: 'Dr. Mukul Chandra Kalita, et al.',
    journal: 'International Journal of Applied Mechanics and Engineering',
    year: 2024,
    doi: '10.2478/ijame-2024-0012',
    impactFactor: '1.85',
    type: 'Journal'
  },
  {
    id: 'pub-2',
    title: 'Stability and optimal control analysis of a vector-borne epidemic model with saturation incidence rate and treatment',
    authors: 'Dr. Anamika Das and B.K. Roy',
    journal: 'Mathematical Biosciences & Engineering (MBE)',
    year: 2024,
    doi: '10.3934/mbe.2024108',
    impactFactor: '2.6',
    type: 'Journal'
  },
  {
    id: 'pub-3',
    title: 'On certain partition identities related to Ramanujan’s third order mock theta functions',
    authors: 'Dr. Pranab Jyoti Rabha and N. Saikia',
    journal: 'The Ramanujan Journal (Springer)',
    year: 2024,
    doi: '10.1007/s11139-023-00789-x',
    impactFactor: '0.94',
    type: 'Journal'
  },
  {
    id: 'pub-4',
    title: 'Separation Axioms in Intuitionistic Fuzzy Soft Topological Spaces with Multi-criteria Applications',
    authors: 'Dr. Dipankar Sarma',
    journal: 'Annals of Fuzzy Mathematics and Informatics',
    year: 2023,
    doi: '10.30948/afmi.2023.25.1.45',
    impactFactor: '1.12',
    type: 'Journal'
  },
  {
    id: 'pub-5',
    title: 'Computation of Topological Indices for Carbon Nanotubes and Dendrimer Nanostars in QSAR Studies',
    authors: 'Mr. Bhabesh Chandra Medhi and P. Dutta',
    journal: 'Discrete Applied Mathematics (Elsevier)',
    year: 2023,
    doi: '10.1016/j.dam.2023.04.019',
    impactFactor: '1.4',
    type: 'Journal'
  },
  {
    id: 'pub-6',
    title: 'Common fixed point results for contractive type mappings in generalized b-metric spaces',
    authors: 'Ms. Ritu Moni Bora and D. Sarma',
    journal: 'Fixed Point Theory and Algorithms for Sciences and Engineering',
    year: 2023,
    doi: '10.1186/s13663-023-00741-2',
    impactFactor: '1.5',
    type: 'Journal'
  }
];

export const RESEARCH_PROJECTS: ResearchProject[] = [
  {
    id: 'proj-1',
    title: 'Mathematical Investigation of Thermal Radiation Effects on MHD Flows in Porous Channels',
    fundingAgency: 'UGC (University Grants Commission) Minor Research Grant',
    grantAmount: '₹3,85,000',
    investigator: 'Dr. Mukul Chandra Kalita (PI)',
    duration: '2023 – 2025',
    status: 'Ongoing'
  },
  {
    id: 'proj-2',
    title: 'Computational Study of Ramanujan Partition Identities & Modular Forms',
    fundingAgency: 'ASTEC (Assam Science Technology & Environment Council)',
    grantAmount: '₹2,50,000',
    investigator: 'Dr. Pranab Jyoti Rabha (PI)',
    duration: '2024 – 2026',
    status: 'Ongoing'
  },
  {
    id: 'proj-3',
    title: 'Statistical Modeling of Hydro-Climatic Extremes in Lower Brahmaputra Basin',
    fundingAgency: 'Institutional Research Promotion Scheme, Dudhnoi College',
    grantAmount: '₹1,20,000',
    investigator: 'Dr. Hirendra Nath Roy (PI)',
    duration: '2022 – 2024',
    status: 'Completed'
  }
];

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'evt-1',
    title: 'National Mathematics Day & Ramanujan Memorial Symposium 2026',
    category: 'National Math Day',
    date: 'December 22, 2026',
    time: '9:30 AM – 4:30 PM (IST)',
    venue: 'College Auditorium & Mathematics Gallery, Dudhnoi College',
    speaker: 'Prof. Nayandeep Deka Baruah (Tezpur University) & Eminent Mathematicians',
    speakerAffiliation: 'Senior Professor of Mathematics, Tezpur Central University',
    description: 'An annual flagship celebration commemorating the 139th birth anniversary of legendary mathematician Srinivasa Ramanujan. Features keynote lectures on Ramanujan’s legacy, inter-college mathematical quiz, problem-solving marathon, and exhibition of student wall-magazine "Ganit Probha".',
    isUpcoming: true,
    registrationOpen: true,
    registrationDeadline: 'December 18, 2026',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800',
    coordinator: 'Dr. Pranab Jyoti Rabha (Convener)'
  },
  {
    id: 'evt-2',
    title: '3-Day National Workshop on Scientific Computing with Python & SageMath',
    category: 'Workshop',
    date: 'September 14 – 16, 2026',
    time: '10:00 AM – 3:30 PM (Daily)',
    venue: 'Departmental Computing Lab (Science Block)',
    speaker: 'Dr. Anupam Saikia (IIT Guwahati) & Team',
    speakerAffiliation: 'Department of Mathematics, Indian Institute of Technology Guwahati',
    description: 'Intensive hands-on computational workshop covering NumPy, SciPy, SymPy, numerical methods, differential equations solving, and SageMath for abstract algebra. Open for undergraduate, postgraduate students, and faculty members.',
    isUpcoming: true,
    registrationOpen: true,
    registrationDeadline: 'September 10, 2026',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    coordinator: 'Mr. Kalyan Jyoti Nath (Coordinator)'
  },
  {
    id: 'evt-3',
    title: 'State-Level Inter-College Mathematics Olympiad 2026',
    category: 'Mathematics Olympiad',
    date: 'November 08, 2026',
    time: '11:00 AM – 1:30 PM (IST)',
    venue: 'Examination Hall 1 & 2, Dudhnoi College Center',
    speaker: 'Assam Academy of Mathematics (AAM) Officials',
    speakerAffiliation: 'Assam Academy of Mathematics Regional Chapter',
    description: 'Prestigious mathematical competition organized under the aegis of the Assam Academy of Mathematics to identify, nurture, and reward mathematical talent among higher secondary and undergraduate students across Assam and Meghalaya.',
    isUpcoming: true,
    registrationOpen: true,
    registrationDeadline: 'November 01, 2026',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=800',
    coordinator: 'Dr. Dipankar Sarma (Zonal Officer)'
  },
  {
    id: 'evt-4',
    title: 'Distinguished Guest Lecture: Mathematics in Artificial Intelligence & Quantum Computing',
    category: 'Guest Lecture',
    date: 'October 28, 2026',
    time: '2:00 PM – 4:00 PM',
    venue: 'Virtual Audio-Visual Seminar Hall',
    speaker: 'Prof. Subhashis Ray, Ph.D.',
    speakerAffiliation: 'Center for Quantum Mathematics, IISc Bengaluru',
    description: 'An illuminating seminar exploring how linear algebra, unitary matrices, tensor products, and high-dimensional probability form the foundational mathematics of quantum computing algorithms and modern transformer neural networks.',
    isUpcoming: true,
    registrationOpen: true,
    registrationDeadline: 'October 26, 2026',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
    coordinator: 'Ms. Ritu Moni Bora (Moderator)'
  },
  {
    id: 'evt-5',
    title: 'Orientation & Induction Program for B.Sc. 1st Semester Major Students',
    category: 'Orientation',
    date: 'August 02, 2026',
    time: '10:30 AM – 1:00 PM',
    venue: 'Smart Classroom 201, Science Block',
    speaker: 'Faculty Members & Alumni Mentors',
    speakerAffiliation: 'Department of Mathematics, Dudhnoi College',
    description: 'Welcoming the new batch of FYUGP NEP 2020 mathematics major students. Familiarization with syllabus structure, departmental library, computational lab rules, mentor-mentee system, and Ramanujan Club activities.',
    isUpcoming: false,
    registrationOpen: false,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    coordinator: 'Dr. Mukul Chandra Kalita (HOD)'
  },
  {
    id: 'evt-6',
    title: 'Weekly Departmental Research Colloquium Series',
    category: 'Colloquium',
    date: 'Every Friday',
    time: '3:00 PM – 4:00 PM',
    venue: 'Mathematics Seminar Room',
    speaker: 'Faculty Members & PG Students',
    speakerAffiliation: 'Department of Mathematics',
    description: 'A vibrant weekly forum where faculty and senior students present recent research papers, open conjectures, dissertation progress, and historical perspectives in mathematics.',
    isUpcoming: true,
    registrationOpen: false,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    coordinator: 'Dr. Anamika Das'
  }
];

export const NOTICES_DATA: NoticeItem[] = [
  {
    id: 'not-1',
    title: 'Notice regarding B.Sc. 2nd & 4th Semester (FYUGP) Sessional Examination Schedule, 2026',
    date: 'August 18, 2026',
    category: 'Examination',
    isNew: true,
    isUrgent: true,
    refNo: 'DC/MATH/EXAM/2026/04',
    description: 'It is hereby notified to all students of B.Sc. 2nd and 4th Semester (Major, Minor & Multidisciplinary) that the First Sessional Examination in Mathematics will commence from August 28, 2026. The detailed paper-wise schedule and seating plan are displayed on the departmental notice board.',
    downloadUrl: '#',
    fileSize: '412 KB (PDF)'
  },
  {
    id: 'not-2',
    title: 'Registration Open for State Level Mathematics Olympiad (Undergraduate & HS Categories)',
    date: 'August 15, 2026',
    category: 'Latest Notices',
    isNew: true,
    refNo: 'DC/MATH/AAM/2026/02',
    description: 'Students aspiring to participate in the Assam Academy of Mathematics (AAM) State Level Mathematics Olympiad 2026 can submit their registration forms along with enrollment fee of ₹100 to Dr. Dipankar Sarma (Zonal Center In-charge) on or before September 20, 2026.',
    downloadUrl: '#',
    fileSize: '650 KB (PDF)'
  },
  {
    id: 'not-3',
    title: 'Departmental Circular: Submission of Minor Project Proposals for B.Sc. 5th Semester Major',
    date: 'August 10, 2026',
    category: 'Circular',
    isNew: true,
    refNo: 'DC/MATH/PROJ/2026/08',
    description: 'All 5th Semester Major students are directed to submit their project synopsis (maximum 2 pages) and faculty supervisor preference list by August 25, 2026. Topics can be chosen from Pure Mathematics, Applied Numerical Modeling, Statistics, or Cryptography.',
    downloadUrl: '#',
    fileSize: '320 KB (PDF)'
  },
  {
    id: 'not-4',
    title: 'Call for Articles, Puzzles & Essays for Departmental Annual Magazine "Ganit Probha" Vol. XII',
    date: 'July 28, 2026',
    category: 'Latest Notices',
    isNew: false,
    refNo: 'DC/MATH/MAG/2026/01',
    description: 'The Editorial Board invites articles, biographies of mathematicians, challenging problems, original poems, and mathematical humor from college students and alumni for the upcoming edition of "Ganit Probha". Send submissions to math.magazine@dudhnoicollege.ac.in.',
    downloadUrl: '#',
    fileSize: '510 KB (PDF)'
  },
  {
    id: 'not-5',
    title: 'Merit List & Counselling Notification for M.Sc. Mathematics Admissions (Session 2026-27)',
    date: 'July 15, 2026',
    category: 'Admissions',
    isNew: false,
    isUrgent: false,
    refNo: 'DC/MATH/ADM/2026/01',
    description: 'The provisional merit list for admission into M.Sc. Mathematics 1st Semester under Gauhati University affiliation has been published. Selected candidates are requested to appear for document verification with original credentials on July 22, 2026.',
    downloadUrl: '#',
    fileSize: '890 KB (PDF)'
  },
  {
    id: 'not-6',
    title: 'Workshop Notice: 3-Day Skill Enhancement Training on LaTeX for Scientific Writing',
    date: 'June 30, 2026',
    category: 'Seminars & Workshops',
    isNew: false,
    refNo: 'DC/MATH/SEC/2026/03',
    description: 'Hands-on workshop for preparing project dissertations, research posters, and mathematical equations using Overleaf and TeXstudio. Compulsory for all 3rd and 5th Semester Major students.',
    downloadUrl: '#',
    fileSize: '380 KB (PDF)'
  }
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [];

export const GALLERY_DATA: GalleryItem[] = [];

export const FAMOUS_QUOTES = [
  {
    quote: "Pure mathematics is, in its way, the poetry of logical ideas.",
    author: "Albert Einstein",
    role: "Theoretical Physicist"
  },
  {
    quote: "An equation for me has no meaning unless it expresses a thought of God.",
    author: "Srinivasa Ramanujan",
    role: "Legendary Indian Mathematician"
  },
  {
    quote: "Mathematics is the queen of the sciences and number theory is the queen of mathematics.",
    author: "Carl Friedrich Gauss",
    role: "Prince of Mathematicians"
  },
  {
    quote: "The essence of mathematics lies in its freedom.",
    author: "Georg Cantor",
    role: "Founder of Set Theory"
  }
];

export const DEFAULT_DEPARTMENT_STUDENTS: DepartmentStudent[] = [];

export const DEFAULT_STUDENT_PROFILES: StudentProfile[] = [];

export const STUDENT_RESOURCES: StudentResource[] = [
  {
    id: 'res-1',
    title: 'Gauhati University FYUGP Syllabus (NEP 2020)',
    category: 'Syllabus',
    description: 'Complete 4-Year Undergraduate Program curriculum, credit structure, and course outcomes for Mathematics Major and Minor.',
    fileType: 'PDF (2.4 MB)',
    downloadLink: 'https://dudhnoicollege.ac.in/syllabus/math-fyugp-2024.pdf',
    semester: 'All Semesters',
    uploadedDate: 'Aug 10, 2026'
  },
  {
    id: 'res-2',
    title: 'Previous Years Question Papers (2018 - 2025)',
    category: 'Question Bank',
    description: 'Semester-wise archived university question papers with model solution keys and answer guidelines.',
    fileType: 'ZIP Archive (14.2 MB)',
    downloadLink: 'https://dudhnoicollege.ac.in/resources/pyq-math-archive.zip',
    semester: 'B.Sc. Major & Minor',
    uploadedDate: 'Jul 24, 2026'
  },
  {
    id: 'res-3',
    title: 'Computational Mathematics Lab Manual (Python & Scilab)',
    category: 'Lab Manual',
    description: 'Step-by-step practical algorithms, source codes, and test exercises for numerical analysis and plotting.',
    fileType: 'PDF (3.8 MB)',
    downloadLink: 'https://dudhnoicollege.ac.in/manuals/python-numerical-lab.pdf',
    semester: '3rd & 5th Semester',
    uploadedDate: 'Aug 02, 2026'
  },
  {
    id: 'res-4',
    title: 'LaTeX Dissertation & Assignment Template',
    category: 'Templates',
    description: 'Standard Overleaf/TeXstudio document template tailored for Dudhnoi College departmental projects.',
    fileType: 'ZIP Template (1.1 MB)',
    downloadLink: 'https://dudhnoicollege.ac.in/templates/dudhnoi-math-thesis.zip',
    semester: 'All Semesters',
    uploadedDate: 'Jun 15, 2026'
  },
  {
    id: 'res-5',
    title: 'IIT JAM & CSIR-NET Recommended Reading List',
    category: 'Competitive Exams',
    description: 'Curated list of standard reference textbooks, topic-wise weightage, and past 10 years trend analysis.',
    fileType: 'PDF (850 KB)',
    downloadLink: 'https://dudhnoicollege.ac.in/career/jam-net-math-guide.pdf',
    semester: '5th & 6th Sem / PG',
    uploadedDate: 'Jul 30, 2026'
  },
  {
    id: 'res-6',
    title: 'Class Routine & Laboratory Schedule (Autumn 2026)',
    category: 'Schedule',
    description: 'Official weekly master timetable for B.Sc. 1st, 3rd, and 5th Semester Major & Minor theory and practical classes.',
    fileType: 'PDF (320 KB)',
    downloadLink: 'https://dudhnoicollege.ac.in/schedules/math-autumn-2026.pdf',
    semester: 'Autumn 2026',
    uploadedDate: 'Aug 01, 2026'
  }
];

export const DEFAULT_ROUTINE_SLOTS: RoutineSlot[] = [
  {
    id: 'slot-1',
    timeSlot: '09:15 - 10:15 AM',
    day: 'Monday - Saturday',
    sem1: { course: 'Calculus & Analytical Geometry (Dr. B. Kalita)', type: 'Major' },
    sem2: { course: 'Vector Calculus & Geometry', type: 'Minor' },
    sem3: { course: 'Real Analysis & Metric Spaces (Dr. M. Dutta)', type: 'Major' },
    sem4: { course: 'Partial Differential Equations', type: 'Major/Minor' },
    sem5: { course: 'Complex Analysis & Measure Theory (Dr. T. Das)', type: 'Major' },
    sem6: { course: 'Advanced Linear Algebra', type: 'Major' }
  },
  {
    id: 'slot-2',
    timeSlot: '10:15 - 11:15 AM',
    day: 'Monday - Saturday',
    sem1: { course: 'Algebra & Coordinate Geometry (Dr. P. Rabha)', type: 'Major' },
    sem2: { course: 'Linear Algebra Basics', type: 'Major/Minor' },
    sem3: { course: 'Abstract Algebra & Group Theory (Dr. T. Das)', type: 'Major' },
    sem4: { course: 'Ring Theory & Linear Algebra', type: 'Major' },
    sem5: { course: 'Mechanics & Hydrodynamics (Dr. M. Kalita)', type: 'Major' },
    sem6: { course: 'Numerical Methods & C++', type: 'Major/Minor' }
  },
  {
    id: 'slot-3',
    timeSlot: '11:15 - 12:15 PM',
    day: 'Monday - Saturday',
    sem1: { course: 'Elementary Trigonometry & Matrices', type: 'Minor' },
    sem2: { course: 'Differential Equations', type: 'Minor' },
    sem3: { course: 'Differential Equations & Systems', type: 'Major' },
    sem4: { course: 'Riemann Integration & Series', type: 'Major/Minor' },
    sem5: { course: 'Topology & Functional Analysis', type: 'Major' },
    sem6: { course: 'Mathematical Modeling & Graph Theory', type: 'Major' }
  },
  {
    id: 'slot-4',
    timeSlot: '01:00 - 03:00 PM',
    day: 'Monday - Friday',
    sem1: { course: 'Python Programming Lab (Lab A)', type: 'Major/Minor' },
    sem2: { course: 'Mathematical Software Lab', type: 'Minor' },
    sem3: { course: 'Numerical Analysis & Scilab Lab (Mr. K. Nath)', type: 'Major' },
    sem4: { course: 'C++ & Python Practical Lab', type: 'Major/Minor' },
    sem5: { course: 'Research Project Supervision (Lab B)', type: 'Major' },
    sem6: { course: 'Dissertation & Seminar Presentation', type: 'Major' }
  }
];

export const DEFAULT_GRIEVANCES: StudentGrievance[] = [];

export const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Unreasonable Effectiveness of Python in Undergraduate Applied Mathematics',
    slug: 'python-in-undergraduate-applied-mathematics',
    category: 'Computational Math & Tech',
    authorName: 'Dr. Mridul Dutta',
    authorRole: 'Faculty',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    date: 'August 14, 2026',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    excerpt: 'How our laboratory curriculum at Dudhnoi College bridges pure abstract mathematical theory with NumPy, SciPy, and Matplotlib simulations for modern FYUGP students.',
    content: `When students first encounter the Navier-Stokes equations or the eigenvalues of high-dimensional matrices, the abstraction can sometimes feel detached from empirical intuition. Over the past three semesters in our Dudhnoi College Mathematics Computing Facility, we transitioned traditional paper-and-pencil numerical methods into living, interactive Python simulations.

### 1. Visualizing Bifurcations & Chaotic Attractors
Using simple Python libraries like NumPy and Matplotlib, 3rd-semester major students coded the Lorenz attractor and observed how a minute delta in initial parameters leads to deterministic divergence. This hands-on computational proof reinforced dynamic systems theory far better than static textbook graphs.

### 2. Solving Stiff Boundary Value Problems
In our MAT-SE-4014 course, we introduced SciPy's \`solve_bvp\` and \`odeint\`. Students solved non-linear boundary layer fluid flows and verified the convergence of shooting methods against finite difference discretizations.

### 3. Open Source Accessibility
Unlike proprietary proprietary packages, Python equips every student with an industry-standard toolkit that they can install on their personal laptops or run via Google Colab without financial barriers.

As we continue to modernize the FYUGP curriculum under Gauhati University guidelines, computational fluency will remain a core pillar of our departmental training.`,
    tags: ['Python', 'Computational Math', 'Differential Equations', 'FYUGP', 'NumPy'],
    likesCount: 38,
    featured: true
  },
  {
    id: 'blog-2',
    title: 'Srinivasa Ramanujan: The Immortal Intuitions That Still Shape Modern Number Theory',
    slug: 'ramanujan-immortal-intuitions-modern-number-theory',
    category: 'History of Math',
    authorName: 'Dr. Bidyut Kalita',
    authorRole: 'Faculty',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    date: 'July 29, 2026',
    readTime: '8 min read',
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
    excerpt: 'An exploration of Ramanujan’s modular forms, partition congruences, and mock theta functions, celebrating India’s rich mathematical lineage.',
    content: `On every National Mathematics Day, our department gathers to reflect upon the breathtaking genius of Srinivasa Ramanujan (1887–1920). Ramanujan worked in near-total isolation before writing his historic 1913 letter to G.H. Hardy at Cambridge University.

### The Mystery of the Partition Function $p(n)$
Prior to Hardy and Ramanujan's collaboration, calculating the number of partitions of an integer $n$ was regarded as intractable for large values. Through the groundbreaking 'Circle Method', they formulated the asymptotic formula:
$$p(n) \\sim \\frac{1}{4n\\sqrt{3}} \\exp\\left(\\pi \\sqrt{\\frac{2n}{3}}\\right)$$
This formula laid the foundation for modern analytic number theory and spectral analysis in theoretical physics.

### Mock Theta Functions in Modern String Theory
In the final months of his life, Ramanujan wrote about 'mock theta functions'—mathematical objects whose true modular properties were only fully deciphered by mathematicians eighty years later. Today, they are instrumental in quantum gravity and black hole entropy calculations.

At Dudhnoi College, our Ramanujan Math Club actively invites undergraduate scholars to dive into partition congruences and prime distributions, keeping his spirit of intellectual wonder alive.`,
    tags: ['Ramanujan', 'Number Theory', 'Math History', 'Partitions', 'Analytic Math'],
    likesCount: 54,
    featured: true
  },
  {
    id: 'blog-3',
    title: 'Cracking the IIT JAM & CSIR-NET: A Step-by-Step Strategic Roadmap for B.Sc. Students',
    slug: 'cracking-iit-jam-csir-net-mathematics-strategy',
    category: 'Olympiad & Problem Solving',
    authorName: 'Dr. Tushar Kanti Das',
    authorRole: 'Faculty',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    date: 'June 18, 2026',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Proven guidance from faculty mentors on tackling Real Analysis, Abstract Algebra, and Linear Algebra for national competitive master and doctoral entrance examinations.',
    content: `Every year, undergraduate students from Goalpara and surrounding districts aspire to secure admissions into premier institutes like IISc, IITs, TIFR, and central universities through IIT JAM and GATE. Here is our departmental roadmap to systematically prepare:

### 1. Linear Algebra: The Scoring Engine
Linear Algebra offers the highest return on investment. Focus heavily on:
- Vector spaces, bases, and dimension theorems
- Minimal polynomials, Jordan canonical forms, and diagonalization
- Inner product spaces and Gram-Schmidt orthogonalization

### 2. Real Analysis: Conceptual Precision Over Speed
Never memorize theorems without constructing counter-examples. Practice proving continuity with epsilon-delta definitions, uniform convergence of function sequences, and Riemann-Stieltjes integrability.

### 3. Weekly Problem Solving Circles
Join the departmental peer study circles in Room 104 every Friday afternoon. Solving past 10-year question papers under timed conditions builds exam temperament and minimizes negative marking.`,
    tags: ['IIT JAM', 'CSIR NET', 'Competitive Exams', 'Career Guidance', 'Linear Algebra'],
    likesCount: 42,
    featured: false
  },
  {
    id: 'blog-4',
    title: 'My Journey Developing an Epidemic SIR Model with Variable Transmission Rates',
    slug: 'epidemic-sir-model-variable-transmission-rates',
    category: 'Student Articles',
    authorName: 'Ankur Jyoti Rabha',
    authorRole: 'Student',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
    date: 'May 22, 2026',
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=800',
    excerpt: 'A student reflection on modeling infectious disease spread in regional populations using systems of coupled non-linear differential equations.',
    content: `During my 4th semester project guided by Dr. Anamika Das, I set out to model how public awareness campaigns influence infection peaks in compartmental epidemiology.

### Formulating the System
Instead of a constant transmission parameter $\\beta$, we introduced a time-dependent awareness function $\\beta(t) = \\beta_0 e^{-\\alpha I(t)}$. The non-linear feedback loop produced intriguing damped oscillatory curves that mirrored real-world demographic health interventions.

### What I Learned
Beyond writing the LaTeX paper, this project taught me that mathematics is not an isolated discipline—it is a language capable of saving lives and guiding policy decisions. I am immensely grateful to the departmental computing facilities and faculty mentors for their constant support.`,
    tags: ['Biomathematics', 'Epidemiology', 'Student Project', 'Differential Equations'],
    likesCount: 29,
    featured: false
  }
];

