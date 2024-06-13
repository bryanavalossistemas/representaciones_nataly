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
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type AddButtonDetailProps = {
  products: ProductType[];
};

export default function AddButtonDetailMobile({
  products,
}: AddButtonDetailProps) {
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
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className="w-full flex items-center gap-x-2"
          onClick={() => form.reset()}
        >
          <span>Agregar Detalle</span>
          <PlusCircle className="w-5 h-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Agregar Detalle</DrawerTitle>
          <DrawerDescription>
            Agregue el detalle de la compra aquí. Haga clic en guardar cuando
            haya terminado.
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
                      <PopoverContent className="w-screen">
                        <Command>
                          <CommandInput
                            placeholder="Buscar producto..."
                            className="h-9"
                          />
                          <CommandEmpty>
                            No se encontró ningún producto
                          </CommandEmpty>
                          <CommandGroup className="overflow-auto h-[164px]">
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
