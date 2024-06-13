import { CustomerType, DetailSaleType } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  customer: CustomerType;

  setCustomer: (customer: CustomerType) => void;

  detailsSale: DetailSaleType[];

  setDetailsSale: (detailsSale: DetailSaleType[]) => void;

  addDetailSale: (detailSale: DetailSaleType) => void;

  removeDetailSale: (idDetailSale: DetailSaleType["idDetailSale"]) => void;

  changeQuantityDetailSale: (
    idDetailSale: DetailSaleType["idDetailSale"],
    quantity: DetailSaleType["quantity"]
  ) => void;

  changePriceDetailSale: (
    idDetailSale: DetailSaleType["idDetailSale"],
    price: DetailSaleType["price"]
  ) => void;

  addQuantityDetailSale: (idDetailSale: DetailSaleType["idDetailSale"]) => void;

  subtractQuantityDetailSale: (
    idDetailSale: DetailSaleType["idDetailSale"]
  ) => void;

  clearSaleStore: () => void;
};

export const useSaleStore = create<State>()(
  persist(
    (set, get) => ({
      customer: { idCustomer: 0, address: "", name: "", phone: "", ruc: "" },

      setCustomer: (customer) => {
        set({ customer });
      },

      detailsSale: [],

      setDetailsSale: (detailsSale) => {
        set({ detailsSale: detailsSale });
      },

      addDetailSale: (detailSale) => {
        const { detailsSale } = get();
        const updatedDetailsSale = [...detailsSale, detailSale];

        set({ detailsSale: updatedDetailsSale });
      },

      removeDetailSale: (idDetailSale) => {
        const { detailsSale } = get();
        const updatedDetailsSale = detailsSale.filter(
          (detailSale) => detailSale.idDetailSale !== idDetailSale
        );

        set({ detailsSale: updatedDetailsSale });
      },

      addQuantityDetailSale: (idDetailSale) => {
        const { detailsSale } = get();
        const updatedDetailsSale = detailsSale.map((detailSale) => {
          return detailSale.idDetailSale === idDetailSale
            ? { ...detailSale, quantity: detailSale.quantity + 1 }
            : detailSale;
        });

        set({ detailsSale: updatedDetailsSale });
      },

      subtractQuantityDetailSale: (idDetailSale) => {
        const { detailsSale } = get();
        const updatedDetailsSale = detailsSale.map((detailSale) => {
          return detailSale.idDetailSale === idDetailSale
            ? { ...detailSale, quantity: detailSale.quantity - 1 }
            : detailSale;
        });

        set({ detailsSale: updatedDetailsSale });
      },

      changeQuantityDetailSale: (idDetailSale, quantity) => {
        const { detailsSale } = get();
        const updatedDetailsSale = detailsSale.map((detailSale) => {
          return detailSale.idDetailSale === idDetailSale
            ? { ...detailSale, quantity }
            : detailSale;
        });

        set({ detailsSale: updatedDetailsSale });
      },

      changePriceDetailSale: (idDetailSale, price) => {
        const { detailsSale } = get();
        const updatedDetailsSale = detailsSale.map((detailSale) => {
          return detailSale.idDetailSale === idDetailSale
            ? { ...detailSale, price }
            : detailSale;
        });

        set({ detailsSale: updatedDetailsSale });
      },

      clearSaleStore: () => {
        set({
          detailsSale: [],
          customer: {
            idCustomer: 0,
            address: "",
            name: "",
            phone: "",
            ruc: "",
          },
        });
      },
    }),

    {
      name: "detailsSaleStore",
    }
  )
);
