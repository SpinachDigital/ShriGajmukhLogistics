# Shri Gajmukh Motors - Automotive Logistics Platform

## Overview

This is a full-stack web application for Shri Gajmukh Motors Pvt. Ltd., an automotive logistics company. The application is a modern single-page application built with React and TypeScript on the frontend, Express.js on the backend, and uses PostgreSQL for data storage. The system provides a professional company website with contact forms, quote request functionality, and a photo gallery showcasing the company's services.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom brand colors and theming
- **State Management**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints for contact and quote submissions
- **Validation**: Zod schemas for request validation
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL store

### Database Architecture
- **Primary Database**: PostgreSQL
- **ORM**: Drizzle ORM for type-safe database queries
- **Migration System**: Drizzle Kit for database schema migrations
- **Connection**: Neon Database serverless driver for PostgreSQL

## Key Components

### Frontend Components
- **Header**: Navigation with mobile-responsive menu and company branding
- **Hero Slider**: Image carousel with call-to-action buttons
- **Welcome Section**: Company introduction with statistics
- **Services Section**: Grid layout showcasing available services
- **Photo Gallery**: Interactive image gallery with modal viewing
- **Contact Section**: Contact form with service selection
- **Quote Modal**: Detailed quote request form
- **Footer**: Company information and social media links

### Backend Services
- **Contact API**: Handles general contact inquiries
- **Quote API**: Processes detailed quote requests
- **Storage Layer**: Database operations with memory fallback
- **Error Handling**: Centralized error handling with proper HTTP status codes

### Database Schema
- **Users Table**: User authentication (prepared for future admin features)
- **Contact Inquiries**: General contact form submissions
- **Quote Requests**: Detailed transportation quote requests

## Data Flow

1. **Client Requests**: Users interact with forms on the frontend
2. **Form Validation**: Client-side validation using Zod schemas
3. **API Calls**: TanStack Query manages API requests to Express backend
4. **Server Validation**: Backend validates requests using shared Zod schemas
5. **Database Operations**: Drizzle ORM handles PostgreSQL operations
6. **Response Handling**: Success/error feedback through toast notifications

## External Dependencies

### Frontend Dependencies
- **UI Library**: Radix UI primitives for accessible components
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date manipulation
- **Form Management**: React Hook Form with Hookform resolvers
- **HTTP Client**: Built-in fetch API with custom wrappers

### Backend Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connectivity
- **ORM**: Drizzle ORM with PostgreSQL adapter
- **Session Store**: connect-pg-simple for PostgreSQL session storage
- **Validation**: Zod for schema validation
- **Development**: tsx for TypeScript execution

### Build Tools
- **Bundler**: Vite for frontend builds
- **Compiler**: esbuild for server-side bundling
- **TypeScript**: Full TypeScript support across the stack
- **PostCSS**: For Tailwind CSS processing

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with Replit environment
- **Database**: PostgreSQL 16 module
- **Hot Reload**: Vite HMR for frontend, tsx for backend
- **Port Configuration**: Frontend dev server on port 5000

### Production Build
- **Frontend**: Vite builds optimized static assets
- **Backend**: esbuild creates production server bundle
- **Deployment**: Autoscale deployment target on Replit
- **Static Assets**: Served from dist/public directory

### Environment Configuration
- **Database URL**: Required environment variable for PostgreSQL connection
- **Session Management**: Production-ready session configuration
- **CORS**: Configured for production domain
- **Error Handling**: Production error logging and user-friendly messages

## Changelog

```
Changelog:
- June 20, 2025. Initial setup with modern logistics website
- June 20, 2025. Integrated company logo and updated brand colors to #0c256f
- June 20, 2025. Restructured services to match Odicee Carriers format
- June 20, 2025. Updated driver count to 500+ Professional Drivers
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```