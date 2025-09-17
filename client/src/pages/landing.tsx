import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, Zap, Shield, Heart, Star, Users, BrainCircuit, Twitter, Github, Linkedin } from "lucide-react";
import PublicHeader from "@/components/public-header"; // Import PublicHeader
import PublicFooter from "@/components/public-footer";

const features = [
  { icon: <Zap className="h-8 w-8 text-white transition-colors duration-300" />, title: "Infinite Canvas", description: "Never run out of space. Pan, zoom, and create on a limitless canvas that grows with your ideas." },
  { icon: <Users className="h-8 w-8 text-white transition-colors duration-300" />, title: "Real-time Collaboration", description: "Work together seamlessly with multi-user editing, cursors, and presence indicators." },
  { icon: <Shield className="h-8 w-8 text-white transition-colors duration-300" />, title: "Rich Content Types", description: "From images and links to documents and videos, bring any type of content onto your boards." },
  { icon: <Star className="h-8 w-8 text-white transition-colors duration-300" />, title: "Favorites System", description: "Pin your most important canvases for quick and easy access right from your dashboard." },
  { icon: <BrainCircuit className="h-8 w-8 text-white transition-colors duration-300" />, title: "Smart Drawing Tools", description: "Use connectors, smart shapes, and freehand drawing to map out complex ideas effortlessly." },
  { icon: <CheckCircle className="h-8 w-8 text-white transition-colors duration-300" />, title: "Local Persistence", description: "Your work is saved automatically to your local device, so you never lose a thought." },
];

const testimonials = [
  {
    quote: "Nexus has completely transformed how our team brainstorms. The infinite canvas is a game-changer for our creative process.",
    name: "Sarah L.",
    title: "Product Manager at Innovate Inc.",
    avatar: "https://avatar.vercel.sh/sarah.png",
    rating: 5,
  },
  {
    quote: "The real-time collaboration is flawless. We switched from Miro and haven't looked back. It's faster and much more intuitive.",
    name: "Rohan Sharma",
    title: "Engineering Lead, TechFrontier",
    avatar: "https://avatar.vercel.sh/rohan.png",
    rating: 5,
  },
  {
    quote: "As a visual thinker, Nexus is exactly what I needed. It's simple enough to get started in seconds but powerful enough for complex projects.",
    name: "Jessica T.",
    title: "UX Designer, Creative Minds",
    avatar: "https://avatar.vercel.sh/jessica.png",
    rating: 5,
  },
  {
    quote: "We use Nexus for everything from sprint planning to design mockups. The flexibility is unmatched. Highly recommended!",
    name: "David Chen",
    title: "Agile Coach",
    avatar: "https://avatar.vercel.sh/david.png",
    rating: 5,
  },
  {
    quote: "Finally, a whiteboard tool that doesn't get in the way of creativity. The clean UI and rich content types are brilliant.",
    name: "Priya Patel",
    title: "Freelance Brand Strategist",
    avatar: "https://avatar.vercel.sh/priya.png",
    rating: 5,
  },
  {
    quote: "The performance on large boards is impressive. Our entire design system lives on a single Nexus canvas and it handles it beautifully.",
    name: "Mike R.",
    title: "Principal Designer, ScaleUp",
    avatar: "https://avatar.vercel.sh/mike.png",
    rating: 5,
  },
  {
    quote: "The best part is how easy it is to onboard new team members. It just clicks. Nexus has become essential to our workflow.",
    name: "Emily Rodriguez",
    title: "Head of Remote Work",
    avatar: "https://avatar.vercel.sh/emily.png",
    rating: 5,
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen text-white bg-black">
      {/* Header */}
      <PublicHeader />

      <main className="flex-1">
        {/* --- BLACK HERO SECTION --- */}
        <div className="bg-black">
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center py-24 lg:py-40">
                <h1 className="text-6xl lg:text-7xl font-bold tracking-tighter font-heading">
                  All Your Ideas, in One Simple Space.
                </h1>
                <br/>
                <br/>

                <p className="max-w-[700px] text-gray-300 md:text-xl mt-6">
                  An intuitive digital whiteboard designed for today's workflow. Use our infinite canvas, rich content types, and seamless collaboration to do your best work.
                </p>
                <div className="mt-8 flex gap-4">
                  <Button size="lg" className="transition-transform duration-300 hover:scale-105">Get Started for Free</Button>
                  <Button size="lg" variant="outline" className="bg-transparent text-white transition-transform duration-300 hover:scale-105 hover:bg-white/10">
                    Learn More
                  </Button>
                </div>
            </section>
        </div>

        {/* --- GRADIENT FEATURES SECTION --- */}
        <div className="px-8 sm:px-12 lg:px-16">
            <div className="bg-gradient-custom bg-cover bg-center rounded-2xl">
                {/* Features Section */}
                <section id="features" className="py-20 lg:py-28">
                    <div className="container mx-auto px-4">
                      <h2 className="text-7xl font-bold text-center mb-12 font-heading">Everything You Need to Collaborate</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, i) => (
                          <Card key={i} className="group bg-gray-900/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl border-none">
                            <CardHeader>
                              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 mb-4 transition-colors duration-300">{feature.icon}</div>
                              <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-400">{feature.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                </section>
            </div>
        </div>

        {/* --- BLACK SECTION --- */}
        <div className="bg-black">
            <section className="py-20 lg:py-28">
                <div className="container mx-auto px-4">
                    <h2 className="text-7xl font-bold text-center mb-12 font-heading">Get Started in Seconds</h2>
                    <br/>
                    <br/>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-20 w-20 rounded-full border-2 border-purple-500 bg-purple-500/10 mb-6">
                                <span className="text-3xl font-bold">1</span>
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">Sign Up</h3>
                            <p className="text-gray-400">Create your free account instantly. No credit card required.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-20 w-20 rounded-full border-2 border-purple-500 bg-purple-500/10 mb-6">
                                <span className="text-3xl font-bold">2</span>
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">Create a Canvas</h3>
                            <p className="text-gray-400">Start a new board from scratch or choose from our upcoming templates.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-20 w-20 rounded-full border-2 border-purple-500 bg-purple-500/10 mb-6">
                                <span className="text-3xl font-bold">3</span>
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">Invite & Collaborate</h3>
                            <p className="text-gray-400">Invite your team to the board and start creating together in real-time.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
                            <br/>
                    <br/>


        {/* --- GRADIENT SECTION 2 --- */}
        <div className="px-8 sm:px-12 lg:px-16">
            <div className="bg-gradient-custom bg-cover bg-center rounded-2xl">
                {/* Testimonials Section */}
                <section className="py-20 lg:py-28">
                    <div className="container mx-auto px-4">
                        <h2 className="text-7xl font-bold text-center mb-12 font-heading">Loved by Teams Everywhere</h2>
                        <div 
                          className="relative w-full overflow-hidden"
                          style={{ maskImage: "linear-gradient(to right, transparent, black 4%, black 90%, transparent)" }}
                        >
                                              <br/>
                    <br/>

                            <div className="flex w-max animate-scroll">
                                {[...testimonials, ...testimonials].map((testimonial, i) => (
                                    <Card key={i} className="bg-gray-900/50 backdrop-blur-sm flex flex-col w-[380px] mx-4 flex-shrink-0">
                                        <CardContent className="pt-6 flex-grow">
                                            <div className="flex gap-1 mb-4">
                                                {[...Array(testimonial.rating)].map((_, j) => (
                                                    <Star key={j} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                                ))}
                                            </div>
                                            <p className="italic text-gray-300">"{testimonial.quote}"</p>
                                        </CardContent>
                                        <div className="p-6 pt-0 flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold">{testimonial.name}</p>
                                                <p className="text-sm text-gray-400">{testimonial.title}</p>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="py-20 lg:py-28">
                  <div className="container mx-auto px-4">
                    <h2 className="text-7xl font-bold text-center mb-12 font-heading">Choose Your Plan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                      <Card className="bg-gray-900/50 backdrop-blur-sm transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <CardHeader>
                          <CardTitle>Free</CardTitle>
                          <p className="text-gray-400">The Creative Sandbox</p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <p className="text-5xl font-bold">$0<span className="text-xl font-normal text-gray-400">/month</span></p>
                          <ul className="space-y-3">
                            <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-green-500" />Full Infinite Canvas Access</li>
                            <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-green-500" />All Drawing & Content Tools</li>
                            <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-green-500" />100 Items per Board</li>
                          </ul>
                          <Button className="w-full transition-colors duration-300" variant="outline">Get Started</Button>
                        </CardContent>
                      </Card>
                      <Card className="border-purple-500 ring-2 ring-purple-500 bg-purple-500/10 backdrop-blur-sm transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <CardHeader>
                          <CardTitle>Premium</CardTitle>
                          <p className="text-gray-300">The Collaboration & Pro Suite</p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <p className="text-5xl font-bold">$10<span className="text-xl font-normal text-gray-400">/month</span></p>
                          <ul className="space-y-3">
                            <li className="flex items-center"><Heart className="h-5 w-5 mr-2 text-pink-500" />Unlimited Items per Board</li>
                            <li className="flex items-center"><Heart className="h-5 w-5 mr-2 text-pink-500" />Real-time Collaboration</li>
                            <li className="flex items-center"><Heart className="h-5 w-5 mr-2 text-pink-500" />High-Quality Exports</li>
                            <li className="flex items-center"><Heart className="h-5 w-5 mr-2 text-pink-500" />Priority Support</li>
                          </ul>
                          <Button className="w-full bg-white text-black transition-colors duration-300 hover:bg-gray-200">Upgrade to Premium</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </section>
            </div>
        </div>
      </main>

      {/* Footer */}
      <PublicFooter />
    </div>
  );
}