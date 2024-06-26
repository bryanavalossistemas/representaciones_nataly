"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Pen } from "lucide-react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { ProductImageItem } from "./product-image";
import { UpdateProductSchema } from "@/schemas";
import { deleteProductImage, updateProduct } from "@/actions";
import {
  CategoryType,
  ProductImageType,
  ProductType,
  UpdateProductType,
} from "@/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
  product: ProductType & { productImages?: ProductImageType[] };
  categories: CategoryType[];
};

export default function UpdateButtonMobile({
  product,
  categories,
}: UpdateButtonProps) {
  const form = useForm<UpdateProductType>({
    resolver: zodResolver(UpdateProductSchema),
    values: {
      name: product.name,
      price: product.price,
      idCategory: product.idCategory,
    },
  });
  const [open, setOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [fileList, setFileList] = useState<FileList | null>(null);

  async function handleSubmit(data: UpdateProductType) {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append("idCategory", data.idCategory.toString());

    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        formData.append("images", fileList[i]);
      }
    }
    const response = await updateProduct(product.idProduct, formData);
    if (!response?.error) {
      setOpen(false);
      setFileList(null);
      toast.success("Producto actualizado correctamente");
    } else {
      toast.error(response.error.message);
    }
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          size="icon"
          onClick={() => {
            form.reset();
            setFileList(null);
          }}
        >
          <Pen className="w-5 h-5" />
          <span className="hidden sm:block">Editar</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Editar Producto</DrawerTitle>
          <DrawerDescription>
            Realice cambios en el producto aquí. Haga clic en guardar cuando
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
                    <FormLabel>Nombre del producto</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ej. Arroz faraon x 50Kg..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>nombre del producto</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio del producto</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ej. 120..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>precio del producto</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="idCategory"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel onClick={(e) => e.preventDefault()}>
                      Categoría
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
                              ? categories.find(
                                  (category) =>
                                    category.idCategory === field.value
                                )?.name
                              : "Seleccionar producto"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[526px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Buscar categoría..."
                            className="h-9"
                          />
                          <CommandEmpty>
                            No se encontró ningún producto
                          </CommandEmpty>
                          <CommandGroup className="overflow-auto h-80">
                            {categories.map((category) => (
                              <CommandItem
                                defaultValue={category.idCategory}
                                key={category.idCategory}
                                onSelect={() => {
                                  form.setValue(
                                    "idCategory",
                                    category.idCategory
                                  );
                                  setOpenPopover(false);
                                }}
                              >
                                {category.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    category.idCategory === field.value
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
                    <FormDescription>categoría del producto</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <div className="flex flex-col gap-y-2">
                  <FormLabel>Imágenes del producto</FormLabel>
                  <Input
                    type="file"
                    multiple
                    accept="image/png, image/jpeg, image/avif"
                    onChange={(e) => setFileList(e.target.files)}
                  />
                  <FormDescription>imágenes del producto</FormDescription>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {product.productImages?.map((image) => (
                    <div key={image.idProductImage}>
                      <div className="flex justify-center">
                        <ProductImageItem
                          alt={product.name ?? ""}
                          src={image.url}
                          width={500}
                          height={500}
                          className="rounded-t shadow-md"
                        />
                      </div>

                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() =>
                          deleteProductImage(image.idProductImage, image.url)
                        }
                        className="w-full rounded-b rounded-t-none"
                      >
                        Eliminar
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
              >
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
