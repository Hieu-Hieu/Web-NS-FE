import React from "react";

import { Route, Switch } from "react-router-dom";

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

const RoutesUser = () => {
  return (
    <Switch>
      <Route path="/product/:id" exact component={Product} />
      <Route path="/cart/:id?" exact component={Cart} />
      <Route path="/intro" component={Intro} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/my-profile" component={UserProfile} />
      <Route path="/order" exact component={Order} />
      <Route path="/order-history" exact component={OrderHistory} />
      <Route path="/order-detail/:id" exact component={OrderDetail} />

      <Route path="/catalog/category/:category" exact component={Catalog} />
      <Route path="/catalog/name/:name" exact component={Catalog} />
      <Route
        path="/catalog/category/:category/certificate/:certificate"
        exact
        component={Catalog}
      />
      <Route path="/catalog/pageNumber/:pageNumber" exact component={Catalog} />
      <Route path="/catalog/min/:min/max/:max" exact component={Catalog} />
      <Route
        path="/catalog/category/:category/name/:name/certificate/:certificate/min/:min/max/:max/pageNumber/:pageNumber/brand/:brand"
        exact
        component={Catalog}
      />
      <Route path="/catalog" exact component={Catalog} />

      <Route path="/" exact component={Home} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default RoutesUser;
