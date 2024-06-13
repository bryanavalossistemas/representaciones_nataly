"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CustomerType, UpdateCustomerType } from "@/types";
import { UpdateCustomerSchema } from "@/schemas";
import { updateCustomer } from "@/actions";
import { UpdateButtonMobile } from "@/components/admin/update-button-mobile";

type UpdateButtonProps = {
  customer: CustomerType;
};

export default function EditButtonMobile({ customer }: UpdateButtonProps) {
  const form = useForm<UpdateCustomerType>({
    resolver: zodResolver(UpdateCustomerSchema),
    values: {
      name: customer.name,
      ruc: customer.ruc,
      address: customer.address,
      phone: customer.phone,
    },
  });
  const [open, setOpen] = useState(false);

  async function handleSubmit(data: UpdateCustomerType) {
    const response = await updateCustomer(customer.idCustomer, data);
    if (!response?.error) {
      setOpen(false);
      toast.success("Cliente actualizado correctamente");
    } else {
      toast.error(response.error.message);
    }
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <UpdateButtonMobile onClick={() => form.reset()} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Editar Cliente</DrawerTitle>
          <DrawerDescription>
            Realice cambios del cliente aquí. Haga clic en guardar cuando haya
            terminado.
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
