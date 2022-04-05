import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router'

import { addToCart } from '../redux/actions/cartActions'

import Button from './Button'
import numberWithCommas from '../utils/numberWithCommas'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductView = props => {

    const dispatch = useDispatch()

    let product = props.product

    if (product === undefined) {
        product = {
            title: "",
            price: '',
            image01: null,
            image02: null,
            categorySlug: "",
            protype: [],
            slug: "",
            certification: [],
            description: ""
        }
    }

    const [previewImg, setPreviewImg] = useState(product.images[0])

    const [descriptionExpand, setDescriptionExpand] = useState(false)

    const [quantity, setQuantity] = useState(1)

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1)
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }

    useEffect(() => {
        setPreviewImg(product.images[0])
        setQuantity(1)
    }, [product])


    const handleAddToCart = () => {
        if (product.qtyInStock <= 0) {
            toast.info('Sản phẩm đã hết hàng')
        } else if (quantity > product.qtyInStock) {
            toast.info('Trong kho không còn đủ hàng')
        }
        else if (dispatch(addToCart(product._id, quantity))) {
            toast.success("Đã thêm vào giỏ hàng");
        }
    }

    const handleGoToCart = () => {
        if (product.qtyInStock <= 0) {
            toast.info('Sản phẩm đã hết hàng')
        } else if (quantity > product.qtyInStock) {
            toast.info('Trong kho không còn đủ hàng')
        } else
            props.history.push(`/cart/${product._id}?qty=${quantity}`)
    }

    return (
        <div className="product">
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={true}
                newestOnTop={false}
            />
            <div className="product__images">
                <div className="product__images__list">
                    {
                        product.images.map((item, x) => (
                            <div key={x} className="product__images__list__item" onClick={() => setPreviewImg(item)}>
                                <img src={item} alt="" />
                            </div>

                        ))
                    }
                </div>
                <div className="product__images__main">
                    <img src={previewImg} alt="" />
                </div>
                <div className={`product-description ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product-description__title">
                        Chi tiết sản phẩm
                    </div>
                    <div className="product-description__content" dangerouslySetInnerHTML={{ __html: product.description }}></div>
                    <div className="product-description__toggle">
                        <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                            {
                                descriptionExpand ? 'Thu gọn' : 'Xem thêm'
                            }
                        </Button>
                    </div>
                </div>
            </div>
            <div className="product__info">
                <h1 className="product__info__title">{product.name}</h1>
                {product.qtyInStock >= 0 &&
                    <span style={{ lineHeight: '30px', marginLeft: '10px', fontSize: '14px' }}>
                        <span style={{ fontWeight: 'bold' }}>{product.qtyInStock}</span> sản phẩm có sẵn | <span style={{ fontWeight: 'bold' }}>{product.sold}</span> đã bán</span>
                }
                <div className="product__info__item">
                    <span className="product__info__item__price">
                        {numberWithCommas(product.price)}đ
                    </span>
                </div>

                <div className="product__info__item">

                    <div className="product__info__item__title">
                        Số lượng
                    </div>
                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('minus')}>
                            <i className="bx bx-minus"></i>
                        </div>
                        <div className="product__info__item__quantity__input">
                            {quantity}
                        </div>
                        <div className="product__info__item__quantity__btn" onClick={() => {
                            if (quantity >= product.qtyInStock) {
                                toast.warning('Cửa hàng chỉ còn ' + product.qtyInStock + ' sản phẩm')
                            } else
                                updateQuantity('plus')
                        }
                        }>
                            <i className="bx bx-plus"></i>
                        </div>

                    </div>
                </div>
                <div className="product__info__item">
                    <Button onClick={() => handleAddToCart()}>thêm vào giỏ</Button>
                    <Button onClick={() => handleGoToCart()}>mua ngay</Button>
                </div>
            </div>
            <div className={`product-description mobile ${descriptionExpand ? 'expand' : ''}`}>
                <div className="product-description__title">
                    Chi tiết sản phẩm
                </div>
                <div className="product-description__content" dangerouslySetInnerHTML={{ __html: product.description }}></div>
                <div className="product-description__toggle">
                    <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                        {
                            descriptionExpand ? 'Thu gọn' : 'Xem thêm'
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}

ProductView.propTypes = {
    product: PropTypes.object
}

export default withRouter(ProductView)
