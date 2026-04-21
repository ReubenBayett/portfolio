import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiHome, FiUser, FiBriefcase, FiFolder, FiCode, FiMail, 
  FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiLock, FiUnlock,
  FiChevronRight, FiArrowLeft
} from 'react-icons/fi';
import { useData, ExperienceItem, ProjectItem, SkillItem } from '../context/DataContext';

const CMS = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeSection, setActiveSection] = useState('hero');
  
  const { 
    hero, about, experiences, projects, skills, contact,
    updateHero, updateAbout, 
    addExperience, updateExperience, deleteExperience,
    addProject, updateProject, deleteProject,
    addSkill, updateSkill, deleteSkill,
    updateContact
  } = useData();

  // Simple password check (in real app, use proper auth)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('cms_auth', 'true');
    } else {
      alert('Incorrect password. Hint: admin123');
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem('cms_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('cms_auth');
  };

  const sections = [
    { id: 'hero', label: 'Hero', icon: FiHome },
    { id: 'about', label: 'About', icon: FiUser },
    { id: 'experience', label: 'Experience', icon: FiBriefcase },
    { id: 'projects', label: 'Projects', icon: FiFolder },
    { id: 'skills', label: 'Skills', icon: FiCode },
    { id: 'contact', label: 'Contact', icon: FiMail },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-md"
        >
          <div className="text-center mb-8">
            <FiLock className="w-12 h-12 mx-auto mb-4" />
            <h1 className="font-pixel text-xl mb-2">CMS_LOGIN</h1>
            <p className="font-mono text-sm text-gray-600">Enter password to access the CMS</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 border-4 border-black font-mono 
                focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4"
            />
            <button
              type="submit"
              className="w-full font-pixel text-sm px-6 py-3 border-4 border-black 
                bg-black text-white hover:bg-white hover:text-black transition-colors"
            >
              UNLOCK
            </button>
          </form>
          
          <Link
            to="/"
            className="flex items-center justify-center gap-2 mt-6 font-mono text-sm 
              text-gray-600 hover:text-black transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b-4 border-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-pixel text-lg hover:text-gray-600 transition-colors">
              PORTFOLIO_CMS
            </Link>
            <FiChevronRight className="w-4 h-4 text-gray-400" />
            <span className="font-mono text-gray-600">{activeSection.toUpperCase()}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 font-mono text-sm text-gray-600 
                hover:text-black transition-colors"
            >
              <FiHome className="w-4 h-4" />
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 font-pixel text-xs px-4 py-2 
                border-2 border-black hover:bg-black hover:text-white transition-colors"
            >
              <FiUnlock className="w-4 h-4" />
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar */}
        <nav className="w-64 flex-shrink-0">
          <div className="bg-white border-4 border-black p-4 sticky top-24">
            <h2 className="font-pixel text-sm mb-4">SECTIONS</h2>
            <ul className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 font-mono text-sm
                        border-2 border-black transition-all duration-200
                        ${activeSection === section.id 
                          ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                          : 'bg-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      {section.label}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 pt-6 border-t-2 border-black">
              <button
                onClick={() => {
                  if (window.confirm('This will reload the page and reset all portfolio content to the default resume details. Continue?')) {
                    localStorage.removeItem('portfolio_data_version');
                    window.location.reload();
                  }
                }}
                className="w-full flex items-center gap-2 px-4 py-2 font-pixel text-[10px] 
                  border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
              >
                <FiTrash2 className="w-3 h-3" />
                RESET_ALL_DATA
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            {activeSection === 'hero' && (
              <HeroEditor key="hero" data={hero} onSave={updateHero} />
            )}
            {activeSection === 'about' && (
              <AboutEditor key="about" data={about} onSave={updateAbout} />
            )}
            {activeSection === 'experience' && (
              <ExperienceEditor 
                key="experience" 
                data={experiences} 
                onAdd={addExperience}
                onUpdate={updateExperience}
                onDelete={deleteExperience}
              />
            )}
            {activeSection === 'projects' && (
              <ProjectsEditor 
                key="projects" 
                data={projects}
                onAdd={addProject}
                onUpdate={updateProject}
                onDelete={deleteProject}
              />
            )}
            {activeSection === 'skills' && (
              <SkillsEditor 
                key="skills" 
                data={skills}
                onAdd={addSkill}
                onUpdate={updateSkill}
                onDelete={deleteSkill}
              />
            )}
            {activeSection === 'contact' && (
              <ContactEditor key="contact" data={contact} onSave={updateContact} />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

// Hero Editor
const HeroEditor = ({ data, onSave }: { data: any; onSave: (data: any) => void }) => {
  const [formData, setFormData] = useState(data);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white border-4 border-black p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-pixel text-lg">EDIT_HERO</h2>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 font-pixel text-xs px-4 py-2 border-2 border-black
            transition-colors ${saved ? 'bg-green-500 text-white' : 'hover:bg-black hover:text-white'}`}
        >
          <FiSave className="w-4 h-4" />
          {saved ? 'SAVED!' : 'SAVE'}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="font-pixel text-xs mb-2 block">GREETING</label>
          <input
            type="text"
            value={formData.greeting}
            onChange={(e) => setFormData({ ...formData, greeting: e.target.value })}
            className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none 
              focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          />
        </div>
        <div>
          <label className="font-pixel text-xs mb-2 block">NAME</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none 
              focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          />
        </div>
        <div>
          <label className="font-pixel text-xs mb-2 block">TAGLINE</label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none 
              focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          />
        </div>
        <div>
          <label className="font-pixel text-xs mb-2 block">DESCRIPTION</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none 
              focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] resize-none"
          />
        </div>
      </div>
    </motion.div>
  );
};

// About Editor
const AboutEditor = ({ data, onSave }: { data: any; onSave: (data: any) => void }) => {
  const [formData, setFormData] = useState(data);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white border-4 border-black p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-pixel text-lg">EDIT_ABOUT</h2>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 font-pixel text-xs px-4 py-2 border-2 border-black
            transition-colors ${saved ? 'bg-green-500 text-white' : 'hover:bg-black hover:text-white'}`}
        >
          <FiSave className="w-4 h-4" />
          {saved ? 'SAVED!' : 'SAVE'}
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-pixel text-xs mb-2 block">NAME</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="font-pixel text-xs mb-2 block">TITLE</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="font-pixel text-xs mb-2 block">BIO</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none resize-none"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-pixel text-xs mb-2 block">LOCATION</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="font-pixel text-xs mb-2 block">EXPERIENCE</label>
            <input
              type="text"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="font-pixel text-xs mb-2 block">FOCUS</label>
            <input
              type="text"
              value={formData.focus}
              onChange={(e) => setFormData({ ...formData, focus: e.target.value })}
              className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="font-pixel text-xs mb-2 block">AVAILABILITY</label>
            <input
              type="text"
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
            />
          </div>
        </div>
        
        <h3 className="font-pixel text-sm mt-6 mb-3">STATS</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-pixel text-xs mb-2 block">LINES_OF_CODE</label>
            <input
              type="text"
              value={formData.stats.linesOfCode}
              onChange={(e) => setFormData({ 
                ...formData, 
                stats: { ...formData.stats, linesOfCode: e.target.value }
              })}
              className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="font-pixel text-xs mb-2 block">COFFEE_CUPS</label>
            <input
              type="text"
              value={formData.stats.coffeeCups}
              onChange={(e) => setFormData({ 
                ...formData, 
                stats: { ...formData.stats, coffeeCups: e.target.value }
              })}
              className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="font-pixel text-xs mb-2 block">HAPPY_CLIENTS</label>
            <input
              type="text"
              value={formData.stats.happyClients}
              onChange={(e) => setFormData({ 
                ...formData, 
                stats: { ...formData.stats, happyClients: e.target.value }
              })}
              className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="font-pixel text-xs mb-2 block">PROJECTS</label>
            <input
              type="text"
              value={formData.stats.projects}
              onChange={(e) => setFormData({ 
                ...formData, 
                stats: { ...formData.stats, projects: e.target.value }
              })}
              className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Experience Editor
const ExperienceEditor = ({ 
  data, 
  onAdd, 
  onUpdate, 
  onDelete 
}: { 
  data: ExperienceItem[]; 
  onAdd: (exp: ExperienceItem) => void;
  onUpdate: (id: number, exp: ExperienceItem) => void;
  onDelete: (id: number) => void;
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<ExperienceItem | null>(null);

  const handleEdit = (exp: ExperienceItem) => {
    setEditingId(exp.id);
    setFormData({ ...exp });
  };

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({
      id: Date.now(),
      role: '',
      company: '',
      companyUrl: '',
      location: '',
      period: '',
      type: 'Full-time',
      description: '',
      achievements: [''],
      tech: [],
    });
  };

  const handleSave = () => {
    if (!formData) return;
    
    if (isAdding) {
      onAdd(formData);
      setIsAdding(false);
    } else if (editingId) {
      onUpdate(editingId, formData);
      setEditingId(null);
    }
    setFormData(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-pixel text-lg">MANAGE_EXPERIENCE</h2>
        {!isAdding && !editingId && (
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 font-pixel text-xs px-4 py-2 
              border-2 border-black hover:bg-black hover:text-white transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            ADD_NEW
          </button>
        )}
      </div>

      {(isAdding || editingId) && formData && (
        <div className="bg-white border-4 border-black p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-pixel text-sm">{isAdding ? 'ADD_EXPERIENCE' : 'EDIT_EXPERIENCE'}</h3>
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 font-pixel text-xs px-3 py-2 
                  border-2 border-black hover:bg-gray-100 transition-colors"
              >
                <FiX className="w-4 h-4" />
                CANCEL
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1 font-pixel text-xs px-3 py-2 
                  border-2 border-black bg-black text-white hover:bg-gray-800 transition-colors"
              >
                <FiSave className="w-4 h-4" />
                SAVE
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-pixel text-xs mb-2 block">ROLE</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
                  placeholder="SENIOR_SOFTWARE_ENGINEER"
                />
              </div>
              <div>
                <label className="font-pixel text-xs mb-2 block">COMPANY</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="font-pixel text-xs mb-2 block">LOCATION</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
                />
              </div>
              <div>
                <label className="font-pixel text-xs mb-2 block">PERIOD</label>
                <input
                  type="text"
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
                  placeholder="2022 - PRESENT"
                />
              </div>
              <div>
                <label className="font-pixel text-xs mb-2 block">TYPE</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none bg-white"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
            </div>
            <div>
              <label className="font-pixel text-xs mb-2 block">DESCRIPTION</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none resize-none"
              />
            </div>
            <div>
              <label className="font-pixel text-xs mb-2 block">TECH_STACK (comma separated)</label>
              <input
                type="text"
                value={formData.tech.join(', ')}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  tech: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                })}
                className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
                placeholder="React, TypeScript, Node.js"
              />
            </div>
            <div>
              <label className="font-pixel text-xs mb-2 block">ACHIEVEMENTS (one per line)</label>
              <textarea
                value={formData.achievements.join('\n')}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  achievements: e.target.value.split('\n').filter(Boolean)
                })}
                rows={4}
                className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* List */}
      {data.map((exp) => (
        <div 
          key={exp.id}
          className="bg-white border-4 border-black p-4 flex items-center justify-between
            hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
        >
          <div>
            <h3 className="font-pixel text-sm">{exp.role}</h3>
            <p className="font-mono text-gray-600">{exp.company} • {exp.period}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(exp)}
              className="p-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
            >
              <FiEdit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(exp.id)}
              className="p-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

// Projects Editor
const ProjectsEditor = ({ 
  data, 
  onAdd, 
  onUpdate, 
  onDelete 
}: { 
  data: ProjectItem[]; 
  onAdd: (project: ProjectItem) => void;
  onUpdate: (id: string, project: ProjectItem) => void;
  onDelete: (id: string) => void;
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<ProjectItem | null>(null);

  const handleEdit = (project: ProjectItem) => {
    setEditingId(project.id);
    setFormData({ ...project });
  };

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({
      id: `project-${Date.now()}`,
      title: '',
      description: '',
      image: '',
      tech: [],
      github: '',
      live: '',
      featured: false,
      overview: '',
      role: '',
      duration: '',
      year: new Date().getFullYear().toString(),
      features: [],
      challenges: [],
      images: [],
      video: '',
    });
  };

  const handleSave = () => {
    if (!formData) return;
    
    if (isAdding) {
      onAdd(formData);
      setIsAdding(false);
    } else if (editingId) {
      onUpdate(editingId, formData);
      setEditingId(null);
    }
    setFormData(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-pixel text-lg">MANAGE_PROJECTS</h2>
        {!isAdding && !editingId && (
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 font-pixel text-xs px-4 py-2 
              border-2 border-black hover:bg-black hover:text-white transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            ADD_NEW
          </button>
        )}
      </div>

      {(isAdding || editingId) && formData && (
        <div className="bg-white border-4 border-black p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-pixel text-sm">{isAdding ? 'ADD_PROJECT' : 'EDIT_PROJECT'}</h3>
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 font-pixel text-xs px-3 py-2 
                  border-2 border-black hover:bg-gray-100 transition-colors"
              >
                <FiX className="w-4 h-4" />
                CANCEL
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1 font-pixel text-xs px-3 py-2 
                  border-2 border-black bg-black text-white hover:bg-gray-800 transition-colors"
              >
                <FiSave className="w-4 h-4" />
                SAVE
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-pixel text-xs mb-2 block">TITLE</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
                  placeholder="MY_PROJECT"
                />
              </div>
              <div>
                <label className="font-pixel text-xs mb-2 block">IMAGE_URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="font-pixel text-xs mb-2 block">DESCRIPTION</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none resize-none"
              />
            </div>
            <div>
              <label className="font-pixel text-xs mb-2 block">OVERVIEW (for case study)</label>
              <textarea
                value={formData.overview || ''}
                onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none resize-none"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="font-pixel text-xs mb-2 block">ROLE</label>
                <input
                  type="text"
                  value={formData.role || ''}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
                />
              </div>
              <div>
                <label className="font-pixel text-xs mb-2 block">DURATION</label>
                <input
                  type="text"
                  value={formData.duration || ''}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
                />
              </div>
              <div>
                <label className="font-pixel text-xs mb-2 block">YEAR</label>
                <input
                  type="text"
                  value={formData.year || ''}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-pixel text-xs mb-2 block">GITHUB_URL</label>
                <input
                  type="text"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
                />
              </div>
              <div>
                <label className="font-pixel text-xs mb-2 block">LIVE_URL</label>
                <input
                  type="text"
                  value={formData.live}
                  onChange={(e) => setFormData({ ...formData, live: e.target.value })}
                  className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="font-pixel text-xs mb-2 block">TECH_STACK (comma separated)</label>
              <input
                type="text"
                value={formData.tech.join(', ')}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  tech: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                })}
                className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
              />
            </div>
            <div>
              <label className="font-pixel text-xs mb-2 block">FEATURES (one per line)</label>
              <textarea
                value={(formData.features || []).join('\n')}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  features: e.target.value.split('\n').filter(Boolean)
                })}
                rows={4}
                className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none resize-none"
              />
            </div>
            <div>
              <label className="font-pixel text-xs mb-2 block">GALLERY_IMAGES (URLs, one per line)</label>
              <textarea
                value={(formData.images || []).join('\n')}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  images: e.target.value.split('\n').filter(Boolean)
                })}
                rows={3}
                className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none resize-none"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 font-mono cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 border-4 border-black"
                />
                FEATURED
              </label>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      {data.map((project) => (
        <div 
          key={project.id}
          className="bg-white border-4 border-black p-4 flex items-center justify-between
            hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
        >
          <div className="flex items-center gap-4">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-16 h-16 object-cover border-2 border-black"
            />
            <div>
              <h3 className="font-pixel text-sm">{project.title}</h3>
              <p className="font-mono text-gray-600 text-sm">{project.tech.slice(0, 3).join(' • ')}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(project)}
              className="p-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
            >
              <FiEdit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="p-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

// Skills Editor
const SkillsEditor = ({ 
  data, 
  onAdd, 
  onUpdate, 
  onDelete 
}: { 
  data: SkillItem[]; 
  onAdd: (skill: SkillItem) => void;
  onUpdate: (name: string, skill: SkillItem) => void;
  onDelete: (name: string) => void;
}) => {
  const [editingName, setEditingName] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<SkillItem | null>(null);

  const categories = ['Frontend', 'Backend', 'Languages', 'Database', 'DevOps', 'Cloud', 'Tools'];

  const handleEdit = (skill: SkillItem) => {
    setEditingName(skill.name);
    setFormData({ ...skill });
  };

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({
      name: '',
      category: 'Frontend',
      level: 80,
    });
  };

  const handleSave = () => {
    if (!formData) return;
    
    if (isAdding) {
      onAdd(formData);
      setIsAdding(false);
    } else if (editingName) {
      onUpdate(editingName, formData);
      setEditingName(null);
    }
    setFormData(null);
  };

  const handleCancel = () => {
    setEditingName(null);
    setIsAdding(false);
    setFormData(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-pixel text-lg">MANAGE_SKILLS</h2>
        {!isAdding && !editingName && (
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 font-pixel text-xs px-4 py-2 
              border-2 border-black hover:bg-black hover:text-white transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            ADD_NEW
          </button>
        )}
      </div>

      {(isAdding || editingName) && formData && (
        <div className="bg-white border-4 border-black p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-pixel text-sm">{isAdding ? 'ADD_SKILL' : 'EDIT_SKILL'}</h3>
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 font-pixel text-xs px-3 py-2 
                  border-2 border-black hover:bg-gray-100 transition-colors"
              >
                <FiX className="w-4 h-4" />
                CANCEL
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1 font-pixel text-xs px-3 py-2 
                  border-2 border-black bg-black text-white hover:bg-gray-800 transition-colors"
              >
                <FiSave className="w-4 h-4" />
                SAVE
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="font-pixel text-xs mb-2 block">NAME</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
                  placeholder="React"
                />
              </div>
              <div>
                <label className="font-pixel text-xs mb-2 block">CATEGORY</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none bg-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-pixel text-xs mb-2 block">LEVEL ({formData.level}%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <div className="grid md:grid-cols-2 gap-4">
        {data.map((skill) => (
          <div 
            key={skill.name}
            className="bg-white border-4 border-black p-4 flex items-center justify-between
              hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
          >
            <div className="flex-1 mr-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-pixel text-xs">{skill.name}</h3>
                <span className="font-mono text-xs text-gray-600">{skill.category}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 border border-black">
                <div 
                  className="h-full bg-black"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(skill)}
                className="p-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
              >
                <FiEdit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(skill.name)}
                className="p-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Contact Editor
const ContactEditor = ({ data, onSave }: { data: any; onSave: (data: any) => void }) => {
  const [formData, setFormData] = useState(data);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white border-4 border-black p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-pixel text-lg">EDIT_CONTACT</h2>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 font-pixel text-xs px-4 py-2 border-2 border-black
            transition-colors ${saved ? 'bg-green-500 text-white' : 'hover:bg-black hover:text-white'}`}
        >
          <FiSave className="w-4 h-4" />
          {saved ? 'SAVED!' : 'SAVE'}
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-pixel text-xs mb-2 block">EMAIL</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="font-pixel text-xs mb-2 block">PHONE</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="font-pixel text-xs mb-2 block">LOCATION</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
          />
        </div>
        <h3 className="font-pixel text-sm mt-6 mb-3">SOCIAL_LINKS</h3>
        <div className="space-y-4">
          <div>
            <label className="font-pixel text-xs mb-2 block">GITHUB</label>
            <input
              type="text"
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
            />
          </div>
          <div>
            <label className="font-pixel text-xs mb-2 block">LINKEDIN</label>
            <input
              type="text"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CMS;
