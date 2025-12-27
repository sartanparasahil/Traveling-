import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg text-white">
                <Globe className="w-5 h-5" />
              </div>
              <span className="font-display text-2xl font-bold text-white">WanderLust</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              We create unforgettable travel experiences tailored to your dreams. Explore the world with confidence and style.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-display text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Destinations', 'Packages', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-slate-400 hover:text-primary transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages */}
          <div>
            <h3 className="text-white font-display text-lg font-bold mb-6">Top Packages</h3>
            <ul className="space-y-3">
              {['Honeymoon Specials', 'Adventure Tours', 'Family Vacations', 'Luxury Europe', 'Bali Retreats'].map((item) => (
                <li key={item}>
                  <Link href="/packages" className="text-slate-400 hover:text-primary transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-display text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>123 Adventure Ave, Suite 456<br />New York, NY 10012</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>hello@wanderlust.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-16 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} WanderLust Travels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
