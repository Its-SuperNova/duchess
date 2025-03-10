import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#F5F0E1] text-brown-800 w-full hidden sm:block">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <span className="text-5xl" aria-label="Duchess Pastries">
                🧁
              </span>
            </Link>
            <p className="text-sm text-brown-700 mt-4">
              Indulge in our handcrafted pastries and desserts made with the finest ingredients. Every bite tells a
              story of passion and tradition.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-brown-700 hover:text-brown-900 transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-brown-700 hover:text-brown-900 transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-brown-700 hover:text-brown-900 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-brown-700 hover:text-brown-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-brown-700 hover:text-brown-900 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-brown-700 hover:text-brown-900 transition-colors">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-brown-700 hover:text-brown-900 transition-colors">
                  Favorites
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-brown-700 hover:text-brown-900 transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories" className="text-brown-700 hover:text-brown-900 transition-colors">
                  Cakes
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-brown-700 hover:text-brown-900 transition-colors">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-brown-700 hover:text-brown-900 transition-colors">
                  Pastries
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-brown-700 hover:text-brown-900 transition-colors">
                  Breads
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-brown-700 hover:text-brown-900 transition-colors">
                  Donuts
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-brown-700">
                  123 Bakery Lane, Sweet Street
                  <br />
                  Dessert City, 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-brown-700 hover:text-brown-900 transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <a href="mailto:info@duchess.com" className="text-brown-700 hover:text-brown-900 transition-colors">
                  info@duchess.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-brown-200 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-brown-700">© {currentYear} Duchess Pastries. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-4 justify-center">
              <Link href="/terms" className="text-sm text-brown-700 hover:text-brown-900 transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm text-brown-700 hover:text-brown-900 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/faq" className="text-sm text-brown-700 hover:text-brown-900 transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
