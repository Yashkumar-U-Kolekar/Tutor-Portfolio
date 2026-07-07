'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  ArrowDown,
  ArrowUpRight,
  GraduationCap,
  BookOpen,
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  Trophy,
  Menu,
  X,
  ArrowRight,
} from 'lucide-react';
import dynamic from 'next/dynamic';
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
        color: 'rgba(245,245,240,0.4)',
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: '0.7rem',
        letterSpacing: '0.3em',
      }}
    >
      LOADING
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
    'Dedicated tutor with 4 years of combined experience — 3 years of one-on-one and vacation school teaching, plus 1 year as a home tutor covering offline tuition, school tuition, and online classes. Helped many students score above 90% in their exams. Skilled at simplifying complex concepts, building student confidence, and adapting teaching style to each learning environment.',
  experience: [
    {
      title: 'Home Tutor — Offline Tuition, School Tuition & Online Classes',
      duration: '1 Year',
      points: [
        'Provided home tutoring across all three formats — offline one-on-one tuition at students\' homes, school-based classroom teaching, and online classes — giving families flexible learning options.',
        'Conducted in-person home visits for personalized, face-to-face doubt clearing and concept building, adapting teaching pace to each student\'s individual learning gaps.',
        'Delivered structured lessons during school tuition hours, managing group classroom dynamics while ensuring every student stayed on track with the curriculum.',
        'Ran parallel online classes using digital whiteboards and screen-sharing, enabling students to attend sessions remotely without compromising on interactivity.',
        'Coordinated closely with parents and school staff to align home, school, and online instruction into a single, consistent learning plan for each student.',
      ],
    },
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
  { id: 'hero', label: 'Index', num: '00' },
  { id: 'about', label: 'About', num: '01' },
  { id: 'experience', label: 'Experience', num: '02' },
  { id: 'subjects', label: 'Subjects', num: '03' },
  { id: 'education', label: 'Education', num: '04' },
  { id: 'achievements', label: 'Honors', num: '05' },
  { id: 'contact', label: 'Contact', num: '06' },
];

const SUBJECT_ICONS: Record<string, React.ReactNode> = {
  calculator: <Calculator size={22} strokeWidth={1.4} />,
  atom: <Atom size={22} strokeWidth={1.4} />,
  flask: <FlaskConical size={22} strokeWidth={1.4} />,
  dna: <Dna size={22} strokeWidth={1.4} />,
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

// ===== Component: Background =====
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
          width: 600,
          height: 600,
          background: '#C9A961',
          top: '-15%',
          left: '-10%',
        }}
      />
      <div
        className="pf-orb"
        style={{
          width: 450,
          height: 450,
          background: '#8B7355',
          top: '45%',
          right: '-8%',
          animationDelay: '-4s',
        }}
      />
      <div
        className="pf-orb"
        style={{
          width: 400,
          height: 400,
          background: '#C9A961',
          bottom: '-5%',
          left: '25%',
          animationDelay: '-8s',
        }}
      />
    </>
  );
}

// ===== Component: Nav =====
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
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled ? 'rgba(8,8,10,0.7)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(245,245,240,0.06)'
          : '1px solid transparent',
      }}
    >
      <div
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '1.25rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand */}
        <button
          onClick={() => scrollTo('hero')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            cursor: 'pointer',
            background: 'transparent',
            border: 'none',
            color: 'inherit',
          }}
        >
          <span
            className="pf-mono"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              color: 'var(--pf-accent)',
              textTransform: 'uppercase',
            }}
          >
            YK
          </span>
          <span
            style={{
              fontFamily: 'var(--pf-font-display)',
              fontWeight: 500,
              fontSize: '1.05rem',
              letterSpacing: '-0.01em',
              color: 'var(--pf-fg)',
            }}
          >
            Yashkumar Kolekar
          </span>
        </button>

        {/* Desktop nav */}
        <div
          className="hidden md:flex"
          style={{ gap: '2.25rem', alignItems: 'center' }}
        >
          {NAV_ITEMS.slice(1).map((item) => (
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

        {/* CTA */}
        <button
          onClick={() => scrollTo('contact')}
          className="hidden md:inline-flex pf-btn pf-btn-ghost"
          style={{ padding: '0.55rem 1.1rem', fontSize: '0.8rem' }}
        >
          Get in touch
          <ArrowUpRight size={14} strokeWidth={1.5} />
        </button>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden"
          style={{
            background: 'transparent',
            border: '1px solid var(--pf-border)',
            borderRadius: 4,
            padding: '0.5rem',
            color: 'var(--pf-fg)',
            cursor: 'pointer',
          }}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              overflow: 'hidden',
              background: 'rgba(8,8,10,0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--pf-border)',
            }}
          >
            <div
              style={{
                padding: '1rem 2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
              }}
            >
              {NAV_ITEMS.slice(1).map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    padding: '0.9rem 0',
                    background: 'transparent',
                    border: 'none',
                    borderBottom:
                      i < NAV_ITEMS.length - 2
                        ? '1px solid var(--pf-border)'
                        : 'none',
                    color:
                      active === item.id
                        ? 'var(--pf-accent)'
                        : 'var(--pf-fg-muted)',
                    fontFamily: 'var(--pf-font-display)',
                    fontSize: '1.15rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                  <span className="pf-mono" style={{ fontSize: '0.65rem', opacity: 0.5 }}>
                    {item.num}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ===== Hero =====
function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '7rem 2rem 3rem',
        zIndex: 2,
      }}
    >
      <div
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
          gap: '3rem',
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        {/* Left */}
        <div>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '2rem',
            }}
          >
            <span className="pf-pulse-dot" />
            <span
              className="pf-mono"
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--pf-fg-muted)',
              }}
            >
              Available for new students — 2026
            </span>
          </motion.div>

          {/* Name — editorial serif */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="pf-display pf-glow-text"
            style={{
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              fontWeight: 500,
              letterSpacing: '-0.035em',
              lineHeight: 0.96,
              margin: 0,
              color: 'var(--pf-fg)',
            }}
          >
            Yashkumar
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 400 }}>
              U <span className="pf-gradient-text">Kolekar</span>
            </span>
          </motion.h1>

          {/* Title row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              marginTop: '2rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              className="pf-mono"
              style={{
                fontSize: '0.78rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--pf-accent)',
              }}
            >
              Tutor
            </span>
            <span style={{ width: 24, height: 1, background: 'var(--pf-border-strong)' }} />
            <span
              className="pf-mono"
              style={{
                fontSize: '0.78rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--pf-fg-muted)',
              }}
            >
              B.E. Robotics &amp; AI
            </span>
            <span style={{ width: 24, height: 1, background: 'var(--pf-border-strong)' }} />
            <span
              className="pf-mono"
              style={{
                fontSize: '0.78rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--pf-fg-muted)',
              }}
            >
              Bengaluru
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--pf-font-display)',
              fontSize: 'clamp(1.15rem, 1.8vw, 1.5rem)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'var(--pf-fg-muted)',
              marginTop: '2.25rem',
              maxWidth: '540px',
              lineHeight: 1.5,
              letterSpacing: '-0.01em',
            }}
          >
            Simplifying complex concepts, building student confidence —
            helping school students score above 90% for four years.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '2.5rem',
              flexWrap: 'wrap',
            }}
          >
            <button
              className="pf-btn pf-btn-primary"
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Book a session
              <ArrowRight size={15} strokeWidth={1.5} />
            </button>
            <button
              className="pf-btn pf-btn-ghost"
              onClick={() =>
                document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              View experience
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.85 }}
            style={{
              display: 'flex',
              gap: 0,
              marginTop: '4rem',
              borderTop: '1px solid var(--pf-border)',
              paddingTop: '2rem',
            }}
          >
            {[
              { value: '4+', label: 'Years tutoring' },
              { value: '90%', label: 'Avg. scores' },
              { value: '4', label: 'Subjects' },
              { value: '9.2', label: 'CGPA / 10' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  flex: 1,
                  paddingLeft: i === 0 ? 0 : '1.5rem',
                  paddingRight: i === 3 ? 0 : '1.5rem',
                  borderRight:
                    i < 3 ? '1px solid var(--pf-border)' : 'none',
                }}
              >
                <div className="pf-stat-number">{stat.value}</div>
                <div className="pf-stat-label">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Draggable 3D Lanyard card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '640px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Lanyard
              position={[0, 0, 20]}
              gravity={[0, -40, 0]}
              cardGlbUrl="/lanyard/card.glb"
              lanyardImageUrl="/lanyard/lanyard.png"
              frontImage="/assets/avatar.png"
              backImage="/assets/card-back.png"
              imageFit="cover"
              lanyardWidth={1}
            />
            <div
              className="pf-mono"
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--pf-fg-dim)',
                pointerEvents: 'none',
              }}
            >
              · Click &amp; drag ·
            </div>
          </div>
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
          gap: '0.85rem',
        }}
      >
        <span
          className="pf-mono"
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--pf-fg-dim)',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'var(--pf-fg-dim)' }}
        >
          <ArrowDown size={14} strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}

// ===== About =====
function AboutSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section
      id="about"
      style={{ position: 'relative', padding: '7rem 2rem', zIndex: 2 }}
    >
      <div ref={ref} className="pf-reveal" style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', marginBottom: '3rem' }}>
          <span className="pf-mono" style={{ fontSize: '0.7rem', color: 'var(--pf-fg-dim)', letterSpacing: '0.3em' }}>
            02 — ABOUT
          </span>
          <span style={{ flex: 1, height: 1, background: 'var(--pf-border)' }} />
        </div>

        <div className="pf-section-eyebrow">Career Objective</div>
        <h2 className="pf-section-title" style={{ marginBottom: '2.5rem' }}>
          About <span className="pf-gradient-text">me</span>
        </h2>

        <div
          className="pf-glass"
          style={{
            padding: '3rem',
            borderRadius: 6,
            position: 'relative',
          }}
        >
          {/* Decorative quote mark */}
          <div
            style={{
              position: 'absolute',
              top: '1.5rem',
              left: '2rem',
              fontFamily: 'var(--pf-font-display)',
              fontSize: '5rem',
              lineHeight: 1,
              color: 'var(--pf-accent)',
              opacity: 0.3,
              fontStyle: 'italic',
            }}
          >
            &ldquo;
          </div>

          <p
            style={{
              fontFamily: 'var(--pf-font-display)',
              fontSize: 'clamp(1.15rem, 1.8vw, 1.5rem)',
              lineHeight: 1.65,
              color: 'var(--pf-fg)',
              margin: 0,
              fontWeight: 400,
              fontStyle: 'italic',
              letterSpacing: '-0.01em',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {RESUME.objective}
          </p>
        </div>
      </div>
    </section>
  );
}

// ===== Experience =====
function ExperienceSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section
      id="experience"
      style={{ position: 'relative', padding: '7rem 2rem', zIndex: 2 }}
    >
      <div ref={ref} className="pf-reveal" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', marginBottom: '3rem' }}>
          <span className="pf-mono" style={{ fontSize: '0.7rem', color: 'var(--pf-fg-dim)', letterSpacing: '0.3em' }}>
            03 — EXPERIENCE
          </span>
          <span style={{ flex: 1, height: 1, background: 'var(--pf-border)' }} />
        </div>

        <div className="pf-section-eyebrow">Tutoring Experience</div>
        <h2 className="pf-section-title" style={{ marginBottom: '3rem' }}>
          Four years of <span className="pf-gradient-text">teaching</span>
        </h2>

        {RESUME.experience.map((exp, i) => (
          <div
            key={i}
            className="pf-glass"
            style={{
              borderRadius: 6,
              padding: '2.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem 1.5rem',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '2rem',
                paddingBottom: '1.5rem',
                borderBottom: '1px solid var(--pf-border)',
              }}
            >
              <h3
                className="pf-display"
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 500,
                  color: 'var(--pf-fg)',
                  margin: 0,
                  letterSpacing: '-0.015em',
                }}
              >
                {exp.title}
              </h3>
              <span
                className="pf-mono"
                style={{
                  padding: '0.4rem 0.85rem',
                  background: 'var(--pf-accent-soft)',
                  border: '1px solid var(--pf-accent-line)',
                  color: 'var(--pf-accent)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  borderRadius: 2,
                }}
              >
                {exp.duration}
              </span>
            </div>

            <div className="pf-stagger" style={{ display: 'grid', gap: '1.25rem' }}>
              {exp.points.map((point, j) => (
                <div key={j} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <div className="pf-marker">{String(j + 1).padStart(2, '0')}</div>
                  <p
                    style={{
                      margin: 0,
                      color: 'var(--pf-fg-muted)',
                      lineHeight: 1.7,
                      fontSize: '0.95rem',
                      flex: 1,
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

// ===== Subjects =====
function SubjectsSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section
      id="subjects"
      style={{ position: 'relative', padding: '7rem 2rem', zIndex: 2 }}
    >
      <div ref={ref} className="pf-reveal" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', marginBottom: '3rem' }}>
          <span className="pf-mono" style={{ fontSize: '0.7rem', color: 'var(--pf-fg-dim)', letterSpacing: '0.3em' }}>
            04 — SUBJECTS
          </span>
          <span style={{ flex: 1, height: 1, background: 'var(--pf-border)' }} />
        </div>

        <div className="pf-section-eyebrow">Subjects Taught</div>
        <h2 className="pf-section-title" style={{ marginBottom: '3rem' }}>
          Grades <span className="pf-gradient-text">6 — 10</span>
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {RESUME.subjects.map((subject, i) => (
            <div
              key={subject.name}
              className="pf-glass"
              style={{
                padding: '2rem',
                borderRadius: 6,
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                position: 'relative',
              }}
            >
              <span
                className="pf-mono"
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  fontSize: '0.65rem',
                  color: 'var(--pf-fg-dim)',
                  letterSpacing: '0.2em',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="pf-subject-icon">{SUBJECT_ICONS[subject.icon]}</div>
              <div>
                <h3
                  className="pf-display"
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 500,
                    color: 'var(--pf-fg)',
                    margin: 0,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {subject.name}
                </h3>
                <p
                  className="pf-mono"
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--pf-fg-dim)',
                    margin: '0.5rem 0 0',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
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

// ===== Education =====
function EducationSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section
      id="education"
      style={{ position: 'relative', padding: '7rem 2rem', zIndex: 2 }}
    >
      <div ref={ref} className="pf-reveal" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', marginBottom: '3rem' }}>
          <span className="pf-mono" style={{ fontSize: '0.7rem', color: 'var(--pf-fg-dim)', letterSpacing: '0.3em' }}>
            05 — EDUCATION
          </span>
          <span style={{ flex: 1, height: 1, background: 'var(--pf-border)' }} />
        </div>

        <div className="pf-section-eyebrow">Educational Qualifications</div>
        <h2 className="pf-section-title" style={{ marginBottom: '3rem' }}>
          Academic <span className="pf-gradient-text">journey</span>
        </h2>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {RESUME.education.map((edu, i) => (
            <div
              key={i}
              className="pf-glass"
              style={{
                borderRadius: 6,
                padding: '2rem 2.25rem',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: '2rem',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--pf-card)',
                  border: '1px solid var(--pf-border)',
                  color: 'var(--pf-accent)',
                }}
              >
                <GraduationCap size={22} strokeWidth={1.4} />
              </div>
              <div>
                <h3
                  className="pf-display"
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 500,
                    color: 'var(--pf-fg)',
                    margin: 0,
                    letterSpacing: '-0.015em',
                  }}
                >
                  {edu.course}
                </h3>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--pf-fg-muted)',
                    margin: '0.4rem 0 0',
                  }}
                >
                  {edu.institution}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div
                  className="pf-display"
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 500,
                    color: 'var(--pf-accent)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {edu.aggregate}
                </div>
                <div
                  className="pf-mono"
                  style={{
                    fontSize: '0.65rem',
                    color: 'var(--pf-fg-dim)',
                    marginTop: '0.35rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                >
                  {edu.year}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Core competencies */}
        <div style={{ marginTop: '5rem' }}>
          <div className="pf-section-eyebrow">Core Competencies</div>
          <h3
            className="pf-display"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 500,
              color: 'var(--pf-fg)',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Skills &amp; <span className="pf-gradient-text">tools</span>
          </h3>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginTop: '2rem',
            }}
          >
            {RESUME.competencies.map((skill) => (
              <span key={skill} className="pf-chip">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Achievements =====
function AchievementsSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section
      id="achievements"
      style={{ position: 'relative', padding: '7rem 2rem', zIndex: 2 }}
    >
      <div ref={ref} className="pf-reveal" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', marginBottom: '3rem' }}>
          <span className="pf-mono" style={{ fontSize: '0.7rem', color: 'var(--pf-fg-dim)', letterSpacing: '0.3em' }}>
            06 — HONORS
          </span>
          <span style={{ flex: 1, height: 1, background: 'var(--pf-border)' }} />
        </div>

        <div className="pf-section-eyebrow">Achievements &amp; Recognition</div>
        <h2 className="pf-section-title" style={{ marginBottom: '3rem' }}>
          Awards &amp; <span className="pf-gradient-text">honors</span>
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {RESUME.achievements.map((ach, i) => (
            <div
              key={i}
              className="pf-glass"
              style={{
                padding: '2rem',
                borderRadius: 6,
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'flex-start',
              }}
            >
              <div className="pf-medal">
                <Trophy size={20} strokeWidth={1.4} />
              </div>
              <div style={{ flex: 1 }}>
                <span
                  className="pf-mono"
                  style={{
                    display: 'block',
                    fontSize: '0.65rem',
                    color: 'var(--pf-fg-dim)',
                    letterSpacing: '0.25em',
                    marginBottom: '0.5rem',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3
                  className="pf-display"
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 500,
                    color: 'var(--pf-fg)',
                    margin: 0,
                    lineHeight: 1.3,
                    letterSpacing: '-0.015em',
                  }}
                >
                  {ach.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--pf-fg-muted)',
                    margin: '0.5rem 0 0',
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

// ===== Contact =====
function ContactSection() {
  const ref = useReveal<HTMLDivElement>();
  const contacts = [
    {
      icon: <Phone size={20} strokeWidth={1.4} />,
      label: 'Phone',
      value: RESUME.phone,
      href: `tel:+91${RESUME.phone}`,
    },
    {
      icon: <Mail size={20} strokeWidth={1.4} />,
      label: 'Email',
      value: RESUME.email,
      href: `mailto:${RESUME.email}`,
    },
    {
      icon: <MapPin size={20} strokeWidth={1.4} />,
      label: 'Location',
      value: RESUME.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(RESUME.location)}`,
    },
  ];

  return (
    <section
      id="contact"
      style={{ position: 'relative', padding: '7rem 2rem 4rem', zIndex: 2 }}
    >
      <div ref={ref} className="pf-reveal" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', marginBottom: '3rem' }}>
          <span className="pf-mono" style={{ fontSize: '0.7rem', color: 'var(--pf-fg-dim)', letterSpacing: '0.3em' }}>
            07 — CONTACT
          </span>
          <span style={{ flex: 1, height: 1, background: 'var(--pf-border)' }} />
        </div>

        <div className="pf-section-eyebrow">Get in touch</div>
        <h2 className="pf-section-title" style={{ marginBottom: '1.25rem' }}>
          Let&apos;s learn <span className="pf-gradient-text">together</span>
        </h2>
        <p
          className="pf-display-italic"
          style={{
            color: 'var(--pf-fg-muted)',
            maxWidth: '560px',
            fontSize: '1.25rem',
            lineHeight: 1.55,
            marginBottom: '3.5rem',
          }}
        >
          Available for one-on-one tutoring (online &amp; offline) and vacation
          classroom teaching. Reach out to discuss your learning goals.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="pf-glass"
              style={{
                padding: '1.75rem',
                borderRadius: 6,
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                gap: '1.25rem',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--pf-card)',
                  border: '1px solid var(--pf-border)',
                  color: 'var(--pf-accent)',
                  flexShrink: 0,
                }}
              >
                {c.icon}
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div
                  className="pf-mono"
                  style={{
                    fontSize: '0.65rem',
                    color: 'var(--pf-fg-dim)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.25em',
                  }}
                >
                  {c.label}
                </div>
                <div
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: 'var(--pf-fg)',
                    marginTop: '0.4rem',
                    wordBreak: 'break-word',
                  }}
                >
                  {c.value}
                </div>
              </div>
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                style={{ color: 'var(--pf-fg-dim)', flexShrink: 0 }}
              />
            </a>
          ))}
        </div>

        {/* CTA banner */}
        <div
          className="pf-glass"
          style={{
            marginTop: '3rem',
            padding: '3.5rem 2.5rem',
            borderRadius: 6,
            textAlign: 'center',
            background:
              'linear-gradient(135deg, rgba(201,169,97,0.04), rgba(139,115,85,0.05))',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: 1,
              background:
                'linear-gradient(90deg, transparent, var(--pf-accent-line), transparent)',
            }}
          />
          <span
            className="pf-mono"
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--pf-accent)',
            }}
          >
            First consultation free
          </span>
          <h3
            className="pf-display"
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
              fontWeight: 500,
              color: 'var(--pf-fg)',
              margin: '1rem 0 0.85rem',
              letterSpacing: '-0.025em',
            }}
          >
            Ready to score above 90%?
          </h3>
          <p
            style={{
              color: 'var(--pf-fg-muted)',
              marginBottom: '2rem',
              maxWidth: '460px',
              marginLeft: 'auto',
              marginRight: 'auto',
              fontSize: '0.95rem',
            }}
          >
            Book a session today — personalized lesson plans, online or offline.
          </p>
          <a
            href={`mailto:${RESUME.email}`}
            className="pf-btn pf-btn-primary"
            style={{ textDecoration: 'none' }}
          >
            <Mail size={15} strokeWidth={1.5} />
            Start learning
            <ArrowRight size={15} strokeWidth={1.5} />
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
        padding: '3rem 2rem 2rem',
        borderTop: '1px solid var(--pf-border)',
        background: 'rgba(8,8,10,0.4)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span
            className="pf-mono"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              color: 'var(--pf-accent)',
              textTransform: 'uppercase',
            }}
          >
            YK
          </span>
          <span
            className="pf-display"
            style={{
              color: 'var(--pf-fg-muted)',
              fontSize: '0.9rem',
              fontWeight: 500,
            }}
          >
            Yashkumar U Kolekar
          </span>
        </div>

        <div
          className="pf-mono"
          style={{
            display: 'flex',
            gap: '1.5rem',
            color: 'var(--pf-fg-dim)',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          <span>© {new Date().getFullYear()}</span>
          <span>Bengaluru, India</span>
          <span>Built with React Three Fiber</span>
        </div>
      </div>
    </footer>
  );
}

// ===== Main page =====
export default function Page() {
  // Track mouse position for the card glow effect
  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const card = target.closest('.pf-glass');
      if (card) {
        const rect = card.getBoundingClientRect();
        (card as HTMLElement).style.setProperty('--mx', `${e.clientX - rect.left}px`);
        (card as HTMLElement).style.setProperty('--my', `${e.clientY - rect.top}px`);
      }
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <main style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      <BackgroundDecor />
      <CursorGlow />
      <ScrollProgress />
      <Nav />

      <HeroSection />
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
