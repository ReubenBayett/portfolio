import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import { 
  SiReact, SiTypescript, SiNodedotjs, SiPython, 
  SiDocker, SiKubernetes, SiPostgresql, SiMongodb,
  SiGraphql, SiTailwindcss, SiNextdotjs, SiGit,
  SiRedis, SiJavascript, SiVuedotjs, SiAngular
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
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
  'Redis': { icon: SiRedis, color: '#DC382D' },
  'Vue.js': { icon: SiVuedotjs, color: '#4FC08D' },
  'Angular': { icon: SiAngular, color: '#DD0031' },
};

interface TechBadgeProps {
  tech: string;
  isHovered: boolean;
}

const TechBadge = ({ tech, isHovered }: TechBadgeProps) => {
  const techInfo = techIcons[tech];
  const IconComponent = techInfo?.icon;
  
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 border-2 border-black 
        bg-white font-mono text-sm transition-all duration-300"
      style={{
        boxShadow: isHovered ? '2px 2px 0px 0px rgba(0,0,0,1)' : 'none'
      }}
    >
      {IconComponent && (
        <IconComponent 
          className="w-4 h-4 transition-colors duration-300" 
          style={{ color: isHovered && techInfo ? techInfo.color : '#000000' }}
        />
      )}
      {tech}
    </div>
  );
};

const Experience = () => {
  const { experiences } = useData();
  const [expandedId, setExpandedId] = useState<number | null>(experiences[0]?.id || null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-pixel text-2xl md:text-3xl mb-4">EXPERIENCE</h2>
          <div className="w-16 h-1 bg-black mx-auto mb-4" />
          <p className="font-mono text-gray-600 max-w-2xl mx-auto">
            My professional journey in software development, from junior roles to leading teams.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-1 bg-black" />

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 md:pl-20"
              >
                {/* Timeline Dot */}
                <div className={`absolute left-0 md:left-8 w-4 h-4 border-4 border-black bg-white 
                  transform -translate-x-1/2 transition-colors duration-300
                  ${expandedId === exp.id ? 'bg-black' : 'bg-white hover:bg-gray-300'}`} 
                />

                {/* Card */}
                <div
                  className={`border-4 border-black bg-white transition-all duration-300 cursor-pointer
                    ${expandedId === exp.id 
                      ? 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]' 
                      : 'hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                    }`}
                  onClick={() => toggleExpand(exp.id)}
                  onMouseEnter={() => setHoveredId(exp.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Header */}
                  <div className="p-4 md:p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-pixel text-sm md:text-base mb-2">{exp.role}</h3>
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="font-mono text-lg hover:underline"
                        >
                          {exp.company}
                        </a>
                        
                        <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1 font-mono">
                            <FiCalendar className="w-4 h-4" />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1 font-mono">
                            <FiMapPin className="w-4 h-4" />
                            {exp.location}
                          </span>
                          <span className="flex items-center gap-1 font-mono">
                            <FiBriefcase className="w-4 h-4" />
                            {exp.type}
                          </span>
                        </div>
                      </div>
                      
                      <motion.div
                        animate={{ rotate: expandedId === exp.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-4"
                      >
                        <FiChevronDown className="w-6 h-6" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedId === exp.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t-4 border-black"
                      >
                        <div className="p-4 md:p-6 bg-gray-50">
                          <p className="font-mono text-gray-700 mb-4">{exp.description}</p>
                          
                          {/* Achievements */}
                          <div className="mb-6">
                            <h4 className="font-pixel text-xs mb-3">KEY_ACHIEVEMENTS:</h4>
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-start gap-2 font-mono text-sm"
                                >
                                  <span className="text-black mt-1">▸</span>
                                  {achievement}
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          {/* Tech Stack - Colors on card hover */}
                          <div>
                            <h4 className="font-pixel text-xs mb-3">TECH_STACK:</h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.tech.map((tech) => (
                                <TechBadge 
                                  key={tech} 
                                  tech={tech} 
                                  isHovered={hoveredId === exp.id} 
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
};

export default Experience;
