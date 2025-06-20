import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IProduct } from "@/interfaces/product.interface";

interface FavoritesStore {
  items: IProduct[];
  addFavorite: (product: IProduct) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      items: [],

      addFavorite: (product) => {
        const alreadyExists = get().items.some((item) => item.id === product.id);
        if (!alreadyExists) {
          set({ items: [...get().items, product] });
        }
      },

      removeFavorite: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      isFavorite: (id) => {
        return get().items.some((item) => item.id === id);
      },

      clearFavorites: () => set({ items: [] }),
    }),
    {
      name: "favorites-storage",
    }
  )
);
