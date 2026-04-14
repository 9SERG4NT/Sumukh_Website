import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, Code2, Cpu, Brain, ExternalLink } from 'lucide-react';
import { resumeData } from '../data/mock';

// 3D Floating Shape Component
const FloatingShape = ({ className, delay = 0, duration = 20, rotateRange = 360 }) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay + 0.5, duration: 0.8 }}
    >
      <motion.div
        animate={{
          rotateX: [0, rotateRange, 0],
          rotateY: [0, rotateRange, 0],
          rotateZ: [0, rotateRange / 2, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="w-full h-full" style={{ transform: 'translateZ(20px)' }} />
      </motion.div>
    </motion.div>
  );
};

// 3D Geometric Shape
const Geometric3D = ({ type, size, color, position, delay, floatDuration = 6 }) => {
  const shapes = {
    cube: (
      <div className="relative" style={{ transformStyle: 'preserve-3d', width: size, height: size }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 border border-current opacity-30"
            style={{
              transform: [
                'translateZ(' + size/2 + 'px)',
                'translateZ(-' + size/2 + 'px)',
                'rotateY(90deg) translateZ(' + size/2 + 'px)',
                'rotateY(-90deg) translateZ(' + size/2 + 'px)',
                'rotateX(90deg) translateZ(' + size/2 + 'px)',
                'rotateX(-90deg) translateZ(' + size/2 + 'px)',
              ][i],
              borderColor: color,
            }}
          />
        ))}
      </div>
    ),
    ring: (
      <div 
        className="rounded-full border-2 opacity-20"
        style={{ width: size, height: size, borderColor: color }}
      />
    ),
    triangle: (
      <div
        className="opacity-20"
        style={{
          width: 0,
          height: 0,
          borderLeft: `${size/2}px solid transparent`,
          borderRight: `${size/2}px solid transparent`,
          borderBottom: `${size}px solid ${color}`,
        }}
      />
    ),
  };

  return (
    <motion.div
      className={`absolute ${position}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8 }}
    >
      <motion.div
        animate={{
          y: [-20, 20, -20],
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          y: { duration: floatDuration, repeat: Infinity, ease: 'easeInOut' },
          rotateX: { duration: floatDuration * 3, repeat: Infinity, ease: 'linear' },
          rotateY: { duration: floatDuration * 2, repeat: Infinity, ease: 'linear' },
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {shapes[type]}
      </motion.div>
    </motion.div>
  );
};

// Particle System
const Particles = () => {
  const particles = [...Array(30)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  const { personal } = resumeData;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const parallaxX = useSpring(useTransform(mouseX, [0, 1], [-30, 30]), springConfig);
  const parallaxY = useSpring(useTransform(mouseY, [0, 1], [-30, 30]), springConfig);
  const parallaxXSlow = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), springConfig);
  const parallaxYSlow = useSpring(useTransform(mouseY, [0, 1], [-15, 15]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth);
      mouseY.set(clientY / innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const floatingIcons = [
    { Icon: Code2, position: 'top-20 left-[15%]', delay: 0 },
    { Icon: Cpu, position: 'top-40 right-[20%]', delay: 0.5 },
    { Icon: Brain, position: 'bottom-40 left-[10%]', delay: 1 },
  ];

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white" style={{ perspective: '1000px' }}>
      {/* Particle System */}
      <Particles />
      
      {/* 3D Animated background elements */}
      <div className="absolute inset-0 overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
        {/* Large gradient orbs with parallax */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-200/40 via-cyan-100/30 to-transparent blur-3xl"
          style={{ 
            top: '5%', 
            left: '15%',
            x: parallaxX,
            y: parallaxY,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-200/30 via-pink-100/20 to-transparent blur-3xl"
          style={{ 
            bottom: '10%', 
            right: '10%',
            x: parallaxXSlow,
            y: parallaxYSlow,
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-cyan-200/30 via-teal-100/20 to-transparent blur-3xl"
          style={{ top: '40%', left: '50%' }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* 3D Geometric shapes */}
        <Geometric3D type="cube" size={60} color="#3B82F6" position="top-[20%] left-[8%]" delay={0.5} floatDuration={8} />
        <Geometric3D type="cube" size={40} color="#8B5CF6" position="top-[30%] right-[12%]" delay={0.8} floatDuration={10} />
        <Geometric3D type="ring" size={80} color="#06B6D4" position="bottom-[25%] left-[5%]" delay={1} floatDuration={7} />
        <Geometric3D type="ring" size={50} color="#3B82F6" position="top-[15%] right-[25%]" delay={1.2} floatDuration={9} />
        <Geometric3D type="triangle" size={50} color="#8B5CF6" position="bottom-[35%] right-[8%]" delay={0.6} floatDuration={11} />
        <Geometric3D type="cube" size={30} color="#06B6D4" position="top-[60%] left-[20%]" delay={1.4} floatDuration={6} />

        {/* Floating tech icons with 3D effect */}
        {floatingIcons.map(({ Icon, position, delay }, index) => (
          <motion.div
            key={index}
            className={`absolute ${position} text-slate-300`}
            initial={{ opacity: 0, scale: 0, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: delay + 1, duration: 0.8, type: 'spring' }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              animate={{ 
                y: [-15, 15, -15],
                rotateY: [0, 360],
                rotateX: [-10, 10, -10],
              }}
              transition={{ 
                y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay },
                rotateY: { duration: 20, repeat: Infinity, ease: 'linear' },
                rotateX: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Icon size={48} strokeWidth={1} />
            </motion.div>
          </motion.div>
        ))}

        {/* 3D Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-50%)',
            transformOrigin: 'center center',
          }}
        />
      </div>

      {/* Main content with 3D hover effect */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ 
          transformStyle: 'preserve-3d',
          rotateX: useTransform(mouseY, [0, 1], [2, -2]),
          rotateY: useTransform(mouseX, [0, 1], [-2, 2]),
        }}
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full mb-8 shadow-lg shadow-slate-200/50"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm text-slate-600 font-medium">Available for opportunities</span>
        </motion.div>

        {/* Name with 3D reveal animation */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-6 tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.span
            initial={{ y: 100, opacity: 0, rotateX: -90 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 100 }}
            className="inline-block"
            style={{ transformOrigin: 'center bottom' }}
          >
            Hi, I'm{' '}
          </motion.span>
          <motion.span
            initial={{ y: 100, opacity: 0, rotateX: -90, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, rotateX: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: 'spring', stiffness: 100 }}
            className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
            style={{ transformOrigin: 'center bottom' }}
            whileHover={{ scale: 1.05, rotateY: 10 }}
          >
            {personal.name.split(' ')[0]}
          </motion.span>
        </motion.h1>

        {/* Title with 3D effect */}
        <motion.p
          className="text-xl md:text-2xl text-slate-600 mb-4 font-medium"
          initial={{ opacity: 0, y: 20, z: -50 }}
          animate={{ opacity: 1, y: 0, z: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {personal.title}
        </motion.p>

        {/* Subtitle */}
        <motion.p
          className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {personal.subtitle}
        </motion.p>

        {/* CTA Buttons with 3D hover */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <motion.a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-slate-900 text-white rounded-full font-semibold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/25 hoverable"
            whileHover={{ scale: 1.05, y: -3, rotateX: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-white text-slate-900 rounded-full font-semibold text-lg border-2 border-slate-200 hover:border-slate-300 transition-all shadow-lg hoverable"
            whileHover={{ scale: 1.05, y: -3, rotateX: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
            whileTap={{ scale: 0.98 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Social links with 3D hover */}
        <motion.div
          className="flex items-center justify-center gap-4 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          {[
            { Icon: Github, href: personal.social.github, label: 'GitHub', color: 'hover:bg-slate-900 hover:text-white' },
            { Icon: Linkedin, href: personal.social.linkedin, label: 'LinkedIn', color: 'hover:bg-blue-600 hover:text-white' },
            { Icon: () => (
              <svg viewBox="0 0 512 512" className="w-5 h-5" fill="currentColor">
                <path d="M477.5 128C463 103.05 285.13 0 256.16 0S49.25 102.79 34.84 128s-14.49 230.8 0 256 192.38 128 221.32 128S463 409.08 477.49 384s14.51-231 .01-256zM316.13 414.22c-4 0-40.91-35.77-38-38.69.87-.87 6.26-1.48 17.55-1.83 0-26.23.59-68.59.94-86.32 0-2-.44-3.43-.44-5.85h-79.93c0 7.1-.46 36.2 1.37 72.88.23 4.54-1.58 6-5.74 5.94-10.13 0-20.27-.11-30.41-.08-4.1 0-5.87-1.53-5.74-6.11.92-33.44 3-84-.15-212.67v-3.17c-9.67-.35-16.38-1-17.26-1.84-2.92-2.92 34.54-38.69 38.49-38.69s41.17 35.78 38.27 38.69c-.87.87-7.9 1.49-16.77 1.84v3.16c-2.42 25.75-2 79.59-2.63 105.39h80.26c0-4.55.39-34.74-1.2-83.64-.1-3.39.95-5.17 4.21-5.2 11.07-.08 22.15-.13 33.23-.06 3.46 0 4.57 1.72 4.5 5.38C333 354.64 336 341.29 336 373.69c8.87.35 16.82 1 17.69 1.84 2.88 2.91-33.62 38.69-37.58 38.69z"/>
              </svg>
            ), href: personal.social.hackerrank, label: 'HackerRank', color: 'hover:bg-green-600 hover:text-white' },
            { Icon: () => (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
              </svg>
            ), href: personal.social.leetcode, label: 'LeetCode', color: 'hover:bg-amber-500 hover:text-white' },
            { Icon: () => (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.281.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.075.312z"/>
              </svg>
            ), href: personal.social.kaggle, label: 'Kaggle', color: 'hover:bg-cyan-500 hover:text-white' },
            { Icon: () => (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z"/>
              </svg>
            ), href: personal.social.unstop, label: 'Unstop', color: 'hover:bg-indigo-600 hover:text-white' },
            { Icon: () => (
              <svg viewBox="0 0 120 120" className="w-5 h-5" fill="currentColor">
                <path d="M37.6 62.9c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10 10 4.5 10 10zm45.3-10c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm-22.6 0c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zM60 0C26.9 0 0 26.9 0 60s26.9 60 60 60 60-26.9 60-60S93.1 0 60 0zm0 110c-27.6 0-50-22.4-50-50S32.4 10 60 10s50 22.4 50 50-22.4 50-50 50z"/>
              </svg>
            ), href: personal.social.huggingface, label: 'Hugging Face', color: 'hover:bg-yellow-500 hover:text-white' },
            { Icon: Mail, href: `mailto:${personal.email}`, label: 'Email', color: 'hover:bg-red-500 hover:text-white' },
          ].map(({ Icon, href, label, color }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-transparent hover:shadow-lg transition-all hoverable ${color}`}
              whileHover={{ scale: 1.2, y: -5, rotateY: 15, z: 20 }}
              whileTap={{ scale: 0.95 }}
              aria-label={label}
              title={label}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {typeof Icon === 'function' ? <Icon /> : <Icon size={20} />}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator with 3D bounce */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer hoverable"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToAbout}
      >
        <motion.div
          animate={{ y: [0, 10, 0], rotateX: [0, 20, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center text-slate-400"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
