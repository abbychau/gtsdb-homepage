"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Github, Download, HomeIcon, X, Search } from "lucide-react"
import oldHamham from "../oldHamham.png"
import Footer from "@/components/Footer"

interface NavGroup {
  group: string
  items: { id: string; label: string; href: string }[]
}

const NAV_GROUPS: NavGroup[] = [
  { group: "Getting Started", items: [
    { id: "home", label: "Overview", href: "/Documentation?section=home" },
    { id: "connect", label: "Connecting", href: "/Documentation?section=connect" },
    { id: "auth", label: "Authentication", href: "/Documentation?section=auth" },
  ]},
  { group: "Write", items: [
    { id: "write", label: "Write Single Value", href: "/Documentation?section=write" },
    { id: "batch-write", label: "Batch Write", href: "/Documentation?section=batch-write" },
    { id: "patch", label: "Patch Data Points", href: "/Documentation?section=patch" },
  ]},
  { group: "Read", items: [
    { id: "read", label: "Read (Time Range)", href: "/Documentation?section=read" },
    { id: "read-last", label: "Read Last X", href: "/Documentation?section=read-last" },
    { id: "multi-read", label: "Multi-Read", href: "/Documentation?section=multi-read" },
    { id: "export", label: "Export Data", href: "/Documentation?section=export" },
  ]},
  { group: "Binary Protocol", items: [
    { id: "binary", label: "Protocol & Usage", href: "/Documentation?section=binary" },
  ]},
  { group: "Real-time", items: [
    { id: "subscribe", label: "Subscribe", href: "/Documentation?section=subscribe" },
    { id: "unsubscribe", label: "Unsubscribe", href: "/Documentation?section=unsubscribe" },
  ]},
  { group: "Management", items: [
    { id: "users", label: "User Management", href: "/Documentation?section=users" },
    { id: "keys", label: "Key Management", href: "/Documentation?section=keys" },
    { id: "compact", label: "Compact / Delete", href: "/Documentation?section=compact" },
  ]},
  { group: "Monitoring", items: [
    { id: "server", label: "Server Info", href: "/Documentation?section=server" },
    { id: "health", label: "Health Check", href: "/Documentation?section=health" },
    { id: "metrics", label: "Metrics", href: "/Documentation?section=metrics" },
    { id: "other", label: "Flush / Ping", href: "/Documentation?section=other" },
  ]},
]

const SEARCH_INDEX: { label: string; keywords: string; href: string }[] = [
  { label: "Connecting", keywords: "connect http tcp port host address", href: "/Documentation?section=connect" },
  { label: "Authentication", keywords: "auth token authenticate login key", href: "/Documentation?section=auth" },
  { label: "Write Single Value", keywords: "write single value data point sensor", href: "/Documentation?section=write" },
  { label: "Batch Write", keywords: "batch write multiple points bulk 10000", href: "/Documentation?section=batch-write" },
  { label: "Patch Data Points", keywords: "patch update insert csv json", href: "/Documentation?section=patch" },
  { label: "Read Time Range", keywords: "read time range downsampling aggregation avg sum min max p50 p95 p99", href: "/Documentation?section=read" },
  { label: "Read Last X", keywords: "read last records recent", href: "/Documentation?section=read-last" },
  { label: "Multi-Read", keywords: "multi read multiple keys batch", href: "/Documentation?section=multi-read" },
  { label: "Binary Protocol", keywords: "binary protocol compact 16-byte frame encode decode float64", href: "/Documentation?section=binary" },
  { label: "Export Data", keywords: "export csv json data", href: "/Documentation?section=export" },
  { label: "Subscribe", keywords: "subscribe real-time push notification", href: "/Documentation?section=subscribe" },
  { label: "Unsubscribe", keywords: "unsubscribe stop notification", href: "/Documentation?section=unsubscribe" },
  { label: "Create User", keywords: "add user create token", href: "/Documentation?section=users" },
  { label: "Reset User Token", keywords: "resetkey reset token", href: "/Documentation?section=users" },
  { label: "Get All Keys", keywords: "ids idswithcount list keys sensors series", href: "/Documentation?section=keys" },
  { label: "Initialize Key", keywords: "initkey create new key sensor", href: "/Documentation?section=keys" },
  { label: "Rename Key", keywords: "renamekey rename key", href: "/Documentation?section=keys" },
  { label: "Delete Key", keywords: "deletekey remove key", href: "/Documentation?section=compact" },
  { label: "Delete Data Points", keywords: "deleteDataPoint remove data points", href: "/Documentation?section=compact" },
  { label: "Compact Key", keywords: "compact wal reclaim disk space gorilla", href: "/Documentation?section=compact" },
  { label: "Reload Key", keywords: "reloadkey reload key disk", href: "/Documentation?section=compact" },
  { label: "Server Info", keywords: "serverinfo version uptime memory stats goroutines", href: "/Documentation?section=server" },
  { label: "Health Check", keywords: "health check status", href: "/Documentation?section=health" },
  { label: "Prometheus Metrics", keywords: "metrics prometheus monitoring", href: "/Documentation?section=metrics" },
  { label: "Flush Data", keywords: "flush write disk sync", href: "/Documentation?section=other" },
  { label: "Ping", keywords: "ping keepalive connection", href: "/Documentation?section=other" },
]

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileSidebar, setMobileSidebar] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true) }
      if (e.key === "Escape") { setSearchOpen(false); setMobileSidebar(false) }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  useEffect(() => { if (searchOpen) searchRef.current?.focus() }, [searchOpen])

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    return SEARCH_INDEX.filter(i => i.label.toLowerCase().includes(q) || i.keywords.includes(q)).slice(0, 8)
  }, [searchQuery])

  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const update = () => {
      const params = new URLSearchParams(window.location.search)
      setActiveSection(params.get("section") || "home")
    }
    update()
    const origPush = window.history.pushState
    const origReplace = window.history.replaceState
    window.history.pushState = function (data: any, unused: string, url?: string | URL | null) { origPush.call(window.history, data, unused, url); update() }
    window.history.replaceState = function (data: any, unused: string, url?: string | URL | null) { origReplace.call(window.history, data, unused, url); update() }
    window.addEventListener("popstate", update)
    return () => {
      window.history.pushState = origPush
      window.history.replaceState = origReplace
      window.removeEventListener("popstate", update)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className={"sticky top-0 z-50 transition-all duration-500 " + (scrolled ? "backdrop-blur-2xl bg-slate-950/95 shadow-[0_4px_20px_rgba(0,0,0,0.4)] py-0" : "backdrop-blur-xl bg-gradient-to-r from-slate-900/90 via-indigo-900/85 to-slate-900/90 py-1")}>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white/60 via-indigo-400/60 to-fuchsia-500/60" />
        <div className={"container mx-auto px-4 flex justify-between items-center relative transition-all duration-500 " + (scrolled ? "py-2" : "py-1")}>
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <Image src={oldHamham} alt="GTSDB Logo" className="w-9" />
            <h1 className="font-bold text-2xl text-white">GTSDB<span className="hidden sm:inline text-sm ml-1">· <span className="text-red-400">D</span>ocs</span></h1>
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => setSearchOpen(true)} className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/10 border border-white/20 text-slate-300 text-sm hover:bg-white/15 transition-colors">
              <Search className="h-4 w-4" /><span className="hidden lg:inline">Search docs...</span><kbd className="px-1.5 py-0.5 rounded-sm bg-white/10 text-[10px] font-mono text-slate-400">Ctrl+K</kbd>
            </button>
            <div className="w-px h-5 bg-white/10 mx-1" />
            <Link href="/" className="text-slate-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"><HomeIcon className="h-5 w-5" /></Link>
            <a href="https://github.com/abbychau/gtsdb" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"><Github className="h-5 w-5" /></a>
            <a href="https://github.com/abbychau/gtsdb/releases" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"><Download className="h-5 w-5" /></a>
          </div>
          <button className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.5" onClick={() => setMobileSidebar(!mobileSidebar)} aria-label="Toggle menu">
            <span className={"w-6 h-0.5 bg-white rounded-full transition-all duration-300 " + (mobileSidebar ? "rotate-45 translate-y-[4px]" : "")} />
            <span className={"w-6 h-0.5 bg-white rounded-full transition-all duration-300 " + (mobileSidebar ? "opacity-0 scale-x-0" : "")} />
            <span className={"w-6 h-0.5 bg-white rounded-full transition-all duration-300 " + (mobileSidebar ? "-rotate-45 -translate-y-[4px]" : "")} />
          </button>
        </div>
      </header>

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row gap-8">
            <nav className="hidden md:block w-56 flex-shrink-0">
              <div className="sticky top-24 flex flex-col gap-5 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
                {NAV_GROUPS.map(({ group, items }) => (
                  <div key={group}>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">{group}</div>
                    <div className="flex flex-col gap-0.5 pl-3 border-l-2 border-gray-200">
                      {items.map(({ id, label, href }) => (
                        <Link key={id} href={href} scroll={false}
                          className={cn("relative text-left px-3 py-1.5 rounded-sm text-sm transition-all duration-200 hover:text-gray-900",
                            activeSection === id ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-500 hover:bg-gray-50"
                          )}>
                          {activeSection === id && (
                            <motion.div layoutId="sidebar-active" className="absolute left-[-10px] inset-y-0 my-auto w-[3px] h-6 bg-indigo-500 rounded-sm" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                          )}
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </nav>

            <AnimatePresence>
              {mobileSidebar && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setMobileSidebar(false)} />}
            </AnimatePresence>
            <motion.nav className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 md:hidden overflow-y-auto" initial={false} animate={{ x: mobileSidebar ? 0 : "100%" }} transition={{ duration: 0.3, ease: "easeInOut" }}>
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10">
                <span className="font-semibold text-gray-900">Documentation</span>
                <button onClick={() => setMobileSidebar(false)} className="p-2 rounded-sm hover:bg-gray-100"><X className="h-5 w-5 text-gray-500" /></button>
              </div>
              <div className="px-4 py-4 flex flex-col gap-5">
                {NAV_GROUPS.map(({ group, items }) => (
                  <div key={group}>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{group}</div>
                    <div className="flex flex-col gap-0.5 pl-3 border-l-2 border-gray-200">
                      {items.map(({ id, label, href }) => (
                        <Link key={id} href={href} onClick={() => setMobileSidebar(false)}
                          className={cn("text-left px-3 py-2 rounded-sm text-sm transition-colors",
                            activeSection === id ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-500 hover:bg-gray-50"
                          )}>{label}</Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.nav>

            <div className="flex-grow min-w-0 max-w-4xl">{children}</div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/50 backdrop-blur-sm" onClick={() => setSearchOpen(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} transition={{ duration: 0.15 }} className="w-full max-w-xl bg-white rounded-sm shadow-2xl border border-gray-200 overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
                <Search className="h-5 w-5 text-gray-400 shrink-0" />
                <input ref={searchRef} type="text" placeholder="Search documentation..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="flex-grow text-base text-gray-900 placeholder-gray-400 bg-transparent outline-none" />
                <kbd className="px-1.5 py-0.5 rounded-sm bg-gray-100 text-[10px] font-mono text-gray-400">ESC</kbd>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {searchQuery.trim() === "" ? (
                  <div className="px-4 py-8 text-center text-sm text-gray-400">Type to search through the documentation...</div>
                ) : searchResults.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-gray-400">No results found for &ldquo;{searchQuery}&rdquo;</div>
                ) : (
                  <div className="py-2">
                    {searchResults.map((r, i) => (
                      <Link key={i} href={r.href} onClick={() => { setSearchOpen(false); setSearchQuery("") }} className="block px-4 py-2.5 hover:bg-indigo-50 transition-colors">
                        <div className="text-sm font-medium text-gray-900">{r.label}</div>
                        <div className="text-xs text-gray-400">{r.href.replace("/Documentation?section=", " > ")}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
