"use client";

import { Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CategoryType, UpdateCategoryType } from "@/types";
import { UpdateCategorySchema } from "@/schemas";
import { updateCategory } from "@/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type UpdateButtonProps = {
  category: CategoryType;
};

export default function UpdateButton({ category }: UpdateButtonProps) {
  const form = useForm<UpdateCategoryType>({
    resolver: zodResolver(UpdateCategorySchema),
    values: {
      name: category.name,
    },
  });

  const [open, setOpen] = useState(false);

  async function handleSubmit(data: UpdateCategoryType) {
    const response = await updateCategory(category.idCategory, data);
    if (!response?.error) {
      setOpen(false);
      toast.success("Categoría actualizada correctamente");
    } else {
      toast.error(response.error.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-x-1" onClick={() => form.reset()}>
          <Pen className="w-5 h-5" />
          <span className="font-semibold">Editar</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Categoría</DialogTitle>
          <DialogDescription>
            Realice cambios en la categoría aquí. Haga clic en guardar cuando
            haya terminado.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la categoría</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. Arroz, Aceite..." {...field} />
                    </FormControl>
                    <FormDescription>nombre de la categoría.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <Button
                onClick={() => setOpen(false)}
                variant="outline"
                type="button"
              >
                Cancelar
              </Button>
              <Button disabled={form.formState.isSubmitting} type="submit">
                Guardar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
