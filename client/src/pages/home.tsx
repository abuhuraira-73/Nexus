import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, FileText, Folder, Sparkles, BrainCircuit, Map, GitFork, Presentation } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Placeholder for recent canvases data
const recentCanvases = [
  { id: "1", name: "Project Brainstorm", lastModified: "2 hours ago", icon: <Sparkles className="h-5 w-5 text-blue-500" /> },
  { id: "2", name: "Marketing Plan Q3", lastModified: "Yesterday", icon: <FileText className="h-5 w-5 text-green-500" /> },
  { id: "3", name: "Team Meeting Notes", lastModified: "3 days ago", icon: <Folder className="h-5 w-5 text-purple-500" /> },
  { id: "4", name: "UI/UX Flowchart", lastModified: "1 week ago", icon: <Sparkles className="h-5 w-5 text-yellow-500" /> },
];

// Placeholder for templates data
const templates = [
  { title: "Brainstorming Session", icon: <BrainCircuit className="h-10 w-10 text-purple-400" /> },
  { title: "Project Roadmap", icon: <Map className="h-10 w-10 text-green-400" /> },
  { title: "Meeting Notes", icon: <FileText className="h-10 w-10 text-blue-400" /> },
  { title: "Flowchart", icon: <GitFork className="h-10 w-10 text-red-400" /> },
];

export default function HeroSection() {
  const navigate = useNavigate();

  const handleCreateCanvas = () => {
    // We can later make this a dynamic ID, e.g., `/canvas/${newCanvasId}`
    navigate('/app/canvas');
  };

  return (
    <>
      {/* --- BLACK HERO SECTION --- */}
      <div className="bg-black">
        <section className="flex flex-col items-center justify-center text-center py-24 lg:py-32">
          <h1 className="text-6xl lg:text-7xl font-bold tracking-tighter font-heading">
            Infinite Canvas, Simplified.
          </h1>
          <p className="max-w-[700px] text-gray-300 md:text-xl mt-6">
            Unleash your creativity with Nexus. Brainstorm, organize, and collaborate on an endless digital whiteboard.
          </p>
          <Button
            size="lg"
            className="mt-8 text-lg px-10 py-7 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            onClick={handleCreateCanvas}
          >
            <PlusCircle className="mr-3 h-6 w-6" />
            Create New Canvas
          </Button>
        </section>
      </div>

      {/* --- GRADIENT RECENT CANVASES SECTION --- */}
      <div className="px-8 sm:px-12 lg:px-16 pb-16 bg-black">
        <div className="bg-gradient-custom bg-cover bg-center rounded-2xl">
          <section className="py-20 lg:py-28">
            <div className="container mx-auto px-4">
              <h2 className="text-5xl font-bold text-center mb-12 font-heading">Your Recent Canvases</h2>
              {recentCanvases.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recentCanvases.map((canvas) => (
                    <Card key={canvas.id} className="p-6 text-left cursor-pointer rounded-xl bg-gray-900/50 backdrop-blur-sm shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl border-none">
                      <CardContent className="p-0 flex flex-col gap-3">
                        <div className="flex items-center gap-3 text-xl font-semibold text-white">
                          {canvas.icon}
                          {canvas.name}
                        </div>
                        <p className="text-sm text-gray-400">{canvas.lastModified}</p>
                        <Button variant="outline" size="sm" className="mt-4 self-start rounded-full bg-transparent text-white hover:bg-white/10">
                          Open
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic text-center text-lg">
                  No recent canvases found. Click "Create New Canvas" to get started!
                </p>
              )}
            </div>
          </section>
        </div>
      </div>

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