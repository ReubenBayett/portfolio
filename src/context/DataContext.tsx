import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const DATA_VERSION = '2024-04-21-v4'; // Increment this to force reset cache

// Types
export interface AboutData {
  name: string;
  title: string;
  bio: string;
  location: string;
  experience: string;
  focus: string;
  availability: string;
  stats: {
    linesOfCode: string;
    coffeeCups: string;
    happyClients: string;
    projects: string;
  };
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  companyUrl: string;
  location: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  tech: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  live: string;
  featured: boolean;
  overview?: string;
  role?: string;
  duration?: string;
  year?: string;
  features?: string[];
  challenges?: { challenge: string; solution: string }[];
  images?: string[];
  video?: string;
}

export interface SkillItem {
  name: string;
  category: string;
  level: number;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
}

export interface HeroData {
  greeting: string;
  name: string;
  tagline: string;
  description: string;
}

interface DataContextType {
  hero: HeroData;
  about: AboutData;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillItem[];
  contact: ContactInfo;
  updateHero: (data: HeroData) => void;
  updateAbout: (data: AboutData) => void;
  addExperience: (exp: ExperienceItem) => void;
  updateExperience: (id: number, exp: ExperienceItem) => void;
  deleteExperience: (id: number) => void;
  addProject: (project: ProjectItem) => void;
  updateProject: (id: string, project: ProjectItem) => void;
  deleteProject: (id: string) => void;
  addSkill: (skill: SkillItem) => void;
  updateSkill: (name: string, skill: SkillItem) => void;
  deleteSkill: (name: string) => void;
  updateContact: (data: ContactInfo) => void;
  resetAllData: () => void;
}

const defaultHero: HeroData = {
  greeting: 'HELLO_WORLD',
  name: 'REUBEN_BAYETT',
  tagline: 'SOFTWARE_DEVELOPER',
  description: "Accomplished Software Developer with a strong foundation in delivering exceptional results. 3+ years of hands-on experience in fast-paced environments.",
};

const defaultAbout: AboutData = {
  name: 'Reuben Bayett',
  title: 'Software Developer',
  bio: "Accomplished Software Developer with a strong foundation in delivering exceptional results. 3+ years of hands-on experience in fast-paced environments. I am committed to continuous learning and staying ahead of industry trends, turning complex problems into scalable digital solutions.",
  location: 'South Africa',
  experience: '3+ years',
  focus: 'Full-Stack Development',
  availability: 'Open to new opportunities',
  stats: {
    linesOfCode: '300K+',
    coffeeCups: '1,500+',
    happyClients: '20+',
    projects: '15+',
  },
};

const defaultExperiences: ExperienceItem[] = [
  {
    id: 1,
    role: 'SOFTWARE_DEVELOPER',
    company: 'Free State Department of Health',
    companyUrl: 'https://www.health.fs.gov.za/',
    location: 'Free State, SA',
    period: 'APR 2024 - PRESENT',
    type: 'Full-time',
    description: 'Leading the end-to-end development of a departmental service desk system serving over 10,000 users.',
    achievements: [
      'Co-led the development of a departmental service desk system for 10,000+ users',
      'Engineered robust internal APIs ensuring seamless data flow across organizational infrastructure',
      'Spearheaded technical excellence through rigorous code reviews and comprehensive unit testing',
      'Designed and implemented scalable solutions improving internal support workflows and efficiency',
    ],
    tech: ['React', 'Node.js', 'SQL', 'PostgreSQL', 'API Design', 'Testing'],
  },
  {
    id: 2,
    role: 'SOFTWARE_DEVELOPER',
    company: 'Self-Employed (Freelance)',
    companyUrl: '#',
    location: 'Remote',
    period: 'JAN 2023 - PRESENT',
    type: 'Freelance',
    description: 'Engineering and deploying end-to-end web applications for various clients using modern stacks.',
    achievements: [
      'Engineered and deployed end-to-end web applications using MongoDB, Express.js, React, and Node.js',
      'Developed secure RESTful APIs with JWT authentication and integrated Stripe and AWS S3',
      'Improved frontend rendering speeds by implementing React hooks, code-splitting, and optimized Redux',
      'Managed project timelines using Agile methodologies and translated business needs into technical specs',
    ],
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Stripe', 'AWS', 'Redux'],
  },
];

const defaultProjects: ProjectItem[] = [
  {
    id: 'taskflow',
    title: 'TASKFLOW',
    description: 'A modern project management app with real-time collaboration features.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'],
    github: '#',
    live: '#',
    featured: true,
    overview: 'A comprehensive project management solution designed for remote teams. It features real-time collaboration, drag-and-drop task boards, and detailed analytics.',
    role: 'Lead Developer',
    duration: '6 months',
    year: '2024',
    features: ['Real-time sync', 'Kanban boards', 'Team chat'],
    challenges: [{ challenge: 'Real-time sync', solution: 'Used Socket.io' }],
    images: ['https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800'],
  },
  {
    id: 'cryptowatch',
    title: 'CRYPTOWATCH',
    description: 'Real-time cryptocurrency tracking dashboard with portfolio management.',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&h=400&fit=crop',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    github: '#',
    live: '#',
    featured: true,
    overview: 'Provides real-time price tracking and portfolio management for crypto assets.',
    role: 'Full-Stack Developer',
    duration: '3 months',
    year: '2023',
    features: ['Live price updates', 'Portfolio tracking'],
    challenges: [{ challenge: 'API Limits', solution: 'Implemented caching' }],
    images: ['https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800'],
  },
];

const defaultSkills: SkillItem[] = [
  { name: 'C#', category: 'Backend', level: 85 },
  { name: 'ASP.NET', category: 'Backend', level: 82 },
  { name: 'React', category: 'Frontend', level: 92 },
  { name: 'TypeScript', category: 'Languages', level: 88 },
  { name: 'Node.js', category: 'Backend', level: 90 },
  { name: 'AWS', category: 'Cloud', level: 78 },
  { name: 'Azure', category: 'Cloud', level: 75 },
  { name: 'PostgreSQL', category: 'Database', level: 85 },
  { name: 'MongoDB', category: 'Database', level: 85 },
  { name: 'Python', category: 'Languages', level: 80 },
  { name: 'Docker', category: 'DevOps', level: 75 },
  { name: 'Tailwind CSS', category: 'Frontend', level: 90 },
  { name: 'Git', category: 'Tools', level: 92 },
];

const defaultContact: ContactInfo = {
  email: 'reubenbayett@gmail.com',
  phone: '0624423790',
  location: 'South Africa',
  github: 'https://github.com/ReubenBayett',
  linkedin: 'https://linkedin.com/in/reubenbayett',
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [hero, setHero] = useState<HeroData>(() => {
    const saved = localStorage.getItem('portfolio_hero');
    return saved ? JSON.parse(saved) : defaultHero;
  });

  const [about, setAbout] = useState<AboutData>(() => {
    const saved = localStorage.getItem('portfolio_about');
    return saved ? JSON.parse(saved) : defaultAbout;
  });

  const [experiences, setExperiences] = useState<ExperienceItem[]>(() => {
    const saved = localStorage.getItem('portfolio_experiences');
    return saved ? JSON.parse(saved) : defaultExperiences;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem('portfolio_projects');
    return saved ? JSON.parse(saved) : defaultProjects;
  });

  const [skills, setSkills] = useState<SkillItem[]>(() => {
    const saved = localStorage.getItem('portfolio_skills');
    return saved ? JSON.parse(saved) : defaultSkills;
  });

  const [contact, setContact] = useState<ContactInfo>(() => {
    const saved = localStorage.getItem('portfolio_contact');
    return saved ? JSON.parse(saved) : defaultContact;
  });

  // Handle Cache Invalidation / Versioning
  useEffect(() => {
    const storedVersion = localStorage.getItem('portfolio_data_version');
    
    if (storedVersion !== DATA_VERSION) {
      console.log('New data version detected. Resetting cache to current resume details...');
      
      // Clear specific portfolio keys
      const keysToClear = [
        'portfolio_hero',
        'portfolio_about',
        'portfolio_experience',
        'portfolio_projects',
        'portfolio_skills',
        'portfolio_contact'
      ];
      
      keysToClear.forEach(key => localStorage.removeItem(key));
      
      // Update version
      localStorage.setItem('portfolio_data_version', DATA_VERSION);
      
      // Reset state to current defaults
      setHero(defaultHero);
      setAbout(defaultAbout);
      setExperiences(defaultExperiences);
      setProjects(defaultProjects);
      setSkills(defaultSkills);
      setContact(defaultContact);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('portfolio_hero', JSON.stringify(hero));
  }, [hero]);

  useEffect(() => {
    localStorage.setItem('portfolio_about', JSON.stringify(about));
  }, [about]);

  useEffect(() => {
    localStorage.setItem('portfolio_experiences', JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio_skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('portfolio_contact', JSON.stringify(contact));
  }, [contact]);

  const updateHero = (data: HeroData) => setHero(data);
  const updateAbout = (data: AboutData) => setAbout(data);

  const addExperience = (exp: ExperienceItem) => {
    setExperiences([exp, ...experiences]);
  };

  const updateExperience = (id: number, exp: ExperienceItem) => {
    setExperiences(experiences.map(e => e.id === id ? exp : e));
  };

  const deleteExperience = (id: number) => {
    setExperiences(experiences.filter(e => e.id !== id));
  };

  const addProject = (project: ProjectItem) => {
    setProjects([project, ...projects]);
  };

  const updateProject = (id: string, project: ProjectItem) => {
    setProjects(projects.map(p => p.id === id ? project : p));
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const addSkill = (skill: SkillItem) => {
    setSkills([...skills, skill]);
  };

  const updateSkill = (name: string, skill: SkillItem) => {
    setSkills(skills.map(s => s.name === name ? skill : s));
  };

  const deleteSkill = (name: string) => {
    setSkills(skills.filter(s => s.name !== name));
  };

  const updateContact = (data: ContactInfo) => setContact(data);

  const resetAllData = () => {
    if (window.confirm('Are you sure you want to reset all data to defaults? Your custom CMS edits will be lost.')) {
      localStorage.setItem('portfolio_data_version', 'force_reset_' + Date.now());
      window.location.reload();
    }
  };

  return (
    <DataContext.Provider value={{
      hero,
      about,
      experiences,
      projects,
      skills,
      contact,
      updateHero,
      updateAbout,
      addExperience,
      updateExperience,
      deleteExperience,
      addProject,
      updateProject,
      deleteProject,
      addSkill,
      updateSkill,
      deleteSkill,
      updateContact,
      resetAllData,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
