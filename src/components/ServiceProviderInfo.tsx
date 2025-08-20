import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Award, Clock, CheckCircle } from "lucide-react";

interface ServiceProviderInfoProps {
  provider: {
    id: number;
    name: string;
    rating: number;
    jobs: number;
    image: string;
    experience: string;
    specialization: string;
    verified: boolean;
    badge: string;
  };
}

export const ServiceProviderInfo = ({ provider }: ServiceProviderInfoProps) => {
  return (
    <Card className="p-6 bg-gradient-card shadow-elevated border-0">
      <h3 className="font-semibold mb-4 text-foreground text-lg">About Your Professional</h3>
      
      <div className="flex items-start gap-4">
        <div className="relative">
          <img
            src={provider.image}
            alt={provider.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-primary/10 shadow-lg"
          />
          {provider.verified && (
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center shadow-lg">
              <Shield className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-bold text-xl text-foreground">{provider.name}</h4>
            <Badge variant="secondary" className="bg-gradient-premium text-white border-0 shadow-sm">
              <Award className="w-3 h-3 mr-1" />
              {provider.badge}
            </Badge>
          </div>
          
          <p className="text-muted-foreground mb-3 font-medium">{provider.specialization}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg">
              <Star className="w-4 h-4 fill-current text-yellow-500" />
              <div>
                <span className="font-bold text-foreground">{provider.rating}</span>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg">
              <CheckCircle className="w-4 h-4 text-success" />
              <div>
                <span className="font-bold text-foreground">{provider.jobs}</span>
                <p className="text-xs text-muted-foreground">Jobs Done</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{provider.experience} experience</span>
          </div>
        </div>
      </div>
    </Card>
  );
};