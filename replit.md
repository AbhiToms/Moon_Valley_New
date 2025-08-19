# Overview

Moon Valley - A Tropical Hut is a nature-focused hilltop accommodation website built as a full-stack application. Located at Palakkayam Thattu, Kerala at 3,500 feet above sea level, the application allows users to browse tropical hut accommodations, explore natural amenities and adventure activities, view a photo gallery, make room bookings, and contact the resort. It features a modern, responsive design with a nature/mountain theme and focuses on providing an authentic experience for guests seeking a peaceful retreat in the Western Ghats.

## Recent Changes (August 2025)
- Updated with authentic information from the real Moon Valley - A Tropical Hut at Palakkayam Thattu, Kerala
- Replaced synthetic testimonials with customer feedback based on actual Google Business reviews (4.4/5 rating from 57 reviews)
- Removed luxury spa references as requested - resort focuses on nature experiences rather than luxury amenities
- Updated contact information to match real business: +91 9446 98 68 82, Kannur 670571, Kerala
- Enhanced activities section with authentic adventure offerings: zorbing, zip lining, rope courses
- Adjusted positioning from "luxury resort" to "comfortable nature retreat" with tropical hut experience
- Updated location details to reflect 360-degree panoramic views and 3,500 feet elevation

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client is built with React and TypeScript, using Vite as the build tool. The UI is constructed with shadcn/ui components based on Radix UI primitives and styled with Tailwind CSS. The design follows a component-based architecture with:

- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **Typography**: Multiple Google Fonts (Playfair Display, Inter, etc.) for enhanced visual hierarchy

The frontend implements a single-page application structure with smooth scrolling navigation between sections (hero, rooms, amenities, activities, gallery, booking, testimonials, contact).

## Backend Architecture
The server is built with Express.js and TypeScript, following a RESTful API design pattern. The architecture includes:

- **Server Framework**: Express.js with custom middleware for request logging
- **Development Setup**: Vite integration for hot module replacement in development
- **API Routes**: RESTful endpoints for rooms, bookings, and contacts
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development
- **Validation**: Zod schemas shared between client and server for type safety

## Data Storage Solutions
The application uses a flexible storage architecture:

- **Database**: PostgreSQL with Drizzle ORM for production
- **Development Storage**: In-memory storage implementation with pre-seeded resort data
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Connection**: Neon Database serverless driver for PostgreSQL connectivity

## Database Schema Design
Three main entities with UUID primary keys:
- **Rooms**: Stores accommodation details (name, description, price, amenities, images)
- **Bookings**: Guest reservation information with temporal constraints
- **Contacts**: Customer inquiry form submissions

The schema uses PostgreSQL-specific features like array types for amenities and timestamp handling for bookings.

# External Dependencies

## UI Framework & Components
- **shadcn/ui**: Complete UI component library built on Radix UI primitives
- **Radix UI**: Headless component primitives for accessibility and behavior
- **Tailwind CSS**: Utility-first CSS framework with custom design system

## Database & ORM
- **Neon Database**: Serverless PostgreSQL platform for cloud database hosting
- **Drizzle ORM**: Type-safe ORM with excellent TypeScript integration
- **Drizzle Kit**: Database toolkit for migrations and schema management

## Form & Validation
- **React Hook Form**: Performance-focused form library with minimal re-renders
- **Zod**: TypeScript-first schema validation library
- **@hookform/resolvers**: Integration layer between React Hook Form and Zod

## Development & Build Tools
- **Vite**: Fast build tool and development server with HMR
- **TypeScript**: Static type checking across the entire application
- **ESBuild**: Fast bundler for production server builds

## Utility Libraries
- **TanStack React Query**: Server state management and caching
- **Wouter**: Minimalist router for React applications
- **date-fns**: Date manipulation and formatting utilities
- **class-variance-authority**: Utility for creating component variants
- **clsx & tailwind-merge**: Conditional CSS class manipulation