'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  ArrowDown,
  Sparkles,
  GraduationCap,
  BookOpen,
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  Award,
  Trophy,
  Star,
  Menu,
  X,
  ExternalLink,
  Download,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import ProfileCard from '@/components/profile-card/ProfileCard';
import './portfolio.css';

// Dynamically load the 3D Lanyard (browser-only).
const Lanyard = dynamic(() => import('@/components/lanyard/Lanyard'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255,255,255,0.4)',
        fontSize: '0.85rem',
        letterSpacing: '0.2em',
      }}
    >
      LOADING 3D CARD...
    </div>
  ),
});

// ===== Resume data =====
const RESUME = {
  name: 'Yashkumar U Kolekar',
  firstName: 'Yashkumar',
  lastName: 'Kolekar',
  phone: '9742046509',
  email: 'yashkumar.kolekar@gmail.com',
  location: 'Bengaluru, Karnataka',
  handle: 'yashkumar.kolekar',
  status: 'Available for Tutoring',
  title: 'Tutor · B.E. Robotics & AI',
  tagline: 'Simplifying complex concepts, building student confidence.',
  objective:
    'Dedicated tutor with 3 years of experience teaching school students from 6th standard onward, both one-on-one (online & offline) and in classroom settings during school vacations. Helped many students score above 90% in their exams. Skilled at simplifying complex concepts, building student confidence, and adapting teaching style to each learning environment.',
  experience: [
    {
      title: 'Tutor — One-on-One (Online & Offline) + Vacation School Teaching',
      duration: '3 Years',
      points: [
        'Tutored school students from 6th standard onward through one-on-one sessions, both online and offline, helping many achieve scores above 90% in their exams.',
        'Taught students at school during vacation periods, delivering structured lessons to groups in a classroom setting.',
        'Conducted online sessions using digital whiteboards and screen-sharing for interactive problem-solving; offline sessions focused on personalized, face-to-face doubt-clearing and concept building.',
        'Designed customized lesson plans, practice worksheets, and mock tests tailored to each student\'s pace and learning gaps.',
        'Simplified difficult concepts using real-world examples and visual aids, strengthening student fundamentals across formats.',
        'Regularly communicated with parents/guardians on student progress and areas needing attention.',
      ],
    },
  ],
  subjects: [
    { name: 'Mathematics', icon: 'calculator', grades: '6–10' },
    { name: 'Physics', icon: 'atom', grades: '6–10' },
    { name: 'Chemistry', icon: 'flask', grades: '6–10' },
    { name: 'Biology', icon: 'dna', grades: '6–10' },
  ],
  education: [
    {
      course: 'B.E. Robotics & AI',
      institution: 'Dayananda Sagar College of Engineering',
      aggregate: 'Pursuing (CGPA 9.2/10)',
      year: 'Pursuing',
    },
    {
      course: 'XII / PUC',
      institution: 'Narayana PU College',
      aggregate: '93.25%',
      year: '2023',
    },
    {
      course: '10th / SSLC',
      institution: "Achiever's Academy",
      aggregate: '93.75%',
      year: '2021',
    },
  ],
  competencies: [
    'Proficiency in Mathematics, Physics, Chemistry, and Biology (school-level)',
    'Curriculum Planning & Lesson Design',
    'Student Assessment & Progress Tracking',
    'Patience, Adaptability, Communication',
    'Online Teaching Tools: Zoom, Google Meet, Google Jamboard, Google Classroom',
  ],
  achievements: [
    { title: 'AWS AI/ML Scholar', subtitle: 'Amazon Web Services' },
    { title: 'Reliance Foundation Scholar', subtitle: 'Reliance Foundation' },
    { title: 'Stanford Code in Place Program', subtitle: 'Stanford University · Selected' },
    { title: 'Microsoft Learn Student Ambassador', subtitle: 'Explore AI Challenge' },
  ],
};

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'card', label: 'ID Card' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'subjects', label: 'Subjects' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

const SUBJECT_ICONS: Record<string, React.ReactNode> = {
  calculator: <Calculator size={28} />,
  atom: <Atom size={28} />,
  flask: <FlaskConical size={28} />,
  dna: <Dna size={28} />,
};

// ===== Hook: reveal on scroll =====
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ===== Hook: active section =====
function useActiveSection() {
  const [active, setActive] = useState('hero');
  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(
      Boolean
    ) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  return active;
}

// ===== Component: Scroll progress =====
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      className="pf-scroll-progress"
      style={{ scaleX, transformOrigin: '0% 50%' }}
    />
  );
}

// ===== Component: Cursor glow =====
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.left = `${e.clientX}px`;
        el.style.top = `${e.clientY}px`;
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="pf-cursor-glow" />;
}

// ===== Component: Background grid + orbs =====
function BackgroundDecor() {
  return (
    <>
      <div
        className="pf-grid-bg"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div
        className="pf-orb"
        style={{
          width: 500,
          height: 500,
          background: '#6ee7ff',
          top: '-10%',
          left: '-10%',
        }}
      />
      <div
        className="pf-orb"
        style={{
          width: 400,
          height: 400,
          background: '#b794ff',
          top: '40%',
          right: '-5%',
          animationDelay: '-3s',
        }}
      />
      <div
        className="pf-orb"
        style={{
          width: 350,
          height: 350,
          background: '#ff7ac6',
          bottom: '-5%',
          left: '20%',
          animationDelay: '-6s',
        }}
      />
    </>
  );
}

// ===== Component: Navigation =====
function Nav() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(0,0,0,0.6)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button
          onClick={() => scrollTo('hero')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            background: 'transparent',
            border: 'none',
            color: '#fff',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #6ee7ff, #b794ff)',
              color: '#000',
              fontWeight: 800,
              fontSize: '0.95rem',
              letterSpacing: '-0.02em',
            }}
          >
            YK
          </div>
          <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>
            Yashkumar Kolekar
          </span>
        </button>

        {/* Desktop nav */}
        <div
          className="hidden md:flex"
          style={{ gap: '1.75rem', alignItems: 'center' }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`pf-nav-link ${active === item.id ? 'active' : ''}`}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10,
            padding: '0.5rem',
            color: '#fff',
            cursor: 'pointer',
          }}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              overflow: 'hidden',
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div
              style={{
                padding: '1rem 1.5rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
              }}
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  style={{
                    textAlign: 'left',
                    padding: '0.75rem 0',
                    background: 'transparent',
                    border: 'none',
                    color: active === item.id ? '#6ee7ff' : 'rgba(255,255,255,0.7)',
                    fontSize: '1rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ===== Section: Hero =====
function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '6rem 1.5rem 4rem',
        zIndex: 2,
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
          gap: '3rem',
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        {/* Left: text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.9rem',
              borderRadius: 999,
              background: 'rgba(110, 231, 255, 0.08)',
              border: '1px solid rgba(110, 231, 255, 0.2)',
              marginBottom: '1.5rem',
              fontSize: '0.8rem',
              fontWeight: 500,
              color: '#6ee7ff',
            }}
          >
            <span className="pf-pulse-dot" />
            Available for new students
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              margin: 0,
            }}
          >
            <span className="pf-gradient-text pf-glow-text">Yashkumar</span>
            <br />
            <span style={{ color: '#fff' }}>U Kolekar</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.4rem)',
              color: 'rgba(255,255,255,0.65)',
              marginTop: '1.5rem',
              maxWidth: '540px',
              lineHeight: 1.5,
            }}
          >
            Tutor · B.E. Robotics & AI Student — simplifying complex concepts and
            helping school students score above 90% since 3 years.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '2rem',
              flexWrap: 'wrap',
            }}
          >
            <button
              className="pf-btn pf-btn-primary"
              onClick={() =>
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Get in touch
            </button>
            <button
              className="pf-btn pf-btn-ghost"
              onClick={() =>
                document
                  .getElementById('experience')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              View experience
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{
              display: 'flex',
              gap: '2rem',
              marginTop: '3rem',
              flexWrap: 'wrap',
            }}
          >
            {[
              { value: '3+', label: 'Years tutoring' },
              { value: '90%+', label: 'Student scores' },
              { value: '4', label: 'Subjects taught' },
              { value: '9.2', label: 'CGPA / 10' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="pf-stat-number">{stat.value}</div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.5)',
                    marginTop: '0.25rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: ProfileCard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ProfileCard
            name="Yashkumar Kolekar"
            title="Tutor · Robotics & AI"
            handle="yashkumar.kolekar"
            status="Available for Tutoring"
            contactText="Contact Me"
            avatarUrl="/assets/avatar.png"
            miniAvatarUrl="/assets/avatar.png"
            showUserInfo
            enableTilt
            enableMobileTilt
            onContactClick={() =>
              document
                .getElementById('contact')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            behindGlowEnabled
            behindGlowColor="rgba(110, 231, 255, 0.18)"
            behindGlowSize="30%"
            innerGradient="linear-gradient(145deg, rgba(110,231,255,0.06) 0%, rgba(183,148,255,0.08) 100%)"
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'rgba(255,255,255,0.4)',
          fontSize: '0.7rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
        }}
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}

// ===== Section: Lanyard 3D card =====
function CardSection() {
  return (
    <section
      id="card"
      style={{
        position: 'relative',
        minHeight: '100vh',
        zIndex: 2,
        paddingTop: '4rem',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 3,
          padding: '0 1.5rem',
        }}
      >
        <div className="pf-section-eyebrow">Interactive · 3D</div>
        <h2 className="pf-section-title" style={{ color: '#fff' }}>
          Drag my <span className="pf-gradient-text">ID card</span>
        </h2>
        <p
          style={{
            color: 'rgba(255,255,255,0.55)',
            marginTop: '0.75rem',
            maxWidth: '500px',
            margin: '0.75rem auto 0',
          }}
        >
          A real physics simulation — grab the card, swing it, and let it settle.
        </p>
      </div>

      <Lanyard
        position={[0, 0, 20]}
        gravity={[0, -40, 0]}
        cardGlbUrl="/lanyard/card.glb"
        lanyardImageUrl="/lanyard/lanyard.png"
        frontImage="/assets/card-front.png"
        backImage="/assets/card-back.png"
        imageFit="cover"
        lanyardWidth={1}
      />

      <div className="pf-lanyard-hint">
        <Sparkles size={14} />
        <span>Click & drag</span>
      </div>
    </section>
  );
}

// ===== Section: About / Objective =====
function AboutSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section
      id="about"
      style={{
        position: 'relative',
        padding: '6rem 1.5rem',
        zIndex: 2,
      }}
    >
      <div
        ref={ref}
        className="pf-reveal"
        style={{ maxWidth: '900px', margin: '0 auto' }}
      >
        <div className="pf-section-eyebrow">Career Objective</div>
        <h2 className="pf-section-title" style={{ color: '#fff', marginBottom: '2rem' }}>
          About <span className="pf-gradient-text">me</span>
        </h2>
        <div
          className="pf-glass pf-glow-border"
          style={{
            padding: '2.5rem',
            borderRadius: 24,
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-12px',
              left: '2.5rem',
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #6ee7ff, #b794ff)',
                color: '#000',
              }}
            >
              <BookOpen size={22} />
            </div>
          </div>
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.85)',
              margin: 0,
              fontWeight: 400,
            }}
          >
            {RESUME.objective}
          </p>
        </div>
      </div>
    </section>
  );
}

// ===== Section: Experience =====
function ExperienceSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        padding: '6rem 1.5rem',
        zIndex: 2,
      }}
    >
      <div ref={ref} className="pf-reveal" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="pf-section-eyebrow">Tutoring Experience</div>
        <h2 className="pf-section-title" style={{ color: '#fff', marginBottom: '3rem' }}>
          3 years of <span className="pf-gradient-text">teaching</span>
        </h2>

        {RESUME.experience.map((exp, i) => (
          <div
            key={i}
            className="pf-glass pf-glow-border"
            style={{
              borderRadius: 24,
              padding: '2rem',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem 1rem',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
              }}
            >
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#fff',
                  margin: 0,
                }}
              >
                {exp.title}
              </h3>
              <span
                style={{
                  padding: '0.3rem 0.85rem',
                  borderRadius: 999,
                  background: 'rgba(110, 231, 255, 0.1)',
                  border: '1px solid rgba(110, 231, 255, 0.25)',
                  color: '#6ee7ff',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
              >
                {exp.duration}
              </span>
            </div>
            <div className="pf-stagger" style={{ display: 'grid', gap: '1rem' }}>
              {exp.points.map((point, j) => (
                <div
                  key={j}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, rgba(110,231,255,0.2), rgba(183,148,255,0.2))',
                      border: '1px solid rgba(110,231,255,0.3)',
                      color: '#6ee7ff',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      marginTop: 2,
                    }}
                  >
                    {j + 1}
                  </div>
                  <p
                    style={{
                      margin: 0,
                      color: 'rgba(255,255,255,0.75)',
                      lineHeight: 1.65,
                      fontSize: '0.95rem',
                    }}
                  >
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===== Section: Subjects =====
function SubjectsSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section
      id="subjects"
      style={{
        position: 'relative',
        padding: '6rem 1.5rem',
        zIndex: 2,
      }}
    >
      <div ref={ref} className="pf-reveal" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="pf-section-eyebrow">Subjects Taught</div>
        <h2 className="pf-section-title" style={{ color: '#fff', marginBottom: '3rem' }}>
          Grades <span className="pf-gradient-text">6–10</span>
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {RESUME.subjects.map((subject) => (
            <div
              key={subject.name}
              className="pf-glass pf-glow-border"
              style={{
                padding: '1.75rem',
                borderRadius: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div className="pf-subject-icon">
                {SUBJECT_ICONS[subject.icon]}
              </div>
              <div>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#fff',
                    margin: 0,
                  }}
                >
                  {subject.name}
                </h3>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.5)',
                    margin: '0.25rem 0 0',
                  }}
                >
                  Grades {subject.grades}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== Section: Education =====
function EducationSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section
      id="education"
      style={{
        position: 'relative',
        padding: '6rem 1.5rem',
        zIndex: 2,
      }}
    >
      <div ref={ref} className="pf-reveal" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="pf-section-eyebrow">Educational Qualifications</div>
        <h2 className="pf-section-title" style={{ color: '#fff', marginBottom: '3rem' }}>
          Academic <span className="pf-gradient-text">journey</span>
        </h2>

        <div style={{ display: 'grid', gap: '1.25rem' }}>
          {RESUME.education.map((edu, i) => (
            <div
              key={i}
              className="pf-glass pf-glow-border"
              style={{
                borderRadius: 20,
                padding: '1.75rem',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: '1.5rem',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, rgba(110,231,255,0.18), rgba(183,148,255,0.18))',
                  border: '1px solid rgba(110,231,255,0.25)',
                  color: '#6ee7ff',
                }}
              >
                <GraduationCap size={26} />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#fff',
                    margin: 0,
                  }}
                >
                  {edu.course}
                </h3>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.6)',
                    margin: '0.35rem 0 0',
                  }}
                >
                  {edu.institution}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#6ee7ff',
                  }}
                >
                  {edu.aggregate}
                </div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.5)',
                    marginTop: '0.25rem',
                  }}
                >
                  {edu.year}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Core competencies */}
        <div style={{ marginTop: '4rem' }}>
          <div className="pf-section-eyebrow">Core Competencies</div>
          <h3
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 700,
              color: '#fff',
              margin: 0,
            }}
          >
            Skills & <span className="pf-gradient-text">tools</span>
          </h3>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginTop: '1.75rem',
            }}
          >
            {RESUME.competencies.map((skill) => (
              <span key={skill} className="pf-chip">
                <Sparkles size={14} style={{ color: '#6ee7ff' }} />
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Section: Achievements =====
function AchievementsSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section
      id="achievements"
      style={{
        position: 'relative',
        padding: '6rem 1.5rem',
        zIndex: 2,
      }}
    >
      <div ref={ref} className="pf-reveal" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="pf-section-eyebrow">Achievements & Recognition</div>
        <h2 className="pf-section-title" style={{ color: '#fff', marginBottom: '3rem' }}>
          Awards & <span className="pf-gradient-text">honors</span>
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {RESUME.achievements.map((ach, i) => (
            <div
              key={i}
              className="pf-glass pf-glow-border"
              style={{
                padding: '1.75rem',
                borderRadius: 20,
                display: 'flex',
                gap: '1.25rem',
                alignItems: 'flex-start',
              }}
            >
              <div className="pf-medal">
                <Trophy size={22} />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#fff',
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {ach.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.55)',
                    margin: '0.4rem 0 0',
                  }}
                >
                  {ach.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== Section: Contact =====
function ContactSection() {
  const ref = useReveal<HTMLDivElement>();
  const contacts = [
    {
      icon: <Phone size={22} />,
      label: 'Phone',
      value: RESUME.phone,
      href: `tel:+91${RESUME.phone}`,
    },
    {
      icon: <Mail size={22} />,
      label: 'Email',
      value: RESUME.email,
      href: `mailto:${RESUME.email}`,
    },
    {
      icon: <MapPin size={22} />,
      label: 'Location',
      value: RESUME.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(RESUME.location)}`,
    },
  ];

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        padding: '6rem 1.5rem 4rem',
        zIndex: 2,
      }}
    >
      <div ref={ref} className="pf-reveal" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="pf-section-eyebrow">Get in touch</div>
        <h2 className="pf-section-title" style={{ color: '#fff', marginBottom: '1rem' }}>
          Let&apos;s learn <span className="pf-gradient-text">together</span>
        </h2>
        <p
          style={{
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '540px',
            fontSize: '1.05rem',
            lineHeight: 1.6,
            marginBottom: '3rem',
          }}
        >
          Available for one-on-one tutoring (online & offline) and vacation
          classroom teaching. Reach out to discuss your learning goals.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="pf-glass pf-glow-border"
              style={{
                padding: '1.5rem',
                borderRadius: 20,
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                gap: '1.25rem',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, rgba(110,231,255,0.18), rgba(183,148,255,0.18))',
                  border: '1px solid rgba(110,231,255,0.25)',
                  color: '#6ee7ff',
                  flexShrink: 0,
                }}
              >
                {c.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.5)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  {c.label}
                </div>
                <div
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#fff',
                    marginTop: '0.25rem',
                    wordBreak: 'break-word',
                  }}
                >
                  {c.value}
                </div>
              </div>
              <ExternalLink
                size={16}
                style={{ color: 'rgba(255,255,255,0.3)', marginLeft: 'auto', flexShrink: 0 }}
              />
            </a>
          ))}
        </div>

        {/* CTA banner */}
        <div
          className="pf-glass pf-glow-border"
          style={{
            marginTop: '3rem',
            padding: '2.5rem',
            borderRadius: 24,
            textAlign: 'center',
            background:
              'linear-gradient(135deg, rgba(110,231,255,0.06), rgba(183,148,255,0.06))',
          }}
        >
          <Star
            size={32}
            style={{ color: '#fbbf24', margin: '0 auto 1rem' }}
            fill="#fbbf24"
          />
          <h3
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 700,
              color: '#fff',
              margin: 0,
            }}
          >
            Ready to score above 90%?
          </h3>
          <p
            style={{
              color: 'rgba(255,255,255,0.6)',
              marginTop: '0.75rem',
              marginBottom: '1.75rem',
              maxWidth: '460px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Book a session today — first consultation is always free.
          </p>
          <a href={`mailto:${RESUME.email}`} className="pf-btn pf-btn-primary" style={{ textDecoration: 'none' }}>
            <Mail size={16} />
            Start learning
          </a>
        </div>
      </div>
    </section>
  );
}

// ===== Footer =====
function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 2,
        padding: '3rem 1.5rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(0,0,0,0.4)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #6ee7ff, #b794ff)',
              color: '#000',
              fontWeight: 800,
              fontSize: '0.8rem',
            }}
          >
            YK
          </div>
          <span
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.85rem',
            }}
          >
            © {new Date().getFullYear()} Yashkumar U Kolekar. All rights reserved.
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.85rem',
          }}
        >
          <span>Bengaluru, India</span>
          <span>·</span>
          <span>Built with React Three Fiber</span>
        </div>
      </div>
    </footer>
  );
}

// ===== Main page =====
export default function Page() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <BackgroundDecor />
      <CursorGlow />
      <ScrollProgress />
      <Nav />

      <HeroSection />
      <CardSection />
      <AboutSection />
      <ExperienceSection />
      <SubjectsSection />
      <EducationSection />
      <AchievementsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
