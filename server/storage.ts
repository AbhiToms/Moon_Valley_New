import { type Room, type InsertRoom, type Booking, type InsertBooking, type Contact, type InsertContact, type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Room methods
  getRooms(): Promise<Room[]>;
  getRoom(id: string): Promise<Room | undefined>;

  // Booking methods
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookings(): Promise<Booking[]>;
  getBookingsByEmail(email: string): Promise<Booking[]>;

  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;

  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private rooms: Map<string, Room>;
  private bookings: Map<string, Booking>;
  private contacts: Map<string, Contact>;
  private users: Map<string, User>;

  constructor() {
    this.rooms = new Map();
    this.bookings = new Map();
    this.contacts = new Map();
    this.users = new Map();

    // Initialize with resort rooms
    this.initializeRooms();
  }

  private initializeRooms() {
    const roomsData: Omit<Room, 'id'>[] = [
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

    roomsData.forEach(roomData => {
      const id = randomUUID();
      const room: Room = { ...roomData, id };
      this.rooms.set(id, room);
    });
  }

  async getRooms(): Promise<Room[]> {
    return Array.from(this.rooms.values());
  }

  async getRoom(id: string): Promise<Room | undefined> {
    return this.rooms.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    // Generate custom booking ID with MV- prefix
    // Format: MV-TIMESTAMP-RANDOM (e.g., MV-L8K9M2N3-4A5B6C7D)
    const timestamp = Date.now().toString(36).toUpperCase(); // Convert timestamp to base36
    const randomPart = randomUUID().substring(0, 8).toUpperCase().replace(/-/g, ''); // 8 chars from UUID
    const id = `MV-${timestamp}-${randomPart}`;

    console.log(`[Storage] Creating booking with custom ID: ${id}`);

    const booking: Booking = {
      ...insertBooking,
      id,
      address: insertBooking.address || null,
      status: "confirmed",
      specialRequests: insertBooking.specialRequests || null,
      createdAt: new Date(),
    };
    this.bookings.set(id, booking);
    console.log(`[Storage] Booking created successfully:`, { id: booking.id, roomType: booking.roomType, email: booking.email });
    return booking;
  }

  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBookingsByEmail(email: string): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.email.toLowerCase() === email.toLowerCase()
    );
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }
}

import { dbStorage } from "./db";

// Temporarily use memory storage until database issue is resolved
export const storage = new MemStorage();
