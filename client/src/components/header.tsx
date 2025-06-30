import { useState } from "react";
import { Truck, Phone, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO } from "@/lib/constants";

interface HeaderProps {
  onOpenQuoteModal: () => void;
}

export default function Header({ onOpenQuoteModal }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Company Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/@assets/output-onlinepngtools-3-AzG7WyOJjacnoKZ2-Photoroom_1750422520317.png"
              alt="Shri Gajmukh Motors Logo"
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-charcoal hover:text-electric-blue transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-charcoal hover:text-electric-blue transition-colors font-medium"
            >
              About Us
            </button>
            <div className="relative group">
              <button
                onClick={() => scrollToSection("services")}
                className="text-charcoal hover:text-electric-blue transition-colors font-medium flex items-center"
              >
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <button
                  onClick={() => scrollToSection("services")}
                  className="block w-full text-left px-6 py-2 text-charcoal hover:bg-gray-50 hover:text-electric-blue"
                >
                  Automotive Logistics
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="block w-full text-left px-6 py-2 text-charcoal hover:bg-gray-50 hover:text-electric-blue"
                >
                  Freight Forwarding
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="block w-full text-left px-6 py-2 text-charcoal hover:bg-gray-50 hover:text-electric-blue"
                >
                  Project Cargo / ODC
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="block w-full text-left px-6 py-2 text-charcoal hover:bg-gray-50 hover:text-electric-blue"
                >
                  Break Bulk / Heavy Lift
                </button>
              </div>
            </div>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-charcoal hover:text-electric-blue transition-colors font-medium"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-charcoal hover:text-electric-blue transition-colors font-medium"
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection("instant-quote")}
              className="text-charcoal hover:text-electric-blue transition-colors font-medium"
            >
              Instant Quote
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              onClick={onOpenQuoteModal}
              className="bg-electric-blue text-white hover:bg-deep-blue"
            >
              Get a Quote
            </Button>
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center text-charcoal hover:text-electric-blue transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              {COMPANY_INFO.phone}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-charcoal"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left py-2 text-charcoal hover:text-electric-blue"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left py-2 text-charcoal hover:text-electric-blue"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="block w-full text-left py-2 text-charcoal hover:text-electric-blue"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="block w-full text-left py-2 text-charcoal hover:text-electric-blue"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left py-2 text-charcoal hover:text-electric-blue"
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection("instant-quote")}
              className="block w-full text-left py-2 text-charcoal hover:text-electric-blue"
            >
              Instant Quote
            </button>
            <div className="pt-4 border-t border-gray-200 mt-4 space-y-2">
              <Button
                onClick={onOpenQuoteModal}
                className="w-full bg-electric-blue text-white hover:bg-deep-blue"
              >
                Get a Quote
              </Button>
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center justify-center text-charcoal hover:text-electric-blue"
              >
                <Phone className="w-4 h-4 mr-2" />
                {COMPANY_INFO.phone}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
