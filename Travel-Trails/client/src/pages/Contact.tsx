import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingForm } from "@/components/BookingForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="bg-primary pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-display font-bold mb-8">Contact Information</h2>
            <div className="space-y-8">
              {[
                { icon: MapPin, title: "Our Location", text: "123 Adventure Ave, Suite 456\nNew York, NY 10012" },
                { icon: Phone, title: "Phone Number", text: "+1 (555) 123-4567\n+1 (555) 987-6543" },
                { icon: Mail, title: "Email Address", text: "hello@wanderlust.com\nsupport@wanderlust.com" },
                { icon: Clock, title: "Office Hours", text: "Mon - Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 2:00 PM" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-muted-foreground whitespace-pre-line">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4">Find us on map</h3>
              <div className="h-64 bg-slate-200 rounded-2xl w-full overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596698663!2d-74.25986927941837!3d40.69714941328902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1656606363659!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <BookingForm />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
