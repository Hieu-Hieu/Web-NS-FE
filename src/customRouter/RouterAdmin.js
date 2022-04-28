import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import Products from "../pages/admin/Products";
import Customers from "../pages/admin/Customers";
import NewUser from "../pages/admin/NewUser";
import User from "../pages/admin/User";
import Setting from "../pages/admin/Setting";
import Categories from "../pages/admin/Categories";
import Analytics from "../pages/admin/Analytics";
import Orders from "../pages/admin/Orders";
import NewProduct from "../pages/admin/NewProduct";
import NewCategory from "../pages/admin/NewCategory";
import EditCategory from "../pages/admin/EditCategory";
import Brand from "../pages/admin/Brands";
import NewBrand from "../pages/admin/NewBrand";
import EditBrand from "../pages/admin/EditBrand";
import Slides from "../pages/admin/Slides";
import EditSlide from "../pages/admin/EditSlides";
import NewSlide from "../pages/admin/NewSlide";
import EditProduct from "../pages/admin/EditProdutc";
import OrderDetail from "../pages/admin/OrderDetail";

const RouterAdmin = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="products" element={<Products />} />
      <Route path="newproduct" element={<NewProduct />} />
      <Route path="customers" element={<Customers />} />
      <Route path="newuser" element={<NewUser />} />
      <Route path="user" element={<User />} />
      <Route path="setting" element={<Setting />} />
      <Route path="categories/:id" element={<EditCategory />} />
      <Route path="categories" element={<Categories />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="orders" element={<Orders />} />
      <Route path="newCategory" element={<NewCategory />} />
      <Route path="brands" element={<Brand />} />
      <Route path="newBrand" element={<NewBrand />} />
      <Route path="brand/:id" element={<EditBrand />} />
      <Route path="slides" element={<Slides />} />
      <Route path="slides/:id" element={<EditSlide />} />
      <Route path="newSlide" element={<NewSlide />} />
      <Route path="product/:id" element={<EditProduct />} />
      <Route path="order/:id" element={<OrderDetail />} />
    </Routes>
  );
};

export default RouterAdmin;
