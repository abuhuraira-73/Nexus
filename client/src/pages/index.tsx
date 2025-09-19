import { AppSidebar } from "@/components/app-sidebar"
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
import { Download, MessageSquare, Presentation, Share2 } from "lucide-react"
import { Outlet, useLocation } from 'react-router-dom';

export default function AppLayout() {
  const location = useLocation();
  const isCanvasOpen = location.pathname.startsWith('/app/canvas');

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {isCanvasOpen && (
          <header className="sticky top-4 z-10 mx-4 flex h-16 shrink-0 items-center gap-2 rounded-lg border border-zinc-800 bg-black transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Nexus
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Home</BreadcrumbPage>
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
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}