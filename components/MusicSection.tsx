import React from 'react';
import { Play, Share2, Plus, Disc } from 'lucide-react';
import { Song } from '../types';

const songs: Song[] = [
  { id: '1', title: 'Midnight Raga', duration: '6:45', plays: '2.4M' },
  { id: '2', title: 'Electric Tabla', duration: '4:12', plays: '1.8M' },
  { id: '3', title: 'Monsoon Glitch', duration: '3:58', plays: '3.1M' },
  { id: '4', title: 'Sufi Echoes', duration: '5:20', plays: '900K' },
];

const MusicSection: React.FC = () => {
  return (
    <section id="music" className="py-32 bg-[#080808] relative overflow-hidden">
        {/* Background Decorative */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-band-red/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 reveal-text">
          <div>
            <h4 className="text-band-red font-bold tracking-widest uppercase mb-2 text-sm">Discography</h4>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white uppercase leading-none">
              Sonic <br/><span className="italic font-light text-neutral-500">Karma</span>
            </h2>
          </div>
          <div className="mt-8 md:mt-0">
             <p className="text-neutral-400 max-w-sm text-sm leading-relaxed border-l border-neutral-800 pl-6">
                Our latest exploration into the synthesis of classical Indian instruments and analog synthesis.
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Album Art - Large & Sticky if needed, here just visual */}
          <div className="lg:col-span-5 reveal-text">
            <div className="relative group cursor-pointer overflow-hidden img-zoom-container">
                <div className="absolute top-4 -right-4 w-full h-full border border-neutral-800 z-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"></div>
                <div className="relative z-10 overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2670&auto=format&fit=crop" 
                        alt="Sonic Karma Album Art" 
                        className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 img-zoom"
                    />
                    {/* Vinyl Overlay Effect */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-700"></div>
                </div>
                
                <div className="absolute bottom-8 left-8 z-20">
                    <button className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform duration-300">
                        <Play className="h-6 w-6 ml-1 fill-current" />
                    </button>
                </div>
            </div>
            
            <div className="flex justify-between items-end mt-6 border-b border-neutral-800 pb-4">
                <div>
                    <h3 className="text-2xl font-serif font-bold">Sonic Karma</h3>
                    <p className="text-neutral-500 text-sm mt-1 uppercase tracking-wider">LP • 2024</p>
                </div>
                <Disc className="h-6 w-6 text-neutral-600 animate-[spin_4s_linear_infinite]" />
            </div>
          </div>

          {/* Tracklist - Minimal & Sharp */}
          <div className="lg:col-span-7 lg:pl-12 space-y-0">
            {songs.map((song, index) => (
              <div 
                key={song.id} 
                className="hover-trigger group relative flex items-center justify-between py-8 border-b border-neutral-800 hover:border-band-red transition-colors duration-500 reveal-stagger"
                style={{transitionDelay: `${index * 150}ms`}}
              >
                <div className="flex items-center gap-8 md:gap-12">
                  <span className="text-neutral-600 font-mono text-sm group-hover:text-band-red transition-colors duration-300">0{index + 1}</span>
                  <div>
                    <h3 className="hover-target font-serif text-2xl md:text-3xl font-light text-neutral-300">{song.title}</h3>
                  </div>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="hidden md:flex flex-col items-end opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-neutral-400 font-mono text-xs">{song.plays} Streams</span>
                    <span className="text-white font-mono text-xs">{song.duration}</span>
                  </div>
                  <button className="text-neutral-500 hover:text-white transition-colors duration-300 transform group-hover:rotate-90">
                    <Plus className="h-6 w-6" />
                  </button>
                </div>
              </div>
            ))}
            
            <div className="pt-12 flex justify-center md:justify-start reveal-text">
              <button className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-500 hover:text-band-red flex items-center gap-3 transition-colors pb-1 border-b border-transparent hover:border-band-red hover:pl-4 duration-300">
                Stream on Spotify <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;