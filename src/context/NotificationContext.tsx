// src/context/NotificationContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

interface NotificationContextType {
  message: string | null;
  showMessage: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <NotificationContext.Provider value={{ message, showMessage }}>
      <div className="relative">
        {message && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded">
            {message}
          </div>
        )}
        {children}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
