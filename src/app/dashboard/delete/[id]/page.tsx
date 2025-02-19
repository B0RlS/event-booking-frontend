// app/dashboard/delete/[id]/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api, { fetchEventById } from "@/utils/api";

export default function DeleteEvent() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [eventData, setEventData] = useState<{ name: string } | null>(null);

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

  const handleDelete = async () => {
    try {
      await api.delete(`/manager/events/${id}`);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Delete Event</h1>
      {eventData ? (
        <>
          <p>Are you sure you want to delete the event "{eventData.name}"?</p>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-700"
          >
            Confirm Delete
          </button>
          <button
            onClick={() => router.back()}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </>
      ) : (
        <p>Loading event...</p>
      )}
    </div>
  );
}
