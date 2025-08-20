import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ServiceCategories } from "@/components/ServiceCategories";
import { ServiceBooking } from "@/components/ServiceBooking";
import { ServiceCheckout } from "@/components/ServiceCheckout";
import { OrderTracking } from "@/components/OrderTracking";
import { useToast } from "@/hooks/use-toast";

type ViewType = "home" | "categories" | "booking" | "checkout" | "tracking";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [finalBooking, setFinalBooking] = useState<any>(null);
  const { toast } = useToast();

  const handleGetStarted = () => {
    setCurrentView("categories");
  };

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    setCurrentView("booking");
  };

  const handleBookingConfirm = (bookingDetails: any) => {
    setBookingDetails(bookingDetails);
    setCurrentView("checkout");
  };

  const handlePaymentComplete = (paymentDetails: any) => {
    setFinalBooking(paymentDetails);
    setCurrentView("tracking");
    
    toast({
      title: "Payment Successful! 🎉",
      description: `${paymentDetails.provider.name} will arrive in ${paymentDetails.timeSlot.includes("Now") ? "30-45 minutes" : paymentDetails.timeSlot}`,
    });
  };

  const handleBack = () => {
    if (currentView === "booking") {
      setCurrentView("categories");
    } else if (currentView === "checkout") {
      setCurrentView("booking");
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

      {currentView === "checkout" && bookingDetails && (
        <ServiceCheckout
          bookingDetails={bookingDetails}
          onBack={handleBack}
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      {currentView === "tracking" && finalBooking && (
        <OrderTracking
          booking={finalBooking}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default Index;
