import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';
import { 
  SiReact, SiTypescript, SiNodedotjs, SiMongodb, 
  SiNextdotjs, SiTailwindcss, SiPython, SiDocker,
  SiPostgresql, SiRedis, SiGraphql, SiJavascript,
  SiVuedotjs, SiAngular, SiGit
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { useData } from '../context/DataContext';

const techIcons: Record<string, { icon: IconType, color: string }> = {
  'React': { icon: SiReact, color: '#61DAFB' },
  'TypeScript': { icon: SiTypescript, color: '#3178C6' },
  'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'MongoDB': { icon: SiMongodb, color: '#47A248' },
  'Next.js': { icon: SiNextdotjs, color: '#000000' },
  'Tailwind': { icon: SiTailwindcss, color: '#06B6D4' },
  'Python': { icon: SiPython, color: '#3776AB' },
  'Docker': { icon: SiDocker, color: '#2496ED' },
  'PostgreSQL': { icon: SiPostgresql, color: '#4169E1' },
  'Redis': { icon: SiRedis, color: '#DC382D' },
  'GraphQL': { icon: SiGraphql, color: '#E10098' },
  'AWS': { icon: FaAws, color: '#FF9900' },
  'Vue.js': { icon: SiVuedotjs, color: '#4FC08D' },
  'Angular': { icon: SiAngular, color: '#DD0031' },
  'Git': { icon: SiGit, color: '#F05032' },
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
      className="flex items-center gap-1 px-2 py-1 border-2 border-black 
        text-xs font-mono transition-all duration-300"
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
      <span className="hidden sm:inline">{tech}</span>
    </div>
  );
};

const Projects = () => {
  const { projects } = useData();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-pixel text-2xl md:text-3xl mb-4">PROJECTS</h2>
          <div className="w-16 h-1 bg-black mx-auto mb-4" />
          <p className="font-mono text-gray-600 max-w-2xl mx-auto">
            A collection of projects I've built, from full-stack applications to open-source tools.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={`border-4 border-black bg-white overflow-hidden 
                transition-all duration-300 ${hoveredId === project.id ? 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]' : ''}`}>
                {/* Project Image - Grayscale default, color on hover */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-48 object-cover transition-all duration-500 
                      ${hoveredId === project.id ? 'grayscale-0 scale-105' : 'grayscale'}`}
                  />
                  {project.featured && (
                    <div className="absolute top-3 left-3 font-pixel text-xs px-3 py-1 
                      bg-black text-white border-2 border-black">
                      FEATURED
                    </div>
                  )}
                  {/* Overlay on hover */}
                  <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 
                    flex items-center justify-center gap-4
                    ${hoveredId === project.id ? 'opacity-100' : 'opacity-0'}`}>
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-white text-black flex items-center justify-center
                        border-2 border-white hover:bg-black hover:text-white transition-colors"
                    >
                      <FiGithub className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-white text-black flex items-center justify-center
                        border-2 border-white hover:bg-black hover:text-white transition-colors"
                    >
                      <FiExternalLink className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className={`font-pixel text-sm md:text-base mb-3 transition-colors 
                    ${hoveredId === project.id ? 'text-gray-700' : ''}`}>
                    {project.title}
                  </h3>
                  <p className="font-mono text-sm text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack - B&W with color on card hover */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <TechBadge 
                        key={tech} 
                        tech={tech} 
                        isHovered={hoveredId === project.id} 
                      />
                    ))}
                  </div>

                  {/* Case Study Link */}
                  <Link
                    to={`/project/${project.id}`}
                    className="inline-flex items-center gap-2 font-pixel text-xs 
                      text-black hover:text-gray-600 transition-colors group/link"
                  >
                    VIEW_CASE_STUDY
                    <FiArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-pixel text-sm px-8 py-4 
              border-4 border-black bg-white text-black
              hover:bg-black hover:text-white transition-colors duration-300
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <FiGithub className="w-5 h-5" />
            VIEW_ALL_ON_GITHUB
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
