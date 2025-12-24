import Link from 'next/link'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-primary-green-dark/30 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Logo width={120} height={120} className="mb-4" />
            <p className="text-gray-400 text-sm">
              Empowering the next generation of leaders. Network established in 2025.
            </p>
          </div>

          <div>
            <h3 className="text-primary-green-light font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary-green-light transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/leadership" className="text-gray-400 hover:text-primary-green-light transition-colors">
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-primary-green-light transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-primary-green-light transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary-green-light transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-primary-green-light font-semibold mb-4">Get Involved</h3>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfWoWxWV_Pg2R_3JeQcjKU-OJG_xkbATDqB85t_CnW1KjquTg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-primary-green-medium hover:bg-primary-green-light 
                         text-black font-semibold rounded-lg transition-colors duration-200 mb-4"
            >
              Sign Up Here
            </a>
            <p className="text-gray-400 text-sm">
              Join our network and be part of the future.
            </p>
          </div>
        </div>

        <div className="border-t border-primary-green-dark/30 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Future Youth CLT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

