import { type Room, type InsertRoom, type Booking, type InsertBooking, type Contact, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Room methods
  getRooms(): Promise<Room[]>;
  getRoom(id: string): Promise<Room | undefined>;
  
  // Booking methods
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookings(): Promise<Booking[]>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private rooms: Map<string, Room>;
  private bookings: Map<string, Booking>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.rooms = new Map();
    this.bookings = new Map();
    this.contacts = new Map();
    
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
    const id = randomUUID();
    const booking: Booking = {
      ...insertBooking,
      id,
      specialRequests: insertBooking.specialRequests || null,
      createdAt: new Date(),
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
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
}

export const storage = new MemStorage();
