import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Globe, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Packages", href: "/packages" },
    { name: "About Us", href: "/#about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-4 border-b border-border/40"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-lg text-white group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6" />
            </div>
            <span className={cn(
              "font-display text-2xl font-bold tracking-tight",
              scrolled ? "text-primary" : "text-white drop-shadow-md"
            )}>
              WanderLust
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-secondary",
                  location === link.href 
                    ? "text-secondary font-bold" 
                    : scrolled ? "text-foreground" : "text-white/90 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/contact">
              <Button 
                variant={scrolled ? "default" : "secondary"}
                className={cn(
                  "rounded-full px-6 font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5",
                  !scrolled && "bg-white text-primary hover:bg-white/90"
                )}
              >
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className={cn("w-6 h-6", !scrolled && "text-white")} />
            ) : (
              <Menu className={cn("w-6 h-6", !scrolled && "text-white")} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-xl animate-in slide-in-from-top-5">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-lg font-medium py-2 border-b border-border/50",
                  location === link.href ? "text-primary" : "text-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button className="w-full mt-4 bg-primary text-white" size="lg">
              <Phone className="w-4 h-4 mr-2" />
              Call to Book
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
