import React from 'react';
import { ShoppingBag, Loader2 } from 'lucide-react';

const Merch: React.FC = () => {
    return (
        <div className="pt-32 pb-20 min-h-screen bg-[#050505] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-8">
                    <div>
                        <h1 className="text-5xl font-serif font-black uppercase mb-4">Store</h1>
                        <p className="text-neutral-500">Wear the music. Limited edition artifacts.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5 text-band-red" />
                        <span className="text-xs font-bold uppercase tracking-widest">Cart (0)</span>
                    </div>
                </div>

                {/* Coming Soon Message */}
                <div className="flex flex-col items-center justify-center py-32">
                    <div className="relative mb-8">
                        <Loader2 className="h-16 w-16 text-band-red animate-spin" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 text-center">
                        Wait while we are cooking
                    </h2>
                    <p className="text-neutral-500 text-lg text-center max-w-md">
                        Something special is in the works. Check back soon for exclusive merch drops.
                    </p>
                    <div className="mt-8 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-band-red animate-pulse"></span>
                        <span className="text-xs uppercase tracking-widest text-neutral-400">Coming Soon</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Merch;