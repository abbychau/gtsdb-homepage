/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Github, Globe, Download, Pencil, Book, Key, Rss, Timer, Presentation, Star, Plug, SquareArrowOutUpRight, Terminal, Zap, Monitor, Container } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import oldHamham from './oldHamham.png'

import { buttonVariants } from "@/components/ui/button"
import controlfree from './control-free.png' // control-free, a company that provides a wide range of services, mostly in the IoT sector.
import vertriqe from './vertriqe.png' // vertriqe, a company that provides a wide range of services, including IoT, AI, and more.
import samdasoo from './samdasoo.png' // jeju samdasoo, enormous drinking water company from korea. famous for its volcanic water, selling around the world, loved by health-conscious people.
import Link from 'next/link'
import { ResponsiveBar } from "@nivo/bar"
import Footer from '@/components/Footer'
import { LightboxImage } from '@/components/Lightbox'
import bm from '@/lib/benchmark-data.json'

const rd = (n: number) => Math.round(n * 100) / 100

const NAV_SECTIONS = [
  { id: 'features', label: 'Key Features' },
  { id: 'usages', label: 'Usages' },
  { id: 'performance', label: 'Performance' },
]

function useScrollSpy(sectionIds: string[]) {
  const [activeId, setActiveId] = useState('')
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) { setActiveId(e.target.id); break }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )
    const els = sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [sectionIds])
  return activeId
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useScrollSpy(NAV_SECTIONS.map(s => s.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { document.body.style.overflow = mobileOpen ? 'hidden' : '' }, [mobileOpen])

  const linkClass = (id: string) =>
    `relative text-sm font-medium transition-colors duration-200 ${
      activeSection === id
        ? 'text-cyan-300'
        : 'text-slate-300 hover:text-cyan-300'
    }`

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-2xl bg-slate-950/95 shadow-[0_4px_20px_rgba(0,0,0,0.4)] py-0'
          : 'backdrop-blur-xl bg-gradient-to-r from-slate-900/90 via-indigo-900/85 to-slate-900/90 py-1'
      } border-b-0`}>
        {/* Fancy gradient bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500/60 via-indigo-400/60 to-fuchsia-500/60" />

        <div className={`container mx-auto px-4 flex justify-between items-center relative transition-all duration-500 ${scrolled ? 'py-2' : 'py-1'}`}>
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0 group">
            <span className="w-9 shrink-0">
              {scrolled && (
                <motion.div layoutId="hero-logo">
                  <Image src={oldHamham} alt="GTSDB Logo" className="w-9" />
                </motion.div>
              )}
            </span>
            <h1 className={`font-bold transition-all duration-500 ${scrolled ? 'text-lg' : 'text-2xl'} text-white`}>
              GTSDB
              <span className={`hidden sm:inline transition-all duration-300 ${scrolled ? 'text-xs ml-1' : 'text-base ml-1'}`}>
                · <span className="text-red-400">G</span>o<span className="text-red-400">T</span>ime<span className="text-red-400">S</span>eries<span className="text-red-400">DB</span>
              </span>
            </h1>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_SECTIONS.map(s => (
              <a key={s.id} href={`#${s.id}`} className={linkClass(s.id) + ' px-3 py-2 rounded-lg hover:bg-white/5'}>
                {s.label}
                {activeSection === s.id && (
                  <motion.div layoutId="nav-underline" className="absolute bottom-0 left-3 right-3 h-0.5 bg-cyan-400 rounded-full" transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
                )}
              </a>
            ))}
            <div className="w-px h-5 bg-white/10 mx-2" />
            <Link href="/Documentation" className={`${linkClass('')} px-3 py-2 rounded-lg hover:bg-white/5 flex items-center gap-1.5`}>
              <Book className="h-4 w-4" /> Docs
            </Link>
            <div className="w-px h-5 bg-white/10 mx-2" />
            <a href="https://github.com/abbychau/gtsdb" target='_blank' rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-white/10">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://github.com/abbychau/gtsdb/releases" target='_blank' rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-white/10">
              <Download className="h-5 w-5" />
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.5 group"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
            <span className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <motion.div
          className="md:hidden overflow-hidden"
          initial={false}
          animate={{ height: mobileOpen ? 'auto' : 0, opacity: mobileOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <nav className="px-4 pb-4 pt-2 flex flex-col gap-1 border-t border-white/10">
            {NAV_SECTIONS.map(s => (
              <a key={s.id} href={`#${s.id}`} onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  activeSection === s.id ? 'bg-indigo-500/20 text-cyan-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}>{s.label}</a>
            ))}
            <div className="h-px bg-white/10 my-1" />
            <Link href="/Documentation" onClick={() => setMobileOpen(false)}
              className="px-4 py-3 rounded-xl text-base font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-all duration-200 flex items-center gap-2">
              <Book className="h-4 w-4" /> Documentation
            </Link>
            <div className="flex gap-2 mt-2 px-2">
              <a href="https://github.com/abbychau/gtsdb" target='_blank' rel="noopener noreferrer"
                className="flex-1 text-center py-2.5 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-200 text-sm font-medium">
                <Github className="h-4 w-4 inline mr-1" /> GitHub
              </a>
              <a href="https://github.com/abbychau/gtsdb/releases" target='_blank' rel="noopener noreferrer"
                className="flex-1 text-center py-2.5 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-200 text-sm font-medium">
                <Download className="h-4 w-4 inline mr-1" /> Download
              </a>
            </div>
          </nav>
        </motion.div>
      </header>

      <main className="flex-grow">
        <HeroSection scrolled={scrolled} />
        <FeaturesSection />
        <EfficiencySection />
        <UsageSection />
        <DriversSection />
        <PerformanceSection />
        <TrustedBySection />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}

function HeroSection(_props: { scrolled: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({ x, y })
  }, [])

  const handleTiltMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20
    setTilt({ x, y })
  }, [])

  const handleTiltLeave = useCallback(() => setTilt({ x: 0, y: 0 }), [])

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white py-24 md:py-32 overflow-hidden"
    >
      {/* Animated floating orbs — parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]"
          style={{ transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)` }} />
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-fuchsia-500/15 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite_1s]"
          style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }} />
        <div className="absolute -bottom-20 right-1/3 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-[float_7s_ease-in-out_infinite_2s]"
          style={{ transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)` }} />
        <div className="absolute top-1/4 left-1/2 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl animate-[float_9s_ease-in-out_infinite_3s]"
          style={{ transform: `translate(${mousePos.x * 15}px, ${mousePos.y * -15}px)` }} />
      </div>
      {/* Grid overlay with parallax */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none"
        style={{ transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)` }} />
      {/* Radial glow at center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-indigo-500/10 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />
      {/* Floating particles */}
      <ParticleField />
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative">
        <motion.div
          className="md:w-1/2 mb-10 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            <span className="block text-sm md:text-base font-normal text-cyan-300/80 mb-2 tracking-widest uppercase">A Dead Simple</span>
            GTSDB
            <br />
            <span className="text-red-400">G</span>olang{' '}
            <span className="text-red-400">T</span>ime{' '}
            <span className="text-red-400">S</span>eries{' '}
            <span className="text-red-400">D</span>ata{' '}
            <span className="text-red-400">B</span>ase
          </h1>

          <TypewriterText />

          <div className="flex flex-wrap gap-3 mt-8">
            <Button
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white border-0 transition-colors duration-300 font-semibold"
              onClick={() => window.location.href = "/#features"}
              size="lg"
            >
              <Star className="h-4 w-4" />
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm hover:border-white/40 transition-all duration-300 font-semibold"
              size="lg"
              onClick={() => window.open("https://gtsdb-admin.vercel.app/?apiUrl=https://gtsdb-web.abby.md/", "_blank")}
            >
              <Presentation className="h-4 w-4" />
              Admin Tool Demo
              <SquareArrowOutUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <p className="mt-6 text-sm text-blue-200/60 flex flex-wrap items-center gap-x-3 gap-y-1">
            <a href="https://hub.docker.com/r/abbychau/gtsdb" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-white transition-colors">
              <Container className="h-4 w-4" /> Docker
            </a>
            <span className="opacity-40">·</span>
            <a href="https://github.com/abbychau/gtsdb/releases" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-white transition-colors">
              <Download className="h-4 w-4" /> Binary
            </a>
            <span className="opacity-40">·</span>
            <span className="inline-flex items-center gap-1"><Monitor className="h-4 w-4" /> Windows</span>
            <span className="opacity-40">·</span>
            <span className="inline-flex items-center gap-1"><Terminal className="h-4 w-4" /> Linux / BSD</span>
            <span className="opacity-40">·</span>
            <span className="inline-flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path><path d="M10 2c1 .5 2 2 2 5"></path></svg> macOS</span>
          </p>
          <div className="mt-4">
            <a href="https://www.producthunt.com/posts/gtsdb?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-gtsdb" target="_blank" rel="noopener noreferrer"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=758497&theme=light" alt="GTSDB - Durable&#0032;and&#0032;Memory&#0032;Friendly&#0032;timeseries&#0032;database | Product Hunt" style={{width: 250, height: 54}} width="250" height="54" /></a>
          </div>
        </motion.div>

        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          onMouseMove={handleTiltMove}
          onMouseLeave={handleTiltLeave}
          style={{
            transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          <motion.div layoutId="hero-logo" className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-indigo-500/20 to-fuchsia-500/30 rounded-3xl blur-2xl scale-90" />
            <Image src={oldHamham} alt="GTSDB Illustration" className="w-full h-auto relative drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Typewriter subtitle ────────────────────────────────────────────
const PHRASES = [
  'for IoT and more.',
  '96M ops/sec · 6 MB memory · 29.6× compression.',
  'blazing fast, impossibly tiny.',
  'JSON in, JSON out.',
  'binary protocol ready.',
  'Gorilla-compressed storage.',
  'WAL-first architecture.',
  'deploy anywhere, run everywhere.',
]

function TypewriterText() {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = PHRASES[phraseIdx]
    const speed = deleting ? 35 : 60
    const pause = !deleting && charCount === phrase.length ? 2000 : deleting && charCount === 0 ? 400 : speed

    const timer = setTimeout(() => {
      if (!deleting && charCount === phrase.length) {
        setDeleting(true)
      } else if (deleting && charCount === 0) {
        setDeleting(false)
        setPhraseIdx((phraseIdx + 1) % PHRASES.length)
      } else {
        setCharCount(c => c + (deleting ? -1 : 1))
      }
    }, pause)

    return () => clearTimeout(timer)
  }, [charCount, deleting, phraseIdx])

  const phrase = PHRASES[phraseIdx]

  return (
    <p className="text-xl md:text-2xl text-slate-300 min-h-[4rem] leading-relaxed">
      <span className="text-green-400">T</span>ime
      <span className="text-green-400">S</span>eries{' '}
      <span className="text-green-400">D</span>ata
      <span className="text-green-400">B</span>ase{' '}
      <span className="text-base md:text-lg text-slate-400/60 italic font-light">that is…</span>
      <br />
      <span>{phrase.slice(0, charCount)}</span>
      <span className="inline-block w-0.5 h-5 bg-cyan-400 ml-0.5 animate-pulse align-middle" />
    </p>
  )
}

// ── Floating particle canvas ──────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = []

    const resize = () => {
      const parent = canvas.parentElement!
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(165,180,252,${p.alpha})`
        ctx.fill()
      }

      // Draw connection lines for nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(165,180,252,${0.06 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60" />
}

function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Key features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 max-w-5xl mx-auto">
          <div className="flex gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap h-6 w-6 mt-0.5 shrink-0 text-blue-500"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Blazing Fast</h3>
              <p className="text-sm text-gray-500 leading-relaxed">96M ops/sec multi-key read. 1.22M ops/sec batch write. Binary protocol + Velox JSON.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-leaf h-6 w-6 mt-0.5 shrink-0 text-green-500"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Memory Efficient</h3>
              <p className="text-sm text-gray-500 leading-relaxed">As low as 6 MB memory. Perfect for IoT edge devices.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code h-6 w-6 mt-0.5 shrink-0 text-purple-500"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Simple API</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Identical HTTP + TCP interfaces, all in strict JSON.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hard-drive h-6 w-6 mt-0.5 shrink-0 text-orange-500"><line x1="22" x2="2" y1="12" y2="12"></line><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" x2="6.01" y1="16" y2="16"></line><line x1="10" x2="10.01" y1="16" y2="16"></line></svg>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Gorilla Compression</h3>
              <p className="text-sm text-gray-500 leading-relaxed">29.6× smaller than JSON. Massive disk savings.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rss h-6 w-6 mt-0.5 shrink-0 text-red-500"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Built-in Streaming</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Subscribe to keys, receive updates in real-time.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield h-6 w-6 mt-0.5 shrink-0 text-teal-500"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Battle-Tested</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Production use by IoT pioneers. Full code coverage.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layers h-6 w-6 mt-0.5 shrink-0 text-indigo-500"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path></svg>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Batch Write</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Up to 10,000 points per call. Bulk imports.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up h-6 w-6 mt-0.5 shrink-0 text-pink-500"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Advanced Analytics</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Downsampling: avg, sum, min, max, p50, p95, p99.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity h-6 w-6 mt-0.5 shrink-0 text-cyan-500"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path></svg>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Monitoring Ready</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Built-in /health and /metrics (Prometheus) endpoints.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}




function EfficiencySection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">Why is GTSDB so efficient?</h2>
        <p className="text-center text-gray-500 text-sm mb-10">A deep dive into the architecture that makes GTSDB fast, small, and durable.</p>
        <article className="prose prose-gray prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
          <p>
            Most databases separate their write path and read path with layers of abstraction — a write-ahead log (WAL) for durability, a buffer pool for caching, and separate index structures for querying. Each layer adds latency and memory overhead. GTSDB takes a fundamentally different approach: <strong>the WAL is the database</strong>.
          </p>
          <p>
            Instead of maintaining a separate buffer pool and periodically flushing pages to disk, GTSDB appends every write directly to a per-key append-only file. There is no double-writing — data goes straight from the network socket to the WAL and into a ring buffer cache. This eliminates the memory amplification that comes from maintaining both a write buffer and a read cache. The ring buffer, configured per-key with up to 10,000 slots, serves recent reads directly from memory without any disk access. For a typical IoT workload where the latest readings matter most, virtually every read hits the cache.
          </p>
          <p>
            But the real performance breakthrough is in how GTSDB handles the read path. Traditional databases serialize query results into verbose JSON, with each data point carrying repeated field names like <code className="bg-gray-200 px-1 rounded text-sm">"timestamp"</code> and <code className="bg-gray-200 px-1 rounded text-sm">"value"</code>. At 5,000 points per query, this adds up to hundreds of kilobytes of redundant text. GTSDB introduces an optional binary protocol: each data point becomes a fixed 16-byte record — an 8-byte timestamp followed by an 8-byte IEEE 754 float. No parsing, no field name repetition, no reflection-based serialization overhead. The server writes raw bytes straight to the TCP socket; the client reads them back with zero allocation. On a multi-key read of 25,000 points, this alone takes the response time from 7 milliseconds down to 260 microseconds.
          </p>
          <p>
            The JSON path is no slouch either. GTSDB uses Velox, a Go JSON library backed by a native C VM, which outperforms the standard library by an order of magnitude and even beats SIMD-based alternatives like Sonic. For writes and non-bulk reads where JSON remains the default, Velox handles marshaling in nanoseconds per operation.
          </p>
          <p>
            Under the hood, a dirty-key async flusher ensures that only modified keys trigger disk syncs, avoiding the blanket fsync storms that plague append-only databases. When data does go to disk, Facebook's Gorilla time-series compression reduces storage by nearly 30x compared to raw JSON, making disk space a non-issue even on constrained edge devices.
          </p>
          <p>
            The architecture scales down as well as it scales up. At idle, GTSDB uses about 6 MB of memory — less than a single browser tab. It ships as a single statically-linked binary with no external dependencies. Deploy it on a Raspberry Pi, a cloud VM, or a Windows server; the behavior is identical. This is what makes GTSDB uniquely suited for IoT: it does not ask you to choose between durability, speed, and footprint. It gives you all three.
          </p>
        </article>
      </div>
    </section>
  )
}

function UsageSection() {
  return (
    <section id="usages" className="py-20 bg-gradient-to-t from-slate-400 to-slate-700 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <Code className="h-8 w-8 inline-block mr-2" />
          Usages</h2>
        <Tabs defaultValue="http" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
            <TabsTrigger value="http" className="text-lg"><Globe className="h-5 w-5 mr-2" /> HTTP API</TabsTrigger>
            <TabsTrigger value="tcp" className="text-lg">
              <Plug className="h-5 w-5 mr-2" />TCP Interface</TabsTrigger>
          </TabsList>
          <div className="mt-4">
            <TabsContent value="http">
              <Tabs defaultValue="write" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-4">
                  <TabsTrigger value="write">
                    <Pencil className="h-5 w-5 mr-2" />
                    Write</TabsTrigger>
                  <TabsTrigger value="read">
                    <Book className="h-5 w-5 mr-2" />
                    Read</TabsTrigger>
                  <TabsTrigger value="keys">
                    <Key className="h-5 w-5 mr-2" />
                    Get All Keys</TabsTrigger>
                  <TabsTrigger value="subscribe">
                    <Rss className="h-5 w-5 mr-2" />
                    Subscribe</TabsTrigger>
                  <TabsTrigger value="advanced">
                    <Zap className="h-5 w-5 mr-2" />
                    Advanced</TabsTrigger>
                </TabsList>
                <div className="mt-4 bg-gray-800 text-white p-6 rounded-lg overflow-x-auto">
                  <TabsContent value="write">
                    <pre className="text-sm">
                      <code>{`
POST /
{
    "operation": "write",
    "key": "a_sensor1",
    "write": {
        "value": 32242424243333333333.3333
    }
}
                      `}</code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="read">
                    <pre className="text-sm">
                      <code>{`
# Read with time range:
POST /
{
    "operation": "read",
    "key": "a_sensor1",
    "read": {
        "start_timestamp": 1717965210,
        "end_timestamp": 1717965211,
        "downsampling": 3
    }
}

# Read last X records:
POST /
{
    "operation": "read",
    "key": "a_sensor1",
    "read": {
        "lastx": 1
    }
}

# Binary read (16 bytes/point, zero-alloc):
POST /
{
    "operation": "read",
    "key": "a_sensor1",
    "read": { "lastx": 5000 },
    "response_format": "binary"
}

# Multi-read with time range:
POST /
{
    "operation": "multi-read",
    "keys": ["sensor1", "sensor2", "sensor3"],
    "read": {
        "start_timestamp": 1717965210,
        "end_timestamp": 1717965211,
        "downsampling": 3
    }
}

# Multi-read count-only (returns just counts):
POST /
{
    "operation": "multi-read",
    "keys": ["sensor1", "sensor2"],
    "read": { "lastx": 5000, "count_only": true }
}

# Multi-read binary:
POST /
{
    "operation": "multi-read",
    "keys": ["sensor1", "sensor2"],
    "read": { "lastx": 5000 },
    "response_format": "binary"
}
                      `}</code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="keys">
                    <pre className="text-sm">
                      <code>{`
POST /
{
    "operation": "ids"
}
                      `}</code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="subscribe">
                    <pre className="text-sm">
                      <code>{`
# Subscribe to a key
POST /
{
    "operation": "subscribe",
    "key": "sensor1"
}

# Unsubscribe from a key
POST /
{
    "operation": "unsubscribe",
    "key": "sensor1"
}
                      `}</code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="advanced">
                    <pre className="text-sm">
                      <code>{`
# Authenticate (required before any operation):
POST /
{
    "operation": "auth",
    "key": "your-token-here"
}

# Batch write (up to 10,000 points):
POST /
{
    "operation": "batch-write",
    "points": [
        {"key": "sensor1", "value": 42.5, "timestamp": 1717965210},
        {"key": "sensor2", "value": 99.9, "timestamp": 1717965210}
    ]
}

# Export data as CSV:
POST /
{
    "operation": "export",
    "key": "sensor1",
    "export": { "format": "csv", "lastx": 100 }
}

# Compact key to reclaim disk space:
POST /
{
    "operation": "compact",
    "key": "sensor1"
}

# Server info with memory & uptime stats:
POST /
{
    "operation": "serverinfo"
}

# Health check (no auth required):
GET /health

# Prometheus metrics (no auth required):
GET /metrics

# Key management:
POST / { "operation": "initkey", "key": "new_sensor" }
POST / { "operation": "renamekey", "key": "old", "toKey": "new" }
POST / { "operation": "deletekey", "key": "sensor_to_delete" }

# Patch data points (CSV or JSON):
POST /
{
    "operation": "data-patch",
    "key": "sensor1",
    "data": "1717965210,123.45\\n1717965211,123.46"
}
                      `}</code>
                    </pre>
                  </TabsContent>
                </div>
              </Tabs>
            </TabsContent>
            <TabsContent value="tcp">
              <Tabs defaultValue="write" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-4">
                  <TabsTrigger value="write">
                    <Pencil className="h-5 w-5 mr-2" />
                    Write</TabsTrigger>
                  <TabsTrigger value="read">
                    <Book className="h-5 w-5 mr-2" />
                    Read</TabsTrigger>
                  <TabsTrigger value="keys">
                    <Key className="h-5 w-5 mr-2" />
                    Get All Keys</TabsTrigger>
                  <TabsTrigger value="subscribe">
                    <Rss className="h-5 w-5 mr-2" />
                    Subscribe</TabsTrigger>
                </TabsList>
                <div className="mt-4 bg-gray-800 text-white p-6 rounded-lg overflow-x-auto">
                  <TabsContent value="write">
                    <pre className="text-sm">
                      <code>{`
{
    "operation": "write",
    "key": "a_sensor1",
    "write": {
        "value": 32242424243333333333.3333,
        "timestamp": 1617965210
    }
}
                      `}</code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="read">
                    <pre className="text-sm">
                      <code>{`
{
    "operation": "read",
    "key": "a_sensor1",
    "read": { // optional
        "startTime": 1617965210,
        "endTime": 1617965211,
        "downsample": 3,
        "aggregation": "avg"
    }
}

# Or read last X records:
{
    "operation": "read",
    "key": "a_sensor1",
    "read": {
        "lastx": 1
    }
}
                      `}</code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="keys">
                    <pre className="text-sm">
                      <code>{`
{
    "operation": "ids"
}
                      `}</code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="subscribe">
                    <pre className="text-sm">
                      <code>{`
# Subscribe to a key
{
  "operation": "subscribe",
  "key": "sensor1"
}

# Unsubscribe from a key
{
  "operation": "unsubscribe",
  "key": "sensor1"
}
                      `}</code>
                    </pre>
                  </TabsContent>
                </div>
              </Tabs>
            </TabsContent>
          </div>
        </Tabs>

        {/* Add this new section below the tabs */}
        <div className="mt-12 text-center">
          <p className="text-lg mb-4">Need more details? Check out our complete API documentation.</p>
          <Link
            href="/Documentation"
            className="inline-flex items-center px-6 py-3 bg-white text-gray-800 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            <Book className="h-5 w-5 mr-2" />
            View Full API Documentation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function PerformanceSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  const writeData = [
    { db: "GTSDB", milliseconds: rd(bm.write.gtsdb) },
    { db: "VictoriaMetrics", milliseconds: rd(bm.write.vm) },
    { db: "InfluxDB", milliseconds: rd(bm.write.influxdb) }
  ]

  const batchWriteData = [
    { db: "GTSDB", milliseconds: rd(bm.batchWrite.gtsdb) },
    { db: "VictoriaMetrics", milliseconds: rd(bm.batchWrite.vm) },
    { db: "InfluxDB", milliseconds: rd(bm.batchWrite.influxdb) }
  ]

  const pipelineData = [
    { db: "GTSDB", milliseconds: rd(bm.pipeline.gtsdb) },
    { db: "VictoriaMetrics", milliseconds: rd(bm.pipeline.vm) },
    { db: "InfluxDB", milliseconds: rd(bm.pipeline.influxdb) }
  ]

  const multiWriteData = [
    { db: "GTSDB", milliseconds: rd(bm.multiWrite.gtsdb) },
    { db: "VictoriaMetrics", milliseconds: rd(bm.multiWrite.vm) },
    { db: "InfluxDB", milliseconds: rd(bm.multiWrite.influxdb) }
  ]

  const readData = [
    { db: "GTSDB", milliseconds: rd(bm.read.gtsdb) },
    { db: "VictoriaMetrics", milliseconds: rd(bm.read.vm) },
    { db: "InfluxDB", milliseconds: rd(bm.read.influxdb) }
  ]

  const readManyData = [
    { db: "GTSDB", milliseconds: rd(bm.readMany.gtsdb) },
    { db: "VictoriaMetrics", milliseconds: rd(bm.readMany.vm) },
    { db: "InfluxDB", milliseconds: rd(bm.readMany.influxdb) }
  ]

  const pubsubData = [
    { db: "GTSDB", seconds: rd(bm.pubsub.gtsdb) },
    { db: "NSQ", seconds: rd(bm.pubsub.nsq) }
  ]

  const compressionData = [
    { db: "GTSDB (Gorilla)", kilobytes: 9.8 },
    { db: "GTSDB (Raw)", kilobytes: 78.1 },
    { db: "MySQL (w/ idx)", kilobytes: 280 },
    { db: "JSON (w/o idx)", kilobytes: 290 }
  ]

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const BarChartComponent = ({ data, title, unit }: { data: { db: string, milliseconds?: number, seconds?: number, kilobytes?: number }[], title: string, unit?: string }) => (
    <div className="h-[250px]">
      <h4 className="text-lg font-medium mb-4 text-center">{title}</h4>
      <ResponsiveBar
        data={data}
        keys={['milliseconds', 'seconds', 'kilobytes']}
        indexBy="db"
        margin={{ top: 20, right: 20, bottom: 80, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={({ data }) => {
          if (data.db.includes('GTSDB')) return '#3B82F6'
          if (data.db.includes('VictoriaMetrics')) return '#10B981'
          if (data.db.includes('NSQ')) return '#F59E0B'
          return '#94A3B8'
        }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        axisLeft={{
          tickSize: 1,
          tickValues: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: unit || 'Time (ms)',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        labelFormat={value => {
          const n = Number(value)
          if (n < 1 && n > 0) return n.toFixed(3) + (unit || 'ms')
          return n.toFixed(2) + (unit || 'ms')
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
      />
    </div>
  )

  return (
    <section id="performance" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <Timer className="h-8 w-8 inline-block mr-2" />
          Performance Comparison
        </h2>
        <div className="mb-8 text-center text-sm text-gray-500">
          Benchmarked against VictoriaMetrics v1.147, InfluxDB v2.9, and NSQ v1.3 on Windows / i7-13700KF / 5,000 points per operation. Reads use binary protocol.
        </div>
        <motion.div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Write Benchmarks</h3>
            <div className="space-y-8">
              <BarChartComponent data={writeData} title="Write (seq) – 5,000 pts" />
              <BarChartComponent data={batchWriteData} title="Batch Write – 5,000 pts" />
              <BarChartComponent data={pipelineData} title="Pipeline Write – 5,000 pts" />
              <BarChartComponent data={multiWriteData} title="Multi-Sensor Write – 5 keys × 1,000 pts" />
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Read Benchmarks</h3>
            <div className="space-y-8">
              <BarChartComponent data={readData} title="Single Read – Last 1 Point" />
              <BarChartComponent data={readManyData} title="Multi-Key Read – 5 Keys × 5,000 pts" />
              <BarChartComponent 
                data={pubsubData.map(d => ({ ...d, seconds: Number(d.seconds.toFixed(3)) }))} 
                title="Pub/Sub Delivery Latency (s)" 
                unit="s"
              />
              <BarChartComponent 
                data={compressionData} 
                title="Storage per 5,000 points (KB)" 
                unit="KB"
              />
            </div>
          </div>
        </motion.div>
        {/* Resource Usage Charts */}
        <div className="mt-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-center">Resource Usage</h3>
            <ResourceCharts />
          </div>
        </div>
        <div className="mt-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-center">Benchmark Report Charts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <LightboxImage src="/charts/radar.png" alt="Radar Chart" width={400} height={400} />
                <p className="mt-2 text-sm text-gray-500">Performance Radar</p>
              </div>
              <div className="text-center">
                <LightboxImage src="/charts/ops_per_sec.png" alt="Ops/Sec" width={400} height={400} />
                <p className="mt-2 text-sm text-gray-500">Throughput (ops/sec)</p>
              </div>
              <div className="text-center">
                <LightboxImage src="/charts/resource_usage.png" alt="Resource Usage" width={400} height={400} />
                <p className="mt-2 text-sm text-gray-500">Resource Usage</p>
              </div>
              <div className="text-center">
                <LightboxImage src="/charts/write_latency.png" alt="Write Latency" width={400} height={400} />
                <p className="mt-2 text-sm text-gray-500">Write Latency</p>
              </div>
              <div className="text-center">
                <LightboxImage src="/charts/batch_comparison.png" alt="Batch Write" width={400} height={400} />
                <p className="mt-2 text-sm text-gray-500">Batch Write Comparison</p>
              </div>
              <div className="text-center">
                <LightboxImage src="/charts/pipeline.png" alt="Pipeline Write" width={400} height={400} />
                <p className="mt-2 text-sm text-gray-500">Pipeline Write</p>
              </div>
              <div className="text-center">
                <LightboxImage src="/charts/read_comparison.png" alt="Read Comparison" width={400} height={400} />
                <p className="mt-2 text-sm text-gray-500">Read Comparison</p>
              </div>
              <div className="text-center">
                <LightboxImage src="/charts/multi_write.png" alt="Multi Write" width={400} height={400} />
                <p className="mt-2 text-sm text-gray-500">Multi-Sensor Write</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <a
                href="https://github.com/abbychau/gtsdb-benchmark"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Github className="h-5 w-5 mr-2" />
                View Full Benchmark Repository
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Test Configuration</h3>
            <div className="space-y-6">
              <table className="min-w-full bg-white border border-gray-200 text-sm">
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">Points per Operation</td>
                    <td className="py-2 px-4 border-b font-bold">5,000</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Sensors (multi-write)</td>
                    <td className="py-2 px-4 border-b font-bold">5</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Runs per Benchmark</td>
                    <td className="py-2 px-4 border-b font-bold">3</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Warmup Iterations</td>
                    <td className="py-2 px-4 border-b font-bold">300</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">GTSDB JSON Library</td>
                    <td className="py-2 px-4 border-b font-bold">Velox (native C VM backend)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">GTSDB Cache Size</td>
                    <td className="py-2 px-4 border-b font-bold">10,000 ring buffer / key</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Sync Mode</td>
                    <td className="py-2 px-4 border-b font-bold">async (dirty-key flusher) <br /> (p.s. sync mode also available, and our clients love it :p)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">OS</td>
                    <td className="py-2 px-4 border-b font-bold">Windows</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Architecture</td>
                    <td className="py-2 px-4 border-b font-bold">amd64</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">CPU</td>
                    <td className="py-2 px-4 border-b font-bold">Core(TM) i7-13700KF</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Key Takeaways</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="text-lg font-bold mb-2 text-blue-800">vs InfluxDB</h4>
              <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
                <li><strong>{bm.ratios.writeVsInflux}x faster</strong> sequential write ({rd(bm.write.gtsdb)} ms vs {rd(bm.write.influxdb)} ms)</li>
                <li><strong>{bm.ratios.pipelineVsInflux}x faster</strong> pipeline write ({rd(bm.pipeline.gtsdb)} ms vs {rd(bm.pipeline.influxdb)} ms)</li>
                <li><strong>{bm.ratios.batchVsInflux}x faster</strong> batch write ({rd(bm.batchWrite.gtsdb)} ms vs {rd(bm.batchWrite.influxdb)} ms)</li>
                <li><strong>{bm.ratios.multiWriteVsInflux}x faster</strong> multi-sensor write ({rd(bm.multiWrite.gtsdb)} ms vs {rd(bm.multiWrite.influxdb)} ms)</li>
                <li><strong>{bm.ratios.readVsInflux}x faster</strong> single read (&lt;{rd(bm.read.gtsdb)} ms vs {rd(bm.read.influxdb)} ms)</li>
                <li><strong>{bm.ratios.readManyVsInflux}x faster</strong> multi-key read ({rd(bm.readMany.gtsdb)} ms vs {rd(bm.readMany.influxdb)} ms)</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <h4 className="text-lg font-bold mb-2 text-green-800">vs VictoriaMetrics</h4>
              <ul className="list-disc list-inside space-y-1 text-green-700 text-sm">
                <li><strong>{bm.ratios.writeVsVM}x faster</strong> sequential write ({rd(bm.write.gtsdb)} ms vs {rd(bm.write.vm)} ms)</li>
                <li><strong>{bm.ratios.pipelineVsVM}x faster</strong> pipeline write ({rd(bm.pipeline.gtsdb)} ms vs {rd(bm.pipeline.vm)} ms)</li>
                <li>{bm.ratios.readManyVsVM >= 1 ? <><strong>{bm.ratios.readManyVsVM}x faster</strong> multi-key read ({rd(bm.readMany.gtsdb)} ms vs {rd(bm.readMany.vm)} ms) 🏆</> : <>VM leads multi-key read (<strong>{bm.ratios.readManyVsVM}x</strong>)</>}</li>
                <li>{bm.ratios.readVsVM >= 1 ? <><strong>{bm.ratios.readVsVM}x faster</strong> single read ({rd(bm.read.gtsdb)} ms vs {rd(bm.read.vm)} ms) 🏆</> : <>VM leads single read (<strong>{bm.ratios.readVsVM}x</strong>)</>}</li>
                <li>VM leads batch write (<strong>{bm.ratios.batchVsVM}x</strong>) and multi-write (<strong>{bm.ratios.multiWriteVsVM}x</strong>)</li>
              </ul>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg mb-4">
              <h4 className="text-lg font-bold mb-2 text-amber-800">General</h4>
              <ul className="list-disc list-inside space-y-1 text-amber-700 text-sm">
                <li>JSON: <strong>Velox native C VM</strong> + <strong>binary protocol</strong> for reads</li>
                <li>Binary protocol: 16 bytes/point, zero-alloc encode/decode</li>
                <li>Multi-Key Read: <strong>{Math.round(5000 / (bm.readMany.gtsdb / 1000)).toLocaleString()} ops/sec</strong> – faster than VM</li>
                <li>Pub/Sub: <strong>{rd(bm.pubsub.gtsdb * 1000)} ms</strong> delivery latency</li>
                <li><strong>{(5000 / (bm.batchWrite.gtsdb / 1000)).toLocaleString(undefined, {maximumFractionDigits: 0})} ops/sec</strong> batch write, <strong>{(5000 / (bm.multiWrite.gtsdb / 1000)).toLocaleString(undefined, {maximumFractionDigits: 0})} ops/sec</strong> multi-write</li>
                <li><strong>29.6x smaller</strong> than raw JSON with Gorilla compression</li>
                <li>Only <strong>~12 MB</strong> memory usage at idle</li>
                <li>Single <strong>binary executable</strong> – no dependencies</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <a
                href="https://github.com/abbychau/gtsdb-benchmark"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Github className="h-5 w-5 mr-2" />
                View Benchmark Repository
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>



      </div>
    </section>
  )
}

function ResourceCharts() {
  const res = (bm as any).resources || {}
  const cpuData = [
    { db: "GTSDB", seconds: res['GTSDB']?.cpu_sec || 0 },
    { db: "VictoriaMetrics", seconds: res['VM']?.cpu_sec || 0 },
    { db: "InfluxDB", seconds: res['InfluxDB']?.cpu_sec || 0 },
  ]
  const memData = [
    { db: "GTSDB", milliseconds: res['GTSDB']?.memory_mb || 0 },
    { db: "VictoriaMetrics", milliseconds: res['VM']?.memory_mb || 0 },
    { db: "InfluxDB", milliseconds: res['InfluxDB']?.memory_mb || 0 },
  ]
  const diskData = [
    { db: "GTSDB", milliseconds: res['GTSDB']?.disk_kb || 0 },
    { db: "VictoriaMetrics", milliseconds: res['VM']?.disk_kb || 0 },
    { db: "InfluxDB", milliseconds: res['InfluxDB']?.disk_kb || 0 },
  ]

  const ResChart = ({ data, title, unit }: { data: { db: string, milliseconds?: number, seconds?: number }[], title: string, unit: string }) => (
    <div className="h-[250px]">
      <h4 className="text-lg font-medium mb-4 text-center">{title}</h4>
      <ResponsiveBar
        data={data}
        keys={['milliseconds', 'seconds']}
        indexBy="db"
        margin={{ top: 20, right: 20, bottom: 80, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={({ data }: { data: { db: string } }) => {
          if (data.db.includes('GTSDB')) return '#3B82F6'
          if (data.db.includes('VictoriaMetrics')) return '#10B981'
          return '#94A3B8'
        }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        axisLeft={{ tickSize: 1, tickValues: 5, tickPadding: 5, tickRotation: 0, legend: unit, legendPosition: 'middle', legendOffset: -40 }}
        axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
        labelFormat={value => `${Number(value).toFixed(1)} ${unit}`}
        labelSkipWidth={12}
        labelSkipHeight={12}
      />
    </div>
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <ResChart data={cpuData} title="CPU Time (s)" unit="s" />
      <ResChart data={memData} title="Memory (MB)" unit="MB" />
      <ResChart data={diskData} title="Disk (KB)" unit="KB" />
    </div>
  )
}


function DriversSection() {
  return (
    <section id="drivers" className="py-20 bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">
          <Terminal className="h-8 w-8 inline-block mr-2" />
          Client Drivers
        </h2>
        <p className="text-center text-gray-500 mb-12">First-class Go & Node.js clients with JSON and binary protocol support</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Go Driver */}
          <div className="bg-white p-8 shadow-lg border-t-4 border-b-4 border-blue-500">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-blue-600 mr-3">Go</span>
              <span className="text-sm text-gray-400 bg-gray-100 px-2 py-1 rounded">v0.1.0</span>
            </div>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto mb-4">
              <code>{`go get github.com/abbychau/gtsdb-drivers/go@latest`}</code>
            </pre>
            <pre className="bg-gray-900 text-gray-300 p-4 rounded-lg text-xs overflow-x-auto mb-4">
              <code>{`import "github.com/abbychau/gtsdb-drivers/go"

client, _ := gtsdb.Connect("localhost:5555")
client.Auth("your-token")

// JSON
client.Write("sensor1", 42.5)
pts, _ := client.ReadLast("sensor1", 100)

// 🚀 Binary – 100x faster
pts, _ := client.ReadBinary("sensor1", 5000)
multi, _ := client.MultiReadBinary(
    []string{"s1","s2"}, 5000,
)`}</code>
            </pre>
            <a href="https://github.com/abbychau/gtsdb-drivers/tree/main/go" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
              <Github className="h-4 w-4 mr-1" /> Go driver + docs
            </a>
          </div>

          {/* JS Driver */}
          <div className="bg-white p-8 shadow-lg border-t-4 border-b-4 border-yellow-500">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-yellow-600 mr-3">Node.js</span>
              <span className="text-sm text-gray-400 bg-gray-100 px-2 py-1 rounded">v0.1.0</span>
            </div>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto mb-4">
              <code>{`npm install github:abbychau/gtsdb-drivers`}</code>
            </pre>
            <pre className="bg-gray-900 text-gray-300 p-4 rounded-lg text-xs overflow-x-auto mb-4">
              <code>{`const { GTSDBClient } = require('gtsdb-drivers')
const c = new GTSDBClient('localhost', 5555)
await c.connect()
await c.auth('your-token')

// JSON
await c.write('sensor1', 42.5)
const pts = await c.readLast('sensor1', 100)

// 🚀 Binary – 100x faster
const pts = await c.readBinary('sensor1', 5000)
const multi = await c.multiReadBinary(
  ['s1','s2'], 5000
)`}</code>
            </pre>
            <a href="https://github.com/abbychau/gtsdb-drivers/tree/main/js" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
              <Github className="h-4 w-4 mr-1" /> JS driver + docs
            </a>
          </div>
        </div>

        <div className="text-center mt-8">
          <a href="https://github.com/abbychau/gtsdb-drivers" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <Github className="h-5 w-5 mr-2" />
            Full driver repository (API reference, examples, tests)
          </a>
        </div>
      </div>
    </section>
  )
}





function TrustedBySection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Trusted By</h2>
        <div className="flex flex-wrap justify-center items-center space-x-8">
          <Image src={controlfree} alt="ControlFree" height={45} className="w-auto mb-4" />
          <Image src={vertriqe} alt="Vertriqe" height={45} className="w-auto mb-4" />
          <Image src={samdasoo} alt="Jeju Samdasoo" height={45} className="w-auto mb-4" />
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section id="CTA" className="py-20 text-white bg-gradient-to-r from-slate-800 to-indigo-700">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
        <Link className={buttonVariants({ variant: "outline" }) + "bg-white text-blue-900 hover:text-blue-800 font-semibold"} href="https://github.com/abbychau/gtsdb/releases" target='_blank'>
          Download GTSDB
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>

      </div>
    </section>
  )
}

