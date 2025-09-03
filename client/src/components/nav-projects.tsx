"use client"

import {
  MoreHorizontal,
  Star,
  Trash2,
  Undo2,
  type LucideIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

interface NavProjectsProps {
  projects: {
    id: string
    name: string
    url: string
    icon: LucideIcon
    isFavorite?: boolean
  }[]
  label: string
  onToggleFavorite?: (projectId: string) => void
}

export function NavProjects({ projects, label, onToggleFavorite }: NavProjectsProps) {
  const { isMobile } = useSidebar()

  if (!projects?.length) return null

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                {label === "Trash" ? (
                  <>
                    <DropdownMenuItem onSelect={() => alert("Restoring... (not implemented)")}>
                      <Undo2 className="text-muted-foreground" />
                      <span>Restore</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => alert("Deleting permanently... (not implemented)")}>
                      <Trash2 className="text-muted-foreground" />
                      <span>Delete Permanently</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onSelect={() => onToggleFavorite?.(item.id)}>
                      <Star className="text-muted-foreground" />
                      <span>{item.isFavorite ? "Unfavorite" : "Favorite"}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => alert("Deleting... (not implemented)")}>
                      <Trash2 className="text-muted-foreground" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
