import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import {
    getApplications,
    updateApplicationStatus,
    deleteApplication,
    Application
} from '../services/applicationService';
import {
    LogOut,
    RefreshCw,
    Loader2,
    CheckCircle2,
    XCircle,
    Clock,
    Eye,
    Trash2,
    ChevronDown,
    ChevronUp,
    ExternalLink,
    Search,
    Filter
} from 'lucide-react';

const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
    reviewed: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
    accepted: 'bg-green-500/20 text-green-500 border-green-500/30',
    rejected: 'bg-red-500/20 text-red-500 border-red-500/30',
};

const statusIcons = {
    pending: Clock,
    reviewed: Eye,
    accepted: CheckCircle2,
    rejected: XCircle,
};

const Admin: React.FC = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                fetchApplications();
            } else {
                navigate('/admin/login');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const fetchApplications = async () => {
        setIsLoading(true);
        setError('');
        try {
            const data = await getApplications();
            setApplications(data);
        } catch (err) {
            setError('Failed to load applications');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (id: string, status: Application['status']) => {
        try {
            await updateApplicationStatus(id, status);
            setApplications(prev =>
                prev.map(app => app.id === id ? { ...app, status } : app)
            );
        } catch (err) {
            console.error('Failed to update status:', err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this application?')) return;

        try {
            await deleteApplication(id);
            setApplications(prev => prev.filter(app => app.id !== id));
        } catch (err) {
            console.error('Failed to delete:', err);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/admin/login');
    };

    const filteredApplications = applications.filter(app => {
        const matchesSearch =
            app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.role.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || app.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const formatDate = (timestamp: any) => {
        if (!timestamp) return 'N/A';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-band-red animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* Header */}
            <header className="bg-[#0a0a0a] border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-serif font-bold">
                        <span className="text-band-red">HeartBeats</span> Admin
                    </h1>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={fetchApplications}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                            title="Refresh"
                        >
                            <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-lg">
                        <p className="text-3xl font-bold">{applications.length}</p>
                        <p className="text-neutral-500 text-sm uppercase tracking-wider">Total</p>
                    </div>
                    <div className="bg-[#0a0a0a] border border-yellow-500/20 p-6 rounded-lg">
                        <p className="text-3xl font-bold text-yellow-500">
                            {applications.filter(a => a.status === 'pending').length}
                        </p>
                        <p className="text-neutral-500 text-sm uppercase tracking-wider">Pending</p>
                    </div>
                    <div className="bg-[#0a0a0a] border border-green-500/20 p-6 rounded-lg">
                        <p className="text-3xl font-bold text-green-500">
                            {applications.filter(a => a.status === 'accepted').length}
                        </p>
                        <p className="text-neutral-500 text-sm uppercase tracking-wider">Accepted</p>
                    </div>
                    <div className="bg-[#0a0a0a] border border-red-500/20 p-6 rounded-lg">
                        <p className="text-3xl font-bold text-red-500">
                            {applications.filter(a => a.status === 'rejected').length}
                        </p>
                        <p className="text-neutral-500 text-sm uppercase tracking-wider">Rejected</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by name, roll number, email, or role..."
                            className="w-full bg-[#0a0a0a] border border-white/10 py-3 pl-12 pr-4 rounded-lg focus:outline-none focus:border-band-red transition-colors"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-[#0a0a0a] border border-white/10 py-3 pl-12 pr-8 rounded-lg focus:outline-none focus:border-band-red transition-colors appearance-none cursor-pointer"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                        <p className="text-red-500">{error}</p>
                    </div>
                )}

                {/* Loading */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 text-band-red animate-spin" />
                    </div>
                ) : filteredApplications.length === 0 ? (
                    <div className="text-center py-20 text-neutral-500">
                        <p className="text-lg">No applications found</p>
                    </div>
                ) : (
                    /* Applications List */
                    <div className="space-y-4">
                        {filteredApplications.map((app) => {
                            const StatusIcon = statusIcons[app.status];
                            const isExpanded = expandedId === app.id;

                            return (
                                <div
                                    key={app.id}
                                    className="bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden"
                                >
                                    {/* Summary Row */}
                                    <div
                                        className="p-4 flex items-center gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                                        onClick={() => setExpandedId(isExpanded ? null : app.id!)}
                                    >
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
                                            <div>
                                                <p className="font-bold text-white">{app.name}</p>
                                                <p className="text-neutral-500 text-sm">{app.rollNumber}</p>
                                            </div>
                                            <div className="hidden md:block">
                                                <p className="text-neutral-300">{app.role}</p>
                                                {app.otherRole && (
                                                    <p className="text-neutral-500 text-sm">({app.otherRole})</p>
                                                )}
                                            </div>
                                            <div className="hidden md:block">
                                                <p className="text-neutral-400 text-sm">{app.email}</p>
                                                <p className="text-neutral-500 text-sm">{app.phone}</p>
                                            </div>
                                            <div className="hidden md:block">
                                                <p className="text-neutral-500 text-sm">{formatDate(app.submittedAt)}</p>
                                            </div>
                                        </div>

                                        <div className={`px-3 py-1 rounded-full border text-xs uppercase tracking-wider flex items-center gap-1 ${statusColors[app.status]}`}>
                                            <StatusIcon className="h-3 w-3" />
                                            {app.status}
                                        </div>

                                        {isExpanded ? (
                                            <ChevronUp className="h-5 w-5 text-neutral-500" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5 text-neutral-500" />
                                        )}
                                    </div>

                                    {/* Expanded Details */}
                                    {isExpanded && (
                                        <div className="border-t border-white/10 p-6 space-y-6 bg-black/20">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <h4 className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Why this role?</h4>
                                                    <p className="text-neutral-300 text-sm leading-relaxed">{app.whyRole}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Why HeartBeats?</h4>
                                                    <p className="text-neutral-300 text-sm leading-relaxed">{app.whyHeartbeats}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Demo Link</h4>
                                                <a
                                                    href={app.demoLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-band-red hover:underline flex items-center gap-2 text-sm"
                                                >
                                                    {app.demoLink}
                                                    <ExternalLink className="h-4 w-4" />
                                                </a>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                                                <span className="text-xs uppercase tracking-wider text-neutral-500 mr-2">Set Status:</span>
                                                <button
                                                    onClick={() => handleStatusChange(app.id!, 'reviewed')}
                                                    className={`px-3 py-1.5 rounded text-xs uppercase tracking-wider transition-colors ${app.status === 'reviewed'
                                                            ? 'bg-blue-500 text-white'
                                                            : 'bg-blue-500/20 text-blue-500 hover:bg-blue-500/30'
                                                        }`}
                                                >
                                                    Reviewed
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(app.id!, 'accepted')}
                                                    className={`px-3 py-1.5 rounded text-xs uppercase tracking-wider transition-colors ${app.status === 'accepted'
                                                            ? 'bg-green-500 text-white'
                                                            : 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                                                        }`}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(app.id!, 'rejected')}
                                                    className={`px-3 py-1.5 rounded text-xs uppercase tracking-wider transition-colors ${app.status === 'rejected'
                                                            ? 'bg-red-500 text-white'
                                                            : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                                                        }`}
                                                >
                                                    Reject
                                                </button>
                                                <div className="flex-1" />
                                                <button
                                                    onClick={() => handleDelete(app.id!)}
                                                    className="px-3 py-1.5 rounded text-xs uppercase tracking-wider bg-white/5 text-neutral-400 hover:bg-red-500/20 hover:text-red-500 transition-colors flex items-center gap-1"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Admin;
