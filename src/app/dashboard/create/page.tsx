// app/dashboard/create/page.tsx
"use client";

import { useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

export default function CreateEvent() {
  const router = useRouter();
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    location: "",
    start_time: "",
    end_time: "",
    total_tickets: 0,
    ticket_price_cents: 0,
    currency: "USD",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/manager/events", eventData);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Event Name" value={eventData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Description" value={eventData.description} onChange={handleChange} required className="w-full p-2 border rounded"></textarea>
        <input type="text" name="location" placeholder="Location" value={eventData.location} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="datetime-local" name="start_time" value={eventData.start_time} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="datetime-local" name="end_time" value={eventData.end_time} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="number" name="total_tickets" placeholder="Total Tickets" value={eventData.total_tickets} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="number" name="ticket_price_cents" placeholder="Ticket Price (in cents)" value={eventData.ticket_price_cents} onChange={handleChange} required className="w-full p-2 border rounded" />
        <select name="currency" value={eventData.currency} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Event</button>
      </form>
    </div>
  );
}
