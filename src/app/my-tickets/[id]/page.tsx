// src/app/my-tickets/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/utils/api";
import { useNotification } from "@/context/NotificationContext";

interface Ticket {
  id: number;
  event_id: number;
  price: string;
  status: string;
  booked_at: string | null;
  cancelled_at: string | null;
}

export default function TicketPage() {
  const { id } = useParams();
  const router = useRouter();
  const { showMessage } = useNotification();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTicket() {
      try {
        const response = await api.get(`/tickets/${id}`);
        setTicket(response.data);
      } catch (error) {
        console.error("Error fetching ticket:", error);
        setError("Failed to load ticket details");
      } finally {
        setLoading(false);
      }
    }
    fetchTicket();
  }, [id]);

  const handleCancel = async () => {
    try {
      await api.delete(`/tickets/${id}`);
      showMessage("Ticket successfully cancelled.");
      router.push("/my-tickets");
    } catch (error) {
      console.error("Error cancelling ticket:", error);
      setError("Failed to cancel ticket");
    }
  };

  if (loading) return <p>Loading ticket details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold">Ticket Details</h1>
      <p>
        <strong>Price:</strong> {ticket?.price}
      </p>
      <p>
        <strong>Status:</strong> {ticket?.status}
      </p>
      {ticket?.booked_at && (
        <p>
          <strong>Booked At:</strong> {new Date(ticket.booked_at).toLocaleString()}
        </p>
      )}
      {ticket?.cancelled_at && (
        <p>
          <strong>Cancelled At:</strong> {new Date(ticket.cancelled_at).toLocaleString()}
        </p>
      )}
      {ticket?.status === "booked" && (
        <button
          onClick={handleCancel}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cancel Ticket
        </button>
      )}
    </div>
  );
}
