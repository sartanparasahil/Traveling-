import { Link } from "wouter";
import { Star, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Package } from "@shared/schema";

interface PackageCardProps {
  pkg: Package;
}

export function PackageCard({ pkg }: PackageCardProps) {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden border border-border/50 shadow-lg hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={pkg.image} 
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
          {pkg.category}
        </div>
        {pkg.featured && (
          <div className="absolute top-4 left-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center text-secondary text-sm font-medium">
            <Star className="w-4 h-4 fill-current mr-1" />
            {pkg.rating}
          </div>
          <div className="text-2xl font-display font-bold text-primary">
            ${pkg.price.toLocaleString()}
          </div>
        </div>

        <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
          {pkg.title}
        </h3>

        <div className="flex items-center text-muted-foreground text-sm mb-4 space-x-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1.5" />
            {pkg.duration}
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1.5" />
            {pkg.location}
          </div>
        </div>

        <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-grow">
          {pkg.description}
        </p>

        <Link href={`/package/${pkg.id}`} className="w-full">
          <Button className="w-full group/btn" variant="outline">
            View Details
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
