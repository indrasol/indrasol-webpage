import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { API_ENDPOINTS } from "../../config";
import { bootstrapChat } from "../../services/chatService";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export const CallFormOverlay: React.FC<Props> = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({ 
    name: "", 
    phone: "", 
    date: "", 
    time: "",
    tz: "America/Chicago" // default timezone
  });
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);

  // Resolve user ID once overlay mounts
  const [userId, setUserId] = useState<string>("");

  // Phone validation (E.164) → starts with +, 8-15 digits
  const PHONE_REGEX = /^\+\d{8,15}$/;
  const [phoneError, setPhoneError] = useState<string>("");

  useEffect(() => {
    bootstrapChat()
      .then(({ userId }) => setUserId(userId))
      .catch((err) => console.error("bootstrapChat error", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "phone") {
      // live validation
      setPhoneError(PHONE_REGEX.test(value.trim()) ? "" : "Enter valid phone incl. country code e.g. +15551234567");
    }
    
    // If date is changed, we might need to clear the time if it's no longer valid
    if (name === 'date') {
      const newForm = { ...form, [name]: value };
      
      // Check if current selected time is still available for the new date
      const newTimeSlots = generateTimeSlotsForDate(value);
      const isCurrentTimeStillValid = newTimeSlots.some(slot => slot.value === form.time);
      
      if (!isCurrentTimeStillValid) {
        newForm.time = ''; // Clear time if it's no longer valid
      }
      
      setForm(newForm);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const isPhoneValid = PHONE_REGEX.test(form.phone.trim());
  const isFormValid = form.name.trim() && isPhoneValid && form.date && form.time;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loadingRef.current || !isFormValid) return;
    
    loadingRef.current = true;
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.CALL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          name: form.name.trim(),
          phone_number: form.phone.trim(),
          date: form.date,
          time: form.time,
          tz: form.tz
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Call scheduling failed");
      }
      
      onSuccess();
      onClose();
    } catch (e) {
      console.error("Call scheduling error:", e);
      alert("Something went wrong – please try again.");
    } finally {
      setLoading(false);
      loadingRef.current = false;
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

  const timeSlots = generateTimeSlotsForDate(form.date);

  // Common US timezones
  const timezones = [
    { value: "America/New_York", display: "Eastern Time (EST/EDT)" },
    { value: "America/Chicago", display: "Central Time (CST/CDT)" },
    { value: "America/Denver", display: "Mountain Time (MST/MDT)" },
    { value: "America/Los_Angeles", display: "Pacific Time (PST/PDT)" },
    { value: "America/Phoenix", display: "Arizona Time (MST)" },
    { value: "America/Anchorage", display: "Alaska Time (AKST/AKDT)" },
    { value: "Pacific/Honolulu", display: "Hawaii Time (HST)" },
  ];

  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <form
        onSubmit={submit}
        className="relative w-full max-w-md bg-white/90 rounded-3xl p-8 border border-blue-100 shadow-2xl animate-scaleUp"
      >
        <button 
          type="button"
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 hover:rotate-90 transition-transform duration-300"
        >
          <X className="w-5 h-5 text-blue-600" />
        </button>

        <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
          Schedule a Call 📞
        </h3>

        <div className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
          />

          <input
            name="phone"
            type="tel"
            placeholder="Phone Number (e.g. +15551234567)"
            required
            value={form.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
              phoneError ? "border-red-400 focus:ring-red-300" : "border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            }`}
          />
          {phoneError && (
            <p className="text-red-500 text-xs mt-1">{phoneError}</p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                name="date"
                type="date"
                required
                min={minDate}
                value={form.date}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <select
                name="time"
                required
                value={form.time}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
              >
                <option value="">Select time</option>
                {timeSlots.map(slot => (
                  <option key={slot.value} value={slot.value}>
                    {slot.display}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
            <select
              name="tz"
              required
              value={form.tz}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
            >
              {timezones.map(tz => (
                <option key={tz.value} value={tz.value}>
                  {tz.display}
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
            💡 Our team will call you at the scheduled time in your selected timezone.
          </div>

          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r
                       from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700
                       disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed
                       transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg
                       flex items-center justify-center"
          >
            {loading ? (
              <span className="relative flex items-center">
                <span className="w-5 h-5 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                <span className="ml-3">Scheduling…</span>
              </span>
            ) : (
              "Schedule Call"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}; 