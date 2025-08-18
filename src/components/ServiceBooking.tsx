import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, MapPin, Star, User } from "lucide-react";

interface ServiceBookingProps {
  service: {
    id: string;
    title: string;
    description: string;
    price: string;
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
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Priya Sharma",
    rating: 4.8,
    jobs: 89,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Amit Verma",
    rating: 4.7,
    jobs: 203,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  }
];

export const ServiceBooking = ({ service, onBack, onBookConfirm }: ServiceBookingProps) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<typeof providers[0] | null>(null);
  const [address] = useState("123 Main Street, New Delhi, 110001");

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
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="hover:bg-accent"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Book {service.title}</h1>
        </div>

        {/* Service Summary */}
        <Card className="p-6 mb-6 bg-gradient-card border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{service.title}</h2>
            <Badge variant="secondary">
              <Star className="w-3 h-3 mr-1" />
              {service.rating}
            </Badge>
          </div>
          <p className="text-muted-foreground mb-4">{service.description}</p>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{service.duration}</span>
            </div>
            <div className="text-primary font-semibold text-lg">{service.price}</div>
          </div>
        </Card>

        {/* Address */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Service Address
          </h3>
          <p className="text-muted-foreground">{address}</p>
          <Button variant="link" className="p-0 h-auto text-primary">
            Change Address
          </Button>
        </Card>

        {/* Time Slots */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold mb-4">Select Time Slot</h3>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((slot) => (
              <Button
                key={slot}
                variant={selectedTimeSlot === slot ? "default" : "outline"}
                className="justify-start"
                onClick={() => setSelectedTimeSlot(slot)}
              >
                {slot}
              </Button>
            ))}
          </div>
        </Card>

        {/* Service Providers */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <User className="w-4 h-4" />
            Choose Professional
          </h3>
          <div className="space-y-3">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-smooth ${
                  selectedProvider?.id === provider.id
                    ? "bg-accent border-2 border-primary"
                    : "bg-muted/30 hover:bg-muted/50"
                }`}
                onClick={() => setSelectedProvider(provider)}
              >
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{provider.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="w-3 h-3 fill-current text-yellow-500" />
                    <span>{provider.rating}</span>
                    <span>•</span>
                    <span>{provider.jobs} jobs</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Booking Summary */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold mb-4">Booking Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Service</span>
              <span>{service.title}</span>
            </div>
            <div className="flex justify-between">
              <span>Time</span>
              <span>{selectedTimeSlot || "Not selected"}</span>
            </div>
            <div className="flex justify-between">
              <span>Professional</span>
              <span>{selectedProvider?.name || "Not selected"}</span>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-primary">{service.price}</span>
            </div>
          </div>
        </Card>

        {/* Book Button */}
        <Button
          className="w-full"
          size="xl"
          onClick={handleBookService}
          disabled={!selectedTimeSlot || !selectedProvider}
        >
          Book Now - {service.price}
        </Button>
      </div>
    </div>
  );
};