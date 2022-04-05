import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import Helmet from '../components/Helmet'
import Button from '../components/Button'

import numberWithCommas from '../utils/numberWithCommas'

import { addToCart, removeFromCart } from '../redux/actions/cartActions'

const Cart = (props) => {

    const productId = props.match.params.id;
    const qty = props.location.search
        ? Number(props.location.search.split('=')[1])
        : 1;
    const cart = useSelector((state) => state.cart);
    const { cartItems, error } = cart;
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    let itemCount = (cartItems && cartItems.length) || 0;


    const caculateMoney = () => {
        let money = 0;
        cartItems.map(x =>
            money += x.price * x.quantity
        )
        return money || 0;
    }

    const dispatch = useDispatch();

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        // delete action
        dispatch(removeFromCart(id));
    };

    const updateQuantity = (opt, productId, qty) => {
        if (opt === '+') {
            dispatch(addToCart(productId, qty + 1))
        }
        else if (opt === '-') {
            dispatch(addToCart(productId, qty - 1 === 0 ? 1 : qty - 1))
        }
    }
    const checkoutHandler = () => {
        if (userInfo != null) {
            props.history.push('/order');
        }
        else {
            props.history.push('/login?redirect=order');
        }

    }

    return (

        <Helmet title="Giỏ hàng">
            <div className="cart">
                <div className="cart__info">
                    <div className="cart__info__txt">
                        <p>
                            Bạn đang có {itemCount} sản phẩm trong giỏ hàng
                        </p>
                        <div className="cart__info__txt__price">
                            <span>Thành tiền:</span> <span>{numberWithCommas(Number(caculateMoney()))}</span>
                        </div>
                    </div>
                    <div className="cart__info__btn">
                        <Button onClick={checkoutHandler} size="block">
                            Đặt hàng
                        </Button>

                        <Link to="/catalog">
                            <Button size="block">
                                Tiếp tục mua hàng
                            </Button>
                        </Link>

                    </div>
                </div>
                <div className="cart__list">
                    {
                        error ? <div>{error}</div> :
                            cartItems && cartItems.length === 0 ? <div>Không có sản phẩm nào trong giỏ</div> :
                                cartItems.map((item, index) => (

                                    <div className="cart__item" >
                                        <div className="cart__item__image">
                                            <img src={item.image[0]} alt="" />
                                        </div>
                                        <div className="cart__item__info">
                                            <div className="cart__item__info__name">
                                                <Link to={`/product/${item._id}`}>
                                                    {item.name}
                                                </Link>
                                            </div>
                                            <div className="cart__item__info__price">
                                                {numberWithCommas(item.price)}
                                            </div>
                                            <div className="cart__item__info__quantity">
                                                <div className="product__info__item__quantity">
                                                    <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('-', item.product, item.quantity)}>
                                                        <i className="bx bx-minus"></i>
                                                    </div>
                                                    <div className="product__info__item__quantity__input">
                                                        {item.quantity}
                                                    </div>
                                                    <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('+', item.product, item.quantity)}>
                                                        <i className="bx bx-plus"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cart__item__del">
                                                <i className='bx bx-trash' onClick={() => removeFromCartHandler(item.product)}></i>
                                            </div>
                                        </div>
                                    </div>
                                ))
                    }
                </div>
            </div>
        </Helmet>
    )
}

export default Cart
