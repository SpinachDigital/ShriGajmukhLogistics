import Header from "@/components/header";
import HeroSlider from "@/components/hero-slider";
import WelcomeSection from "@/components/welcome-section";
import ServicesSection from "@/components/services-section";
import PhotoGallery from "@/components/photo-gallery";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import QuoteModal from "@/components/quote-modal";
import InstantQuoteGamification from "@/components/instant-quote-gamification";
import { useState } from "react";

export default function Home() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const openQuoteModal = () => setIsQuoteModalOpen(true);
  const closeQuoteModal = () => setIsQuoteModalOpen(false);

  return (
    <div className="min-h-screen">
      <Header onOpenQuoteModal={openQuoteModal} />
      <HeroSlider onOpenQuoteModal={openQuoteModal} />
      <WelcomeSection />
      <ServicesSection onOpenQuoteModal={openQuoteModal} />
      <PhotoGallery />
      <section id="instant-quote" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-charcoal mb-6">Instant Quote Game</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get an instant quote while earning points and badges! Complete our interactive quote game and unlock personalized pricing.
            </p>
            <div className="w-24 h-1 bg-electric-blue mx-auto mt-8"></div>
          </div>
          <InstantQuoteGamification />
        </div>
      </section>
      <ContactSection />
      <Footer />
      <QuoteModal isOpen={isQuoteModalOpen} onClose={closeQuoteModal} />
    </div>
  );
}
