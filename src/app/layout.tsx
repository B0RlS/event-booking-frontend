"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { NotificationProvider } from "@/context/NotificationContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();

  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <NotificationProvider>
          <nav className="p-4 bg-white shadow">
            <div className="max-w-4xl mx-auto flex justify-between">
              <Link href="/" className="text-lg font-bold">
                Event Booking
              </Link>
              <div>
                {user ? (
                  <>
                    <Link href="/my-tickets" className="mr-4">
                      My Tickets
                    </Link>
                    {user.role === "manager" && (
                      <>
                        <Link href="/dashboard" className="mr-4">
                          Dashboard
                        </Link>
                        <Link href="/dashboard/events/new" className="mr-4">
                          New Event
                        </Link>
                      </>
                    )}
                    <button onClick={logout} className="text-red-500">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="mr-4">
                      Login
                    </Link>
                    <Link href="/register" className="mr-4">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
          <main className="max-w-4xl mx-auto p-6">{children}</main>
        </NotificationProvider>
      </body>
    </html>
  );
}
