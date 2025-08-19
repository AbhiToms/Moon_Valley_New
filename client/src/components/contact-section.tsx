import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: MapPin,
    title: "Location",
    content: ["Moon Valley Resort", "Mountain Highway, Valley Point", "Himachal Pradesh 171001, India"]
  },
  {
    icon: Phone,
    title: "Phone",
    content: ["+91 98765 43210", "Toll-free: 1800 123 4567"]
  },
  {
    icon: Mail,
    title: "Email",
    content: ["reservations@moonvalleyresort.com", "info@moonvalleyresort.com"]
  },
  {
    icon: Clock,
    title: "Hours",
    content: ["24/7 Front Desk Service", "Reservations: 9:00 AM - 10:00 PM"]
  }
];

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Youtube, href: "#" }
];

export default function ContactSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contacts", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you within 24 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: (error) => {
      toast({
        title: "Send Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-forest mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to plan your mountain escape? Contact our friendly team for personalized assistance and special offers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="space-y-8">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className="flex items-start">
                    <div className="text-forest text-2xl mr-4 mt-1">
                      <IconComponent size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-forest mb-2">{info.title}</h3>
                      {info.content.map((line, lineIndex) => (
                        <p key={lineIndex} className="text-gray-700">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-semibold text-forest mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a 
                      key={index}
                      href={social.href} 
                      className="w-12 h-12 bg-forest text-white rounded-full flex items-center justify-center hover:bg-forest/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <IconComponent size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-sage/10 border-0 rounded-2xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-playfair font-bold text-forest mb-6">Send us a Message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-forest">Name</FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              className="bg-white border-gray-300 focus:border-forest focus:ring-forest"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-forest">Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              {...field}
                              className="bg-white border-gray-300 focus:border-forest focus:ring-forest"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-forest">Subject</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            className="bg-white border-gray-300 focus:border-forest focus:ring-forest"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-forest">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field}
                            placeholder="Tell us how we can help you..."
                            className="bg-white border-gray-300 focus:border-forest focus:ring-forest"
                            rows={5}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    disabled={contactMutation.isPending}
                    className="w-full bg-forest text-white hover:bg-forest/90 rounded-lg transition-all duration-300 hover:shadow-lg font-semibold"
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
