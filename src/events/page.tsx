"use client";
import { useEffect, useState } from "react";
import { getEvents } from "../../utils/api";
import Link from "next/link";

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(setEvents).catch(() => alert("Failed to load events"));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Upcoming Events</h1>
      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event: any) => (
            <li key={event.id} className="p-4 border rounded-md shadow-md">
              <h2 className="text-xl font-semibold">{event.name}</h2>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-gray-500">{event.location}</p>
              <p className="text-gray-500">{new Date(event.start_time).toLocaleString()}</p>
              <Link href={`/events/${event.id}`} className="text-blue-500 underline">
                View Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
