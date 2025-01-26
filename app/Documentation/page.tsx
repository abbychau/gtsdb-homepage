"use client"

import { Github, Download, HomeIcon, Copy, Check } from 'lucide-react'
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Edit, BookOpen, Bell, Key, MoreHorizontal } from 'lucide-react'
import Footer from '@/components/Footer'
import SyntaxHighlighter from 'react-syntax-highlighter';


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-950">
            🐹 GTSDB Documentation
          </h1>
          <nav>
            <ul className="flex space-x-6">

              <li><a href="https://github.com/abbychau/gtsdb" target='_blank' className="text-gray-600 hover:text-blue-600 transition-colors">
                <Github className="h-5 w-5" />
              </a></li>
              <li><a href="https://github.com/abbychau/gtsdb/releases" target='_blank' className="text-gray-600 hover:text-blue-600 transition-colors">
                <Download className="h-5 w-5" />
              </a></li>
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                  <HomeIcon className="h-5 w-5" />
                </a>
              </li>
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
    'write-single': useRef<HTMLDivElement>(null),
    'patch': useRef<HTMLDivElement>(null),
    'read-range': useRef<HTMLDivElement>(null),
    'read-last': useRef<HTMLDivElement>(null),
    'read-multi-range': useRef<HTMLDivElement>(null),
    'read-multi-last': useRef<HTMLDivElement>(null),
    'subscribe': useRef<HTMLDivElement>(null),
    'unsubscribe': useRef<HTMLDivElement>(null),
    'keys-get': useRef<HTMLDivElement>(null),
    'keys-init': useRef<HTMLDivElement>(null),
    'keys-rename': useRef<HTMLDivElement>(null),
    'keys-delete': useRef<HTMLDivElement>(null),
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
  }, [])

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
        { id: 'keys-get' as SectionId, label: 'Get All Keys' },
        { id: 'keys-init' as SectionId, label: 'Initialize Key' },
        { id: 'keys-rename' as SectionId, label: 'Rename Key' },
        { id: 'keys-delete' as SectionId, label: 'Delete Key' },
      ]
    },
    {
      group: 'Other Operations',
      icon: <MoreHorizontal className="h-5 w-5" />,
      items: [
        { id: 'flush' as SectionId, label: 'Flush Data' },
        { id: 'ping' as SectionId, label: 'Ping' },
      ]
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-4xl font-bold mb-8">GTSDB API Documentation</h1>
        <p className="text-lg mb-8">
          All payloads are in JSON format. Endpoints are either <code className='bg-gray-200 p-1 rounded-sm'>POST /</code> OR <code className='bg-slate-200 p-1 rounded-sm'>TCP</code>.
        </p>

        <div className="flex flex-col md:flex-row gap-8">
          <nav className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-20 flex flex-col space-y-6">
              {navigationItems.map(({ group, icon, items }) => (
                <div key={group} className="space-y-2">
                  <div className="font-semibold flex items-center text-gray-700">
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
                          "hover:bg-blue-50 hover:text-blue-800",
                          activeSection === id ? "bg-blue-100 text-blue-800" : "text-gray-600"
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
                description="Write a new data point for a specific sensor."
                endpoint="POST /"
                requestBody={{
                  operation: "write",
                  Write: {
                    key: "a_sensor1",
                    Value: 3224242424333.3333
                  }
                }}
                responseBody={{ success: true, message: "Data written successfully" }}
              />
            </div>

            {/* Read Operations */}
            <div ref={sectionRefs['read-range']} id="read-range">
              <h2 className="text-2xl font-bold mb-6">Read Operations</h2>
              <ApiEndpoint
                title="Read Data with Time Range and Downsampling"
                description="Read data for a specific sensor within a time range with downsampling."
                endpoint="POST /"
                requestBody={{
                  operation: "read",
                  key: "a_sensor1",
                  Read: {
                    start_timestamp: 1717965210,
                    end_timestamp: 1717965211,
                    downsampling: 3
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
                description="Rename an existing sensor key in the database."
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
                description="Delete a sensor key from the database."
                endpoint="POST /"
                requestBody={{
                  operation: "deletekey",
                  key: "sensor_to_delete"
                }}
                responseBody={{ success: true, message: "Key deleted: sensor_to_delete" }}
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

            {/* Patch Operations */}
            <div ref={sectionRefs['patch']} id="patch">
              <h2 className="text-2xl font-bold mb-6">Patch Operations</h2>
              <ApiEndpoint
                title="Patch Data Points"
                description="Update or insert multiple data points for a specific sensor using CSV format."
                endpoint="POST /"
                requestBody={{
                  operation: "data-patch",
                  key: "sensor1",
                  data: "1717965210,123.45\n1717965211,123.46\n1717965212,123.47"
                }}
                responseBody={{ success: true, message: "Patched 13 data points" }}
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
      className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-700 transition-colors"
      onClick={copy}
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-400" />
      ) : (
        <Copy className="h-4 w-4 text-gray-400" />
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
    <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <p className="mb-4 text-gray-600">{description}</p>
      <div>
        <h3 className="text-lg font-medium mb-2">Request Body</h3>
        <div className="relative">
          <div
            className="bg-gray-100 p-3 rounded overflow-x-auto">

            <SyntaxHighlighter
              language="json"
              customStyle={{ backgroundColor: 'transparent', color: '#222' }}
            >{JSON.stringify(requestBody, null, 2)}</SyntaxHighlighter>
          </div>

          <CopyButton text={JSON.stringify(requestBody, null, 2)} />

        </div>

        {responseBody && (
          <div className="relative">
            <h3 className="text-lg font-medium mb-2 mt-4">Response Body</h3>
            <div className="bg-gray-100 p-3 rounded">
              <SyntaxHighlighter
                language="json"
                customStyle={{ backgroundColor: 'transparent', color: '#222' }}
              >{JSON.stringify({ success: true }, null, 2)}</SyntaxHighlighter>
            </div>

            <CopyButton text={JSON.stringify({ success: true }, null, 2)} />
          </div>
        )}

      </div>
    </div>
  )
}

