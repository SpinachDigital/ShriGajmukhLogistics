import { users, contactInquiries, quoteRequests, type User, type InsertUser, type ContactInquiry, type InsertContactInquiry, type QuoteRequest, type InsertQuoteRequest } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  createQuoteRequest(quote: InsertQuoteRequest): Promise<QuoteRequest>;
  getContactInquiries(): Promise<ContactInquiry[]>;
  getQuoteRequests(): Promise<QuoteRequest[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactInquiries: Map<number, ContactInquiry>;
  private quoteRequests: Map<number, QuoteRequest>;
  private currentUserId: number;
  private currentInquiryId: number;
  private currentQuoteId: number;

  constructor() {
    this.users = new Map();
    this.contactInquiries = new Map();
    this.quoteRequests = new Map();
    this.currentUserId = 1;
    this.currentInquiryId = 1;
    this.currentQuoteId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactInquiry(insertInquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const id = this.currentInquiryId++;
    const inquiry: ContactInquiry = {
      ...insertInquiry,
      id,
      phone: insertInquiry.phone ?? null,
      service: insertInquiry.service ?? null,
      createdAt: new Date(),
    };
    this.contactInquiries.set(id, inquiry);
    return inquiry;
  }

  async createQuoteRequest(insertQuote: InsertQuoteRequest): Promise<QuoteRequest> {
    const id = this.currentQuoteId++;
    const quote: QuoteRequest = {
      id,
      name: insertQuote.name,
      email: insertQuote.email,
      phone: insertQuote.phone,
      service: insertQuote.service,
      origin: insertQuote.origin,
      destination: insertQuote.destination,
      vehicleType: insertQuote.vehicleType ?? null,
      quantity: insertQuote.quantity ?? null,
      additionalInfo: insertQuote.additionalInfo ?? null,
      estimatedPrice: insertQuote.estimatedPrice ?? null,
      gamificationScore: insertQuote.gamificationScore ?? null,
      completionBadge: insertQuote.completionBadge ?? null,
      createdAt: new Date(),
    };
    this.quoteRequests.set(id, quote);
    return quote;
  }

  async getContactInquiries(): Promise<ContactInquiry[]> {
    return Array.from(this.contactInquiries.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getQuoteRequests(): Promise<QuoteRequest[]> {
    return Array.from(this.quoteRequests.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

export const storage = new MemStorage();
