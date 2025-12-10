import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { TourDate } from '../types';

const tourDates: TourDate[] = [
  { id: '1', date: 'OCT 12', city: 'Mumbai', venue: 'NCPA Theatre', available: true },
  { id: '2', date: 'OCT 15', city: 'London', venue: 'Royal Albert Hall', available: true },
  { id: '3', date: 'OCT 18', city: 'Dubai', venue: 'Dubai Opera', available: false },
  { id: '4', date: 'OCT 22', city: 'New York', venue: 'Carnegie Hall', available: true },
  { id: '5', date: 'NOV 05', city: 'Tokyo', venue: 'Blue Note', available: true },
];

const TourSection: React.FC = () => {
  return (
    <section id="tour" className="py-32 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 reveal-text">
          <h2 className="text-6xl md:text-8xl font-serif font-black uppercase tracking-tighter leading-none">
            Live <br/> <span className="text-band-red">Rituals</span>
          </h2>
          <div className="mt-8 md:mt-0 md:text-right">
             <p className="text-neutral-500 uppercase tracking-widest text-sm mb-2">Upcoming Performances</p>
             <p className="font-serif text-2xl italic">2024 / 2025 World Tour</p>
          </div>
        </div>

        <div className="border-t border-neutral-800">
          {tourDates.map((tour, index) => (
            <div 
              key={tour.id}
              className="group grid grid-cols-1 md:grid-cols-12 gap-6 py-10 border-b border-neutral-800 items-center hover:bg-neutral-900/20 transition-all duration-500 reveal-stagger hover:pl-4"
              style={{transitionDelay: `${index * 100}ms`}}
            >
              {/* Date */}
              <div className="md:col-span-2 group-hover:opacity-100 opacity-60 transition-opacity">
                <span className="block text-xs text-neutral-500 uppercase tracking-widest mb-1">Date</span>
                <span className="text-xl font-mono font-bold text-band-red">{tour.date}</span>
              </div>

              {/* City */}
              <div className="md:col-span-5">
                <span className="text-4xl md:text-6xl font-serif font-bold uppercase text-neutral-300 group-hover:text-white transition-all duration-500 block transform group-hover:-translate-x-2">
                  {tour.city}
                </span>
              </div>

              {/* Venue */}
              <div className="md:col-span-3">
                <span className="block text-xs text-neutral-500 uppercase tracking-widest mb-1">Venue</span>
                <span className="text-lg text-neutral-400 font-light">{tour.venue}</span>
              </div>

              {/* Action */}
              <div className="md:col-span-2 flex justify-start md:justify-end">
                {tour.available ? (
                  <button className="h-14 w-14 rounded-full border border-neutral-800 flex items-center justify-center group-hover:bg-band-red group-hover:border-band-red group-hover:text-white transition-all duration-500 transform group-hover:scale-110">
                    <ArrowUpRight className="h-6 w-6" />
                  </button>
                ) : (
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-600 border border-neutral-800 px-4 py-2 rounded-full cursor-not-allowed opacity-50">
                    Sold Out
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center reveal-text">
            <a href="#" className="inline-block border-b border-neutral-700 pb-1 text-neutral-500 hover:text-white hover:border-white transition-colors uppercase tracking-widest text-xs">
                View Full Tour Schedule
            </a>
        </div>
      </div>
    </section>
  );
};

export default TourSection;