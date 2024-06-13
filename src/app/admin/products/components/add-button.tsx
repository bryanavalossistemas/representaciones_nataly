"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { CategoryType, CreateProductType } from "@/types";
import { CreateProductSchema } from "@/schemas";
import { createProduct } from "@/actions";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type AddButtonProps = {
  categories: CategoryType[];
};

export default function AddButton({ categories }: AddButtonProps) {
  const form = useForm<CreateProductType>({
    resolver: zodResolver(CreateProductSchema),
    values: {
      name: "",
      price: 0,
      idCategory: 0,
    },
  });
  const [open, setOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [fileList, setFileList] = useState<FileList | null>(null);

  async function handleSubmit(data: CreateProductType) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append("idCategory", data.idCategory.toString());
    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        formData.append("images", fileList[i]);
      }
    }
    const response = await createProduct(formData);
    if (!response?.error) {
      setOpen(false);
      toast.success("Producto creado correctamente");
      form.reset();
      setFileList(null);
    } else {
      toast.error(response.error.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="gap-x-1"
          onClick={() => {
            form.reset();
            setFileList(null);
          }}
        >
          <PlusCircle className="h-5 w-5" />
          <span className="whitespace-nowrap">Agregar Producto</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar producto</DialogTitle>
          <DialogDescription>
            Agregue una producto aquí. Haga clic en guardar cuando haya
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
                              {field.value
                                ? categories.find(
                                    (category) =>
                                      category.idCategory === field.value
                                  )?.name
                                : "Seleccionar categoría"}
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
                            <CommandGroup className="overflow-auto h-[232px]">
                              {categories.map((category) => (
                                <CommandItem
                                  key={category.idCategory}
                                  defaultValue={category.idCategory}
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
