import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Award, Calendar } from 'lucide-react';
import { resumeData } from '../data/mock';

const ExperienceCard = ({ experience, index, isLast }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      <div className="flex items-start gap-6">
        {/* Timeline line and dot */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              experience.type === 'Hackathon'
                ? 'bg-amber-100'
                : 'bg-blue-100'
            }`}
          >
            {experience.type === 'Hackathon' ? (
              <Award className={`w-6 h-6 text-amber-600`} />
            ) : (
              <Briefcase className={`w-6 h-6 text-blue-600`} />
            )}
          </motion.div>
          {!isLast && (
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
              className="w-0.5 bg-slate-200 flex-grow mt-4"
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-grow pb-12">
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all duration-300"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                experience.type === 'Hackathon'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {experience.type}
              </span>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Calendar size={14} />
                {experience.duration}
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-1">{experience.role}</h3>
            <p className="text-blue-600 font-medium mb-4">{experience.company}</p>

            <ul className="space-y-3">
              {experience.highlights.map((highlight, hIndex) => (
                <motion.li
                  key={hIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.2 + 0.3 + hIndex * 0.1 }}
                  className="flex items-start gap-3 text-slate-600"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { experience } = resumeData;

  return (
    <section id="experience" className="py-24 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Career Path</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2">Experience</h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
            My journey through internships, hackathons, and research
          </p>
        </motion.div>

        <div className="relative">
          {experience.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              index={index}
              isLast={index === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
