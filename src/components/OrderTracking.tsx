import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, MessageSquare, MapPin, Clock, CheckCircle } from "lucide-react";

interface OrderTrackingProps {
  booking: {
    service: any;
    timeSlot: string;
    provider: any;
    address: string;
    total: string;
  };
  onBack: () => void;
}

const trackingSteps = [
  {
    id: 1,
    title: "Order Confirmed",
    description: "Your service has been booked",
    status: "completed",
    time: "2 min ago"
  },
  {
    id: 2,
    title: "Professional Assigned",
    description: "Professional is preparing for your service",
    status: "completed",
    time: "1 min ago"
  },
  {
    id: 3,
    title: "On the Way",
    description: "Professional is heading to your location",
    status: "active",
    time: "ETA 25 min"
  },
  {
    id: 4,
    title: "Service in Progress",
    description: "Service is being performed",
    status: "pending",
    time: ""
  },
  {
    id: 5,
    title: "Completed",
    description: "Service completed successfully",
    status: "pending",
    time: ""
  }
];

export const OrderTracking = ({ booking, onBack }: OrderTrackingProps) => {
  const [currentStep, setCurrentStep] = useState(3);
  const [estimatedTime, setEstimatedTime] = useState(25);

  useEffect(() => {
    const interval = setInterval(() => {
      setEstimatedTime(prev => {
        if (prev <= 1) {
          setCurrentStep(4);
          return 0;
        }
        return prev - 1;
      });
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

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
          <h1 className="text-2xl font-bold">Track Your Service</h1>
        </div>

        {/* Status Card */}
        <Card className="p-6 mb-6 bg-gradient-primary text-white">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Order #{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </Badge>
            <div className="text-right">
              <div className="text-sm opacity-90">ETA</div>
              <div className="text-xl font-bold">{estimatedTime} min</div>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-2">{booking.service.title}</h2>
          <p className="opacity-90">{booking.timeSlot}</p>
        </Card>

        {/* Professional Info */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold mb-4">Your Professional</h3>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={booking.provider.image}
              alt={booking.provider.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-lg">{booking.provider.name}</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>⭐ {booking.provider.rating}</span>
                <span>•</span>
                <span>{booking.provider.jobs} jobs completed</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button variant="outline" className="flex-1">
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </Button>
          </div>
        </Card>

        {/* Live Tracking */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Live Tracking
          </h3>
          
          <div className="space-y-4">
            {trackingSteps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-start gap-4 ${
                  index < trackingSteps.length - 1 ? "pb-4 border-l-2 ml-2 border-muted" : ""
                }`}
              >
                <div className={`w-4 h-4 rounded-full flex-shrink-0 mt-1 ${
                  step.status === "completed"
                    ? "bg-services-cleaning"
                    : step.status === "active"
                    ? "bg-primary animate-pulse"
                    : "bg-muted"
                }`}>
                  {step.status === "completed" && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium ${
                      step.status === "active" ? "text-primary" : ""
                    }`}>
                      {step.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Service Details */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold mb-4">Service Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service</span>
              <span>{booking.service.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time Slot</span>
              <span>{booking.timeSlot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Address</span>
              <span className="text-right flex-1 ml-4">{booking.address}</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t">
              <span>Total</span>
              <span className="text-primary">{booking.total}</span>
            </div>
          </div>
        </Card>

        {/* Emergency Contact */}
        <Card className="p-4 bg-red-50 border border-red-200">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="flex-1">
              <span className="text-sm font-medium">Need help?</span>
              <p className="text-xs text-muted-foreground">Contact our support team</p>
            </div>
            <Button variant="outline" size="sm" className="border-red-200 text-red-600">
              Call Support
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};