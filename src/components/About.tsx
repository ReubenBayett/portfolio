import { motion } from 'framer-motion';
import { FiMapPin, FiClock, FiCode, FiCheck } from 'react-icons/fi';
import { useData } from '../context/DataContext';

const About = () => {
  const { about } = useData();

  const quickFacts = [
    { icon: FiMapPin, label: 'Location', value: about.location },
    { icon: FiClock, label: 'Experience', value: about.experience },
    { icon: FiCode, label: 'Focus', value: about.focus },
    { icon: FiCheck, label: 'Status', value: about.availability },
  ];

  const stats = [
    { label: 'Lines of Code', value: about.stats.linesOfCode },
    { label: 'Coffee Cups', value: about.stats.coffeeCups },
    { label: 'Happy Clients', value: about.stats.happyClients },
    { label: 'Projects', value: about.stats.projects },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-pixel text-2xl md:text-3xl mb-4">ABOUT_ME</h2>
          <div className="w-16 h-1 bg-black mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Avatar / Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Pixel Art Avatar Placeholder */}
              <div className="w-64 h-64 border-4 border-black bg-gray-100 
                shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  {/* Simple pixel art representation */}
                  <div className="grid grid-cols-8 gap-0.5">
                    {Array.from({ length: 64 }).map((_, i) => {
                      const isHead = (i >= 9 && i <= 14) || (i >= 17 && i <= 22) || 
                                     (i >= 25 && i <= 30) || (i >= 33 && i <= 38);
                      const isBody = (i >= 41 && i <= 46) || (i >= 49 && i <= 54) ||
                                     (i >= 57 && i <= 62);
                      const isEye = i === 18 || i === 21;
                      return (
                        <div
                          key={i}
                          className={`w-6 h-6 ${
                            isEye ? 'bg-black' :
                            isHead ? 'bg-gray-300' :
                            isBody ? 'bg-gray-400' :
                            'bg-transparent'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 border-4 border-black bg-white" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-4 border-black bg-black" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-pixel text-lg mb-2">{about.name}</h3>
            <p className="font-mono text-gray-600 mb-6">{about.title}</p>
            
            <p className="font-mono text-gray-700 mb-8 leading-relaxed">
              {about.bio}
            </p>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {quickFacts.map((fact, index) => {
                const Icon = fact.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 border-2 border-black
                      hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <p className="font-pixel text-[10px] text-gray-500">{fact.label}</p>
                      <p className="font-mono text-sm">{fact.value}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 border-4 border-black text-center
                hover:bg-black hover:text-white transition-colors duration-300 group"
            >
              <p className="font-pixel text-2xl md:text-3xl mb-2 group-hover:animate-pulse">
                {stat.value}
              </p>
              <p className="font-mono text-sm text-gray-600 group-hover:text-gray-300">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
