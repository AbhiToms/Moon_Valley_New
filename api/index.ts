import express, { type Express, type Request, Response } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { randomUUID } from "crypto";

// --- Schema Definitions (from api/schema.ts) ---
interface Room {
    id: string;
    name: string;
    description: string;
    price: number;
    rating: string;
    beds: number;
    baths: number;
    amenities: string[];
    image: string;
}

type InsertRoom = Omit<Room, 'id'>;

interface Contact {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: Date;
}

const insertContactSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    subject: z.string().min(1),
    message: z.string().min(1),
});

type InsertContact = z.infer<typeof insertContactSchema>;

// --- Storage Implementation ---
interface IStorage {
    // Room methods
    getRooms(): Promise<Room[]>;
    getRoom(id: string): Promise<Room | undefined>;

    // Contact methods
    createContact(contact: InsertContact): Promise<Contact>;
    getContacts(): Promise<Contact[]>;
}

class MemStorage implements IStorage {
    private rooms: Map<string, Room>;
    private contacts: Map<string, Contact>;
    sessionStore: any;

    constructor() {
        this.rooms = new Map();
        this.contacts = new Map();
        this.sessionStore = null;

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

const storage = new MemStorage();

// --- Routes Registration ---
// Simple in-memory cache for rooms data
let roomsCache: any = null;
let roomsCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function registerRoutes(app: Express): Promise<Server> {
    // Get all rooms with caching
    app.get("/api/rooms", async (req, res) => {
        try {
            const now = Date.now();

            // Return cached data if still valid
            if (roomsCache && (now - roomsCacheTime) < CACHE_DURATION) {
                res.setHeader('X-Cache', 'HIT');
                return res.json(roomsCache);
            }

            // Fetch fresh data
            const rooms = await storage.getRooms();
            roomsCache = rooms;
            roomsCacheTime = now;

            res.setHeader('X-Cache', 'MISS');
            res.setHeader('Cache-Control', 'public, max-age=300'); // 5 minutes
            res.json(rooms);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch rooms" });
        }
    });

    // Get specific room
    app.get("/api/rooms/:id", async (req, res) => {
        try {
            const room = await storage.getRoom(req.params.id);
            if (!room) {
                return res.status(404).json({ message: "Room not found" });
            }
            res.json(room);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch room" });
        }
    });

    // Create contact message
    app.post("/api/contact", async (req, res) => {
        try {
            const validatedData = insertContactSchema.parse(req.body);
            const contact = await storage.createContact(validatedData);
            res.status(201).json(contact);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Failed to create contact message" });
            }
        }
    });

    // Get all contact messages
    app.get("/api/contacts", async (req, res) => {
        try {
            const contacts = await storage.getContacts();
            res.json(contacts);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch contact messages" });
        }
    });

    const httpServer = createServer(app);
    return httpServer;
}

// --- Main Vercel Handler ---
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let routesRegistered = false;

export default async function (req: Request, res: Response) {
    if (!routesRegistered) {
        await registerRoutes(app);
        routesRegistered = true;
    }

    // Vercel might strip the /api prefix when using rewrites to a function in api/
    // Ensure the URL passed to Express matches what we defined in routes.ts
    // If the request comes to /api/rooms, Vercel might present it as /rooms to the handler if rewrites are involved in certain ways.
    // But usually passing /api/* -> /api/index preserves it or strips it depending on config.
    // To be safe, we check.
    if (req.url && !req.url.startsWith('/api')) {
        req.url = '/api' + req.url;
    }

    app(req, res);
}
