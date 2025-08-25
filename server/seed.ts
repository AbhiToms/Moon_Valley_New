// Database seeding disabled for now - using memory storage
// import { drizzle } from "drizzle-orm/neon-serverless";
// import { neon } from "@neondatabase/serverless";
// import { rooms } from "@shared/schema";
import type { InsertRoom } from "@shared/schema";

const roomsData: InsertRoom[] = [
  {
    name: "Mountain View Suite",
    description: "Spacious suite with panoramic mountain views and private balcony",
    price: 8500,
    rating: "4.8",
    beds: 2,
    baths: 2,
    amenities: ["WiFi", "Balcony", "Mountain View", "Mini Bar"],
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    name: "Forest Cottage",
    description: "Cozy cottage nestled among trees with fireplace and garden access",
    price: 6200,
    rating: "4.7",
    beds: 1,
    baths: 1,
    amenities: ["Fireplace", "Garden Access", "WiFi", "Kitchenette"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    name: "Valley View Room",
    description: "Modern comfort with stunning valley vistas and private terrace",
    price: 7800,
    rating: "4.9",
    beds: 1,
    baths: 1,
    amenities: ["Terrace", "Valley View", "WiFi", "Air Conditioning"],
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    name: "Luxury Villa",
    description: "Premium villa with private pool and exclusive mountain access",
    price: 15000,
    rating: "5.0",
    beds: 3,
    baths: 3,
    amenities: ["Private Pool", "Mountain Access", "WiFi", "Full Kitchen"],
    image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  }
];

async function seed() {
  // Database seeding is disabled - using memory storage
  // Rooms are automatically loaded from memory storage
}

seed();