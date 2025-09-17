import PublicFooter from "@/components/public-footer";
import PublicHeader from "@/components/public-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail } from "lucide-react";

const mainSections = [
  {
    title: "1. Introduction",
    content: `Welcome to Nexus. These Terms of Service ("Terms") represent a binding legal agreement between you and Nexus ("we", "us", or "our"), governing your access to and use of our website, applications, and the services provided therein (collectively, the "Service"). By creating an account, or by accessing or using our Service in any manner, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.`
  },
  {
    title: "2. User Accounts",
    content: `To access the full features of the Service, you must register and create an account. You are wholly responsible for maintaining the confidentiality of your account credentials, including your password, and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account or any other breach of security. We will not be liable for any loss or damage arising from your failure to comply with this section.`
  },
  {
    title: "3. Service Plans & Payments",
    content: `Nexus offers both a "Free Plan" and a "Premium Plan." The Free Plan has limitations on features and usage, while the Premium Plan provides access to advanced functionalities. All fees for the Premium Plan are due in advance and are non-refundable except as required by law. We reserve the right to change our subscription fees upon 30 days' notice, which will be posted on our website or sent to you via email.`
  },
  {
    title: "4. Acceptable Use Policy",
    content: `You agree to use the Service only for lawful purposes. You shall not use the Service to create, upload, transmit, or share any content that is illegal, harmful, abusive, defamatory, or otherwise objectionable. Prohibited activities also include attempting to gain unauthorized access to our systems, interfering with the Service's network or security features, or using the service to conduct any fraudulent activity.`
  },
  {
    title: "5. User-Generated Content",
    content: `You retain all intellectual property rights to the content you create, upload, or store on Nexus ("User Content"). By using the Service, you grant Nexus a limited, worldwide, non-exclusive, royalty-free license to host, display, reproduce, and distribute your User Content solely for the purpose of operating, providing, and improving the Service. We do not claim any ownership rights over your creations.`
  },
  {
    title: "6. Termination of Service",
    content: `We may terminate or suspend your access to the Service at our sole discretion, without prior notice or liability, for any reason whatsoever, including a breach of these Terms. Upon termination, your right to use the Service will immediately cease. You may also terminate your account at any time through your account settings. All provisions of the Terms which by their nature should survive termination shall survive, including ownership provisions and liability limitations.`
  },
  {
    title: "7. Disclaimers and Limitation of Liability",
    content: `The Service is provided on an "AS IS" and "AS AVAILABLE" basis, without any warranties of any kind, express or implied. Nexus does not warrant that the service will be uninterrupted, secure, or error-free. In no event shall Nexus, its directors, or employees be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the Service.`
  },
  {
    title: "8. Changes to Terms",
    content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. Your continued use of the Service after those revisions become effective constitutes your acceptance of the new Terms.`
  }
];

const additionalSections = [
    {
        title: "Intellectual Property Rights",
        content: `All rights, title, and interest in and to the Service itself, including our website, branding, logos, and software, are and will remain the exclusive property of Nexus and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries. Nothing in the Terms gives you a right to use the Nexus name or any of the Nexus trademarks, logos, domain names, and other distinctive brand features.`
    },
    {
        title: "Governing Law",
        content: `These Terms shall be governed and construed in accordance with the laws of the Republic of India, without regard to its conflict of law provisions. You agree to submit to the personal and exclusive jurisdiction of the courts located in Bangalore, India to resolve any dispute or claim arising from these Terms.`
    },
    {
        title: "Dispute Resolution",
        content: `For any dispute you have with Nexus, you agree to first contact us and attempt to resolve the dispute with us informally. If we are not able to resolve the dispute informally, we each agree to resolve any claim, dispute, or controversy arising out of or in connection with these Terms by binding arbitration in Bangalore, India.`
    }
];

const contactSection = {
    title: "Contact Information",
    content: `For any questions, concerns, or comments about these Terms of Service, please do not hesitate to contact us. You can reach our legal team by sending an email to legal@nexus.com. We will make our best effort to respond to your inquiry in a timely manner.`
};

const TermsOfServicePage = () => {
  return (
    <div className="flex flex-col min-h-screen text-white bg-black font-body">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-24 lg:py-32">
          <h1 className="text-6xl lg:text-7xl font-bold tracking-tighter font-heading">
            Terms of Service
          </h1>
          <p className="max-w-[700px] text-gray-300 md:text-xl mt-6">
            Last updated: September 17, 2025
          </p>
        </section>

        {/* Main Content */}
        <div className="px-4 sm:px-8 lg:px-12 py-16">
          <div className="bg-gradient-custom bg-cover bg-center rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mainSections.map((section, i) => (
                <Card key={i} className="bg-gray-900/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="font-metropolis-bold text-2xl">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed">{section.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Terms Section */}
        <section className="py-20 lg:py-28 bg-black">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-6xl lg:text-7xl font-bold tracking-tighter font-heading text-center mb-16">
                    Additional Legal Information
                </h1>
                <Accordion type="single" collapsible className="w-full">
                    {additionalSections.map((section, i) => (
                        <AccordionItem key={i} value={`item-${i}`}>
                            <AccordionTrigger className="text-2xl font-metropolis-bold text-left">{section.title}</AccordionTrigger>
                            <AccordionContent className="text-gray-300 text-base leading-relaxed pt-4">
                                {section.content}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>

        {/* Contact Section */}
        <div className="px-4 sm:px-8 lg:px-12 py-16">
            <div className="bg-gradient-custom bg-cover bg-center rounded-2xl p-8 lg:p-12">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <Mail className="h-12 w-12 mx-auto text-purple-400 mb-6" />
                    <h1 className="text-6xl lg:text-7xl font-bold tracking-tighter font-heading">
                        {contactSection.title}
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto mt-6">
                        {contactSection.content}
                    </p>
                </div>
            </div>
        </div>

      </main>

      <PublicFooter />
    </div>
  );
};

export default TermsOfServicePage;
