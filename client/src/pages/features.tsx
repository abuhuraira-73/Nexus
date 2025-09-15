import { Button } from "@/components/ui/button";
import { Zap, Palette, Users, BrainCircuit, Twitter, Github, Linkedin } from "lucide-react";

// Helper component for feature sections to avoid repetition
const FeatureSection = ({ title, description, icon, reverse = false }) => (
  <div className={`container mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12 items-center`}>
    <div className={`lg:order-${reverse ? '2' : '1'}`}>
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-gray-400 text-lg">{description}</p>
      <Button variant="link" className="p-0 mt-4 text-lg text-white">Learn more &rarr;</Button>
    </div>
    <div className={`lg:order-${reverse ? '1' : '2'} bg-gray-900/50 rounded-xl p-8 flex items-center justify-center h-80`}>
      {icon}
    </div>
  </div>
);

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen text-white bg-black">
      {/* Header can be a shared component later, for now, it's duplicated */}
      <header className="sticky top-0 z-50 px-4 lg:px-6 h-16 flex items-center bg-black/30 backdrop-blur-lg">
        <a className="flex items-center justify-center" href="/">
          <Zap className="h-6 w-6" />
          <span className="ml-2 font-semibold text-lg">Nexus</span>
        </a>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <a className="text-sm font-medium hover:underline underline-offset-4" href="/features">
            Features
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="/pricing">
            Pricing
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="/login">
            Login
          </a>
          <a href="/register">
            <Button variant="secondary" size="sm" className="transition-transform duration-300 hover:scale-105">
              Sign Up
            </Button>
          </a>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="text-center py-20 lg:py-32 bg-gradient-custom bg-cover bg-center">
          <div className="bg-black/60 py-16">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter">
              All The Tools You Need To Think Visually.
            </h1>
            <p className="max-w-[700px] mx-auto text-gray-300 md:text-xl mt-6">
              From infinite canvases to real-time collaboration, discover how Nexus empowers you and your team to bring ideas to life.
            </p>
          </div>
        </section>

        {/* --- Thematic Feature Sections --- */}
        <div className="bg-black">
            <FeatureSection
                title="Your Infinite Creative Space"
                description="Break free from the constraints of physical whiteboards. Nexus provides a limitless canvas where you can pan, zoom, and organize your thoughts without ever running out of room. It's your world to create."
                icon={<Palette className="h-32 w-32 text-purple-400" />}
            />
        </div>
        <div className="bg-gray-900">
            <FeatureSection
                title="Built for Seamless Collaboration"
                description="Work together in real-time, from anywhere in the world. See your team's cursors, get instant feedback with comments, and share your boards with a single click. Collaboration has never been this easy."
                icon={<Users className="h-32 w-32 text-pink-400" />}
                reverse={true}
            />
        </div>
        <div className="bg-black">
            <FeatureSection
                title="Powerful Tools, Simple Interface"
                description="Nexus is packed with features to boost your productivity. Use smart drawing tools, embed rich content, organize with favorites, and rely on local persistence to keep your work safe. All in a clean, intuitive interface."
                icon={<BrainCircuit className="h-32 w-32 text-yellow-400" />}
            />
        </div>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 bg-gradient-custom bg-cover bg-center">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-6">Ready to build your next big idea?</h2>
                <p className="text-gray-300 text-lg mb-8">Get started with Nexus for free. No credit card required.</p>
                <a href="/register">
                    <Button size="lg" className="transition-transform duration-300 hover:scale-105">
                        Sign Up for Free
                    </Button>
                </a>
            </div>
        </section>
      </main>

      {/* Simplified Footer */}
      <footer className="bg-black border-t border-gray-800">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Nexus. All Rights Reserved.</p>
            <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-white"><Twitter className="h-5 w-5" /></a>
                <a href="#" className="text-gray-500 hover:text-white"><Github className="h-5 w-5" /></a>
                <a href="#" className="text-gray-500 hover:text-white"><Linkedin className="h-5 w-5" /></a>
            </div>
        </div>
      </footer>
    </div>
  );
}
