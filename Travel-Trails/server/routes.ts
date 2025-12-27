import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { insertInquirySchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.packages.list.path, async (req, res) => {
    const category = req.query.category as string | undefined;
    const featured = req.query.featured === 'true';
    const packages = await storage.getPackages(category, featured);
    res.json(packages);
  });

  app.get(api.packages.get.path, async (req, res) => {
    const pkg = await storage.getPackage(Number(req.params.id));
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json(pkg);
  });

  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(input);
      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingPackages = await storage.getPackages();
  if (existingPackages.length === 0) {
    const seedPackages = [
      {
        title: "Majestic Dubai",
        description: "Experience the luxury of Dubai with desert safari, Burj Khalifa, and shopping.",
        image: "https://images.unsplash.com/photo-1512453979798-5ea904ac6605?auto=format&fit=crop&q=80",
        price: 1200,
        duration: "5 Days / 4 Nights",
        rating: 5,
        category: "International",
        location: "Dubai, UAE",
        featured: true
      },
      {
        title: "Bali Bliss",
        description: "Relax on the beautiful beaches of Bali and explore ancient temples.",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80",
        price: 900,
        duration: "6 Days / 5 Nights",
        rating: 4,
        category: "International",
        location: "Bali, Indonesia",
        featured: true
      },
      {
        title: "Kashmir Paradise",
        description: "Witness the heaven on earth with Shikara rides and snow-capped mountains.",
        image: "https://images.unsplash.com/photo-1595867865339-b78141253c36?auto=format&fit=crop&q=80",
        price: 600,
        duration: "5 Days / 4 Nights",
        rating: 5,
        category: "Domestic",
        location: "Kashmir, India",
        featured: true
      },
      {
        title: "Goa Beach Vibes",
        description: "Party, beaches, and water sports in the party capital of India.",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80",
        price: 400,
        duration: "4 Days / 3 Nights",
        rating: 4,
        category: "Domestic",
        location: "Goa, India",
        featured: false
      },
      {
        title: "Swiss Alps Adventure",
        description: "Hiking, skiing, and breathtaking views in the Swiss Alps.",
        image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80",
        price: 2500,
        duration: "7 Days / 6 Nights",
        rating: 5,
        category: "Adventure",
        location: "Interlaken, Switzerland",
        featured: true
      },
      {
        title: "Maldives Honeymoon",
        description: "Romantic getaway in private water villas with crystal clear water.",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80",
        price: 3000,
        duration: "5 Days / 4 Nights",
        rating: 5,
        category: "Honeymoon",
        location: "Maldives",
        featured: true
      }
    ];

    for (const pkg of seedPackages) {
      await storage.createPackage(pkg);
    }
  }
}
