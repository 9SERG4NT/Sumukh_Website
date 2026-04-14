import React, { useEffect } from "react";
import "./App.css";

// Components
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import GitHubProjects from "./components/GitHubProjects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="App">
      {/* Custom cursor - only visible on desktop */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <main className="cursor-none md:cursor-none">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GitHubProjects />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
