"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CreateCategoryType } from "@/types";
import { CreateCategorySchema } from "@/schemas";
import { createCategory } from "@/actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AddButton() {
  const form = useForm<CreateCategoryType>({
    resolver: zodResolver(CreateCategorySchema),
    values: {
      name: "",
    },
  });
  const [open, setOpen] = useState(false);

  async function handleSubmit(data: CreateCategoryType) {
    const response = await createCategory(data);
    if (!response?.error) {
      setOpen(false);
      toast.success("Categoría creada correctamente");
      form.reset();
    } else {
      toast.error(response.error.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-x-1" onClick={() => form.reset()}>
          <PlusCircle className="h-5 w-5" />
          <span className="font-semibold">Agregar Categoría</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar categoría</DialogTitle>
          <DialogDescription>
            Agregue una categoría aquí. Haga clic en guardar cuando haya
            terminado.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
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
