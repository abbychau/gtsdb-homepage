/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Github, Globe, Download, Pencil, Book, Key, Rss, Timer, Presentation, Star, Plug, SquareArrowOutUpRight, Terminal, Zap, Monitor, Container, Copy, Check, ChevronDown, Apple } from 'lucide-react'

import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import oldHamham from './oldHamham.png'
import adminScreenshot from './admin-screenshot.png'
import controlfree from './control-free.png' // control-free, a company that provides a wide range of services, mostly in the IoT sector.
import vertriqe from './vertriqe.png' // vertriqe, a company that provides a wide range of services, including IoT, AI, and more.
import samdasoo from './samdasoo.png' // jeju samdasoo, enormous drinking water company from korea. famous for its volcanic water, selling around the world, loved by health-conscious people.
import Link from 'next/link'
import { ResponsiveBar } from "@nivo/bar"
import { ResponsiveLine } from "@nivo/line"
import Footer from '@/components/Footer'
import { LightboxImage } from '@/components/Lightbox'
import bm from '@/lib/benchmark-data.json'
import { Separator } from '@/components/ui/separator'

const rd = (n: number) => Math.round(n * 100) / 100

const NAV_SECTIONS = [
  { id: 'features', label: 'Key Features' },
  { id: 'usages', label: 'Usages' },
  { id: 'performance', label: 'Performance' },
]

function useScrollSpy(sectionIds: string[]) {
  const [activeId, setActiveId] = useState('')
  const hasScrolled = useRef(false)
  useEffect(() => {
    const onScroll = () => { hasScrolled.current = true }
    window.addEventListener('scroll', onScroll, { passive: true })
    const obs = new IntersectionObserver(
      (entries) => {
        if (!hasScrolled.current) return
        for (const e of entries) {
          if (e.isIntersecting) { setActiveId(e.target.id); break }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )
    const els = sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    els.forEach(el => obs.observe(el))
    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll) }
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
        ? 'text-white'
        : 'text-slate-300 hover:text-white'
    }`

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-2xl bg-slate-950/95 shadow-[0_4px_20px_rgba(0,0,0,0.4)] py-0'
          : 'backdrop-blur-xl bg-gradient-to-r from-slate-900/90 via-indigo-900/85 to-slate-900/90 py-1'
      } border-b-0`}>
        {/* Fancy gradient bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white/60 via-indigo-400/60 to-fuchsia-500/60" />

        <div className={`container mx-auto px-4 flex justify-between items-center relative transition-all duration-500 ${scrolled ? 'py-2' : 'py-1'}`}>
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0 group">
            <AnimatePresence initial={false}>
              {scrolled && (
                <motion.span
                  key="scrolled-logo"
                  className="block shrink-0 overflow-hidden"
                  initial={{ width: 0, opacity: 0, marginRight: 0 }}
                  animate={{ width: 36, opacity: 1, marginRight: 0 }}
                  exit={{ width: 0, opacity: 0, marginRight: 0 }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                >
                  <motion.div layoutId="hero-logo">
                    <Image src={oldHamham} alt="GTSDB Logo" className="w-9" />
                  </motion.div>
                </motion.span>
              )}
            </AnimatePresence>
            <h1 className={`font-bold transition-all duration-500 text-2xl text-white`}>
              GTSDB
              <span className={`hidden sm:inline transition-all duration-300 text-sm ml-1`}>
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
                  <motion.div layoutId="nav-underline" className="absolute bottom-0 left-3 right-3 h-0.5 bg-white rounded-lg" transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
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
            <span className={`w-6 h-0.5 bg-white rounded-lg transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
            <span className={`w-6 h-0.5 bg-white rounded-lg transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white rounded-lg transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
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
                  activeSection === s.id ? 'bg-indigo-500/20 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
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
        <WhyNotRustSection />
        <UsageSection />
        <DriversSection />
        <PerformanceSection />
        <AdminToolSection />
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
      {/* Animated floating orbs - parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/20 rounded-lg blur-3xl animate-[float_8s_ease-in-out_infinite]"
          style={{ transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)` }} />
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-fuchsia-500/15 rounded-lg blur-3xl animate-[float_10s_ease-in-out_infinite_1s]"
          style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }} />
        <div className="absolute -bottom-20 right-1/3 w-72 h-72 bg-indigo-500/20 rounded-lg blur-3xl animate-[float_7s_ease-in-out_infinite_2s]"
          style={{ transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)` }} />
        <div className="absolute top-1/4 left-1/2 w-64 h-64 bg-violet-500/10 rounded-lg blur-3xl animate-[float_9s_ease-in-out_infinite_3s]"
          style={{ transform: `translate(${mousePos.x * 15}px, ${mousePos.y * -15}px)` }} />
      </div>
      {/* Grid overlay with parallax */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none"
        style={{ transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)` }} />
      {/* Radial glow at center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-indigo-500/10 via-transparent to-transparent rounded-lg blur-2xl pointer-events-none" />
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
            <span
              className="bg-gradient-to-r "
            >
              GTSDB
            </span>
            <br />
            <span
              className="bg-gradient-to-r from-slate-300 via-slate-500 to-slate-300 
              bg-clip-text text-transparent"
            >
              <span className="text-red-400">G</span>olang{' '}
              <span className="text-red-400">T</span>ime{' '}
              <span className="text-red-400">S</span>eries{' '}
              <span className="text-red-400">D</span>ata{}
              <span className="text-red-400">B</span>ase
            </span>
          </h1>

          <TypewriterText />


          <div className="mt-5 text-md text-blue-200/60 flex flex-wrap items-center 
          gap-x-3 gap-y-1 border-2 border-blue-200/20 rounded-lg px-4 py-2
          w-fit
          ">
            <a href="https://hub.docker.com/r/abbychau/gtsdb" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white transition-colors text-base">
              <Container className="h-5 w-5" /> Docker
            </a>
            <Separator className="h-4 w-px bg-white/20" orientation="vertical" />
            <a href="https://github.com/abbychau/gtsdb/releases" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white transition-colors text-base">
              <Download className="h-5 w-5" /> Multi-Platform Binary
            </a>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              href="https://github.com/abbychau/gtsdb/blob/main/README.md"
              target="_blank"
              className="
              inline-flex items-center justify-center gap-3 rounded-[10px] bg-white
              border-1 border-green-100 px-7 py-[14px] text-base font-semibold
              "
            >
              <span className="text-gray-900 font-mono text-xl">README.md</span>
              <SquareArrowOutUpRight className="h-5 w-5 text-gray-500 text-md" />
            </Link>
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
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-indigo-500/20 to-fuchsia-500/30 rounded-3xl blur-2xl scale-90" />
            <Image src={oldHamham} alt="GTSDB Illustration" className="w-full h-auto relative drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const PHRASES = [
  'for IoT and more.',
  '96M ops/sec at 20MB memory.',
  '12MB.',
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
      <span className="text-base md:text-lg text-slate-400/60 italic font-light">that is</span>
      <br />
      <span>{phrase.slice(0, charCount)}</span>
      <span className="inline-block w-0.5 h-5 bg-white ml-0.5 animate-pulse align-middle" />
    </p>
  )
}

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
              <p className="text-sm text-gray-500 leading-relaxed">29.6x smaller than JSON. Massive disk savings.</p>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity h-6 w-6 mt-0.5 shrink-0 text-slate-500"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path></svg>
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
            Most databases separate their write path and read path with layers of abstraction - a write-ahead log (WAL) for durability, a buffer pool for caching, and separate index structures for querying. Each layer adds latency and memory overhead. GTSDB takes a fundamentally different approach: <strong>the WAL is the database</strong>.
          </p>
          <p>
            Instead of maintaining a separate buffer pool and periodically flushing pages to disk, GTSDB appends every write directly to a per-key append-only file. There is no double-writing - data goes straight from the network socket to the WAL and into a ring buffer cache. This eliminates the memory amplification that comes from maintaining both a write buffer and a read cache. The ring buffer, configured per-key with up to 10,000 slots, serves recent reads directly from memory without any disk access. For a typical IoT workload where the latest readings matter most, virtually every read hits the cache.
          </p>
          <p>
            But the real performance breakthrough is in how GTSDB handles the read path. Traditional databases serialize query results into verbose JSON, with each data point carrying repeated field names like <code className="bg-gray-200 px-1 rounded text-sm">"timestamp"</code> and <code className="bg-gray-200 px-1 rounded text-sm">"value"</code>. At 5,000 points per query, this adds up to hundreds of kilobytes of redundant text. GTSDB introduces an optional binary protocol: each data point becomes a fixed 16-byte record - an 8-byte timestamp followed by an 8-byte IEEE 754 float. No parsing, no field name repetition, no reflection-based serialization overhead. The server writes raw bytes straight to the TCP socket; the client reads them back with zero allocation. On a multi-key read of 25,000 points, this alone takes the response time from 7 milliseconds down to 260 microseconds.
          </p>
          <p>
            The JSON path is no slouch either. GTSDB uses Velox, a Go JSON library backed by a native C VM, which outperforms the standard library by an order of magnitude and even beats SIMD-based alternatives like Sonic. For writes and non-bulk reads where JSON remains the default, Velox handles marshaling in nanoseconds per operation.
          </p>
          <p>
            Under the hood, a dirty-key async flusher ensures that only modified keys trigger disk syncs, avoiding the blanket fsync storms that plague append-only databases. When data does go to disk, Facebook's Gorilla time-series compression reduces storage by nearly 30x compared to raw JSON, making disk space a non-issue even on constrained edge devices.
          </p>
          <p>
            The architecture scales down as well as it scales up. At idle, GTSDB uses about 6 MB of memory - less than a single browser tab. It ships as a single statically-linked binary with no external dependencies. Deploy it on a Raspberry Pi, a cloud VM, or a Windows server; the behavior is identical. This is what makes GTSDB uniquely suited for IoT: it does not ask you to choose between durability, speed, and footprint. It gives you all three.
          </p>
        </article>
      </div>
    </section>
  )
}

function MemoryOverTimeChart() {
  const gtsdbArr = bm.memoryOverTime.gtsdb as { t: number; alloc_mb: number; sys_mb: number }[]

  const data = [
    {
      id: 'GTSDB Sys (stable OS mem)',
      color: '#3b82f6',
      data: gtsdbArr.map(d => ({ x: d.t, y: Number(d.sys_mb.toFixed(1)) })),
    },
    {
      id: 'GTSDB Go heap alloc',
      color: '#10b981',
      data: gtsdbArr.map(d => ({ x: d.t, y: Number(d.alloc_mb.toFixed(1)) })),
    },
  ]

  return (
    <div className="h-64">
      <ResponsiveLine
        data={data}
        margin={{ top: 20, right: 20, bottom: 40, left: 56 }}
        xScale={{ type: 'linear', min: 0, max: 30 }}
        yScale={{ type: 'linear', min: 0, max: 20 }}
        curve="monotoneX"
        lineWidth={2}
        enablePoints={false}
        useMesh={true}
        enableSlices="x"
        colors={{ datum: 'color' }}
        theme={{
          axis: {
            ticks: { text: { fontSize: 11, fill: '#9ca3af' } },
            legend: { text: { fontSize: 11, fill: '#6b7280', fontWeight: '600' } },
          },
          grid: { line: { stroke: '#e5e7eb', strokeWidth: 1, strokeDasharray: '4 4' } },
          legends: { text: { fontSize: 11, fill: '#374151' } },
          crosshair: { line: { stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '2 2' } },
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 8,
          tickValues: 5,
          format: v => v.toFixed(1),
          legend: 'Memory (MB)',
          legendPosition: 'middle',
          legendOffset: -42,
        }}
        axisBottom={{
          tickSize: 0,
          tickPadding: 8,
          tickValues: 7,
          format: v => `${v}s`,
          legend: 'Time',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        enableGridX={false}
        legends={[
          {
            anchor: 'top-right',
            direction: 'column',
            justify: false,
            translateX: 0,
            translateY: 0,
            itemsSpacing: 4,
            itemDirection: 'left-to-right',
            itemWidth: 180,
            itemHeight: 18,
            symbolSize: 12,
            symbolShape: 'circle',
          },
        ]}
        tooltip={({ point }) => (
          <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-100 text-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: point.serieColor }} />
              <span className="font-semibold text-gray-700">{point.serieId}</span>
            </div>
            <span className="text-gray-500">t={point.data.xFormatted} &middot; {point.data.yFormatted} MB</span>
          </div>
        )}
      />
    </div>
  )
}

function WhyNotRustSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">
          Why not Rust?
        </h2>
        <p className="text-center text-gray-500 text-sm mb-10">
          A pragmatic look at language choice given GTSDB&apos;s architecture.
        </p>
        <article className="prose prose-gray prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
          <p>
            Let&apos;s address the elephant in the room. Rust has become <em>the</em> darling of systems
            programming in the AI era—rewritten tools like <code className="bg-gray-200 px-1 rounded text-sm">uv</code>,
            <code className="bg-gray-200 px-1 rounded text-sm">ruff</code>, <code className="bg-gray-200 px-1 rounded text-sm">polars</code>,
            and <code className="bg-gray-200 px-1 rounded text-sm">tokenizers</code> dominate headlines, and
            every week a new database or framework announces a Rust rewrite promising 10x speed. The hype is
            real, and for many projects the praise is well-earned.
          </p>
          <p>
            So why did GTSDB choose Go? Rust&apos;s safety guarantees are genuinely valuable—but they come
            with a cost, and not every architecture needs them equally. GTSDB&apos;s design makes Go the
            better fit for several reasons.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8">1. Minimal GC pressure</h3>
          <p>
            GTSDB&apos;s WAL-first architecture deliberately avoids heap churn. Data flows from the network
            socket into a <strong>pre-allocated ring buffer</strong> (fixed-size, one per key) and gets appended
            straight to a file. There are no complex object graphs, no reference cycles, no generational heap
            promotions—just a simple, predictable data path. The Go garbage collector has almost nothing to do.
            At idle, the process sits at ~6 MB with zero GC cycles firing. Rust&apos;s ownership model solves
            a problem that barely exists here.
          </p>

          <div className="my-8 mx-auto max-w-xl">
            <MemoryOverTimeChart />
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-8">2. Goroutines map directly to the problem</h3>
          <p>
            GTSDB runs two concurrent servers (HTTP + TCP), a pub/sub fanout system, and an async dirty-key
            flusher. All of these are textbook goroutine + channel patterns. Go&apos;s runtime multiplexes them
            onto OS threads with <code className="bg-gray-200 px-1 rounded text-sm">GOMAXPROCS</code>;
            the developer just writes straight-line code. Rust&apos;s async model requires picking an executor
            (tokio, smol, async-std), annotating lifetimes through async boundaries, and managing
            <code className="bg-gray-200 px-1 rounded text-sm">Send + Sync</code> bounds across every
            <code className="bg-gray-200 px-1 rounded text-sm">.await</code> point. For an architecture
            that is fundamentally a linear pipeline (read → cache → write), the extra ceremony buys nothing.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8">3. Code review matters</h3>
          <p>
            This is the practical one. GTSDB is a focused project—its hot paths are short and simple. A
            Go PR is typically a few dozen lines around a well-understood mutex or channel. The same logic
            in Rust would require reviewing lifetime annotations, <code className="bg-gray-200 px-1 rounded text-sm">unsafe</code>
            blocks (especially around the Velox C FFI), <code className="bg-gray-200 px-1 rounded text-sm">Send/Sync</code>
            trait implementations, and the interaction between borrows and cancellation. Every review cycle
            becomes slower, and for a small team, developer velocity is a real bottleneck. Go lets the team
            ship and iterate faster without sacrificing correctness—the race detector catches the same class
            of bugs the borrow checker would, at a fraction of the cognitive cost.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8">4. C interop, done differently (Velox)</h3>
          <p>
            GTSDB uses Velox, a Go JSON library with a native C VM for its marshal hot path. Notably,
            Velox does <em>not</em> use cgo—the C code is pre-compiled into <code className="bg-gray-200 px-1 rounded text-sm">.syso</code>
            objects and linked via Plan9 assembly trampolines that bridge Go ABI to C ABI directly on
            the goroutine stack. The result: native C speed without the cgo build penalty (no
            <code className="bg-gray-200 px-1 rounded text-sm">CGO_ENABLED=1</code>, no cross-compilation
            headaches, no fork-exec for the C compiler during build).
          </p>
          <p>
            This is possible because Go&apos;s linker can ingest arbitrary <code className="bg-gray-200 px-1 rounded text-sm">.syso</code>
            files and resolve assembly-level symbols—a unique sweet spot in Go&apos;s toolchain that
            Rust&apos;s rigid separation between <code className="bg-gray-200 px-1 rounded text-sm">unsafe</code>
            and safe code would make far more cumbersome to replicate. Rust&apos;s FFI requires
            <code className="bg-gray-200 px-1 rounded text-sm">extern "C"</code> blocks,
            <code className="bg-gray-200 px-1 rounded text-sm">#[no_mangle]</code> annotations, and
            <code className="bg-gray-200 px-1 rounded text-sm">unsafe</code> wrappers around every C
            call—and cross-compiling the C portion demands a C toolchain per target anyway. Velox&apos;s
            approach ships the C artifacts pre-built, so consumers just run <code className="bg-gray-200 px-1 rounded text-sm">go build</code>
            with zero C tooling required.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8">The bottom line</h3>
          <p>
            Rust is an excellent choice for systems with complex shared state, strict latency requirements,
            or safety-critical certification. GTSDB is none of those things. It is a focused, WAL-first
            timeseries database where the hot path is a straight line from socket to ring buffer to file.
            Go gives you <strong>enough</strong> safety (the race detector), <strong>better</strong> concurrency primitives (goroutines and channels), and <strong>faster</strong> iteration
            (one-binary deploy, instant cross-compilation, simpler reviews). Choosing Go over Rust for this
            architecture is not a compromise—it is the correct engineering tradeoff.
          </p>
        </article>
      </div>
    </section>
  )
}

function AdvancedAccordion({
  groups,
  proto,
}: {
  groups: { id: string; label: string; blurb: string; code: string }[]
  proto: 'http' | 'tcp'
}) {
  const [open, setOpen] = useState<string | null>(groups[0]?.id ?? null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyOne = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 1500)
    })
  }

  return (
    <div className="divide-y divide-zinc-800">
      {groups.map((g) => {
        const isOpen = open === g.id
        const method = proto === 'http' ? 'POST' : 'SEND'
        const accent = proto === 'http'
          ? 'bg-indigo-900/15 border-indigo-400/30 text-indigo-300'
          : 'bg-sky-900/15 border-sky-400/30 text-sky-300'

        return (
          <div key={g.id}>
            <button
              onClick={() => setOpen(isOpen ? null : g.id)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-zinc-800/40 transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`shrink-0 inline-flex items-center px-2 py-1 rounded border text-[10px] font-bold tracking-wider ${accent}`}>
                  {method}
                </span>
                <div className="min-w-0">
                  <div className="font-semibold text-white text-sm">{g.label}</div>
                  <div className="text-xs text-zinc-400 truncate">{g.blurb}</div>
                </div>
              </div>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-white' : ''}`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="relative bg-zinc-950/50 border-t border-zinc-800">
                    <SyntaxHighlighter
                      language="json"
                      style={atomOneDark}
                      showLineNumbers
                      customStyle={{
                        margin: 0,
                        padding: '1rem 1rem 1rem 0',
                        background: 'transparent',
                        fontSize: '0.82rem',
                        lineHeight: '1.55',
                      }}
                      lineNumberStyle={{ color: '#52525b', paddingRight: '1rem', userSelect: 'none' }}
                    >
                      {g.code}
                    </SyntaxHighlighter>
                    <button
                      onClick={() => copyOne(g.id, g.code)}
                      className="absolute top-3 right-3 p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700 transition-colors backdrop-blur-sm"
                      aria-label={`Copy ${g.label} snippet`}
                    >
                      {copiedId === g.id
                        ? <Check className="h-4 w-4 text-emerald-400" />
                        : <Copy className="h-4 w-4 text-zinc-400" />}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

function UsageSection() {
  const [proto, setProto] = useState<'http' | 'tcp'>('http')
  const [op, setOp] = useState<'write' | 'read' | 'keys' | 'subscribe' | 'advanced'>('write')
  const [copied, setCopied] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const snippets = useMemo<Record<string, string>>(() => ({
    write: `{
    "operation": "write",
    "key": "a_sensor1",
    "write": {
        "value": 32242424243333333333.3333,
        "timestamp": 1717965210
    }
}`,
    read: `# Read with time range:
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
{
    "operation": "read",
    "key": "a_sensor1",
    "read": { "lastx": 1 }
}

# Binary read (16 bytes/point, zero-alloc):
{
    "operation": "read",
    "key": "a_sensor1",
    "read": { "lastx": 5000 },
    "response_format": "binary"
}

# Multi-read with time range:
{
    "operation": "multi-read",
    "keys": ["sensor1", "sensor2", "sensor3"],
    "read": {
        "start_timestamp": 1717965210,
        "end_timestamp": 1717965211,
        "downsampling": 3
    }
}`,
    keys: `{
    "operation": "ids"
}`,
    subscribe: `# Subscribe to a key
{
    "operation": "subscribe",
    "key": "sensor1"
}

# Unsubscribe from a key
{
    "operation": "unsubscribe",
    "key": "sensor1"
}`,
    advanced: ``, // Advanced uses the expandable sections below instead.
  }), [])

  const advancedGroups: { id: string; label: string; blurb: string; code: string }[] = [
    {
      id: 'auth',
      label: 'Authenticate',
      blurb: 'Required before any operation.',
      code: `{
    "operation": "auth",
    "key": "your-token-here"
}`,
    },
    {
      id: 'batch',
      label: 'Batch Write',
      blurb: 'Up to 10,000 points per call.',
      code: `{
    "operation": "batch-write",
    "points": [
        {"key": "sensor1", "value": 42.5, "timestamp": 1717965210},
        {"key": "sensor2", "value": 99.9, "timestamp": 1717965210}
    ]
}`,
    },
    {
      id: 'patch',
      label: 'Patch Data Points',
      blurb: 'Bulk insert via CSV or JSON.',
      code: `{
    "operation": "data-patch",
    "key": "sensor1",
    "data": "1717965210,123.45\\n1717965211,123.46"
}`,
    },
    {
      id: 'export',
      label: 'Export',
      blurb: 'Stream data as CSV.',
      code: `{
    "operation": "export",
    "key": "sensor1",
    "export": { "format": "csv", "lastx": 100 }
}`,
    },
    {
      id: 'compact',
      label: 'Compact',
      blurb: 'Reclaim disk space.',
      code: `{
    "operation": "compact",
    "key": "sensor1"
}`,
    },
    {
      id: 'serverinfo',
      label: 'Server Info',
      blurb: 'Memory, uptime, and stats.',
      code: `{
    "operation": "serverinfo"
}`,
    },
    {
      id: 'keymgmt',
      label: 'Key Management',
      blurb: 'Create, rename, delete keys.',
      code: `{ "operation": "initkey",    "key": "new_sensor" }
{ "operation": "renamekey",  "key": "old", "toKey": "new" }
{ "operation": "deletekey",  "key": "sensor_to_delete" }`,
    },
    {
      id: 'health',
      label: 'Health & Metrics',
      blurb: 'No auth required.',
      code: `GET /health
GET /metrics`,
    },
  ]

  const opMeta: { id: typeof op; label: string; icon: React.ReactNode; blurb: string }[] = [
    { id: 'write', label: 'Write', icon: <Pencil className="h-4 w-4" />, blurb: 'Append a single data point.' },
    { id: 'read', label: 'Read', icon: <Book className="h-4 w-4" />, blurb: 'Query by range, last N, or batch.' },
    { id: 'keys', label: 'Get All Keys', icon: <Key className="h-4 w-4" />, blurb: 'List every sensor / series.' },
    { id: 'subscribe', label: 'Subscribe', icon: <Rss className="h-4 w-4" />, blurb: 'Real-time push notifications.' },
    { id: 'advanced', label: 'Others', icon: <Zap className="h-4 w-4" />, blurb: 'Auth, batch, export, mgmt…' },
  ]

  const current = snippets[op]
  const copy = () => {
    navigator.clipboard.writeText(current).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <section id="usages" className="py-20 bg-gradient-to-t from-slate-400 to-slate-700 text-white">
      <div className="container mx-auto px-4" ref={sectionRef}>
        <h2 className="text-3xl font-bold mb-4 text-center">
          <Code className="h-8 w-8 inline-block mr-2" />
          Usages
        </h2>
        <p className="text-center text-slate-200/80 mb-10 max-w-2xl mx-auto">
          Identical JSON payload - choose your transport. Toggle between HTTP and TCP to see how the same body is sent.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 max-w-6xl mx-auto">
          {/* Vertical op nav */}
          <nav className="lg:sticky lg:top-24 self-start">
            <ul className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {opMeta.map(({ id, label, icon, blurb }) => {
                const active = op === id
                return (
                  <li key={id} className="shrink-0 lg:shrink">
                    <button
                      onClick={() => setOp(id)}
                      className={`group w-full text-left px-4 py-3 rounded-md border transition-all duration-200 ${
                        active
                          ? 'bg-white text-slate-900 border-white shadow-lg shadow-black/20'
                          : 'bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-medium text-sm">{label}</span>
                      </div>
                      <p className={`mt-1.5 text-xs leading-snug hidden lg:block ${active ? 'text-slate-500' : 'text-slate-300/70'}`}>
                        {blurb}
                      </p>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Code panel */}
          <div className="bg-zinc-900 rounded-md border border-zinc-800 overflow-hidden shadow-2xl">
            {/* Top bar: method badge + transport toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-zinc-800 bg-zinc-900/80">
              <div className="flex items-center gap-2">
                {proto === 'http' ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-900/15 border border-indigo-400/30 text-indigo-300 text-xs font-mono font-semibold">
                    <span className="px-1.5 py-0.5 rounded bg-indigo-700 text-white text-[10px] tracking-wider">POST</span>
                    <span>/</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-900/15 border border-sky-400/30 text-sky-300 text-xs font-mono font-semibold">
                    <span className="px-1.5 py-0.5 rounded bg-sky-900 text-white text-[10px] tracking-wider">WRITE</span>
                    <span>tcp://host:5555</span>
                  </span>
                )}
                <span className="text-zinc-500 text-xs hidden sm:inline">application/json · utf-8</span>
              </div>

              {/* Transport toggle */}
              <div className="relative inline-flex p-1 rounded-lg bg-zinc-800 border border-zinc-700">
                <motion.div
                  layout
                  className="absolute inset-y-1 rounded-md bg-white shadow"
                  initial={false}
                  animate={{
                    left: proto === 'http' ? '0%' : '50%',
                    right: proto === 'http' ? '50%' : '0%',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
                {(['http', 'tcp'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setProto(p)}
                    className={`relative z-10 px-3 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors duration-200 ${
                      proto === p ? 'text-slate-900' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {p === 'http' ? <Globe className="h-3.5 w-3.5" /> : <Plug className="h-3.5 w-3.5" />}
                    {p.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Code body */}
            {op === 'advanced' ? (
              <AdvancedAccordion groups={advancedGroups} proto={proto} />
            ) : (
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${op}-${proto}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                  >
                    <SyntaxHighlighter
                      language="json"
                      style={atomOneDark}
                      showLineNumbers
                      customStyle={{
                        margin: 0,
                        padding: '1.25rem 1rem 1.25rem 0',
                        background: 'transparent',
                        fontSize: '0.85rem',
                        lineHeight: '1.55',
                      }}
                      lineNumberStyle={{ color: '#52525b', paddingRight: '1rem', userSelect: 'none' }}
                    >
                      {current}
                    </SyntaxHighlighter>
                  </motion.div>
                </AnimatePresence>

                {/* Copy button */}
                <button
                  onClick={copy}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700 transition-colors backdrop-blur-sm"
                  aria-label="Copy snippet"
                >
                  {copied
                    ? <Check className="h-4 w-4 text-emerald-400" />
                    : <Copy className="h-4 w-4 text-zinc-400" />}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Doc link */}
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
      <h4 className="text-base font-semibold mb-4 text-center text-gray-700">{title}</h4>
      <ResponsiveBar
        data={data}
        keys={['milliseconds', 'seconds', 'kilobytes']}
        indexBy="db"
        margin={{ top: 20, right: 20, bottom: 80, left: 60 }}
        padding={0.3}
        borderRadius={4}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={({ data }) => {
          if (data.db.includes('GTSDB')) return '#3B82F6'
          if (data.db.includes('VictoriaMetrics')) return '#10B981'
          if (data.db.includes('NSQ')) return '#F59E0B'
          return '#94A3B8'
        }}
        borderWidth={0}
        enableGridY={true}
        gridYValues={5}
        theme={{
          axis: {
            ticks: {
              text: { fontSize: 11, fill: '#6B7280' },
            },
            legend: {
              text: { fontSize: 11, fill: '#6B7280', fontWeight: '600' },
            },
          },
          grid: {
            line: { stroke: '#E5E7EB', strokeWidth: 1, strokeDasharray: '4 4' },
          },
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 8,
          tickRotation: 0,
          format: v => v >= 1000 ? (v/1000).toFixed(0) + 'k' : v,
          legend: unit || 'Time (ms)',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        axisBottom={{
          tickSize: 0,
          tickPadding: 8,
          tickRotation: 0,
        }}
        enableLabel={true}
        labelPosition="end"
        labelFormat={value => {
          const n = Number(value)
          if (n < 1 && n > 0) return n.toFixed(3)
          return n.toFixed(1)
        }}
        labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        labelSkipWidth={20}
        labelSkipHeight={0}
        labelOffset={5}
        animate={true}
        motionConfig="gentle"
        tooltip={({ id, value, color, data }) => (
          <div style={{ padding: '8px 12px', background: '#fff', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '1px solid #F3F4F6', fontSize: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: color, display: 'inline-block' }} />
              <span style={{ fontWeight: 600, color: '#374151' }}>{data.db}</span>
            </div>
            <span style={{ color: '#6B7280' }}>{title}: <strong>{value}</strong> {unit || 'ms'}</span>
          </div>
        )}
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
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="bg-white p-8 rounded-lg border border-zinc-400 border-3 shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Write Benchmarks</h3>
            <div className="space-y-8">
              <BarChartComponent data={writeData} title="Write (seq) - 5,000 pts" />
              <Separator className="w-auto" />
              <BarChartComponent data={batchWriteData} title="Batch Write - 5,000 pts" />
              <Separator />
              <BarChartComponent data={pipelineData} title="Pipeline Write - 5,000 pts" />
              <Separator />
              <BarChartComponent data={multiWriteData} title="Multi-Sensor Write - 5 keys × 1,000 pts" />
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg border border-zinc-400 border-3 shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Read Benchmarks</h3>
            <div className="space-y-8">
              <BarChartComponent data={readData} title="Single Read - Last 1 Point" />
              <Separator />
              <BarChartComponent data={readManyData} title="Multi-Key Read - 5 Keys × 5,000 pts" />
              <Separator />
              <BarChartComponent 
                data={pubsubData.map(d => ({ ...d, seconds: Number(d.seconds.toFixed(3)) }))} 
                title="Pub/Sub Delivery Latency (s)" 
                unit="s"
              />
              <Separator />
              <BarChartComponent 
                data={compressionData} 
                title="Storage per 5,000 points (KB)" 
                unit="KB"
              />
            </div>
          </div>
        </div>
        {/* Resource Usage Charts */}
        <div className="mt-12">
          <div className="bg-white p-8 rounded-lg border border-zinc-400 border-3 shadow-lg">
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
                className="group relative inline-flex items-center px-7 py-3 bg-gradient-to-r 
                from-slate-900 to-slate-700 text-white rounded-lg font-semibold shadow-lg 
                shadow-slate-900/20 hover:shadow-sm 
                hover:shadow-slate-900/30 hover:from-slate-800 hover:to-slate-600 transition-all duration-300"
              >
                <Github className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                View Full Benchmark Repository
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

            <div className="bg-amber-50 rounded-lg mb-4 overflow-hidden mt-12 border border-amber-200 shadow-lg">
              <h4 className="text-lg font-bold text-amber-800 px-4 pt-4 pb-2">Performance Highlights</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-black-900">
                  <thead>
                    <tr className="bg-amber-100/70 text-amber-900">
                      <th className="text-left py-2 px-4 font-semibold">Feature</th>
                      <th className="text-left py-2 px-4 font-semibold">Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-amber-200/60">
                      <td className="py-2 px-4 font-semibold">JSON Engine</td>
                      <td className="py-2 px-4">Velox native C VM + binary protocol for reads</td>
                    </tr>
                    <tr className="border-t border-amber-200/60">
                      <td className="py-2 px-4 font-semibold">Binary Protocol</td>
                      <td className="py-2 px-4">16 bytes/point, zero-alloc encode/decode</td>
                    </tr>
                    <tr className="border-t border-amber-200/60">
                      <td className="py-2 px-4 font-semibold">Multi-Key Read</td>
                      <td className="py-2 px-4 font-mono">{Math.round(5000 / (bm.readMany.gtsdb / 1000)).toLocaleString()} ops/sec <span className="text-amber-700/70">(faster than VictoriaMetrics)</span></td>
                    </tr>
                    <tr className="border-t border-amber-200/60">
                      <td className="py-2 px-4 font-semibold">Pub/Sub Latency</td>
                      <td className="py-2 px-4 font-mono">{rd(bm.pubsub.gtsdb * 1000)} ms delivery</td>
                    </tr>
                    <tr className="border-t border-amber-200/60">
                      <td className="py-2 px-4 font-semibold">Batch Write</td>
                      <td className="py-2 px-4 font-mono">{(5000 / (bm.batchWrite.gtsdb / 1000)).toLocaleString(undefined, {maximumFractionDigits: 0})} ops/sec</td>
                    </tr>
                    <tr className="border-t border-amber-200/60">
                      <td className="py-2 px-4 font-semibold">Multi-Write</td>
                      <td className="py-2 px-4 font-mono">{(5000 / (bm.multiWrite.gtsdb / 1000)).toLocaleString(undefined, {maximumFractionDigits: 0})} ops/sec</td>
                    </tr>
                    <tr className="border-t border-amber-200/60">
                      <td className="py-2 px-4 font-semibold">Compression</td>
                      <td className="py-2 px-4"><strong>29.6x smaller</strong> than raw JSON (Gorilla)</td>
                    </tr>
                    <tr className="border-t border-amber-200/60">
                      <td className="py-2 px-4 font-semibold">Memory (idle)</td>
                      <td className="py-2 px-4"><strong>~12 MB</strong></td>
                    </tr>
                    <tr className="border-t border-amber-200/60">
                      <td className="py-2 px-4 font-semibold">Deployment</td>
                      <td className="py-2 px-4">Single <strong>binary executable</strong> — no dependencies</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-50 rounded-lg overflow-hidden border-2 border-slate-200 shadow-lg">
            <h4 className="text-lg font-bold text-slate-800 px-4 pt-4 pb-2">Test Configuration</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-slate-900">
                <thead>
                  <tr className="bg-slate-100/70 text-slate-900">
                    <th className="text-left py-2 px-4 font-semibold">Setting</th>
                    <th className="text-left py-2 px-4 font-semibold">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-200/60">
                    <td className="py-2 px-4 font-semibold">Points per Operation</td>
                    <td className="py-2 px-4">5,000</td>
                  </tr>
                  <tr className="border-t border-slate-200/60">
                    <td className="py-2 px-4 font-semibold">Sensors (multi-write)</td>
                    <td className="py-2 px-4">5</td>
                  </tr>
                  <tr className="border-t border-slate-200/60">
                    <td className="py-2 px-4 font-semibold">Runs per Benchmark</td>
                    <td className="py-2 px-4">3</td>
                  </tr>
                  <tr className="border-t border-slate-200/60">
                    <td className="py-2 px-4 font-semibold">Warmup Iterations</td>
                    <td className="py-2 px-4">300</td>
                  </tr>
                  <tr className="border-t border-slate-200/60">
                    <td className="py-2 px-4 font-semibold">GTSDB JSON Library</td>
                    <td className="py-2 px-4">Velox (native C VM backend)</td>
                  </tr>
                  <tr className="border-t border-slate-200/60">
                    <td className="py-2 px-4 font-semibold">GTSDB Cache Size</td>
                    <td className="py-2 px-4">10,000 ring buffer / key</td>
                  </tr>
                  <tr className="border-t border-slate-200/60">
                    <td className="py-2 px-4 font-semibold">Sync Mode</td>
                    <td className="py-2 px-4">async (dirty-key flusher) <br /> (p.s. sync mode also available, and our clients love it :p)</td>
                  </tr>
                  <tr className="border-t border-slate-200/60">
                    <td className="py-2 px-4 font-semibold">OS</td>
                    <td className="py-2 px-4">Windows</td>
                  </tr>
                  <tr className="border-t border-slate-200/60">
                    <td className="py-2 px-4 font-semibold">Architecture</td>
                    <td className="py-2 px-4">amd64</td>
                  </tr>
                  <tr className="border-t border-slate-200/60">
                    <td className="py-2 px-4 font-semibold">CPU</td>
                    <td className="py-2 px-4">Core(TM) i7-13700KF</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden border-2 border-gray-200 shadow-lg">

            {/* vs InfluxDB */}
            <div className="bg-blue-50 mb-4 overflow-hidden">
              <h4 className="text-lg font-bold text-blue-800 px-4 pt-4 pb-2">vs InfluxDB</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-blue-900">
                  <thead>
                    <tr className="bg-blue-100/70 text-blue-900">
                      <th className="text-left py-2 px-4 font-semibold">Operation</th>
                      <th className="text-right py-2 px-4 font-semibold">GTSDB</th>
                      <th className="text-right py-2 px-4 font-semibold">InfluxDB</th>
                      <th className="text-right py-2 px-4 font-semibold">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-blue-200/60">
                      <td className="py-2 px-4">Sequential write</td>
                      <td className="py-2 px-4 text-right font-mono">{rd(bm.write.gtsdb)} ms</td>
                      <td className="py-2 px-4 text-right font-mono">{rd(bm.write.influxdb)} ms</td>
                      <td className="py-2 px-4 text-right font-bold">{bm.ratios.writeVsInflux}x</td>
                    </tr>
                    <tr className="border-t border-blue-200/60">
                      <td className="py-2 px-4">Pipeline write</td>
                      <td className="py-2 px-4 text-right font-mono">{rd(bm.pipeline.gtsdb)} ms</td>
                      <td className="py-2 px-4 text-right font-mono">{rd(bm.pipeline.influxdb)} ms</td>
                      <td className="py-2 px-4 text-right font-bold">{bm.ratios.pipelineVsInflux}x</td>
                    </tr>
                    <tr className="border-t border-blue-200/60">
                      <td className="py-2 px-4">Batch write</td>
                      <td className="py-2 px-4 text-right font-mono">{rd(bm.batchWrite.gtsdb)} ms</td>
                      <td className="py-2 px-4 text-right font-mono">{rd(bm.batchWrite.influxdb)} ms</td>
                      <td className="py-2 px-4 text-right font-bold">{bm.ratios.batchVsInflux}x</td>
                    </tr>
                    <tr className="border-t border-blue-200/60">
                      <td className="py-2 px-4">Multi-sensor write</td>
                      <td className="py-2 px-4 text-right font-mono">{rd(bm.multiWrite.gtsdb)} ms</td>
                      <td className="py-2 px-4 text-right font-mono">{rd(bm.multiWrite.influxdb)} ms</td>
                      <td className="py-2 px-4 text-right font-bold">{bm.ratios.multiWriteVsInflux}x</td>
                    </tr>
                    <tr className="border-t border-blue-200/60">
                      <td className="py-2 px-4">Single read</td>
                      <td className="py-2 px-4 text-right font-mono">&lt;{rd(bm.read.gtsdb)} ms</td>
                      <td className="py-2 px-4 text-right font-mono">{rd(bm.read.influxdb)} ms</td>
                      <td className="py-2 px-4 text-right font-bold">{bm.ratios.readVsInflux}x</td>
                    </tr>
                    <tr className="border-t border-blue-200/60">
                      <td className="py-2 px-4">Multi-key read</td>
                      <td className="py-2 px-4 text-right font-mono">{rd(bm.readMany.gtsdb)} ms</td>
                      <td className="py-2 px-4 text-right font-mono">{rd(bm.readMany.influxdb)} ms</td>
                      <td className="py-2 px-4 text-right font-bold">{bm.ratios.readManyVsInflux}x</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* vs VictoriaMetrics */}
            <div className="bg-green-50 overflow-hidden">
              <h4 className="text-lg font-bold text-green-800 px-4 pt-4 pb-2">vs VictoriaMetrics</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-green-900">
                  <thead>
                    <tr className="bg-green-100/70 text-green-900">
                      <th className="text-left py-2 px-4 font-semibold">Operation</th>
                      <th className="text-right py-2 px-4 font-semibold">GTSDB</th>
                      <th className="text-right py-2 px-4 font-semibold">VictoriaMetrics</th>
                      <th className="text-right py-2 px-4 font-semibold">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-green-200/60">
                      <td className="py-2 px-4">Sequential write</td>
                      <td className="py-2 px-4 text-right font-mono">{rd(bm.write.gtsdb)} ms</td>
                      <td className="py-2 px-4 text-right font-mono">{rd(bm.write.vm)} ms</td>
                      <td className="py-2 px-4 text-right font-bold">{bm.ratios.writeVsVM}x</td>
                    </tr>
                    <tr className="border-t border-green-200/60">
                      <td className="py-2 px-4">Pipeline write</td>
                      <td className="py-2 px-4 text-right font-mono">{rd(bm.pipeline.gtsdb)} ms</td>
                      <td className="py-2 px-4 text-right font-mono">{rd(bm.pipeline.vm)} ms</td>
                      <td className="py-2 px-4 text-right font-bold">{bm.ratios.pipelineVsVM}x</td>
                    </tr>
                    <tr className="border-t border-green-200/60">
                      <td className="py-2 px-4">Single read</td>
                      <td className="py-2 px-4 text-right font-mono">{rd(bm.read.gtsdb)} ms</td>
                      <td className="py-2 px-4 text-right font-mono">{rd(bm.read.vm)} ms</td>
                      <td className={`py-2 px-4 text-right font-bold ${bm.ratios.readVsVM >= 1 ? '' : 'text-slate-500'}`}>
                        {bm.ratios.readVsVM >= 1
                          ? `${bm.ratios.readVsVM}x faster`
                          : `VM leads ${bm.ratios.readVsVM}x`}
                      </td>
                    </tr>
                    <tr className="border-t border-green-200/60">
                      <td className="py-2 px-4">Multi-key read</td>
                      <td className="py-2 px-4 text-right font-mono">{rd(bm.readMany.gtsdb)} ms</td>
                      <td className="py-2 px-4 text-right font-mono">{rd(bm.readMany.vm)} ms</td>
                      <td className={`py-2 px-4 text-right font-bold ${bm.ratios.readManyVsVM >= 1 ? '' : 'text-slate-500'}`}>
                        {bm.ratios.readManyVsVM >= 1
                          ? `${bm.ratios.readManyVsVM}x faster`
                          : `VM leads ${bm.ratios.readManyVsVM}x`}
                      </td>
                    </tr>
                    <tr className="border-t border-green-200/60">
                      <td className="py-2 px-4">Batch write</td>
                      <td className="py-2 px-4 text-right font-mono">{rd(bm.batchWrite.gtsdb)} ms</td>
                      <td className="py-2 px-4 text-right font-mono">{rd(bm.batchWrite.vm)} ms</td>
                      <td className="py-2 px-4 text-right font-bold text-slate-500">VM leads {bm.ratios.batchVsVM}x</td>
                    </tr>
                    <tr className="border-t border-green-200/60">
                      <td className="py-2 px-4">Multi-write</td>
                      <td className="py-2 px-4 text-right font-mono">{rd(bm.multiWrite.gtsdb)} ms</td>
                      <td className="py-2 px-4 text-right font-mono">{rd(bm.multiWrite.vm)} ms</td>
                      <td className="py-2 px-4 text-right font-bold text-slate-500">VM leads {bm.ratios.multiWriteVsVM}x</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
      <h4 className="text-base font-semibold mb-4 text-center text-gray-700">{title}</h4>
      <ResponsiveBar
        data={data}
        keys={['milliseconds', 'seconds']}
        indexBy="db"
        margin={{ top: 20, right: 20, bottom: 80, left: 60 }}
        padding={0.3}
        borderRadius={4}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={({ data }: { data: { db: string } }) => {
          if (data.db.includes('GTSDB')) return '#3B82F6'
          if (data.db.includes('VictoriaMetrics')) return '#10B981'
          return '#94A3B8'
        }}
        borderWidth={0}
        enableGridY={true}
        gridYValues={5}
        theme={{
          axis: {
            ticks: {
              text: { fontSize: 11, fill: '#6B7280' },
            },
            legend: {
              text: { fontSize: 11, fill: '#6B7280', fontWeight: '600' },
            },
          },
          grid: {
            line: { stroke: '#E5E7EB', strokeWidth: 1, strokeDasharray: '4 4' },
          },
        }}
        axisLeft={{ tickSize: 0, tickValues: 5, tickPadding: 8, tickRotation: 0, format: v => v >= 1000 ? (v/1000).toFixed(0) + 'k' : v, legend: unit, legendPosition: 'middle', legendOffset: -40 }}
        axisBottom={{ tickSize: 0, tickPadding: 8, tickRotation: 0 }}
        enableLabel={true}
        labelPosition="end"
        labelFormat={value => `${Number(value).toFixed(1)}`}
        labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        labelSkipWidth={20}
        labelSkipHeight={0}
        labelOffset={5}
        animate={true}
        motionConfig="gentle"
        tooltip={({ id, value, color, data }) => (
          <div style={{ padding: '8px 12px', background: '#fff', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '1px solid #F3F4F6', fontSize: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: color, display: 'inline-block' }} />
              <span style={{ fontWeight: 600, color: '#374151' }}>{data.db}</span>
            </div>
            <span style={{ color: '#6B7280' }}>{title}: <strong>{value}</strong> {unit}</span>
          </div>
        )}
      />
    </div>
  )

  return (
<div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 items-center">
  <ResChart data={cpuData} title="CPU Time (s)" unit="s" />
  <Separator orientation="vertical" className="hidden lg:block h-32" />
  <ResChart data={memData} title="Memory (MB)" unit="MB" />
  <Separator orientation="vertical" className="hidden lg:block h-32" />
  <ResChart data={diskData} title="Disk (KB)" unit="KB" />
</div>
  )
}


function DriversSection() {
  const goInstall = `go get github.com/abbychau/gtsdb-drivers/go@latest`
  const goCode = `import "github.com/abbychau/gtsdb-drivers/go"

client, _ := gtsdb.Connect("localhost:5555")
client.Auth("your-token")

// JSON
client.Write("sensor1", 42.5)
pts, _ := client.ReadLast("sensor1", 100)

// 🚀 Binary - 100x faster
pts, _ := client.ReadBinary("sensor1", 5000)
multi, _ := client.MultiReadBinary(
    []string{"s1","s2"}, 5000,
)`
  const jsInstall = `npm install github:abbychau/gtsdb-drivers`
  const jsCode = `const { GTSDBClient } = require('gtsdb-drivers')
const c = new GTSDBClient('localhost', 5555)
await c.connect()
await c.auth('your-token')

// JSON
await c.write('sensor1', 42.5)
const pts = await c.readLast('sensor1', 100)

// 🚀 Binary - 100x faster
const pts = await c.readBinary('sensor1', 5000)
const multi = await c.multiReadBinary(
  ['s1','s2'], 5000
)`

  const codeBlockProps = {
    customStyle: {
      margin: 0,
      padding: '1rem 1rem 1rem 0',
      background: 'transparent',
      fontSize: '0.78rem',
      lineHeight: '1.55',
    },
    lineNumberStyle: { color: '#52525b', paddingRight: '1rem', userSelect: 'none' as const },
  }

  return (
    <section id="drivers" className="py-20 bg-gradient-to-b from-slate-200 via-slate-100 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">
          <Terminal className="h-8 w-8 inline-block mr-2" />
          Client Drivers
        </h2>
        <p className="text-center text-gray-500 mb-12">First-class Go & Node.js clients with JSON and binary protocol support</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Go Driver */}
          <div className="relative bg-zinc-950 rounded-xl shadow-2xl border-4 border-sky-500 overflow-hidden">
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-sky-400 mr-3 font-mono">Go</span>
                <span className="text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded font-mono">v0.1.0</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold">main.go</span>
            </div>

            {/* Install snippet */}
            <div className="mx-6 mb-3 rounded-lg border border-zinc-800 bg-zinc-900/60 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900 border-b border-zinc-800">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold ">
                  install
                </span>
                <span className="text-[10px] text-zinc-600 font-mono">bash</span>
              </div>
              <SyntaxHighlighter
                language="bash"
                style={atomOneDark}
                customStyle={{ margin: 0, padding: '0.65rem 0.75rem', background: 'transparent', fontSize: '0.78rem' }}
              >
                {goInstall}
              </SyntaxHighlighter>
            </div>

            {/* Main snippet */}
            <div className="mx-6 mb-6 rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900 border-b border-zinc-800">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
                  example
                </span>
                <span className="text-[10px] text-zinc-600 font-mono">go</span>
              </div>
              <SyntaxHighlighter
                language="go"
                style={atomOneDark}
                showLineNumbers
                {...codeBlockProps}
              >
                {goCode}
              </SyntaxHighlighter>
            </div>

            <div className="px-6 pb-6">
              <a href="https://github.com/abbychau/gtsdb-drivers/tree/main/go" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 text-sm flex items-center transition-colors">
                <Github className="h-4 w-4 mr-1" /> Go driver + docs
                <SquareArrowOutUpRight className="h-3 w-3 ml-1 opacity-70" />
              </a>
            </div>
          </div>

          {/* JS Driver */}
          <div className="relative bg-zinc-950 rounded-xl shadow-2xl border-4 border-amber-500 overflow-hidden">
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-amber-400 mr-3 font-mono">Node.js</span>
                <span className="text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded font-mono">v0.1.0</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold">index.js</span>
            </div>

            {/* Install snippet */}
            <div className="mx-6 mb-3 rounded-lg border border-zinc-800 bg-zinc-900/60 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900 border-b border-zinc-800">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold ">
                  install
                </span>
                <span className="text-[10px] text-zinc-600 font-mono">bash</span>
              </div>
              <SyntaxHighlighter
                language="bash"
                style={atomOneDark}
                customStyle={{ margin: 0, padding: '0.65rem 0.75rem', background: 'transparent', fontSize: '0.78rem' }}
              >
                {jsInstall}
              </SyntaxHighlighter>
            </div>

            {/* Main snippet */}
            <div className="mx-6 mb-6 rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900 border-b border-zinc-800">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
                  example
                </span>
                <span className="text-[10px] text-zinc-600 font-mono">javascript</span>
              </div>
              <SyntaxHighlighter
                language="javascript"
                style={atomOneDark}
                showLineNumbers
                {...codeBlockProps}
              >
                {jsCode}
              </SyntaxHighlighter>
            </div>

            <div className="px-6 pb-6">
              <a href="https://github.com/abbychau/gtsdb-drivers/tree/main/js" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 text-sm flex items-center transition-colors">
                <Github className="h-4 w-4 mr-1" /> JS driver + docs
                <SquareArrowOutUpRight className="h-3 w-3 ml-1 opacity-70" />
              </a>
            </div>
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





function AdminToolSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">
          <Monitor className="h-8 w-8 inline-block mr-2" />
          Admin Tool
        </h2>
        <p className="text-center text-gray-500 text-sm mb-10 max-w-2xl mx-auto">
          A modern web-based administration interface for managing your GTSDB instance.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
          <div>
            <LightboxImage
              src={adminScreenshot.src}
              alt="GTSDB Admin Interface"
              width={800}
              height={500}
              className="rounded-xl shadow-2xl"
            />
          </div>
          <div className="space-y-5 text-gray-700 leading-relaxed">
            <p>
              The <strong>GTSDB Admin</strong> is a feature-rich web dashboard that provides complete visual control over your
              GTSDB instance — from key management and data read/write operations to real-time charting and comparison tools.
              Built with Next.js 14, ECharts, and shadcn/ui, it connects to any running GTSDB server via a BFF proxy
              pattern, supporting HTTP, WebSocket, and TCP protocols.
            </p>
            <p>
              Key capabilities include tabbed multi-key workflows with hierarchical sidebar grouping, embeddable charts
              for external dashboards, a built-in data generator for test data, server information monitoring with
              live polling, and per-key configuration (multipliers, units, offsets) stored in Redis. The comparison
              tool lets you stack up to three charts side-by-side with session persistence.
            </p>
            <a
              href="https://github.com/abbychau/gtsdb-admin"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center px-6 py-3 bg-gradient-to-r 
                from-slate-900 to-slate-700 text-white rounded-lg font-semibold shadow-lg 
                shadow-slate-900/20 hover:shadow-sm 
                hover:shadow-slate-900/30 hover:from-slate-800 hover:to-slate-600 transition-all duration-300"
            >
              <Github className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:rotate-12" />
              View Admin Repository
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
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

function CTAButton({
  href, rel, icon, title, trailingIcon, description
}: {
  href: string
  rel?: string
  icon: React.ReactNode
  title: string
  trailingIcon: React.ReactNode
  description: string
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel={rel}
      className="group relative inline-flex flex-col items-center px-6 py-3 bg-gradient-to-r 
      from-slate-900 to-slate-800 text-white rounded-lg 
      font-semibold shadow-lg shadow-slate-900/20 hover:shadow-sm 
      hover:shadow-slate-900/30 hover:from-slate-900 hover:to-slate-700 transition-all duration-300"
    >
      <span className="flex items-center">
        {icon}
        {title}
        {trailingIcon}
      </span>
      <span className="text-[10px] text-indigo-100/70 font-normal mt-0.5 tracking-wide">
        {description}
      </span>
    </Link>
  )
}

function CTASection() {
  return (
    <section id="CTA" className="relative py-24 text-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-300 animate-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(217,70,239,0.1),transparent_50%)]" />
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="container mx-auto px-4 text-center relative">
        <div className="flex flex-wrap justify-center gap-4">
          <CTAButton
            href="https://github.com/abbychau/gtsdb/releases"
            icon={<Download className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:-translate-y-0.5" />}
            title="Download GTSDB"
            trailingIcon={<ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />}
            description="Windows · Linux/BSD · macOS"
          />
          <CTAButton
            href="https://hub.docker.com/r/abbychau/gtsdb"
            rel="noopener noreferrer"
            icon={<Container className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:rotate-12" />}
            title="Docker"
            trailingIcon={<SquareArrowOutUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
            description="Official image on Docker Hub"
          />
          <CTAButton
            href="https://gtsdb-admin.vercel.app/?apiUrl=https://gtsdb-web.abby.md/"
            rel="noopener noreferrer"
            icon={<Presentation className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:rotate-12" />}
            title="Admin Tool Demo"
            trailingIcon={<SquareArrowOutUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
            description="Try the web-based admin interface(BYO GTSDB server)"
          />
        </div>
      </div>
    </section>
  )
}

