"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Suspense } from "react"
import { Github, Code, Info, AlertTriangle, Terminal, FileJson, Server, Activity } from "lucide-react"
import { ApiCard, SectionTitle, BinaryFrameSpec } from "./_components/ApiCard"

/* ══════════════════════════════════════════
   Doc Home — introduction & architecture
   ══════════════════════════════════════════ */

function HomeSection() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">What is GTSDB?</h1>
      <p className="text-gray-500 text-lg mb-8">
        A timeseries database that is durable, memory-friendly, and blazing fast —
        built for IoT edge devices, monitoring pipelines, and high-frequency sensor data.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Architecture</h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Most databases layer a write-ahead log (WAL) for durability, a buffer pool for caching, and
        separate index structures for querying. Each layer adds latency and memory overhead.
        GTSDB takes a different approach: <strong>the WAL is the database</strong>. Data goes straight
        from the network socket to a per-key append-only file and into a ring buffer cache — no
        double-writing, no memory amplification. The ring buffer (up to 10,000 slots per key) serves
        recent reads entirely from memory.
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        The read path uses an optional <strong>binary protocol</strong>: each point is a fixed 16-byte
        record (8-byte timestamp + 8-byte float). No parsing, no field names, no reflection overhead.
        A multi-key read of 25,000 points drops from 7&thinsp;ms (JSON) to 260&thinsp;&micro;s (binary).
      </p>

      <p className="text-gray-600 leading-relaxed mb-4">
        A dirty-key async flusher syncs only modified keys to disk, avoiding blanket fsync storms.
        On disk, <strong>Facebook&rsquo;s Gorilla compression</strong> reduces storage ~30&times; vs raw JSON.
        Background compaction runs hourly for files over 100&thinsp;MB. At idle, memory is ~6&thinsp;MB.
        The server ships as a single static binary with zero dependencies.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Ecosystem</h2>

      <div className="space-y-5 mb-8">
        <div>
          <h3 className="font-semibold text-gray-900">gtsdb</h3>
          <p className="text-sm text-gray-500 mt-0.5 mb-1">Core database server — single binary, no dependencies.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <a href="https://github.com/abbychau/gtsdb" className="text-indigo-600 hover:underline">GitHub</a>
            <a href="https://hub.docker.com/r/abbychau/gtsdb" className="text-indigo-600 hover:underline">Docker Hub</a>
            <a href="https://github.com/abbychau/gtsdb/releases" className="text-indigo-600 hover:underline">Releases</a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">gtsdb-drivers</h3>
          <p className="text-sm text-gray-500 mt-0.5 mb-1">Go &amp; Node.js client SDKs — JSON + binary protocol, zero-alloc reads.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <a href="https://github.com/abbychau/gtsdb-drivers" className="text-indigo-600 hover:underline">Repository</a>
            <a href="https://github.com/abbychau/gtsdb-drivers/tree/main/go" className="text-indigo-600 hover:underline">Go driver</a>
            <a href="https://github.com/abbychau/gtsdb-drivers/tree/main/js" className="text-indigo-600 hover:underline">JS driver</a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">gtsdb-admin</h3>
          <p className="text-sm text-gray-500 mt-0.5 mb-1">Web admin dashboard (Next.js + ECharts) with key management, charting, and comparison tools. Also available as an Electron app.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <a href="https://github.com/abbychau/gtsdb-admin" className="text-indigo-600 hover:underline">Repository</a>
            <a href="https://gtsdb-admin.vercel.app/" className="text-indigo-600 hover:underline">Live Demo</a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">gtsdb-benchmark</h3>
          <p className="text-sm text-gray-500 mt-0.5 mb-1">Automated benchmarks vs InfluxDB, VictoriaMetrics, and NSQ — generates visual reports.</p>
          <a href="https://github.com/abbychau/gtsdb-benchmark" className="text-sm text-indigo-600 hover:underline">Repository</a>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">GTSDB Cloud</h3>
          <p className="text-sm text-gray-500 mt-0.5">Multi-tenant cloud-hosted version with user namespaces and token-based access.</p>
        </div>
      </div>

      <hr className="border-gray-200 my-8" />

      <div className="flex flex-wrap gap-3 text-sm">
        <Link href="/Documentation?section=connect" className="text-indigo-600 hover:underline">Connecting</Link>
        <span className="text-gray-300">·</span>
        <Link href="/Documentation?section=auth" className="text-indigo-600 hover:underline">Authentication</Link>
        <span className="text-gray-300">·</span>
        <Link href="/Documentation?section=write" className="text-indigo-600 hover:underline">Write</Link>
        <span className="text-gray-300">·</span>
        <Link href="/Documentation?section=read" className="text-indigo-600 hover:underline">Read</Link>
        <span className="text-gray-300">·</span>
        <Link href="/Documentation?section=binary" className="text-indigo-600 hover:underline">Binary</Link>
        <span className="text-gray-300">·</span>
        <Link href="/Documentation?section=keys" className="text-indigo-600 hover:underline">Keys</Link>
        <span className="text-gray-300">·</span>
        <Link href="/Documentation?section=subscribe" className="text-indigo-600 hover:underline">Subscribe</Link>
        <span className="text-gray-300">·</span>
        <Link href="/Documentation?section=server" className="text-indigo-600 hover:underline">Server</Link>
        <span className="text-gray-300">·</span>
        <a href="https://github.com/abbychau/gtsdb" className="text-indigo-600 hover:underline">GitHub</a>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   Connecting
   ══════════════════════════════════════════ */

function ConnectSection() {
  return (
    <div>
      <SectionTitle>Connecting to GTSDB</SectionTitle>
      <p className="text-gray-600 mb-6">GTSDB speaks two protocols — HTTP and raw TCP. Both accept the same JSON payloads.</p>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">HTTP</h3>
      <p className="text-sm text-gray-500 mb-3">Send JSON via POST to port <strong>5556</strong>.</p>
      <div className="bg-zinc-950 rounded-sm overflow-hidden border border-zinc-800 mb-6">
        <pre className="text-[0.8rem] text-zinc-300 p-4 font-mono leading-relaxed overflow-x-auto">{'curl -X POST http://localhost:5556/ \\\n  -H "Content-Type: application/json" \\\n  -d \'{"operation":"ping"}\''}</pre>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">TCP</h3>
      <p className="text-sm text-gray-500 mb-3">Connect to port <strong>5555</strong> and send newline-delimited JSON.</p>
      <div className="bg-zinc-950 rounded-sm overflow-hidden border border-zinc-800 mb-6">
        <pre className="text-[0.8rem] text-zinc-300 p-4 font-mono leading-relaxed overflow-x-auto">{'echo \'{"operation":"ping"}\' | nc localhost 5555'}</pre>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">Configuration (gtsdb.ini)</h3>
      <p className="text-sm text-gray-500 mb-3">All settings with defaults. Pass a custom path: <code className="bg-gray-100 px-1 rounded-sm text-xs font-mono">./gtsdb myconfig.ini</code></p>
      <div className="bg-zinc-950 rounded-sm overflow-hidden border border-zinc-800 mb-6">
        <pre className="text-[0.78rem] text-zinc-300 p-4 font-mono leading-relaxed overflow-x-auto">{`[listens]
tcp = :5555
http = :5556

[paths]
data = data

[buffer]
# file_handle_lru_capacity = 700
# compaction_compression = true
# sync_mode = async
# sync_interval_ms = 1000
# cache_size = 10000

[auth]
# no_auth_user = tester
# root_token = your-secret-token`}</pre>
      </div>

      <p className="text-sm text-gray-500 italic">
        The HTTP and TCP servers share the same internal logic — only the transport differs.
      </p>
    </div>
  )
}

/* ══════════════════════════════════════════
   Authentication
   ══════════════════════════════════════════ */

function AuthSection() {
  return (
    <div>
      <SectionTitle>Authentication</SectionTitle>
      <p className="text-gray-600 mb-6">
        Every operation (except <code className="bg-gray-100 px-1 rounded-sm text-xs font-mono">/health</code> and{' '}
        <code className="bg-gray-100 px-1 rounded-sm text-xs font-mono">/metrics</code>) requires a valid token.
      </p>

      <p className="text-sm text-gray-500 mb-6">
        <strong>Transport difference:</strong> HTTP uses the{' '}
        <code className="bg-gray-100 px-1 rounded-sm text-xs font-mono">Authorization: Bearer &lt;token&gt;</code> header.
        TCP sends <code className="bg-gray-100 px-1 rounded-sm text-xs font-mono">{"{"}operation: "auth", key: "&lt;token&gt;"{"}"}</code>{' '}
        as the first JSON message.
      </p>

      <h3 className="text-lg font-semibold text-gray-900 mb-3">How it works</h3>

      <ol className="list-decimal list-inside space-y-3 text-sm text-gray-600 mb-6">
        <li>
          <strong className="text-gray-900">Start the server.</strong> If no auth is configured, GTSDB prints a one-time root token to stdout.
          Save it securely.
        </li>
        <li>
          <strong className="text-gray-900">Authenticate.</strong> Send your token with every request (HTTP header or TCP auth message).
        </li>
        <li>
          <strong className="text-gray-900">Proceed.</strong> The connection stays authorized for all subsequent operations.
        </li>
      </ol>

      <h3 className="text-lg font-semibold text-gray-900 mb-3">Configuration methods</h3>

      <div className="space-y-3 mb-6">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">Environment variable</p>
          <div className="bg-zinc-950 rounded-sm overflow-hidden border border-zinc-800">
            <pre className="text-[0.8rem] text-zinc-300 p-3 font-mono">NO_AUTH_USER=tester ./gtsdb</pre>
          </div>
          <p className="text-xs text-gray-400 mt-1">Skips auth — useful for development.</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">Config file (gtsdb.ini)</p>
          <div className="bg-zinc-950 rounded-sm overflow-hidden border border-zinc-800">
            <pre className="text-[0.8rem] text-zinc-300 p-3 font-mono">{`# no_auth_user = tester\n# root_token = your-secret-token`}</pre>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Uncomment the desired option. If both <code className="bg-gray-100 px-1 rounded-sm text-xs font-mono">root_token</code>
            {' '}and auto-generated token exist, the INI value takes precedence.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   Operations — lean cards only for API payloads
   ══════════════════════════════════════════ */

function WriteSection() {
  return (
    <div>
      <SectionTitle>Write Single Value</SectionTitle>
      <p className="text-gray-600 mb-6">Write a data point for a specific sensor. Timestamp can be omitted to use the current server time.</p>
      <ApiCard title="Write" description="Append one data point. Timestamps must be in range 2000-2100." transport="both"
        requestBody={{ operation: "write", key: "a_sensor1", write: { value: 3224242424333.3333 } }}
        responseBody={{ success: true, message: "Data point stored" }} />
      <ApiCard title="Write with Timestamp" description="Optionally provide a Unix timestamp (seconds)." transport="both"
        requestBody={{ operation: "write", key: "temp_sensor", write: { value: 23.5, timestamp: 1717965210 } }}
        responseBody={{ success: true, message: "Data point stored" }} />
    </div>
  )
}

function BatchWriteSection() {
  return (
    <div>
      <SectionTitle>Batch Write</SectionTitle>
      <p className="text-gray-600 mb-6">Write multiple data points across different keys in a single request. Max <strong>10,000 points</strong> per batch.</p>
      <ApiCard title="Batch Write" description="Mix any keys and timestamps. All or nothing." transport="both"
        requestBody={{ operation: "batch-write", points: [{ key: "sensor1", value: 42.5, timestamp: 1717965210 }, { key: "sensor1", value: 43.1, timestamp: 1717965211 }, { key: "sensor2", value: 99.9, timestamp: 1717965210 }] }}
        responseBody={{ success: true, message: "Stored 3 data points" }} />
    </div>
  )
}

function PatchSection() {
  return (
    <div>
      <SectionTitle>Patch Data Points</SectionTitle>
      <p className="text-gray-600 mb-6">Update or insert multiple data points for a specific sensor using CSV or JSON array format.</p>
      <ApiCard title="Patch via CSV" description="Each line is timestamp,value." transport="both"
        requestBody={{ operation: "data-patch", key: "sensor1", data: "1717965210,123.45\n1717965211,123.46" }}
        responseBody={{ success: true, message: "Patched 2 data points" }} />
      <ApiCard title="Patch via JSON" description="JSON array format." transport="both"
        requestBody={{ operation: "data-patch", key: "sensor1", data: '[{"timestamp":1717965210,"value":123.45},{"timestamp":1717965211,"value":123.46}]' }}
        responseBody={{ success: true, message: "Patched 2 data points" }} />
    </div>
  )
}

function ReadSection() {
  return (
    <div>
      <SectionTitle>Read with Time Range</SectionTitle>
      <p className="text-gray-600 mb-6">Query data within a time range with optional downsampling and aggregation.</p>
      <ApiCard title="Read with Downsampling" description="Aggregations: avg (default), sum, min, max, first, last, count, p50, p95, p99." transport="both"
        requestBody={{ operation: "read", key: "a_sensor1", read: { start_timestamp: 1717965210, end_timestamp: 1717965211, downsampling: 3, aggregation: "avg" } }}
        responseBody={{ success: true, data: [{ timestamp: 1717965210, value: 123.45 }, { timestamp: 1717965211, value: 123.46 }] }} />
    </div>
  )
}

function ReadLastSection() {
  return (
    <div>
      <SectionTitle>Read Last X Records</SectionTitle>
      <p className="text-gray-600 mb-6">Fetch the most recent N records — no timestamp needed.</p>
      <ApiCard title="Read Last N" description="Fastest read path." transport="both"
        requestBody={{ operation: "read", key: "a_sensor1", read: { lastx: 5 } }}
        responseBody={{ success: true, data: [{ timestamp: 1717965211, value: 123.46 }, { timestamp: 1717965210, value: 123.45 }] }} />
    </div>
  )
}

function MultiReadSection() {
  return (
    <div>
      <SectionTitle>Multi-Read</SectionTitle>
      <p className="text-gray-600 mb-6">Query multiple sensors at once. Response key is <code className="bg-gray-100 px-1 rounded-sm text-xs font-mono">multi_data</code> (not <code className="bg-gray-100 px-1 rounded-sm text-xs font-mono">data</code>).</p>
      <ApiCard title="Multi-Read with Range" description="Read several keys with a shared time range." transport="both"
        requestBody={{ operation: "multi-read", keys: ["sensor1", "sensor2"], read: { start_timestamp: 1717965210, end_timestamp: 1717965211, downsampling: 3 } }} />
      <ApiCard title="Multi-Read Last X" description="Last N records from each key." transport="both"
        requestBody={{ operation: "multi-read", keys: ["sensor1", "sensor2"], read: { lastx: 100 } }} />
    </div>
  )
}

function ExportSection() {
  return (
    <div>
      <SectionTitle>Export Data</SectionTitle>
      <p className="text-gray-600 mb-6">Export data as CSV or JSON for external tools.</p>
      <ApiCard title="Export CSV" description="CSV with headers: key,timestamp,value." transport="both"
        requestBody={{ operation: "export", key: "sensor1", export: { format: "csv", lastx: 100 } }}
        responseBody={{ success: true, data: "key,timestamp,value\nsensor1,1717965210,42.50\n" }} />
      <ApiCard title="Export with Time Range" description="Filter by time range." transport="both"
        requestBody={{ operation: "export", key: "sensor1", export: { format: "csv", start_timestamp: 1717965210, end_timestamp: 1717965211 } }}
        responseBody={{ success: true, data: "key,timestamp,value\nsensor1,1717965210,42.50\n" }} />
    </div>
  )
}

function SubscribeSection() {
  return (
    <div>
      <SectionTitle>Subscribe</SectionTitle>
      <p className="text-gray-600 mb-6">HTTP returns SSE (text/event-stream). TCP returns newline-delimited JSON.</p>
      <ApiCard title="Subscribe" description="Receive real-time updates when a sensor gets new data." transport="both"
        requestBody={{ operation: "subscribe", key: "sensor1" }} />
    </div>
  )
}

function UnsubscribeSection() {
  return (
    <div>
      <SectionTitle>Unsubscribe</SectionTitle>
      <p className="text-gray-600 mb-6">Stop receiving push notifications.</p>
      <ApiCard title="Unsubscribe" description="Unsubscribe from a key." transport="both"
        requestBody={{ operation: "unsubscribe", key: "sensor1" }} />
    </div>
  )
}

function UsersSection() {
  return (
    <div>
      <SectionTitle>User Management</SectionTitle>
      <p className="text-gray-600 mb-6">Create and manage users. Root access required.</p>
      <ApiCard title="Create User" description="Returns a generated token." transport="both"
        requestBody={{ operation: "adduser", key: "new-username" }}
        responseBody={{ success: true, data: { name: "new-username", token: "gtsdb_generated_token" } }} />
      <ApiCard title="Reset Token" description="Generate a new token for an existing user." transport="both"
        requestBody={{ operation: "resetkey", key: "username" }}
        responseBody={{ success: true, data: { token: "new_generated_token" } }} />
    </div>
  )
}

function KeysSection() {
  return (
    <div>
      <SectionTitle>Key Management</SectionTitle>
      <p className="text-gray-600 mb-6">List, create, rename, and manage sensor keys.</p>
      <ApiCard title="Get All Keys" description="List every sensor key." transport="both" requestBody={{ operation: "ids" }} responseBody={{ success: true, data: ["sensor1", "sensor2"] }} />
      <ApiCard title="Get Keys with Count" description="Include data point counts." transport="both" requestBody={{ operation: "idswithcount" }} responseBody={{ success: true, data: [{ key: "sensor1", count: 1500 }, { key: "sensor2", count: 320 }] }} />
      <ApiCard title="Initialize Key" description="Pre-create a key (usually automatic on first write)." transport="both" requestBody={{ operation: "initkey", key: "new_sensor" }} responseBody={{ success: true, message: "Key initialized" }} />
      <ApiCard title="Rename Key" description="Validated against path traversal. The target field is <code>tokey</code> (all lowercase)." transport="both" requestBody={{ operation: "renamekey", key: "old_name", tokey: "new_name" }} responseBody={{ success: true, message: "Key renamed" }} />
      <ApiCard title="Reload Key" description="Reload from disk after manual file changes." transport="both" requestBody={{ operation: "reloadkey", key: "sensor1" }} responseBody={{ success: true, message: "Key reloaded" }} />
    </div>
  )
}

function CompactSection() {
  return (
    <div>
      <SectionTitle>Compact &amp; Delete</SectionTitle>
      <p className="text-gray-600 mb-6">Delete data and reclaim disk space.</p>
      <ApiCard title="Delete Data Points" description="Remove points by value condition (operators: {'>'}, {'<'}) and/or time range." transport="both"
        requestBody={{ operation: "deleteDataPoint", key: "sensor1", payload: { operator: ">", value: 100.0, timestampFrom: 1717965210, timestampTo: 1717965300 } }}
        responseBody={{ success: true, message: "Removed 5 data points and patched data" }} />
      <ApiCard title="Delete Key" description="Permanently delete a key and all its data." transport="both"
        requestBody={{ operation: "deletekey", key: "sensor_to_delete" }}
        responseBody={{ success: true, message: "Key deleted" }} />
      <ApiCard title="Compact Key" description="Compact WAL files to reclaim space. Gorilla compression when enabled." transport="both"
        requestBody={{ operation: "compact", key: "sensor1" }}
        responseBody={{ success: true, message: "Key compacted" }} />
    </div>
  )
}

function ServerSection() {
  return (
    <div>
      <SectionTitle>Server Info</SectionTitle>
      <p className="text-gray-600 mb-6">Get detailed server status and configuration.</p>
      <ApiCard title="Server Info" description="Version, uptime, memory, goroutines, listen addresses." transport="both"
        requestBody={{ operation: "serverinfo" }}
        responseBody={{ success: true, data: { version: "1.0", key_count: 42, health: "ok", uptime_seconds: 3600, memory_alloc_mb: 12.5, memory_total_mb: 25.0, listen_tcp: ":5555", listen_http: ":5556", data_dir: "./data", num_cpu: 4, goroutines: 12, file_handle_lru: 700 } }} />
    </div>
  )
}

function HealthSection() {
  return (
    <div>
      <SectionTitle>Health Check</SectionTitle>
      <p className="text-gray-600 mb-6">No authentication required. Returns service status.</p>
      <p className="text-sm text-gray-500 mb-6">
        <code className="bg-gray-100 px-1 rounded-sm text-xs font-mono">/health</code> is an HTTP GET endpoint — open{' '}
        <code className="bg-gray-100 px-1 rounded-sm text-xs font-mono">http://localhost:5556/health</code> in your browser or use curl.
      </p>
      <ApiCard title="Health" description="HTTP-only GET endpoint." transport="http"
        responseBody={{ status: "ok", service: "gtsdb", version: "1.0", keyCount: 42 }} />
    </div>
  )
}

function MetricsSection() {
  return (
    <div>
      <SectionTitle>Prometheus Metrics</SectionTitle>
      <p className="text-gray-600 mb-6">No authentication required. Returns Prometheus exposition format.</p>
      <p className="text-sm text-gray-500 mb-6">
        <code className="bg-gray-100 px-1 rounded-sm text-xs font-mono">/metrics</code> is an HTTP GET endpoint exposing{' '}
        <code className="bg-gray-100 px-1 rounded-sm text-xs font-mono">gtsdb_key_count</code>,{' '}
        <code className="bg-gray-100 px-1 rounded-sm text-xs font-mono">gtsdb_data_points_total</code>,{' '}
        <code className="bg-gray-100 px-1 rounded-sm text-xs font-mono">gtsdb_uptime_seconds</code>, and Go runtime metrics.
      </p>
    </div>
  )
}

function OtherSection() {
  return (
    <div>
      <SectionTitle>Flush &amp; Ping</SectionTitle>
      <ApiCard title="Flush" description="Force all buffered data to disk." transport="both"
        requestBody={{ operation: "flush" }}
        responseBody={{ success: true, message: "Data flushed" }} />
      <ApiCard title="Ping" description="Server keepalive — lightweight connection check." transport="both"
        requestBody={{ operation: "ping" }}
        responseBody={{ success: true, message: "ping" }} />
    </div>
  )
}

function BinarySection() {
  return (
    <div>
      <SectionTitle>Binary Protocol</SectionTitle>
      <p className="text-gray-600 mb-6">
        Replaces JSON with a compact 16-byte-per-point frame. Each point = 8 bytes (int64 timestamp) + 8 bytes (float64 value).
        Add <code className="bg-gray-100 px-1 rounded-sm text-xs font-mono">"response_format":"binary"</code> to any read.
        <strong> ~27&times; faster</strong> than JSON for bulk reads.
      </p>
      <ApiCard title="Binary Read" description="Add response_format for compact binary output." transport="tcp"
        requestBody={{ operation: "read", key: "sensor1", read: { lastx: 5000 }, response_format: "binary" }} />
      <ApiCard title="Binary Multi-Read" description="Works with multi-read." transport="tcp"
        requestBody={{ operation: "multi-read", keys: ["s1", "s2"], read: { lastx: 5000 }, response_format: "binary" }} />
      <ApiCard title="Count-Only" description="Point counts per key (uses <code>data</code> key, not <code>multi_data</code>)." transport="both"
        requestBody={{ operation: "multi-read", keys: ["s1", "s2"], read: { lastx: 5000, count_only: true } }}
        responseBody={{ success: true, data: { s1: 5000, s2: 5000 } }} />
      <BinaryFrameSpec />

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Prefer using a driver</h3>
        <p className="text-sm text-gray-500 mb-3">
          The official Go and Node.js drivers handle encoding, decoding, auth, and reconnection automatically.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <a href="https://github.com/abbychau/gtsdb-drivers/tree/main/go" className="text-indigo-600 hover:underline">Go driver →</a>
          <a href="https://github.com/abbychau/gtsdb-drivers/tree/main/js" className="text-indigo-600 hover:underline">Node.js driver →</a>
          <a href="https://github.com/abbychau/gtsdb-drivers" className="text-indigo-600 hover:underline">Repository →</a>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   Router
   ══════════════════════════════════════════ */

function DocsContent() {
  const searchParams = useSearchParams()
  const section = searchParams.get("section")
  switch (section) {
    case "connect": return <ConnectSection />
    case "auth": return <AuthSection />
    case "write": return <WriteSection />
    case "batch-write": return <BatchWriteSection />
    case "patch": return <PatchSection />
    case "read": return <ReadSection />
    case "read-last": return <ReadLastSection />
    case "multi-read": return <MultiReadSection />
    case "export": return <ExportSection />
    case "binary": return <BinarySection />
    case "subscribe": return <SubscribeSection />
    case "unsubscribe": return <UnsubscribeSection />
    case "users": return <UsersSection />
    case "keys": return <KeysSection />
    case "compact": return <CompactSection />
    case "server": return <ServerSection />
    case "health": return <HealthSection />
    case "metrics": return <MetricsSection />
    case "other": return <OtherSection />
    default: return <HomeSection />
  }
}

export default function DocsPage() {
  return (
    <Suspense fallback={<div className="text-gray-400 text-sm p-8">Loading…</div>}>
      <DocsContent />
    </Suspense>
  )
}
