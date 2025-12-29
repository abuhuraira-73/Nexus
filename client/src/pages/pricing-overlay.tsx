
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Check, X, Zap } from "lucide-react";
import { PricingToggle } from "@/components/pricing-toggle";
import { motion, AnimatePresence } from "framer-motion";

const pricingTiers = [
  {
    name: "Free",
    priceMonthly: "$0",
    priceYearly: "$0",
    description: "For individuals and small projects just getting started.",
    features: [
      "100 Items per Board",
      "3 Boards per Workspace",
      "Core Drawing & Content Tools",
      "Community Support",
    ],
    cta: "Current Plan",
    isFeatured: false,
  },
  {
    name: "Premium",
    priceMonthly: "$5",
    priceYearly: "$50",
    description: "For growing teams that need to collaborate and ship faster.",
    features: [
      "Unlimited Items per Board",
      "Unlimited Boards",
      "Real-time Collaboration",
      "High-Quality Exports",
      "Priority Email Support",
    ],
    cta: "Upgrade to Premium",
    isFeatured: true,
  },
  {
    name: "Enterprise",
    priceMonthly: "$20",
    priceYearly: "$110",
    description: "For large organizations with advanced security and support needs.",
    features: [
      "Everything in Premium",
      "Single Sign-On (SSO)",
      "Advanced Security & Auditing",
      "Dedicated Account Manager",
      "Custom Integrations",
    ],
    cta: "Contact Sales",
    isFeatured: false,
  },
];

interface PricingOverlayProps {
  onClose: () => void;
}

export const PricingOverlay: React.FC<PricingOverlayProps> = ({ onClose }) => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-8 overscroll-y-contain">
      <div className="relative w-full h-full overflow-y-auto will-change-scroll touch-action-manipulation bg-gradient-custom bg-cover bg-center rounded-2xl p-8">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-10">
          <X className="h-10 w-10" />
        </button>
        <div className="text-center mb-12 mt-16">
            <h1 className="text-center text-5xl font-bold tracking-tighter font-heading text-white">
                Find the Plan That's Right for You
            </h1>
            <p className="text-center max-w-2xl mx-auto text-gray-400 md:text-xl mt-4">
                Start for free, then upgrade when you need more power and collaboration.
            </p>
            <div className="mt-8 bg-blue-900/30 border border-blue-700 text-blue-200 px-6 py-3 rounded-lg max-w-2xl mx-auto flex items-center justify-center space-x-2">
                <Zap className="h-6 w-6 md:h-5 md:w-5" />
                <p className="text-lg font-medium">
                  Nexus is currently in a trial phase. All features are free for a limited time!
                </p>
            </div>
        </div>

        <div className="flex justify-center items-center gap-4 mb-12">
            <PricingToggle isYearly={isYearly} onToggle={setIsYearly} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
            {pricingTiers.map((tier) => (
            <Card
                key={tier.name}
                className={`bg-gray-900/50 border-gray-800 backdrop-blur-sm flex flex-col p-8 rounded-2xl ${tier.isFeatured ? 'border-purple-500 ring-2 ring-purple-500' : ''}`}>
                <CardHeader className="text-center p-0">
                <CardTitle className="text-4xl font-bold">{tier.name}</CardTitle>
                <p className="text-gray-400 mt-4 min-h-[4rem]">{tier.description}</p>
                <div className="text-6xl font-bold mt-6 h-20 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                    <motion.div
                        key={isYearly ? "yearly" : "monthly"}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isYearly ? tier.priceYearly : tier.priceMonthly}
                        {tier.name !== "Free" && <span className="text-xl font-normal text-gray-400">/{isYearly ? "year" : "month"}</span>}
                    </motion.div>
                    </AnimatePresence>
                </div>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow p-0 mt-8">
                <Button
                    className={`w-full text-xl py-8 ${tier.isFeatured ? 'bg-white text-black hover:bg-gray-200' : ''}`}
                    variant={tier.isFeatured ? 'default' : 'outline'}
                    disabled={tier.name === 'Free'}
                >
                    {tier.cta}
                </Button>
                <ul className="space-y-5 mt-10 text-left flex-grow">
                    {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start text-lg">
                        <Check className="h-7 w-7 text-green-500 mr-4 flex-shrink-0" />
                        <span>{feature}</span>
                    </li>
                    ))}
                </ul>
                </CardContent>
            </Card>
            ))}
        </div>
      </div>
    </div>
  );
};
