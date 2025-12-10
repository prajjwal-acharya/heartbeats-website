import React, { useState, useEffect } from 'react';
import { Send, AlertCircle, CheckCircle2, Clock, Loader2 } from 'lucide-react';
import { submitApplication, checkExistingApplication } from '../services/applicationService';

const roles = [
    'Vocalist',
    'Drums',
    'Guitar',
    'Bass',
    'Keyboard',
    'Tabla',
    'Flute',
    'Manager',
    'Photographer',
    'Videographer',
    'Photo-Video Editor',
    'Others'
];

interface FormData {
    rollNumber: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    otherRole: string;
    whyRole: string;
    whyHeartbeats: string;
    demoLink: string;
}

interface FormErrors {
    rollNumber?: string;
    name?: string;
    email?: string;
    phone?: string;
    role?: string;
    otherRole?: string;
    whyRole?: string;
    whyHeartbeats?: string;
    demoLink?: string;
}

const Join: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        rollNumber: '',
        name: '',
        email: '',
        phone: '',
        role: '',
        otherRole: '',
        whyRole: '',
        whyHeartbeats: '',
        demoLink: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [alreadyApplied, setAlreadyApplied] = useState(false);

    // Auto-generate email when roll number changes
    useEffect(() => {
        if (formData.rollNumber && formData.rollNumber.length >= 1) {
            const autoEmail = `${formData.rollNumber.toLowerCase()}@nitrkl.ac.in`;
            // Only auto-fill if email is empty or follows the nitrkl pattern
            if (!formData.email || formData.email.endsWith('@nitrkl.ac.in')) {
                setFormData(prev => ({ ...prev, email: autoEmail }));
            }
        }
    }, [formData.rollNumber]);

    const countWords = (text: string): number => {
        return text.trim().split(/\s+/).filter(word => word.length > 0).length;
    };

    const validateField = (name: string, value: string): string | undefined => {
        switch (name) {
            case 'rollNumber':
                if (!value) return 'Roll number is required';
                if (!/^[a-zA-Z0-9]{9}$/.test(value)) return 'Roll number must be exactly 9 alphanumeric characters';
                break;
            case 'name':
                if (!value.trim()) return 'Name is required';
                break;
            case 'email':
                if (!value) return 'Email is required';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
                break;
            case 'phone':
                if (!value) return 'Phone number is required';
                // Indian phone: optional +91, then 10 digits starting with 6-9
                if (!/^(\+91[\-\s]?)?[6-9]\d{9}$/.test(value.replace(/\s/g, ''))) {
                    return 'Please enter a valid Indian phone number (10 digits starting with 6-9)';
                }
                break;
            case 'role':
                if (!value) return 'Please select a role';
                break;
            case 'otherRole':
                if (formData.role === 'Others' && !value.trim()) return 'Please specify your role';
                break;
            case 'whyRole':
                if (!value.trim()) return 'This field is required';
                if (countWords(value) < 20) return `Please write at least 20 words (currently ${countWords(value)} words)`;
                break;
            case 'whyHeartbeats':
                if (!value.trim()) return 'This field is required';
                if (countWords(value) < 20) return `Please write at least 20 words (currently ${countWords(value)} words)`;
                break;
            case 'demoLink':
                if (!value.trim()) return 'Demo link is required';
                try {
                    new URL(value);
                } catch {
                    return 'Please enter a valid URL';
                }
                break;
        }
        return undefined;
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key as keyof FormData]);
            if (error) {
                newErrors[key as keyof FormErrors] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Mark all fields as touched
        const allTouched: Record<string, boolean> = {};
        Object.keys(formData).forEach(key => { allTouched[key] = true; });
        setTouched(allTouched);

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Check if application with this roll number already exists
            const existingApp = await checkExistingApplication(formData.rollNumber);
            if (existingApp) {
                setAlreadyApplied(true);
                setIsSubmitting(false);
                return;
            }

            await submitApplication({
                rollNumber: formData.rollNumber,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                role: formData.role,
                otherRole: formData.role === 'Others' ? formData.otherRole : '',
                whyRole: formData.whyRole,
                whyHeartbeats: formData.whyHeartbeats,
                demoLink: formData.demoLink,
            });
            setIsSubmitted(true);
        } catch (error) {
            console.error('Submission error:', error);
            setErrors(prev => ({ ...prev, submit: 'Failed to submit application. Please try again.' }));
        } finally {
            setIsSubmitting(false);
        }
    };

    // Already applied message
    if (alreadyApplied) {
        return (
            <div className="pt-32 pb-20 min-h-screen bg-[#050505] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-band-red/5 to-transparent pointer-events-none"></div>
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center py-20">
                    <AlertCircle className="h-20 w-20 text-yellow-500 mx-auto mb-8" />
                    <h1 className="text-4xl md:text-5xl font-serif font-black uppercase mb-6">You Have Already Applied</h1>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-8">
                        An application with roll number <span className="text-white font-bold">{formData.rollNumber.toUpperCase()}</span> already exists in our system.
                    </p>
                    <p className="text-band-red text-sm uppercase tracking-widest">Please wait for our team to review your application</p>
                </div>
            </div>
        );
    }

    // Success message
    if (isSubmitted) {
        return (
            <div className="pt-32 pb-20 min-h-screen bg-[#050505] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-band-red/5 to-transparent pointer-events-none"></div>
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center py-20">
                    <div className="relative inline-block mb-8">
                        <Clock className="h-20 w-20 text-band-red mx-auto" />
                        <Loader2 className="h-8 w-8 text-band-red animate-spin absolute -bottom-1 -right-1" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-black uppercase mb-6">Application Submitted!</h1>
                    <p className="text-2xl text-white mb-4">Wait while your application is being processed</p>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-8">
                        We'll review your application and get back to you at <span className="text-white">{formData.email}</span>.
                    </p>
                    <div className="flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-band-red animate-pulse"></span>
                        <span className="text-band-red text-sm uppercase tracking-widest">Under Review</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 min-h-screen bg-[#050505] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-band-red/5 to-transparent pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-serif font-black uppercase mb-6">Join The <span className="text-band-red">Band</span></h1>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        HeartBeats is always evolving. We are seeking master improvisers, classical virtuosos, and sonic architects from NIT Rourkela.
                    </p>
                </div>

                <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12">
                    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                        {/* Roll Number & Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group">
                                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-3">
                                    Roll Number <span className="text-band-red">*</span>
                                </label>
                                <input
                                    name="rollNumber"
                                    value={formData.rollNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    maxLength={9}
                                    className={`w-full bg-transparent border-b py-3 text-xl font-serif focus:outline-none transition-colors ${errors.rollNumber && touched.rollNumber
                                        ? 'border-red-500'
                                        : 'border-neutral-700 focus:border-band-red'
                                        }`}
                                    placeholder="e.g. 121CS0XXX"
                                />
                                {errors.rollNumber && touched.rollNumber && (
                                    <p className="mt-2 text-red-500 text-xs flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" /> {errors.rollNumber}
                                    </p>
                                )}
                            </div>
                            <div className="group">
                                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-3">
                                    Full Name <span className="text-band-red">*</span>
                                </label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full bg-transparent border-b py-3 text-xl font-serif focus:outline-none transition-colors ${errors.name && touched.name
                                        ? 'border-red-500'
                                        : 'border-neutral-700 focus:border-band-red'
                                        }`}
                                    placeholder="Your Name"
                                />
                                {errors.name && touched.name && (
                                    <p className="mt-2 text-red-500 text-xs flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" /> {errors.name}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Email & Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group">
                                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-3">
                                    Email Address <span className="text-band-red">*</span>
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full bg-transparent border-b py-3 text-xl font-serif focus:outline-none transition-colors ${errors.email && touched.email
                                        ? 'border-red-500'
                                        : 'border-neutral-700 focus:border-band-red'
                                        }`}
                                    placeholder="rollnumber@nitrkl.ac.in"
                                />
                                <p className="mt-1 text-neutral-600 text-xs">Auto-filled from roll number. You can edit if needed.</p>
                                {errors.email && touched.email && (
                                    <p className="mt-2 text-red-500 text-xs flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" /> {errors.email}
                                    </p>
                                )}
                            </div>
                            <div className="group">
                                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-3">
                                    Phone Number <span className="text-band-red">*</span>
                                </label>
                                <input
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full bg-transparent border-b py-3 text-xl font-serif focus:outline-none transition-colors ${errors.phone && touched.phone
                                        ? 'border-red-500'
                                        : 'border-neutral-700 focus:border-band-red'
                                        }`}
                                    placeholder="+91 XXXXXXXXXX"
                                />
                                {errors.phone && touched.phone && (
                                    <p className="mt-2 text-red-500 text-xs flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" /> {errors.phone}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div className="group">
                            <label className="block text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-3">
                                Role You're Applying For <span className="text-band-red">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full bg-[#0a0a0a] border py-4 px-4 text-lg focus:outline-none transition-colors appearance-none cursor-pointer ${errors.role && touched.role
                                        ? 'border-red-500'
                                        : 'border-neutral-700 focus:border-band-red hover:border-neutral-600'
                                        }`}
                                >
                                    <option value="">Select a role...</option>
                                    {roles.map(role => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg className="h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {errors.role && touched.role && (
                                <p className="mt-2 text-red-500 text-xs flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" /> {errors.role}
                                </p>
                            )}
                        </div>

                        {/* Other Role (conditional) */}
                        {formData.role === 'Others' && (
                            <div className="group animate-fadeIn">
                                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-3">
                                    Specify Your Role <span className="text-band-red">*</span>
                                </label>
                                <input
                                    name="otherRole"
                                    value={formData.otherRole}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full bg-transparent border-b py-3 text-xl font-serif focus:outline-none transition-colors ${errors.otherRole && touched.otherRole
                                        ? 'border-red-500'
                                        : 'border-neutral-700 focus:border-band-red'
                                        }`}
                                    placeholder="e.g. Sound Engineer, Saxophonist..."
                                />
                                {errors.otherRole && touched.otherRole && (
                                    <p className="mt-2 text-red-500 text-xs flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" /> {errors.otherRole}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Why this role */}
                        <div className="group">
                            <label className="block text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-3">
                                Why do you want this role? Share your experience <span className="text-band-red">*</span>
                            </label>
                            <textarea
                                name="whyRole"
                                value={formData.whyRole}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                rows={4}
                                className={`w-full bg-transparent border py-3 px-4 text-lg font-light focus:outline-none transition-colors ${errors.whyRole && touched.whyRole
                                    ? 'border-red-500'
                                    : 'border-neutral-700 focus:border-band-red'
                                    }`}
                                placeholder="Tell us about your journey and experience with this role..."
                            />
                            <div className="flex justify-between mt-2">
                                <span className={`text-xs ${countWords(formData.whyRole) >= 20 ? 'text-green-500' : 'text-neutral-500'}`}>
                                    {countWords(formData.whyRole)}/20 words minimum
                                </span>
                                {errors.whyRole && touched.whyRole && (
                                    <p className="text-red-500 text-xs flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" /> {errors.whyRole}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Why HeartBeats */}
                        <div className="group">
                            <label className="block text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-3">
                                Why HeartBeats? <span className="text-band-red">*</span>
                            </label>
                            <textarea
                                name="whyHeartbeats"
                                value={formData.whyHeartbeats}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                rows={4}
                                className={`w-full bg-transparent border py-3 px-4 text-lg font-light focus:outline-none transition-colors ${errors.whyHeartbeats && touched.whyHeartbeats
                                    ? 'border-red-500'
                                    : 'border-neutral-700 focus:border-band-red'
                                    }`}
                                placeholder="What draws you to HeartBeats? What makes us stand out to you?"
                            />
                            <div className="flex justify-between mt-2">
                                <span className={`text-xs ${countWords(formData.whyHeartbeats) >= 20 ? 'text-green-500' : 'text-neutral-500'}`}>
                                    {countWords(formData.whyHeartbeats)}/20 words minimum
                                </span>
                                {errors.whyHeartbeats && touched.whyHeartbeats && (
                                    <p className="text-red-500 text-xs flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" /> {errors.whyHeartbeats}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Demo Link */}
                        <div className="group">
                            <label className="block text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-3">
                                Demo Link (Google Drive) <span className="text-band-red">*</span>
                            </label>
                            <input
                                name="demoLink"
                                type="url"
                                value={formData.demoLink}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full bg-transparent border-b py-3 text-xl font-serif focus:outline-none transition-colors ${errors.demoLink && touched.demoLink
                                    ? 'border-red-500'
                                    : 'border-neutral-700 focus:border-band-red'
                                    }`}
                                placeholder="https://drive.google.com/..."
                            />
                            <p className="mt-1 text-neutral-600 text-xs">Share your demo/portfolio. No work yet? Submit an empty Google Drive link.</p>
                            {errors.demoLink && touched.demoLink && (
                                <p className="mt-2 text-red-500 text-xs flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" /> {errors.demoLink}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-8">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-5 bg-white text-black font-bold uppercase tracking-[0.2em] hover:bg-band-red hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        Submit Application <Send className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Join;