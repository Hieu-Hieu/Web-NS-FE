import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import Helmet from '../components/Helmet'
import Section, { SectionBody, SectionTitle } from '../components/Section'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
import ProductView from '../components/ProductView'
import { detailsProduct, topProductsRelate } from '../redux/actions/productActions'
import Loading from '../components/Loading'


const Product = props => {
    const dispatch = useDispatch()
    const productId = props.match.params.id

    const productDetail = useSelector(state => state.productDetail)
    const { loading, error, product } = productDetail

    const listProductsRelate = useSelector(state => state.topProductsRelate)
    const {
        loading: loadingTopProductRelate,
        error: errorTopProductRelate,
        topProductsRelate: productsRelate,
    } = listProductsRelate

    //console.log(listProductsRelate)

    // const product = productData.getProductBySlug(props.match.params.id


    React.useEffect(() => {
        window.scrollTo(0, 0)

        dispatch(detailsProduct(productId))
        dispatch(topProductsRelate(productId))
    }, [dispatch, productId])

    // const addToCartHandler = () => {
    //     props.history.push(`/cart/${productId}?qty=${qty}`);
    // };

    return (

        <>
            {loading ? <Loading /> : error ?
                (<>
                    <Link to="/">Quay về trang chủ</Link>
                    <div>{error}</div>
                </>) :
                <Helmet title={product.name}>
                    <Section>
                        <SectionBody>
                            <ProductView product={product} />
                        </SectionBody>
                    </Section>
                    {
                        loadingTopProductRelate ? <div>Loading...</div>
                            : errorTopProductRelate ? <div>{errorTopProductRelate}</div> :
                                <Section>
                                    <SectionTitle>
                                        Sản phẩm tương tự
                                    </SectionTitle>
                                    {!productsRelate || productsRelate.length === 0
                                        ? <div className="text-center" style={{ height: '10vh', fontSize: '30px' }}>Không có sản phẩm nào liên quan</div> :

                                        <SectionBody>
                                            <Grid
                                                col={4}
                                                mdCol={2}
                                                smCol={1}
                                                gap={20}
                                            >
                                                {
                                                    productsRelate.map((item, index) => (
                                                        <ProductCard
                                                            key={index}
                                                            img01={item.images[0]}
                                                            img02={item.images[1]}
                                                            name={item.name}
                                                            price={Number(item.price)}
                                                            _id={item._id}
                                                            discount={item.discount || 0}
                                                        />
                                                    ))}
                                            </Grid>
                                        </SectionBody>
                                    }
                                </Section>
                    }
                </Helmet>
            }
        </>

    )
}

export default Product
