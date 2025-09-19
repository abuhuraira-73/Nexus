import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Check, X, Zap, Twitter, Github, Linkedin } from "lucide-react";
import PublicHeader from "@/components/public-header"; // Import PublicHeader
import PublicFooter from "@/components/public-footer";

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals and small projects just getting started.",
    features: [
      "100 Items per Board",
      "3 Boards per Workspace",
      "Core Drawing & Content Tools",
      "Community Support",
    ],
    cta: "Get Started for Free",
    isFeatured: false,
  },
  {
    name: "Premium",
    price: "$5",
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
    price: "$20",
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

const comparisonFeatures = [
    { feature: "Items per Board", free: "100", premium: "Unlimited", enterprise: "Unlimited" },
    { feature: "Boards per Workspace", free: "3", premium: "Unlimited", enterprise: "Unlimited" },
    { feature: "Real-time Collaboration", free: false, premium: true, enterprise: true },
    { feature: "High-Quality Exports", free: false, premium: true, enterprise: true },
    { feature: "Priority Support", free: false, premium: true, enterprise: true },
    { feature: "Single Sign-On (SSO)", free: false, premium: false, enterprise: true },
    { feature: "Advanced Security", free: false, premium: false, enterprise: true },
    { feature: "Dedicated Account Manager", free: false, premium: false, enterprise: true },
];

const Checkmark = ({ available }) => {
    if (typeof available === 'boolean') {
        return available ? <Check className="h-6 w-6 text-green-500" /> : <X className="h-6 w-6 text-red-500" />;
    }
    return <span className="text-white">{available}</span>;
};


export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen text-white bg-black">
      {/* Header */}
      <PublicHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="text-center py-20 lg:py-28">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter font-heading">
              Find the Plan That's Right for You
            </h1>
            <p className="max-w-[700px] mx-auto text-gray-400 md:text-xl mt-6">
              Start for free, then upgrade when you need more power and collaboration.
            </p>
        </section>

        {/* Inset Gradient Section */}
        <div className="px-8 sm:px-12 lg:px-16">
            <div className="bg-gradient-custom bg-cover bg-center rounded-2xl">
                {/* Pricing Table Section */}
                <section className="pt-20 lg:pt-28">
                  <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                      {pricingTiers.map((tier) => (
                        <Card
                          key={tier.name}
                          className={`bg-gray-900/50 border-gray-800 backdrop-blur-sm flex flex-col h-full ${tier.isFeatured ? 'border-purple-500 ring-2 ring-purple-500' : ''}`}>
                          <CardHeader className="text-center">
                            <CardTitle className="text-3xl font-bold">{tier.name}</CardTitle>
                            <p className="text-gray-400 h-12">{tier.description}</p>
                            <div className="text-5xl font-bold mt-4">
                              {tier.price}
                              {tier.price !== "$0" && <span className="text-lg font-normal text-gray-400">/ month</span>}
                            </div>
                          </CardHeader>
                          <CardContent className="flex flex-col flex-grow">
                            <a href={tier.name === 'Enterprise' ? '#' : '/register'} className="w-full">
                              <Button
                                className={`w-full text-lg py-6 ${tier.isFeatured ? 'bg-white text-black hover:bg-gray-200' : ''}`}
                                variant={tier.isFeatured ? 'default' : 'outline'}>
                                {tier.cta}
                              </Button>
                            </a>
                            <ul className="space-y-4 mt-8 text-left flex-grow">
                              {tier.features.map((feature) => (
                                <li key={feature} className="flex items-start">
                                  <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Comparison Table Section */}
                <section className="py-20 lg:py-28">
                    <div className="container mx-auto px-4">
                        <h2 className="text-5xl lg:text-7xl font-bold text-center mb-12 font-heading">Compare All Features</h2>
                        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 overflow-hidden">
                            {/* Table Header */}
                            <div className="grid grid-cols-4 p-4 border-b border-gray-700 font-bold">
                                <div className="col-span-1">Features</div>
                                <div className="col-span-1 text-center">Free</div>
                                <div className="col-span-1 text-center">Premium</div>
                                <div className="col-span-1 text-center">Enterprise</div>
                            </div>
                            {/* Table Body */}
                            <div className="divide-y divide-gray-800">
                                {comparisonFeatures.map((item, index) => (
                                    <div key={index} className="grid grid-cols-4 p-4 items-center">
                                        <div className="col-span-1 font-medium">{item.feature}</div>
                                        <div className="col-span-1 flex justify-center"><Checkmark available={item.free} /></div>
                                        <div className="col-span-1 flex justify-center"><Checkmark available={item.premium} /></div>
                                        <div className="col-span-1 flex justify-center"><Checkmark available={item.enterprise} /></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Buttons */}
                <section className="pb-20 lg:pb-28 text-center">
                    <div className="container mx-auto px-4 flex justify-center gap-8">
                        <Button size="lg" variant="outline">Get Started with Free</Button>
                        <Button size="lg">Upgrade to Premium</Button>
                        <Button size="lg" variant="outline">Contact Sales</Button>
                    </div>
                </section>
            </div>
        </div>
      </main>

      {/* Footer */}
      <PublicFooter />
    </div>
  );
}