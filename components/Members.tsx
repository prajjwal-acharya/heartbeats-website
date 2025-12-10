import React, { useRef, useEffect, useState } from 'react';
import { Member } from '../types';

// 20+ members for the gallery
const members: Member[] = [
  { id: '1', name: 'Arjun Vance', role: 'Sitar & Synths', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=400&auto=format&fit=crop', bio: '' },
  { id: '2', name: 'Sarah Khan', role: 'Vocals & Tabla', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop', bio: '' },
  { id: '3', name: 'Leo Chen', role: 'Electric Bass', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', bio: '' },
  { id: '4', name: 'Maya', role: 'Drums', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop', bio: '' },
  { id: '5', name: 'Elena R.', role: 'Flute', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=60', bio: '' },
  { id: '6', name: 'Marcus', role: 'Keys', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60', bio: '' },
  { id: '7', name: 'Priya', role: 'Violin', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60', bio: '' },
  { id: '8', name: 'Sam', role: 'Guitar', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60', bio: '' },
  { id: '9', name: 'Nina', role: 'Vocals', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60', bio: '' },
  { id: '10', name: 'David', role: 'Percussion', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60', bio: '' },
  { id: '11', name: 'Aisha', role: 'Sarod', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60', bio: '' },
  { id: '12', name: 'Ben', role: 'Saxophone', image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&auto=format&fit=crop&q=60', bio: '' },
  { id: '13', name: 'Clara', role: 'Cello', image: 'https://images.unsplash.com/photo-1554151228-14d9def656ec?w=400&auto=format&fit=crop&q=60', bio: '' },
  { id: '14', name: 'Dev', role: 'Tabla', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&auto=format&fit=crop&q=60', bio: '' },
  { id: '15', name: 'Eva', role: 'Harp', image: 'https://images.unsplash.com/photo-1491349174775-aaafddd81942?w=400&auto=format&fit=crop&q=60', bio: '' },
  { id: '16', name: 'Frank', role: 'Trumpet', image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&auto=format&fit=crop&q=60', bio: '' },
  { id: '17', name: 'Grace', role: 'Piano', image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&auto=format&fit=crop&q=60', bio: '' },
  { id: '18', name: 'Henry', role: 'Bass', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60', bio: '' },
  { id: '19', name: 'Isla', role: 'Vocals', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60', bio: '' },
  { id: '20', name: 'Jack', role: 'Electronics', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&auto=format&fit=crop&q=60', bio: '' },
];

const Members: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const viewportHeight = window.innerHeight;

      if (sectionTop <= 0 && sectionTop >= -viewportHeight) {
        const progress = Math.abs(sectionTop) / viewportHeight;
        setScrollProgress(Math.min(progress, 1));
      } else if (sectionTop > 0) {
        setScrollProgress(0);
      } else {
        setScrollProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const titleOpacity = 1 - scrollProgress;
  const titleScale = 1 - (scrollProgress * 0.1);

  // Calculate row and column for offset pattern
  const getOffset = (idx: number, cols: number) => {
    const row = Math.floor(idx / cols);
    const col = idx % cols;
    // Alternate offset: odd rows shift right, odd columns shift down
    const translateY = col % 2 === 1 ? '12px' : '0';
    const translateX = row % 2 === 1 ? '8px' : '0';
    return { translateX, translateY };
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
    >
      {/* Title section */}
      <div
        className="h-screen flex items-center justify-center pointer-events-none"
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
        }}
      >
        <h2 className="text-[8vw] md:text-[6vw] font-serif font-bold uppercase text-center leading-none tracking-tighter">
          <span className="text-white">Meet Our</span>
          <span className="text-band-red ml-4">Members</span>
        </h2>
      </div>

      {/* Grid section with modern offset layout */}
      <div className="bg-black px-2 py-4">
        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-2 md:gap-3">
          {members.map((member, idx) => {
            const offset = getOffset(idx, 5);
            return (
              <div
                key={member.id}
                className="group relative overflow-hidden cursor-crosshair rounded-sm"
                style={{
                  aspectRatio: '3/4',
                  transform: `translate(${offset.translateX}, ${offset.translateY})`,
                }}
              >
                {/* Member image - 10% visible, 70% on hover, pure B&W */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-10 group-hover:opacity-70 transition-all duration-300 scale-110 group-hover:scale-100"
                />

                {/* Black background */}
                <div className="absolute inset-0 bg-black -z-10" />

                {/* Name overlay on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs font-bold text-white uppercase tracking-wider truncate">{member.name}</p>
                  <p className="text-[10px] text-band-red uppercase tracking-widest">{member.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Members;