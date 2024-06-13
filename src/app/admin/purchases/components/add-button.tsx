"use client";

import { PlusCircle, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePurchaseStore } from "@/store";
import AddButtonDetail from "./add-button-detail";
import { toast } from "sonner";
import UpdateButtonDetail from "./update-button-detail";
import UpdateButtonDetailMobile from "./update-button-detail-mobile";
import AddButtonDetailMobile from "./add-button-detail-mobile";
import { createPurchase } from "@/actions";
import { ProductType } from "@/types";
import { formatCurrency } from "@/lib/utils";

export default function AddButton({ products }: { products: ProductType[] }) {
  const detailsPurchase = usePurchaseStore((state) => state.detailsPurchase);
  const clearDetailsPurchase = usePurchaseStore(
    (state) => state.clearDetailsPurchase
  );
  const removeDetailPurchase = usePurchaseStore(
    (state) => state.removeDetailPurchase
  );

  const [open, setOpen] = useState(false);

  async function handleSubmit() {
    if (detailsPurchase.length === 0) {
      alert("Debe agregar un detalle de compra");
      return;
    }
    const response = await createPurchase(detailsPurchase);
    if (!response?.error) {
      setOpen(false);
      toast.success("Compra creada correctamente");
    } else {
      toast.error(response.error.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="gap-x-1 w-full sm:w-auto"
          onClick={clearDetailsPurchase}
        >
          <PlusCircle className="h-5 w-5" />
          <span className="sr-only sm:not-sr-only whitespace-nowrap">
            agregar Compra
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[85%] sm:h-[75%] min-w-[75%] flex flex-col px-0 sm:px-6">
        <div className="flex-1 flex flex-col gap-y-2 overflow-auto">
          <div className="flex gap-x-4 justify-between items-center flex-col sm:flex-row gap-y-2">
            <div className="flex flex-col gap-y-1 justify-center">
              <h1 className="text-xl font-bold">Agregar Compra</h1>
              <p className="text-sm text-muted-foreground hidden sm:block">
                Agregue una compra aquí. Haga clic en agregar cuando haya
                terminado.
              </p>
            </div>
            <div className="hidden sm:block">
              <AddButtonDetail products={products} />
            </div>
            <div className="sm:hidden w-full">
              <AddButtonDetailMobile products={products} />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead className="text-center">Cantidad</TableHead>
                <TableHead className="text-right">Costo</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {detailsPurchase.map((detailPurchase) => (
                <TableRow key={detailPurchase.idDetailPurchase}>
                  <TableCell className="font-medium capitalize">
                    {detailPurchase.product.name}
                  </TableCell>
                  <TableCell className="font-medium capitalize text-center">
                    {detailPurchase.quantity}
                  </TableCell>
                  <TableCell className="font-bold capitalize text-right">
                    {formatCurrency(detailPurchase.cost)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-x-1 justify-end">
                      <div className="hidden sm:block">
                        <UpdateButtonDetail
                          products={products}
                          detailPurchase={detailPurchase}
                        />
                      </div>
                      <div className="sm:hidden">
                        <UpdateButtonDetailMobile
                          products={products}
                          detailPurchase={detailPurchase}
                        />
                      </div>
                      <Button
                        className="px-2 sm:px-4 sm:gap-x-1"
                        onClick={() => {
                          removeDetailPurchase(detailPurchase.idDetailPurchase);
                          toast.success("Detalle eliminado correctamente");
                        }}
                      >
                        <Trash className="w-5 h-5" />
                        <span className="hidden sm:block">Eliminar</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <div className="flex flex-col gap-y-2 sm:flex-row-reverse sm:gap-x-2">
            <Button onClick={handleSubmit}>Agregar</Button>
            <Button onClick={() => setOpen(false)} variant="outline">
              Cancelar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
