import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { convertToReal } from "@/utils/convert-to-real";
import { useState } from "react";

interface FilterSidebarProps {
  onApplyFilters: (filters: Filters) => void;
  category?: string | null;
  supplier?: string | null;
  material?: string | null;
  minPrice?: string | null;
  maxPrice?: string | null;
  hasDiscount?: boolean | null;
}

interface Filters {
  category: string | null;
  supplier: string | null;
  material: string | null;
  minPrice: string | null;
  maxPrice: string | null;
  hasDiscount: boolean | null;
}

const categories = ["Sleek", "Handcrafted", "Rustic", "Generic", "Fantastic"];
const suppliers = ["brazilian", "european"];
const materials = ["Plastic", "Cotton", "Steel", "Rubber", "Frozen"];

export function FilterSidebar({
  onApplyFilters,
  category: initialCategory = null,
  supplier: initialSupplier = null,
  material: initialMaterial = null,
  minPrice: initialMinPrice = null,
  maxPrice: initialMaxPrice = null,
  hasDiscount: initialHasDiscount = null,
}: FilterSidebarProps) {
  const [category, setCategory] = useState<string | null>(initialCategory);
  const [supplier, setSupplier] = useState<string | null>(initialSupplier);
  const [material, setMaterial] = useState<string | null>(initialMaterial);
  const [minPrice, setMinPrice] = useState<string | null>(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState<string | null>(initialMaxPrice);
  const [hasDiscount, setHasDiscount] = useState<boolean | null>(
    initialHasDiscount
  );

  function handleApply() {
    onApplyFilters({
      category,
      supplier,
      material,
      minPrice: minPrice === "" ? null : minPrice,
      maxPrice: maxPrice === "" ? null : maxPrice,
      hasDiscount,
    });
  }

  function handleReset() {
    setCategory(null);
    setSupplier(null);
    setMaterial(null);
    setMinPrice("");
    setMaxPrice("");
    setHasDiscount(null);
    onApplyFilters({
      category: null,
      supplier: null,
      material: null,
      minPrice: null,
      maxPrice: null,
      hasDiscount: null,
    });
  }

  return (
    <div className="flex flex-col gap-4 text-sm w-[25vh]">
      <div>
        <Label className="text-md font-bold text-[#2e2e2e] mb-2">
          Categoria
        </Label>
        <Select
          value={category ?? "__all"}
          onValueChange={(val) => setCategory(val === "__all" ? null : val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all">Todas</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-md font-bold text-[#2e2e2e] mb-2">
          Fornecedor
        </Label>
        <Select
          value={supplier ?? "__all"}
          onValueChange={(val) => setSupplier(val === "__all" ? null : val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all">Todos</SelectItem>
            {suppliers.map((sup) => (
              <SelectItem key={sup} value={sup}>
                {sup.charAt(0).toUpperCase() + sup.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-md font-bold text-[#2e2e2e] mb-2">
          Material
        </Label>
        <Select
          value={material ?? "__all"}
          onValueChange={(val) => setMaterial(val === "" ? null : val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all">Todos</SelectItem>
            {materials.map((mat) => (
              <SelectItem key={mat} value={mat}>
                {mat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-md font-bold text-[#2e2e2e]">
          Faixa de Preço
        </Label>
        <Slider
          min={0}
          max={100000}
          step={100}
          value={[Number(minPrice) || 0, Number(maxPrice) || 100000]}
          onValueChange={([min, max]) => {
            setMinPrice(String(min));
            setMaxPrice(String(max));
          }}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{minPrice ? convertToReal(Number(minPrice)) : "R$ 0"}</span>
          <span>
            {maxPrice ? convertToReal(Number(maxPrice)) : "R$ 100.000"}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="discount"
          checked={hasDiscount === true}
          onCheckedChange={(checked) => setHasDiscount(checked ? true : null)}
        />
        <Label htmlFor="discount">Com desconto</Label>
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <Button onClick={handleApply} className="w-full">
          Aplicar
        </Button>
        <Button variant="outline" onClick={handleReset} className="w-full">
          Limpar
        </Button>
      </div>
    </div>
  );
}
