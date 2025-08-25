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
    content: ["Moon Valley - A Tropical Hut", "Palakkayam Thattu, Alakode", "Kannur 670571, Kerala, India"]
  },
  {
    icon: Phone,
    title: "Phone",
    content: ["+91 9446986882", "24/7 Booking Available"]
  },
  {
    icon: Mail,
    title: "Email",
    content: ["info@moonvalleyresort.com", "bookings@moonvalleyresort.com"]
  },
  {
    icon: Clock,
    title: "Hours",
    content: ["24 Hours Open", "Best visiting: 6-7:30 AM or 5-6:30 PM"]
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
    <section id="contact" className="py-20 bg-white dark:bg-bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block bg-primary/10 dark:bg-tropical/20 rounded-full px-6 py-2 mb-6">
            <span className="text-primary dark:text-tropical font-semibold text-sm">CONTACT</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-poppins font-bold text-primary dark:text-text-primary mb-6">
            Get In <span className="text-tropical">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-white/80 max-w-3xl mx-auto leading-relaxed">
            Ready to plan your mountain escape? Contact our friendly team for personalized assistance and special offers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div>
            <Card className="bg-surface dark:bg-bg-primary rounded-2xl card-shadow border-0 dark:border dark:border-mist/20">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <div key={index} className="flex items-start">
                        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mr-4 mt-1">
                          <IconComponent size={22} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-primary dark:text-text-primary mb-1">{info.title}</h3>
                          {info.content.map((line, lineIndex) => (
                            <p key={lineIndex} className="text-gray-700 dark:text-text-secondary">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-10">
                  <h3 className="text-lg font-semibold text-primary dark:text-text-primary mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon;
                      return (
                        <a 
                          key={index}
                          href={social.href}
                          className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary/40"
                          aria-label="Follow us"
                        >
                          <IconComponent size={20} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-sage/10 dark:bg-bg-primary border-0 dark:border dark:border-mist/20 rounded-2xl card-shadow">
            <CardContent className="p-8">
              <h3 className="text-2xl font-poppins font-bold text-primary dark:text-text-primary mb-6">Send us a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary dark:text-text-primary">Name</FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              className="bg-white dark:bg-bg-secondary border-gray-300 dark:border-mist/30 focus:border-primary dark:focus:border-tropical focus:ring-primary dark:focus:ring-tropical dark:text-text-primary"
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
                          <FormLabel className="text-primary dark:text-text-primary">Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              {...field}
                              className="bg-white dark:bg-bg-secondary border-gray-300 dark:border-mist/30 focus:border-primary dark:focus:border-tropical focus:ring-primary dark:focus:ring-tropical dark:text-text-primary"
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
                        <FormLabel className="text-primary dark:text-text-primary">Subject</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            className="bg-white dark:bg-bg-secondary border-gray-300 dark:border-mist/30 focus:border-primary dark:focus:border-tropical focus:ring-primary dark:focus:ring-tropical dark:text-text-primary"
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
                        <FormLabel className="text-primary dark:text-text-primary">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field}
                            placeholder="Tell us how we can help you..."
                            className="bg-white dark:bg-bg-secondary border-gray-300 dark:border-mist/30 focus:border-primary dark:focus:border-tropical focus:ring-primary dark:focus:ring-tropical dark:text-text-primary dark:placeholder:text-text-secondary"
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
                    className="w-full bg-gradient-to-r from-primary to-tropical text-white hover:opacity-90 rounded-lg transition-all duration-300 hover:shadow-lg font-semibold"
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
