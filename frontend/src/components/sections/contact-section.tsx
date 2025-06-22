import React, { useState } from "react";
import { Mail, Phone, Send, MapPin, ArrowRight, Calendar, MessageSquare, Users, Clock } from "lucide-react";
import { API_ENDPOINTS } from '../../config';

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const [callFormState, setCallFormState] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    tz: "America/Chicago"
  });

  const [formStatus, setFormStatus] = useState<null | "submitting" | "success" | "error">(null);
  const [contactMethod, setContactMethod] = useState<"message" | "call" | null>("message"); // Default to "message"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleCallFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // If date is changed, we might need to clear the time if it's no longer valid
    if (name === 'date') {
      const newForm = { ...callFormState, [name]: value };
      
      // Check if current selected time is still available for the new date
      const newTimeSlots = generateTimeSlotsForDate(value);
      const isCurrentTimeStillValid = newTimeSlots.some(slot => slot.value === callFormState.time);
      
      if (!isCurrentTimeStillValid) {
        newForm.time = ''; // Clear time if it's no longer valid
      }
      
      setCallFormState(newForm);
    } else {
      setCallFormState({ ...callFormState, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      // Generate a proper UUID for the contact form
      const user_id = crypto.randomUUID();
      
      // Email / Teams Contact
      const res = await fetch(API_ENDPOINTS.CONTACT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formState,
          user_id
        }),
      });
  
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      console.log(data);
  
      setFormStatus("success");
      setFormState({ name: "", email: "", company: "", message: "" });
    } catch (err) {
      console.error(err);
      setFormStatus("error");
    }
  };

  const handleCallSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      const user_id = crypto.randomUUID();
      
      const response = await fetch(API_ENDPOINTS.CALL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          name: callFormState.name.trim(),
          phone_number: callFormState.phone.trim(),
          date: callFormState.date,
          time: callFormState.time,
          tz: callFormState.tz
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Call scheduling failed");
      }
      
      setFormStatus("success");
      setCallFormState({ name: "", phone: "", date: "", time: "", tz: "America/Chicago" });
    } catch (e) {
      console.error("Call scheduling error:", e);
      setFormStatus("error");
    }
  };

  // Get today's date as minimum selectable date (in local timezone)
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const minDate = `${year}-${month}-${day}`;

  // Generate all available time slots (24 hours, 30-minute intervals)
  const generateAllTimeSlots = () => {
    const allTimeSlots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        allTimeSlots.push({ value: timeString, display: displayTime });
      }
    }
    return allTimeSlots;
  };

  // Generate time slots for a specific date, filtering past times if it's today
  const generateTimeSlotsForDate = (selectedDate: string) => {
    const allTimeSlots = generateAllTimeSlots();
    
    // If today is selected, filter out past times
    if (selectedDate === minDate) {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      // Filter out past times - show times that are at least 30 minutes from now
      const filteredSlots = allTimeSlots.filter(slot => {
        const [slotHour, slotMinute] = slot.value.split(':').map(Number);
        const slotTotalMinutes = slotHour * 60 + slotMinute;
        const currentTotalMinutes = currentHour * 60 + currentMinute;
        
        // Show slots that are at least 30 minutes ahead
        return slotTotalMinutes >= (currentTotalMinutes + 30);
      });
      
      return filteredSlots;
    }
    
    // For future dates, return all time slots
    return allTimeSlots;
  };

  const timeSlots = generateTimeSlotsForDate(callFormState.date);

  // Common US timezones
  const timezones = [
    { value: "America/New_York", display: "Eastern Time (EST/EDT)", short: "ET" },
    { value: "America/Chicago", display: "Central Time (CST/CDT)", short: "CT" },
    { value: "America/Denver", display: "Mountain Time (MST/MDT)", short: "MT" },
    { value: "America/Los_Angeles", display: "Pacific Time (PST/PDT)", short: "PT" },
    { value: "America/Phoenix", display: "Arizona Time (MST)", short: "AZ" },
    { value: "America/Anchorage", display: "Alaska Time (AKST/AKDT)", short: "AK" },
    { value: "Pacific/Honolulu", display: "Hawaii Time (HST)", short: "HI" },
  ];

  const isCallFormValid = callFormState.name.trim() && callFormState.phone.trim() && callFormState.date && callFormState.time;

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indrasol-gray/20 via-white to-blue-50/30"></div>

      {/* Animated decorative elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-indrasol-blue/10 to-indrasol-blue/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-indrasol-orange/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indrasol-blue/5 to-blue-500/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-indrasol-blue font-semibold mb-4 bg-gradient-to-r from-indrasol-blue/10 to-indrasol-blue/5 px-6 py-2 rounded-full border border-indrasol-blue/20">
            <Users className="h-4 w-4" />
            Contact Us
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gray-900">Let's Start a </span>
            <span className="bg-gradient-to-r from-indrasol-blue to-indrasol-blue bg-clip-text text-transparent">Conversation</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your business? Choose how you'd like to connect with our team of experts.
          </p>
        </div>

        {/* Contact Method Selector */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => setContactMethod("message")}
              className={`group relative p-8 rounded-3xl border-2 transition-all duration-300 transform hover:scale-105 ${
                contactMethod === "message" 
                  ? "border-indrasol-blue bg-gradient-to-br from-indrasol-blue/5 to-indrasol-blue/10 shadow-2xl" 
                  : "border-gray-200 bg-white hover:border-indrasol-blue/50 hover:shadow-xl"
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`p-4 rounded-2xl transition-all duration-300 ${
                  contactMethod === "message" 
                    ? "bg-gradient-to-r from-indrasol-blue to-indrasol-blue text-white" 
                    : "bg-indrasol-blue/10 text-indrasol-blue group-hover:bg-indrasol-blue/20"
                }`}>
                  <MessageSquare className="h-8 w-8" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Send a Message</h3>
                  <p className="text-gray-600">
                    Tell us about your project and we'll get back to you within 24 hours
                  </p>
                </div>
                <div className="flex items-center text-sm text-indrasol-blue font-medium">
                  <Clock className="h-4 w-4 mr-1" />
                  Response in 24 hours
                </div>
              </div>
            </button>

            <button
              onClick={() => setContactMethod("call")}
              className={`group relative p-8 rounded-3xl border-2 transition-all duration-300 transform hover:scale-105 ${
                contactMethod === "call" 
                  ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50 shadow-2xl" 
                  : "border-gray-200 bg-white hover:border-emerald-500/50 hover:shadow-xl"
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`p-4 rounded-2xl transition-all duration-300 ${
                  contactMethod === "call" 
                    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white" 
                    : "bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500/20"
                }`}>
                  <Calendar className="h-8 w-8" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Schedule a Call</h3>
                  <p className="text-gray-600">
                    Book a personalized consultation with our experts at your convenience
                  </p>
                </div>
                <div className="flex items-center text-sm text-emerald-600 font-medium">
                  <Phone className="h-4 w-4 mr-1" />
                  Direct expert consultation
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Info Section */}
          <div className="lg:col-span-5">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-gray-100 h-full relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indrasol-blue/10 to-transparent rounded-bl-full"></div>
              
              <div className="space-y-8 relative z-10">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                </div>

                <div className="flex items-start group hover:bg-gray-50 p-4 rounded-2xl transition-all duration-300">
                  <div className="p-3 bg-gradient-to-r from-indrasol-blue to-indrasol-blue rounded-2xl mr-4 shadow-lg">
                    <Mail className="h-6 w-6 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Email Us</h4>
                    <a href="mailto:sales@indrasol.com" className="text-indrasol-blue hover:text-indrasol-blue/80 transition-colors mt-1 block font-medium">
                      sales@indrasol.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start group hover:bg-gray-50 p-4 rounded-2xl transition-all duration-300">
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl mr-4 shadow-lg">
                    <Phone className="h-6 w-6 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Call Us</h4>
                    <a href="tel:+15107542001" className="text-indrasol-blue hover:text-indrasol-blue/80 transition-colors mt-1 block font-medium">
                      +1 (510) 754 2001
                    </a>
                  </div>
                </div>

                <div className="flex items-start group hover:bg-gray-50 p-4 rounded-2xl transition-all duration-300">
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mr-4 shadow-lg">
                    <MapPin className="h-6 w-6 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Headquarters</h4>
                    <p className="text-gray-700 mt-1 font-medium">
                      San Ramon, California, USA
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Connect With Us</h4>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.linkedin.com/company/indrasol"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-[#0077B5] text-white p-4 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 social-icon-linkedin"
                      aria-label="LinkedIn"
                    >
                      <svg className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12" fill="white" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href="https://x.com/theindrasol"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-black text-white p-4 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 social-icon-x"
                      aria-label="X (formerly Twitter)"
                    >
                      <svg className="h-6 w-6 transition-transform duration-300 group-hover:-rotate-12" fill="white" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="lg:col-span-7">
            {contactMethod === "call" ? (
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
                <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-gradient-to-l from-emerald-500/10 to-transparent rounded-full"></div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-6 relative z-10">Schedule Your Call</h3>

                {formStatus === "success" ? (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 text-center relative z-10">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-3">Call Scheduled!</h4>
                    <p className="text-lg text-gray-700 mb-6">Your call has been scheduled successfully. Our team will call you at the selected time.</p>
                    <button
                      onClick={() => setFormStatus(null)}
                      className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      Schedule another call
                    </button>
                  </div>
                ) : (
                  <form className="space-y-6 relative z-10" onSubmit={handleCallSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="call-name" className="block text-sm font-semibold text-gray-700">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="call-name"
                          name="name"
                          value={callFormState.name}
                          onChange={handleCallFormChange}
                          className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-gray-300"
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="call-phone" className="block text-sm font-semibold text-gray-700">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="call-phone"
                          name="phone"
                          value={callFormState.phone}
                          onChange={handleCallFormChange}
                          className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-gray-300"
                          required
                          placeholder="+1-555-123-4567"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="call-date" className="block text-sm font-semibold text-gray-700">
                          Date *
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            id="call-date"
                            name="date"
                            value={callFormState.date}
                            onChange={handleCallFormChange}
                            min={minDate}
                            className="modern-date-input w-full px-4 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300 hover:shadow-md appearance-none cursor-pointer text-gray-700 font-medium"
                            required
                          />
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <Calendar className="h-5 w-5 text-emerald-500" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="call-time" className="block text-sm font-semibold text-gray-700">
                          Time *
                        </label>
                        <div className="relative">
                          <select
                            id="call-time"
                            name="time"
                            value={callFormState.time}
                            onChange={handleCallFormChange}
                            className="modern-select w-full px-4 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300 hover:shadow-md appearance-none cursor-pointer pr-12 text-gray-700 font-medium"
                            required
                          >
                            <option value="" className="text-gray-500">Select your preferred time</option>
                            {timeSlots.map(slot => (
                              <option key={slot.value} value={slot.value} className="py-3 px-4 text-gray-700 hover:bg-emerald-50">
                                {slot.display}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <Clock className="h-5 w-5 text-emerald-500" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="call-timezone" className="block text-sm font-semibold text-gray-700">
                        Timezone *
                      </label>
                      <div className="relative">
                        <select
                          id="call-timezone"
                          name="tz"
                          value={callFormState.tz}
                          onChange={handleCallFormChange}
                          className="modern-select w-full px-4 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300 hover:shadow-md appearance-none cursor-pointer pr-12 text-gray-700 font-medium"
                          required
                        >
                          {timezones.map(tz => (
                            <option key={tz.value} value={tz.value} className="py-3 px-4 text-gray-700 hover:bg-emerald-50">
                              <span className="font-semibold text-emerald-600">{tz.short}</span> - {tz.display}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <MapPin className="h-5 w-5 text-emerald-500" />
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-2xl border border-emerald-200">
                      💡 Our team will call you at the scheduled time in your selected timezone.
                    </div>

                    <button
                      type="submit"
                      disabled={!isCallFormValid || formStatus === "submitting"}
                      className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center shadow-lg shadow-emerald-500/25 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Scheduling...
                        </>
                      ) : (
                        <>
                          <Calendar className="mr-3 h-6 w-6" strokeWidth={2} />
                          Schedule Call
                          <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            ) : contactMethod === "message" ? (
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
                <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-gradient-to-l from-indrasol-blue/10 to-transparent rounded-full"></div>

                <h3 className="text-3xl font-bold text-gray-900 mb-6 relative z-10">Send Us a Message</h3>

                {formStatus === "success" ? (
                  <div className="bg-gradient-to-r from-indrasol-blue/5 to-indrasol-blue/10 border border-indrasol-blue/20 rounded-2xl p-8 text-center relative z-10">
                    <div className="bg-gradient-to-r from-indrasol-blue to-indrasol-blue w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-3">Thank You!</h4>
                    <p className="text-lg text-gray-700 mb-6">Your message has been sent successfully. We'll get back to you within 24 hours.</p>
                    <button
                      onClick={() => setFormStatus(null)}
                      className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indrasol-blue focus:border-indrasol-blue transition-all duration-300 hover:border-gray-300"
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indrasol-blue focus:border-indrasol-blue transition-all duration-300 hover:border-gray-300"
                          required
                          placeholder="your.email@company.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="company" className="block text-sm font-semibold text-gray-700">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indrasol-blue focus:border-indrasol-blue transition-all duration-300 hover:border-gray-300"
                        placeholder="Your company name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indrasol-blue focus:border-indrasol-blue transition-all duration-300 hover:border-gray-300 resize-none"
                        required
                        placeholder="Tell us about your project, goals, or challenges..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full px-8 py-4 bg-gradient-to-r from-indrasol-blue to-indrasol-blue text-white rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center shadow-lg shadow-indrasol-blue/25 group"
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-3 h-6 w-6" strokeWidth={2} />
                          Send Message 
                          <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
                <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-gradient-to-l from-gray-400/10 to-transparent rounded-full"></div>
                
                <div className="text-center relative z-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mb-6">
                    <MessageSquare className="h-10 w-10 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">How would you like to connect?</h3>
                  <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                    Choose your preferred method of communication above to get started.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => setContactMethod("message")}
                      className="group bg-gradient-to-r from-indrasol-blue to-indrasol-blue text-white px-6 py-3 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                    >
                      <MessageSquare className="h-5 w-5 mr-2" strokeWidth={2} />
                      Send Message
                    </button>
                    <button
                      onClick={() => setContactMethod("call")}
                      className="group bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                    >
                      <Calendar className="h-5 w-5 mr-2" strokeWidth={2} />
                      Schedule Call
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Custom Styles */}
      <style>{`
        .social-icon-linkedin:hover {
          background: linear-gradient(135deg, #0077B5 0%, #005885 100%) !important;
          box-shadow: 0 20px 40px rgba(0, 119, 181, 0.3) !important;
        }
        
        .social-icon-x:hover {
          background: linear-gradient(135deg, #000000 0%, #333333 100%) !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3) !important;
        }
        
        /* Modern dropdown styling */
        .modern-select {
          background-image: none !important;
          background-size: 16px 16px;
          background-repeat: no-repeat;
          background-position: right 12px center;
        }
        
        .modern-select:focus {
          outline: none !important;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1), 0 4px 20px rgba(16, 185, 129, 0.15) !important;
          transform: translateY(-1px);
        }
        
        .modern-select:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .modern-date-input:focus {
          outline: none !important;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1), 0 4px 20px rgba(16, 185, 129, 0.15) !important;
          transform: translateY(-1px);
        }
        
        .modern-date-input:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        /* Enhanced date input styling */
        .modern-date-input::-webkit-calendar-picker-indicator {
          opacity: 0;
          position: absolute;
          right: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        
        /* Custom option styling for better visibility */
        .modern-select option {
          padding: 12px 16px !important;
          background-color: white;
          color: #374151;
          font-weight: 500;
        }
        
        .modern-select option:hover {
          background-color: #f0fdf4 !important;
          color: #059669 !important;
        }
        
        .modern-select option:checked {
          background-color: #10b981 !important;
          color: white !important;
        }
        
        /* Smooth transitions for all interactive elements */
        .modern-select,
        .modern-date-input {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
      `}</style>
    </section>
  );
}