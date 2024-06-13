"use client";

import { cn, formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useSaleStore } from "@/store";
import { ProductImageItem } from "./product-image";
import { Input } from "@/components/ui/input";
import { DetailSaleType } from "@/types";
import { ChangeEvent, useMemo, useState } from "react";

type DetailSaleItemProps = {
  detailSale: DetailSaleType;
};

export default function DetailSaleItem({ detailSale }: DetailSaleItemProps) {
  const [quantity, setQuantity] = useState<number | string>(
    detailSale.quantity
  );
  useMemo(() => setQuantity(detailSale.quantity), [detailSale]);

  const [price, setPrice] = useState<number | string>(detailSale.price);
  useMemo(() => setPrice(detailSale.price), [detailSale]);

  const addQuantityDetailSale = useSaleStore(
    (state) => state.addQuantityDetailSale
  );
  const subtractQuantityDetailSale = useSaleStore(
    (state) => state.subtractQuantityDetailSale
  );
  const changeQuantityDetailSale = useSaleStore(
    (state) => state.changeQuantityDetailSale
  );

  const changePriceDetailSale = useSaleStore(
    (state) => state.changePriceDetailSale
  );

  const removeDetailSale = useSaleStore((state) => state.removeDetailSale);

  function handleChangePrice(e: ChangeEvent<HTMLInputElement>) {
    const priceAsNumber = Number(e.target.value);
    setPrice(priceAsNumber);
    if (priceAsNumber <= 0) {
      setPrice("");
      return;
    } else {
      changePriceDetailSale(detailSale.idDetailSale, priceAsNumber);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const quantityAsNumber = Number(e.target.value);
    setQuantity(quantityAsNumber);
    if (quantityAsNumber <= 0) {
      setQuantity("");
      return;
    } else {
      changeQuantityDetailSale(detailSale.idDetailSale, quantityAsNumber);
    }
  }

  return (
    <li key={detailSale.idDetailSale}>
      <Card className="p-2">
        <div className="flex items-center justify-between gap-x-5">
          <div className="flex items-center gap-x-4">
            <Card className="max-w-32 max-h-28 flex items-center justify-center">
              <ProductImageItem
                src={detailSale.product.productImages[0]?.url}
                width={500}
                height={500}
                alt={detailSale.product.name}
                className="h-28 object-contain"
              />
            </Card>
            <h5 className="text-sm font-bold line-clamp-2">
              {detailSale.product.name}
            </h5>
          </div>
          <div className="flex flex-col gap-y-1 items-center justify-center">
            <div className="bg-primary w-10 h-10 flex items-center justify-center rounded-full text-sm">
              <span className="text-primary-foreground font-medium">
                x{detailSale.quantity}
              </span>
            </div>
            <Button
              className="p-0 bg-red-500 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-red-400"
              onClick={() => removeDetailSale(detailSale.idDetailSale)}
            >
              <Trash className="w-5 h-5 text-primary-foreground" />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between gap-x-5 mt-3">
          <div className="flex items-center gap-x-1">
            <span className="font-medium">Precio Unitario: S/ </span>
            <Input
              type="number"
              className="w-20 font-medium text-center"
              min={1}
              value={price}
              onChange={handleChangePrice}
            />
          </div>
          <span className="text-muted-foreground">
            {formatCurrency(detailSale.price)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-x-5 mt-3">
          <div className="flex items-center gap-x-1">
            <Button
              type="button"
              disabled={detailSale.quantity <= 1}
              className={cn(
                "rounded-full w-8 h-8 p-0 bg-primary/15 hover:scale-110 transition-transform"
              )}
              onClick={() =>
                subtractQuantityDetailSale(detailSale.idDetailSale)
              }
            >
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Minus className="w-6 h-6" />
              </div>
            </Button>
            <Input
              type="number"
              className="w-20 font-medium text-center"
              min={1}
              value={quantity}
              onChange={handleChange}
            />
            <Button
              type="button"
              className={cn(
                "rounded-full w-8 h-8 p-0 bg-primary/15 hover:scale-110 transition-transform"
              )}
              onClick={() => addQuantityDetailSale(detailSale.idDetailSale)}
            >
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </div>
            </Button>
          </div>
          <span className="text-lg font-bold">
            {formatCurrency(detailSale.price * detailSale.quantity)}
          </span>
        </div>
      </Card>
    </li>
  );
}
