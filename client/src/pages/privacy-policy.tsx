import PublicFooter from "@/components/public-footer";
import PublicHeader from "@/components/public-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail } from "lucide-react";

const mainSections = [
  {
    title: "1. Introduction to Our Privacy Policy",
    content: `This Privacy Policy details how Nexus ("we," "us," or "our") collects, uses, and discloses information from and about you when you use our Service. We are committed to protecting your personal data and respecting your privacy. This policy applies to all visitors, users, and others who access the Service.`
  },
  {
    title: "2. Information We Collect",
    content: `We collect several types of information, including: (a) Personal Data you provide directly, such as your name, email address, and payment details upon registration; (b) Usage Data collected automatically, like your IP address, browser type, and interaction with our Service; and (c) Content you create on our platform.`
  },
  {
    title: "3. How We Use Your Information",
    content: `Your information is used to provide, maintain, and improve our Service. This includes personalizing your experience, processing transactions, sending essential communications, providing customer support, and for internal research and development to enhance our platform's features and security.`
  },
  {
    title: "4. Cookies and Tracking Technologies",
    content: `We use cookies, web beacons, and similar tracking technologies to monitor activity on our Service and store certain information. These technologies help us analyze our web traffic, personalize content, and serve targeted advertisements. You have the option to manage your cookie preferences through your browser settings.`
  },
  {
    title: "5. Data Security Measures",
    content: `We implement a variety of robust security measures, including encryption and authentication tools, to maintain the safety of your personal information. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security as no method of transmission over the Internet is 100% secure.`
  },
  {
    title: "6. Your Data Protection Rights",
    content: `Depending on your jurisdiction, you may have rights to access, correct, update, or request deletion of your personal information. You can typically manage your account information directly within your profile settings or by contacting us. We are committed to facilitating these rights for all our users.`
  }
];

const additionalSections = [
    {
        title: "Legal Basis for Processing",
        content: `We process your personal data on several legal bases: (a) with your explicit consent for one or more specific purposes; (b) when it is necessary for the performance of a contract to which you are a party; (c) for compliance with a legal obligation to which we are subject; and (d) for the purposes of our legitimate interests, except where such interests are overridden by your fundamental rights and freedoms.`
    },
    {
        title: "Data Retention Policy",
        content: `We will retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.`
    },
    {
        title: "Third-Party Disclosure",
        content: `We do not sell, trade, or otherwise transfer your Personally Identifiable Information to outside parties unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.`
    },
    {
        title: "Children's Privacy",
        content: `Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.`
    },
    {
        title: "International Data Transfers",
        content: `Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.`
    }
];

const contactSection = {
    title: "Questions About This Policy?",
    content: `If you have any questions or concerns regarding this Privacy Policy or our data practices, please do not hesitate to get in touch. You can reach our privacy team directly by sending an email to privacy@nexus.com.`
};

const PrivacyPolicyPage = () => {
  return (
    <div className="flex flex-col min-h-screen text-white bg-black font-body">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-24 lg:py-32">
          <h1 className="text-6xl lg:text-7xl font-bold tracking-tighter font-heading">
            Privacy Policy
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
                    Detailed Privacy Information
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

export default PrivacyPolicyPage;