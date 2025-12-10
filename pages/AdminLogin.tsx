import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

const AdminLogin: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin');
        } catch (err: any) {
            console.error('Login error:', err);
            if (err.code === 'auth/invalid-credential') {
                setError('Invalid email or password');
            } else if (err.code === 'auth/too-many-requests') {
                setError('Too many failed attempts. Please try again later.');
            } else {
                setError('Failed to login. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif font-black text-white uppercase mb-4">
                        Admin <span className="text-band-red">Portal</span>
                    </h1>
                    <p className="text-neutral-500 text-sm">
                        Authorized personnel only
                    </p>
                </div>

                <div className="bg-[#0a0a0a] border border-white/10 p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
                                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                                <p className="text-red-500 text-sm">{error}</p>
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-3">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-600" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-transparent border border-neutral-700 py-4 pl-12 pr-4 text-white focus:outline-none focus:border-band-red transition-colors"
                                    placeholder="admin@heartbeats.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-3">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-600" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-transparent border border-neutral-700 py-4 pl-12 pr-4 text-white focus:outline-none focus:border-band-red transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-band-red text-white font-bold uppercase tracking-widest hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
