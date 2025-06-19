import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IProduct } from "@/interfaces/product.interface";

interface CartItem {
  product: IProduct;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalQuantity: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (newItem) => {
        const existing = get().items.find(
          (item) => item.product.id === newItem.product.id
        );
        if (existing) {
          set({
            items: get().items.map((item) =>
              item.product.id === newItem.product.id
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            ),
          });
        } else {
          set({ items: [...get().items, newItem] });
        }
      },

      removeItem: (id) =>
        set({
          items: get().items.filter((item) => item.product.id !== id),
        }),

      increaseQuantity: (id) =>
        set({
          items: get().items.map((item) =>
            item.product.id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }),

      decreaseQuantity: (id) =>
        set({
          items: get().items
            .map((item) =>
              item.product.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        }),

      clearCart: () => set({ items: [] }),

      getTotalPrice: () =>
        get().items.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        ),

      getTotalQuantity: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),
    }),
    {
      name: "cart-storage",
    }
  )
);
