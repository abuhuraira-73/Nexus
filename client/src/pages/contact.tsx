import PublicHeader from "@/components/public-header";
import PublicFooter from "@/components/public-footer";
import { ContactForm } from "@/components/contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail } from 'lucide-react';

const faqs = [
  {
    question: "Is there a free trial for Premium features?",
    answer: "Not at this time, but our Free plan is incredibly generous and includes all core drawing and content tools. You can use it for as long as you like. We believe in providing substantial value upfront so you can experience Nexus fully before considering an upgrade."
  },
  {
    question: "Is my data secure with Nexus?",
    answer: "Yes, absolutely. Data security is our top priority. All data is encrypted in transit and at rest using industry-standard protocols. We adhere to strict privacy guidelines to ensure your information is protected. Our upcoming Premium plan will also feature advanced security controls and Single Sign-On (SSO) capabilities for enhanced organizational security."
  },
  {
    question: "Can I export my boards?",
    answer: "Yes! All users can export their boards as image files (PNG/JPG). Our Premium plan unlocks high-quality, watermark-free exports perfect for presentations, client deliverables, and professional use. You'll have full control over the resolution and format."
  },
  {
    question: "How does real-time collaboration work?",
    answer: "Real-time collaboration is a core feature of Nexus Premium. Once you invite a team member to a board, you can both edit simultaneously, see each other's cursors moving across the canvas, and communicate instantly. Changes are synchronized in milliseconds, ensuring everyone is always working on the latest version. This feature is designed to make brainstorming and project coordination seamless, no matter where your team is located."
  },
  {
    question: "What kind of support can I expect?",
    answer: "All Nexus users have access to our comprehensive online help center and community forums. Premium users receive priority email support, ensuring faster response times and dedicated assistance for any issues or questions they might have. We're committed to helping you make the most of Nexus."
  }
];

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen text-white bg-black">
      {/* Header */}
      <PublicHeader />

      <main className="flex-1">
        <div className="px-8 sm:px-12 lg:px-16">
          <section className="text-center py-20 lg:py-28 bg-black">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter font-heading">Get in Touch</h1>
              <p className="max-w-[700px] mx-auto text-gray-400 md:text-xl mt-6">
                Have a question, a sales inquiry, or some feedback? We'd love to hear from you.
              </p>
          </section>
        </div>

        {/* Main Content Section: Form & Info (Gradient BG, Full Width) */}
        <div className="px-8 sm:px-12 lg:px-16">
          <div className="bg-gradient-custom bg-cover bg-center rounded-2xl">
            <div className="container mx-auto px-4 py-20 lg:py-28">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left Column: Contact Form */}
                <Card className="bg-gray-900/50 backdrop-blur-sm border-none">
                  <CardHeader>
                    <CardTitle className="text-2xl">Send us a message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ContactForm />
                  </CardContent>
                </Card>

                {/* Right Column: Contact Info & Response Details */}
                <div className="space-y-8">
                  <h3 className="text-2xl font-semibold">How We Respond</h3>
                  <p className="text-gray-300">
                    We're committed to providing timely and helpful responses. For general inquiries and support, we aim to get back to you within 24-48 hours. For sales-related questions, our team will reach out within one business day.
                  </p>
                  <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-4 flex items-center"><Mail className="mr-3 h-6 w-6" /> Email Us Directly</h3>
                    <p className="text-gray-400 mb-2">For any support or general questions, please email us directly.</p>
                    <a href="mailto:support@nexus.com" className="text-lg text-purple-400 hover:underline">support@nexus.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section (Below, Full Width) */}
        <div className="py-20 lg:py-28 mt-16">
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-center mb-12 font-heading">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full container mx-auto px-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}