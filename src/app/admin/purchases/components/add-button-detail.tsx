"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { usePurchaseStore } from "@/store";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { CreateDetailPurchaseType, ProductType } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateDetailPurchaseSchema } from "@/schemas";
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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type AddButtonDetailProps = {
  products: ProductType[];
};

export default function AddButtonDetail({ products }: AddButtonDetailProps) {
  const form = useForm<CreateDetailPurchaseType>({
    resolver: zodResolver(CreateDetailPurchaseSchema),
    values: {
      cost: 0,
      idDetailPurchase: "",
      quantity: 0,
      product: {
        idCategory: 0,
        idProduct: 0,
        name: "",
        price: 0,
        stock: 0,
      },
    },
  });

  const addPurchaseToPurchases = usePurchaseStore(
    (state) => state.addDetailPurchase
  );

  const [open, setOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  function handleSubmit(data: CreateDetailPurchaseType) {
    addPurchaseToPurchases({ ...data, idDetailPurchase: uuidv4() });
    setOpen(false);
    toast.success("Detalle de compra creado correctamente");
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogTrigger asChild>
        <Button className="gap-x-1 self-center" onClick={() => form.reset()}>
          <PlusCircle className="h-5 w-5" />
          <span className="whitespace-nowrap">Agregar Detalle</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Detalle de Compra</DialogTitle>
          <DialogDescription>
            Agregue el detalle de la compra aquí. Haga clic en guardar cuando
            haya terminado.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel onClick={(e) => e.preventDefault()}>
                      Producto
                    </FormLabel>
                    <Popover
                      open={openPopover}
                      onOpenChange={setOpenPopover}
                      modal
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value.idProduct !== 0
                              ? products.find(
                                  (product) =>
                                    product.idProduct === field.value.idProduct
                                )?.name
                              : "Seleccionar producto"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[462px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Buscar producto..."
                            className="h-9"
                          />
                          <CommandEmpty>
                            No se encontró ningún producto
                          </CommandEmpty>
                          <CommandGroup className="overflow-auto h-[266px]">
                            {products.map((product) => (
                              <CommandItem
                                key={product.idProduct}
                                onSelect={() => {
                                  form.setValue("product", product);
                                  setOpenPopover(false);
                                }}
                              >
                                {product.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    product.idProduct === field.value.idProduct
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>nombre del producto</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Costo del producto</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ej. 120..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>costo del producto</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidades del producto</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ej. 3, 4..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>unidades del producto</FormDescription>
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
