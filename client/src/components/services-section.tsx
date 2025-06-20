import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Package, Forklift, Weight, TruckIcon, Bike } from "lucide-react";
import { SERVICES } from "@/lib/constants";

interface ServicesSectionProps {
  onOpenQuoteModal: () => void;
}

const iconMap = {
  truck: Truck,
  "truck-loading": TruckIcon,
  bike: Bike,
  package: Package,
  crane: Forklift,
  weight: Weight,
};

export default function ServicesSection({ onOpenQuoteModal }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-charcoal mb-6">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Shri Gajmukh Motors offers comprehensive automotive logistics services tailored to meet your transportation needs with excellence and reliability.
          </p>
          <div className="w-24 h-1 bg-electric-blue mx-auto mt-8"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {SERVICES.map((service) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            
            return (
              <Card
                key={service.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-electric-blue rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="text-white text-xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-charcoal">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <button className="inline-flex items-center text-electric-blue hover:text-deep-blue font-semibold group-hover:translate-x-2 transition-all duration-300">
                    Read More <span className="ml-2">→</span>
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={onOpenQuoteModal}
            size="lg"
            className="bg-electric-blue text-white hover:bg-deep-blue"
          >
            Request a Custom Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
