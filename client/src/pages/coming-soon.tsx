import PublicFooter from "@/components/public-footer";
import PublicHeader from "@/components/public-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const upcomingFeatures = [
  {
    title: "Nexus Sync: Real-Time Collaboration Engine",
    description: "The foundational engine for synchronizing all canvas element changes (create, update, delete) between active users in real-time.",
    status: "In Progress",
  },
  {
    title: "Live Cursors & Presence Indicators",
    description: "See your team's cursors move across the canvas in real-time and view the avatars of all users currently active on a board.",
    status: "In Progress",
  },
  {
    title: "Premium Subscription Tiers",
    description: "Unlock the full potential of Nexus with unlimited items, advanced features, and priority support through our upcoming premium plans.",
    status: "Planned",
  },
  {
    title: "Canvas Sharing & Permissions",
    description: "Share your creations with a public link or invite collaborators to private canvases with granular permissions (view, comment, edit).",
    status: "Planned",
  },
  {
    title: "Proper Image & File Uploads",
    description: "A robust backend solution for handling file uploads, allowing you to store images, PDFs, and other assets securely.",
    status: "Planned",
  },
  {
    title: "Template Library",
    description: "Jumpstart your projects with a library of pre-built templates for flowcharts, mind maps, project plans, and more.",
    status: "Planned",
  },
  {
    title: "AI-Powered Features",
    description: "Leverage the power of AI for idea generation, content summarization, and automatic content tagging.",
    status: "Planned",
  },
  {
    title: "Third-Party Integrations",
    description: "Connect Nexus with your favorite tools, such as cloud storage providers (Google Drive, Dropbox) and communication apps (Slack, Teams).",
    status: "Planned",
  },
  {
    title: "Complete Deletion Lifecycle",
    description: "Permanently delete items from the trash to fully manage your canvas lifecycle and storage.",
    status: "Planned",
  },
];

export default function ComingSoonPage() {
  return (
    <div className="flex flex-col min-h-screen text-white bg-black">
      <PublicHeader />

      <main className="flex-1">
        <div className="px-8 sm:px-12 lg:px-16">
          <section className="text-center py-20 lg:py-28 bg-black">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter font-heading">Coming Soon</h1>
              <p className="max-w-[700px] mx-auto text-gray-400 md:text-xl mt-6">
                We're constantly working to make Nexus even better. Here's a look at the exciting features we have planned and in progress.
              </p>
          </section>
        </div>

        {/* Main Content Section: Features List (Gradient BG, Full Width) */}
        <div className="px-8 sm:px-12 lg:px-16"> {/* Outer padding for the gradient section */}
          <div className="bg-gradient-custom bg-cover bg-center rounded-2xl"> {/* Gradient background and rounded corners */}
            <div className="container mx-auto px-4 py-20 lg:py-28"> {/* Inner container for content padding */}
              <div className="max-w-4xl mx-auto"> {/* Max width for the feature cards */}
                <div className="space-y-8">
                  {upcomingFeatures.map((feature, index) => (
                    <Card key={index} className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-xl">{feature.title}</CardTitle>
                          <span className={`ml-4 whitespace-nowrap px-3 py-1 text-sm font-medium rounded-full ${
                            feature.status === 'In Progress'
                              ? 'bg-blue-900/50 text-blue-300 border border-blue-500/30'
                              : 'bg-gray-700/50 text-gray-300 border border-gray-500/30'
                          }`}>
                            {feature.status}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-400">{feature.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
