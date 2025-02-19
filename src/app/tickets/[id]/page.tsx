"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTicketById, cancelTicket } from "../../../utils/api";
import { useAuth } from "../../../context/AuthContext";

export default function TicketDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [ticket, setTicket] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTicketById(id)
      .then(setTicket)
      .catch(() => setError("Failed to load ticket details"));
  }, [id]);

  const handleCancel = async () => {
    try {
      await cancelTicket(id);
      alert("Ticket cancelled successfully.");
      router.push("/my-tickets");
    } catch (err) {
      setError("Failed to cancel ticket.");
    }
  };

  if (!ticket) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold">Ticket Details</h1>
      <p className="text-gray-600">Event ID: {ticket.event_id}</p>
      <p className="text-gray-500">Status: {ticket.status}</p>
      {ticket.status === "booked" && (
        <button
          onClick={handleCancel}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Cancel Ticket
        </button>
      )}
    </div>
  );
}
