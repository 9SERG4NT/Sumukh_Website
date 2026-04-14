import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork, Filter, ChevronRight } from 'lucide-react';
import { githubProjects, languageColors, categories } from '../data/githubProjects';

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      ref={ref}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, type: 'spring' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="block group"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        whileHover={{ y: -8, rotateX: 5, rotateY: -2 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white rounded-2xl p-5 border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300 h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Featured badge */}
        {project.featured && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg"
          >
            Featured
          </motion.div>
        )}

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, ${languageColors[project.language] || '#6366F1'}15 0%, transparent 60%)`,
          }}
        />

        <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Github className="w-5 h-5 text-slate-400" />
              <span className="text-xs text-slate-400 font-medium">{project.date}</span>
            </div>
            <motion.div
              animate={{ rotate: isHovered ? 45 : 0, scale: isHovered ? 1.1 : 1 }}
              className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-slate-900 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </motion.div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-500 mb-4 line-clamp-2 min-h-[40px]">
            {project.description || "No description available"}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            {/* Language badge */}
            <div className="flex items-center gap-2">
              {project.language && (
                <span className="flex items-center gap-1.5 text-xs text-slate-600">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: languageColors[project.language] || '#6B7280' }}
                  />
                  {project.language}
                </span>
              )}
            </div>

            {/* Stars & Forks */}
            <div className="flex items-center gap-3 text-xs text-slate-400">
              {project.stars > 0 && (
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />
                  {project.stars}
                </span>
              )}
              {project.forks > 0 && (
                <span className="flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5" />
                  {project.forks}
                </span>
              )}
            </div>
          </div>

          {/* Category tag */}
          <div className="mt-3 pt-3 border-t border-slate-100">
            <span
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium"
              style={{
                backgroundColor: `${categories.find(c => c.name === project.category)?.color || '#6B7280'}15`,
                color: categories.find(c => c.name === project.category)?.color || '#6B7280',
              }}
            >
              {project.category}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.a>
  );
};

const GitHubProjects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = selectedCategory === 'All'
    ? githubProjects
    : githubProjects.filter(p => p.category === selectedCategory);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 12);

  const stats = {
    total: githubProjects.length,
    hackathons: githubProjects.filter(p => p.category === 'Hackathon').length,
    aiml: githubProjects.filter(p => p.category === 'AI/ML').length,
    featured: githubProjects.filter(p => p.featured).length,
  };

  return (
    <section id="github" className="py-24 bg-slate-50 relative overflow-hidden" ref={ref}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-100/40 to-transparent blur-3xl"
          style={{ top: '-10%', left: '-5%' }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-100/30 to-transparent blur-3xl"
          style={{ bottom: '10%', right: '-5%' }}
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Open Source</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 flex items-center justify-center gap-3">
            <Github className="w-10 h-10" />
            GitHub Projects
          </h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
            Explore my {stats.total} repositories including {stats.hackathons} hackathon projects and {stats.aiml} AI/ML implementations
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-6 mt-6">
            {[
              { label: 'Repositories', value: stats.total },
              { label: 'Hackathons', value: stats.hackathons },
              { label: 'AI/ML Projects', value: stats.aiml },
              { label: 'Featured', value: stats.featured },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-center"
              >
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2 flex-wrap mb-10"
        >
          <Filter className="w-4 h-4 text-slate-400 mr-2" />
          {categories.map((category) => (
            <motion.button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.name
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {category.name}
              {category.name !== 'All' && (
                <span className="ml-1.5 text-xs opacity-60">
                  ({githubProjects.filter(p => p.category === category.name).length})
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          style={{ perspective: '2000px' }}
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show More/Less Button */}
        {filteredProjects.length > 12 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center mt-10"
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-full text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            >
              {showAll ? 'Show Less' : `Show All ${filteredProjects.length} Projects`}
              <ChevronRight className={`w-4 h-4 transition-transform ${showAll ? 'rotate-90' : ''}`} />
            </motion.button>
          </motion.div>
        )}

        {/* GitHub Profile Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/9SERG4NT"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/25"
          >
            <Github className="w-5 h-5" />
            View Full GitHub Profile
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubProjects;
