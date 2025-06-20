import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Search, Images } from "lucide-react";
import { GALLERY_IMAGES } from "@/lib/constants";

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-charcoal mb-6">Photo Gallery</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore high-quality images showcasing our logistics operations, modern fleet, and professional services in action.
          </p>
          <div className="w-24 h-1 bg-electric-blue mx-auto mt-8"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {GALLERY_IMAGES.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Card className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                  <div className="relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-deep-blue bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                      <Search className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                      <p className="text-white text-sm font-medium">{image.category}</p>
                    </div>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                <div className="relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                  <div className="p-4 bg-white">
                    <h3 className="font-semibold text-lg text-charcoal">{image.category}</h3>
                    <p className="text-gray-600">{image.alt}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={scrollToContact}
            size="lg"
            className="bg-electric-blue text-white hover:bg-deep-blue"
          >
            <Images className="w-5 h-5 mr-2" />
            View Full Gallery
          </Button>
        </div>
      </div>
    </section>
  );
}
