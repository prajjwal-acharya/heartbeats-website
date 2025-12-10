import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

// Pages
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Management from './pages/Management';
import Join from './pages/Join';
import Merch from './pages/Merch';

// Admin Pages
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout for main site pages (with Navbar and Footer)
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

const AppContent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [appVisible, setAppVisible] = useState(false);
  const location = useLocation();

  // Check if current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  const handleLoadingComplete = () => {
    setLoading(false);
    setTimeout(() => setAppVisible(true), 100);
  };

  // Skip preloader for admin routes
  useEffect(() => {
    if (isAdminRoute) {
      setLoading(false);
      setAppVisible(true);
    }
  }, [isAdminRoute]);

  return (
    <>
      {loading && !isAdminRoute && <Preloader onComplete={handleLoadingComplete} />}

      <div className={`bg-[#050505] min-h-screen text-white overflow-x-hidden transition-opacity duration-1000 ${appVisible ? 'opacity-100' : 'opacity-0'}`}>
        <ScrollToTop />
        <Routes>
          {/* Admin Routes (no Navbar/Footer) */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Main Site Routes (with Navbar/Footer) */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/schedule" element={<MainLayout><Schedule /></MainLayout>} />
          <Route path="/management" element={<MainLayout><Management /></MainLayout>} />
          <Route path="/join" element={<MainLayout><Join /></MainLayout>} />
          <Route path="/merch" element={<MainLayout><Merch /></MainLayout>} />
        </Routes>
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;