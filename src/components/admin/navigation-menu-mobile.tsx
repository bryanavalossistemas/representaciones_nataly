"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Package2 } from "lucide-react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

export default function NavigationMenuMobile({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn("shrink-0", className)}
          {...props}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col gap-y-6">
          <Link href="#" className="flex items-center gap-2 text-lg">
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <nav className="flex flex-col gap-y-6 text-muted-foreground">
            <Link
              className={cn(
                "text-lg font-semibold",
                pathname.startsWith("/admin/dashboard") && "text-foreground"
              )}
              href="/admin/dashboard"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger
                  className={cn(
                    (pathname.startsWith("/admin/products") ||
                      pathname.startsWith("/admin/categories")) &&
                      "text-foreground"
                  )}
                >
                  Inventario
                </AccordionTrigger>
                <AccordionContent>
                  <Link
                    className={cn(
                      pathname.startsWith("/admin/products") &&
                        "text-foreground"
                    )}
                    href="/admin/products"
                    onClick={() => setOpen(false)}
                  >
                    Productos
                  </Link>
                  <Link
                    className={cn(
                      pathname.startsWith("/admin/categories") &&
                        "text-foreground"
                    )}
                    href="/admin/categories"
                    onClick={() => setOpen(false)}
                  >
                    Categorías
                  </Link>
                  <Link
                    className={cn(
                      pathname.startsWith("/admin/purchases") &&
                        "text-foreground"
                    )}
                    href="/admin/purchases"
                    onClick={() => setOpen(false)}
                  >
                    Compras
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Link
              className={cn(
                "text-lg font-semibold",
                pathname.startsWith("/admin/customers") && "text-foreground"
              )}
              href="/admin/customers"
              onClick={() => setOpen(false)}
            >
              Clientes
            </Link>
            <Link
              className={cn(
                "text-lg font-semibold",
                pathname.startsWith("/admin/sales") && "text-foreground"
              )}
              href="/admin/sales"
              onClick={() => setOpen(false)}
            >
              Ventas
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
