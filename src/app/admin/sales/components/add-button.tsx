"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { useSaleStore } from "@/store";
import { toast } from "sonner";
import { createSale } from "@/actions";
import SalePDF from "./sale-pdf";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Sale } from "@prisma/client";
import { CustomerType, DetailSaleType } from "@/types";

export default function AddButton() {
  const selectedCustomer = useSaleStore((state) => state.customer);
  const selectedDetailsSale = useSaleStore((state) => state.detailsSale);

  const clearSaleStore = useSaleStore((state) => state.clearSaleStore);
  const [sale, setSale] = useState<Sale>({
    createdAt: new Date(),
    idCustomer: 0,
    idSale: 0,
  });

  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<CustomerType>({
    address: "",
    idCustomer: 0,
    name: "",
    phone: "",
    ruc: "",
  });
  const [detailsSale, setdetailsSale] = useState<DetailSaleType[]>([]);

  async function handleClick() {
    if (selectedDetailsSale.length === 0) {
      toast.error("Debe agregar a lo menos un detalle de venta");
      return;
    }
    if (selectedCustomer.idCustomer <= 0) {
      toast.error("Debe seleccionar un cliente");
      return;
    }
    const response = await createSale(selectedDetailsSale, selectedCustomer);
    if (!response?.error) {
      setSale(response.success.message.sale);
      setCustomer(selectedCustomer);
      setdetailsSale(selectedDetailsSale);
      setOpen(true);
      clearSaleStore();
      toast.success("Venta creada correctamente");
    } else {
      toast.error(response.error.message);
    }
  }

  return (
    <>
      <Button
        className="h-12 transition-all text-base"
        type="button"
        onClick={handleClick}
      >
        Confirmar Venta
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-[85%] sm:h-[75%] min-w-[75%] flex flex-col px-0 sm:px-6">
          <PDFDownloadLink
            document={
              <SalePDF
                sale={sale}
                customer={customer}
                detailsSale={detailsSale}
              />
            }
            fileName="xd.pdf"
          >
            {({ loading, url, error, blob }) =>
              loading ? (
                <Button>Cargando ...</Button>
              ) : (
                <Button>Descargar ahora</Button>
              )
            }
          </PDFDownloadLink>
          <PDFViewer className="h-[1000px]">
            <SalePDF
              sale={sale}
              customer={customer}
              detailsSale={detailsSale}
            />
          </PDFViewer>
        </DialogContent>
      </Dialog>
    </>
  );
}
