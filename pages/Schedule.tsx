import React, { useEffect } from 'react';
import TourSection from '../components/TourSection';

const Schedule: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        // Quick observer re-init
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        setTimeout(() => {
            document.querySelectorAll('.reveal-text, .reveal-stagger').forEach(el => observer.observe(el));
        }, 100);
    }, []);

    return (
        <div className="pt-24 min-h-screen bg-[#050505]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-5xl md:text-7xl font-serif font-black uppercase mb-12 reveal-text">
                    World <span className="text-band-red">Tour</span>
                </h1>
                <p className="text-xl text-neutral-400 mb-20 max-w-2xl reveal-text">
                    Catch us live across the globe. Experience the raga-rock fusion in its rawest form.
                </p>
                <TourSection />
            </div>
        </div>
    );
};

export default Schedule;