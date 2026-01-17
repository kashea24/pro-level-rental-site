import React, { useState, useEffect, createContext, useContext } from 'react';

// ============================================
// CONTEXT & STATE MANAGEMENT
// ============================================

const AuthContext = createContext(null);
const CMSContext = createContext(null);

// Initial CMS Data
const initialCMSData = {
  heroTitle: "Partnership. Responsibility. Operational Excellence.",
  heroSubtitle: "Premium AV Equipment Rental & Production Services",
  heroCTA: "Request a Quote",
  aboutText: "Pro Level Rental delivers world-class audiovisual solutions for events of any scale. From corporate conferences to concert productions, our team brings technical expertise and premium equipment to every project.",
  equipment: [
    { id: 1, name: "Panasonic PT-RQ35K", category: "Projectors", specs: "35,000 lumens, 4K+, Laser", price: 1200, image: "projector", featured: true },
    { id: 2, name: "d&b audiotechnik SL-Series", category: "Audio", specs: "Line Array System, Touring Grade", price: 2500, image: "speaker", featured: true },
    { id: 3, name: "ROE Visual Black Pearl BP2", category: "LED Walls", specs: "2.8mm Pixel Pitch, Indoor/Outdoor", price: 150, image: "led", featured: true },
    { id: 4, name: "Blackmagic ATEM Constellation 8K", category: "Video", specs: "8K Switcher, 40 Inputs", price: 800, image: "switcher", featured: false },
    { id: 5, name: "Shure Axient Digital", category: "Audio", specs: "Wireless Microphone System", price: 350, image: "wireless", featured: true },
    { id: 6, name: "GrandMA3 Full-Size", category: "Lighting", specs: "Lighting Console, 250K Parameters", price: 600, image: "console", featured: false },
    { id: 7, name: "Sony FR7 PTZ Camera", category: "Cameras", specs: "Full-Frame, Cinema Line PTZ", price: 450, image: "camera", featured: true },
    { id: 8, name: "Disguise GX3", category: "Media Servers", specs: "Real-Time 3D, 4K Output", price: 900, image: "server", featured: false },
  ],
  categories: ["All", "Projectors", "Audio", "LED Walls", "Video", "Lighting", "Cameras", "Media Servers"],
  services: [
    { title: "Equipment Rental", desc: "Premium AV gear for any event size", icon: "📦" },
    { title: "Full Production", desc: "End-to-end event production services", icon: "🎬" },
    { title: "Technical Support", desc: "Expert technician support", icon: "🔧" },
    { title: "Design Services", desc: "Custom show design & visualization", icon: "✨" },
  ],
  testimonials: [
    { name: "Sarah Chen", company: "EventPro Agency", text: "Pro Level delivered flawlessly on our 10,000-person corporate event. Their team's attention to detail is unmatched." },
    { name: "Marcus Johnson", company: "Live Nation", text: "We've worked with dozens of AV companies. Pro Level is our go-to for mission-critical productions." },
  ]
};

const initialUsers = [
  { id: 1, email: "admin@prolevelrental.com", password: "admin123", role: "admin", name: "Admin User" },
  { id: 2, email: "tech@prolevelrental.com", password: "tech123", role: "technician", name: "John Technician" },
  { id: 3, email: "client@example.com", password: "client123", role: "client", name: "Demo Client", company: "Event Co" },
];

const initialTechnicians = [
  { id: 1, name: "John Martinez", specialty: "Audio Engineering", phone: "555-0101", email: "john@prolevelrental.com", status: "available", certifications: ["Dante Level 3", "d&b Certified"] },
  { id: 2, name: "Emily Chen", specialty: "Video Engineering", phone: "555-0102", email: "emily@prolevelrental.com", status: "on-job", certifications: ["Blackmagic Certified", "disguise Certified"] },
  { id: 3, name: "Marcus Williams", specialty: "Lighting Design", phone: "555-0103", email: "marcus@prolevelrental.com", status: "available", certifications: ["GrandMA Programmer", "ETCP Certified"] },
];

const initialProjects = [
  { id: 1, name: "Tech Summit 2026", client: "client@example.com", status: "active", designs: [
    { name: "Main Stage Render", type: "image", url: "#" },
    { name: "Audio Plot", type: "pdf", url: "#" },
  ]},
];

// ============================================
// ICON COMPONENTS
// ============================================

const Icons = {
  Menu: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>,
  Close: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  User: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Phone: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>,
  Mail: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>,
  Check: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>,
  Edit: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 010 3l-9.5 9.5-4 1 1-4 9.5-9.5a2.121 2.121 0 013 0z"/></svg>,
  Trash: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h10M12 6V14a1 1 0 01-1 1H5a1 1 0 01-1-1V6m2-3h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"/></svg>,
  Plus: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>,
  Dashboard: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Settings: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  Folder: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>,
  Users: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  Package: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>,
  Arrow: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  Star: () => <svg width="16" height="16" fill="currentColor"><path d="M8 0l2.47 5.01L16 5.83l-4 3.9.94 5.49L8 12.71l-4.94 2.51.94-5.49-4-3.9 5.53-.82L8 0z"/></svg>,
};

// ============================================
// EQUIPMENT IMAGES (SVG representations)
// ============================================

const EquipmentImage = ({ type }) => {
  const images = {
    projector: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="projGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a2e"/>
            <stop offset="100%" stopColor="#16213e"/>
          </linearGradient>
        </defs>
        <rect x="10" y="30" width="80" height="45" rx="5" fill="url(#projGrad)"/>
        <circle cx="35" cy="52" r="15" fill="#0f0f23" stroke="#e94560" strokeWidth="2"/>
        <circle cx="35" cy="52" r="8" fill="#e94560" opacity="0.3"/>
        <rect x="60" y="40" width="25" height="8" rx="2" fill="#e94560" opacity="0.5"/>
        <rect x="60" y="55" width="20" height="8" rx="2" fill="#e94560" opacity="0.3"/>
        <rect x="20" y="75" width="15" height="5" rx="1" fill="#333"/>
        <rect x="65" y="75" width="15" height="5" rx="1" fill="#333"/>
      </svg>
    ),
    speaker: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="speakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a2e"/>
            <stop offset="100%" stopColor="#0f0f23"/>
          </linearGradient>
        </defs>
        <rect x="25" y="5" width="50" height="90" rx="3" fill="url(#speakGrad)"/>
        <circle cx="50" cy="30" r="12" fill="#0f0f23" stroke="#e94560" strokeWidth="1"/>
        <circle cx="50" cy="30" r="5" fill="#e94560" opacity="0.5"/>
        <circle cx="50" cy="60" r="18" fill="#0f0f23" stroke="#e94560" strokeWidth="1"/>
        <circle cx="50" cy="60" r="10" fill="#1a1a2e" stroke="#e94560" strokeWidth="1"/>
        <circle cx="50" cy="60" r="4" fill="#e94560" opacity="0.3"/>
        <rect x="20" y="88" width="10" height="7" fill="#333"/>
        <rect x="70" y="88" width="10" height="7" fill="#333"/>
      </svg>
    ),
    led: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="5" y="15" width="90" height="70" fill="#0f0f23"/>
        {[...Array(6)].map((_, row) => 
          [...Array(8)].map((_, col) => (
            <rect 
              key={`${row}-${col}`}
              x={10 + col * 11} 
              y={20 + row * 11} 
              width="8" 
              height="8" 
              fill={Math.random() > 0.3 ? '#e94560' : '#1a1a2e'}
              opacity={0.5 + Math.random() * 0.5}
            />
          ))
        )}
        <rect x="5" y="15" width="90" height="70" fill="none" stroke="#333" strokeWidth="3"/>
      </svg>
    ),
    switcher: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="5" y="30" width="90" height="40" rx="3" fill="#1a1a2e"/>
        <rect x="10" y="35" width="20" height="12" rx="2" fill="#0f0f23"/>
        <rect x="35" y="35" width="20" height="12" rx="2" fill="#0f0f23"/>
        <rect x="60" y="35" width="30" height="30" rx="2" fill="#0f0f23" stroke="#e94560" strokeWidth="1"/>
        {[...Array(8)].map((_, i) => (
          <circle key={i} cx={15 + i * 10} cy="62" r="3" fill={i < 3 ? '#e94560' : '#333'}/>
        ))}
      </svg>
    ),
    wireless: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="35" y="10" width="30" height="80" rx="5" fill="#1a1a2e"/>
        <circle cx="50" cy="30" r="8" fill="#0f0f23" stroke="#e94560" strokeWidth="1"/>
        <rect x="42" y="45" width="16" height="35" rx="2" fill="#0f0f23"/>
        <rect x="45" y="50" width="10" height="3" fill="#e94560" opacity="0.7"/>
        <rect x="45" y="56" width="10" height="3" fill="#e94560" opacity="0.5"/>
        <rect x="45" y="62" width="10" height="3" fill="#e94560" opacity="0.3"/>
      </svg>
    ),
    console: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M5 70 L15 30 L85 30 L95 70 Z" fill="#1a1a2e"/>
        <rect x="20" y="35" width="60" height="20" rx="2" fill="#0f0f23"/>
        {[...Array(10)].map((_, i) => (
          <rect key={i} x={22 + i * 6} y="60" width="4" height="8" fill="#333" rx="1"/>
        ))}
        {[...Array(5)].map((_, i) => (
          <circle key={i} cx={30 + i * 12} cy="42" r="3" fill="#e94560" opacity={0.3 + i * 0.15}/>
        ))}
      </svg>
    ),
    camera: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="20" y="25" width="60" height="50" rx="5" fill="#1a1a2e"/>
        <circle cx="50" cy="50" r="18" fill="#0f0f23" stroke="#e94560" strokeWidth="2"/>
        <circle cx="50" cy="50" r="10" fill="#16213e"/>
        <circle cx="50" cy="50" r="5" fill="#e94560" opacity="0.3"/>
        <rect x="70" y="30" width="15" height="10" rx="2" fill="#0f0f23"/>
        <circle cx="77" cy="35" r="3" fill="#e94560"/>
      </svg>
    ),
    server: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="15" y="10" width="70" height="80" rx="3" fill="#1a1a2e"/>
        <rect x="20" y="15" width="60" height="20" rx="2" fill="#0f0f23"/>
        <rect x="20" y="40" width="60" height="20" rx="2" fill="#0f0f23"/>
        <rect x="20" y="65" width="60" height="20" rx="2" fill="#0f0f23"/>
        {[0, 25, 50].map((y, i) => (
          <React.Fragment key={i}>
            <circle cx="30" cy={25 + y} r="3" fill="#e94560"/>
            <circle cx="40" cy={25 + y} r="3" fill={i === 1 ? '#4ade80' : '#333'}/>
            <rect x="50" y={22 + y} width="25" height="6" rx="1" fill="#333"/>
          </React.Fragment>
        ))}
      </svg>
    ),
  };
  return images[type] || images.projector;
};

// ============================================
// MAIN APP COMPONENT
// ============================================

export default function ProLevelRental() {
  // Auth State
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(initialUsers);
  
  // CMS State
  const [cmsData, setCmsData] = useState(initialCMSData);
  const [technicians, setTechnicians] = useState(initialTechnicians);
  const [projects, setProjects] = useState(initialProjects);
  
  // UI State
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [quoteModal, setQuoteModal] = useState(false);

  // Navigation handler
  const navigate = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Auth handlers
  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      setLoginModal(false);
      if (foundUser.role === 'admin') navigate('admin');
      else if (foundUser.role === 'technician') navigate('technician-portal');
      else navigate('client-portal');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    navigate('home');
  };

  const register = (userData) => {
    const newUser = { ...userData, id: users.length + 1, role: 'client' };
    setUsers([...users, newUser]);
    setUser(newUser);
    setLoginModal(false);
    navigate('client-portal');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, users, setUsers }}>
      <CMSContext.Provider value={{ cmsData, setCmsData, technicians, setTechnicians, projects, setProjects }}>
        <div className="min-h-screen bg-[#000000] text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {/* Google Fonts */}
          <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
          
          {/* Navigation */}
          <Navigation 
            currentPage={currentPage} 
            navigate={navigate} 
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            setLoginModal={setLoginModal}
            user={user}
            logout={logout}
          />

          {/* Main Content */}
          <main>
            {currentPage === 'home' && <HomePage navigate={navigate} setQuoteModal={setQuoteModal} />}
            {currentPage === 'equipment' && <EquipmentPage />}
            {currentPage === 'services' && <ServicesPage />}
            {currentPage === 'about' && <AboutPage />}
            {currentPage === 'contact' && <ContactPage />}
            {currentPage === 'admin' && user?.role === 'admin' && <AdminDashboard />}
            {currentPage === 'client-portal' && user?.role === 'client' && <ClientPortal />}
            {currentPage === 'technician-portal' && user?.role === 'technician' && <TechnicianPortal />}
          </main>

          {/* Footer */}
          <Footer navigate={navigate} />

          {/* Modals */}
          {loginModal && <LoginModal onClose={() => setLoginModal(false)} />}
          {quoteModal && <QuoteModal onClose={() => setQuoteModal(false)} />}
        </div>
      </CMSContext.Provider>
    </AuthContext.Provider>
  );
}

// ============================================
// NAVIGATION COMPONENT
// ============================================

function Navigation({ currentPage, navigate, mobileMenuOpen, setMobileMenuOpen, setLoginModal, user, logout }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', page: 'home' },
    { name: 'Equipment', page: 'equipment' },
    { name: 'Services', page: 'services' },
    { name: 'About', page: 'about' },
    { name: 'Contact', page: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#000000]/95 backdrop-blur-xl shadow-2xl shadow-[#D4AF37]/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => navigate('home')} className="flex items-center gap-3 group">
            <img 
              src="/prolevel-logo-light.svg" 
              alt="Pro Level Rental" 
              className="h-12 w-auto object-contain transform group-hover:scale-105 transition-transform"
            />
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className={`relative py-2 text-sm font-medium tracking-wide transition-colors ${
                  currentPage === item.page ? 'text-[#D4AF37]' : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
                {currentPage === item.page && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C158]" />
                )}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="hidden lg:flex items-center gap-4">
                <button
                  onClick={() => navigate(user.role === 'admin' ? 'admin' : user.role === 'technician' ? 'technician-portal' : 'client-portal')}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Icons.Dashboard />
                  <span className="text-sm">Dashboard</span>
                </button>
                <button
                  onClick={logout}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setLoginModal(true)}
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:shadow-lg hover:shadow-[#D4AF37]/25 transition-all font-medium text-black"
              >
                <Icons.User />
                <span>Login</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <Icons.Close /> : <Icons.Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-white/10">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => navigate(item.page)}
                  className={`py-3 px-4 rounded-lg text-left transition-colors ${
                    currentPage === item.page ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              {user ? (
                <>
                  <button
                    onClick={() => navigate(user.role === 'admin' ? 'admin' : user.role === 'technician' ? 'technician-portal' : 'client-portal')}
                    className="py-3 px-4 rounded-lg text-left hover:bg-white/5 flex items-center gap-2"
                  >
                    <Icons.Dashboard /> Dashboard
                  </button>
                  <button onClick={logout} className="py-3 px-4 rounded-lg text-left text-[#D4AF37]">
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setLoginModal(true)}
                  className="mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-center font-medium text-black"
                >
                  Login / Register
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// ============================================
// HOME PAGE
// ============================================

function HomePage({ navigate, setQuoteModal }) {
  const { cmsData } = useContext(CMSContext);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#000000]" />
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-[#D4AF37]"
                style={{
                  width: Math.random() * 300 + 50,
                  height: Math.random() * 300 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  filter: 'blur(100px)',
                  opacity: 0.1 + Math.random() * 0.2,
                  animation: `float ${10 + Math.random() * 20}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-8">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-sm text-[#D4AF37]">Production Support</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {cmsData.heroTitle.split('.').map((part, i) => (
                  <span key={i} className={i === 1 ? 'text-[#D4AF37]' : 'text-white'}>
                    {part}{i < 2 ? '.' : ''}<br />
                  </span>
                ))}
              </h1>
              
              <p className="text-xl text-gray-400 mb-10 max-w-lg">
                {cmsData.heroSubtitle}
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setQuoteModal(true)}
                  className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C158] font-semibold text-lg hover:shadow-2xl hover:shadow-[#D4AF37]/30 transition-all transform hover:-translate-y-1 text-black"
                >
                  {cmsData.heroCTA}
                  <Icons.Arrow />
                </button>
                <button
                  onClick={() => navigate('equipment')}
                  className="px-8 py-4 rounded-xl border border-white/20 font-semibold text-lg hover:bg-white/5 transition-all"
                >
                  Browse Gear
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-12 mt-16">
                {[
                  { value: '500+', label: 'Events Yearly' },
                  { value: '5★', label: 'Support' },
                  { value: '15+', label: 'Years Experience' },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-bold text-[#D4AF37]">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square">
                {/* Rotating Ring */}
                <div className="absolute inset-0 rounded-full border border-[#D4AF37]/20 animate-spin" style={{ animationDuration: '30s' }} />
                <div className="absolute inset-8 rounded-full border border-[#D4AF37]/30 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
                
                {/* Equipment Icons floating */}
                {cmsData.equipment.filter(e => e.featured).slice(0, 4).map((item, i) => {
                  const angle = (i * 90) * (Math.PI / 180);
                  const radius = 45;
                  const x = 50 + radius * Math.cos(angle);
                  const y = 50 + radius * Math.sin(angle);
                  return (
                    <div
                      key={item.id}
                      className="absolute w-24 h-24 p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -50%)',
                        animation: `float ${3 + i}s ease-in-out infinite`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    >
                      <EquipmentImage type={item.image} />
                    </div>
                  );
                })}

                {/* Center Logo */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-48 rounded-3xl flex items-center justify-center shadow-2xl shadow-[#D4AF37]/30">
                  <img 
                    src="/prolevel-logo-light.svg" 
                    alt="Pro Level Rental" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
          <span className="text-xs tracking-widest">SCROLL</span>
          <div className="w-6 h-10 border border-gray-600 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-[#D4AF37] rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] text-sm font-medium tracking-widest">WHAT WE DO</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Full-Service Production
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cmsData.services.map((service, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-2xl bg-[#28323C] border border-[#585858]/30 hover:border-[#D4AF37]/50 transition-all hover:-translate-y-2"
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-b-2xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Equipment */}
      <section className="py-24 bg-gradient-to-b from-transparent via-[#16213e]/20 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[#D4AF37] text-sm font-medium tracking-widest">TOP GEAR</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Featured Equipment
              </h2>
            </div>
            <button
              onClick={() => navigate('equipment')}
              className="hidden md:flex items-center gap-2 text-[#D4AF37] hover:gap-4 transition-all"
            >
              View All <Icons.Arrow />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cmsData.equipment.filter(e => e.featured).slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="group relative p-6 rounded-2xl bg-[#28323C] border border-[#585858]/20 hover:border-[#D4AF37]/30 transition-all overflow-hidden"
              >
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                    {item.category}
                  </span>
                </div>
                <div className="w-32 h-32 mx-auto mb-6">
                  <EquipmentImage type={item.image} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{item.specs}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#D4AF37] font-bold">${item.price}/day</span>
                  <button className="p-2 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37] transition-colors">
                    <Icons.Plus />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[#D4AF37] text-sm font-medium tracking-widest">TESTIMONIALS</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-16" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Trusted by Industry Leaders
          </h2>

          <div className="relative">
            <div className="text-6xl text-[#D4AF37]/20 absolute -top-8 left-0">"</div>
            <p className="text-2xl text-gray-300 italic mb-8">
              {cmsData.testimonials[activeTestimonial].text}
            </p>
            <div className="text-6xl text-[#D4AF37]/20 absolute -bottom-4 right-0">"</div>
            <div className="mt-8">
              <div className="font-semibold text-lg">{cmsData.testimonials[activeTestimonial].name}</div>
              <div className="text-gray-500">{cmsData.testimonials[activeTestimonial].company}</div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {cmsData.testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === activeTestimonial ? 'bg-[#D4AF37] w-8' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative p-12 md:p-20 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#E5C158]" />
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '32px 32px',
              }} />
            </div>
            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Ready to Elevate Your Event?
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Let's discuss your production needs. Our team is ready to bring your vision to life.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setQuoteModal(true)}
                  className="px-8 py-4 rounded-xl bg-black text-[#D4AF37] font-semibold text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-black"
                >
                  Get a Quote
                </button>
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white font-semibold text-lg hover:bg-white/10 transition-all"
                >
                  <Icons.Phone /> Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Float Animation Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-20px); }
        }
      `}</style>
    </>
  );
}

// ============================================
// EQUIPMENT PAGE
// ============================================

function EquipmentPage() {
  const { cmsData } = useContext(CMSContext);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEquipment = cmsData.equipment.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.specs.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] text-sm font-medium tracking-widest">OUR INVENTORY</span>
          <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Equipment Catalog
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Premium AV equipment ready for your next production
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {cmsData.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-3 rounded-xl font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-[#D4AF37] text-black'
                    : 'bg-[#28323C] text-[#C8C8C8] hover:bg-[#585858] hover:text-white border border-[#585858]/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEquipment.map((item) => (
            <div
              key={item.id}
              className="group relative p-6 rounded-2xl bg-[#28323C] border border-[#585858]/20 hover:border-[#D4AF37]/30 transition-all hover:-translate-y-1"
            >
              {item.featured && (
                <div className="absolute top-4 left-4 flex items-center gap-1 px-2 py-1 bg-yellow-500/20 rounded-full text-yellow-500 text-xs">
                  <Icons.Star /> Featured
                </div>
              )}
              <div className="w-28 h-28 mx-auto mb-6">
                <EquipmentImage type={item.image} />
              </div>
              <span className="text-xs text-[#D4AF37] font-medium">{item.category}</span>
              <h3 className="font-semibold text-lg mt-1 mb-2">{item.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{item.specs}</p>
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <span className="text-[#D4AF37] font-bold text-lg">${item.price}<span className="text-sm text-gray-500">/day</span></span>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37] hover:text-black transition-colors text-sm font-medium">
                  Add to Quote
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredEquipment.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No equipment found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// SERVICES PAGE
// ============================================

function ServicesPage() {
  const services = [
    {
      title: "Equipment Rental",
      description: "Access our extensive inventory of premium AV equipment. From projectors to LED walls, audio systems to media servers—we have everything you need for any production scale.",
      features: ["Projectors & Displays", "Audio Systems", "LED Video Walls", "Lighting Fixtures", "Media Servers", "Cameras & Video"],
      icon: "📦"
    },
    {
      title: "Full Production Services",
      description: "End-to-end event production with dedicated project managers, technical directors, and crew. We handle everything from concept to strike.",
      features: ["Project Management", "Technical Direction", "Crew Staffing", "Load-in/Load-out", "On-site Support", "Post-Event Services"],
      icon: "🎬"
    },
    {
      title: "Show Design",
      description: "Our creative team brings your vision to life with custom stage designs, 3D visualization, and technical planning for unforgettable experiences.",
      features: ["3D Visualization", "Stage Design", "Lighting Design", "Content Creation", "Technical Drawings", "Budget Planning"],
      icon: "✨"
    },
    {
      title: "Technical Support",
      description: "Expert support for all your technical needs. Our experienced engineers ensure flawless execution every time.",
      features: ["Business Hours Support", "Remote Support", "On-site Engineers", "Equipment Training", "Troubleshooting", "System Integration"],
      icon: "🔧"
    },
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[#D4AF37] text-sm font-medium tracking-widest">WHAT WE OFFER</span>
          <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Our Services
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive AV solutions tailored to your unique production needs
          </p>
        </div>

        {/* Services */}
        <div className="space-y-12">
          {services.map((service, i) => (
            <div
              key={i}
              className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center p-8 lg:p-12 rounded-3xl bg-[#28323C] border border-[#585858]/30`}
            >
              <div className="flex-1">
                <div className="text-6xl mb-6">{service.icon}</div>
                <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {service.title}
                </h2>
                <p className="text-lg text-[#C8C8C8] mb-8">{service.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {service.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                        <Icons.Check />
                      </div>
                      <span className="text-[#C8C8C8]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 w-full max-w-md">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#585858]/30 to-[#28323C] border border-[#585858]/30 flex items-center justify-center">
                  <span className="text-9xl">{service.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// ABOUT PAGE
// ============================================

function AboutPage() {
  const { cmsData } = useContext(CMSContext);

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[#D4AF37] text-sm font-medium tracking-widest">OUR STORY</span>
          <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            About Pro Level Rental
          </h1>
        </div>

        {/* Mission */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Our Mission
            </h2>
            <p className="text-lg text-gray-400 mb-6">
              {cmsData.aboutText}
            </p>
            <p className="text-lg text-gray-400">
              Founded by industry veterans, Pro Level Rental emerged from a simple belief: every event deserves professional-grade equipment and expertise, regardless of size or budget.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-[#28323C] to-[#0a0a0f] border border-white/10 overflow-hidden flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-[#585858] rounded-2xl flex items-center justify-center p-4">
                  <img 
                    src="/prolevel-logo-square.jpg" 
                    alt="Pro Level Rental" 
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                <div className="text-2xl font-bold">Pro Level Rental</div>
                <div className="text-gray-500">Est. 2010</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Partnership", desc: "We work alongside you, not just for you. Your success is our success.", icon: "🤝" },
              { title: "Responsibility", desc: "We own every detail, from the first call to the final strike.", icon: "🎯" },
              { title: "Operational Excellence", desc: "Flawless execution isn't a goal—it's our standard.", icon: "⭐" },
            ].map((value, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: "15+", label: "Years Experience" },
            { value: "500+", label: "Events Per Year" },
            { value: "50+", label: "Expert Technicians" },
            { value: "99.9%", label: "Client Satisfaction" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-8 rounded-2xl bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20">
              <div className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-2">{stat.value}</div>
              <div className="text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// CONTACT PAGE
// ============================================

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] text-sm font-medium tracking-widest">GET IN TOUCH</span>
          <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Contact Us
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to discuss your next project? We're here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <div className="space-y-8 mb-12">
              {[
                { icon: <Icons.Phone />, title: "Phone", value: "(555) 123-4567", subtitle: "Business Hours Support" },
                { icon: <Icons.Mail />, title: "Email", value: "info@prolevelrental.com", subtitle: "Response within 1 hour" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6 p-6 rounded-2xl bg-[#28323C] border border-[#585858]/30">
                  <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm text-[#C8C8C8] mb-1">{item.title}</div>
                    <div className="text-xl font-semibold mb-1">{item.value}</div>
                    <div className="text-sm text-[#D4AF37]">{item.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Office Hours */}
            <div className="p-6 rounded-2xl bg-[#28323C] border border-[#585858]/30">
              <h3 className="font-semibold text-lg mb-4">Office Hours</h3>
              <div className="space-y-2 text-[#C8C8C8]">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday - Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <Icons.Check />
                </div>
                <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
                <p className="text-gray-400">We'll get back to you within 1 hour.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-[#C8C8C8] mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#28323C] border border-[#585858]/30 focus:border-[#D4AF37] outline-none transition-colors text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#C8C8C8] mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#28323C] border border-[#585858]/30 focus:border-[#D4AF37] outline-none transition-colors text-white"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-[#C8C8C8] mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#28323C] border border-[#585858]/30 focus:border-[#D4AF37] outline-none transition-colors text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#C8C8C8] mb-2">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#28323C] border border-[#585858]/30 focus:border-[#D4AF37] outline-none transition-colors text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#C8C8C8] mb-2">Message *</label>
                  <textarea
                    required
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#28323C] border border-[#585858]/30 focus:border-[#D4AF37] outline-none transition-colors resize-none text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C158] font-semibold text-lg hover:shadow-lg hover:shadow-[#D4AF37]/25 transition-all text-black"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// ADMIN DASHBOARD
// ============================================

function AdminDashboard() {
  const { cmsData, setCmsData, technicians, setTechnicians, projects, setProjects } = useContext(CMSContext);
  const { users, setUsers } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [editingItem, setEditingItem] = useState(null);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <Icons.Dashboard /> },
    { id: 'content', name: 'Content', icon: <Icons.Edit /> },
    { id: 'equipment', name: 'Equipment', icon: <Icons.Package /> },
    { id: 'technicians', name: 'Technicians', icon: <Icons.Users /> },
    { id: 'projects', name: 'Projects', icon: <Icons.Folder /> },
    { id: 'users', name: 'Users', icon: <Icons.User /> },
  ];

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Admin Dashboard
          </h1>
          <p className="text-gray-500">Manage your website content and settings</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#D4AF37] text-black'
                      : 'hover:bg-white/5 text-gray-400'
                  }`}
                >
                  {tab.icon}
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Dashboard Overview</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: 'Equipment Items', value: cmsData.equipment.length, color: '#D4AF37' },
                      { label: 'Technicians', value: technicians.length, color: '#4ade80' },
                      { label: 'Active Projects', value: projects.filter(p => p.status === 'active').length, color: '#f59e0b' },
                      { label: 'Registered Users', value: users.length, color: '#8b5cf6' },
                    ].map((stat, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                        <div className="text-sm text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-400">
                    Welcome to your CMS dashboard. Use the sidebar to manage different aspects of your website.
                  </p>
                </div>
              )}

              {activeTab === 'content' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Edit Website Content</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Hero Title</label>
                      <input
                        type="text"
                        value={cmsData.heroTitle}
                        onChange={(e) => setCmsData({ ...cmsData, heroTitle: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Hero Subtitle</label>
                      <input
                        type="text"
                        value={cmsData.heroSubtitle}
                        onChange={(e) => setCmsData({ ...cmsData, heroSubtitle: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#e94560] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Hero CTA Button Text</label>
                      <input
                        type="text"
                        value={cmsData.heroCTA}
                        onChange={(e) => setCmsData({ ...cmsData, heroCTA: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#e94560] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">About Text</label>
                      <textarea
                        rows="4"
                        value={cmsData.aboutText}
                        onChange={(e) => setCmsData({ ...cmsData, aboutText: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#e94560] outline-none resize-none"
                      />
                    </div>
                    <button className="px-6 py-3 rounded-xl bg-[#D4AF37] font-medium text-black">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'equipment' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Manage Equipment</h2>
                    <button
                      onClick={() => {
                        const newItem = {
                          id: cmsData.equipment.length + 1,
                          name: 'New Equipment',
                          category: 'Projectors',
                          specs: 'Enter specifications',
                          price: 0,
                          image: 'projector',
                          featured: false
                        };
                        setCmsData({ ...cmsData, equipment: [...cmsData.equipment, newItem] });
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37] font-medium text-black"
                    >
                      <Icons.Plus /> Add Equipment
                    </button>
                  </div>
                  <div className="space-y-3">
                    {cmsData.equipment.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12">
                            <EquipmentImage type={item.image} />
                          </div>
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-gray-500">{item.category} • ${item.price}/day</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white">
                            <Icons.Edit />
                          </button>
                          <button
                            onClick={() => setCmsData({
                              ...cmsData,
                              equipment: cmsData.equipment.filter(e => e.id !== item.id)
                            })}
                            className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-500"
                          >
                            <Icons.Trash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'technicians' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Manage Technicians</h2>
                    <button
                      onClick={() => {
                        const newTech = {
                          id: technicians.length + 1,
                          name: 'New Technician',
                          specialty: 'General',
                          phone: '',
                          email: '',
                          status: 'available',
                          certifications: []
                        };
                        setTechnicians([...technicians, newTech]);
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37] font-medium text-black"
                    >
                      <Icons.Plus /> Add Technician
                    </button>
                  </div>
                  <div className="space-y-3">
                    {technicians.map((tech) => (
                      <div key={tech.id} className="p-4 rounded-xl bg-white/5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#e94560]/20 flex items-center justify-center">
                              {tech.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium">{tech.name}</div>
                              <div className="text-sm text-gray-500">{tech.specialty}</div>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            tech.status === 'available' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                          }`}>
                            {tech.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {tech.certifications.map((cert, i) => (
                            <span key={i} className="px-2 py-1 rounded bg-white/5 text-xs text-gray-400">
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Manage Projects</h2>
                    <button
                      onClick={() => {
                        const newProject = {
                          id: projects.length + 1,
                          name: 'New Project',
                          client: '',
                          status: 'active',
                          designs: []
                        };
                        setProjects([...projects, newProject]);
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37] font-medium text-black"
                    >
                      <Icons.Plus /> Add Project
                    </button>
                  </div>
                  <div className="space-y-3">
                    {projects.map((project) => (
                      <div key={project.id} className="p-4 rounded-xl bg-white/5">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="font-medium">{project.name}</div>
                            <div className="text-sm text-gray-500">{project.client}</div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            project.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400">
                          {project.designs.length} design files
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'users' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Manage Users</h2>
                  <div className="space-y-3">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#e94560]/20 flex items-center justify-center">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          user.role === 'admin' ? 'bg-purple-500/20 text-purple-500' :
                          user.role === 'technician' ? 'bg-blue-500/20 text-blue-500' :
                          'bg-gray-500/20 text-gray-500'
                        }`}>
                          {user.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// CLIENT PORTAL
// ============================================

function ClientPortal() {
  const { user } = useContext(AuthContext);
  const { projects } = useContext(CMSContext);
  
  const clientProjects = projects.filter(p => p.client === user?.email);

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Welcome, {user?.name}
          </h1>
          <p className="text-gray-500">View your projects and shared designs</p>
        </div>

        {/* Projects */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
          {clientProjects.length > 0 ? (
            <div className="space-y-4">
              {clientProjects.map((project) => (
                <div key={project.id} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs ${
                        project.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm text-gray-400 mb-3">Shared Designs</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {project.designs.map((design, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                          <Icons.Folder />
                          <div>
                            <div className="font-medium text-sm">{design.name}</div>
                            <div className="text-xs text-gray-500">{design.type.toUpperCase()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-white/5 border border-white/10 text-center">
              <Icons.Folder />
              <p className="text-gray-500 mt-4">No projects yet. Contact us to get started!</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-2">Request New Quote</h3>
            <p className="text-sm text-gray-500 mb-4">Need equipment for an upcoming event?</p>
            <button className="px-4 py-2 rounded-lg bg-[#D4AF37] font-medium text-sm text-black">
              Request Quote
            </button>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-2">Contact Support</h3>
            <p className="text-sm text-gray-500 mb-4">Have questions about your project?</p>
            <button className="px-4 py-2 rounded-lg bg-white/10 font-medium text-sm">
              Get Help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// TECHNICIAN PORTAL
// ============================================

function TechnicianPortal() {
  const { user } = useContext(AuthContext);
  const { technicians, projects } = useContext(CMSContext);

  const techInfo = technicians.find(t => t.email === user?.email) || technicians[0];

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Technician Portal
          </h1>
          <p className="text-gray-500">Manage your assignments and availability</p>
        </div>

        {/* Status Card */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/20 flex items-center justify-center text-2xl">
                {techInfo?.name?.charAt(0) || 'T'}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{techInfo?.name || 'Technician'}</h2>
                <p className="text-gray-500">{techInfo?.specialty || 'General'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Status:</span>
              <button className={`px-4 py-2 rounded-lg ${
                techInfo?.status === 'available' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
              }`}>
                {techInfo?.status || 'available'}
              </button>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8">
          <h3 className="font-semibold mb-4">Your Certifications</h3>
          <div className="flex flex-wrap gap-2">
            {(techInfo?.certifications || []).map((cert, i) => (
              <span key={i} className="px-4 py-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] text-sm">
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Active Projects */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="font-semibold mb-4">Active Projects</h3>
          <div className="space-y-3">
            {projects.filter(p => p.status === 'active').map((project) => (
              <div key={project.id} className="p-4 rounded-lg bg-white/5 flex justify-between items-center">
                <div>
                  <div className="font-medium">{project.name}</div>
                  <div className="text-sm text-gray-500">{project.designs.length} design files</div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-white/10 text-sm">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// LOGIN MODAL
// ============================================

function LoginModal({ onClose }) {
  const { login, register } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '', password: '', name: '', company: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (isLogin) {
      const success = login(formData.email, formData.password);
      if (!success) setError('Invalid email or password');
    } else {
      register(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md p-8 rounded-2xl bg-[#16213e] border border-white/10">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg">
          <Icons.Close />
        </button>
        
        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-gray-500 mb-6">
          {isLogin ? 'Sign in to access your dashboard' : 'Register for a client account'}
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#e94560] outline-none"
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#e94560] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#e94560] outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C158] font-semibold text-black"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#D4AF37] hover:underline"
          >
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Sign In'}
          </button>
        </div>

        {isLogin && (
          <div className="mt-6 p-4 rounded-lg bg-white/5 text-sm">
            <p className="text-gray-400 mb-2">Demo Accounts:</p>
            <p className="text-gray-500">Admin: admin@prolevelrental.com / admin123</p>
            <p className="text-gray-500">Tech: tech@prolevelrental.com / tech123</p>
            <p className="text-gray-500">Client: client@example.com / client123</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// QUOTE MODAL
// ============================================

function QuoteModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', eventDate: '', eventType: '', description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 rounded-2xl bg-[#16213e] border border-white/10">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg">
          <Icons.Close />
        </button>

        {submitted ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <Icons.Check />
            </div>
            <h2 className="text-2xl font-bold mb-3">Quote Request Submitted!</h2>
            <p className="text-gray-400 mb-6">We'll get back to you within 1 hour.</p>
            <button onClick={onClose} className="px-6 py-3 rounded-xl bg-[#D4AF37] font-medium text-black">
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Request a Quote
            </h2>
            <p className="text-gray-500 mb-6">Tell us about your event and we'll prepare a custom quote.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Event Date</label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Event Type</label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="concert">Concert/Festival</option>
                    <option value="conference">Conference</option>
                    <option value="wedding">Wedding</option>
                    <option value="tradeshow">Trade Show</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Event Description *</label>
                <textarea
                  required
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell us about your event, venue, equipment needs, etc."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C158] font-semibold text-lg text-black"
              >
                Submit Quote Request
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================
// FOOTER
// ============================================

function Footer({ navigate }) {
  return (
    <footer className="bg-[#0a0a0f] border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#E5C158] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">PL</span>
              </div>
              <div>
                <div className="font-bold">PRO LEVEL</div>
                <div className="text-xs text-gray-500">RENTAL</div>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              Premium AV equipment rental and production services for events of all sizes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['Equipment', 'Services', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => navigate(item.toLowerCase())}
                  className="block text-gray-500 hover:text-white transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <div className="space-y-2 text-gray-500">
              <p>Equipment Rental</p>
              <p>Full Production</p>
              <p>Technical Support</p>
              <p>Show Design</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-500">
                <Icons.Phone />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500">
                <Icons.Mail />
                <span>info@prolevelrental.com</span>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              {['LinkedIn', 'Instagram', 'Facebook'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Pro Level Rental. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
