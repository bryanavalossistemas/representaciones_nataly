"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CreateCustomerType } from "@/types";
import { CreateCustomerSchema } from "@/schemas";
import { createCustomer } from "@/actions";
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
import { CreateButton } from "@/components/admin/create-button";

export default function AddButton() {
  const form = useForm<CreateCustomerType>({
    resolver: zodResolver(CreateCustomerSchema),
    defaultValues: {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CreateButton onClick={() => form.reset()} />
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Agregar Cliente</DialogTitle>
          <DialogDescription>
            Agregue un cliente aquí. Haga clic en agregar cuando haya terminado.
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
                Agregar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
