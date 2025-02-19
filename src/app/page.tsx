// src/app/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchEvents } from "@/utils/api";

interface Event {
  id: number;
  name: string;
  description: string;
  location: string;
  start_time: string;
  end_time: string;
  tickets_available: number;
  price: string;
}

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Could not load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading events...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Upcoming Events</h1>

        {events.length === 0 ? (
          <p className="text-center text-gray-500">No events available.</p>
        ) : (
          <div className="grid gap-4">
            {events?.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="block bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold">{event.name}</h2>
                <p className="text-gray-600">{event.location}</p>
                <p className="text-sm text-gray-500">
                  {new Date(event.start_time).toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
