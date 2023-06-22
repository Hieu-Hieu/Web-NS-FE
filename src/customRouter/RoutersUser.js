import React from "react";

import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import Intro from "../pages/Intro";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserProfile from "../pages/UserProfile";
import Order from "../pages/Order";
import OrderHistory from "../pages/OrderHistory";
import OrderDetail from "../pages/OrderDetail";
import NotFound from "../components/NotFound";
import { useGoogleAnalytics } from "../hooks";

const RoutesUser = () => {
  useGoogleAnalytics();

  return (
    <Routes>
      <Route path="product/:id" element={<Product />} />
      <Route path="cart" element={<Cart />} />
      <Route path="intro" element={<Intro />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="my-profile" element={<UserProfile />} />
      <Route path="order" element={<Order />} />
      <Route path="catalog" element={<Catalog />} />
      <Route path="order-history" element={<OrderHistory />} />
      <Route path="order-detail/:id" element={<OrderDetail />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesUser;
