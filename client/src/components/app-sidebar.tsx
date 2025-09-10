"use client"

import * as React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  ArrowRight,
  AudioWaveform,
  ChevronRight,
  Circle,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Plus,
  RectangleHorizontal,
  Settings2,
  Shapes,
  Square,
  Star,
  Trash2,
  Triangle,
} from "lucide-react"

import { useCanvasStore } from "@/store/canvasStore";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

import { Pencil } from "lucide-react";

const shapeTools = [
  { name: "Rectangle", icon: RectangleHorizontal },
  { name: "Square", icon: Square },
  { name: "Circle", icon: Circle },
  { name: "Triangle", icon: Triangle },
  { name: "Star", icon: Star },
  { name: "Arrow", icon: ArrowRight },
];

const NavTools = () => {
  const { mode, setMode } = useCanvasStore();

  const toggleDrawMode = () => {
    setMode(mode === 'draw' ? 'select' : 'draw');
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Tools</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={toggleDrawMode}
            isActive={mode === 'draw'}
          >
            <Pencil />
            <span>Draw</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <Collapsible asChild className="group/collapsible" defaultOpen>
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton>
                <Shapes />
                <span>Shapes</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {shapeTools.map((tool) => (
                  <SidebarMenuSubItem key={tool.name}>
                    <SidebarMenuSubButton
                      className="text-sidebar-foreground/70"
                      draggable={true}
                      onDragStart={(e) => {
                        e.dataTransfer.setData("application/reactflow", tool.name.toLowerCase());
                        e.dataTransfer.effectAllowed = "move";
                      }}
                    >
                      <tool.icon className="text-muted-foreground" />
                      <span>{tool.name}</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
};

const PropertiesPanel = ({ shape }: { shape: import("@/pages/infinite-canvas").Shape }) => {
  const { updateShape } = useCanvasStore();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Properties</SidebarGroupLabel>
      <div className="p-4 space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="fill-color">Fill Color</Label>
          <Input
            id="fill-color"
            type="color"
            className="h-8"
            value={shape.fill}
            onChange={(e) => updateShape({ id: shape.id, fill: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="rotation">Rotation</Label>
          <Input
            id="rotation"
            type="number"
            value={shape.rotation || 0}
            onChange={(e) => updateShape({ id: shape.id, rotation: parseInt(e.target.value, 10) || 0 })}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-2">
                <Label htmlFor="pos-x">X</Label>
                <Input id="pos-x" type="number" value={Math.round(shape.x)} onChange={(e) => updateShape({ id: shape.id, x: parseInt(e.target.value, 10) || 0 })} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="pos-y">Y</Label>
                <Input id="pos-y" type="number" value={Math.round(shape.y)} onChange={(e) => updateShape({ id: shape.id, y: parseInt(e.target.value, 10) || 0 })} />
            </div>
        </div>
      </div>
    </SidebarGroup>
  )
}

const DrawProperties = () => {
  const { strokeColor, setStrokeColor, strokeWidth, setStrokeWidth, setMode } = useCanvasStore();

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={() => setMode('select')}>
            <ArrowLeft />
            <span>Sidebar</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <Separator />
      <SidebarGroupLabel>Draw Properties</SidebarGroupLabel>
      <div className="p-4 space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="stroke-color">Stroke Color</Label>
          <Input
            id="stroke-color"
            type="color"
            className="h-8"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="stroke-width">Stroke Width</Label>
          <Input
            id="stroke-width"
            type="number"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(parseInt(e.target.value, 10) || 1)}
          />
        </div>
      </div>
    </SidebarGroup>
  )
}


// This is sample data.
const initialData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Nexus",
      logo: GalleryVerticalEnd,
      plan: "",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Design Engineering",
      url: "#",
      icon: Frame,
      isFavorite: true,
    },
    {
      id: "proj-2",
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
      isFavorite: false,
    },
    {
      id: "proj-3",
      name: "Travel",
      url: "#",
      icon: Map,
      isFavorite: false,
    },
  ],
  trash: [
    {
        id: "proj-4",
        name: "Old Brainstorm",
        url: "#",
        icon: Trash2,
        isFavorite: false,
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const navigate = useNavigate();
  const isCanvasOpen = location.pathname.startsWith('/canvas');

  const [projects, setProjects] = React.useState(initialData.projects);

  const toggleFavorite = (projectId: string) => {
    setProjects(
      projects.map((p) =>
        p.id === projectId ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
  };

  const favoriteProjects = projects.filter((p) => p.isFavorite);
  const otherProjects = projects.filter((p) => !p.isFavorite);

  const { selectedId, shapes, mode } = useCanvasStore();
  const selectedShape = shapes.find((shape) => shape.id === selectedId);

  const renderCanvasSidebar = () => {
    if (mode === 'draw') {
      return <DrawProperties />;
    }

    if (selectedShape) {
      return <PropertiesPanel shape={selectedShape} />;
    }

    return (
      <>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate('/')}>
                <ArrowLeft />
                <span>Back to Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <Separator />
        <NavTools />
      </>
    );
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={initialData.teams} />
      </SidebarHeader>
      <SidebarContent>
        {isCanvasOpen ? (
          renderCanvasSidebar()
        ) : (
          <div className="flex flex-col gap-2">
            <SidebarGroup>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => navigate('/canvas')}>
                            <Plus/>
                            <span>New Canvas</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
            <NavProjects projects={favoriteProjects} label="Favorites" onToggleFavorite={toggleFavorite} />
            <NavProjects projects={otherProjects} label="All Canvases" onToggleFavorite={toggleFavorite} />
            <NavProjects projects={initialData.trash} label="Trash" />
            <SidebarGroup>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Settings2/>
                            <span>Settings</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
          </div>
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={initialData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
