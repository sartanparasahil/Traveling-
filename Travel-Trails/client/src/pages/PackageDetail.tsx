import { useRoute } from "wouter";
import { usePackage } from "@/hooks/use-packages";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingForm } from "@/components/BookingForm";
import { MapPin, Clock, Star, Users, CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function PackageDetail() {
  const [_, params] = useRoute("/package/:id");
  const id = params?.id ? parseInt(params.id) : 0;
  
  const { data: pkg, isLoading } = usePackage(id);

  if (isLoading) {
    return <PackageDetailSkeleton />;
  }

  if (!pkg) {
    return <div>Package not found</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-16 text-white container mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{pkg.category}</span>
            <span className="flex items-center text-secondary font-bold text-sm">
              <Star className="w-4 h-4 fill-current mr-1" /> {pkg.rating} (120 reviews)
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">{pkg.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-lg text-slate-200">
            <span className="flex items-center"><MapPin className="w-5 h-5 mr-2" /> {pkg.location}</span>
            <span className="flex items-center"><Clock className="w-5 h-5 mr-2" /> {pkg.duration}</span>
            <span className="flex items-center"><Users className="w-5 h-5 mr-2" /> Group Tour</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-3xl font-display font-bold mb-6 text-foreground">Overview</h2>
              <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
                {pkg.description}
                <br /><br />
                Experience the trip of a lifetime with our carefully crafted itinerary. We handle all the details so you can focus on making memories. From luxury accommodations to guided tours of historic landmarks, everything is included.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-display font-bold mb-6 text-foreground">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Premium Accommodation",
                  "Daily Breakfast & Dinner",
                  "Airport Transfers",
                  "Expert English-speaking Guide",
                  "All Entrance Fees",
                  "Travel Insurance",
                  "Private Transportation",
                  "Welcome Drink"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-border/50 shadow-sm">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary Placeholder */}
            <div>
              <h2 className="text-3xl font-display font-bold mb-6 text-foreground">Itinerary</h2>
              <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-0 before:w-0.5 before:bg-border">
                {[1, 2, 3].map((day) => (
                  <div key={day} className="relative flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0 z-10 shadow-md">
                      {day}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Day {day}: Exploration & Adventure</h4>
                      <p className="text-muted-foreground">Detailed schedule for day {day} of your trip, including morning activities, lunch spots, and evening entertainment.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-border/50 mb-8">
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-border/50">
                  <span className="text-muted-foreground">Price per person</span>
                  <span className="text-3xl font-bold text-primary">${pkg.price.toLocaleString()}</span>
                </div>
                <BookingForm prefilledDestination={pkg.title} />
              </div>

              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                <h4 className="font-bold mb-2">Need Help?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Speak to our travel expert for custom requirements or group bookings.
                </p>
                <div className="flex items-center gap-2 font-bold text-primary">
                  <span className="text-lg">+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

function PackageDetailSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="h-[60vh] bg-muted animate-pulse" />
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <Skeleton className="h-12 w-1/3" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-12 w-1/4" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
          <div className="lg:col-span-1">
            <Skeleton className="h-[500px] w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
