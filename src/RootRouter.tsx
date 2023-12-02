import React from "react";

import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const ShopLayout = React.lazy(() => import("components/layouts/ShopLayout"));
const PoliciesPage = React.lazy(() => import("pages/PoliciesPage"));
const ComingSoonPage = React.lazy(() => import("pages/ComingSoonPage"));
const AboutPage = React.lazy(() => import("pages/AboutPage"));
const HomePage = React.lazy(() => import("pages/HomePage"));
const ShopPage = React.lazy(() => import("pages/ShopPage"));
const ProductPage = React.lazy(() => import("pages/ProductPage"));
const ErrorPage = React.lazy(() => import("pages/ErrorPage"));
const CartPage = React.lazy(() => import("pages/CartPage"));

const RootRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} errorElement={ErrorPage} />
      <Route element={<ShopLayout />}>
        <Route
          path="/shop"
          element={<Navigate to="/shop/new-arrivals" replace />}
        />
        <Route
          path="/shop/new-arrivals"
          element={<ShopPage handle="new-arrivals" />}
          errorElement={ErrorPage}
        />
        <Route
          path="/shop/shop-all"
          element={<ShopPage handle="shop-all" />}
          errorElement={ErrorPage}
        />
        <Route
          path="/shop/tops"
          element={<ShopPage handle="tops" />}
          errorElement={ErrorPage}
        />
        <Route
          path="/shop/bottoms"
          element={<ShopPage handle="bottoms" />}
          errorElement={ErrorPage}
        />
        <Route
          path="/shop/shoes"
          element={<ShopPage handle="shoes" />}
          errorElement={ErrorPage}
        />
        <Route
          path="/product/:productHandle"
          element={<ProductPage />}
          errorElement={ErrorPage}
        />
        <Route
          path="/policies"
          element={<Navigate to="/policies/shipping" replace />}
          errorElement={ErrorPage}
        />
        <Route
          path="/policies/shipping"
          element={<PoliciesPage policy="shipping" />}
          errorElement={ErrorPage}
        />
        <Route
          path="/policies/returns-and-exchanges"
          element={<PoliciesPage policy="returns-exchanges" />}
          errorElement={ErrorPage}
        />
        <Route
          path="/policies/terms-and-conditions"
          element={<PoliciesPage policy="terms-conditions" />}
          errorElement={ErrorPage}
        />
        <Route
          path="/policies/privacy"
          element={<PoliciesPage policy="privacy" />}
          errorElement={ErrorPage}
        />

        <Route path="/cart" element={<CartPage />} errorElement={ErrorPage} />
        <Route
          path="/about-us"
          element={<AboutPage />}
          errorElement={ErrorPage}
        />
        <Route
          path="/contact"
          element={<ComingSoonPage />}
          errorElement={ErrorPage}
        />
        <Route
          path="/events"
          element={<ComingSoonPage />}
          errorElement={ErrorPage}
        />
        <Route
          path="/looks"
          element={<ComingSoonPage />}
          errorElement={ErrorPage}
        />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </>
  )
);

export default RootRouter;
