import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

// Simple in-memory cache for rooms data
let roomsCache: any = null;
let roomsCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function registerRoutes(app: Express): Promise<Server> {
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
