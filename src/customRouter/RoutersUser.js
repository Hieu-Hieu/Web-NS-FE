import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Home from '../pages/home'
import Catalog from '../pages/catalog'
import Cart from '../pages/cart'
import Product from '../pages/product'
import Intro from '../pages/intro'
import Contact from '../pages/contact'
import Login from '../pages/login'
import Register from '../pages/register'
import UserProfile from '../pages/userProfile'
import Order from '../pages/Order'
import OrderHistory from '../pages/OrderHistory'
import OrderDetail from '../pages/orderdetail'
import NotFound from '../components/NotFound'

const RoutesUser = () => {
    return (
        <Switch>
            <Route path='/product/:id' exact component={Product} />
            <Route path='/cart/:id?' exact component={Cart} />
            <Route path='/intro' component={Intro} />
            <Route path='/contact' component={Contact} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/my-profile' component={UserProfile} />
            <Route path='/order' exact component={Order} />
            <Route path='/order-history' exact component={OrderHistory} />
            <Route path='/order-detail/:id' exact component={OrderDetail} />

            <Route path='/catalog/category/:category'
                exact
                component={Catalog}
            />
            <Route path='/catalog/name/:name'
                exact
                component={Catalog}
            />
            <Route path='/catalog/category/:category/certificate/:certificate'
                exact
                component={Catalog}
            />
            <Route path='/catalog/pageNumber/:pageNumber'
                exact
                component={Catalog}
            />
            <Route path='/catalog/min/:min/max/:max'
                exact
                component={Catalog}
            />
            <Route path='/catalog/category/:category/name/:name/certificate/:certificate/min/:min/max/:max/pageNumber/:pageNumber/brand/:brand'
                exact
                component={Catalog}
            />
            <Route path='/catalog'
                exact
                component={Catalog}
            />

            <Route path='/' exact component={Home} />
            <Route path="*" component={NotFound} />

        </Switch>
    )
}

export default RoutesUser
