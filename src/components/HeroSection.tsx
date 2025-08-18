import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-image.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between min-h-screen">
        <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          <Badge className="bg-white/20 text-white border-white/30 mb-6 animate-fade-in">
            🚀 Now Available in Your City
          </Badge>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up">
            Quick Services
            <br />
            <span className="text-secondary">In Minutes</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 leading-relaxed animate-slide-up">
            From home cleaning to quick repairs, get professional services delivered to your doorstep in 30-60 minutes. Same reliability as Swiggy, now for services.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up">
            <Button 
              variant="hero" 
              size="xl"
              onClick={onGetStarted}
              className="bg-white text-primary hover:bg-white/95"
            >
              Book Your Service
            </Button>
            
            <Button 
              variant="outline" 
              size="xl"
              className="border-white/30 text-white hover:bg-white/10"
            >
              How It Works
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-8 text-center text-white animate-fade-in">
            <div>
              <div className="text-2xl font-bold">30-60</div>
              <div className="text-sm opacity-80">Minutes</div>
            </div>
            <div>
              <div className="text-2xl font-bold">5000+</div>
              <div className="text-sm opacity-80">Professionals</div>
            </div>
            <div>
              <div className="text-2xl font-bold">4.8★</div>
              <div className="text-sm opacity-80">Rating</div>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative">
            <img 
              src={heroImage}
              alt="Professional service providers"
              className="rounded-2xl shadow-2xl max-w-lg w-full animate-slide-up"
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-services-cleaning rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Service available now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};