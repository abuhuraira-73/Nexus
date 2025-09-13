"use client"

import * as React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  ArrowLeft,
  ArrowRight,
  AudioWaveform,
  Bold,
  ChevronRight,
  Circle,
  Command,
  Eraser,
  Frame,
  GalleryVerticalEnd,
  Heading1,
  Highlighter,
  Italic,
  Map,
  Pen,
  PieChart,
  Plus,
  RectangleHorizontal,
  Settings2,
  Shapes,
  Square,
  Star,
  StickyNote,
  Trash2,
  Triangle,
  Type,
  Underline,
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
import { Textarea } from "./ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";


import { Pencil } from "lucide-react";

const shapeTools = [
  { name: "Rectangle", icon: RectangleHorizontal, type: 'rectangle' },
  { name: "Square", icon: Square, type: 'square' },
  { name: "Circle", icon: Circle, type: 'circle' },
  { name: "Triangle", icon: Triangle, type: 'triangle' },
  { name: "Star", icon: Star, type: 'star' },
  { name: "Arrow", icon: ArrowRight, type: 'arrow' },
];

const drawingTools = [
    { name: "Pencil", icon: Pencil, isFunctional: true },
    { name: "Pen", icon: Pen, isFunctional: false },
    { name: "Highlighter", icon: Highlighter, isFunctional: false },
]

const textTools = [
    { name: "Plain Text", icon: Type, subType: 'plain' },
    { name: "Heading", icon: Heading1, subType: 'heading' },
    { name: "Sticky Note", icon: StickyNote, subType: 'stickyNote' },
]

const NavTools = () => {
  const { mode, setMode } = useCanvasStore();

  const toggleDrawMode = () => {
    setMode(mode === 'draw' ? 'select' : 'draw');
  };

  const toggleEraserMode = () => {
    setMode(mode === 'erase' ? 'select' : 'erase');
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Tools</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
            <SidebarMenuButton
                onClick={toggleEraserMode}
                isActive={mode === 'erase'}
            >
                <Eraser />
                <span>Eraser</span>
            </SidebarMenuButton>
        </SidebarMenuItem>
        <Collapsible asChild className="group/collapsible" defaultOpen>
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                        <Pencil />
                        <span>Draw</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {drawingTools.map((tool) => (
                            <SidebarMenuSubItem key={tool.name}>
                                <SidebarMenuSubButton
                                    onClick={tool.isFunctional ? toggleDrawMode : undefined}
                                    className="text-sidebar-foreground/70"
                                    disabled={!tool.isFunctional}
                                    isActive={tool.isFunctional && mode === 'draw'}
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
                        e.dataTransfer.setData("application/reactflow", tool.type);
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
        <Collapsible asChild className="group/collapsible" defaultOpen>
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton>
                <Type />
                <span>Text</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {textTools.map((tool) => (
                  <SidebarMenuSubItem key={tool.name}>
                    <SidebarMenuSubButton
                      className="text-sidebar-foreground/70"
                      draggable={true}
                      onDragStart={(e) => {
                        e.dataTransfer.setData("application/reactflow", "text");
                        e.dataTransfer.setData("application/subtype", tool.subType);
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

const TextPropertiesPanel = ({ shape }: { shape: import("@/pages/infinite-canvas").Shape }) => {
    const { updateShape } = useCanvasStore();

    const handleFontStyleChange = (value: string[]) => {
        const isBold = value.includes('bold');
        const isItalic = value.includes('italic');
        let fontStyle = 'normal';
        if (isBold && isItalic) fontStyle = 'bold italic';
        else if (isBold) fontStyle = 'bold';
        else if (isItalic) fontStyle = 'italic';
        updateShape({ id: shape.id, fontStyle });
    }

    const handleTextDecorationChange = (value: string[]) => {
        const isUnderline = value.includes('underline');
        updateShape({ id: shape.id, textDecoration: isUnderline ? 'underline' : 'normal' });
    }

    const fonts = ['Inter', 'Caveat', 'Roboto', 'Source Code Pro', 'Playfair Display'];

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Text Properties</SidebarGroupLabel>
            <div className="p-4 space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="text-content">Content</Label>
                    <Textarea
                        id="text-content"
                        value={shape.text}
                        onChange={(e) => updateShape({ id: shape.id, text: e.target.value })}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="font-family">Font</Label>
                    <select
                        id="font-family"
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={shape.fontFamily}
                        onChange={(e) => updateShape({ id: shape.id, fontFamily: e.target.value })}
                    >
                        {fonts.map(font => (
                            <option key={font} value={font}>{font}</option>
                        ))}
                    </select>
                </div>
                <div className="grid gap-2">
                    <Label>Font Style</Label>
                    <ToggleGroup 
                        type="multiple" 
                        variant="outline"
                        onValueChange={handleFontStyleChange}
                        defaultValue={shape.fontStyle?.split(' ')}
                    >
                        <ToggleGroupItem value="bold" aria-label="Toggle bold">
                            <Bold className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="italic" aria-label="Toggle italic">
                            <Italic className="h-4 w-4" />
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
                 <div className="grid gap-2">
                    <Label>Decoration</Label>
                    <ToggleGroup 
                        type="multiple" 
                        variant="outline"
                        onValueChange={handleTextDecorationChange}
                        defaultValue={shape.textDecoration === 'underline' ? ['underline'] : []}
                    >
                        <ToggleGroupItem value="underline" aria-label="Toggle underline">
                            <Underline className="h-4 w-4" />
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <div className="grid gap-2">
                    <Label>Alignment</Label>
                    <ToggleGroup 
                        type="single" 
                        variant="outline" 
                        defaultValue={shape.align || 'left'}
                        onValueChange={(value) => updateShape({ id: shape.id, align: value })}
                    >
                        <ToggleGroupItem value="left" aria-label="Toggle left">
                            <AlignLeft className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="center" aria-label="Toggle center">
                            <AlignCenter className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="right" aria-label="Toggle right">
                            <AlignRight className="h-4 w-4" />
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-2">
                        <Label htmlFor="font-size">Font Size</Label>
                        <Input id="font-size" type="number" value={shape.fontSize} onChange={(e) => updateShape({ id: shape.id, fontSize: parseInt(e.target.value, 10) || 16 })} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="font-color">Font Color</Label>
                        <Input id="font-color" type="color" className="h-8" value={shape.fill} onChange={(e) => updateShape({ id: shape.id, fill: e.target.value })} />
                    </div>
                </div>
                {shape.subType === 'stickyNote' && (
                    <div className="grid gap-2">
                        <Label htmlFor="bg-color">Background</Label>
                        <Input id="bg-color" type="color" className="h-8" value={shape.backgroundColor} onChange={(e) => updateShape({ id: shape.id, backgroundColor: e.target.value })} />
                    </div>
                )}
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
        if (selectedShape.type === 'text') {
            return <TextPropertiesPanel shape={selectedShape} />;
        }
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
