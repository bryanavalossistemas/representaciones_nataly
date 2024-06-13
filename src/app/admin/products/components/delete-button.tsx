"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { deleteProduct } from "@/actions";
import { ProductType } from "@/types";
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
  idProduct: ProductType["idProduct"];
};

export default function DeleteButton({ idProduct }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);

  async function handleClick() {
    const response = await deleteProduct(idProduct);
    if (!response?.error) {
      setOpen(false);
      toast.success("Producto eliminado correctamente");
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
            Esta acción no se puede deshacer. Esto eliminará permanentemente el
            producto y eliminará sus datos de nuestros servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
