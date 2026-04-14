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
          className="flex items-center justify-center gap-3 flex-wrap"
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
                <path d="M12 0C5.394 0 0 5.394 0 12s5.394 12 12 12 12-5.394 12-12S18.606 0 12 0Zm-1.2 16.86H8.303v-1.127c-.715 1.091-1.588 1.552-2.897 1.552-2.085 0-3.248-1.2-3.248-3.333V7.248h2.509v6.182c0 1.164.533 1.722 1.6 1.722 1.224 0 2.012-.752 2.012-1.891V7.236h2.509v9.625zm8.533 0v-5.939c0-1.14-.533-1.721-1.6-1.721-1.224 0-2.012.752-2.012 1.89v5.77h-2.509V7.237h2.497V8.63c.715-1.09 1.588-1.551 2.897-1.551 2.085 0 3.249 1.2 3.249 3.333v6.449z"/>
              </svg>
            ), href: personal.social.unstop, label: 'Unstop', color: 'hover:bg-[#1C4980] hover:text-white' },
            { Icon: () => (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378M8.327 6.583a1.5 1.5 0 0 1 .713.174 1.487 1.487 0 0 1 .617 2.013c-.183.343-.762-.214-1.102-.094-.38.134-.532.914-.917.71a1.487 1.487 0 0 1 .69-2.803m7.486 0a1.487 1.487 0 0 1 .689 2.803c-.385.204-.536-.576-.916-.71-.34-.12-.92.437-1.103.094a1.487 1.487 0 0 1 .617-2.013 1.5 1.5 0 0 1 .713-.174m-10.68 1.55a.96.96 0 1 1 0 1.921.96.96 0 0 1 0-1.92m13.838 0a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92M8.489 11.458c.588.01 1.965 1.157 3.572 1.164 1.607-.007 2.984-1.155 3.572-1.164.196-.003.305.12.305.454 0 .886-.424 2.328-1.563 3.202-.22-.756-1.396-1.366-1.63-1.32q-.011.001-.02.006l-.044.026-.01.008-.03.024q-.018.017-.035.036l-.032.04a1 1 0 0 0-.058.09l-.014.025q-.049.088-.11.19a1 1 0 0 1-.083.116 1.2 1.2 0 0 1-.173.18q-.035.029-.075.058a1.3 1.3 0 0 1-.251-.243 1 1 0 0 1-.076-.107c-.124-.193-.177-.363-.337-.444-.034-.016-.104-.008-.2.022q-.094.03-.216.087-.06.028-.125.063l-.13.074q-.067.04-.136.086a3 3 0 0 0-.135.096 3 3 0 0 0-.26.219 2 2 0 0 0-.12.121 2 2 0 0 0-.106.128l-.002.002a2 2 0 0 0-.09.132l-.001.001a1.2 1.2 0 0 0-.105.212q-.013.036-.024.073c-1.139-.875-1.563-2.317-1.563-3.203 0-.334.109-.457.305-.454"/>
              </svg>
            ), href: personal.social.huggingface, label: 'Hugging Face', color: 'hover:bg-yellow-500 hover:text-white' },
            { Icon: () => (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z"/>
              </svg>
            ), href: personal.social.orcid, label: 'ORCID', color: 'hover:bg-[#A6CE39] hover:text-white' },
            { Icon: () => (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.123 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .077.53h-.005a3.334 3.334 0 0 0 .113.438c.245.743.65 1.303 1.214 1.68.565.376 1.256.564 2.075.564.8 0 1.536-.213 2.105-.603.57-.39.94-.916 1.175-1.65.076-.235.135-.558.177-.93a10.9 10.9 0 0 0 .043-1.207v-.82c0-.095-.047-.142-.14-.142h-3.064c-.094 0-.14.047-.14.141v.956c0 .094.046.14.14.14h1.666c.056 0 .084.03.084.086 0 .36 0 .62-.036.865-.038.244-.1.447-.147.606-.108.385-.348.664-.638.876-.29.212-.738.35-1.227.35-.545 0-.901-.15-1.21-.353-.306-.203-.517-.454-.67-.915a3.136 3.136 0 0 1-.147-.762 17.366 17.367 0 0 1-.034-.656c-.01-.26-.014-.572-.014-.939a26.401 26.403 0 0 1 .014-.938 15.821 15.822 0 0 1 .035-.656 3.19 3.19 0 0 1 .148-.76 1.89 1.89 0 0 1 .742-1.01c.344-.244.593-.352 1.137-.352.508 0 .815.096 1.144.303.33.207.528.492.764.925.047.094.111.118.198.07l1.044-.43c.075-.048.09-.115.042-.199a3.549 3.549 0 0 0-.466-.742 3 3 0 0 0-.679-.607 3.313 3.313 0 0 0-.903-.41A4.068 4.068 0 0 0 19.586 0zM8.217 5.836c-1.69 0-3.036.086-4.297.086-1.146 0-2.291 0-3.007-.029v.831l1.088.2c.744.144 1.174.488 1.174 2.264v11.288c0 1.777-.43 2.12-1.174 2.263l-1.088.2v.832c.773-.029 2.12-.086 3.465-.086 1.29 0 2.951.057 3.667.086v-.831l-1.49-.2c-.773-.115-1.174-.487-1.174-2.264v-4.784c.688.057 1.29.057 2.206.057 1.748 3.123 3.41 5.472 4.355 6.56.86 1.032 2.177 1.691 3.839 1.691.487 0 1.003-.086 1.318-.23v-.744c-1.031 0-2.063-.716-2.808-1.518-1.26-1.376-2.95-3.582-4.355-6.074 2.32-.545 4.04-2.722 4.04-4.9 0-3.208-2.492-4.698-5.758-4.698zm-.515 1.29c2.406 0 3.839 1.26 3.839 3.552 0 2.263-1.547 3.782-4.097 3.782-.974 0-1.404-.03-2.063-.086v-7.19c.66-.059 1.547-.059 2.32-.059z"/>
              </svg>
            ), href: personal.social.researchgate, label: 'ResearchGate', color: 'hover:bg-[#00CCBB] hover:text-white' },
            { Icon: Mail, href: `mailto:${personal.email}`, label: 'Email', color: 'hover:bg-red-500 hover:text-white' },
          ].map(({ Icon, href, label, color }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-transparent hover:shadow-lg transition-all hoverable ${color}`}
              whileHover={{ scale: 1.15, y: -4, rotateY: 10 }}
              whileTap={{ scale: 0.95 }}
              aria-label={label}
              title={label}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {typeof Icon === 'function' ? <Icon /> : <Icon size={18} />}
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
