"use client"

import { Code, Github, Globe, Lock, Download, Mail, HomeIcon } from 'lucide-react'
import { useEffect, useRef, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Edit, BookOpen, Bell, Key, MoreHorizontal } from 'lucide-react'



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

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">GTSDB</h3>
              <p className="text-sm text-gray-400">
                A simple, efficient, and easy-to-use timeseries database for IoT and more.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://github.com/abbychau/gtsdb" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <Github className="h-5 w-5 mr-2" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="/Documentation" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <Code className="h-5 w-5 mr-2" />
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="https://abby.md" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Creator Homepage
                  </a>
                </li>
                <li>
                <a href="mailto:abbychau@gmail.com" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <Mail className="h-5 w-5 mr-2" />
                    Commercial Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">License</h3>
              <p className="text-sm text-gray-400 flex items-start">
                <Lock className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                GTSDB is open-source software licensed under the MIT License.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} GTSDB. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("write-single")
  const sectionRefs = {
    'write-single': useRef<HTMLDivElement>(null),
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
    'patch': useRef<HTMLDivElement>(null),
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
                    id: "a_sensor1",
                    Value: 32242424243333333333.3333
                  }
                }}
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
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ApiEndpointProps {
  title: string;
  description: string;
  endpoint: string;
  requestBody: object;
}

function ApiEndpoint({ title, description, requestBody }: ApiEndpointProps) {
  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <p className="mb-4 text-gray-600">{description}</p>
      <div>
        <h3 className="text-lg font-medium mb-2">Request Body</h3>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
          <code>{JSON.stringify(requestBody, null, 2)}</code>
        </pre>
      </div>
    </div>
  )
}

