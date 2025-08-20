import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SimilarService {
  id: string;
  title: string;
  price: string;
  originalPrice: string;
  rating: number;
  duration: string;
  discount: string;
}

interface SimilarServicesProps {
  currentServiceId: string;
  onServiceSelect: (serviceId: string) => void;
}

const allServices: SimilarService[] = [
  {
    id: "deep-cleaning",
    title: "Deep Cleaning",
    price: "₹499",
    originalPrice: "₹699",
    rating: 4.9,
    duration: "60-90 min",
    discount: "28% OFF"
  },
  {
    id: "kitchen-cleaning", 
    title: "Kitchen Deep Clean",
    price: "₹349",
    originalPrice: "₹449",
    rating: 4.7,
    duration: "45-60 min",
    discount: "22% OFF"
  },
  {
    id: "bathroom-cleaning",
    title: "Bathroom Cleaning",
    price: "₹199",
    originalPrice: "₹299",
    rating: 4.8,
    duration: "30-45 min",
    discount: "33% OFF"
  },
  {
    id: "ac-repair",
    title: "AC Repair",
    price: "₹299",
    originalPrice: "₹399",
    rating: 4.6,
    duration: "60-90 min",
    discount: "25% OFF"
  },
  {
    id: "plumbing",
    title: "Plumbing Service",
    price: "₹249",
    originalPrice: "₹349",
    rating: 4.7,
    duration: "45-75 min",
    discount: "28% OFF"
  },
  {
    id: "electrical",
    title: "Electrical Work",
    price: "₹199",
    originalPrice: "₹299",
    rating: 4.5,
    duration: "30-60 min",
    discount: "33% OFF"
  }
];

export const SimilarServices = ({ currentServiceId, onServiceSelect }: SimilarServicesProps) => {
  const similarServices = allServices
    .filter(service => service.id !== currentServiceId)
    .slice(0, 3);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Similar Services</h3>
      
      <div className="grid grid-cols-1 gap-4">
        {similarServices.map((service) => (
          <Card key={service.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h4>
                  <Badge variant="destructive" className="text-xs">
                    {service.discount}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-primary">{service.price}</span>
                    <span className="text-muted-foreground line-through text-xs">{service.originalPrice}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-muted-foreground">{service.rating}</span>
                  </div>
                  
                  <span className="text-muted-foreground">{service.duration}</span>
                </div>
              </div>
              
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onServiceSelect(service.id)}
                className="ml-4 border-primary/20 hover:bg-primary hover:text-white"
              >
                Select
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};