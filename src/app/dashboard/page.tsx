// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchEvents } from "@/utils/api";
import Link from "next/link";

export default function Dashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Events</h1>
      <Link href="/dashboard/create" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        + Create New Event
      </Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="p-4 border rounded">
              <h2 className="text-lg font-bold">{event.name}</h2>
              <p>{event.description}</p>
              <div className="mt-2">
                <Link href={`/dashboard/edit/${event.id}`} className="text-blue-500 mr-4">
                  Edit
                </Link>
                <button className="text-red-500">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
