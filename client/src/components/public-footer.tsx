import { Twitter, Github, Linkedin } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer className="bg-black pt-4">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Nexus. All Rights Reserved.</p>
          <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-white"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-gray-500 hover:text-white"><Github className="h-5 w-5" /></a>
              <a href="#" className="text-gray-500 hover:text-white"><Linkedin className="h-5 w-5" /></a>
          </div>
      </div>
    </footer>
  );
}
