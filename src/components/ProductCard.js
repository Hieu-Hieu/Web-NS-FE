import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import numberWithCommas from '../utils/numberWithCommas'

const ProductCard = props => {

    //const price = props.discount ? (props.price - (props.discount / 100 * props.price) + 1) : props.price;
    return (

        <div className="product-card">
            <Link to={`/product/${props._id}`}>
                <div className="product-card__image">
                    <img src={props.img01} alt="" />
                    <img src={props.img02} alt="" />
                </div>
                <h3 className="product-card__name">{props.name}</h3>
                <div className="product-card__price">
                    {/* {numberWithCommas(props.price)} */}
                    {numberWithCommas(props.price)}đ
                    {props.discount !== 0 &&
                        <span className="product-card__price__old">
                            {/* {alert(props.discount)} */}

                            <del>{numberWithCommas(Math.floor(props.price * (1 + props.discount / 100)))}đ</del>

                        </span>
                    }
                </div>
            </Link>
            {/* <div className="product-card__btn">
                <Button
                    size="sm"
                    icon="bx bx-cart"
                    animate={true}
                    onClick={() => dispatch(set(props.slug))}
                >
                    chọn mua
                </Button>
            </div> */}
        </div>
    )
}

ProductCard.propTypes = {
    // img01: PropTypes.string.isRequired,
    // img02: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,

}

export default ProductCard
