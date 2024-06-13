"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { deletePurchase } from "@/actions";
import { useState } from "react";
import { toast } from "sonner";
import { PurchaseType } from "@/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type DeleteButtonProps = {
  idPurchase: PurchaseType["idPurchase"];
};

export default function DeleteButton({ idPurchase }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);

  async function handleClick() {
    const response = await deletePurchase(idPurchase);
    if (!response?.error) {
      setOpen(false);
      toast.success("Compra eliminada correctamente");
    } else {
      toast.error(response.error.message);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="px-2 sm:px-4 sm:gap-x-1">
          <Trash className="w-5 h-5" />
          <span className="hidden sm:block">Eliminar</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
          <AlertDialogDescription className="text-justify">
            Esta acción no se puede deshacer. Esto eliminará permanentemente la
            compra y eliminará sus datos de nuestros servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
