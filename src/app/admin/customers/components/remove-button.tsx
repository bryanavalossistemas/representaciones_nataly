"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CustomerType } from "@/types";
import { deleteCustomer } from "@/actions";
import { DeleteButton } from "@/components/admin/delete-button";
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
  idCustomer: CustomerType["idCustomer"];
};

export default function RemoveButton({ idCustomer }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);

  async function handleClick() {
    const response = await deleteCustomer(idCustomer);
    if (!response?.error) {
      setOpen(false);
      toast.success("Cliente eliminado correctamente");
    } else {
      toast.error(response.error.message);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DeleteButton />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente el
            cliente y eliminará sus datos de nuestros servidores.
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
