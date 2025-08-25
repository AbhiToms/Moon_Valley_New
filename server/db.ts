import { drizzle } from "drizzle-orm/neon-serverless";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { rooms, bookings, contacts } from "@shared/schema";
import type { Room, Booking, InsertBooking, Contact, InsertContact } from "@shared/schema";
import type { IStorage } from "./storage";

// For now, let's disable the database storage and use memory storage
// We'll fix this later once the basic booking system is working

// Placeholder for database storage - will implement later
export class DatabaseStorage implements IStorage {
  async getRooms(): Promise<Room[]> {
    throw new Error("Database storage not implemented yet");
  }

  async getRoom(id: string): Promise<Room | undefined> {
    throw new Error("Database storage not implemented yet");
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    throw new Error("Database storage not implemented yet");
  }

  async getBookings(): Promise<Booking[]> {
    throw new Error("Database storage not implemented yet");
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    throw new Error("Database storage not implemented yet");
  }

  async getContacts(): Promise<Contact[]> {
    throw new Error("Database storage not implemented yet");
  }
}

// Export the database storage instance (disabled for now)
export const dbStorage = new DatabaseStorage();