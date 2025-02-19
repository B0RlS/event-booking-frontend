// app/dashboard/tickets/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/utils/api";

interface Ticket {
  id: number;
  event_id: number;
  event_name: string;
  user_email: string;
  price: string;
  status: string;
}

export default function DashboardTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTickets() {
      try {
        const response = await api.get("/manager/events/tickets");
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setError("Failed to load tickets");
      } finally {
        setLoading(false);
      }
    }
    loadTickets();
  }, []);

  if (loading) return <p>Loading tickets...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Booked Tickets</h1>
      {tickets.length > 0 ? (
        <ul className="space-y-4">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="p-4 bg-white shadow rounded">
              <p>
                <strong>Event:</strong>{" "}
                <Link href={`/events/${ticket.event_id}`} className="text-blue-500 hover:underline">
                  {ticket.event_name}
                </Link>
              </p>
              <p>
                <strong>User:</strong> {ticket.user_email}
              </p>
              <p>
                <strong>Price:</strong> {ticket.price}
              </p>
              <p>
                <strong>Status:</strong> {ticket.status}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No booked tickets available.</p>
      )}
    </div>
  );
}
