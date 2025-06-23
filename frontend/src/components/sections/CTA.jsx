import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function CTA({ setCurrentPage }) {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.message || "Failed to send message.");
      }
    } catch (error) {
      toast.error("Server error. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-green-100 to-blue-100">
      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold mb-6 text-gray-900">Ready to Transform Your Waste Management?</h2>
        <p className="text-lg text-gray-700 mb-8">Join us in creating sustainable, net-zero waste communities through innovative technology.</p>
      </motion.div>

      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} className="max-w-7xl mx-auto px-6 py-16 bg-white rounded-2xl shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-gray-700 mb-6">Have questions? We're here to help.</p>

            <ContactInfo icon={<MapPin />} title="Our Office" detail="123 Eco Street, Green City, 12345" />
            <ContactInfo icon={<Phone />} title="Phone" detail="+1 (555) 123-4567" />
            <ContactInfo icon={<Mail />} title="Email" detail="contact@ecowaste.com" />
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-xl shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your Name" />
              <FormInput type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Your Email" />
              <FormInput type="text" name="subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} placeholder="Subject" />
              <FormTextarea name="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Your Message" />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full flex justify-center items-center gap-2 px-6 py-3 rounded-lg font-semibold transition shadow-lg ${
                  loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
                }`}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// Reusable Contact Info Component
const ContactInfo = ({ icon, title, detail }) => (
  <div className="flex items-start space-x-4">
    <span className="w-6 h-6 text-green-600 mt-1">{icon}</span>
    <div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-700">{detail}</p>
    </div>
  </div>
);

// Reusable Form Input Component
const FormInput = ({ type, name, value, onChange, placeholder }) => (
  <motion.input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    className="block w-full rounded-lg border border-gray-300 shadow-md focus:border-green-500 focus:ring-green-500 p-3 transition focus:shadow-lg"
    placeholder={placeholder}
    required
    whileFocus={{ scale: 1.02 }}
  />
);

// Reusable Textarea Component
const FormTextarea = ({ name, value, onChange, placeholder }) => (
  <motion.textarea
    name={name}
    rows="4"
    value={value}
    onChange={onChange}
    className="block w-full rounded-lg border border-gray-300 shadow-md focus:border-green-500 focus:ring-green-500 p-3 transition focus:shadow-lg"
    placeholder={placeholder}
    required
    whileFocus={{ scale: 1.02 }}
  />
);

export default CTA;
