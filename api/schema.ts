import { z } from "zod";

export interface Room {
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

export type InsertRoom = Omit<Room, 'id'>;

export interface Contact {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: Date;
}

export const insertContactSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    subject: z.string().min(1),
    message: z.string().min(1),
});

export type InsertContact = z.infer<typeof insertContactSchema>;
