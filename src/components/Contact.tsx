import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin } from 'react-icons/fi';
import { useData } from '../context/DataContext';

const Contact = () => {
  const { contact } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    { icon: FiMail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: FiPhone, label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
    { icon: FiMapPin, label: 'Location', value: contact.location, href: '#' },
  ];

  const socialLinks = [
    { icon: FiGithub, href: contact.github, color: '#333', label: 'GitHub' },
    { icon: FiLinkedin, href: contact.linkedin, color: '#0077B5', label: 'LinkedIn' },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-pixel text-2xl md:text-3xl mb-4">CONTACT</h2>
          <div className="w-16 h-1 bg-black mx-auto mb-4" />
          <p className="font-mono text-gray-600 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-pixel text-lg mb-6">GET_IN_TOUCH</h3>
            
            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={index}
                    href={info.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 border-4 border-black bg-white
                      hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 border-2 border-black flex items-center justify-center
                      group-hover:bg-black group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-pixel text-xs text-gray-500">{info.label}</p>
                      <p className="font-mono">{info.value}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-pixel text-sm mb-4">SOCIAL_LINKS</h4>
              <div className="flex gap-4">
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
                    >
                      <Icon className="w-5 h-5 text-black group-hover:text-[var(--icon-color)] transition-colors duration-300" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-pixel text-lg mb-6">SEND_MESSAGE</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-pixel text-xs mb-2 block">NAME</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-4 border-black font-mono 
                    focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="font-pixel text-xs mb-2 block">EMAIL</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-4 border-black font-mono 
                    focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="font-pixel text-xs mb-2 block">MESSAGE</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border-4 border-black font-mono resize-none
                    focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                  placeholder="Your message..."
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full font-pixel text-sm px-8 py-4 border-4 border-black
                  flex items-center justify-center gap-2 transition-colors duration-300
                  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  ${submitted 
                    ? 'bg-green-500 text-white' 
                    : 'bg-black text-white hover:bg-white hover:text-black'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="inline-block"
                    >
                      ⟳
                    </motion.span>
                    SENDING...
                  </>
                ) : submitted ? (
                  <>
                    ✓ SENT_SUCCESSFULLY
                  </>
                ) : (
                  <>
                    <FiSend className="w-4 h-4" />
                    SEND_MESSAGE
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
