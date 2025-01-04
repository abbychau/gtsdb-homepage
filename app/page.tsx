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
import { buttonVariants } from "@/components/ui/button"
import controlfree from './control-free.png'
import vertriqe from './vertriqe.png'
import Link from 'next/link'
import { ResponsiveBar } from "@nivo/bar"


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="sticky top-0 z-50 backdrop-blur-md border-b-4 border-gray-400 bg-slate-100/80">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-950">
            🐹 GTSDB
          </h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a></li>
              <li><a href="#usage" className="text-gray-600 hover:text-blue-600 transition-colors">Usage</a></li>
              <li><a href="#performance" className="text-gray-600 hover:text-blue-600 transition-colors">Performance</a></li>
              
              <li>
                <Link href="/Documentation" className="text-gray-600 hover:text-blue-600 transition-colors flex">
                  <Book className="h-5 w-5 mr-2" />
                  Documentation
                </Link>
              </li>
              <li><a href="https://github.com/abbychau/gtsdb" target='_blank' className="text-gray-600 hover:text-blue-600 transition-colors"><Github className="h-5 w-5" /></a></li>
              
              <li><a href="https://github.com/abbychau/gtsdb/releases" target='_blank' className="text-gray-600 hover:text-blue-600 transition-colors">
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
        <TrustedBySection />
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

function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-slate-800 to-indigo-700 text-white py-20 overflow-hidden">
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
    <section id="features" className="py-20 bg-gray-100">
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
    <section id="usage" className="py-20 bg-gradient-to-t from-slate-400 to-slate-700 text-white">
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
        "Value": 32242424243333333333.3333
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
    "Read": {
        "id": "a_sensor1",
        "start_timestamp": 1717965210,
        "end_timestamp": 1717965211,
        "downsampling": 3
    }
}

# Read last X records:
POST /
{
    "operation": "read",
    "Read": {
        "id": "a_sensor1",
        "lastx": 1
    }
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

# Multi-read last X records:
POST /
{
    "operation": "multi-read",
    "keys": ["sensor1", "sensor2", "sensor3"],
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
                  <TabsContent value="patch">
                    <pre className="text-sm">
                      <code>{`
POST /
{
    "operation": "data-patch",
    "key": "sensor1",
    "data": "1717965210,123.45\\n1717965211,123.46\\n1717965212,123.47"
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
    { db: "GTSDB", milliseconds: 730.19 },
    { db: "InfluxDB", milliseconds: 10920.92 }
  ]

  const readData = [
    { db: "GTSDB", milliseconds: 5.36 },
    { db: "InfluxDB", milliseconds: 16.68 }
  ]

  const multiWriteData = [
    { db: "GTSDB", milliseconds: 535.32 },
    { db: "InfluxDB", milliseconds: 1608.69 }
  ]

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const BarChartComponent = ({ data, title }: { data: { db: string, milliseconds: number }[], title: string }) => (
    <div className="h-[250px]">
      <h4 className="text-lg font-medium mb-4 text-center">{title}</h4>
      <ResponsiveBar
      data={data}
      keys={['milliseconds']}
      indexBy="db"
      margin={{ top: 20, right: 20, bottom: 80, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={({ data }) => data.db === 'GTSDB' ? '#3B82F6' : '#94A3B8'}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      axisLeft={{
        tickSize: 1,
        tickValues: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Time (ms)',
        legendPosition: 'middle',
        legendOffset: -40
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      labelFormat={value => `${Number(value).toFixed(2)}ms`}
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
            <h3 className="text-2xl font-semibold mb-6">Benchmark Results</h3>
            <div className="space-y-8">
              <BarChartComponent data={writeData} title="Write Performance (ms)" />
              <BarChartComponent data={readData} title="Read Performance (ms)" />
              <BarChartComponent data={multiWriteData} title="Multi-Write Performance (ms)" />
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Test Configuration</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-2">Test Parameters</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Total Data Points: 10,000</li>
                  <li>Points per Sensor: 1,000</li>
                  <li>Sensor Count: 10</li>
                  <li>Success Rate: 100%</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-2">Environment</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>OS: Windows</li>
                  <li>Architecture: amd64</li>
                  <li>CPU: 13th Gen Intel(R) Core(TM) i7-13700KF</li>
                  <li>24 Concurrent Operations</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-lg font-medium mb-2 text-blue-800">Key Note</h4>
                <ul className="list-disc list-inside space-y-2 text-blue-700">
                  <li>GTSDB shows 15x faster write performance</li>
                  <li>3x faster read operations</li>
                  <li>3x faster multi-write operations</li>
                  <li>Only 7MB Memory Usage</li>
                </ul>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <a 
                  href="https://github.com/abbychau/gtsdb-benchmark" 
                  target="_blank"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Github className="h-5 w-5 mr-2" />
                  View Benchmark Repository
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function TrustedBySection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Trusted By</h2>
        <div className="flex justify-center items-center space-x-8">
          <Image src={controlfree} alt="ControlFree" height={45} className="w-auto h-auto mr-6" />
          <Image src={vertriqe} alt="Vertriqe" height={45} className="w-auto h-auto" />
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
          <Link className={buttonVariants({ variant: "outline" }) + "bg-white text-blue-900 hover:text-blue-800 font-semibold" } href="https://github.com/abbychau/gtsdb/releases" target='_blank'>
            Download GTSDB
            <ArrowRight className="ml-2 h-4 w-4" />  
          </Link>
          
      </div>
    </section>
  )
}

