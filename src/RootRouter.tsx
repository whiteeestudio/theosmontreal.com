import ShopLayout from "components/layouts/ShopLayout";
import AboutPage from "pages/AboutPage";
import ComingSoonPage from "pages/ComingSoonPage";
import PoliciesPage from "pages/PoliciesPage";
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
      <Route
        path="/policies"
        element={<Navigate to="/policies/shipping" replace />}
      />
      <Route
        path="/policies/shipping"
        element={<PoliciesPage policy="shipping" />}
      />
      <Route
        path="/policies/returns-and-exchanges"
        element={<PoliciesPage policy="returns-exchanges" />}
      />
      <Route
        path="/policies/terms-and-conditions"
        element={<PoliciesPage policy="terms-conditions" />}
      />
      <Route
        path="/policies/privacy"
        element={<PoliciesPage policy="privacy" />}
      />

      <Route path="/cart" element={<CartPage />} />
      <Route path="/about-us" element={<AboutPage />} />
      <Route path="/contact" element={<ComingSoonPage />} />
      <Route path="/events" element={<ComingSoonPage />} />
      <Route path="/looks" element={<ComingSoonPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  </Routes>
);

export default RootRouter;
