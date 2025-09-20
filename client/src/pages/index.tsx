import { useState, useEffect } from "react";
import { AppSidebar, initialData, type Project } from "@/components/app-sidebar";
import { CreateCanvasModal } from "@/components/create-canvas-modal";
import { useAppStore } from "@/store/appStore";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Download, MessageSquare, Presentation, Share2, Frame } from "lucide-react"
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { api } from '@/lib/api';

// Define the type for the API response when creating a canvas
interface CanvasResponse {
  _id: string;
  name: string;
  user: string;
  // Add other fields that the API returns
}

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isCanvasOpen = location.pathname.startsWith('/app/canvas');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const { currentCanvasName } = useAppStore();

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingCanvases, setIsLoadingCanvases] = useState(true);

  useEffect(() => {
    const fetchCanvases = async () => {
      try {
        setIsLoadingCanvases(true);
        const canvases = await api<CanvasResponse[]>(('/api/canvases'));
        const formattedProjects: Project[] = canvases.map(canvas => ({
          id: canvas._id,
          name: canvas.name,
          url: `/app/canvas/${canvas._id}`,
          icon: Frame, // Default icon
          isFavorite: false, // Add logic for favorites later
        }));
        setProjects(formattedProjects);
      } catch (error) {
        toast.error('Could not fetch your canvases.');
      } finally {
        setIsLoadingCanvases(false);
      }
    };

    fetchCanvases();
  }, []);

  const toggleFavorite = (projectId: string) => {
    setProjects(
      projects.map((p) =>
        p.id === projectId ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
  };

  const favoriteProjects = projects.filter((p) => p.isFavorite);
  const otherProjects = projects.filter((p) => !p.isFavorite);

  const handleCreateCanvas = async (name: string) => {
    const promise = api<CanvasResponse>('/api/canvases', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });

    toast.promise(promise, {
      loading: 'Creating canvas...',
      success: (newCanvas) => {
        // This is a temporary solution to add the new canvas to the UI.
        // We should ideally fetch the updated list from the server.
        const newProject: Project = {
          id: newCanvas._id,
          name: newCanvas.name,
          url: `/app/canvas/${newCanvas._id}`,
          icon: Frame, // Default icon, we might want to change this
          isFavorite: false,
        };
        setProjects((prevProjects) => [...prevProjects, newProject]);
        navigate(`/app/canvas/${newCanvas._id}`);
        return `Canvas "${newCanvas.name}" created!`;
      },
      error: 'Failed to create canvas',
    });
  };

  return (
    <SidebarProvider>
      <CreateCanvasModal 
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateCanvas}
      />
      <AppSidebar 
        setCreateModalOpen={setCreateModalOpen} 
        favoriteProjects={favoriteProjects}
        otherProjects={otherProjects}
        toggleFavorite={toggleFavorite}
      />
      <SidebarInset>
        {isCanvasOpen && (
          <header className="sticky top-4 z-10 mx-4 flex h-16 shrink-0 items-center justify-between gap-2 rounded-lg border border-zinc-800 bg-black transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink asChild>
                      <Link to="/app">Nexus</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{currentCanvasName || 'Canvas'}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="ml-auto flex items-center gap-2 px-4">
              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                        <span className="sr-only">Share</span>
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share</p>
                  </TooltipContent>
                </Tooltip>
                <DropdownMenuContent className="rounded-lg bg-gray-900/50 backdrop-blur-sm border-none">
                  <DropdownMenuItem>Copy Link</DropdownMenuItem>
                  <DropdownMenuItem>Invite by Email</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Embed</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Export</span>
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Export</p>
                  </TooltipContent>
                </Tooltip>
                <DropdownMenuContent className="rounded-lg bg-gray-900/50 backdrop-blur-sm border-none">
                  <DropdownMenuItem>Export as PNG</DropdownMenuItem>
                  <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                  <DropdownMenuItem>Export as SVG</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MessageSquare className="h-4 w-4" />
                    <span className="sr-only">Comments</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Comments</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Presentation className="h-4 w-4" />
                    <span className="sr-only">Present</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Present</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </header>
        )}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet context={{ setCreateModalOpen }} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}