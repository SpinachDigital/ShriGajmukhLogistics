import Header from "@/components/header";
import HeroSlider from "@/components/hero-slider";
import WelcomeSection from "@/components/welcome-section";
import ServicesSection from "@/components/services-section";
import PhotoGallery from "@/components/photo-gallery";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import QuoteModal from "@/components/quote-modal";
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
      <ContactSection />
      <Footer />
      <QuoteModal isOpen={isQuoteModalOpen} onClose={closeQuoteModal} />
    </div>
  );
}
