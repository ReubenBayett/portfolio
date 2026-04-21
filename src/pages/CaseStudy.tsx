import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowLeft, FiExternalLink, FiGithub, FiX, FiPlay,
  FiChevronLeft, FiChevronRight, FiCalendar, FiClock, FiUser
} from 'react-icons/fi';
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

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const { projects } = useData();
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const project = projects.find(p => p.id === id);
  const relatedProjects = projects.filter(p => p.id !== id).slice(0, 2);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="font-pixel text-2xl mb-4">PROJECT_NOT_FOUND</h1>
          <Link
            to="/"
            className="font-pixel text-sm px-6 py-3 border-4 border-black inline-flex items-center gap-2
              hover:bg-black hover:text-white transition-colors"
          >
            <FiArrowLeft /> BACK_HOME
          </Link>
        </div>
      </div>
    );
  }

  const images = project.images || [project.image];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="font-pixel text-sm flex items-center gap-2 hover:text-gray-600 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            BACK
          </Link>
          <h1 className="font-pixel text-sm md:text-base truncate max-w-[200px] md:max-w-none">
            {project.title}
          </h1>
          <div className="flex gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border-2 border-black flex items-center justify-center
                hover:bg-black hover:text-white transition-colors"
            >
              <FiGithub className="w-5 h-5" />
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border-2 border-black flex items-center justify-center
                hover:bg-black hover:text-white transition-colors"
            >
              <FiExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      <main className="pt-20 pb-20">
        {/* Hero Image */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden border-b-4 border-black">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-6xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-pixel text-2xl md:text-4xl text-white mb-4"
              >
                {project.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-mono text-white/80 max-w-2xl"
              >
                {project.description}
              </motion.p>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-12">
              {/* Overview */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-pixel text-lg mb-4">OVERVIEW</h2>
                <div className="border-4 border-black p-6 bg-gray-50">
                  <p className="font-mono leading-relaxed">
                    {project.overview || project.description}
                  </p>
                </div>
              </motion.section>

              {/* Gallery */}
              {images.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-pixel text-lg">GALLERY</h2>
                    {project.video && (
                      <button
                        onClick={() => setShowVideo(true)}
                        className="font-pixel text-xs px-4 py-2 border-2 border-black 
                          flex items-center gap-2 hover:bg-black hover:text-white transition-colors"
                      >
                        <FiPlay className="w-4 h-4" />
                        WATCH_VIDEO
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {images.map((img, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedImage(img);
                          setCurrentImageIndex(index);
                        }}
                      >
                        <img
                          src={img}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="w-full h-32 object-cover border-4 border-black
                            grayscale hover:grayscale-0 transition-all duration-300"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="font-pixel text-lg mb-4">KEY_FEATURES</h2>
                  <div className="border-4 border-black divide-y-4 divide-black">
                    {project.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 flex items-center gap-4 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-pixel text-xs w-8 h-8 border-2 border-black 
                          flex items-center justify-center bg-black text-white">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <p className="font-mono">{feature}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Challenges & Solutions */}
              {project.challenges && project.challenges.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="font-pixel text-lg mb-4">CHALLENGES_&_SOLUTIONS</h2>
                  <div className="space-y-4">
                    {project.challenges.map((item, index) => (
                      <div key={index} className="border-4 border-black overflow-hidden">
                        <div className="p-4 bg-gray-100 border-b-4 border-black">
                          <h4 className="font-pixel text-xs mb-2">CHALLENGE:</h4>
                          <p className="font-mono">{item.challenge}</p>
                        </div>
                        <div className="p-4 bg-white">
                          <h4 className="font-pixel text-xs mb-2">SOLUTION:</h4>
                          <p className="font-mono">{item.solution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="border-4 border-black p-4 sticky top-24"
              >
                <h3 className="font-pixel text-sm mb-4">PROJECT_INFO</h3>
                
                <div className="space-y-4 mb-6">
                  {project.role && (
                    <div className="flex items-center gap-3">
                      <FiUser className="w-5 h-5" />
                      <div>
                        <p className="font-pixel text-[10px] text-gray-500">ROLE</p>
                        <p className="font-mono text-sm">{project.role}</p>
                      </div>
                    </div>
                  )}
                  {project.duration && (
                    <div className="flex items-center gap-3">
                      <FiClock className="w-5 h-5" />
                      <div>
                        <p className="font-pixel text-[10px] text-gray-500">DURATION</p>
                        <p className="font-mono text-sm">{project.duration}</p>
                      </div>
                    </div>
                  )}
                  {project.year && (
                    <div className="flex items-center gap-3">
                      <FiCalendar className="w-5 h-5" />
                      <div>
                        <p className="font-pixel text-[10px] text-gray-500">YEAR</p>
                        <p className="font-mono text-sm">{project.year}</p>
                      </div>
                    </div>
                  )}
                </div>

                <h4 className="font-pixel text-xs mb-3">TECH_STACK</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => {
                    const techInfo = techIcons[tech];
                    const IconComponent = techInfo?.icon;
                    const isHovered = hoveredTech === tech;
                    
                    return (
                      <div
                        key={tech}
                        onMouseEnter={() => setHoveredTech(tech)}
                        onMouseLeave={() => setHoveredTech(null)}
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
                        {tech}
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-2">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full font-pixel text-xs px-4 py-3 border-2 border-black 
                      bg-black text-white flex items-center justify-center gap-2
                      hover:bg-white hover:text-black transition-colors"
                  >
                    <FiExternalLink className="w-4 h-4" />
                    VIEW_LIVE
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full font-pixel text-xs px-4 py-3 border-2 border-black 
                      flex items-center justify-center gap-2
                      hover:bg-black hover:text-white transition-colors"
                  >
                    <FiGithub className="w-4 h-4" />
                    VIEW_CODE
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20"
            >
              <h2 className="font-pixel text-lg mb-6">RELATED_PROJECTS</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedProjects.map((proj) => (
                  <Link
                    key={proj.id}
                    to={`/project/${proj.id}`}
                    className="group border-4 border-black overflow-hidden
                      hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0
                          group-hover:scale-105 transition-all duration-500"
                      />
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="font-pixel text-sm mb-2">{proj.title}</h3>
                      <p className="font-mono text-sm text-gray-600 line-clamp-1">
                        {proj.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </main>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-12 h-12 bg-white border-4 border-black
                flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                const newIndex = (currentImageIndex - 1 + images.length) % images.length;
                setCurrentImageIndex(newIndex);
                setSelectedImage(images[newIndex]);
              }}
              className="absolute left-4 w-12 h-12 bg-white border-4 border-black
                flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>

            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={selectedImage}
              alt="Full size"
              className="max-w-full max-h-[80vh] object-contain border-4 border-white"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                const newIndex = (currentImageIndex + 1) % images.length;
                setCurrentImageIndex(newIndex);
                setSelectedImage(images[newIndex]);
              }}
              className="absolute right-4 w-12 h-12 bg-white border-4 border-black
                flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-pixel text-white text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && project.video && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 w-12 h-12 bg-white border-4 border-black
                flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-4xl aspect-video border-4 border-white"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={project.video}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CaseStudy;
