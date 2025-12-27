import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Map, Calendar, ShieldCheck, Star } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PackageCard } from "@/components/PackageCard";
import { usePackages } from "@/hooks/use-packages";
import { Button } from "@/components/ui/button";
import { BookingForm } from "@/components/BookingForm";

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const { data: packages, isLoading } = usePackages({ featured: true });

  const features = [
    { icon: <Map className="w-6 h-6" />, title: "Best Destinations", desc: "Hand-picked locations for the perfect getaway." },
    { icon: <Calendar className="w-6 h-6" />, title: "Easy Booking", desc: "Seamless booking process from start to finish." },
    { icon: <ShieldCheck className="w-6 h-6" />, title: "Safe Travel", desc: "Your safety is our top priority everywhere." },
    { icon: <Star className="w-6 h-6" />, title: "Best Price", desc: "Guaranteed best rates for premium experiences." },
  ];

  const destinations = [
    { name: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80" },
    { name: "Paris, France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80" },
    { name: "Kyoto, Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80" },
    { name: "Santorini, Greece", image: "https://images.unsplash.com/photo-1613395877344-13d4c2ce5d47?w=800&q=80" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Unsplash mountain landscape */}
          <img 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background/90" />
        </div>

        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
              ✈️ Explore the world with us
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight">
              Discover Your Next <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-orange-400">Great Adventure</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed">
              Experience the beauty of the world with our curated travel packages. From serene beaches to majestic mountains, we make your dream vacation a reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/packages">
                <Button size="lg" className="rounded-full text-lg h-14 px-8 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25">
                  Explore Packages
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="rounded-full text-lg h-14 px-8 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
                  Plan Custom Trip
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Popular Destinations</h2>
            <p className="text-muted-foreground text-lg">Discover the most sought-after locations voted by our travelers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
              >
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-display font-bold text-white mb-1">{dest.name}</h3>
                  <div className="flex items-center text-white/80 text-sm group-hover:translate-x-2 transition-transform duration-300">
                    Explore <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-slate-50">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm">Why Choose Us</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 mb-6 text-foreground">
                We Make Your Travel <br />Experience Memorably
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                We believe that travel is not just about going to places, but about the experiences and memories you create. Here's why thousands of travelers choose us every year.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {features.map((feature, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-3"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <h4 className="font-bold text-lg">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Unsplash traveler image */}
              <img 
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&q=80" 
                alt="Traveler" 
                className="rounded-3xl shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-0" />
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-0" />
              
              {/* Stats Card */}
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-xs animate-bounce-slow">
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                      </div>
                    ))}
                  </div>
                  <div className="font-bold text-xl">2k+</div>
                </div>
                <p className="text-muted-foreground text-sm">Happy travelers explored the world with us this year.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURED PACKAGES */}
      <section className="py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-display font-bold text-foreground mb-2">Featured Packages</h2>
              <p className="text-muted-foreground text-lg">Curated experiences just for you.</p>
            </div>
            <Link href="/packages">
              <Button variant="outline" className="hidden sm:flex">View All Packages</Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-muted animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages?.slice(0, 3).map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center sm:hidden">
            <Link href="/packages">
              <Button variant="outline" className="w-full">View All Packages</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* INQUIRY SECTION */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to Start Your Adventure?</h2>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Whether you're looking for a relaxing beach getaway, an adventurous mountain trek, or a cultural city tour, we have the perfect package for you.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Personalized itineraries tailored to your needs",
                  "24/7 support throughout your journey",
                  "Exclusive deals and hidden gem locations",
                  "Expert guides with local knowledge"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-secondary" />
                    <span className="font-medium text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-foreground">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
