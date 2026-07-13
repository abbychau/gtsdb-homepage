/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowRight, Database, Zap, Code, BarChart, Github, Globe, Download, Pencil, Book, Key, Rss, Timer, Presentation, Star, Plug, Leaf, Shield, PuzzleIcon, SquareArrowOutUpRight, TrendingUp, Layers, Activity, Cpu, HardDrive, Terminal } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import hamham from './hamham.png'
import oldHamham from './oldHamham.png'

import { buttonVariants } from "@/components/ui/button"
import controlfree from './control-free.png' // control-free, a company that provides a wide range of services, mostly in the IoT sector.
import vertriqe from './vertriqe.png' // vertriqe, a company that provides a wide range of services, including IoT, AI, and more.
import samdasoo from './samdasoo.png' // jeju samdasoo, enormous drinking water company from korea. famous for its volcanic water, selling around the world, loved by health-conscious people.
import Link from 'next/link'
import { ResponsiveBar } from "@nivo/bar"
import Footer from '@/components/Footer'
import { LightboxImage } from '@/components/Lightbox'
import bm from '@/lib/benchmark-data.json'

const rd = (n: number) => Math.round(n * 100) / 100

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="sticky top-0 z-50 backdrop-blur-md border-b-4 border-gray-400 bg-slate-100/80">
        <div className="container mx-auto px-3 py-1 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-950">
            <Image src={hamham} alt="GTSDB Logo" className="w-14 inline-block mr-2 mb-1" />
             GTSDB
          </h1>
          <nav>
            <ul className="flex space-x-6">
              <li className="hidden md:block"><a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Key Features</a></li>
              <li className="hidden md:block"><a href="#usages" className="text-gray-600 hover:text-blue-600 transition-colors">Usages</a></li>
              <li className="hidden md:block"><a href="#performance" className="text-gray-600 hover:text-blue-600 transition-colors">Performance</a></li>
              <li>
                <Link href="/architecture" className="text-gray-600 hover:text-blue-600 transition-colors flex">
                  <Cpu className="h-5 w-5 mr-2" />
                  Architecture
                </Link>
              </li>
              <li>
                <Link href="/Documentation" className="text-gray-600 hover:text-blue-600 transition-colors flex">
                  <Book className="h-5 w-5 mr-2" />
                  Documentation
                </Link>
              </li>
              <li><a href="https://github.com/abbychau/gtsdb" target='_blank' rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors"><Github className="h-5 w-5" /></a></li>

              <li><a href="https://github.com/abbychau/gtsdb/releases" target='_blank' rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
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
        <DriversSection />
        <PerformanceSection />
        <TrustedBySection />
        <CTASection />
      </main>

      <Footer />
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

          <Button
            className="bg-blue-50 text-blue-800 hover:bg-blue-300 shadow-slate-200"
            onClick={
              () => window.location.href = "/#features"
            }
            size={"lg"}
          >
            <Star className="h-4 w-4" />
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <Button
            className="ml-4 bg-blue-50 text-blue-800 hover:bg-blue-300 shadow-slate-200"
            size={"lg"}
            onClick={
              () => {
                window.open("https://gtsdb-admin.vercel.app/?apiUrl=https://gtsdb-web.abby.md/", "_blank")
              }
            }>
            <Presentation className="h-4 w-4" />
            Admin Tool Demo
            <SquareArrowOutUpRight className="ml-2 h-4 w-4" />
          </Button>
          <div className="mt-4">
          <a href="https://www.producthunt.com/posts/gtsdb?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-gtsdb" target="_blank" rel="noopener noreferrer"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=758497&theme=light" alt="GTSDB - Durable&#0032;and&#0032;Memory&#0032;Friendly&#0032;timeseries&#0032;database | Product Hunt" style={{width: 250, height: 54}} width="250" height="54" /></a>
          </div>
        </motion.div>
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image src={oldHamham} alt="GTSDB Illustration" className="w-full h-auto" />
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
            description="WAL-first with per-key ring buffer cache, binary protocol for reads, async dirty-key flusher, and Velox native C VM JSON. Minimal IO, maximum speed."
          />
          <FeatureCard
            icon={<Zap className="h-10 w-10" />}
            title="Blazing Fast"
            description={
              <>
                <b>96M ops/sec</b> multi-key read — faster than VictoriaMetrics. <b>1.22M ops/sec</b> batch write. Binary protocol + Velox JSON. WAL-class durability.
              </>
            }
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
            description={
              <>
                Supports Windows, Linux/BSD, and macOS. Perfect for edge devices.
              </>
            }
          />
          <FeatureCard
            icon={<Activity className="h-10 w-10" />}
            title="Monitoring Ready"
            description="Built-in /health and /metrics (Prometheus) endpoints. Monitor uptime, memory, GC, and data points in real-time."
          />
          <FeatureCard
            icon={<Layers className="h-10 w-10" />}
            title="Batch Write"
            description="Write up to 10,000 data points in a single API call. Perfect for bulk imports and migration."
          />
          <FeatureCard
            icon={<Download className="h-10 w-10" />}
            title="Data Export"
            description="Export sensor data in CSV or JSON format with filtering by time range and downsampling."
          />
          <FeatureCard
            icon={<HardDrive className="h-10 w-10" />}
            title="Gorilla Compression"
            description={
              <>
                Facebook Gorilla time-series compression. <b>29.6x smaller</b> than JSON, <b>8x smaller</b> than raw. Massive disk savings for IoT workloads.
              </>
            }
          />
          <FeatureCard
            icon={<TrendingUp className="h-10 w-10" />}
            title="Advanced Analytics"
            description="Downsampling with avg, sum, min, max, first, last, count, median (p50), p95, and p99 aggregations."
          />
        </motion.div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
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
      <div className="text-gray-600">{description}</div>
    </motion.div>
  )
}

function UsageSection() {
  return (
    <section id="usages" className="py-20 bg-gradient-to-t from-slate-400 to-slate-700 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <Code className="h-8 w-8 inline-block mr-2" />
          Usages</h2>
        <Tabs defaultValue="http" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
            <TabsTrigger value="http" className="text-lg"><Globe className="h-5 w-5 mr-2" /> HTTP API</TabsTrigger>
            <TabsTrigger value="tcp" className="text-lg">
              <Plug className="h-5 w-5 mr-2" />TCP Interface</TabsTrigger>
          </TabsList>
          <div className="mt-4">
            <TabsContent value="http">
              <Tabs defaultValue="write" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-4">
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
                  <TabsTrigger value="advanced">
                    <Zap className="h-5 w-5 mr-2" />
                    Advanced</TabsTrigger>
                </TabsList>
                <div className="mt-4 bg-gray-800 text-white p-6 rounded-lg overflow-x-auto">
                  <TabsContent value="write">
                    <pre className="text-sm">
                      <code>{`
POST /
{
    "operation": "write",
    "key": "a_sensor1",
    "write": {
        "value": 32242424243333333333.3333
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
    "key": "a_sensor1",
    "read": {
        "start_timestamp": 1717965210,
        "end_timestamp": 1717965211,
        "downsampling": 3
    }
}

# Read last X records:
POST /
{
    "operation": "read",
    "key": "a_sensor1",
    "read": {
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

# Initialize a new key
POST /
{
    "operation": "initkey",
    "key": "new_sensor"
}

# Rename a key
POST /
{
    "operation": "renamekey",
    "key": "old_sensor_name",
    "toKey": "new_sensor_name"
}

# Delete a key
POST /
{
    "operation": "deletekey",
    "key": "sensor_to_delete"
}

# Patch data points
POST /
{
    "operation": "data-patch",
    "key": "sensor1",
    "data": "1717965210,123.45\\n1717965211,123.46\\n1717965212,123.47"
}
                      `}</code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="advanced">
                    <pre className="text-sm">
                      <code>{`
# Batch write (up to 10,000 points):
POST /
{
    "operation": "batch-write",
    "points": [
        {"key": "sensor1", "value": 42.5, "timestamp": 1717965210},
        {"key": "sensor2", "value": 99.9, "timestamp": 1717965210}
    ]
}

# Export data as CSV:
POST /
{
    "operation": "export",
    "key": "sensor1",
    "export": { "format": "csv", "lastx": 100 }
}

# Compact key to reclaim disk space:
POST /
{
    "operation": "compact",
    "key": "sensor1"
}

# Server info with memory & uptime stats:
POST /
{
    "operation": "serverinfo"
}

# Health check (no auth required):
GET /health

# Prometheus metrics (no auth required):
GET /metrics
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
      <h4 className="text-lg font-medium mb-4 text-center">{title}</h4>
      <ResponsiveBar
        data={data}
        keys={['milliseconds', 'seconds', 'kilobytes']}
        indexBy="db"
        margin={{ top: 20, right: 20, bottom: 80, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={({ data }) => {
          if (data.db.includes('GTSDB')) return '#3B82F6'
          if (data.db.includes('VictoriaMetrics')) return '#10B981'
          if (data.db.includes('NSQ')) return '#F59E0B'
          return '#94A3B8'
        }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        axisLeft={{
          tickSize: 1,
          tickValues: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: unit || 'Time (ms)',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        labelFormat={value => {
          const n = Number(value)
          if (n < 1 && n > 0) return n.toFixed(3) + (unit || 'ms')
          return n.toFixed(2) + (unit || 'ms')
        }}
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
        <div className="mb-8 text-center text-sm text-gray-500">
          Benchmarked against VictoriaMetrics v1.147, InfluxDB v2.9, and NSQ v1.3 on Windows / i7-13700KF / 5,000 points per operation. Reads use binary protocol.
        </div>
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
            <h3 className="text-2xl font-semibold mb-6">Write Benchmarks</h3>
            <div className="space-y-8">
              <BarChartComponent data={writeData} title="Write (seq) — 5,000 pts" />
              <BarChartComponent data={batchWriteData} title="Batch Write — 5,000 pts" />
              <BarChartComponent data={pipelineData} title="Pipeline Write — 5,000 pts" />
              <BarChartComponent data={multiWriteData} title="Multi-Sensor Write — 5 keys × 1,000 pts" />
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Read Benchmarks</h3>
            <div className="space-y-8">
              <BarChartComponent data={readData} title="Single Read — Last 1 Point" />
              <BarChartComponent data={readManyData} title="Multi-Key Read — 5 Keys × 5,000 pts" />
              <BarChartComponent 
                data={pubsubData.map(d => ({ ...d, seconds: Number(d.seconds.toFixed(3)) }))} 
                title="Pub/Sub Delivery Latency (s)" 
                unit="s"
              />
              <BarChartComponent 
                data={compressionData} 
                title="Storage per 5,000 points (KB)" 
                unit="KB"
              />
            </div>
          </div>
        </motion.div>

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
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Github className="h-5 w-5 mr-2" />
                View Full Benchmark Repository
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Test Configuration</h3>
            <div className="space-y-6">
              <table className="min-w-full bg-white border border-gray-200 text-sm">
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">Points per Operation</td>
                    <td className="py-2 px-4 border-b font-bold">5,000</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Sensors (multi-write)</td>
                    <td className="py-2 px-4 border-b font-bold">5</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Runs per Benchmark</td>
                    <td className="py-2 px-4 border-b font-bold">3</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Warmup Iterations</td>
                    <td className="py-2 px-4 border-b font-bold">300</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">GTSDB JSON Library</td>
                    <td className="py-2 px-4 border-b font-bold">Velox (native C VM backend)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">GTSDB Cache Size</td>
                    <td className="py-2 px-4 border-b font-bold">10,000 ring buffer / key</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Sync Mode</td>
                    <td className="py-2 px-4 border-b font-bold">async (dirty-key flusher)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">OS</td>
                    <td className="py-2 px-4 border-b font-bold">Windows</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Architecture</td>
                    <td className="py-2 px-4 border-b font-bold">amd64</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">CPU</td>
                    <td className="py-2 px-4 border-b font-bold">Core(TM) i7-13700KF</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Key Takeaways</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="text-lg font-bold mb-2 text-blue-800">vs InfluxDB</h4>
              <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
                <li><strong>{bm.ratios.writeVsInflux}x faster</strong> sequential write ({rd(bm.write.gtsdb)} ms vs {rd(bm.write.influxdb)} ms)</li>
                <li><strong>{bm.ratios.pipelineVsInflux}x faster</strong> pipeline write ({rd(bm.pipeline.gtsdb)} ms vs {rd(bm.pipeline.influxdb)} ms)</li>
                <li><strong>{bm.ratios.batchVsInflux}x faster</strong> batch write ({rd(bm.batchWrite.gtsdb)} ms vs {rd(bm.batchWrite.influxdb)} ms)</li>
                <li><strong>{bm.ratios.multiWriteVsInflux}x faster</strong> multi-sensor write ({rd(bm.multiWrite.gtsdb)} ms vs {rd(bm.multiWrite.influxdb)} ms)</li>
                <li><strong>{bm.ratios.readVsInflux}x faster</strong> single read (&lt;{rd(bm.read.gtsdb)} ms vs {rd(bm.read.influxdb)} ms)</li>
                <li><strong>{bm.ratios.readManyVsInflux}x faster</strong> multi-key read ({rd(bm.readMany.gtsdb)} ms vs {rd(bm.readMany.influxdb)} ms)</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <h4 className="text-lg font-bold mb-2 text-green-800">vs VictoriaMetrics</h4>
              <ul className="list-disc list-inside space-y-1 text-green-700 text-sm">
                <li><strong>{bm.ratios.writeVsVM}x faster</strong> sequential write ({rd(bm.write.gtsdb)} ms vs {rd(bm.write.vm)} ms)</li>
                <li><strong>{bm.ratios.pipelineVsVM}x faster</strong> pipeline write ({rd(bm.pipeline.gtsdb)} ms vs {rd(bm.pipeline.vm)} ms)</li>
                <li>{bm.ratios.readManyVsVM >= 1 ? <><strong>{bm.ratios.readManyVsVM}x faster</strong> multi-key read ({rd(bm.readMany.gtsdb)} ms vs {rd(bm.readMany.vm)} ms) 🏆</> : <>VM leads multi-key read (<strong>{bm.ratios.readManyVsVM}x</strong>)</>}</li>
                <li>{bm.ratios.readVsVM >= 1 ? <><strong>{bm.ratios.readVsVM}x faster</strong> single read ({rd(bm.read.gtsdb)} ms vs {rd(bm.read.vm)} ms) 🏆</> : <>VM leads single read (<strong>{bm.ratios.readVsVM}x</strong>)</>}</li>
                <li>VM leads batch write (<strong>{bm.ratios.batchVsVM}x</strong>) and multi-write (<strong>{bm.ratios.multiWriteVsVM}x</strong>)</li>
              </ul>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg mb-4">
              <h4 className="text-lg font-bold mb-2 text-amber-800">General</h4>
              <ul className="list-disc list-inside space-y-1 text-amber-700 text-sm">
                <li>JSON: <strong>Velox native C VM</strong> + <strong>binary protocol</strong> for reads</li>
                <li>Binary protocol: 16 bytes/point, zero-alloc encode/decode</li>
                <li>Multi-Key Read: <strong>{Math.round(5000 / (bm.readMany.gtsdb / 1000)).toLocaleString()} ops/sec</strong> — faster than VM</li>
                <li>Pub/Sub: <strong>{rd(bm.pubsub.gtsdb * 1000)} ms</strong> delivery latency</li>
                <li><strong>{(5000 / (bm.batchWrite.gtsdb / 1000)).toLocaleString(undefined, {maximumFractionDigits: 0})} ops/sec</strong> batch write, <strong>{(5000 / (bm.multiWrite.gtsdb / 1000)).toLocaleString(undefined, {maximumFractionDigits: 0})} ops/sec</strong> multi-write</li>
                <li><strong>29.6x smaller</strong> than raw JSON with Gorilla compression</li>
                <li>Only <strong>~12 MB</strong> memory usage at idle</li>
                <li>Single <strong>binary executable</strong> — no dependencies</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <a
                href="https://github.com/abbychau/gtsdb-benchmark"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Github className="h-5 w-5 mr-2" />
                View Benchmark Repository
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


function DriversSection() {
  return (
    <section id="drivers" className="py-20 bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">
          <Terminal className="h-8 w-8 inline-block mr-2" />
          Client Drivers
        </h2>
        <p className="text-center text-gray-500 mb-12">First-class Go & Node.js clients with JSON and binary protocol support</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Go Driver */}
          <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-blue-500">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-blue-600 mr-3">Go</span>
              <span className="text-sm text-gray-400 bg-gray-100 px-2 py-1 rounded">v0.1.0</span>
            </div>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto mb-4">
              <code>{`go get github.com/abbychau/gtsdb-drivers/go@latest`}</code>
            </pre>
            <pre className="bg-gray-900 text-gray-300 p-4 rounded-lg text-xs overflow-x-auto mb-4">
              <code>{`import "github.com/abbychau/gtsdb-drivers/go"

client, _ := gtsdb.Connect("localhost:5555")
client.Auth("your-token")

// JSON
client.Write("sensor1", 42.5)
pts, _ := client.ReadLast("sensor1", 100)

// 🚀 Binary — 100x faster
pts, _ := client.ReadBinary("sensor1", 5000)
multi, _ := client.MultiReadBinary(
    []string{"s1","s2"}, 5000,
)`}</code>
            </pre>
            <a href="https://github.com/abbychau/gtsdb-drivers/tree/main/go" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
              <Github className="h-4 w-4 mr-1" /> Go driver + docs
            </a>
          </div>

          {/* JS Driver */}
          <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-yellow-500">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-yellow-600 mr-3">Node.js</span>
              <span className="text-sm text-gray-400 bg-gray-100 px-2 py-1 rounded">v0.1.0</span>
            </div>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto mb-4">
              <code>{`npm install github:abbychau/gtsdb-drivers`}</code>
            </pre>
            <pre className="bg-gray-900 text-gray-300 p-4 rounded-lg text-xs overflow-x-auto mb-4">
              <code>{`const { GTSDBClient } = require('gtsdb-drivers')
const c = new GTSDBClient('localhost', 5555)
await c.connect()
await c.auth('your-token')

// JSON
await c.write('sensor1', 42.5)
const pts = await c.readLast('sensor1', 100)

// 🚀 Binary — 100x faster
const pts = await c.readBinary('sensor1', 5000)
const multi = await c.multiReadBinary(
  ['s1','s2'], 5000
)`}</code>
            </pre>
            <a href="https://github.com/abbychau/gtsdb-drivers/tree/main/js" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
              <Github className="h-4 w-4 mr-1" /> JS driver + docs
            </a>
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

function CTASection() {
  return (
    <section id="CTA" className="py-20 text-white bg-gradient-to-r from-slate-800 to-indigo-700">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
        <Link className={buttonVariants({ variant: "outline" }) + "bg-white text-blue-900 hover:text-blue-800 font-semibold"} href="https://github.com/abbychau/gtsdb/releases" target='_blank'>
          Download GTSDB
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>

      </div>
    </section>
  )
}

