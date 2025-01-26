import { Github, Code, Globe, Lock, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">GTSDB</h3>
            <p className="text-sm text-gray-400">
              A simple, efficient, and easy-to-use timeseries database for IoT and more.
              <br /><br />
              <a href="https://www.dmca.com/Protection/Status.aspx?id=1740cd4b-670e-483e-b367-12946cc5b770&refurl=https%3a%2f%2fgtsdb.abby.md%2f&rlo=true" title="DMCA.com Protection Status" className="dmca-badge"> <img src ="https://images.dmca.com/Badges/dmca-badge-w100-5x1-08.png?ID=1740cd4b-670e-483e-b367-12946cc5b770"  alt="DMCA.com Protection Status" /></a>  <script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js" defer> </script>
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
  )
}
