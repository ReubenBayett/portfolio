import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import { useData } from '../context/DataContext';

const Footer = () => {
  const { contact, hero } = useData();

  const socialLinks = [
    { icon: FiGithub, href: contact.github, label: 'GitHub', hoverColor: '#333' },
    { icon: FiLinkedin, href: contact.linkedin, label: 'LinkedIn', hoverColor: '#0077B5' },
    { icon: FiMail, href: `mailto:${contact.email}`, label: 'Email', hoverColor: '#EA4335' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t-4 border-black">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-pixel text-xl mb-4">{'<'}{hero.name}{'/>'}</h3>
            <p className="font-mono text-gray-600 text-sm">
              Full-stack developer passionate about creating elegant solutions to complex problems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-pixel text-sm mb-4">QUICK_LINKS</h4>
            <ul className="space-y-2">
              {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="font-mono text-sm text-gray-600 hover:text-black 
                      hover:underline transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-pixel text-sm mb-4">CONNECT</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="group w-10 h-10 border-2 border-black flex items-center justify-center
                    bg-white hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
                  style={{ '--hover-color': social.hoverColor } as React.CSSProperties}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-black group-hover:text-[var(--hover-color)] transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-2 border-black flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-sm text-gray-600">
            © {currentYear} {hero.name}. All rights reserved.
          </p>
          <p className="font-mono text-sm text-gray-600 flex items-center gap-1">
            Built with <FiHeart className="w-4 h-4 text-red-500" /> using React + TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
