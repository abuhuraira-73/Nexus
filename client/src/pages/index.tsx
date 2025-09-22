'use client';

import { useState, useEffect } from "react";
import { AppSidebar, type Project } from "@/components/app-sidebar";
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
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CanvasColorPicker } from "@/components/ui/canvas-color-picker";
import { ZoomControl } from "@/components/ui/zoom-control";
import { Download, MessageSquare, Presentation, Share2, Frame, Loader2, CheckCircle2 } from "lucide-react"
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { api, updateCanvasStatus } from '@/lib/api';

// Define the type for the API response when creating a canvas
interface CanvasResponse {
  _id: string;
  name: string;
  user: string;
  // Add other fields that the API returns
}

function AppLayoutContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const isCanvasOpen = location.pathname.startsWith('/app/canvas');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const { currentCanvasName, isSaving, lastSaved } = useAppStore();
  const { state: sidebarState } = useSidebar();

  const [showSavedIndicator, setShowSavedIndicator] = useState(false);

  useEffect(() => {
    if (lastSaved) {
      setShowSavedIndicator(true);
      const timer = setTimeout(() => {
        setShowSavedIndicator(false);
      }, 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [lastSaved]);

  const [projects, setProjects] = useState<Project[]>([]);
  const [trashedProjects, setTrashedProjects] = useState<Project[]>([]);
  const [isLoadingCanvases, setIsLoadingCanvases] = useState(true);

  useEffect(() => {
    const fetchAllCanvases = async () => {
      try {
        setIsLoadingCanvases(true);
        // Fetch active canvases
        const activeCanvases = await api<CanvasResponse[]>(('/api/canvases'));
        const formattedActive: Project[] = activeCanvases.map(canvas => ({
          id: canvas._id,
          name: canvas.name,
          url: `/app/canvas/${canvas._id}`,
          icon: Frame,
          isFavorite: false,
        }));
        setProjects(formattedActive);

        // Fetch trashed canvases
        const trashedCanvases = await api<CanvasResponse[]>(('/api/canvases/trash'));
        const formattedTrashed: Project[] = trashedCanvases.map(canvas => ({
          id: canvas._id,
          name: canvas.name,
          url: '#', // Trashed items don't navigate
          icon: Frame,
          isFavorite: false,
        }));
        setTrashedProjects(formattedTrashed);

      } catch (error) {
        console.error("Failed to fetch canvases:", error);
        toast.error(`Could not fetch your canvases: ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        setIsLoadingCanvases(false);
      }
    };

    fetchAllCanvases();
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
        const newProject: Project = {
          id: newCanvas._id,
          name: newCanvas.name,
          url: `/app/canvas/${newCanvas._id}`,
          icon: Frame,
          isFavorite: false,
        };
        setProjects((prevProjects) => [...prevProjects, newProject]);
        navigate(`/app/canvas/${newCanvas._id}`);
        return `Canvas "${newCanvas.name}" created!`;
      },
      error: 'Failed to create canvas',
    });
  };

  const handleTrashCanvas = (canvasId: string) => {
    const promise = updateCanvasStatus(canvasId, 'trashed');

    toast.promise(promise, {
      loading: 'Moving to trash...',
      success: (updatedCanvas) => {
        setProjects((prevProjects) => prevProjects.filter(p => p.id !== canvasId));
        const trashedProject: Project = {
            id: updatedCanvas._id,
            name: updatedCanvas.name,
            url: '#',
            icon: Frame,
            isFavorite: false,
        };
        setTrashedProjects(prev => [...prev, trashedProject]);
        return `Canvas "${updatedCanvas.name}" moved to trash.`;
      },
      error: 'Failed to move to trash',
    });
  };

  const handleRestoreCanvas = (canvasId: string) => {
    const promise = updateCanvasStatus(canvasId, 'active');
    toast.promise(promise, {
      loading: 'Restoring canvas...',
      success: (restoredCanvas) => {
        setTrashedProjects(prev => prev.filter(p => p.id !== canvasId));
        const restoredProject: Project = {
          id: restoredCanvas._id,
          name: restoredCanvas.name,
          url: `/app/canvas/${restoredCanvas._id}`,
          icon: Frame,
          isFavorite: false,
        };
        setProjects(prev => [...prev, restoredProject]);
        return `Canvas "${restoredCanvas.name}" restored.`;
      },
      error: 'Failed to restore canvas',
    });
  };

  const handlePermanentDelete = (canvasId: string) => {
    const promise = updateCanvasStatus(canvasId, 'archived');
    toast.promise(promise, {
      loading: 'Permanently deleting canvas...',
      success: () => {
        setTrashedProjects(prev => prev.filter(p => p.id !== canvasId));
        return `Canvas permanently deleted.`;
      },
      error: 'Failed to permanently delete',
    });
  };

  return (
    <>
      <CreateCanvasModal 
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateCanvas}
      />
      <AppSidebar 
        className="z-20"
        setCreateModalOpen={setCreateModalOpen} 
        favoriteProjects={favoriteProjects}
        otherProjects={otherProjects}
        toggleFavorite={toggleFavorite}
        onTrashCanvas={handleTrashCanvas}
        trashedProjects={trashedProjects}
        onRestoreCanvas={handleRestoreCanvas}
        onPermanentDelete={handlePermanentDelete}
      />
      {isCanvasOpen ? (
        <>
          <header 
            className="absolute top-4 right-4 z-30 flex h-16 shrink-0 items-center gap-2 rounded-lg bg-black/50 backdrop-blur-sm transition-all ease-linear px-4"
          >
            <div className="flex items-center gap-2">
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

            {/* Zoom Control */}
            <div className="flex-1 flex justify-center">
              {isCanvasOpen && <ZoomControl />}
            </div>

            {/* Save Status Indicator */}
            <div className="flex justify-center items-center px-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground transition-opacity duration-300 ease-in-out">
                    {isSaving ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Saving...</span>
                        </>
                    ) : showSavedIndicator ? (
                        <>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span>All changes saved</span>
                        </>
                    ) : null}
                </div>
            </div>

            <div className="flex items-center gap-2">
              <CanvasColorPicker />
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
          <main className="absolute inset-0 z-10">
            <Outlet context={{ setCreateModalOpen, projects, isLoadingCanvases }} />
          </main>
        </>
      ) : (
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Outlet context={{ setCreateModalOpen, projects, isLoadingCanvases }} />
          </div>
        </SidebarInset>
      )}
    </>
  )
}

export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppLayoutContent />
    </SidebarProvider>
  )
}