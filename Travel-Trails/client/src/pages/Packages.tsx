import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { usePackages } from "@/hooks/use-packages";
import { PackageCard } from "@/components/PackageCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Domestic", "International", "Honeymoon", "Adventure"];

export default function Packages() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Pass undefined if "All" is selected to fetch everything
  const { data: packages, isLoading } = usePackages({
    category: selectedCategory === "All" ? undefined : selectedCategory
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-primary pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Explore Our Packages
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Find the perfect vacation package that suits your style and budget. Filter by category to find exactly what you're looking for.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-lg border border-border/50 flex flex-wrap justify-center gap-2 max-w-4xl mx-auto mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200",
                selectedCategory === cat
                  ? "bg-primary text-white shadow-md"
                  : "bg-transparent text-muted-foreground hover:bg-slate-100"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="pb-24">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          ) : packages?.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-muted-foreground">No packages found in this category.</h3>
              <Button 
                variant="link" 
                onClick={() => setSelectedCategory("All")}
                className="mt-4"
              >
                View all packages
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages?.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
