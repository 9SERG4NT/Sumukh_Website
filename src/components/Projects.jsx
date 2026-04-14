import React, { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { resumeData } from '../data/mock';

// 3D Tilt Card Component
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);
  
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
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

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, type: 'spring' }}
      className="group relative"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TiltCard className="h-full">
        <motion.div
          whileHover={{ z: 50 }}
          className="relative bg-white rounded-3xl p-8 border border-slate-100 hover:border-slate-200 transition-all duration-500 overflow-hidden h-full"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: isHovered 
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1)' 
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, ${project.color}15 0%, transparent 60%)`,
            }}
          />

          {/* 3D floating decoration */}
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 transition-all duration-500"
            style={{ 
              backgroundColor: project.color,
              transform: isHovered ? 'translateZ(30px) scale(1.5)' : 'translateZ(0) scale(1)',
            }}
          />

          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, ${project.color}20, transparent, ${project.color}10)`,
              transform: 'translateZ(-10px)',
            }}
          />

          <div className="relative z-10" style={{ transform: 'translateZ(40px)' }}>
            {/* Date badge */}
            <div className="flex items-center justify-between mb-6">
              <motion.span 
                className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm font-medium"
                whileHover={{ scale: 1.05 }}
              >
                {project.date}
              </motion.span>
              <motion.div
                animate={{ rotate: isHovered ? 45 : 0, scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
                className="p-2 rounded-full bg-slate-100 group-hover:bg-slate-900 transition-colors duration-300"
              >
                <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
              </motion.div>
            </div>

            {/* Project title with 3D pop effect */}
            <motion.h3 
              className="text-2xl font-bold text-slate-900 mb-2"
              style={{ transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)' }}
            >
              {project.title}
            </motion.h3>
            <p className="font-medium mb-4" style={{ color: project.color }}>
              {project.subtitle}
            </p>

            {/* Description */}
            <p className="text-slate-600 mb-6 leading-relaxed">{project.description}</p>

            {/* Impact highlight with 3D effect */}
            <motion.div 
              className="bg-slate-50 rounded-2xl p-4 mb-6"
              style={{ 
                transform: isHovered ? 'translateZ(30px)' : 'translateZ(0)',
                boxShadow: isHovered ? '0 10px 30px -10px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              <p className="text-sm text-slate-500 mb-1">Impact</p>
              <p className="font-semibold text-slate-900">{project.impact}</p>
            </motion.div>

            {/* Tech stack with staggered animation */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.15 + techIndex * 0.1 + 0.3 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors cursor-default"
                  style={{ transform: 'translateZ(25px)' }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { projects, certifications } = resumeData;

  return (
    <section id="projects" className="py-24 bg-slate-50 relative overflow-hidden" ref={ref}>
      {/* 3D Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-100/40 to-transparent blur-3xl"
          style={{ top: '-10%', right: '-10%' }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-purple-100/30 to-transparent blur-3xl"
          style={{ bottom: '10%', left: '-5%' }}
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="text-blue-600 font-semibold text-sm uppercase tracking-wider inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Portfolio
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-slate-900 mt-2"
            initial={{ opacity: 0, y: 20, rotateX: -15 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            className="text-slate-500 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            Innovative solutions that push the boundaries of AI, IoT, and computer vision
          </motion.p>
        </motion.div>

        {/* Projects Grid with 3D perspective */}
        <div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
          style={{ perspective: '2000px' }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Certifications with 3D cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Certifications</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ perspective: '1000px' }}>
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, rotateX: -10 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                whileHover={{ 
                  y: -8, 
                  rotateX: 5, 
                  rotateY: 5,
                  boxShadow: '0 20px 40px -15px rgba(0,0,0,0.15)',
                }}
                className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-slate-200 transition-all duration-300"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div 
                  className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  <ExternalLink className="w-5 h-5 text-blue-600" />
                </motion.div>
                <h4 className="font-bold text-slate-900 mb-1" style={{ transform: 'translateZ(15px)' }}>
                  {cert.title}
                </h4>
                <p className="text-sm text-slate-500" style={{ transform: 'translateZ(10px)' }}>
                  {cert.issuer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
