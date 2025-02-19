"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getEventById, bookTickets } from "../../../utils/api";
import { useAuth } from "../../../context/AuthContext";

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [event, setEvent] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEventById(id)
      .then(setEvent)
      .catch(() => setError("Failed to load event details"));
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      setError("You must be logged in to book tickets.");
      return;
    }

    try {
      await bookTickets(id, quantity);
      alert("Tickets booked successfully!");
      router.push("/my-tickets");
    } catch (err) {
      setError("Failed to book tickets.");
    }
  };

  if (!event) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold">{event.name}</h1>
      <p className="text-gray-600">{event.description}</p>
      <p className="text-gray-500">{event.location}</p>
      <p className="text-gray-500">
        {new Date(event.start_time).toLocaleString()}
      </p>
      <p className="text-gray-500">
        Available Tickets: {event.available_tickets}
      </p>
      <p className="text-gray-500">
        Price: {event.ticket_price_cents / 100} {event.currency}
      </p>

      {user && (
        <div className="mt-4">
          <label className="block text-sm font-medium">Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            max={event.available_tickets}
            className="border rounded px-2 py-1 w-16"
          />
          <button
            onClick={handleBooking}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Book Tickets
          </button>
        </div>
      )}

      <a href="/events" className="text-blue-500 underline mt-4 block">
        Back to Events
      </a>
    </div>
  );
}
