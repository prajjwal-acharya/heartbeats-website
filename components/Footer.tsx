import React from 'react';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#050505] border-t border-neutral-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-20">
          <div className="mb-12 lg:mb-0 max-w-lg">
            <h2 className="text-4xl font-serif font-black uppercase tracking-wider mb-6">Heart<span className="text-band-red">Beats</span></h2>
            <p className="text-neutral-500 text-lg font-light leading-relaxed mb-8">
                Blending the intricate rhythms of classical India with the raw power of modern electronics. We are the bridge between traditions.
            </p>
            <div className="flex flex-col space-y-2 text-neutral-400">
                <a href="mailto:booking@heartbeats.band" className="hover:text-white transition-colors">booking@heartbeats.band</a>
                <a href="mailto:press@heartbeats.band" className="hover:text-white transition-colors">press@heartbeats.band</a>
            </div>
          </div>
          
          <div className="flex gap-4">
            {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 border border-neutral-800 flex items-center justify-center hover:bg-band-red hover:border-band-red hover:text-white text-neutral-500 transition-all duration-300">
                    <Icon className="h-5 w-5" />
                </a>
            ))}
          </div>
        </div>

        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest text-neutral-600">
          <p>&copy; 2024 HeartBeats Official.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-neutral-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-neutral-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-neutral-400 transition-colors">Credits</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;