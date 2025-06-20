export interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    department: string;
    category: string;
    hasDiscount: boolean;
    discountValue: number;
    gallery: string[];
    image: string;
    material: string;
    supplier?: string;
    quantity?: number;
  }