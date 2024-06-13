"use client";

import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { useSaleStore } from "@/store";
import { Plus } from "lucide-react";
import { ProductImageType, ProductType } from "@/types";
import { toast } from "sonner";

type AddDetailSaleProps = {
  product: ProductType & { productImages: ProductImageType[] };
};

export default function AddDetailSale({ product }: AddDetailSaleProps) {
  const addDetailSale = useSaleStore((state) => state.addDetailSale);

  return (
    <Button
      onClick={() => {
        addDetailSale({
          idDetailSale: uuidv4(),
          price: product.price,
          product: product,
          quantity: 1,
        });
        toast.success("Detalle de venta agregado correctamente");
      }}
      type="button"
      className="rounded-full w-14 h-14 p-0 bg-primary/15 hover:scale-110 transition-transform"
    >
      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
        <Plus className="w-8 h-8" />
      </div>
    </Button>
  );
}
