import React from 'react';
import { Play } from 'lucide-react';

const performances = [
    {
        id: 1,
        title: "Live at Royal Albert Hall",
        year: "2023",
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Mumbai Midnight Session",
        year: "2024",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Coachella Sunset Set",
        year: "2022",
        image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=2670&auto=format&fit=crop"
    }
];

const BestPerformances: React.FC = () => {
  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-end mb-12 reveal-text">
            <div>
                <h4 className="text-band-red font-bold tracking-widest uppercase mb-2 text-sm">Experience</h4>
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white uppercase">Legendary <br/> <span className="italic font-light text-neutral-500">Nights</span></h2>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {performances.map((perf, idx) => (
                <div key={perf.id} className="group relative aspect-video cursor-pointer overflow-hidden reveal-stagger" style={{transitionDelay: `${idx * 150}ms`}}>
                    <img src={perf.image} alt={perf.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-band-red rounded-full flex items-center justify-center text-white transform scale-50 group-hover:scale-100 transition-transform duration-300">
                            <Play className="h-6 w-6 ml-1 fill-current" />
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black to-transparent">
                        <p className="text-neutral-400 text-xs font-mono mb-1">{perf.year}</p>
                        <h3 className="text-xl font-serif font-bold text-white group-hover:text-band-red transition-colors">{perf.title}</h3>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default BestPerformances;