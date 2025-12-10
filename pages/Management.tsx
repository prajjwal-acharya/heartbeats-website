import React, { useState } from 'react';
import { Lock, FolderOpen, Users, Calendar, DollarSign } from 'lucide-react';

const Management: React.FC = () => {
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password.toLowerCase() === 'raga') {
            setAuthenticated(true);
            setError('');
        } else {
            setError('Invalid credentials provided.');
        }
    };

    if (authenticated) {
        return (
            <div className="pt-32 pb-20 min-h-screen bg-[#050505] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-8">
                        <h1 className="text-4xl font-serif font-bold">Band Dashboard</h1>
                        <span className="bg-green-900/30 text-green-500 border border-green-900 px-4 py-1 rounded-full text-xs uppercase tracking-widest">
                            Authorized
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            { title: 'Total Revenue', value: '$124,500', icon: DollarSign },
                            { title: 'Upcoming Shows', value: '12', icon: Calendar },
                            { title: 'Active Crew', value: '24', icon: Users },
                            { title: 'Pending Contracts', value: '3', icon: FolderOpen },
                        ].map((stat, i) => (
                            <div key={i} className="bg-[#0a0a0a] border border-white/5 p-6 hover:border-band-red/50 transition-colors">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-neutral-500 text-xs uppercase tracking-widest">{stat.title}</h3>
                                    <stat.icon className="h-5 w-5 text-band-red" />
                                </div>
                                <p className="text-3xl font-serif font-bold">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-[#0a0a0a] border border-white/5 p-8">
                         <h3 className="text-xl font-serif mb-6">Internal Documents</h3>
                         <div className="space-y-4">
                            {['Rider_2024_v2.pdf', 'Setlist_Mumbai_Draft.pdf', 'Lighting_Plot_Arena.pdf', 'Contract_Sony_Music.pdf'].map((doc, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <FolderOpen className="h-5 w-5 text-neutral-400" />
                                        <span>{doc}</span>
                                    </div>
                                    <span className="text-xs text-neutral-500 uppercase tracking-wide">Download</span>
                                </div>
                            ))}
                         </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-band-red"></div>
                
                <div className="flex justify-center mb-8">
                    <div className="p-4 bg-white/5 rounded-full">
                        <Lock className="h-8 w-8 text-band-red" />
                    </div>
                </div>
                
                <h2 className="text-2xl font-serif font-bold text-center text-white mb-2">Restricted Access</h2>
                <p className="text-neutral-500 text-center text-sm mb-8">Enter management passphrase to continue.</p>
                
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#050505] border border-neutral-800 p-4 text-center text-white focus:border-band-red focus:outline-none transition-colors"
                            placeholder="Passphrase"
                        />
                    </div>
                    
                    {error && <p className="text-band-red text-xs text-center">{error}</p>}
                    
                    <button type="submit" className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 hover:bg-band-red hover:text-white transition-colors">
                        Unlock
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Management;