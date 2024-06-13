"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <h2 className="text-center">Algo salió mal!</h2>
      <Button onClick={() => reset()}>Intentar otra vez</Button>
    </div>
  );
}
