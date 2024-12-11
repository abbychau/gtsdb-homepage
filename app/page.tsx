"use client"

import { useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowRight, Database, Zap, Code, BarChart, Github, Globe, Lock, Download, Pencil, Book, Key, Rss, Timer, Presentation, Star, Plug, Mail, Leaf, Shield, PuzzleIcon, SquareArrowOutUpRight } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
// hamham.png
import hamham from './hamham.png'
import Link from 'next/link'
import { buttonVariants } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-950">
            🐹 GTSDB
          </h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a></li>
              <li><a href="#usage" className="text-gray-600 hover:text-blue-600 transition-colors">Usage</a></li>
              <li><a href="#performance" className="text-gray-600 hover:text-blue-600 transition-colors">Performance</a></li>
              <li><a href="https://github.com/abbychau/gtsdb" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Github className="h-5 w-5" />
              </a></li>
              <li><a href="https://github.com/abbychau/gtsdb/releases/new" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Download className="h-5 w-5" />
              </a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <UsageSection />
        <PerformanceSection />
        <CTASection />
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
                  <a href="/#usage" className="text-gray-400 hover:text-white transition-colors flex items-center">
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

function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <motion.div 
          className="md:w-1/2 mb-10 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Golang Dead Simple Timeseries Database</h1>
          <p className="text-xl mb-8">A simple, efficient, and easy-to-use timeseries database for IoT and more.</p>

          <Button className="bg-white text-blue-600 hover:bg-blue-100" onClick={
            () => window.location.href = "/#features"
          }>
            <Star className="h-4 w-4" />
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button className="ml-4 bg-white text-blue-600 hover:bg-blue-100" onClick={
            () => {
              window.open("https://gtsdb-admin.vercel.app/", "_blank")
            }
          }>
            <Presentation className="h-4 w-4" />
            Demo
            <SquareArrowOutUpRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image src={hamham} alt="GTSDB Illustration" width={400} height={400} className="w-full h-auto" />
        </motion.div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          animate={controls}
        >
          <FeatureCard
            icon={<Database className="h-10 w-10" />}
            title="Innovative Design"
            description="Utilizes Write Ahead Log (WAL) for records, reducing IO and memory usage."
          />
          <FeatureCard
            icon={<Zap className="h-10 w-10" />}
            title="Crazy Benchmark"
            description="Top performance. 19,172 ns/op. In-memory-like speed. WAL-class durability."
          />
          <FeatureCard
            icon={<Code className="h-10 w-10" />}
            title="Super Easy Integration"
            description="Identical HTTP API and TCP interfaces, which are all in strict JSON."
          />
          <FeatureCard
            icon={<BarChart className="h-10 w-10" />}
            title="Analytics Ready"
            description="Built-in support for data downsampling and aggregation."
          />
          <FeatureCard
            icon={<Leaf className="h-10 w-10" />}
            title="Memory Efficient"
            description="As Low as 6MB memory. Perfect for IoT devices. Indexing is all in SSD."
          />
          <FeatureCard
            icon={<Rss className="h-10 w-10" />}
            title="Built-in Streaming"
            description="Subscribe to keys and receive updates in real-time."
          />
          <FeatureCard
            icon={<Shield className="h-10 w-10" />}
            title="Battle-Tested"
            description="Trusted by IoT pioneers and used in production. Code Coverage for all logic."
          />
          <FeatureCard
            icon={<PuzzleIcon className="h-10 w-10" />}
            title="Cross-Platform"
            description="Supports Windows, Linux/BSD, and macOS. Perfect for edge devices."
          />
        </motion.div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1
        }
      }}
    >
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

function UsageSection() {
  return (
    <section id="usage" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <Code className="h-8 w-8 inline-block mr-2" />
          Usage</h2>
        <Tabs defaultValue="http" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
            <TabsTrigger value="http" className="text-lg"><Globe className="h-5 w-5 mr-2" /> HTTP API</TabsTrigger>
            <TabsTrigger value="tcp" className="text-lg">
              <Plug className="h-5 w-5 mr-2" />TCP Interface</TabsTrigger>
          </TabsList>
          <div className="mt-4">
            <TabsContent value="http">
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
POST /
{
    "operation": "write",
    "Write": {
        "id": "a_sensor1",
        "Value": 32242424243333333333.3333,
        "Timestamp": 1617965210
    }
}
                      `}</code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="read">
                    <pre className="text-sm">
                      <code>{`
POST /
{
    "operation": "read",
    "Read": {
        "id": "a_sensor1",
        "StartTime": 1617965210,
        "EndTime": 1617965211,
        "Downsample": 3,
        "Aggregation": "avg"
    }
}

# Or read last X records:
POST /
{
    "operation": "read",
    "Read": {
        "id": "a_sensor1",
        "LastX": 1
    }
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
  "DeviceID": "sensor1"
}

# Unsubscribe from a key
POST /
{
  "operation": "unsubscribe",
  "DeviceID": "sensor1"
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
    "write": {
        "id": "a_sensor1",
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
    "read": {
        "id": "a_sensor1",
        "startTime": 1617965210,
        "endTime": 1617965211,
        "downsample": 3,
        "aggregation": "avg"
    }
}

# Or read last X records:
{
    "operation": "read",
    "read": {
        "id": "a_sensor1",
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
  "deviceId": "sensor1"
}

# Unsubscribe from a key
{
  "operation": "unsubscribe",
  "deviceId": "sensor1"
}
                      `}</code>
                    </pre>
                  </TabsContent>
                </div>
              </Tabs>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  )
}

function PerformanceSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <section id="performance" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <Timer className="h-8 w-8 inline-block mr-2" />
          Performance</h2>
        <motion.div 
          ref={ref}
          className="bg-white p-8 rounded-lg shadow-lg"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-6">Performance Benchmark</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-medium mb-2">Details</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>OS: Windows</li>
                <li>Architecture: amd64</li>
                <li>Package: gtsdb</li>
                <li>CPU: 13th Gen Intel(R) Core(TM) i7-13700KF</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-2">Results</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>24 Concurrency</li>
                <li>311,648 operations</li>
                <li>19,172 ns/op</li>
                <li>4,245 B/op</li>
                <li>5 allocs/op</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
          <Link className={buttonVariants({ variant: "outline" }) + "bg-white text-blue-600 hover:text-blue-600" } href="https://github.com/abbychau/gtsdb/releases" target='_blank'>
            Download GTSDB
            <ArrowRight className="ml-2 h-4 w-4" />  
          </Link>
          
      </div>
    </section>
  )
}

