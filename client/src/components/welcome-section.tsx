import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO } from "@/lib/constants";

export default function WelcomeSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-charcoal mb-6">
              WELCOME TO <span className="text-electric-blue">{COMPANY_INFO.name.toUpperCase()}</span>
            </h2>
            <div className="w-24 h-1 bg-electric-blue mx-auto mb-8"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Welcome to the dynamic world of {COMPANY_INFO.fullName}, the one stop destination for all your logistic needs. We are among the noted Logistics Transportation Services providers, incepted in India. Our authentic and trusted services have helped us to achieve an unrivalled name for ourselves. With the help of our vast and well settled network throughout India, we are able to provide our customers with hassle free services such as Freight Forwarding, Project & Over Dimensional Cargo and Break Bulk & Heavy Lift services.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                With a dedicated team of {COMPANY_INFO.drivers} drivers and a management team with extensive industry experience, we have established ourselves as a reliable partner in the logistics sector. Our commitment to excellence and customer satisfaction drives us to deliver superior transportation solutions across diverse industry verticals.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <Card className="text-center p-6 shadow-md">
                  <CardContent className="p-0">
                    <div className="text-3xl font-bold text-electric-blue mb-2">
                      {COMPANY_INFO.drivers}
                    </div>
                    <div className="text-gray-600">Professional Drivers</div>
                  </CardContent>
                </Card>
                <Card className="text-center p-6 shadow-md">
                  <CardContent className="p-0">
                    <div className="text-3xl font-bold text-electric-blue mb-2">
                      {COMPANY_INFO.experience}
                    </div>
                    <div className="text-gray-600">Years Experience</div>
                  </CardContent>
                </Card>
              </div>
              <Button
                onClick={scrollToContact}
                className="bg-electric-blue text-white hover:bg-deep-blue"
              >
                Learn More About Us
              </Button>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Professional automotive logistics operation"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-electric-blue text-white p-6 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">Since {COMPANY_INFO.foundedYear}</div>
                <div className="text-sm opacity-90">Trusted Partner</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
