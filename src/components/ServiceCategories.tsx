import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import cleaningIcon from "@/assets/cleaning-icon.png";
import repairIcon from "@/assets/repair-icon.png";
import beautyIcon from "@/assets/beauty-icon.png";
import automotiveIcon from "@/assets/automotive-icon.png";
import laundryIcon from "@/assets/laundry-icon.png";

const services = [
  {
    id: "cleaning",
    title: "Home Cleaning",
    description: "Professional house cleaning",
    icon: cleaningIcon,
    duration: "30-45 min",
    price: "₹299",
    availability: "Available now",
    rating: 4.8,
    category: "cleaning"
  },
  {
    id: "repair",
    title: "Quick Repairs",
    description: "Electrician, plumber, handyman",
    icon: repairIcon,
    duration: "45-60 min",
    price: "₹199",
    availability: "Available now",
    rating: 4.7,
    category: "repair"
  },
  {
    id: "beauty",
    title: "Beauty & Grooming",
    description: "At-home salon services",
    icon: beautyIcon,
    duration: "60-90 min",
    price: "₹499",
    availability: "Available now",
    rating: 4.9,
    category: "beauty"
  },
  {
    id: "automotive",
    title: "Car Wash",
    description: "Doorstep car cleaning",
    icon: automotiveIcon,
    duration: "45-60 min",
    price: "₹399",
    availability: "Available now",
    rating: 4.6,
    category: "automotive"
  },
  {
    id: "laundry",
    title: "Laundry Pickup",
    description: "Wash, dry & fold service",
    icon: laundryIcon,
    duration: "24-48 hrs",
    price: "₹50/kg",
    availability: "Available now",
    rating: 4.8,
    category: "laundry"
  }
];

interface ServiceCategoriesProps {
  onServiceSelect: (service: typeof services[0]) => void;
}

export const ServiceCategories = ({ onServiceSelect }: ServiceCategoriesProps) => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Choose Your Service</h2>
          <p className="text-muted-foreground text-lg">Quick, reliable services delivered in 30-60 minutes</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card 
              key={service.id}
              className="p-6 cursor-pointer transition-smooth hover:shadow-card-hover hover:-translate-y-1 bg-gradient-card border border-border/50"
              onClick={() => onServiceSelect(service)}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-background flex items-center justify-center shadow-sm">
                  <img 
                    src={service.icon} 
                    alt={service.title}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg text-foreground">{service.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      ⭐ {service.rating}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-3">{service.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-primary font-semibold text-lg">{service.price}</div>
                      <div className="text-xs text-muted-foreground">{service.duration}</div>
                    </div>
                    
                    <Badge 
                      variant="outline" 
                      className="text-services-cleaning border-services-cleaning/20 bg-services-cleaning/5"
                    >
                      {service.availability}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};