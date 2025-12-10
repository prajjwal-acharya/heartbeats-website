import React from 'react';
import { Play } from 'lucide-react';
import ThreeHero from './ThreeHero';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#050505]">
      {/* 3D Background */}
      <ThreeHero />
      
      {/* Gradient Overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80 pointer-events-none z-0"></div>

      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        <div className="reveal-text">
            <h2 className="text-band-red text-sm md:text-base font-bold tracking-[0.4em] uppercase mb-6 flex items-center justify-center gap-4">
                <span className="w-12 h-[1px] bg-band-red"></span>
                The Fusion Era
                <span className="w-12 h-[1px] bg-band-red"></span>
            </h2>
        </div>
        
        <div className="reveal-text" style={{transitionDelay: '200ms'}}>
            <h1 className="text-7xl md:text-9xl font-serif font-black uppercase tracking-tighter mb-8 leading-[0.9] text-white mix-blend-difference">
            Heart<span className="text-stroke-1 text-transparent bg-clip-text bg-gradient-to-r from-band-red to-white italic font-light">Beats</span>
            </h1>
        </div>

        <div className="reveal-text" style={{transitionDelay: '400ms'}}>
            <p className="text-lg md:text-xl text-neutral-300 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            We are HeartBeats. A sonic collision of ancient Ragas and futuristic Rhythms. 
            Born in the streets of Mumbai, perfected in the studios of London. 
            We blend the sitar's soul with the synthesizer's heartbeat.
            </p>
        </div>

        <div className="reveal-text flex flex-col sm:flex-row items-center justify-center gap-6" style={{transitionDelay: '600ms'}}>
          <Link to="/join" className="group relative px-10 py-5 bg-white text-black font-bold uppercase tracking-widest overflow-hidden transition-all hover:bg-band-red hover:text-white hover:scale-105 duration-300">
            <span className="relative z-10 flex items-center gap-3">
              Join The Tribe
            </span>
          </Link>
          <Link to="/schedule" className="group px-10 py-5 border border-white/20 text-white font-bold uppercase tracking-widest hover:border-band-red hover:text-band-red transition-all hover:scale-105 duration-300">
            See Live Dates
          </Link>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-[fadeIn_2s_ease-in_2s_forwards]">
        <span className="text-[10px] uppercase tracking-widest text-neutral-500">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent animate-pulse"></div>
      </div>
    </div>
  );
};

export default Hero;