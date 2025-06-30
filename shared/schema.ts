import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactInquiries = pgTable("contact_inquiries", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  service: text("service"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quoteRequests = pgTable("quote_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  service: text("service").notNull(),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  vehicleType: text("vehicle_type"),
  quantity: text("quantity"),
  additionalInfo: text("additional_info"),
  estimatedPrice: text("estimated_price"),
  gamificationScore: text("gamification_score"),
  completionBadge: text("completion_badge"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactInquirySchema = createInsertSchema(contactInquiries).omit({
  id: true,
  createdAt: true,
});

export const insertQuoteRequestSchema = createInsertSchema(quoteRequests).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type ContactInquiry = typeof contactInquiries.$inferSelect;
export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
export type QuoteRequest = typeof quoteRequests.$inferSelect;
export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;
