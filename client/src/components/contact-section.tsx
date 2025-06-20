import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactInquirySchema } from "@shared/schema";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { COMPANY_INFO, SOCIAL_LINKS } from "@/lib/constants";
import type { InsertContactInquiry } from "@shared/schema";

export default function ContactSection() {
  const { toast } = useToast();
  
  const form = useForm<InsertContactInquiry>({
    resolver: zodResolver(insertContactInquirySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactInquiry) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your inquiry. We'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactInquiry) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-charcoal mb-6">Contact Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our team for professional automotive logistics solutions. We're here to help with all your transportation needs.
          </p>
          <div className="w-24 h-1 bg-electric-blue mx-auto mt-8"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-charcoal mb-6">Get in Touch</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Ready to discuss your logistics needs? Our experienced team is standing by to provide you with customized transportation solutions.
                </p>
              </div>

              <div className="grid gap-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-electric-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal mb-2">Phone</h4>
                    <p className="text-gray-600">{COMPANY_INFO.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-electric-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal mb-2">Email</h4>
                    <p className="text-gray-600">{COMPANY_INFO.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-electric-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal mb-2">Location</h4>
                    <p className="text-gray-600">{COMPANY_INFO.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-electric-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="text-white text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal mb-2">Business Hours</h4>
                    <p className="text-gray-600">Mon - Sat: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-8 border-t border-gray-200">
                <h4 className="font-semibold text-charcoal mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href={SOCIAL_LINKS.facebook}
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-electric-blue hover:text-white transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.instagram}
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-electric-blue hover:text-white transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.twitter}
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-electric-blue hover:text-white transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-electric-blue hover:text-white transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-gray-50 rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-charcoal mb-6">Send Us a Message</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-charcoal">First Name *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="focus:border-electric-blue focus:ring-electric-blue"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-charcoal">Last Name *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="focus:border-electric-blue focus:ring-electric-blue"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-charcoal">Email Address *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              {...field}
                              className="focus:border-electric-blue focus:ring-electric-blue"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-charcoal">Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              {...field}
                              className="focus:border-electric-blue focus:ring-electric-blue"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-charcoal">Service Required</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="focus:border-electric-blue focus:ring-electric-blue">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="automotive-logistics">Automotive Logistics</SelectItem>
                              <SelectItem value="curtain-carriers">Curtain Carriers</SelectItem>
                              <SelectItem value="tractor-carriers">Tractor Carriers</SelectItem>
                              <SelectItem value="2wheeler-carriers">2 Wheeler Carriers</SelectItem>
                              <SelectItem value="freight-forwarding">Freight Forwarding</SelectItem>
                              <SelectItem value="project-cargo">Project Cargo / ODC</SelectItem>
                              <SelectItem value="heavy-lift">Break Bulk / Heavy Lift</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-charcoal">Message *</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={4}
                              placeholder="Tell us about your logistics requirements..."
                              className="focus:border-electric-blue focus:ring-electric-blue resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={contactMutation.isPending}
                      className="w-full bg-electric-blue text-white hover:bg-deep-blue py-4"
                    >
                      {contactMutation.isPending ? "Sending..." : "Submit Inquiry"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
