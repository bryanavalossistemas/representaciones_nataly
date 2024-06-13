"use client";

import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { usePurchaseStore } from "@/store";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateDetailPurchaseSchema } from "@/schemas";
import {
  DetailPurchaseType,
  ProductType,
  UpdateDetailPurchaseType,
} from "@/types";
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
  detailPurchase: DetailPurchaseType;
};

export default function UpdateButtonDetail({
  products,
  detailPurchase,
}: AddButtonDetailProps) {
  const form = useForm<UpdateDetailPurchaseType>({
    resolver: zodResolver(UpdateDetailPurchaseSchema),
    values: {
      idDetailPurchase: detailPurchase.idDetailPurchase,
      cost: detailPurchase.cost,
      quantity: detailPurchase.quantity,
      product: {
        idCategory: detailPurchase.product.idCategory,
        idProduct: detailPurchase.product.idProduct,
        name: detailPurchase.product.name,
        price: detailPurchase.product.price,
        stock: detailPurchase.product.stock,
      },
    },
  });

  const updateDetailPurchase = usePurchaseStore(
    (state) => state.updateDetailPurchase
  );

  const [open, setOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  function handleSubmit(data: UpdateDetailPurchaseType) {
    updateDetailPurchase({
      ...data,
      idDetailPurchase: detailPurchase.idDetailPurchase,
    });
    setOpen(false);
    toast.success("Detalle de compra actualizado correctamente");
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-x-1" onClick={() => form.reset()}>
          <Pen className="w-5 h-5" />
          <span className="capitalize">editar</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Detalle de Compra</DialogTitle>
          <DialogDescription>
            Realice cambios en el detalle de la compra aquí. Haga clic en
            guardar cuando haya terminado.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="px-4 pb-2 space-y-4 max-h-[40vh] overflow-auto"
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
                    <Popover open={openPopover} onOpenChange={setOpenPopover}>
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
                            {field.value
                              ? products.find(
                                  (product) =>
                                    product.idProduct === field.value.idProduct
                                )?.name
                              : "Seleccionar producto"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-screen">
                        <Command>
                          <CommandInput
                            placeholder="Buscar producto..."
                            className="h-9"
                          />
                          <CommandEmpty>
                            No se encontró ningún producto
                          </CommandEmpty>
                          <CommandGroup className="overflow-auto h-40">
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
      </DialogContent>
    </Dialog>
  );
}
