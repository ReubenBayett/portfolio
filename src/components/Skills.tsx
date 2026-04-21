import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  SiReact, SiTypescript, SiNodedotjs, SiPython, 
  SiDocker, SiPostgresql, SiMongodb, SiGraphql,
  SiTailwindcss, SiNextdotjs, SiGit, SiRedis,
  SiJavascript, SiVuedotjs, SiAngular, SiKubernetes,
  SiSharp, SiDotnet
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { VscAzure } from 'react-icons/vsc';
import { IconType } from 'react-icons';
import { useData } from '../context/DataContext';

const techIcons: Record<string, { icon: IconType, color: string }> = {
  'React': { icon: SiReact, color: '#61DAFB' },
  'TypeScript': { icon: SiTypescript, color: '#3178C6' },
  'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'Python': { icon: SiPython, color: '#3776AB' },
  'Docker': { icon: SiDocker, color: '#2496ED' },
  'Kubernetes': { icon: SiKubernetes, color: '#326CE5' },
  'PostgreSQL': { icon: SiPostgresql, color: '#4169E1' },
  'MongoDB': { icon: SiMongodb, color: '#47A248' },
  'GraphQL': { icon: SiGraphql, color: '#E10098' },
  'Tailwind': { icon: SiTailwindcss, color: '#06B6D4' },
  'Next.js': { icon: SiNextdotjs, color: '#000000' },
  'Git': { icon: SiGit, color: '#F05032' },
  'AWS': { icon: FaAws, color: '#FF9900' },
  'Azure': { icon: VscAzure, color: '#0078D4' },
  'Redis': { icon: SiRedis, color: '#DC382D' },
  'Vue.js': { icon: SiVuedotjs, color: '#4FC08D' },
  'Angular': { icon: SiAngular, color: '#DD0031' },
  'C#': { icon: SiSharp, color: '#239120' },
  'ASP.NET': { icon: SiDotnet, color: '#512BD4' },
};

const Skills = () => {
  const { skills } = useData();
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = ['All', ...new Set(skills.map(skill => skill.category))];

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-pixel text-2xl md:text-3xl mb-4">SKILLS</h2>
          <div className="w-16 h-1 bg-black mx-auto mb-4" />
          <p className="font-mono text-gray-600 max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`font-pixel text-xs px-4 py-2 border-2 border-black transition-all duration-300
                ${activeCategory === category 
                  ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                  : 'bg-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill, index) => {
            const techInfo = techIcons[skill.name];
            const IconComponent = techInfo?.icon;
            const isHovered = hoveredSkill === skill.name;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`p-4 border-4 border-black bg-white transition-all duration-300
                  ${isHovered ? 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' : ''}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  {IconComponent && (
                    <IconComponent 
                      className="w-8 h-8 transition-colors duration-300"
                      style={{ color: isHovered && techInfo ? techInfo.color : '#000000' }}
                    />
                  )}
                  <div>
                    <h3 className="font-pixel text-xs">{skill.name}</h3>
                    <span className="font-mono text-xs text-gray-500">{skill.category}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 p-6 border-4 border-black bg-white"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="font-pixel text-2xl">{skills.length}</p>
              <p className="font-mono text-sm text-gray-600">Technologies</p>
            </div>
            <div>
              <p className="font-pixel text-2xl">{categories.length - 1}</p>
              <p className="font-mono text-sm text-gray-600">Categories</p>
            </div>
            <div>
              <p className="font-pixel text-2xl">{Math.round(skills.reduce((a, b) => a + b.level, 0) / skills.length)}%</p>
              <p className="font-mono text-sm text-gray-600">Avg. Proficiency</p>
            </div>
            <div>
              <p className="font-pixel text-2xl">∞</p>
              <p className="font-mono text-sm text-gray-600">Learning Spirit</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
