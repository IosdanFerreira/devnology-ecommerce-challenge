import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./root-layout";
import HomePage from "@/pages/public-routes/home/home-page";
import ProductPage from "@/pages/public-routes/product/product-page";
import FavoritesPage from "@/pages/public-routes/favorites/favorites-page";
import SearchPage from "@/pages/public-routes/search/search-page";
import CheckoutPage from "@/pages/protected-routes/checkout/checkout-page";
import LoginPage from "@/pages/public-routes/login/login-page";
import ProtectedRoute from "./protected-routes-layout";
import SignupPage from "@/pages/public-routes/signup/signup-page";
import AuthOnlyPublicRoute from "./auth-only-public-routes-layout";
import MyOrdersPage from "@/pages/protected-routes/my-orders/my-orders-page";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },

      // Público para todos (logado ou não)
      { path: "/product/:id", element: <ProductPage /> },
      { path: "/favorites", element: <FavoritesPage /> },
      { path: "/search", element: <SearchPage /> },

      // Público apenas se **não estiver logado**
      {
        element: <AuthOnlyPublicRoute />,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/signup", element: <SignupPage /> },
        ],
      },

      // Protegido: apenas logado
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/checkout", element: <CheckoutPage /> },
          { path: "/my-orders", element: <MyOrdersPage /> },
        ],
      },
    ],
  },
]);

export default routes;
