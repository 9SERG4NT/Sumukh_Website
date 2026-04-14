import React, { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, GraduationCap, Trophy, FileText } from 'lucide-react';
import { resumeData } from '../data/mock';

// 3D Card Component
const Card3D = ({ children, className }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);
  
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0); }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { personal, education, research, achievements } = resumeData;

  const stats = [
    { icon: FileText, value: research.papers, label: 'IEEE Papers' },
    { icon: FileText, value: research.chapters, label: 'Book Chapters' },
    { icon: Trophy, value: research.patents, label: 'Patent' },
    { icon: Trophy, value: research.hackathons, label: 'Hackathons' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -10 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, type: 'spring' } },
  };

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden" ref={ref}>
      {/* 3D Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-50 to-transparent blur-3xl"
          style={{ top: '-15%', right: '-10%' }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-purple-50 to-transparent blur-3xl"
          style={{ bottom: '-10%', left: '-5%' }}
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -45, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
        
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 left-[10%] w-16 h-16 border-2 border-blue-200/30 rounded-lg"
          animate={{
            rotate: [0, 360],
            y: [-10, 10, -10],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{ transformStyle: 'preserve-3d' }}
        />
        <motion.div
          className="absolute bottom-32 right-[15%] w-12 h-12 border-2 border-purple-200/30 rounded-full"
          animate={{
            rotate: [360, 0],
            x: [-10, 10, -10],
          }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
            x: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ perspective: '2000px' }}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">About Me</span>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-slate-900 mt-2"
              whileHover={{ rotateX: 5, rotateY: -5 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              Passionate about building
            </motion.h2>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-slate-400 mt-1"
              whileHover={{ rotateX: 5, rotateY: 5 }}
            >
              intelligent solutions
            </motion.h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left column - Bio */}
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.p 
                className="text-lg text-slate-600 leading-relaxed"
                whileHover={{ scale: 1.01 }}
              >
                {personal.bio}
              </motion.p>

              {/* Location & Education quick info */}
              <div className="space-y-4">
                {[
                  { icon: MapPin, text: personal.location },
                  { icon: GraduationCap, text: education.institution },
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-3 text-slate-600"
                    whileHover={{ x: 10, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <motion.div 
                      className="p-2 bg-slate-100 rounded-lg"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <item.icon size={20} className="text-slate-700" />
                    </motion.div>
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Research Stats with 3D effect */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {stats.map((stat, index) => (
                  <Card3D key={index}>
                    <motion.div
                      className="text-center p-4 bg-slate-50 rounded-2xl cursor-default"
                      whileHover={{ 
                        boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1)',
                      }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <motion.div style={{ transform: 'translateZ(20px)' }}>
                        <stat.icon className="mx-auto mb-2 text-blue-600" size={24} />
                        <p className="text-sm font-bold text-slate-900">{stat.value}</p>
                        <p className="text-xs text-slate-500">{stat.label}</p>
                      </motion.div>
                    </motion.div>
                  </Card3D>
                ))}
              </div>
            </motion.div>

            {/* Right column - Education Card & Achievements */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Education Card with 3D effect */}
              <Card3D>
                <motion.div
                  className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden"
                  whileHover={{ boxShadow: '0 30px 60px -15px rgba(0,0,0,0.5)' }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Animated decorative elements */}
                  <motion.div 
                    className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"
                    animate={{
                      scale: [1.2, 1, 1.2],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />
                  
                  <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
                    <div className="flex items-center gap-3 mb-6">
                      <motion.div 
                        className="p-3 bg-white/10 rounded-xl backdrop-blur-sm"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <GraduationCap size={24} />
                      </motion.div>
                      <span className="text-blue-300 font-medium">Education</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{education.degree}</h3>
                    <p className="text-slate-300 mb-1">{education.major}</p>
                    <p className="text-sm text-blue-300 mb-4">Specialization: {education.specialization}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-sm text-slate-400">{education.duration}</span>
                      <motion.span 
                        className="px-3 py-1 bg-white/10 rounded-full text-sm"
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
                      >
                        GPA: {education.gpa}
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              </Card3D>

              {/* Achievements with 3D */}
              <Card3D>
                <motion.div 
                  className="bg-slate-50 rounded-3xl p-8"
                  whileHover={{ boxShadow: '0 25px 50px -15px rgba(0,0,0,0.1)' }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="flex items-center gap-3 mb-6" style={{ transform: 'translateZ(20px)' }}>
                    <motion.div 
                      className="p-3 bg-amber-100 rounded-xl"
                      whileHover={{ rotate: -10, scale: 1.1 }}
                    >
                      <Trophy size={24} className="text-amber-600" />
                    </motion.div>
                    <span className="font-semibold text-slate-900">Achievements</span>
                  </div>
                  
                  <ul className="space-y-3" style={{ transform: 'translateZ(15px)' }}>
                    {achievements.map((achievement, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3 text-slate-600"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                      >
                        <motion.span 
                          className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"
                          whileHover={{ scale: 1.5 }}
                        />
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </Card3D>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
