import { db } from "./db";
import {
  packages,
  inquiries,
  type InsertPackage,
  type InsertInquiry,
  type Package,
  type Inquiry
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getPackages(category?: string, featured?: boolean): Promise<Package[]>;
  getPackage(id: number): Promise<Package | undefined>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  // Seed method
  createPackage(pkg: InsertPackage): Promise<Package>;
}

export class DatabaseStorage implements IStorage {
  async getPackages(category?: string, featured?: boolean): Promise<Package[]> {
    let query = db.select().from(packages);
    
    if (category && category !== 'All') {
      // @ts-ignore - dynamic query construction
      query = query.where(eq(packages.category, category));
    }
    
    if (featured) {
      // @ts-ignore
      query = query.where(eq(packages.featured, true));
    }
    
    return await query.orderBy(desc(packages.id));
  }

  async getPackage(id: number): Promise<Package | undefined> {
    const [pkg] = await db.select().from(packages).where(eq(packages.id, id));
    return pkg;
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const [newInquiry] = await db.insert(inquiries).values(inquiry).returning();
    return newInquiry;
  }

  async createPackage(pkg: InsertPackage): Promise<Package> {
    const [newPkg] = await db.insert(packages).values(pkg).returning();
    return newPkg;
  }
}

export const storage = new DatabaseStorage();
