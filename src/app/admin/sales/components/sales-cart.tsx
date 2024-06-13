"use client";

import { cn, formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckIcon, ShoppingCart } from "lucide-react";
import { useMemo, useState } from "react";
import { useSaleStore } from "@/store";
import DetailSaleItem from "./detail-sale-item";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CustomerType } from "@/types";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { createSale } from "@/actions";
import AddButton from "./add-button";

type SalesCartProps = {
  customers: CustomerType[];
};

export default function SalesCart({ customers }: SalesCartProps) {
  const [showCart, setShowCart] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const selectedCustomer = useSaleStore((state) => state.customer);
  const setCustomer = useSaleStore((state) => state.setCustomer);
  const detailsSale = useSaleStore((state) => state.detailsSale);
  const clearSaleStore = useSaleStore((state) => state.clearSaleStore);

  const total = useMemo(
    () =>
      detailsSale.reduce(
        (total, detailSale) => total + detailSale.price * detailSale.quantity,
        0
      ),
    [detailsSale]
  );

  const subtotal = useMemo(() => total / 1.18, [detailsSale]);

  const tax = useMemo(() => subtotal * 0.18, [detailsSale]);

  async function handleClick() {
    if (detailsSale.length === 0) {
      toast.error("Debe agregar a lo menos un detalle de venta");
      return;
    }
    if (selectedCustomer.idCustomer <= 0) {
      toast.error("Debe seleccionar un cliente");
      return;
    }
    const response = await createSale(detailsSale, selectedCustomer);
    if (!response?.error) {
      clearSaleStore();
      toast.success("Venta creada correctamente");
    } else {
      toast.error(response.error.message);
    }
  }

  return (
    <>
      <div
        className={cn(
          "fixed sm:static right-0 flex flex-col h-full z-50 w-[90%] transition-all sm:w-full",
          showCart ? "top-0 delay-300" : "-top-full"
        )}
      >
        <Card className="flex flex-col gap-y-2 h-full py-2 pl-2 bg-background rounded-none sm:rounded-md">
          <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "justify-between mr-2 overflow-hidden",
                  selectedCustomer.idCustomer === 0 && "text-muted-foreground"
                )}
              >
                {selectedCustomer.idCustomer !== 0
                  ? customers.find(
                      (customer) =>
                        customer.idCustomer === selectedCustomer.idCustomer
                    )?.name
                  : "Seleccionar cliente"}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Buscar cliente..." className="h-9" />
                <CommandEmpty>No se encontró ningún cliente</CommandEmpty>
                <CommandGroup className="overflow-auto h-[136px]">
                  {customers.map((customer) => (
                    <CommandItem
                      key={customer.idCustomer}
                      onSelect={() => {
                        setCustomer(customer);
                        setOpenPopover(false);
                      }}
                    >
                      {customer.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          customer.idCustomer === selectedCustomer.idCustomer
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <ul className="overflow-y-auto flex flex-col gap-y-2 pr-2">
            {detailsSale.map((detailSale) => (
              <DetailSaleItem
                key={detailSale.idDetailSale}
                detailSale={detailSale}
              />
            ))}
          </ul>
          <div className="flex flex-col gap-y-2 pr-2 mt-auto">
            <ul className="flex flex-col gap-y-2">
              <li className="flex items-center justify-between">
                <p className="text-muted-foreground">Subtotal</p>
                <h3 className="font-bold">{formatCurrency(subtotal)}</h3>
              </li>
              <li className="flex items-center justify-between">
                <p className="text-muted-foreground">IGV (18%)</p>
                <h3 className="font-bold">{formatCurrency(tax)}</h3>
              </li>
              <li className="flex items-center justify-between">
                <p className="text-muted-foreground">Total</p>
                <h3 className="font-bold">{formatCurrency(total)}</h3>
              </li>
            </ul>
            <AddButton />
          </div>
        </Card>
      </div>
      <button
        type="button"
        onClick={() => setShowCart(true)}
        className="sm:hidden fixed bottom-0 right-0 w-10 h-10 bg-primary text-primary-foreground text-xl rounded-tl-sm z-30 flex items-center justify-center"
      >
        <ShoppingCart className="w-6 h-6" />
      </button>
      <div
        role="button"
        onClick={() => setShowCart(false)}
        className={cn(
          "fixed z-40 xl:hidden transition-all",
          showCart
            ? "w-full h-full right-0 top-0 backdrop-blur-sm"
            : "w-0 h-0 left-0 bottom-0 delay-300"
        )}
      />
    </>
  );
}
