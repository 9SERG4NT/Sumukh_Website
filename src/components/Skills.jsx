import React, { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { resumeData } from '../data/mock';

// 3D Skill Bar Component
const SkillBar = ({ name, level, delay, color }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="text-slate-700 font-medium">{name}</span>
        <motion.span 
          className="text-slate-500 text-sm font-semibold"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-3 bg-slate-100 rounded-full overflow-hidden relative">
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: `linear-gradient(90deg, ${color} 0%, ${color}CC 100%)` }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: delay, ease: 'easeOut' }}
        >
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%' }}
            animate={isInView ? { x: '200%' } : {}}
            transition={{ duration: 1.5, delay: delay + 0.5, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </div>
  );
};

// 3D Tilt Card for Skill Categories
const SkillCategory = ({ title, skills, icon, color, bgColor, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);
  
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay, type: 'spring' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      className="h-full"
    >
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-2xl hover:border-slate-200 transition-all duration-300 h-full relative overflow-hidden"
      >
        {/* 3D Background glow */}
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0"
          style={{ backgroundColor: color }}
          animate={{ opacity: isHovered ? 0.2 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Floating decoration */}
        <motion.div
          className="absolute top-4 right-4 w-20 h-20 rounded-full opacity-5"
          style={{ backgroundColor: color }}
          animate={{ 
            scale: isHovered ? 1.5 : 1,
            rotate: isHovered ? 90 : 0,
          }}
          transition={{ duration: 0.5 }}
        />

        <motion.div 
          className="flex items-center gap-4 mb-6 relative z-10"
          style={{ transform: 'translateZ(30px)' }}
        >
          <motion.div 
            className={`p-3 rounded-2xl ${bgColor}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            style={{ transform: 'translateZ(20px)' }}
          >
            {icon}
          </motion.div>
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        </motion.div>
        
        <div style={{ transform: 'translateZ(20px)' }}>
          {skills.map((skill, index) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              level={skill.level}
              delay={delay + 0.1 * index}
              color={color}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// 3D Floating Orb Component
const FloatingOrb = ({ color, size, position, delay }) => (
  <motion.div
    className="absolute rounded-full blur-3xl opacity-20"
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      ...position,
    }}
    animate={{
      scale: [1, 1.3, 1],
      x: [0, 30, 0],
      y: [0, -20, 0],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
  />
);

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { skills } = resumeData;

  const categories = [
    {
      title: 'Programming Languages',
      skills: skills.programming,
      icon: <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
      color: '#3B82F6',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'AI & Machine Learning',
      skills: skills.aiml,
      icon: <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
      color: '#8B5CF6',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'IoT & Embedded Systems',
      skills: skills.iot,
      icon: <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>,
      color: '#10B981',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Web Development',
      skills: skills.webdev,
      icon: <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
      color: '#06B6D4',
      bgColor: 'bg-cyan-50',
    },
  ];

  return (
    <section id="skills" className="py-24 bg-slate-50 relative overflow-hidden" ref={ref}>
      {/* 3D Background decorations */}
      <FloatingOrb color="#3B82F6" size={400} position={{ top: '-10%', left: '-5%' }} delay={0} />
      <FloatingOrb color="#8B5CF6" size={300} position={{ bottom: '10%', right: '-5%' }} delay={2} />
      <FloatingOrb color="#10B981" size={250} position={{ top: '50%', right: '20%' }} delay={4} />
      
      {/* 3D Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="text-blue-600 font-semibold text-sm uppercase tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            My Expertise
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-slate-900 mt-2"
            initial={{ opacity: 0, y: 20, rotateX: -10 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ delay: 0.3, type: 'spring' }}
            style={{ perspective: '1000px' }}
          >
            Skills & Technologies
          </motion.h2>
          <motion.p 
            className="text-slate-500 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            A diverse skill set spanning AI/ML, IoT, and full-stack development
          </motion.p>
        </motion.div>

        <div 
          className="grid md:grid-cols-2 gap-8"
          style={{ perspective: '2000px' }}
        >
          {categories.map((category, index) => (
            <SkillCategory
              key={category.title}
              {...category}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
