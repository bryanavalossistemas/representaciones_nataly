"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CategoryType } from "@/types";
import { deleteCategory } from "@/actions";
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
  idCategory: CategoryType["idCategory"];
};

export default function DeleteButton({ idCategory }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);

  async function handleClick() {
    const response = await deleteCategory(idCategory);
    if (!response?.error) {
      setOpen(false);
      toast.success("Categoría eliminada correctamente");
    } else {
      toast.error(response.error.message);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div>
          <Button className="sm:hidden" size="icon">
            <Trash />
            <span className="sr-only">eliminar categoría</span>
          </Button>
          <Button className="hidden sm:flex sm:gap-x-1 sm:items-center">
            <Trash className="w-5 h-5" />
            <span className="font-semibold">Eliminar</span>
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
          <AlertDialogDescription className="text-justify">
            Esta acción no se puede deshacer. Esto eliminará permanentemente la
            categoría y eliminará sus datos de nuestros servidores.
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
