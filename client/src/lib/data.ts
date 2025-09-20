import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Trash2,
} from "lucide-react";
import type { Project } from "@/components/app-sidebar";

// This is sample data.
export const initialData = {
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
  projects: [] as Project[], // Start with an empty array, will be populated from DB
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
