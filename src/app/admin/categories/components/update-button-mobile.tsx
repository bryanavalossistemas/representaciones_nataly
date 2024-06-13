"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateCategory } from "@/actions";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Pen } from "lucide-react";
import { CategoryType, UpdateCategoryType } from "@/types";
import { UpdateCategorySchema } from "@/schemas";
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

type UpdateButtonProps = {
  category: CategoryType;
};

export default function UpdateButtonMobile({ category }: UpdateButtonProps) {
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
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="icon" onClick={() => form.reset()}>
          <Pen />
          <span className="hidden sm:block capitalize">editar categoría</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Editar Categoría</DrawerTitle>
          <DrawerDescription>
            Realice cambios en la categoría aquí. Haga clic en guardar cuando
            haya terminado.
          </DrawerDescription>
        </DrawerHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="px-4 pb-2 space-y-4 max-h-[40vh] overflow-auto"
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
