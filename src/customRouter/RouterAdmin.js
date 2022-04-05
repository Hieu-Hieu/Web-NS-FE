import React from 'react'
import { Route, Switch } from 'react-router'
import Dashboard from '../pages/admin/Dashboard'
import Products from '../pages/admin/products'
import Customers from '../pages/admin/customers'
import NewUser from '../pages/admin/newuser'
import User from '../pages/admin/User'
import Setting from '../pages/admin/setting'
import Categories from '../pages/admin/Categories'
import Analytics from '../pages/admin/Analytics'
import Orders from '../pages/admin/orders'
import NewProduct from '../pages/admin/NewProduct'
import NewCategory from '../pages/admin/NewCategory'
import EditCategory from '../pages/admin/EditCategory'
import Brand from '../pages/admin/Brands'
import NewBrand from '../pages/admin/NewBrand'
import EditBrand from '../pages/admin/EditBrand'
import Slides from '../pages/admin/Slides'
import EditSlide from '../pages/admin/EditSlides'
import NewSlide from '../pages/admin/NewSlide'
import EditProduct from '../pages/admin/EditProdutc'
import OrderDetail from '../pages/admin/OrderDetail'

const RouterAdmin = () => {
    return (
        <Switch>
            <Route path='/admin/products' component={Products} />
            <Route path='/admin/newproduct' component={NewProduct} />
            <Route path='/admin/customers' component={Customers} />
            <Route path='/admin/newuser' component={NewUser} />
            <Route path='/admin/user' component={User} />
            <Route path='/admin/setting' component={Setting} />
            <Route path='/admin/categories/:id' exact component={EditCategory} />
            <Route path='/admin/categories' component={Categories} />
            <Route path='/admin/analytics' component={Analytics} />
            <Route path='/admin/orders' component={Orders} />
            <Route path='/admin/newCategory' exact component={NewCategory} />
            <Route path='/admin/brands' exact component={Brand} />
            <Route path='/admin/newBrand' exact component={NewBrand} />
            <Route path='/admin/brand/:id' exact component={EditBrand} />
            <Route path='/admin/slides' exact component={Slides} />
            <Route path='/admin/slides/:id' exact component={EditSlide} />
            <Route path='/admin/newSlide' exact component={NewSlide} />
            <Route path='/admin/product/:id' exact component={EditProduct} />
            <Route path='/admin/order/:id' exact component={OrderDetail} />
            <Route path='/admin' exact component={Dashboard} />
        </Switch>
    )
}

export default RouterAdmin
