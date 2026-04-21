import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiArrowDown } from 'react-icons/fi';
import { useData } from '../context/DataContext';

const Hero = () => {
  const { hero, contact } = useData();

    { icon: FiGithub, href: contact.github, color: '#333', label: 'GitHub' },
    { icon: FiLinkedin, href: contact.linkedin, color: '#0077B5', label: 'LinkedIn' },
  ];

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative bg-white pt-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="font-pixel text-sm md:text-base px-4 py-2 border-4 border-black inline-block
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {hero.greeting}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-pixel text-3xl md:text-5xl lg:text-6xl mb-4 leading-tight"
        >
          {hero.name}
        </motion.h1>

        {/* Tagline with blinking cursor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <span className="font-pixel text-lg md:text-2xl text-gray-700">
            {'> '}{hero.tagline}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block ml-1 w-3 h-6 bg-black align-middle"
            />
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-mono text-gray-600 text-lg max-w-2xl mx-auto mb-12"
        >
          {hero.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button
            onClick={scrollToProjects}
            className="font-pixel text-sm px-8 py-4 border-4 border-black bg-black text-white
              hover:bg-white hover:text-black transition-colors duration-300
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            VIEW_PROJECTS
          </button>
          <button
            onClick={scrollToContact}
            className="font-pixel text-sm px-8 py-4 border-4 border-black bg-white text-black
              hover:bg-black hover:text-white transition-colors duration-300
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            CONTACT_ME
          </button>
        </motion.div>

        {/* Social Links - B&W with color on hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center gap-4"
        >
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="group w-12 h-12 border-4 border-black flex items-center justify-center
                  bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
                style={{ '--icon-color': link.color } as React.CSSProperties}
                aria-label={link.label}
              >
                <Icon className="w-5 h-5 text-black group-hover:text-[var(--icon-color)] transition-colors duration-300" />
              </motion.a>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="cursor-pointer"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <FiArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
