import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO, HERO_SLIDES } from "@/lib/constants";

interface HeroSliderProps {
  onOpenQuoteModal: () => void;
}

export default function HeroSlider({ onOpenQuoteModal }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative h-screen bg-gray-900 overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-deep-blue bg-opacity-70"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Driving Excellence,<br />
              <span className="text-electric-blue">Delivering Trust</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
              {COMPANY_INFO.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={scrollToServices}
                size="lg"
                className="bg-electric-blue text-white hover:bg-blue-600 text-lg px-8 py-4"
              >
                Explore Our Services
              </Button>
              <Button
                onClick={onOpenQuoteModal}
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-deep-blue text-lg px-8 py-4"
              >
                Get a Quote
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-electric-blue"
                : "bg-white opacity-50 hover:opacity-100"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
