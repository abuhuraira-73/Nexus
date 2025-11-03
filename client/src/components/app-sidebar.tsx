'use client';

import * as React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  CornerDownRight,
  Bold,
  ChevronRight,
  Circle,
  Eraser,
  File,
  FileText,
  Film,
  Heading1,
  Highlighter,
  Image,
  Italic,
  Link,
  ListTodo,
  Pen,
  Plus,
  RectangleHorizontal,
  Redo2,
  Shapes,
  Square,
  Star,
  Spline,
  StickyNote,
  Table,
  Trash2,
  Triangle,
  Type,
  Underline,
  Undo2,
  MessageSquare,
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { ImageUploadModal } from './image-upload-modal';
import { initialData } from "@/lib/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil, type LucideIcon } from "lucide-react";

export type Project = {
  id: string;
  name: string;
  url: string;
  icon: LucideIcon;
  isFavorite: boolean;
};

const shapeTools = [
  { name: "Rectangle", icon: RectangleHorizontal, type: 'rectangle' },
  { name: "Square", icon: Square, type: 'square' },
  { name: "Circle", icon: Circle, type: 'circle' },
  { name: "Triangle", icon: Triangle, type: 'triangle' },
  { name: "Star", icon: Star, type: 'star' },
];

const arrowTools = [
  { name: "Arrow Right", icon: ArrowRight, subType: 'right' },
  { name: "Arrow Left", icon: ArrowLeft, subType: 'left' },
  { name: "Arrow Up", icon: ArrowUp, subType: 'up' },
  { name: "Arrow Down", icon: ArrowDown, subType: 'down' },
  { name: "Corner Down Right", icon: CornerDownRight, subType: 'bent-down-right' },
];

const drawingTools = [
    { name: "Pencil", icon: Pencil, isFunctional: true },
    { name: "Pen", icon: Pen, isFunctional: false },
    { name: "Highlighter", icon: Highlighter, isFunctional: false },
]

const textTools = [
    { name: "Text", icon: Type, subType: 'plain' },
    { name: "Text Card", icon: FileText, subType: 'textCard' },
    { name: "Sticky Note", icon: StickyNote, subType: 'stickyNote' },
    { name: "Checklist", icon: ListTodo, subType: 'checklist' },
    { name: "Table", icon: Table, subType: 'table' },
]

const mediaTools = [
    { name: "Image", icon: Image, type: 'image', disabled: false },
    { name: "Embed Link", icon: Link, type: 'embed', disabled: true },
    { name: "Upload File", icon: File, type: 'file', disabled: true },
]

const NavTools = ({ onImageToolClick }: { onImageToolClick: () => void }) => {
  const { mode, setMode, undo, redo } = useCanvasStore();

  const toggleDrawMode = () => {
    setMode(mode === 'draw' ? 'select' : 'draw');
  };

  const toggleEraserMode = () => {
    setMode(mode === 'erase' ? 'select' : 'erase');
  }

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Actions</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem className="grid grid-cols-2 gap-2">
            <SidebarMenuButton onClick={undo} className="justify-center">
              <Undo2 />
              <span className="sr-only">Undo</span>
            </SidebarMenuButton>
            <SidebarMenuButton onClick={redo} className="justify-center">
              <Redo2 />
              <span className="sr-only">Redo</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <Separator className="my-2" />

      <SidebarGroup>
        <SidebarGroupLabel>Tools</SidebarGroupLabel>
        <SidebarMenu>
          {/* Text Tools */}
          <Collapsible asChild className="group/collapsible">
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

          {/* Shape Tools */}
          <Collapsible asChild className="group/collapsible">
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

          {/* Arrow Tools */}
          <Collapsible asChild className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <ArrowRight />
                  <span>Arrows</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {arrowTools.map((tool) => (
                    <SidebarMenuSubItem key={tool.name}>
                      <SidebarMenuSubButton
                        className="text-sidebar-foreground/70"
                        draggable={true}
                        onDragStart={(e) => {
                          e.dataTransfer.setData("application/reactflow", "arrow");
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

          {/* Connector Tool */}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setMode(mode === 'connector' ? 'select' : 'connector')}
              isActive={mode === 'connector'}
            >
              <Spline />
              <span>Connector</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Drawing Tools */}
          <Collapsible asChild className="group/collapsible">
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

          {/* Media Tools */}
          <Collapsible asChild className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <Film />
                  <span>Media</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {mediaTools.map((tool) => (
                    <SidebarMenuSubItem key={tool.name}>
                      <SidebarMenuSubButton
                        className="text-sidebar-foreground/70"
                        onClick={onImageToolClick}
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

          {/* Eraser */}
          <SidebarMenuItem>
              <SidebarMenuButton
                  onClick={toggleEraserMode}
                  isActive={mode === 'erase'}
              >
                  <Eraser />
                  <span>Eraser</span>
              </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
};

const PropertiesPanel = ({ shape }: { shape: import("@/pages/infinite-canvas").Shape }) => {
  const { updateShapeAndPushHistory, deleteShape, selectShape } = useCanvasStore();

  const handleDelete = () => {
    deleteShape(shape.id);
    selectShape(null);
  };

  return (
    <SidebarGroup>
      <div className="flex items-center justify-between px-4 pt-1 mb-2">
        <SidebarGroupLabel>Properties</SidebarGroupLabel>
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent><p>Delete Shape</p></TooltipContent>
        </Tooltip>
      </div>
      <div className="p-4 pt-0 space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="color">Color</Label>
          <Input
            id="color"
            type="color"
            className="h-8"
            value={shape.type === 'arrow' ? shape.stroke : shape.fill}
            onChange={(e) => {
                if (shape.type === 'arrow') {
                    updateShapeAndPushHistory({ id: shape.id, stroke: e.target.value, fill: e.target.value });
                } else {
                    updateShapeAndPushHistory({ id: shape.id, fill: e.target.value });
                }
            }}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="rotation">Rotation</Label>
          <Input
            id="rotation"
            type="number"
            value={shape.rotation || 0}
            onChange={(e) => updateShapeAndPushHistory({ id: shape.id, rotation: parseInt(e.target.value, 10) || 0 })}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-2">
                <Label htmlFor="pos-x">X</Label>
                <Input id="pos-x" type="number" value={Math.round(shape.x)} onChange={(e) => updateShapeAndPushHistory({ id: shape.id, x: parseInt(e.target.value, 10) || 0 })} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="pos-y">Y</Label>
                <Input id="pos-y" type="number" value={Math.round(shape.y)} onChange={(e) => updateShapeAndPushHistory({ id: shape.id, y: parseInt(e.target.value, 10) || 0 })} />
            </div>
        </div>
      </div>
    </SidebarGroup>
  )
}

const ConnectorPropertiesPanel = ({ shape }: { shape: import("@/pages/infinite-canvas").Shape }) => {
    const { updateShapeAndPushHistory, deleteShape, selectShape } = useCanvasStore();

    const handleDelete = () => {
        deleteShape(shape.id);
        selectShape(null);
    };

    return (
        <SidebarGroup>
            <div className="flex items-center justify-between px-4 pt-1 mb-2">
                <SidebarGroupLabel>Connector Properties</SidebarGroupLabel>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={handleDelete}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent><p>Delete Connector</p></TooltipContent>
                </Tooltip>
            </div>
            <div className="p-4 pt-0 space-y-4">
                <div>
                    <Label>Stroke Color</Label>
                    <Input
                        type="color"
                        value={shape.stroke}
                        onChange={(e) => updateShapeAndPushHistory({ id: shape.id, stroke: e.target.value })}
                    />
                </div>
                <div>
                    <Label>Stroke Width</Label>
                    <Input
                        type="number"
                        value={shape.strokeWidth}
                        onChange={(e) => updateShapeAndPushHistory({ id: shape.id, strokeWidth: parseInt(e.target.value, 10) || 1 })}
                    />
                </div>
            </div>
        </SidebarGroup>
    )
}

const TablePropertiesPanel = ({ shape }: { shape: import("@/pages/infinite-canvas").Shape }) => {
    const { updateShapeAndPushHistory, deleteShape, selectShape } = useCanvasStore();

    const handleDelete = () => {
        deleteShape(shape.id);
        selectShape(null);
    };

    const addRow = () => {
        const newRow = new Array(shape.tableData[0].length).fill({ text: '' });
        const newTableData = [...shape.tableData, newRow];
        const newRowHeights = [...shape.rowHeights, 40];
        updateShapeAndPushHistory({ id: shape.id, tableData: newTableData, rowHeights: newRowHeights });
    };

    const removeRow = () => {
        if (shape.tableData.length > 1) {
            const newTableData = shape.tableData.slice(0, -1);
            const newRowHeights = shape.rowHeights.slice(0, -1);
            updateShapeAndPushHistory({ id: shape.id, tableData: newTableData, rowHeights: newRowHeights });
        }
    };

    const addColumn = () => {
        const newTableData = shape.tableData.map(row => [...row, { text: '' }]);
        const newColumnWidths = [...shape.columnWidths, 150];
        updateShapeAndPushHistory({ id: shape.id, tableData: newTableData, columnWidths: newColumnWidths });
    };

    const removeColumn = () => {
        if (shape.tableData[0].length > 1) {
            const newTableData = shape.tableData.map(row => row.slice(0, -1));
            const newColumnWidths = shape.columnWidths.slice(0, -1);
            updateShapeAndPushHistory({ id: shape.id, tableData: newTableData, columnWidths: newColumnWidths });
        }
    };



    return (
        <SidebarGroup>
            <div className="flex items-center justify-between px-4 pt-1 mb-2">
                <SidebarGroupLabel>Table Properties</SidebarGroupLabel>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={handleDelete}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent><p>Delete Table</p></TooltipContent>
                </Tooltip>
            </div>
            <div className="p-4 pt-0 space-y-4">
                <div className="grid grid-cols-2 gap-2">
                    <Button onClick={addRow}><Plus className="h-4 w-4 mr-2" /> Row</Button>
                    <Button onClick={removeRow} disabled={shape.tableData.length <= 1}><Trash2 className="h-4 w-4 mr-2" /> Row</Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <Button onClick={addColumn}><Plus className="h-4 w-4 mr-2" /> Column</Button>
                    <Button onClick={removeColumn} disabled={shape.tableData[0].length <= 1}><Trash2 className="h-4 w-4 mr-2" /> Column</Button>
                </div>
                <Separator />
                <div>
                    <Label>Border Color</Label>
                    <Input
                        type="color"
                        value={shape.stroke}
                        onChange={(e) => updateShapeAndPushHistory({ id: shape.id, stroke: e.target.value })}
                    />
                </div>
                <div>
                    <Label>Border Width</Label>
                    <Input
                        type="number"
                        value={shape.strokeWidth}
                        onChange={(e) => updateShapeAndPushHistory({ id: shape.id, strokeWidth: parseInt(e.target.value, 10) || 1 })}
                    />
                </div>
                <Separator />
                <div className="grid gap-2">
                    <Label htmlFor="corner-radius">Corner Radius</Label>
                    <Input id="corner-radius" type="number" value={shape.cornerRadius || 0} onChange={(e) => updateShapeAndPushHistory({ id: shape.id, cornerRadius: parseInt(e.target.value, 10) || 0 })} />
                </div>
                <div>
                    <Label>Background Color</Label>
                    <Input
                        type="color"
                        value={shape.backgroundColor}
                        onChange={(e) => updateShapeAndPushHistory({ id: shape.id, backgroundColor: e.target.value })}
                    />
                </div>
            </div>
        </SidebarGroup>
    )
}

const TextPropertiesPanel = ({ shape }: { shape: import("@/pages/infinite-canvas").Shape }) => {
    const { updateShapeAndPushHistory, deleteShape, selectShape } = useCanvasStore();

    const handleDelete = () => {
        deleteShape(shape.id);
        selectShape(null);
    };

    const handleFontStyleChange = (value: string[]) => {
        const isBold = value.includes('bold');
        const isItalic = value.includes('italic');
        let fontStyle = 'normal';
        if (isBold && isItalic) fontStyle = 'bold italic';
        else if (isBold) fontStyle = 'bold';
        else if (isItalic) fontStyle = 'italic';
        updateShapeAndPushHistory({ id: shape.id, fontStyle });
    }

    const handleTextDecorationChange = (value: string[]) => {
        const isUnderline = value.includes('underline');
        updateShapeAndPushHistory({ id: shape.id, textDecoration: isUnderline ? 'underline' : 'normal' });
    }

    const fonts = ['Inter', 'Caveat', 'Roboto', 'Source Code Pro', 'Playfair Display'];

    return (
        <SidebarGroup>
            <div className="flex items-center justify-between px-4 pt-1 mb-2">
                <SidebarGroupLabel>Text Properties</SidebarGroupLabel>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={handleDelete}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent><p>Delete Item</p></TooltipContent>
                </Tooltip>
            </div>
            <div className="p-4 pt-0 space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="font-family">Font</Label>
                    <select
                        id="font-family"
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={shape.fontFamily}
                        onChange={(e) => updateShapeAndPushHistory({ id: shape.id, fontFamily: e.target.value })}
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
                        onValueChange={(value) => updateShapeAndPushHistory({ id: shape.id, align: value })}
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
                        <Input id="font-size" type="number" value={shape.fontSize} onChange={(e) => updateShapeAndPushHistory({ id: shape.id, fontSize: parseInt(e.target.value, 10) || 16 })} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="opacity">Opacity</Label>
                        <div className="flex items-center gap-2">
                            <Input 
                                id="opacity" 
                                type="number" 
                                min="0" 
                                max="100" 
                                value={Math.round((shape.opacity ?? 1) * 100)} 
                                onChange={(e) => {
                                    const percentage = parseInt(e.target.value, 10) || 0;
                                    updateShapeAndPushHistory({ id: shape.id, opacity: Math.max(0, Math.min(100, percentage)) / 100 });
                                }}
                            />
                            <span className="text-sm text-muted-foreground">%</span>
                        </div>
                    </div>
                </div>

                <Separator className="my-2" />
                <SidebarGroupLabel>Colors</SidebarGroupLabel>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="font-color">Font</Label>
                        <Input id="font-color" type="color" className="h-8" value={shape.textColor} onChange={(e) => updateShapeAndPushHistory({ id: shape.id, textColor: e.target.value })} />
                    </div>
                    {(shape.subType === 'textCard' || shape.subType === 'comment') && (
                        <div className="grid gap-2">
                            <Label htmlFor="card-bg-color">Card</Label>
                            <Input id="card-bg-color" type="color" className="h-8" value={shape.backgroundColor} onChange={(e) => updateShapeAndPushHistory({ id: shape.id, backgroundColor: e.target.value })} />
                        </div>
                    )}
                    {(shape.subType === 'textCard' || shape.subType === 'comment') && (
                         <div className="grid gap-2">
                            <Label htmlFor="card-border-color">Border</Label>
                            <Input id="card-border-color" type="color" className="h-8" value={shape.stroke} onChange={(e) => updateShapeAndPushHistory({ id: shape.id, stroke: e.target.value })} />
                        </div>
                    )}
                    {shape.subType === 'stickyNote' && (
                        <div className="grid gap-2">
                            <Label htmlFor="bg-color">Background</Label>
                            <Input id="bg-color" type="color" className="h-8" value={shape.backgroundColor} onChange={(e) => updateShapeAndPushHistory({ id: shape.id, backgroundColor: e.target.value })} />
                        </div>
                    )}
                </div>

                {(shape.subType === 'textCard' || shape.subType === 'comment') && (
                    <>
                        <Separator className="my-4" />
                        <SidebarGroupLabel>Card Properties</SidebarGroupLabel>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="grid gap-2">
                                <Label htmlFor="corner-radius">Corners</Label>
                                <Input id="corner-radius" type="number" value={shape.cornerRadius} onChange={(e) => updateShapeAndPushHistory({ id: shape.id, cornerRadius: parseInt(e.target.value, 10) || 0 })} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="shadow-blur">Shadow</Label>
                                <Input id="shadow-blur" type="number" value={shape.shadowBlur} onChange={(e) => updateShapeAndPushHistory({ id: shape.id, shadowBlur: parseInt(e.target.value, 10) || 0 })} />
                            </div>
                        </div>
                    </>
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

export function AppSidebar({ 
  setCreateModalOpen, 
  favoriteProjects,
  otherProjects,
  toggleFavorite,
  onTrashCanvas,
  trashedProjects,
  onRestoreCanvas,
  onPermanentDelete,
  ...props 
}: React.ComponentProps<typeof Sidebar> & { 
  setCreateModalOpen: (isOpen: boolean) => void;
  favoriteProjects: Project[];
  otherProjects: Project[];
  toggleFavorite: (projectId: string) => void;
  onTrashCanvas: (projectId: string) => void;
  trashedProjects: Project[];
  onRestoreCanvas: (projectId: string) => void;
  onPermanentDelete: (projectId: string) => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const isCanvasOpen = location.pathname.startsWith('/app/canvas');

  const [isImageModalOpen, setIsImageModalOpen] = React.useState(false);

  const { selectedId, shapes, mode, addShape } = useCanvasStore();
  const selectedShape = shapes.find((shape) => shape.id === selectedId);

    const handleAddImage = (src: string, width: number, height: number) => {
    addShape({
        id: String(Date.now()),
        type: 'image',
        src,
        x: 100,
        y: 100,
        width,
        height,
        fill: '', // Required by Shape type, not used by image
        rotation: 0,
        shadowBlur: 0,
    });
  }

  const renderCanvasSidebar = () => {
    if (mode === 'draw') {
      return <DrawProperties />;
    }

    if (selectedShape) {
        if (selectedShape.type === 'text') {
            if (selectedShape.subType === 'table') {
                return <TablePropertiesPanel shape={selectedShape} />;
            }
            return <TextPropertiesPanel shape={selectedShape} />;
        }
        if (selectedShape.type === 'connector') {
            return <ConnectorPropertiesPanel shape={selectedShape} />;
        }
        return <PropertiesPanel shape={selectedShape} />;
    }

    return (
      <>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate('/app')}>
                <ArrowLeft />
                <span>Back to Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <Separator />
        <NavTools onImageToolClick={() => setIsImageModalOpen(true)} />
      </>
    );
  };

  return (
    <Sidebar collapsible="icon" variant="floating" className="bg-black/50 backdrop-blur-sm" {...props}>
        <ImageUploadModal 
            isOpen={isImageModalOpen} 
            onClose={() => setIsImageModalOpen(false)} 
            onImageAdd={handleAddImage} 
        />


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
                        <SidebarMenuButton onClick={() => setCreateModalOpen(true)}>
                            <Plus/>
                            <span>New Canvas</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
            <NavProjects projects={favoriteProjects} label="Favorites" onToggleFavorite={toggleFavorite} onTrash={onTrashCanvas} />
            <NavProjects projects={otherProjects} label="All Canvases" onToggleFavorite={toggleFavorite} onTrash={onTrashCanvas} />
            <SidebarGroup>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <Trash2/>
                                    <span>Trash</span>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="rounded-lg bg-gray-900/50 backdrop-blur-sm border-none">
                                <DropdownMenuLabel>Trash</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {trashedProjects.length > 0 ? (
                                    trashedProjects.map((item) => (
                                        <DropdownMenuSub key={item.id}>
                                            <DropdownMenuSubTrigger>
                                                <item.icon className="mr-2 h-4 w-4" />
                                                <span>{item.name}</span>
                                            </DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent className="rounded-lg bg-gray-900/50 backdrop-blur-sm border-none">
                                                    <DropdownMenuItem onSelect={() => onRestoreCanvas(item.id)}>
                                                        <Undo2 className="mr-2 h-4 w-4" />
                                                        <span>Restore</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-500 focus:text-red-500" onSelect={() => onPermanentDelete(item.id)}>
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        <span>Delete Permanently</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>
                                    ))
                                ) : (
                                    <DropdownMenuItem disabled>Trash is empty</DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
          </div>
        )}
      </SidebarContent>
      <SidebarFooter className="mt-auto pb-4">
        <div className="flex-grow">
          <NavUser />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}