// app/dashboard/edit/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api, { fetchEventById } from "@/utils/api";

export default function EditEvent() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
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

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await fetchEventById(id);
        setEventData(data);
      } catch (error) {
        console.error("Error loading event:", error);
      }
    }
    loadEvent();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.patch(`/manager/events/${id}`, eventData);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={eventData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          name="description"
          placeholder="Event Description"
          value={eventData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={eventData.location}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="datetime-local"
          name="start_time"
          value={eventData.start_time}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="datetime-local"
          name="end_time"
          value={eventData.end_time}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="total_tickets"
          placeholder="Total Tickets"
          value={eventData.total_tickets}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="ticket_price_cents"
          placeholder="Price (in cents)"
          value={eventData.ticket_price_cents}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <select
          name="currency"
          value={eventData.currency}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
