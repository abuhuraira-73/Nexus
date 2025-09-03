"use client"

import * as React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  ArrowRight,
  AudioWaveform,
  BookOpen,
  Bot,
  ChevronRight,
  Circle,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  RectangleHorizontal,
  Settings2,
  Shapes,
  Square,
  Star,
  SquareTerminal,
  Triangle,
} from "lucide-react"

import { useCanvasStore } from "@/store/canvasStore"
import type { Shape } from "@/pages/infinite-canvas"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
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
} from "@/components/ui/sidebar"
import { Separator } from "./ui/separator"
import { Label } from "./ui/label"
import { Input } from "./ui/input"

const shapeTools = [
  { name: "Rectangle", icon: RectangleHorizontal },
  { name: "Square", icon: Square },
  { name: "Circle", icon: Circle },
  { name: "Triangle", icon: Triangle },
  { name: "Star", icon: Star },
  { name: "Arrow", icon: ArrowRight },
];

const NavTools = () => (
  <SidebarGroup>
    <SidebarGroupLabel>Tools</SidebarGroupLabel>
    <SidebarMenu>
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

const PropertiesPanel = ({ shape }: { shape: Shape }) => {
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


// This is sample data.
const data = {
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
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const navigate = useNavigate();
  const isCanvasOpen = location.pathname.startsWith('/canvas');

  const { selectedId, shapes } = useCanvasStore();
  const selectedShape = shapes.find((shape) => shape.id === selectedId);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {isCanvasOpen ? (
          selectedShape ? (
            <PropertiesPanel shape={selectedShape} />
          ) : (
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
          )
        ) : (
          <>
            <NavMain items={data.navMain} />
            <NavProjects projects={data.projects} />
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}