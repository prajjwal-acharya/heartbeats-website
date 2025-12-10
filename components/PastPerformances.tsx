import React, { useRef, useEffect, useState, useCallback } from 'react';

// Past performances data - structured by category
const performances = {
    festivals: [
        'Mumbai Symphony 2024',
        'NH7 Weekender',
        'Ziro Festival',
        'MTV Unplugged',
        'Kolkata Jazz Fest',
    ],
    events: [
        'Delhi Winter Fest',
        'Bangalore Nights',
        'Pune Music Festival',
        'Hyderabad Cultural Night',
        'Chennai Unplugged',
    ],
    awards: [
        'Best Fusion Act 2024',
        '1st Place – National Band Competition',
        'Critics Choice Award',
        'Rising Stars 2023',
        'Audience Favorite',
    ],
};

const PastPerformances: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isLocked, setIsLocked] = useState(false);
    const [internalProgress, setInternalProgress] = useState(0); // 0 to 100
    const [hasCompleted, setHasCompleted] = useState(false);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Check if section is visible
            const inView = rect.top < viewportHeight && rect.bottom > 0;
            setIsInView(inView);

            // Lock when section top hits the top of viewport (or close to it)
            if (!isLocked && !hasCompleted && rect.top <= 50 && rect.bottom > viewportHeight) {
                setIsLocked(true);
                // Start with video visible
                setInternalProgress(10);
            }
        };

        const handleWheel = (e: WheelEvent) => {
            if (!isLocked) return;

            e.preventDefault();
            e.stopPropagation();

            // Update internal progress based on wheel delta
            setInternalProgress(prev => {
                const delta = e.deltaY > 0 ? 3 : -3; // Scroll speed
                const newProgress = Math.max(0, Math.min(100, prev + delta));

                // Unlock when progress reaches 100%
                if (newProgress >= 100 && !hasCompleted) {
                    setTimeout(() => {
                        setHasCompleted(true);
                        setIsLocked(false);
                    }, 300);
                }

                // Unlock if scrolling back to beginning
                if (newProgress <= 0) {
                    setIsLocked(false);
                }

                return newProgress;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('wheel', handleWheel, { passive: false });

        // Initial check
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('wheel', handleWheel);
        };
    }, [isLocked, hasCompleted]);

    // Lock body scroll when section is active
    useEffect(() => {
        if (isLocked) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        };
    }, [isLocked]);

    // Calculate opacities based on internal progress
    // 0-65: Video visible (starts at 60%, fades to 0%)
    // 65-100: Text appears
    let videoOpacity = 0;
    let textOpacity = 0;

    // When in view but not locked, show video at full brightness
    if (isInView && internalProgress === 0 && !hasCompleted) {
        videoOpacity = 0.6;
    } else if (internalProgress <= 65) {
        // Video visible, fading out as progress increases
        videoOpacity = 0.6 - (internalProgress / 65) * 0.6;
    } else {
        // Text phase
        videoOpacity = 0;
        textOpacity = Math.min(1, (internalProgress - 65) / 25);
    }

    // Show text when video has faded
    const showText = internalProgress > 60;

    return (
        <section
            ref={sectionRef}
            className="relative bg-black"
            style={{ minHeight: '100vh' }}
        >
            <div className="sticky top-0 h-screen overflow-hidden bg-black">
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-band-red/30 pointer-events-none z-10" />
                <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-band-red/30 pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-band-red/30 pointer-events-none z-10" />
                <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-band-red/30 pointer-events-none z-10" />

                {/* Section Header - shows during video phase */}
                <div
                    className="absolute top-12 left-0 right-0 z-30 text-center pointer-events-none transition-opacity duration-300"
                    style={{ opacity: videoOpacity > 0.1 ? 1 : 0 }}
                >
                    <div className="inline-block">
                        <span className="text-[10px] uppercase tracking-[0.5em] text-band-red/80 font-medium">Experience</span>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mt-2">Our Journey</h2>
                        <div className="w-24 h-0.5 bg-band-red mx-auto mt-4" />
                    </div>
                </div>

                {/* Video Background */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-150"
                    style={{ opacity: videoOpacity }}
                >
                    <source src="/performance-video.mp4" type="video/mp4" />
                </video>

                {/* Video overlay gradient */}
                <div
                    className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black z-0 transition-opacity duration-150"
                    style={{ opacity: videoOpacity > 0 ? 0.6 : 0 }}
                />

                {/* TEXT CONTENT - Shows after video fades */}
                <div
                    className="absolute inset-0 z-30 flex items-center justify-center bg-black transition-opacity duration-300"
                    style={{
                        opacity: showText ? 1 : 0,
                        pointerEvents: showText ? 'auto' : 'none',
                    }}
                >
                    <div className="max-w-7xl mx-auto px-8 w-full">
                        {/* Main Title */}
                        <div
                            className="text-center mb-16 transition-all duration-500"
                            style={{
                                transform: `translateY(${(1 - textOpacity) * 30}px)`,
                                opacity: textOpacity,
                            }}
                        >
                            <span className="text-band-red text-sm uppercase tracking-[0.4em] font-semibold">Where We've Been</span>
                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-white mt-4 tracking-tight">
                                Performances
                            </h2>
                        </div>

                        {/* Three Column Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                            {/* Festivals */}
                            <div
                                className="text-center md:text-left transition-all duration-500"
                                style={{
                                    transform: `translateY(${(1 - textOpacity) * 40}px)`,
                                    opacity: textOpacity,
                                }}
                            >
                                <h3 className="text-band-red text-xs uppercase tracking-[0.3em] mb-6 font-bold flex items-center justify-center md:justify-start gap-3">
                                    <span className="w-8 h-px bg-band-red" />
                                    Festivals
                                </h3>
                                <ul className="space-y-3">
                                    {performances.festivals.map((item, idx) => (
                                        <li key={idx} className="text-white text-lg md:text-xl font-light tracking-wide">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Events */}
                            <div
                                className="text-center transition-all duration-500"
                                style={{
                                    transform: `translateY(${(1 - textOpacity) * 50}px)`,
                                    opacity: textOpacity,
                                }}
                            >
                                <h3 className="text-white text-xs uppercase tracking-[0.3em] mb-6 font-bold flex items-center justify-center gap-3">
                                    <span className="w-8 h-px bg-white/50" />
                                    Events
                                    <span className="w-8 h-px bg-white/50" />
                                </h3>
                                <ul className="space-y-3">
                                    {performances.events.map((item, idx) => (
                                        <li key={idx} className="text-white/80 text-lg md:text-xl font-light tracking-wide">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Awards */}
                            <div
                                className="text-center md:text-right transition-all duration-500"
                                style={{
                                    transform: `translateY(${(1 - textOpacity) * 60}px)`,
                                    opacity: textOpacity,
                                }}
                            >
                                <h3 className="text-band-red text-xs uppercase tracking-[0.3em] mb-6 font-bold flex items-center justify-center md:justify-end gap-3">
                                    Awards
                                    <span className="w-8 h-px bg-band-red" />
                                </h3>
                                <ul className="space-y-3">
                                    {performances.awards.map((item, idx) => (
                                        <li key={idx} className="text-band-red text-lg md:text-xl font-medium tracking-wide">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Bottom Stats */}
                        <div
                            className="flex justify-center gap-16 md:gap-24 mt-20 transition-all duration-500"
                            style={{
                                transform: `translateY(${(1 - textOpacity) * 40}px)`,
                                opacity: textOpacity,
                            }}
                        >
                            <div className="text-center">
                                <div className="text-5xl md:text-6xl font-black text-white">50+</div>
                                <div className="text-xs uppercase tracking-[0.2em] text-white/40 mt-2">Shows</div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl md:text-6xl font-black text-band-red">15</div>
                                <div className="text-xs uppercase tracking-[0.2em] text-white/40 mt-2">Cities</div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl md:text-6xl font-black text-white">5</div>
                                <div className="text-xs uppercase tracking-[0.2em] text-white/40 mt-2">Awards</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
                    <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-band-red transition-all duration-100"
                            style={{ width: `${internalProgress}%` }}
                        />
                    </div>
                    {isLocked && (
                        <p className="text-white/30 text-[10px] uppercase tracking-widest text-center mt-2">
                            Scroll to explore
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PastPerformances;
