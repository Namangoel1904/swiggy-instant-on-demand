import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Tag, Clock, ShoppingCart, CreditCard, MapPin } from "lucide-react";

interface CheckoutProps {
  bookingDetails: {
    service: any;
    timeSlot: string;
    provider: any;
    address: string;
    total: string;
  };
  onBack: () => void;
  onPaymentComplete: (paymentDetails: any) => void;
}

const recommendedProducts = [
  { id: 1, name: "All-Purpose Cleaner", price: "₹199", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=100&h=100&fit=crop" },
  { id: 2, name: "Microfiber Cloths", price: "₹149", image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=100&h=100&fit=crop" },
  { id: 3, name: "Glass Cleaner", price: "₹129", image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=100&h=100&fit=crop" },
  { id: 4, name: "Floor Disinfectant", price: "₹179", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=100&h=100&fit=crop" },
];

const coupons = [
  { code: "FIRST50", discount: "50% OFF", description: "First service - Up to ₹200", valid: true },
  { code: "CLEAN30", discount: "30% OFF", description: "On cleaning services", valid: true },
  { code: "WEEKEND25", discount: "25% OFF", description: "Weekend special", valid: false },
];

export const ServiceCheckout = ({ bookingDetails, onBack, onPaymentComplete }: CheckoutProps) => {
  const [appliedCoupon, setAppliedCoupon] = useState<string>("");
  const [couponCode, setCouponCode] = useState("");
  const [addedServices, setAddedServices] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const calculateTotal = () => {
    const servicePrice = parseInt(bookingDetails.service.price.replace('₹', ''));
    const couponDiscount = appliedCoupon === "FIRST50" ? Math.min(servicePrice * 0.5, 200) : 
                          appliedCoupon === "CLEAN30" ? servicePrice * 0.3 : 0;
    const cartTotal = cartItems.reduce((sum, item) => sum + parseInt(item.price.replace('₹', '')), 0);
    
    return {
      subtotal: servicePrice + cartTotal,
      discount: couponDiscount,
      total: servicePrice + cartTotal - couponDiscount
    };
  };

  const applyCoupon = (code: string) => {
    const coupon = coupons.find(c => c.code === code && c.valid);
    if (coupon) {
      setAppliedCoupon(code);
      setCouponCode("");
    }
  };

  const addToCart = (product: any) => {
    setCartItems([...cartItems, product]);
  };

  const handlePayment = () => {
    const totals = calculateTotal();
    onPaymentComplete({
      ...bookingDetails,
      appliedCoupon,
      cartItems,
      breakdown: totals
    });
  };

  const totals = calculateTotal();

  return (
    <div className="min-h-screen bg-gradient-checkout py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-white/20 shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
            <p className="text-muted-foreground">Review your booking & complete payment</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Service Details */}
            <Card className="p-6 bg-white shadow-elevated border-0">
              <h3 className="font-semibold mb-4 text-lg">Service Details</h3>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-xl text-foreground">{bookingDetails.service.title}</h4>
                  <p className="text-muted-foreground">{bookingDetails.service.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>📅 {bookingDetails.timeSlot}</span>
                    <span>👨‍🔧 {bookingDetails.provider.name}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-primary">{bookingDetails.service.price}</span>
                  {bookingDetails.service.originalPrice && (
                    <p className="text-muted-foreground line-through">{bookingDetails.service.originalPrice}</p>
                  )}
                </div>
              </div>
              
              <Button variant="outline" className="w-full" disabled>
                <Plus className="w-4 h-4 mr-2" />
                Add More Services
              </Button>
            </Card>

            {/* Coupons Section */}
            <Card className="p-6 bg-white shadow-elevated border-0">
              <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
                <Tag className="w-5 h-5 text-primary" />
                Apply Coupon
              </h3>
              
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={() => applyCoupon(couponCode)}
                  disabled={!couponCode}
                  className="px-6"
                >
                  Apply
                </Button>
              </div>

              <div className="space-y-3">
                {coupons.map((coupon) => (
                  <div
                    key={coupon.code}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      appliedCoupon === coupon.code
                        ? "border-primary bg-primary/5"
                        : coupon.valid
                        ? "border-border hover:border-primary/50"
                        : "border-border/50 opacity-50"
                    }`}
                    onClick={() => coupon.valid && applyCoupon(coupon.code)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant={coupon.valid ? "default" : "secondary"}>
                            {coupon.code}
                          </Badge>
                          <span className="font-semibold text-success">{coupon.discount}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{coupon.description}</p>
                      </div>
                      {appliedCoupon === coupon.code && (
                        <Badge variant="default" className="bg-gradient-success border-0">Applied</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recommended Products */}
            <Card className="p-6 bg-white shadow-elevated border-0">
              <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                Recommended for Your Service
              </h3>
              <p className="text-muted-foreground mb-4">Add these items to your order from Swiggy Instamart</p>
              
              <div className="flex gap-4 overflow-x-auto pb-2">
                {recommendedProducts.map((product) => (
                  <div key={product.id} className="min-w-[200px] p-4 border rounded-lg hover:shadow-md transition-all">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-24 object-cover rounded-lg mb-3"
                    />
                    <h4 className="font-medium text-sm mb-1">{product.name}</h4>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">{product.price}</span>
                      <Button
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="text-xs px-3 h-7"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Service Address */}
            <Card className="p-6 bg-white shadow-elevated border-0">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Service Address
              </h3>
              <p className="text-muted-foreground mb-3">{bookingDetails.address}</p>
              <Button variant="link" className="p-0 h-auto text-primary font-medium">
                Change Address
              </Button>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Estimated Arrival */}
            <Card className="p-6 bg-gradient-success text-white shadow-elevated border-0">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5" />
                <h3 className="font-semibold">Estimated Arrival</h3>
              </div>
              <p className="text-2xl font-bold">
                {bookingDetails.timeSlot.includes("Now") ? "30-45 min" : bookingDetails.timeSlot}
              </p>
              <p className="text-white/80 text-sm">Professional will arrive</p>
            </Card>

            {/* Bill Summary */}
            <Card className="p-6 bg-white shadow-elevated border-0">
              <h3 className="font-semibold mb-4">Bill Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service charge</span>
                  <span>₹{totals.subtotal}</span>
                </div>
                
                {cartItems.length > 0 && (
                  <div>
                    <div className="flex justify-between text-sm text-muted-foreground mb-1">
                      <span>Added items ({cartItems.length})</span>
                      <span>Included above</span>
                    </div>
                  </div>
                )}
                
                {appliedCoupon && (
                  <div className="flex justify-between text-success">
                    <span>Coupon discount ({appliedCoupon})</span>
                    <span>-₹{totals.discount}</span>
                  </div>
                )}
                
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-primary">₹{totals.total}</span>
                </div>
              </div>

              <Button
                className="w-full mt-6 h-12 text-base font-semibold shadow-button"
                onClick={handlePayment}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Proceed to Pay ₹{totals.total}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};