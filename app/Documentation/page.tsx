"use client"

import { Github, Download, HomeIcon, Copy, Check } from 'lucide-react'
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Edit, BookOpen, Bell, Key, MoreHorizontal } from 'lucide-react'
import Footer from '@/components/Footer'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import oldHamham from '../oldHamham.png'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Image src={oldHamham} alt="GTSDB" className="w-10 inline-block" /> Documentation
          </h1>
          <nav>
            <ul className="flex space-x-6 text-sm text-zinc-400">
              <li><a href="https://github.com/abbychau/gtsdb" target='_blank' rel="noopener noreferrer" className="hover:text-zinc-200 transition-colors"><Github className="h-4 w-4" /></a></li>
              <li><a href="https://github.com/abbychau/gtsdb/releases" target='_blank' rel="noopener noreferrer" className="hover:text-zinc-200 transition-colors"><Download className="h-4 w-4" /></a></li>
              <li><a href="/" className="hover:text-zinc-200 transition-colors"><HomeIcon className="h-4 w-4" /></a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <DocumentationPage />
        </div>
      </main>
      <Footer />
    </div>
  )
}
function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("write-single")
  const sectionRefs = {
    'auth': useRef<HTMLDivElement>(null),
    'adduser': useRef<HTMLDivElement>(null),
    'write-single': useRef<HTMLDivElement>(null),
    'write-batch': useRef<HTMLDivElement>(null),
    'patch': useRef<HTMLDivElement>(null),
    'read-range': useRef<HTMLDivElement>(null),
    'read-last': useRef<HTMLDivElement>(null),
    'read-multi-range': useRef<HTMLDivElement>(null),
    'read-multi-last': useRef<HTMLDivElement>(null),
    'binary-protocol': useRef<HTMLDivElement>(null),
    'export': useRef<HTMLDivElement>(null),
    'subscribe': useRef<HTMLDivElement>(null),
    'unsubscribe': useRef<HTMLDivElement>(null),
    'keys-get': useRef<HTMLDivElement>(null),
    'keys-get-with-count': useRef<HTMLDivElement>(null),
    'keys-init': useRef<HTMLDivElement>(null),
    'keys-rename': useRef<HTMLDivElement>(null),
    'keys-delete': useRef<HTMLDivElement>(null),
    'keys-reload': useRef<HTMLDivElement>(null),
    'delete-datapoint': useRef<HTMLDivElement>(null),
    'compact': useRef<HTMLDivElement>(null),
    'serverinfo': useRef<HTMLDivElement>(null),
    'health': useRef<HTMLDivElement>(null),
    'metrics': useRef<HTMLDivElement>(null),
    'flush': useRef<HTMLDivElement>(null),
    'ping': useRef<HTMLDivElement>(null),
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    Object.values(sectionRefs).forEach(
      (ref) => ref.current && observer.observe(ref.current)
    )

    return () => observer.disconnect()
  })

  type SectionId = keyof typeof sectionRefs;

  const scrollToSection = (sectionId: SectionId) => {
    sectionRefs[sectionId]?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const navigationItems = [
    {
      group: 'Write Operations',
      icon: <Edit className="h-5 w-5" />,
      items: [
        { id: 'write-single' as SectionId, label: 'Write Single Value' },
        { id: 'write-batch' as SectionId, label: 'Batch Write' },
        { id: 'patch' as SectionId, label: 'Patch Multiple Values' },
      ]
    },
    {
      group: 'Read Operations',
      icon: <BookOpen className="h-5 w-5" />,
      items: [
        { id: 'read-range' as SectionId, label: 'Read Time Range' },
        { id: 'read-last' as SectionId, label: 'Read Last X' },
        { id: 'read-multi-range' as SectionId, label: 'Multi-Read Range' },
        { id: 'read-multi-last' as SectionId, label: 'Multi-Read Last X' },
        { id: 'binary-protocol' as SectionId, label: 'Binary Protocol' },
        { id: 'export' as SectionId, label: 'Export Data' },
      ]
    },
    {
      group: 'Subscribe Operations',
      icon: <Bell className="h-5 w-5" />,
      items: [
        { id: 'subscribe' as SectionId, label: 'Subscribe' },
        { id: 'unsubscribe' as SectionId, label: 'Unsubscribe' },
      ]
    },
    {
      group: 'Key Operations',
      icon: <Key className="h-5 w-5" />,
      items: [
        { id: 'adduser' as SectionId, label: 'Add User / Reset Token' },
        { id: 'keys-get' as SectionId, label: 'Get All Keys' },
        { id: 'keys-get-with-count' as SectionId, label: 'Get Keys with Count' },
        { id: 'keys-init' as SectionId, label: 'Initialize Key' },
        { id: 'keys-rename' as SectionId, label: 'Rename Key' },
        { id: 'keys-delete' as SectionId, label: 'Delete Key' },
        { id: 'keys-reload' as SectionId, label: 'Reload Key' },
        { id: 'delete-datapoint' as SectionId, label: 'Delete Data Points' },
        { id: 'compact' as SectionId, label: 'Compact Key' },
      ]
    },
    {
      group: 'Server & Monitoring',
      icon: <MoreHorizontal className="h-5 w-5" />,
      items: [
        { id: 'serverinfo' as SectionId, label: 'Server Info' },
        { id: 'health' as SectionId, label: 'Health Check' },
        { id: 'metrics' as SectionId, label: 'Metrics (Prometheus)' },
        { id: 'flush' as SectionId, label: 'Flush Data' },
        { id: 'ping' as SectionId, label: 'Ping' },
      ]
    },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-4xl font-bold mb-8">GTSDB API Documentation</h1>

        <div className="mb-8 p-4 bg-blue-950/20 border border-blue-900/50 rounded-lg text-sm text-zinc-300">
          <p className="font-medium mb-2">Authentication</p>
          <p>All operations (except <code className="bg-zinc-700 px-1 rounded text-xs">/health</code> and <code className="bg-zinc-700 px-1 rounded text-xs">/metrics</code>) require a valid token. Authenticate first:</p>
          <pre className="bg-zinc-900 border border-zinc-800 text-zinc-300 p-3 rounded text-xs mt-2 overflow-x-auto">
            <code>{'{"operation":"auth","key":"your-token"}\n\n// Or skip auth in dev:\n//   NO_AUTH_USER=tester  (env var)\n//   no_auth_user = tester  (gtsdb.ini)'}</code>
          </pre>
        </div>

        <div className="mb-8 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg text-sm text-zinc-400">
          <p><strong className="text-zinc-200">Binary Protocol</strong> — Add <code className="bg-zinc-700 px-1 rounded text-xs">"response_format":"binary"</code> to any <code className="bg-zinc-700 px-1 rounded text-xs">read</code> or <code className="bg-zinc-700 px-1 rounded text-xs">multi-read</code> request to receive a compact 16-byte-per-point binary frame instead of JSON. See <a href="#binary-protocol" className="text-blue-400 hover:underline">binary frame spec</a>.</p>
        </div>

        <p className="text-zinc-400 mb-8 text-sm">
          All payloads are JSON. Endpoints: <code className="bg-zinc-700 px-1 rounded text-xs">POST /</code> (HTTP) or raw TCP on port <code className="bg-zinc-700 px-1 rounded text-xs">5555</code>.
        </p>

        <div className="flex flex-col md:flex-row gap-8">
          <nav className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-16 flex flex-col space-y-6 max-h-[calc(100vh-5rem)] overflow-y-auto pr-2">
              {navigationItems.map(({ group, icon, items }) => (
                <div key={group} className="space-y-2">
                  <div className="font-semibold flex items-center text-zinc-300">
                    {icon}
                    <span className="ml-2">{group}</span>
                  </div>
                  <div className="flex flex-col space-y-1 pl-7">
                    {items.map(({ id, label }) => (
                      <button
                        key={id}
                        onClick={() => scrollToSection(id)}
                        className={cn(
                          "text-left px-3 py-1.5 rounded-md text-sm transition-colors",
                          "hover:bg-zinc-800 hover:text-zinc-200",
                          activeSection === id ? "bg-zinc-700 text-zinc-200" : "text-zinc-400"
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </nav>

          <div className="flex-grow">
            {/* Write Operations */}
            <div ref={sectionRefs['write-single']} id="write-single">
              <h2 className="text-2xl font-bold mb-6">Write Operations</h2>
              <ApiEndpoint
                title="Write Single Value"
                description="Write a new data point for a specific sensor. Timestamp can be omitted to use the current server time. Timestamps are validated to be within the range 2000-2100."
                endpoint="POST /"
                requestBody={{
                  operation: "write",
                  key: "a_sensor1",
                  write: {
                    value: 3224242424333.3333
                  }
                }}
                responseBody={{ success: true, message: "Data point stored" }}
              />
            </div>

            {/* Batch Write */}
            <div ref={sectionRefs['write-batch']} id="write-batch">
              <ApiEndpoint
                title="Batch Write"
                description="Write multiple data points across different keys in a single request. Maximum 10,000 points per batch."
                endpoint="POST /"
                requestBody={{
                  operation: "batch-write",
                  points: [
                    { key: "sensor1", value: 42.5, timestamp: 1717965210 },
                    { key: "sensor1", value: 43.1, timestamp: 1717965211 },
                    { key: "sensor2", value: 99.9, timestamp: 1717965210 }
                  ]
                }}
                responseBody={{ success: true, message: "Stored 3 data points" }}
              />
            </div>

            {/* Patch Operations */}
            <div ref={sectionRefs['patch']} id="patch">
              <h2 className="text-2xl font-bold mb-6">Patch Operations</h2>
              <ApiEndpoint
                title="Patch Data Points"
                description='Update or insert multiple data points for a specific sensor using CSV or JSON array format. Supports both timestamp,value CSV lines and [{"timestamp":...,"value":...}] JSON arrays.'
                endpoint="POST /"
                requestBody={{
                  operation: "data-patch",
                  key: "sensor1",
                  data: "1717965210,123.45\n1717965211,123.46\n1717965212,123.47"
                }}
                responseBody={{ success: true, message: "Patched 13 data points" }}
              />
            </div>

            {/* Read Operations */}
            <div ref={sectionRefs['read-range']} id="read-range">
              <h2 className="text-2xl font-bold mb-6">Read Operations</h2>
              <ApiEndpoint
                title="Read Data with Time Range and Downsampling"
                description="Read data for a specific sensor within a time range with downsampling. Supported aggregation types: avg (default), sum, min, max, first, last, count, median/p50, p95, p99. Timestamps are validated to be within the range 2000-2100."
                endpoint="POST /"
                requestBody={{
                  operation: "read",
                  key: "a_sensor1",
                  read: {
                    start_timestamp: 1717965210,
                    end_timestamp: 1717965211,
                    downsampling: 3,
                    aggregation: "avg"
                  }
                }}
                responseBody={{
                  success: true, data: [
                    { timestamp: 1717965210, value: 123.45 },
                    { timestamp: 1717965211, value: 123.46 }
                  ]
                }}
              />
            </div>
            <div ref={sectionRefs['read-last']} id="read-last">
              <ApiEndpoint
                title="Read Last X Records"
                description="Read the last X records for a specific sensor."
                endpoint="POST /"
                requestBody={{
                  operation: "read",
                  key: "a_sensor1",
                  Read: {
                    lastx: 1
                  }
                }}
                responseBody={{
                  success: true, data: [
                    { timestamp: 1717965211, value: 123.46 }
                  ]
                }}
              />
            </div>
            <div ref={sectionRefs['read-multi-range']} id="read-multi-range">
              <ApiEndpoint
                title="Multi-Read Data with Time Range"
                description="Read data from multiple sensors within a time range with downsampling."
                endpoint="POST /"
                requestBody={{
                  operation: "multi-read",
                  keys: ["sensor1", "sensor2", "sensor3"],
                  read: {
                    start_timestamp: 1717965210,
                    end_timestamp: 1717965211,
                    downsampling: 3
                  }
                }}
              />
            </div>
            <div ref={sectionRefs['read-multi-last']} id="read-multi-last">
              <ApiEndpoint
                title="Multi-Read Last X Records"
                description="Read the last X records from multiple sensors."
                endpoint="POST /"
                requestBody={{
                  operation: "multi-read",
                  keys: ["sensor1", "sensor2", "sensor3"],
                  read: {
                    lastx: 1
                  }
                }}
              />
            </div>

            {/* Binary Protocol */}
            <div ref={sectionRefs['binary-protocol']} id="binary-protocol">
              <h2 className="text-2xl font-bold mb-6">Binary Protocol</h2>
              <ApiEndpoint
                title="Binary Response Format"
                description="Opt into a compact binary response for read operations by adding response_format: binary. The response uses a 4-byte length-prefixed frame. Each data point is 16 bytes (8-byte timestamp + 8-byte IEEE 754 float64). Significantly faster than JSON for bulk reads."
                endpoint="POST /"
                requestBody={{
                  operation: "read",
                  key: "sensor1",
                  read: { lastx: 5000 },
                  response_format: "binary"
                }}
              />
              <ApiEndpoint
                title="Binary Multi-Read"
                description="Binary protocol also works with multi-read for maximum throughput when querying multiple keys."
                endpoint="POST /"
                requestBody={{
                  operation: "multi-read",
                  keys: ["sensor1", "sensor2"],
                  read: { lastx: 5000 },
                  response_format: "binary"
                }}
              />
              <ApiEndpoint
                title="Count-Only Mode"
                description="For multi-read, add count_only: true to get only data point counts per key. Response is a compact JSON object with key:count pairs — ideal for dashboards."
                endpoint="POST /"
                requestBody={{
                  operation: "multi-read",
                  keys: ["sensor1", "sensor2"],
                  read: { lastx: 5000, count_only: true }
                }}
                responseBody={{ success: true, data: { sensor1: 5000, sensor2: 5000 } }}
              />
              <div className="mb-8 p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Binary Frame Format</h3>
                <p className="text-zinc-400 text-sm mb-4">Each binary response is a single TCP frame:</p>
                <pre className="bg-zinc-950 border border-zinc-800 text-zinc-300 p-4 rounded-lg text-xs overflow-x-auto">
                  <code>{`[4 bytes] frame length (uint32 BE)
  [4 bytes] key count (uint32 BE)
  For each key:
    [2 bytes] key length (uint16 BE)
    [N bytes] key (UTF-8)
    [4 bytes] point count (uint32 BE)
    For each point:
      [8 bytes] timestamp (int64 BE)
      [8 bytes] value (float64 IEEE 754 BE)`}</code>
                </pre>
              </div>
            </div>

            {/* Export */}
            <div ref={sectionRefs['export']} id="export">
              <ApiEndpoint
                title="Export Data"
                description="Export sensor data in CSV or JSON format. Supports time range filtering, last X records, and downsampling."
                endpoint="POST /"
                requestBody={{
                  operation: "export",
                  key: "sensor1",
                  export: {
                    format: "csv",
                    start_timestamp: 1717965210,
                    end_timestamp: 1717965211
                  }
                }}
                responseBody={{ success: true, data: "key,timestamp,value\nsensor1,1717965210,42.50\nsensor1,1717965211,43.10\n" }}
              />
            </div>

            {/* Subscribe Operations */}
            <div ref={sectionRefs['subscribe']} id="subscribe">
              <h2 className="text-2xl font-bold mb-6">Subscribe Operations</h2>
              <ApiEndpoint
                title="Subscribe to a Key"
                description="Subscribe to updates for a specific sensor."
                endpoint="POST /"
                requestBody={{
                  operation: "subscribe",
                  key: "sensor1"
                }}
                responseBody={{ success: true, message: "Subscribed to sensor1" }}
              />
            </div>
            <div ref={sectionRefs['unsubscribe']} id="unsubscribe">
              <ApiEndpoint
                title="Unsubscribe from a Key"
                description="Unsubscribe from updates for a specific sensor."
                endpoint="POST /"
                requestBody={{
                  operation: "unsubscribe",
                  key: "sensor1"
                }}
                responseBody={{ success: true, message: "Unsubscribed from sensor1" }}
              />
            </div>

            <div ref={sectionRefs['adduser']} id="adduser">
              <h2 className="text-2xl font-bold mb-6">User Management</h2>
              <ApiEndpoint
                title="Create User"
                description="Create a new user (root only). Returns the user's token."
                endpoint="POST /"
                requestBody={{ operation: "adduser", key: "new-username" }}
                responseBody={{ success: true, data: { name: "new-username", token: "generated-token" } }}
              />
              <ApiEndpoint
                title="Reset User Token"
                description="Reset a user's token (root only)."
                endpoint="POST /"
                requestBody={{ operation: "resetkey", key: "username" }}
                responseBody={{ success: true, data: { token: "new-token" } }}
              />
            </div>

            {/* Key Operations */}
            <div ref={sectionRefs['keys-get']} id="keys-get">
              <h2 className="text-2xl font-bold mb-6">Key Operations</h2>
              <ApiEndpoint
                title="Get All Keys"
                description="Retrieve a list of all sensor keys in the database."
                endpoint="POST /"
                requestBody={{
                  operation: "ids"
                }}
                responseBody={{ success: true, data: ["sensor1", "sensor2", "sensor3"] }}
              />
            </div>
            <div ref={sectionRefs['keys-get-with-count']} id="keys-get-with-count">
              <ApiEndpoint
                title="Get All Keys with Data Point Count"
                description="Retrieve all sensor keys along with their data point counts."
                endpoint="POST /"
                requestBody={{
                  operation: "idswithcount"
                }}
                responseBody={{ success: true, data: [{ key: "sensor1", count: 1500 }, { key: "sensor2", count: 320 }] }}
              />
            </div>
            <div ref={sectionRefs['keys-init']} id="keys-init">
              <ApiEndpoint
                title="Initialize a New Key"
                description="Initialize a new sensor key in the database."
                endpoint="POST /"
                requestBody={{
                  operation: "initkey",
                  key: "new_sensor"
                }}
                responseBody={{ success: true, message: "Key initialized: new_sensor" }}
              />
            </div>
            <div ref={sectionRefs['keys-rename']} id="keys-rename">
              <ApiEndpoint
                title="Rename a Key"
                description="Rename an existing sensor key in the database. Key names are validated to prevent path traversal and unsafe characters."
                endpoint="POST /"
                requestBody={{
                  operation: "renamekey",
                  key: "old_sensor_name",
                  toKey: "new_sensor_name"
                }}
                responseBody={{ success: true, message: "Key renamed: old_sensor_name -> new_sensor_name" }}
              />
            </div>
            <div ref={sectionRefs['keys-delete']} id="keys-delete">
              <ApiEndpoint
                title="Delete a Key"
                description="Delete a sensor key and all its data from the database."
                endpoint="POST /"
                requestBody={{
                  operation: "deletekey",
                  key: "sensor_to_delete"
                }}
                responseBody={{ success: true, message: "Key deleted: sensor_to_delete" }}
              />
            </div>
            <div ref={sectionRefs['keys-reload']} id="keys-reload">
              <ApiEndpoint
                title="Reload a Key"
                description="Reload a sensor key from disk. Useful after manual file changes or recovery."
                endpoint="POST /"
                requestBody={{
                  operation: "reloadkey",
                  key: "sensor1"
                }}
                responseBody={{ success: true, message: "Key reloaded: sensor1" }}
              />
            </div>

            {/* Delete Data Points */}
            <div ref={sectionRefs['delete-datapoint']} id="delete-datapoint">
              <ApiEndpoint
                title="Delete Data Points"
                description="Delete data points by timestamp range and/or value condition. Timestamps are validated to be within the range 2000-2100."
                endpoint="POST /"
                requestBody={{
                  operation: "deleteDataPoint",
                  key: "sensor1",
                  payload: {
                    operator: ">",
                    value: 100.0,
                    timestampFrom: 1717965210,
                    timestampTo: 1717965300
                  }
                }}
                responseBody={{ success: true, message: "Removed 5 data points and patched data" }}
              />
            </div>

            {/* Compact */}
            <div ref={sectionRefs['compact']} id="compact">
              <ApiEndpoint
                title="Compact Key"
                description="Manually compact a key's WAL files to reclaim disk space by removing gaps from deleted data points. When compaction_compression is enabled in gtsdb.ini, compacted files are compressed using Facebook's Gorilla algorithm (~8x space reduction). The server also runs automatic background compaction every hour for files exceeding 100MB."
                endpoint="POST /"
                requestBody={{
                  operation: "compact",
                  key: "sensor1"
                }}
                responseBody={{ success: true, message: "Key compacted: sensor1" }}
              />
            </div>

            {/* Server & Monitoring */}
            <div ref={sectionRefs['serverinfo']} id="serverinfo">
              <h2 className="text-2xl font-bold mb-6">Server &amp; Monitoring</h2>
              <ApiEndpoint
                title="Server Info"
                description="Get detailed server information including version, uptime, memory usage, goroutine count, data directory, and configured listen addresses."
                endpoint="POST /"
                requestBody={{
                  operation: "serverinfo"
                }}
                responseBody={{
                  success: true, data: {
                    version: "1.0",
                    key_count: 42,
                    health: "ok",
                    uptime_seconds: 3600,
                    goroutines: 12,
                    memory_alloc_mb: 8.5,
                    memory_total_mb: 64.0,
                    num_cpu: 4,
                    listen_tcp: ":5555",
                    listen_http: ":5556",
                    data_dir: "./data",
                    file_handle_lru: 512
                  }
                }}
              />
            </div>
            <div ref={sectionRefs['health']} id="health">
              <ApiEndpoint
                title="Health Check"
                description="Simple health check endpoint. No authentication required. Returns service status and key count."
                endpoint="GET /health"
                responseBody={{
                  status: "ok",
                  service: "gtsdb",
                  version: "1.0",
                  keyCount: 42
                }}
              />
            </div>
            <div ref={sectionRefs['metrics']} id="metrics">
              <ApiEndpoint
                title="Prometheus Metrics"
                description="Prometheus-compatible metrics endpoint. No authentication required. Exposes gtsdb_key_count, gtsdb_data_points_total, gtsdb_uptime_seconds, gtsdb_goroutines, and Go runtime memory/GC metrics."
                endpoint="GET /metrics"
                responseBody={{
                  note: "Returns text/plain Prometheus exposition format with metrics like gtsdb_key_count, gtsdb_data_points_total, gtsdb_uptime_seconds, go_memstats_alloc_bytes, etc."
                }}
              />
            </div>

            {/* Other Operations */}
            <div ref={sectionRefs['flush']} id="flush">
              <h2 className="text-2xl font-bold mb-6">Other Operations</h2>
              <ApiEndpoint
                title="Flush All Data Points"
                description="Make sure all data points are written to disk."
                endpoint="POST /"
                requestBody={{
                  operation: "flush"
                }}
                responseBody={{ success: true, message: "Data flushed" }}
              />
            </div>

            <div ref={sectionRefs['ping']} id="ping">
              <ApiEndpoint
                title="Ping"
                description={"It is not an operation, but a message sent from the server to the client to check if the connection is still alive. You can ignore this message. (hint: determine by empty data or \"ping\" message)"}
                endpoint="POST /"
                responseBody={{ success: true, message: "ping" }}
              />
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      className="absolute top-4 right-4 p-2 rounded-lg hover:bg-zinc-700 transition-colors"
      onClick={copy}
    >
      {copied ? (
        <Check className="h-4 w-4 text-emerald-400" />
      ) : (
        <Copy className="h-4 w-4 text-zinc-500" />
      )}
    </button>
  )
}

interface ApiEndpointProps {
  title: string;
  description: string;
  endpoint: string;
  requestBody?: object;
  responseBody?: object;
}

function ApiEndpoint({ title, description, requestBody, responseBody }: ApiEndpointProps) {
  return (
    <div className="mb-8 p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <p className="mb-4 text-zinc-400">{description}</p>
      <div>
        <h3 className="text-lg font-medium mb-2">Request Body</h3>

        {requestBody && (
          <div className="relative">
            <div
              className="bg-zinc-800 p-3 rounded overflow-x-auto">

              <SyntaxHighlighter
                language="json"
                style={atomOneDark}
                customStyle={{ backgroundColor: 'transparent' }}
              >{JSON.stringify(requestBody, null, 2)}</SyntaxHighlighter>
            </div>

            <CopyButton text={JSON.stringify(requestBody, null, 2)} />

          </div>
        )}

        {responseBody && (
          <div className="relative">
            <h3 className="text-lg font-medium mb-2 mt-4">Response Body</h3>
            <div className="bg-zinc-800 p-3 rounded">
              <SyntaxHighlighter
                language="json"
                style={atomOneDark}
                customStyle={{ backgroundColor: 'transparent' }}
              >{JSON.stringify({ success: true }, null, 2)}</SyntaxHighlighter>
            </div>

            <CopyButton text={JSON.stringify({ success: true }, null, 2)} />
          </div>
        )}

      </div>
    </div>
  )
}

