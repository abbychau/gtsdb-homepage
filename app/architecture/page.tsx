import { Github, Download, HomeIcon, Book, Layers, Server, Database, Cpu, Shield, Zap, ArrowRight, Code } from 'lucide-react'
import Footer from '@/components/Footer'
import Image from 'next/image'
import hamham from '../hamham.png'

export default function ArchitecturePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-1 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-950">
            <Image src={hamham} alt="GTSDB Logo" className="w-14 inline-block mr-2 mb-1" /> GTSDB Architecture
          </h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/Documentation" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                <Book className="h-5 w-5 mr-1" /> Docs
              </a></li>
              <li><a href="https://github.com/abbychau/gtsdb" target='_blank' rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Github className="h-5 w-5" />
              </a></li>
              <li><a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                <HomeIcon className="h-5 w-5" />
              </a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">GTSDB Architecture</h1>
          <p className="text-lg text-gray-600 mb-12">
            GTSDB (Go Time Series Database) uses a WAL-first design philosophy — fundamentally different from traditional databases that rely on WAL + disk blocks. By making the WAL the primary storage, GTSDB minimizes IO and memory usage while maintaining durability.
          </p>

          {/* System Overview */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Layers className="h-6 w-6 text-blue-600" />
              System Overview
            </h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <pre className="text-sm leading-relaxed text-gray-800 font-mono whitespace-pre overflow-x-auto">
{`┌─────────────────────────────────────────────────────────┐
│                      GTSDB Server                        │
│                                                          │
│  ┌──────────────┐              ┌──────────────┐         │
│  │  TCP Server  │              │  HTTP Server │         │
│  │  :5555       │              │  :5556       │         │
│  └──────┬───────┘              └──────┬───────┘         │
│         │                             │                  │
│         └──────────┬──────────────────┘                  │
│                    ▼                                      │
│          ┌─────────────────┐                             │
│          │    Handlers     │  ← auth, routing, validation │
│          └────────┬────────┘                             │
│                   ▼                                       │
│          ┌─────────────────┐                             │
│          │     Buffer      │  ← WAL write, indexing, LRU │
│          └────────┬────────┘                             │
│                   ▼                                       │
│          ┌─────────────────┐                             │
│          │     Fanout      │  ← pub/sub notifications    │
│          └────────┬────────┘                             │
│                   ▼                                       │
│          ┌─────────────────┐                             │
│          │   Concurrent    │  ← Map, Set, LRU, RingBuf   │
│          └─────────────────┘                             │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │                    Disk (SSD)                     │   │
│  │  *.aof (data)    *.idx (index)    users.json     │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘`}
              </pre>
            </div>
          </section>

          {/* Core Components */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Server className="h-6 w-6 text-blue-600" />
              Core Components
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ComponentCard
                icon={<Code className="h-5 w-5" />}
                title="main.go"
                desc="Entry point. Starts TCP + HTTP servers, background compaction, and graceful shutdown via OS signals."
              />
              <ComponentCard
                icon={<Layers className="h-5 w-5" />}
                title="handlers/"
                desc="HTTP (REST + SSE) and TCP protocol handlers. Shared operation logic in common.go. Input validation (timestamp range, key safety)."
              />
              <ComponentCard
                icon={<Database className="h-5 w-5" />}
                title="buffer/"
                desc="Data persistence layer. WAL-first approach: .aof files store 16-byte records (timestamp + value), .idx files provide sparse indexing every 5,000 records. File handle LRU cache prevents OS limit exhaustion. Background compaction removes gaps from deleted data."
              />
              <ComponentCard
                icon={<Zap className="h-5 w-5" />}
                title="fanout/"
                desc="Lock-free publisher-subscriber system for real-time streaming. Consumers subscribe to key updates via SSE (HTTP) or TCP push. Uses atomic pointer swap for zero-allocation pending state."
              />
              <ComponentCard
                icon={<Cpu className="h-5 w-5" />}
                title="concurrent/"
                desc="Custom thread-safe data structures: generic Map[K,V] with RWMutex, generic Set[T], and LRU cache with eviction callback (used to close evicted file handles)."
              />
              <ComponentCard
                icon={<Shield className="h-5 w-5" />}
                title="auth/"
                desc="Token-based authentication with user-key folder isolation. Root user has admin privileges. no_auth_user config option for trusted environments."
              />
            </div>
          </section>

          {/* Data Flow */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <ArrowRight className="h-6 w-6 text-blue-600" />
              Write & Read Path
            </h2>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3 text-green-700">Write Path</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Client sends <code className="bg-gray-100 px-1 rounded">POST /</code> or TCP with JSON payload</li>
                <li><strong>Handlers</strong> validate key (no path traversal), timestamp (2000–2100 range), and auth</li>
                <li><strong>Buffer</strong> writes 16-byte record (int64 timestamp + float64 value) to <code className="bg-gray-100 px-1 rounded">.aof</code> file</li>
                <li>Every 5,000th record triggers an index write to <code className="bg-gray-100 px-1 rounded">.idx</code> file</li>
                <li>File handles are managed by LRU cache (capacity: 700) — evicted handles are automatically closed</li>
                <li><strong>Fanout</strong> notifies all subscribers of the new data point</li>
                <li><strong>fsync</strong> is called after each batch write for durability</li>
              </ol>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Read Path</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Client requests data with time range, last-X, or downsampling parameters</li>
                <li><strong>Handlers</strong> validate parameters and route to buffer layer</li>
                <li><strong>Buffer</strong> first checks in-memory ring buffer for recent data (hot path)</li>
                <li>On cache miss, binary-searches <code className="bg-gray-100 px-1 rounded">.idx</code> file to find the nearest index entry</li>
                <li>Seeks to the offset in <code className="bg-gray-100 px-1 rounded">.aof</code> file and scans forward linearly</li>
                <li>If downsampling requested, aggregates data per interval (avg, sum, min, max, first, last, count, median, p95, p99)</li>
                <li>Results returned as JSON array</li>
              </ol>
            </div>
          </section>

          {/* Storage Format */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Database className="h-6 w-6 text-blue-600" />
              Storage Format
            </h2>
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">AOF File (Append-Only File)</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
{`[int64 timestamp][float64 value][int64 timestamp][float64 value]...
 └── 8 bytes ──┘└── 8 bytes ──┘
 └────────── 16 bytes per record ──────────┘`}
                </pre>
                <p className="text-sm text-gray-600 mt-2">Fixed-size 16-byte records enable O(1) offset calculation and fast seeking.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">IDX File (Sparse Index)</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
{`[int64 timestamp][int64 offset][int64 timestamp][int64 offset]...
 └── 8 bytes ──┘└── 8 bytes ─┘
 └────────── 16 bytes per entry ───────────┘`}
                </pre>
                <p className="text-sm text-gray-600 mt-2">One index entry per 5,000 data records. Maps timestamp → byte offset in AOF file for fast seeking.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">File Naming</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li><code className="bg-gray-100 px-1 rounded">data/root/&lt;key&gt;.aof</code> — data records (user-folder isolated)</li>
                  <li><code className="bg-gray-100 px-1 rounded">data/root/&lt;key&gt;.idx</code> — sparse index</li>
                  <li><code className="bg-gray-100 px-1 rounded">data/users.json</code> — auth user database</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Concurrency Model */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Cpu className="h-6 w-6 text-blue-600" />
              Concurrency Model
            </h2>
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">concurrent.Map[K, V]</h3>
                  <p className="text-sm text-gray-600">Generic concurrent map with RWMutex per operation. Used for idToCountMap, lastValue, lastTimestamp, dataPatchLocks.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">concurrent.Set[T]</h3>
                  <p className="text-sm text-gray-600">Thread-safe generic set. Used for allIds (key registry) and fanout consumers.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">concurrent.LRU[K, V]</h3>
                  <p className="text-sm text-gray-600">LRU cache with eviction callback. Used for file handle management (dataFileHandles + indexFileHandles, capacity 700 each). Evicted handles are closed via callback.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">synchronous.RingBuffer[T]</h3>
                  <p className="text-sm text-gray-600">Fixed-size ring buffer for in-memory caching of recent data points. Provides hot-path reads without disk access.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Compaction */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Zap className="h-6 w-6 text-blue-600" />
              Compaction
            </h2>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Why Compaction Is Needed</h3>
              <p className="text-sm text-gray-600 mb-4">
                GTSDB stores data in append-only <code className="bg-gray-100 px-1 rounded">.aof</code> files. When data points are deleted
                (via <code className="bg-gray-100 px-1 rounded">deleteDataPoint</code> or <code className="bg-gray-100 px-1 rounded">deletekey</code>), the
                records are not physically removed from the AOF file — instead, the entire file is rewritten without the deleted
                records. However, <strong>partial overwrites</strong> (single-point timestamp overwrites) leave the old record
                in place and write a new one elsewhere, creating "holes" of dead space. Over time, these gaps accumulate and waste disk.
              </p>
              <p className="text-sm text-gray-600">
                Compaction solves this by reading <strong>all live data points</strong> and rewriting them into a fresh,
                gap-free file — effectively defragmenting the storage.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Compaction Algorithm (Step by Step)</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">1</span>
                  <div>
                    <strong className="text-sm">Acquire Key-Level Lock</strong>
                    <p className="text-xs text-gray-600 mt-1">Uses the same per-key mutex as <code className="bg-gray-100 px-1 rounded">data-patch</code> to prevent concurrent modifications during compaction.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">2</span>
                  <div>
                    <strong className="text-sm">Read All Live Data Points</strong>
                    <p className="text-xs text-gray-600 mt-1">Scans the entire <code className="bg-gray-100 px-1 rounded">.aof</code> file from start to end, collecting every valid record. This is the source of truth — only data that still exists gets rewritten.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">3</span>
                  <div>
                    <strong className="text-sm">Write to Temporary Files</strong>
                    <p className="text-xs text-gray-600 mt-1">Writes all live data points to <code className="bg-gray-100 px-1 rounded">key.aof.tmp</code> and rebuilds the sparse index in <code className="bg-gray-100 px-1 rounded">key.idx.tmp</code>. Old file handles are closed and removed from the LRU cache. Existing files remain untouched until the rename — crash-safe by design.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">4</span>
                  <div>
                    <strong className="text-sm">Atomic Rename (Two-Phase)</strong>
                    <p className="text-xs text-gray-600 mt-1">
                      <strong>Phase 1:</strong> Rename <code className="bg-gray-100 px-1 rounded">.idx.tmp → .idx</code> (smaller file, less risk).<br />
                      <strong>Phase 2:</strong> Rename <code className="bg-gray-100 px-1 rounded">.aof.tmp → .aof</code>.<br />
                      <strong>Rollback:</strong> If Phase 2 fails, Phase 1 is reversed — old index restored, temp files cleaned up. This guarantees the on-disk state never becomes inconsistent.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">5</span>
                  <div>
                    <strong className="text-sm">Re-open Handles &amp; Update Caches</strong>
                    <p className="text-xs text-gray-600 mt-1">New file handles are re-opened via <code className="bg-gray-100 px-1 rounded">prepareFileHandles</code> and placed in the LRU. <code className="bg-gray-100 px-1 rounded">lastValue</code>, <code className="bg-gray-100 px-1 rounded">lastTimestamp</code>, and <code className="bg-gray-100 px-1 rounded">idToCountMap</code> are updated to reflect the new state. The global <code className="bg-gray-100 px-1 rounded">totalDataPoints</code> counter is adjusted for the difference.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-blue-500">
                <h3 className="font-semibold mb-2">Background Compaction</h3>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Runs automatically every <strong>1 hour</strong></li>
                  <li>Scans all keys via <code className="bg-gray-100 px-1 rounded">GetAllIds()</code></li>
                  <li>Compacts files exceeding <strong>100 MB</strong></li>
                  <li>Respects shutdown signals (clean exit)</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-green-500">
                <h3 className="font-semibold mb-2">Manual Compaction</h3>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Triggered via API: <code className="bg-gray-100 px-1 rounded">{`{"operation":"compact","key":"sensor1"}`}</code></li>
                  <li>Compacts a <strong>single key</strong> on demand</li>
                  <li>Useful after bulk deletes or patching</li>
                  <li>Same atomic algorithm as background</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Background Processes */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Server className="h-6 w-6 text-blue-600" />
              Background Processes
            </h2>
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold">TCP Ping</h3>
                <p className="text-sm text-gray-600">Server sends periodic ping messages to TCP clients to detect disconnection. Uses sync.Once for safe cleanup.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold">Data Migration</h3>
                <p className="text-sm text-gray-600">On startup, migrates existing unprefixed keys into user folders (e.g., "sensor1" → "root/sensor1") for multi-tenant isolation.</p>
              </div>
              <div className="border-l-4 border-amber-500 pl-4">
                <h3 className="font-semibold">Graceful Shutdown</h3>
                <p className="text-sm text-gray-600">HTTP server uses Shutdown() with 10-second timeout. TCP listener closes cleanly. All file handles are synced via FlushRemainingDataPoints().</p>
              </div>
            </div>
          </section>

          {/* Health & Metrics */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Zap className="h-6 w-6 text-blue-600" />
              Observability
            </h2>
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-1">GET /health</h3>
                <p className="text-sm text-gray-600">No-auth health check: status, version, key count.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">GET /metrics</h3>
                <p className="text-sm text-gray-600">Prometheus-format metrics: gtsdb_key_count, gtsdb_data_points_total, gtsdb_uptime_seconds, gtsdb_goroutines, go_memstats_alloc_bytes, go_memstats_heap_inuse_bytes, go_gc_duration_seconds_sum, go_cpu_count.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">POST / (serverinfo)</h3>
                <p className="text-sm text-gray-600">Detailed server info: version, uptime, goroutines, memory, listen addresses, data directory, file handle LRU capacity.</p>
              </div>
            </div>
          </section>

          {/* Key Design Decisions */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Key Design Decisions</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 font-semibold">Decision</th>
                    <th className="text-left py-2 px-3 font-semibold">Rationale</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium text-gray-800">WAL as primary storage</td>
                    <td className="py-2 px-3">Avoids double-write (WAL + data files) of traditional DBs. Reduces IO by 50%.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium text-gray-800">Fixed 16-byte records</td>
                    <td className="py-2 px-3">Enables O(1) random access via byte offset calculation. No need for record delimiters.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium text-gray-800">Sparse index (every 5K)</td>
                    <td className="py-2 px-3">Balances seek speed vs index file size. At most ~80 records to scan linearly after index seek.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium text-gray-800">LRU file handle cache</td>
                    <td className="py-2 px-3">Prevents OS "too many open files" errors. 700 capacity supports hundreds of active keys.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium text-gray-800">Dual protocol (HTTP + TCP)</td>
                    <td className="py-2 px-3">HTTP for web/admin integration. TCP for low-latency IoT/edge device communication.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium text-gray-800">User-folder key isolation</td>
                    <td className="py-2 px-3">Multi-tenant support without complex ACLs. Simple prefix-based access control.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-gray-800">Lock-free fanout</td>
                    <td className="py-2 px-3">Atomic pointer swap for pub/sub pending state. Zero heap allocation per publish.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function ComponentCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-2 mb-2 text-blue-600">
        {icon}
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  )
}
