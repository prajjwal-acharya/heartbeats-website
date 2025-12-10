import React, { useState, useEffect } from 'react';
import { Menu, X, AudioWaveform, Lock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Schedule', href: '/schedule' },
    { name: 'Merch', href: '/merch' },
    { name: 'Join Us', href: '/join' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled || location.pathname !== '/' ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="p-2 bg-white/5 rounded-full group-hover:bg-band-red/20 transition-colors duration-300">
                <AudioWaveform className="h-6 w-6 text-band-red" />
            </div>
            <span className="text-2xl font-serif font-bold tracking-wider text-white">HEART<span className="text-band-red">BEATS</span></span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 relative group overflow-hidden ${isActive(link.href) ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
              >
                <span className="relative z-10">{link.name}</span>
                <span className={`absolute bottom-0 left-0 h-[1px] bg-band-red transition-all duration-300 ${isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}
            
            <Link 
              to="/management"
              className="ml-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-band-red transition-colors border border-white/10 px-4 py-2 rounded-full hover:border-band-red"
            >
              <Lock className="h-3 w-3" /> Staff
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 hover:bg-white/10 rounded-full transition-colors">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#050505] border-b border-white/10 absolute w-full animate-in slide-in-from-top-10 duration-200 shadow-2xl">
          <div className="px-4 pt-2 pb-8 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`block px-3 py-4 text-lg font-serif font-medium border-b border-white/5 ${isActive(link.href) ? 'text-band-red' : 'text-neutral-300 hover:text-band-red'}`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
                to="/management"
                className="block px-3 py-4 text-sm font-serif font-medium text-neutral-500 hover:text-white"
                onClick={() => setIsOpen(false)}
            >
                Staff Access
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;