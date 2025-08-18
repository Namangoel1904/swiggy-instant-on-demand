import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ServiceCategories } from "@/components/ServiceCategories";
import { ServiceBooking } from "@/components/ServiceBooking";
import { OrderTracking } from "@/components/OrderTracking";
import { useToast } from "@/hooks/use-toast";

type ViewType = "home" | "categories" | "booking" | "tracking";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [booking, setBooking] = useState<any>(null);
  const { toast } = useToast();

  const handleGetStarted = () => {
    setCurrentView("categories");
  };

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    setCurrentView("booking");
  };

  const handleBookingConfirm = (bookingDetails: any) => {
    setBooking(bookingDetails);
    setCurrentView("tracking");
    
    toast({
      title: "Service Booked Successfully! 🎉",
      description: `${bookingDetails.provider.name} will arrive in ${bookingDetails.timeSlot.includes("Now") ? "30-45 minutes" : bookingDetails.timeSlot}`,
    });
  };

  const handleBack = () => {
    if (currentView === "booking") {
      setCurrentView("categories");
    } else if (currentView === "categories") {
      setCurrentView("home");
    } else if (currentView === "tracking") {
      setCurrentView("home");
    }
  };

  return (
    <div className="min-h-screen">
      {currentView === "home" && (
        <>
          <HeroSection onGetStarted={handleGetStarted} />
          <ServiceCategories onServiceSelect={handleServiceSelect} />
        </>
      )}

      {currentView === "categories" && (
        <div className="pt-20">
          <ServiceCategories onServiceSelect={handleServiceSelect} />
        </div>
      )}

      {currentView === "booking" && selectedService && (
        <ServiceBooking
          service={selectedService}
          onBack={handleBack}
          onBookConfirm={handleBookingConfirm}
        />
      )}

      {currentView === "tracking" && booking && (
        <OrderTracking
          booking={booking}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default Index;
