import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertQuoteRequestSchema } from "@shared/schema";
import { X } from "lucide-react";
import type { InsertQuoteRequest } from "@shared/schema";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const { toast } = useToast();
  
  const form = useForm<InsertQuoteRequest>({
    resolver: zodResolver(insertQuoteRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      origin: "",
      destination: "",
      vehicleType: "",
      quantity: "",
      additionalInfo: "",
    },
  });

  const quoteMutation = useMutation({
    mutationFn: async (data: InsertQuoteRequest) => {
      return await apiRequest("POST", "/api/quote", data);
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Sent!",
        description: "We'll review your requirements and get back to you with a detailed quote.",
      });
      form.reset();
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send quote request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertQuoteRequest) => {
    quoteMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-charcoal flex items-center justify-between">
            Request a Quote
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input {...field} className="focus:border-electric-blue focus:ring-electric-blue" />
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
                    <FormLabel>Phone Number *</FormLabel>
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
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
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
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Required *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="focus:border-electric-blue focus:ring-electric-blue">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
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

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origin Location *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="City, State"
                        className="focus:border-electric-blue focus:ring-electric-blue"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="City, State"
                        className="focus:border-electric-blue focus:ring-electric-blue"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="vehicleType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Type</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g., Cars, Trucks, Motorcycles"
                        className="focus:border-electric-blue focus:ring-electric-blue"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Number of vehicles"
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
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={3}
                      placeholder="Any special requirements, timeline, or additional details..."
                      className="focus:border-electric-blue focus:ring-electric-blue resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={quoteMutation.isPending}
                className="bg-electric-blue text-white hover:bg-deep-blue"
              >
                {quoteMutation.isPending ? "Sending..." : "Request Quote"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
