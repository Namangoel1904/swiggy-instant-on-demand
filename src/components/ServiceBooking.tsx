import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, MapPin, Star, User, Shield, Award, Heart } from "lucide-react";
import { ImageSlideshow } from "./ImageSlideshow";
import { ServiceHighlights } from "./ServiceHighlights";
import { SimilarServices } from "./SimilarServices";

interface ServiceBookingProps {
  service: {
    id: string;
    title: string;
    description: string;
    price: string;
    originalPrice?: string;
    discount?: string;
    duration: string;
    rating: number;
    category: string;
  };
  onBack: () => void;
  onBookConfirm: (bookingDetails: any) => void;
}

const timeSlots = [
  "Now (30-45 min)",
  "12:00 PM - 1:00 PM", 
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM"
];

const providers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    rating: 4.9,
    jobs: 145,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    experience: "5+ years",
    specialization: "Expert in all home services",
    verified: true,
    badge: "Top Rated"
  },
  {
    id: 2,
    name: "Priya Sharma", 
    rating: 4.8,
    jobs: 89,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face",
    experience: "3+ years",
    specialization: "Beauty & wellness specialist",
    verified: true,
    badge: "Most Loved"
  },
  {
    id: 3,
    name: "Amit Verma",
    rating: 4.7,
    jobs: 203,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    experience: "7+ years",
    specialization: "Technical repairs expert", 
    verified: true,
    badge: "Most Experienced"
  }
];

const getServiceData = (serviceId: string) => {
  const serviceData: Record<string, any> = {
    cleaning: {
      images: [
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=400&fit=crop",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=400&fit=crop"
      ],
      highlights: [
        "Professional grade cleaning equipment",
        "100% eco-friendly products used", 
        "Quick 30-45 minute service",
        "Satisfaction guarantee"
      ]
    }
  };
  return serviceData[serviceId] || serviceData.cleaning;
};

export const ServiceBooking = ({ service, onBack, onBookConfirm }: ServiceBookingProps) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<typeof providers[0] | null>(null);
  const [address] = useState("123 Main Street, New Delhi, 110001");
  const serviceData = getServiceData(service.id);

  const handleBookService = () => {
    if (!selectedTimeSlot || !selectedProvider) return;
    
    const bookingDetails = {
      service,
      timeSlot: selectedTimeSlot,
      provider: selectedProvider,
      address,
      total: service.price
    };
    
    onBookConfirm(bookingDetails);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-accent shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Book {service.title}</h1>
            <p className="text-muted-foreground">Professional service at your doorstep</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-6 bg-white shadow-elevated border-0">
              <ImageSlideshow images={serviceData.images} />
            </Card>

            <Card className="p-6 bg-gradient-premium text-white shadow-elevated border-0">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{service.title}</h2>
                  <p className="text-white/80 mt-1">{service.description}</p>
                </div>
                {service.discount && (
                  <Badge variant="destructive" className="text-sm px-3 py-1">
                    {service.discount}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span>{service.rating} rating</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mt-4">
                <span className="text-3xl font-bold">{service.price}</span>
                {service.originalPrice && (
                  <span className="text-white/60 line-through text-lg">{service.originalPrice}</span>
                )}
              </div>
            </Card>

            <ServiceHighlights highlights={serviceData.highlights} category={service.category} />

            <Card className="p-6 bg-white shadow-card border border-border/50">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Service Address
              </h3>
              <p className="text-muted-foreground mb-3">{address}</p>
              <Button variant="link" className="p-0 h-auto text-primary font-medium">
                Change Address
              </Button>
            </Card>

            <Card className="p-6 bg-white shadow-card border border-border/50">
              <h3 className="font-semibold mb-4">Select Time Slot</h3>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={selectedTimeSlot === slot ? "default" : "outline"}
                    className="justify-start p-4 h-auto"
                    onClick={() => setSelectedTimeSlot(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-white shadow-elevated border-0">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Choose Professional
              </h3>
              <div className="space-y-4">
                {providers.map((provider) => (
                  <div
                    key={provider.id}
                    className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      selectedProvider?.id === provider.id
                        ? "bg-primary/10 border-2 border-primary shadow-lg"
                        : "bg-muted/30 hover:bg-muted/50 border border-border/50"
                    }`}
                    onClick={() => setSelectedProvider(provider)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <img
                          src={provider.image}
                          alt={provider.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                        />
                        {provider.verified && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <Shield className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground">{provider.name}</h4>
                        <p className="text-xs text-muted-foreground mb-1">{provider.specialization}</p>
                        
                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current text-yellow-500" />
                            <span className="font-medium">{provider.rating}</span>
                          </div>
                          <span>{provider.jobs} jobs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-elevated border-0">
              <h3 className="font-semibold mb-4">Booking Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-medium">{service.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium">{selectedTimeSlot || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Professional</span>
                  <span className="font-medium">{selectedProvider?.name || "Not selected"}</span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">{service.price}</span>
                </div>
              </div>

              <Button
                className="w-full mt-6 h-12 text-base font-semibold shadow-button"
                onClick={handleBookService}
                disabled={!selectedTimeSlot || !selectedProvider}
              >
                Book Now - {service.price}
              </Button>
            </Card>

            <Card className="p-6 bg-white shadow-card border border-border/50">
              <SimilarServices 
                currentServiceId={service.id} 
                onServiceSelect={(id) => console.log("Selected:", id)}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};