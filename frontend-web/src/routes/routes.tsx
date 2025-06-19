import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./root-layout";
import HomePage from "@/pages/home/home-page";
import ProductPage from "@/pages/product/product-page";
import FavoritesPage from "@/pages/favorites/favorites-page";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        path: "",
        element: <HomePage />,
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
      },
      {
        path: "/favorites",
        element: <FavoritesPage />,
      },
    ],
  },
]);

export default routes;
