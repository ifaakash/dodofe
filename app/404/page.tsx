"use client";
import React, { useEffect, useState } from 'react';

export const dynamic = "force-dynamic"; // ✅ Forces dynamic rendering

export default function ErrorComponent() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="mt-16 px-4 text-center">
      Error
    </div>
  );
}