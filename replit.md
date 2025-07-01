# Shri Gajmukh Motors - Automotive Logistics Platform

## Overview

This is a full-stack web application for Shri Gajmukh Motors Pvt. Ltd., an automotive logistics company. The application has been converted from React/Node.js to a pure PHP implementation, providing a professional company website with contact forms, quote request functionality, and a photo gallery showcasing the company's services. The system uses modern PHP 8.2 with PostgreSQL for data storage.

## System Architecture

### Application Architecture
- **Language**: PHP 8.2 with built-in development server
- **Frontend**: Server-side rendered HTML with Tailwind CSS
- **JavaScript**: Vanilla JavaScript for interactive functionality
- **Styling**: Tailwind CSS CDN with custom brand colors (#0c256f primary blue)
- **Icons**: Font Awesome for UI icons and visual elements
- **Responsive Design**: Mobile-first responsive design approach

### Backend Architecture
- **Runtime**: PHP 8.2 built-in development server
- **API Design**: Single-file PHP application with POST endpoint handling
- **Database**: PostgreSQL with PDO for database operations
- **Session Management**: PHP native sessions
- **Form Handling**: Native PHP form processing with validation

### Database Architecture
- **Primary Database**: PostgreSQL
- **Connection**: PHP PDO with PostgreSQL driver
- **Tables**: contact_inquiries, quote_requests (using existing schema)
- **Fallback**: In-memory storage when database is unavailable

## Key Components

### Application Components
- **Header**: Navigation with mobile-responsive menu and company branding
- **Hero Slider**: JavaScript-powered image carousel with auto-advance
- **Welcome Section**: Company introduction with statistics (58+ years, 500+ drivers)
- **Services Section**: 8 service cards with hover effects
- **Photo Gallery**: Interactive image gallery with modal viewing
- **Contact Section**: Contact form with AJAX submission
- **Quote Modal**: Detailed quote request form
- **Footer**: Company information and contact details

### PHP Endpoints
- **Contact Handler**: Processes contact form submissions
- **Quote Handler**: Processes quote request submissions
- **Database Layer**: PDO-based PostgreSQL operations with fallback
- **Session Management**: PHP session handling for user interactions

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
- June 20, 2025. Added Instant Quote Gamification Feature
- July 1, 2025. Converted entire application from React/Node.js to PHP
- July 1, 2025. Removed Instant Quote Gamification per user request
- July 1, 2025. Implemented single-file PHP application with Tailwind CSS
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```