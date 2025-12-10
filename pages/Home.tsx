import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import MusicSection from '../components/MusicSection';

import Members from '../components/Members';
import PastPerformances from '../components/PastPerformances';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
    // Re-trigger observer on mount
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.reveal-text, .reveal-stagger');
        elements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="bg-[#050505]">
            <Hero />

            <div className="bg-[#0a0a0a] py-12 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-neutral-400 uppercase tracking-widest text-sm text-center md:text-left">
                        Upcoming Show: <span className="text-white font-bold ml-2">Mumbai, NCPA Theatre</span>
                    </p>
                    <Link to="/schedule" className="px-6 py-3 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                        Get Tickets
                    </Link>
                </div>
            </div>

            <PastPerformances />
            <MusicSection />
            <Members />


            {/* Join CTA Section */}
            <section className="py-32 bg-band-red text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 reveal-text">
                    <h2 className="text-6xl md:text-8xl font-serif font-black uppercase mb-8">Play With Us</h2>
                    <p className="text-xl md:text-2xl mb-12 opacity-90 font-light">
                        Are you a master of your craft? We are looking for visionaries to join the HeartBeats collective.
                    </p>
                    <Link to="/join" className="inline-flex items-center gap-3 bg-black text-white px-12 py-6 font-bold uppercase tracking-widest hover:bg-white hover:text-band-red transition-all duration-300 transform hover:-translate-y-1 shadow-2xl">
                        Apply for Audition <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;