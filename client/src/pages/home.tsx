import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, FileText, Folder, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Placeholder for recent canvases data
const recentCanvases = [
  { id: "1", name: "Project Brainstorm", lastModified: "2 hours ago", icon: <Sparkles className="h-5 w-5 text-blue-500" /> },
  { id: "2", name: "Marketing Plan Q3", lastModified: "Yesterday", icon: <FileText className="h-5 w-5 text-green-500" /> },
  { id: "3", name: "Team Meeting Notes", lastModified: "3 days ago", icon: <Folder className="h-5 w-5 text-purple-500" /> },
  { id: "4", name: "UI/UX Flowchart", lastModified: "1 week ago", icon: <Sparkles className="h-5 w-5 text-yellow-500" /> },
];

export default function HeroSection() {
  const navigate = useNavigate();

  const handleCreateCanvas = () => {
    // We can later make this a dynamic ID, e.g., `/canvas/${newCanvasId}`
    navigate('/canvas');
  };

  return (
    <section className="relative overflow-hidden py-10 md:py-20 lg:py-15 flex flex-col flex-1 items-center justify-center">
      {/* Blurred Gradient Background */}
      <div
        className="absolute top-1/2 left-1/2 w-[60rem] h-[60rem] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-purple-600 via-pink-500 to-red-500 rounded-full blur-3xl opacity-20"
      ></div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center space-y-12">
        {/* Main Call to Action Section */}
        <div className="flex flex-col items-center gap-6 text-center max-w-5xl">
          {/* Optional: Add a logo/icon here if desired, similar to the example's block-1.svg */}
          {/* <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-16 w-16 text-primary" />
          </div> */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-pretty bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
            Infinite Canvas, Simplified.
          </h1>
          <p className="mx-auto max-w-3xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            Unleash your creativity with Nexus. Brainstorm, organize, and collaborate on an endless digital whiteboard.
          </p>
          <Button
            size="lg"
            className="mt-6 text-lg px-10 py-7 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            onClick={handleCreateCanvas}
          >
            <PlusCircle className="mr-3 h-6 w-6" />
            Create New Canvas
          </Button>
        </div>

        <Separator className="w-full max-w-4xl my-12 bg-gray-300/50" />

        {/* Recent Canvases Section */}
        <div className="w-full space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-center text-foreground">Your Recent Canvases</h2>
          {recentCanvases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentCanvases.map((canvas) => (
                <Card key={canvas.id} className="p-6 text-left transition-shadow cursor-pointer rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105">
                  <CardContent className="p-0 flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-xl font-semibold text-foreground">
                      {canvas.icon}
                      {canvas.name}
                    </div>
                    <p className="text-sm text-muted-foreground">{canvas.lastModified}</p>
                    <Button variant="outline" size="sm" className="mt-4 self-start rounded-full">
                      Open
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground italic text-center text-lg">
              No recent canvases found. Click "Create New Canvas" to get started!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}