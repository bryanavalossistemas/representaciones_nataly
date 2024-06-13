"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { createCategory } from "@/actions";
import { CreateCategoryType } from "@/types";
import { CreateCategorySchema } from "@/schemas";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function AddButtonMobile() {
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
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-full" onClick={() => form.reset()}>
          <PlusCircle className="h-7 w-7" />
          <span className="sr-only">agregar categoría</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Agregar categoría</DrawerTitle>
          <DrawerDescription>
            Agregue una categoría aquí. Haga clic en guardar cuando haya
            terminado.
          </DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form
            className="px-4 pb-2 space-y-4 max-h-[40vh] overflow-auto"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
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
            <div className="flex flex-col gap-y-2">
              <Button disabled={form.formState.isSubmitting} type="submit">
                Guardar
              </Button>
              <Button
                onClick={() => setOpen(false)}
                variant="outline"
                type="button"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}