import { DetailPurchaseType } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  detailsPurchase: DetailPurchaseType[];

  setDetailsPurchase: (detailsPurchase: DetailPurchaseType[]) => void;

  addDetailPurchase: (detailPurchase: DetailPurchaseType) => void;

  removeDetailPurchase: (
    idDetailPurchase: DetailPurchaseType["idDetailPurchase"]
  ) => void;

  updateDetailPurchase: (updatedDetailPurchase: DetailPurchaseType) => void;

  clearDetailsPurchase: () => void;
};

export const usePurchaseStore = create<State>()(
  persist(
    (set, get) => ({
      detailsPurchase: [],

      setDetailsPurchase: (detailsPurchase) => {
        set({ detailsPurchase: detailsPurchase });
      },

      addDetailPurchase: (detailPurchase) => {
        const { detailsPurchase } = get();
        const updatedDetailsPurchase = [...detailsPurchase, detailPurchase];

        set({ detailsPurchase: updatedDetailsPurchase });
      },

      removeDetailPurchase: (idDetailPurchase) => {
        const { detailsPurchase } = get();
        const updatedDetailsPurchase = detailsPurchase.filter(
          (detailPurchase) =>
            detailPurchase.idDetailPurchase !== idDetailPurchase
        );

        set({ detailsPurchase: updatedDetailsPurchase });
      },

      updateDetailPurchase: (updatedDetailPurchase) => {
        const { detailsPurchase } = get();
        const updatedDetailsPurchase = detailsPurchase.map((detailPurchase) =>
          detailPurchase.idDetailPurchase ===
          updatedDetailPurchase.idDetailPurchase
            ? updatedDetailPurchase
            : detailPurchase
        );

        set({ detailsPurchase: updatedDetailsPurchase });
      },

      clearDetailsPurchase: () => {
        set({ detailsPurchase: [] });
      },
    }),

    {
      name: "detailsPurchaseStore",
    }
  )
);
