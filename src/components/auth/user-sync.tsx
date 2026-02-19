"use client";

import { useEffect } from "react";

export function UserSync() {
  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/users", {
          method: "GET",
          cache: "no-store",
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("[UserSync] /api/users failed:", res.status, text);
        }
      } catch (e) {
        console.error("[UserSync] network error:", e);
      }
    };

    run();
  }, []);

  return null;
}