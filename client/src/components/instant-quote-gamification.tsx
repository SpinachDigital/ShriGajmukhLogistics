import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertQuoteRequestSchema } from "@shared/schema";
import { Truck, MapPin, Package, Trophy, Star, Zap, Target, Award } from "lucide-react";
import { z } from "zod";
import type { InsertQuoteRequest } from "@shared/schema";

const gamificationQuoteSchema = insertQuoteRequestSchema.extend({
  estimatedPrice: z.string().optional(),
  gamificationScore: z.string().optional(),
  completionBadge: z.string().optional(),
});

type GamificationQuoteRequest = z.infer<typeof gamificationQuoteSchema>;

interface QuoteCalculation {
  basePrice: number;
  distanceMultiplier: number;
  serviceMultiplier: number;
  quantityDiscount: number;
  finalPrice: number;
  score: number;
  badge: string;
}

const servicePricing = {
  "freight-forwarding": { base: 2000, multiplier: 1.2 },
  "project-cargo": { base: 5000, multiplier: 1.8 },
  "heavy-lift": { base: 8000, multiplier: 2.2 },
  "curtain-carriers": { base: 1500, multiplier: 1.0 },
  "tractor-carriers": { base: 3000, multiplier: 1.5 },
  "2wheeler-carriers": { base: 800, multiplier: 0.8 },
};

const badges = [
  { name: "Logistics Rookie", icon: Star, color: "bg-gray-500", minScore: 0 },
  { name: "Transport Pro", icon: Truck, color: "bg-blue-500", minScore: 30 },
  { name: "Freight Master", icon: Package, color: "bg-green-500", minScore: 60 },
  { name: "Logistics Legend", icon: Trophy, color: "bg-yellow-500", minScore: 90 },
];

export default function InstantQuoteGamification() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [calculation, setCalculation] = useState<QuoteCalculation | null>(null);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const form = useForm<GamificationQuoteRequest>({
    resolver: zodResolver(gamificationQuoteSchema),
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
    mutationFn: async (data: GamificationQuoteRequest) => {
      return await apiRequest("POST", "/api/quote", data);
    },
    onSuccess: () => {
      toast({
        title: "🎉 Quote Request Completed!",
        description: "Congratulations! Your gamified quote has been submitted successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const calculateQuote = (formData: any): QuoteCalculation => {
    const service = servicePricing[formData.service as keyof typeof servicePricing];
    if (!service) return { basePrice: 0, distanceMultiplier: 1, serviceMultiplier: 1, quantityDiscount: 0, finalPrice: 0, score: 0, badge: "Logistics Rookie" };

    // Simulate distance calculation (in real app, you'd use Google Maps API)
    const estimatedDistance = Math.floor(Math.random() * 1000) + 100;
    const distanceMultiplier = Math.max(1, estimatedDistance / 500);
    
    // Quantity discount
    const quantity = parseInt(formData.quantity) || 1;
    const quantityDiscount = quantity > 5 ? 0.15 : quantity > 2 ? 0.1 : 0;
    
    const basePrice = service.base * service.multiplier;
    const finalPrice = Math.round(basePrice * distanceMultiplier * (1 - quantityDiscount));
    
    // Calculate gamification score
    let score = 20; // Base score for starting
    score += formData.name ? 10 : 0;
    score += formData.email ? 10 : 0;
    score += formData.phone ? 10 : 0;
    score += formData.service ? 15 : 0;
    score += formData.origin ? 10 : 0;
    score += formData.destination ? 10 : 0;
    score += formData.vehicleType ? 5 : 0;
    score += formData.quantity ? 5 : 0;
    score += formData.additionalInfo ? 5 : 0;
    
    // Bonus points for completing all fields
    if (score >= 95) score = 100;
    
    const badge = badges.reduce((prev, curr) => 
      score >= curr.minScore ? curr : prev
    ).name;

    return {
      basePrice,
      distanceMultiplier,
      serviceMultiplier: service.multiplier,
      quantityDiscount,
      finalPrice,
      score,
      badge,
    };
  };

  const nextStep = () => {
    const currentData = form.getValues();
    const calc = calculateQuote(currentData);
    setCalculation(calc);
    
    if (step < 4) {
      setStep(step + 1);
      setProgress((step / 4) * 100);
    } else {
      setShowResults(true);
      setProgress(100);
    }
  };

  const submitQuote = () => {
    const formData = form.getValues();
    if (calculation) {
      const submissionData: GamificationQuoteRequest = {
        ...formData,
        estimatedPrice: `₹${calculation.finalPrice.toLocaleString()}`,
        gamificationScore: calculation.score.toString(),
        completionBadge: calculation.badge,
      };
      quoteMutation.mutate(submissionData);
    }
  };

  const currentBadge = calculation ? badges.find(b => b.name === calculation.badge) : badges[0];
  const BadgeIcon = currentBadge?.icon || Star;

  useEffect(() => {
    setProgress((step / 4) * 100);
  }, [step]);

  if (showResults && calculation) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className="bg-gradient-to-r from-electric-blue to-deep-blue text-white">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Badge className={`${currentBadge?.color} text-white text-lg px-6 py-2 mb-4`}>
                <BadgeIcon className="w-6 h-6 mr-2" />
                {calculation.badge}
              </Badge>
            </div>
            <h2 className="text-4xl font-bold mb-4">🎉 Instant Quote Generated!</h2>
            <div className="text-6xl font-bold mb-2">₹{calculation.finalPrice.toLocaleString()}</div>
            <p className="text-xl opacity-90">Estimated Transportation Cost</p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Your Score</h3>
                <div className="text-3xl font-bold">{calculation.score}/100</div>
                <Progress value={calculation.score} className="mt-2" />
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Savings Applied</h3>
                <div className="text-3xl font-bold">{(calculation.quantityDiscount * 100).toFixed(0)}%</div>
                <p className="text-sm opacity-80">Volume discount</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-6 h-6 mr-2 text-electric-blue" />
              Quote Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span>Base Service Cost</span>
                <span className="font-semibold">₹{calculation.basePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span>Distance Factor</span>
                <span className="font-semibold">×{calculation.distanceMultiplier.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span>Volume Discount</span>
                <span className="font-semibold text-green-600">-{(calculation.quantityDiscount * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between items-center py-3 border-t-2 text-lg font-bold">
                <span>Final Estimate</span>
                <span className="text-electric-blue">₹{calculation.finalPrice.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center space-x-4">
          <Button onClick={() => setShowResults(false)} variant="outline">
            Modify Quote
          </Button>
          <Button onClick={submitQuote} disabled={quoteMutation.isPending} className="bg-electric-blue hover:bg-deep-blue">
            {quoteMutation.isPending ? "Submitting..." : "Confirm & Submit Quote"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-electric-blue flex items-center justify-center">
            <Zap className="w-8 h-8 mr-2" />
            Instant Quote Game
          </CardTitle>
          <p className="text-gray-600">Complete the steps to unlock your personalized quote and earn badges!</p>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
          
          {calculation && (
            <div className="mt-4 flex justify-center">
              <Badge className={`${currentBadge?.color} text-white`}>
                <BadgeIcon className="w-4 h-4 mr-1" />
                {calculation.badge} • Score: {calculation.score}/100
              </Badge>
            </div>
          )}
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Package className="w-5 h-5 mr-2 text-electric-blue" />
                    Step 1: Service Selection
                  </h3>
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose your logistics service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="freight-forwarding">Freight Forwarding</SelectItem>
                            <SelectItem value="project-cargo">Project Cargo / ODC</SelectItem>
                            <SelectItem value="heavy-lift">Break Bulk / Heavy Lift</SelectItem>
                            <SelectItem value="curtain-carriers">Curtain Carriers</SelectItem>
                            <SelectItem value="tractor-carriers">Tractor Carriers</SelectItem>
                            <SelectItem value="2wheeler-carriers">2 Wheeler Carriers</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vehicleType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle/Cargo Type</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} placeholder="e.g., Cars, Trucks, Machinery" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-electric-blue" />
                    Step 2: Route Details
                  </h3>
                  <FormField
                    control={form.control}
                    name="origin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Origin Location *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Starting city/location" />
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
                          <Input {...field} placeholder="Delivery city/location" />
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
                          <Input {...field} value={field.value || ""} type="number" placeholder="Number of items/vehicles" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Truck className="w-5 h-5 mr-2 text-electric-blue" />
                    Step 3: Contact Information
                  </h3>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
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
                          <Input {...field} type="tel" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Award className="w-5 h-5 mr-2 text-electric-blue" />
                    Step 4: Additional Details (Bonus Points!)
                  </h3>
                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Requirements</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} placeholder="Any special handling, timeline, or requirements" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="bg-gradient-to-r from-electric-blue/10 to-deep-blue/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-electric-blue mb-2">🎯 Complete Your Profile for Maximum Score!</h4>
                    <p className="text-sm text-gray-600">
                      Fill out all fields to unlock the "Logistics Legend" badge and get the best possible quote with maximum discounts!
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                    Previous
                  </Button>
                )}
                <Button 
                  type="button" 
                  onClick={nextStep}
                  className="bg-electric-blue hover:bg-deep-blue ml-auto"
                >
                  {step === 4 ? "Generate Quote" : "Next Step"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}