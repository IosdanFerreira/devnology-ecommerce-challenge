import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FilterSidebar as SidebarContent } from "./filter-sidebar"; // o seu componente atual
import { SlidersHorizontal } from "lucide-react";

interface ResponsiveFilterSidebarProps {
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

export function FilterSidebarWithResponsiveDrawer(
  props: ResponsiveFilterSidebarProps
) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ===== MOBILE - Drawer com botão ===== */}
      <div className="lg:hidden">
        <Drawer open={open} onOpenChange={setOpen} direction="right">
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-fit">
              <SlidersHorizontal />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-left px-4 pt-4">Filtros</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-6">
              <SidebarContent
                {...props}
                onApplyFilters={(filters) => {
                  props.onApplyFilters(filters);
                  setOpen(false);
                }}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* ===== DESKTOP - Sidebar fixa ===== */}
      <aside className="hidden lg:block p-4 border-r border-gray-300 sticky top-20 h-fit min-w-[250px]">
        <h2 className="text-xl font-semibold mb-4">Filtros</h2>
        <SidebarContent {...props} />
      </aside>
    </>
  );
}
