import { Button } from "@/components/ui/button";
import { Zap, Palette, Users, BrainCircuit, Twitter, Github, Linkedin } from "lucide-react";
import PublicHeader from "@/components/public-header"; // Import PublicHeader
import PublicFooter from "@/components/public-footer";

// Helper component for feature sections to avoid repetition
const FeatureSection = ({ title, description, icon, reverse = false }) => (
  <div className={`container mx-auto px-4 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center`}>
    <div className={`lg:order-${reverse ? '2' : '1'}`}>
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-gray-400 text-lg">{description}</p>
      <Button variant="link" className="p-0 mt-4 text-lg text-white">Learn more &rarr;</Button>
    </div>
    <div className={`lg:order-${reverse ? '1' : '2'} bg-gray-900/50 rounded-xl p-8 flex items-center justify-center h-64 lg:h-80`}>
      {icon}
    </div>
  </div>
);

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen text-white bg-black">
      {/* Header */}
      <PublicHeader />

      <main className="flex-1">
        <div className="px-8 sm:px-12 lg:px-16">
          <section className="text-center py-20 lg:py-28 bg-black">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter font-heading">
                All The Tools You Need To Think Visually.
              </h1>
          </section>
        </div>
        {/* Hero Section - Sub-headline with Bezel Effect */}
        <div className="px-8 sm:px-12 lg:px-16">
            <section className="text-center py-20 lg:py-28 bg-gradient-custom bg-cover bg-center rounded-2xl">
                <div className="container mx-auto px-4">
                    <p className="text-gray-300 md:text-2xl">
                      From infinite canvases that expand with your thoughts to real-time collaboration that keeps your team in sync, Nexus is the all-in-one visual workspace designed to empower your creative process. Discover how our powerful tools can help you bring your most ambitious ideas to life.
                    </p>
                </div>
            </section>
        </div>

        {/* --- Thematic Feature Sections --- */}
        <div className="px-8 sm:px-12 lg:px-16">
            <FeatureSection
                title="Your Infinite Creative Space"
                description="Break free from the constraints of physical whiteboards. Nexus provides a limitless canvas where you can pan, zoom, and organize your thoughts without ever running out of room. It's your world to create."
            />
        </div>
        {/* NEW SEPARATOR LINE */}
        <div className="px-8 sm:px-12 lg:px-16">
            <div className="container mx-auto px-4">
                <div className="border-t border-gray-700 my-16 max-w-4xl mx-auto"></div>
            </div>
        </div>
        <div className="px-8 sm:px-12 lg:px-16">
            <FeatureSection
                title="Built for Seamless Collaboration"
                description="Work together in real-time, from anywhere in the world. See your team's cursors, get instant feedback with comments, and share your boards with a single click. Collaboration has never been this easy."
                icon={<Users className="h-32 w-32 text-pink-400" />}
                reverse={true}
            />
        </div>
        {/* NEW SEPARATOR LINE */}
        <div className="px-8 sm:px-12 lg:px-16">
            <div className="container mx-auto px-4">
                <div className="border-t border-gray-700 my-16 max-w-4xl mx-auto"></div>
            </div>
        </div>
        <div className="px-8 sm:px-12 lg:px-16">
            <FeatureSection
                title="Powerful Tools, Simple Interface"
                description="Nexus is packed with features to boost your productivity. Use smart drawing tools, embed rich content, organize with favorites, and rely on local persistence to keep your work safe. All in a clean, intuitive interface."
                icon={<BrainCircuit className="h-32 w-32 text-yellow-400" />}
            />
        </div>

        {/* CTA Section with Bezel Effect */}
        <div className="px-8 sm:px-12 lg:px-16">
            <section className="py-20 lg:py-32 bg-gradient-custom bg-cover bg-center rounded-2xl">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter font-heading">Ready to build your next big idea?</h2>
                    <br/>
                    <p className="text-gray-300 text-lg mb-8">Get started with Nexus for free. No credit card required.</p>
                    <a href="/register">
                        <Button size="lg" className="transition-transform duration-300 hover:scale-105">
                            Sign Up for Free
                        </Button>
                    </a>
                </div>
            </section>
        </div>
      </main>

      {/* Simplified Footer */}
      <PublicFooter />
    </div>
  );
}