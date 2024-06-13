"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateCustomerType } from "@/types";
import { CreateCustomerSchema } from "@/schemas";
import { createCustomer } from "@/actions";
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
import { CreateButtonMobile } from "@/components/admin/create-button-mobile";

export default function AddButtonMobile() {
  const form = useForm<CreateCustomerType>({
    resolver: zodResolver(CreateCustomerSchema),
    values: {
      name: "",
      address: "",
      phone: "",
      ruc: "",
    },
  });
  const [open, setOpen] = useState(false);

  async function handleSubmit(data: CreateCustomerType) {
    const response = await createCustomer(data);
    if (!response?.error) {
      setOpen(false);
      toast.success("Cliente creado correctamente");
      form.reset();
    } else {
      toast.error(response.error.message);
    }
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <CreateButtonMobile onClick={() => form.reset()} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Agregar Cliente</DrawerTitle>
          <DrawerDescription>
            Agregue un cliente aquí. Haga clic en agregar cuando haya terminado.
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
                    <FormLabel>Nombre del cliente</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej. Representaciones Nataly S.A.C..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>nombre del cliente</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ruc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ruc del cliente</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. 20600007522..." {...field} />
                    </FormControl>
                    <FormDescription>ruc del cliente</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección del cliente</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej. Avenida Isabel la Católica..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>dirección del cliente</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de contacto del cliente</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. 4746922..." {...field} />
                    </FormControl>
                    <FormDescription>
                      número de contacto del cliente
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Button disabled={form.formState.isSubmitting} type="submit">
                Agregar
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
