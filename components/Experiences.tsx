import React, { useEffect, useRef, useState } from 'react';

interface Experience {
    id: number;
    title: string;
    role: string;
    period: string;
    description: string;
    image: string;
}

const experiences: Experience[] = [
    {
        id: 1,
        title: "Fusion World Tour",
        role: "Headlining Act",
        period: "2023 - Present",
        description: "Leading the global movement of Indian-Electronic fusion, performing at major festivals across 4 continents.",
        image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Sonic Roots Initiative",
        role: "Cultural Ambassador",
        period: "2022",
        description: "Collaborated with traditional rural artisans to sample rare indigenous instruments and preserve their sounds digitally.",
        image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2664&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Digital Symphony",
        role: "Composer",
        period: "2021",
        description: "Scored the award-winning short film 'Neon Dharma', blending Sitar arpeggios with granular synthesis.",
        image: "https://images.unsplash.com/photo-1519683109079-d5f539e1d429?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "The Basement Tapes",
        role: "Origin Story",
        period: "2019 - 2020",
        description: "Where it all began. Weekly underground jam sessions that accidentally went viral and formed the tribe.",
        image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2070&auto=format&fit=crop"
    }
];

const Experiences: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const { top, height } = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate progress: 0 when top enters view, 1 when bottom leaves
            // We want the effect to be active primarily when the item is in the "hot zone" (center of screen)

            // Adjust logic: start animation when section enters viewport
            const startOffset = windowHeight;
            const endOffset = -height;

            // Create a normalized 0-1 value based on how much of the section has been scrolled through relative to viewport
            // This is a "global" scroll progress for the whole section
            const totalDistance = height + windowHeight;
            const currentPosition = windowHeight - top;
            const progress = Math.max(0, Math.min(1, currentPosition / totalDistance));

            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Init

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            ref={containerRef}
            className="py-24 bg-black relative text-white overflow-hidden min-h-[300vh]" // Increased height for slower scroll runway
            style={{ perspective: '1000px' }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black to-[#050505] -z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10 text-center mb-24">
                <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-700 reveal-text">
                    The Journey
                </h2>
                <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                    From underground basements to global stages.
                </p>
            </div>

            <div className="max-w-5xl mx-auto space-y-32">
                {experiences.map((exp, index) => (
                    <ExperienceCard
                        key={exp.id}
                        experience={exp}
                        index={index}
                        parentProgress={scrollProgress}
                    />
                ))}
            </div>
        </section>
    );
};

interface CardProps {
    experience: Experience;
    index: number;
    parentProgress: number; // 0 to 1 representing the whole section's traversal
}

const ExperienceCard: React.FC<CardProps> = ({ experience, index, parentProgress }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<React.CSSProperties>({});
    const [glowIntensity, setGlowIntensity] = useState(0);

    // Determines left or right start
    const isEven = index % 2 === 0;

    useEffect(() => {
        const calculateTransformation = () => {
            if (!cardRef.current) return;

            const rect = cardRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const center = windowHeight / 2;
            const cardCenter = rect.top + rect.height / 2;

            // Distance from center of viewport (pixels)
            const distFromCenter = cardCenter - center;

            // Dampening
            const dampening = 1.5;

            // Normalize distance for effect range
            const range = 800; // Extend range for longer animation

            let z = 0;
            let x = 0;
            let opacity = 1;
            let rotateY = 0;

            if (distFromCenter > 0) {
                // Coming from bottom (Future)
                const rawProgress = Math.min(1, distFromCenter / (windowHeight * dampening));

                // Phase 1: The Approach (Zooming in from center)
                // We want this to take up most of the scroll time (e.g., 0% to 75%)
                // Phase 2: The Docking (Sliding to side)
                // Happens at the very end (75% to 100%)

                const dockThreshold = 0.25; // The last 25% of the distance is for docking

                // Z-Axis: Continuous approach from -3000 to 0
                // Uses a slight power curve for "speed up" effect at end or just linear?
                // Linear feels consistent.
                z = -3000 * rawProgress;

                // Fade in logic
                // Visible throughout most of the approach
                opacity = 1 - (rawProgress * 0.3); // Never fully fade out until very very deep
                if (rawProgress > 0.9) opacity = (1 - rawProgress) * 10; // Rapid fade at the very start of insertion

                // X-Axis Logic
                // If we are "far away" (rawProgress > dockThreshold), we stay at X=0
                // If we are "close" (rawProgress < dockThreshold), we slide from 0 to finalXOffset

                const finalXOffset = isEven ? -400 : 400;

                if (rawProgress > dockThreshold) {
                    // Still "zooming in" - keep centered
                    x = 0;
                    // Optional: add slight random drift or wobble? No, keep it clean "from center"
                } else {
                    // Phase 2: Docking
                    // normalizedDockProgress goes from 0 (at threshold) to 1 (at arrived)
                    // actually rawProgress goes from threshold -> 0

                    // map rawProgress [dockThreshold -> 0] to [0 -> 1]
                    // when rawProgress = dockThreshold, we want x=0
                    // when rawProgress = 0, we want x=finalXOffset

                    const dockingRatio = 1 - (rawProgress / dockThreshold); // 0 to 1

                    // Use ease-out for docking so it feels magnetic
                    const ease = 1 - Math.pow(1 - dockingRatio, 3);

                    x = finalXOffset * ease;
                }

                // Rotation
                // No rotation when deep in center.
                // Rotate slightly only when docking to emphasize the slide.
                if (rawProgress <= dockThreshold) {
                    const dockingRatio = 1 - (rawProgress / dockThreshold);
                    rotateY = isEven ? 15 * dockingRatio : -15 * dockingRatio;
                } else {
                    rotateY = 0;
                }

            } else {  // Moving above center (leaving view)
                const leaveProgress = Math.abs(distFromCenter) / (windowHeight * 0.5);
                opacity = 1 - Math.min(1, leaveProgress);
                z = -500 * Math.min(1, leaveProgress); // Push back into darkness
                // Keep X offset stable as it leaves
                x = isEven ? -400 : 400;
            }

            // Glow Calculation
            const proximity = 1 - Math.min(1, Math.abs(distFromCenter) / 400);
            setGlowIntensity(proximity);

            setStyle({
                transform: `translate3d(${x}px, 0, ${z}px) rotateY(${rotateY}deg)`,
                opacity: Math.max(0, opacity),
            });
        };

        window.addEventListener('scroll', calculateTransformation);
        calculateTransformation();
        return () => window.removeEventListener('scroll', calculateTransformation);
    }, [index, isEven]);

    // Dynamic glow color
    const glowColor = `rgba(220, 38, 38, ${glowIntensity * 0.8})`; // Red base
    const secondaryGlow = `rgba(245, 158, 11, ${glowIntensity * 0.6})`; // Amber

    return (
        <div
            ref={cardRef}
            className={`flex flex-col items-center gap-6 w-full max-w-xl mx-auto transition-shadow duration-300 relative`}
            style={{
                ...style,
                willChange: 'transform, opacity, box-shadow'
            }}
        >
            {/* Visual Content (Card) */}
            <div
                className="w-full aspect-[4/3] overflow-hidden rounded-xl bg-neutral-900 border border-white/10 relative group shadow-2xl"
                style={{
                    boxShadow: `0 0 ${glowIntensity * 50}px ${glowColor}, 0 0 ${glowIntensity * 20}px ${secondaryGlow}`
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                    <span
                        className="inline-block px-3 py-1 mb-2 text-xs font-bold tracking-widest uppercase bg-band-red text-white"
                        style={{ opacity: 0.8 + (glowIntensity * 0.2) }}
                    >
                        {experience.period}
                    </span>
                    <h3 className="text-3xl font-serif font-bold text-white leading-none">{experience.title}</h3>
                </div>
            </div>

            {/* Text Content (Underneath) */}
            <div className={`w-full text-center px-4`}>
                <h4 className="text-sm text-band-red font-bold uppercase tracking-widest mb-2 opacity-80">{experience.role}</h4>
                <p className="text-neutral-400 text-base leading-relaxed">
                    {experience.description}
                </p>
            </div>

            {/* Connecting Line (Optional - to visualize the timeline) */}
            <div className={`absolute top-1/2 left-1/2 w-0.5 h-32 bg-gradient-to-b from-transparent via-red-500/30 to-transparent -z-10 transform -translate-x-1/2 -translate-y-1/2 ${glowIntensity > 0.5 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} />
        </div>
    );
};

export default Experiences;
