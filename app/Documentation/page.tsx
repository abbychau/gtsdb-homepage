"use client"

import { Code, Github, Globe, Lock, Download, Mail, HomeIcon } from 'lucide-react'
import { useState } from "react"
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
              <Github className="h-5 w-5" />
              
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
  const [activeTab, setActiveTab] = useState("write")

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-4xl font-bold mb-8">GTSDB API Documentation</h1>
        <p className="text-lg mb-8">
          All payloads are in JSON format. Endpoints are either <code className='bg-gray-200 p-1 rounded-sm'>POST /</code> OR <code className='bg-slate-200 p-1 rounded-sm'>TCP</code>.
        </p>

        <Tabs
          defaultValue="write"
          className="flex flex-col md:flex-row gap-8"
          onValueChange={setActiveTab}
        >
          <TabsList className="w-full md:w-64 flex-shrink-0 flex flex-col h-full space-y-3">
            <TabsTrigger
              value="write"
              className={cn(
                "justify-start w-full",
                activeTab === "write" && "bg-blue-100 text-blue-800"
              )}
            >
              <Edit className="w-5 h-5 mr-2" />
              Write
            </TabsTrigger>
            <TabsTrigger
              value="read"
              className={cn(
                "justify-start w-full",
                activeTab === "read" && "bg-blue-100 text-blue-800"
              )}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Read
            </TabsTrigger>
            <TabsTrigger
              value="subscribe"
              className={cn(
                "justify-start w-full",
                activeTab === "subscribe" && "bg-blue-100 text-blue-800"
              )}
            >
              <Bell className="w-5 h-5 mr-2" />
              Subscribe
            </TabsTrigger>
            <TabsTrigger
              value="keys"
              className={cn(
                "justify-start w-full",
                activeTab === "keys" && "bg-blue-100 text-blue-800"
              )}
            >
              <Key className="w-5 h-5 mr-2" />
              Keys
            </TabsTrigger>
            <TabsTrigger
              value="other"
              className={cn(
                "justify-start w-full",
                activeTab === "other" && "bg-blue-100 text-blue-800"
              )}
            >
              <MoreHorizontal className="w-5 h-5 mr-2" />
              Other
            </TabsTrigger>
          </TabsList>

          <div className="flex-grow">
            <TabsContent value="write">
              <ApiEndpoint
                title="Write Data"
                description="Write a new data point for a specific sensor."
                endpoint="POST /"
                requestBody={{
                  operation: "write",
                  key: "a_sensor1",
                  Write: {
                    Value: 32242424243333333333.3333
                  }
                }}
              />
            </TabsContent>

            <TabsContent value="read">
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
            </TabsContent>

            <TabsContent value="subscribe">
              <ApiEndpoint
                title="Subscribe to a Key"
                description="Subscribe to updates for a specific sensor."
                endpoint="POST /"
                requestBody={{
                  operation: "subscribe",
                  key: "sensor1"
                }}
              />
              <ApiEndpoint
                title="Unsubscribe from a Key"
                description="Unsubscribe from updates for a specific sensor."
                endpoint="POST /"
                requestBody={{
                  operation: "unsubscribe",
                  key: "sensor1"
                }}
              />
            </TabsContent>

            <TabsContent value="keys">
              <ApiEndpoint
                title="Get All Keys"
                description="Retrieve a list of all sensor keys in the database."
                endpoint="POST /"
                requestBody={{
                  operation: "ids"
                }}
              />
              <ApiEndpoint
                title="Initialize a New Key"
                description="Initialize a new sensor key in the database."
                endpoint="POST /"
                requestBody={{
                  operation: "initkey",
                  key: "new_sensor"
                }}
              />
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
              <ApiEndpoint
                title="Delete a Key"
                description="Delete a sensor key from the database."
                endpoint="POST /"
                requestBody={{
                  operation: "deletekey",
                  key: "sensor_to_delete"
                }}
              />
            </TabsContent>

            <TabsContent value="other">
              <ApiEndpoint
                title="Flush All Data Points"
                description="Make sure all data points are written to disk."
                endpoint="POST /"
                requestBody={{
                  operation: "flush"
                }}
              />
            </TabsContent>
          </div>
        </Tabs>
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

