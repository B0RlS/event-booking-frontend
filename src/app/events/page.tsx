"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    api.get("/events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">All Events</h1>

        {events.length === 0 ? (
          <p className="text-center text-gray-500">No events available.</p>
        ) : (
          <div className="grid gap-4">
            {events.map((event) => (
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
