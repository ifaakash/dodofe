"use client";
import { useEffect, useState } from "react";
import Home from "./home/page";

export default function App() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Home />
    </>
  );
}
