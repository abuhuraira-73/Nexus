import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, FileText, Folder, PartyPopper, BrainCircuit, Map, GitFork, Presentation, MousePointerClick, Maximize, Users } from "lucide-react";
import { Link, useOutletContext } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Skeleton } from "@/components/ui/skeleton";
import { PricingOverlay } from "@/pages/pricing-overlay";

// Define the type for the projects passed in the context
interface Project {
  id: string;
  name: string;
  url: string;
  icon: React.ElementType;
  isFavorite?: boolean;
}

// Placeholder for templates data
const templates = [
  { title: "Brainstorming Session", icon: <BrainCircuit className="h-10 w-10 text-purple-400" /> },
  { title: "Project Roadmap", icon: <Map className="h-10 w-10 text-green-400" /> },
  { title: "Meeting Notes", icon: <FileText className="h-10 w-10 text-blue-400" /> },
  { title: "Flowchart", icon: <GitFork className="h-10 w-10 text-red-400" /> },
];

const quickTips = [
  {
    icon: <MousePointerClick className="h-8 w-8 text-blue-400" />,
    title: "Use the Tools",
    description: "Drag and drop shapes, text, and media from the sidebar onto your canvas.",
  },
  {
    icon: <Maximize className="h-8 w-8 text-green-400" />,
    title: "Explore Your Space",
    description: "Use your mouse wheel to zoom and middle-click to pan around the infinite canvas.",
  },
  {
    icon: <Users className="h-8 w-8 text-purple-400" />,
    title: "Collaborate Instantly",
    description: "Click the 'Share' button on a canvas to invite your team and work together in real-time.",
  },
];

interface OutletContextType {
  setCreateModalOpen: (isOpen: boolean) => void;
  projects: Project[];
  isLoadingCanvases: boolean;
}

export default function HeroSection() {
  const { user } = useAuthStore();
  const { setCreateModalOpen, projects, isLoadingCanvases, openPricingOverlay } = useOutletContext<OutletContextType>();

  const handleCreateCanvas = () => {
    setCreateModalOpen(true);
  };

  const RecentCanvasesSection = () => (
    <div className="px-8 sm:px-12 lg:px-16 pb-16 bg-black">
      <div className="bg-gradient-custom bg-cover bg-center rounded-2xl">
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-bold text-center mb-12 font-heading">Your Recent Canvases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((canvas) => (
                <Card key={canvas.id} className="p-6 text-left cursor-pointer rounded-xl bg-gray-900/50 backdrop-blur-sm shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl border-none">
                  <CardContent className="p-0 flex flex-col gap-3">
                    <Link to={canvas.url} className="flex items-center gap-3 text-xl font-semibold text-white">
                      <canvas.icon className="h-5 w-5 text-blue-500" />
                      {canvas.name}
                    </Link>
                    {/* Placeholder for last modified date */}
                    <p className="text-sm text-gray-400">Opened recently</p>
                    <Button asChild variant="outline" size="sm" className="mt-4 self-start rounded-full bg-transparent text-white hover:bg-white/10">
                      <Link to={canvas.url}>Open</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  const WelcomeSection = () => (
    <div className="px-8 sm:px-12 lg:px-16 pb-16 bg-black">
      <div className="bg-gradient-custom bg-cover bg-center rounded-2xl">
        <section className="py-20 lg:py-28 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-bold mb-6 font-heading">
              Welcome, {user?.name || 'Creator'}!
            </h2>
            <p className="max-w-[600px] mx-auto text-gray-300 md:text-xl mb-8">
              Your creative space is ready. Create your first canvas to bring your ideas to life.
            </p>
            <Button
              size="lg"
              className="text-lg px-10 py-7 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
              onClick={handleCreateCanvas}
            >
              <PlusCircle className="mr-3 h-6 w-6" />
              Create Your First Canvas
            </Button>
            <div className="mt-20">
              <h3 className="text-4xl font-bold text-center mb-12 font-heading">Getting Started</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                {quickTips.map((tip) => (
                  <div key={tip.title} className="rounded-xl bg-gray-900/50 p-6 flex flex-col items-start gap-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gray-800">
                      {tip.icon}
                    </div>
                    <h4 className="text-xl font-semibold text-white">{tip.title}</h4>
                    <p className="text-gray-400">{tip.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  const LoadingSkeleton = () => (
     <div className="px-8 sm:px-12 lg:px-16 pb-16 bg-black">
      <div className="bg-gradient-custom bg-cover bg-center rounded-2xl">
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-bold text-center mb-12 font-heading">Your Recent Canvases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-40 rounded-xl bg-gray-900/50" />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )

  return (
    <>
      {/* --- BLACK HERO SECTION --- */}
      <div className="bg-black">
        <section className="flex flex-col items-center justify-center text-center py-24 lg:py-32">
          <div className="mb-6">
            <button 
              onClick={openPricingOverlay} 
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10"
            >
              <PartyPopper className="h-4 w-4 text-yellow-400" />
              <span className="font-medium">Beta Access: All features are free during our trial period!</span>
            </button>
          </div>
          <h1 className="text-6xl lg:text-7xl font-bold tracking-tighter font-heading">
            Infinite Canvas, Simplified.
          </h1>
          <p className="max-w-[700px] text-gray-300 md:text-xl mt-6">
            Unleash your creativity with Nexus. Brainstorm, organize, and collaborate on an endless digital whiteboard.
          </p>
        </section>
      </div>

      {/* Conditionally render sections */}
      {isLoadingCanvases ? (
        <LoadingSkeleton />
      ) : projects && projects.length > 0 ? (
        <RecentCanvasesSection />
      ) : (
        <WelcomeSection />
      )}

      {/* --- BLACK TEMPLATES SECTION --- */}
      <div className="bg-black pb-24">
        <section className="container mx-auto px-4">
            <h2 className="text-5xl font-bold text-center mb-12 font-heading">Start from a Template</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {templates.map((template) => (
                <Card key={template.title} className="p-6 text-center flex flex-col items-center justify-center gap-4 cursor-pointer rounded-xl bg-gray-900/50 backdrop-blur-sm shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl border-none">
                  {template.icon}
                  <p className="text-lg font-semibold text-white">{template.title}</p>
                </Card>
              ))}
            </div>
        </section>
      </div>
    </>
  );
}