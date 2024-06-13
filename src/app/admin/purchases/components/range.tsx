"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Range() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const fechaPas = new Date();
  const fecha = new Date();
  fechaPas.setDate(1);
  const [start, setStart] = useState(fechaPas.toLocaleDateString("en-CA"));
  const [end, setEnd] = useState(fecha.toLocaleDateString("en-CA"));

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.set("dateStart", start);
    params.set("dateEnd", end);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-x-2">
      <Input
        className="px-1 block w-32"
        type="date"
        value={start}
        onChange={(e) => {
          setStart(e.target.value);
        }}
      />

      <Input
        className="px-1 block w-32"
        type="date"
        value={end}
        onChange={(e) => {
          setEnd(e.target.value);
        }}
      />
      <div className="sm:hidden">
        <Button size="icon" onClick={handleFilter}>
          <Calendar className="w-5 h-5" />
        </Button>
      </div>
      <div className="hidden sm:block">
        <Button className="gap-x-2" onClick={handleFilter}>
          <Calendar className="w-5 h-5" />
          <span>Filtrar por fecha</span>
        </Button>
      </div>
    </div>
  );
}
