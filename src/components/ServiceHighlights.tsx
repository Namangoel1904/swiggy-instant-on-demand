import { CheckCircle, Clock, Shield, Star } from "lucide-react";

interface ServiceHighlightsProps {
  highlights: string[];
  category: string;
}

const getIconForHighlight = (highlight: string) => {
  if (highlight.toLowerCase().includes("quality") || highlight.toLowerCase().includes("professional")) {
    return <Star className="w-4 h-4 text-primary" />;
  }
  if (highlight.toLowerCase().includes("time") || highlight.toLowerCase().includes("quick")) {
    return <Clock className="w-4 h-4 text-primary" />;
  }
  if (highlight.toLowerCase().includes("safe") || highlight.toLowerCase().includes("secure")) {
    return <Shield className="w-4 h-4 text-primary" />;
  }
  return <CheckCircle className="w-4 h-4 text-primary" />;
};

export const ServiceHighlights = ({ highlights, category }: ServiceHighlightsProps) => {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <div className="w-6 h-6 bg-primary/20 rounded-lg flex items-center justify-center">
          <Star className="w-3 h-3 text-primary" />
        </div>
        Service Highlights
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {highlights.map((highlight, index) => (
          <div 
            key={index} 
            className="flex items-start gap-3 p-3 bg-white/50 rounded-lg hover:bg-white/70 transition-colors"
          >
            {getIconForHighlight(highlight)}
            <span className="text-sm text-foreground leading-relaxed">{highlight}</span>
          </div>
        ))}
      </div>
    </div>
  );
};