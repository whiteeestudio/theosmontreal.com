import ShopLayout from "components/layouts/ShopLayout";
import ComingSoonPage from "pages/ComingSoonPage";
import { ShopCategoryPage } from "pages/ShopPage";
import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
const HomePage = React.lazy(() => import("pages/HomePage"));
const ShopPage = React.lazy(() => import("pages/ShopPage"));
const ProductPage = React.lazy(() => import("pages/ProductPage"));
const ErrorPage = React.lazy(() => import("pages/ErrorPage"));
const CartPage = React.lazy(() => import("pages/CartPage"));

const RootRouter = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route element={<ShopLayout />}>
      <Route
        path="/shop"
        element={<Navigate to="/shop/new-arrivals" replace />}
      />
      <Route
        path="/shop/new-arrivals"
        element={<ShopCategoryPage handle="new-arrivals" />}
      />
      <Route path="/shop/shop-all" element={<ShopPage />} />
      <Route path="/shop/tops" element={<ShopCategoryPage handle="tops" />} />
      <Route
        path="/shop/bottoms"
        element={<ShopCategoryPage handle="bottoms" />}
      />
      <Route path="/shop/shoes" element={<ShopCategoryPage handle="shoes" />} />
      <Route path="/product/:productHandle" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/about-us" element={<ComingSoonPage />} />
      <Route path="/contact" element={<ComingSoonPage />} />
      <Route path="/events" element={<ComingSoonPage />} />
      <Route path="/looks" element={<ComingSoonPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  </Routes>
);

export default RootRouter;
