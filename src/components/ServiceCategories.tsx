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
    originalPrice: "₹399",
    price: "₹299",
    discount: "25% OFF",
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
    originalPrice: "₹299",
    price: "₹199",
    discount: "33% OFF",
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
    originalPrice: "₹699",
    price: "₹499",
    discount: "28% OFF",
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
    originalPrice: "₹599",
    price: "₹399",
    discount: "33% OFF",
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
    originalPrice: "₹80/kg",
    price: "₹50/kg",
    discount: "37% OFF",
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
    <section className="py-16 px-4 bg-gradient-service relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill=\"%23ff6b35\" fill-opacity=\"0.03\"><circle cx=\"30\" cy=\"30\" r=\"1\"/></g></g></svg>')"
      }}></div>
      
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Choose Your Service
          </h2>
          <p className="text-muted-foreground text-xl">Quick, reliable services delivered in 30-60 minutes</p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.id}
              className="group relative p-0 cursor-pointer transition-all duration-300 hover:shadow-elevated hover:-translate-y-2 bg-white border-0 overflow-hidden"
              onClick={() => onServiceSelect(service)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Offer Badge */}
              <div className="absolute top-3 right-3 z-10">
                <div className="bg-gradient-offer text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  {service.discount}
                </div>
              </div>

              {/* Service Icon with gradient background */}
              <div className="relative p-6 pb-4">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-services-${service.category}/20 to-services-${service.category}/10 flex items-center justify-center shadow-lg mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <img 
                    src={service.icon} 
                    alt={service.title}
                    className="w-12 h-12 object-contain filter drop-shadow-md"
                  />
                </div>
              </div>
              
              <div className="px-6 pb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                    ⭐ {service.rating}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{service.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-bold text-xl">{service.price}</span>
                      <span className="text-muted-foreground text-sm line-through">{service.originalPrice}</span>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {service.duration}
                    </div>
                  </div>
                  
                  <Badge 
                    variant="outline" 
                    className={`text-services-${service.category} border-services-${service.category}/30 bg-services-${service.category}/10 font-medium`}
                  >
                    {service.availability}
                  </Badge>
                </div>

                {/* Subtle CTA hint */}
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="text-center">
                    <span className="text-xs text-muted-foreground">Click to book now →</span>
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