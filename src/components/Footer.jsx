import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { resumeData } from '../data/mock';

const Footer = () => {
  const { personal, languages } = resumeData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: personal.social.github, label: 'GitHub', color: 'hover:bg-slate-700' },
    { icon: Linkedin, href: personal.social.linkedin, label: 'LinkedIn', color: 'hover:bg-blue-600' },
    { icon: () => (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.115.645 10.885 0 12S13.287 24 12 24s-9.75-4.885-10.395-6c-.641-1.115-.641-10.885 0-12C2.25 4.886 10.715 0 12 0zm2.295 6.799c-.141 0-.258.115-.258.258v3.875H9.963V6.908h.701c.141 0 .254-.115.254-.258 0-.094-.049-.176-.123-.221L9.223 4.896c-.146-.104-.34.007-.34.182v5.167c0 .07.057.127.127.127h1.953v3.879h-.701c-.141 0-.254.115-.254.258 0 .094.049.176.123.221l1.572 1.533c.146.104.34-.007.34-.182V10.88c0-.07-.057-.127-.127-.127h-1.953V6.799h4.074v3.875h-.701c-.141 0-.254.115-.254.258 0 .094.049.176.123.221l1.572 1.533c.146.104.34-.007.34-.182V7.337c0-.07-.057-.127-.127-.127h-1.953V6.799h.701c.141 0 .254-.115.254-.258 0-.094-.049-.176-.123-.221l-1.572-1.533c-.072-.052-.165-.073-.254-.037-.09.036-.146.121-.146.217v.632z"/>
      </svg>
    ), href: personal.social.hackerrank, label: 'HackerRank', color: 'hover:bg-green-600' },
    { icon: () => (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
      </svg>
    ), href: personal.social.leetcode, label: 'LeetCode', color: 'hover:bg-amber-500' },
    { icon: () => (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.281.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.075.312z"/>
      </svg>
    ), href: personal.social.kaggle, label: 'Kaggle', color: 'hover:bg-cyan-500' },
    { icon: Mail, href: `mailto:${personal.email}`, label: 'Email', color: 'hover:bg-red-500' },
  ];

  return (
    <footer className="bg-slate-900 text-white py-16 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600" />
      
      {/* Floating background elements */}
      <motion.div
        className="absolute top-10 right-10 w-40 h-40 rounded-full bg-blue-500/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-purple-500/5 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <motion.a
              href="#"
              className="text-2xl font-bold inline-block mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-blue-500">S</span>umukh
            </motion.a>
            <p className="text-slate-400 mb-6">
              AI/ML Engineer crafting intelligent solutions that make a difference.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center transition-colors ${color}`}
                  title={label}
                >
                  {typeof Icon === 'function' ? <Icon /> : <Icon size={18} />}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Skills', 'Experience', 'Projects', 'GitHub', 'Contact'].map((link) => (
                <li key={link}>
                  <motion.a
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(`#${link.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2"
                    whileHover={{ x: 5 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Profiles & Languages */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Profiles</h4>
            <div className="space-y-2 mb-6">
              {[
                { name: 'GitHub', url: personal.social.github },
                { name: 'LinkedIn', url: personal.social.linkedin },
                { name: 'HackerRank', url: personal.social.hackerrank },
                { name: 'LeetCode', url: personal.social.leetcode },
                { name: 'Kaggle', url: personal.social.kaggle },
                { name: 'Unstop', url: personal.social.unstop },
              ].map((profile) => (
                <motion.a
                  key={profile.name}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
                  whileHover={{ x: 5 }}
                >
                  <ExternalLink size={14} />
                  {profile.name}
                </motion.a>
              ))}
            </div>
            
            <h4 className="font-semibold text-lg mb-3">Languages</h4>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1.5 bg-slate-800 rounded-lg text-sm text-slate-300"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm flex items-center gap-1">
              © {currentYear} {personal.name}. Made with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={14} className="text-red-500 fill-red-500" />
              </motion.span>
            </p>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors"
            >
              <ArrowUp size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
