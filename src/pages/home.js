import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Helmet from '../components/Helmet'
import HeroSlider from '../components/HeroSlider'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import PolicyCard from '../components/PolicyCard'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'

import policy from '../fakedata/policy'

import { listProducts, topProductAction, listProductsWithCondition } from '../redux/actions/productActions'
import { listSlides } from '../redux/actions/slideAction'

import banner from '../images/sale1.png'


const bannerStyle = {
    margin: '0 auto',
    height: '629px',
    width: '1920px'
}

const Home = () => {
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products, } = productList;

    const topProducts = useSelector(state => state.topProducts);
    const {
        loading: loadingTopProducts,
        error: errorTopProducts,
        topProducts: topProducts1,
    } = topProducts;


    const slideList = useSelector(state => state.slideList);
    const {
        loading: loadingSlides,
        error: errorSlides,
        slides,
    } = slideList;

    const listproductByCertification = useSelector(state => state.productListWithContidion);
    const {
        loading: loadingProductCertification,
        error: errorProductCertification,
        products: productsCertification,
    } = listproductByCertification;

    useEffect(() => {

        dispatch(listSlides())
        dispatch(topProductAction())
        dispatch(listProducts({}))
        dispatch(listProductsWithCondition({ certificate: 'VietGAP' }))

    }, [dispatch])


    return (
        <Helmet title="Trang chủ">
            {/* hero slider */}
            {loadingSlides ? <div>Loading...</div> : errorSlides ? <div>{errorSlides}</div> :
                <HeroSlider
                    data={slides}
                    control={true}
                    auto={true}
                    timeOut={5000}
                />
            }
            {/* end hero slider */}

            {/* policy section */}
            <Section>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >

                        {
                            policy.map((item, index) => <Link key={index} to="/policy">
                                <PolicyCard
                                    name={item.name}
                                    description={item.description}
                                    icon={item.icon}
                                />
                            </Link>)
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/* end policy section */}

            {/* best selling section */}
            <Section>
                <SectionTitle>
                    Sản phẩm mới
                </SectionTitle>
                {
                    loading ? <div>Loading...</div>
                        : error ? <div>{error}</div> :
                            <SectionBody>
                                {
                                    products === undefined || products.length === 0 ?
                                        <div className="text-center" style={{ height: '10vh', fontSize: '30px' }}>Không có sản phẩm nào</div> :
                                        <Grid
                                            col={4}
                                            mdCol={2}
                                            smCol={1}
                                            gap={20}
                                        >
                                            {
                                                products.map((item) => (
                                                    <ProductCard
                                                        key={item._id}
                                                        img01={item.images[0]}
                                                        img02={item.images[1]}
                                                        name={item.name}
                                                        price={item.price}
                                                        discount={item.discount}
                                                        _id={item._id}
                                                    />
                                                )
                                                )
                                            }
                                        </Grid>
                                }
                            </SectionBody>
                }
            </Section>
            {/* end best selling section */}

            {/* new arrival section */}
            <Section>
                <SectionTitle>
                    Sản phẩm bán chạy
                </SectionTitle>
                {
                    loadingTopProducts ? <div>Loading...</div>
                        : errorTopProducts ? <div>{errorTopProducts}</div> :
                            <SectionBody>
                                {
                                    topProducts1 === undefined || topProducts1.length === 0 ?
                                        <div className="text-center" style={{ height: '10vh', fontSize: '30px' }}>Không có sản phẩm nào</div> :
                                        <Grid
                                            col={4}
                                            mdCol={2}
                                            smCol={1}
                                            gap={20}
                                        >
                                            {
                                                topProducts1.map((item) => (
                                                    <ProductCard
                                                        key={item._id}
                                                        img01={item.images[0]}
                                                        img02={item.images[1]}
                                                        name={item.name}
                                                        price={item.price}
                                                        discount={item.discount}
                                                        _id={item._id}
                                                    />
                                                )
                                                )
                                            }
                                        </Grid>
                                }
                            </SectionBody>
                }
            </Section>
            {/* end new arrival section */}

            {/* banner */}
            <Section>
                <SectionBody>
                    <Link to="/catalog">
                        <img src={banner} alt="" style={bannerStyle} />
                    </Link>
                </SectionBody>
            </Section>
            {/* end banner */}

            {/* popular product section */}
            <Section>
                <SectionTitle>
                    Sản phẩm VietGAP
                </SectionTitle>
                {
                    loadingProductCertification ? <div>Loading...</div>
                        : errorProductCertification ? <div>{errorProductCertification}</div> :
                            <SectionBody>
                                <Grid
                                    col={4}
                                    mdCol={2}
                                    smCol={1}
                                    gap={20}
                                >
                                    {
                                        productsCertification ? (productsCertification.map((item, index) => (
                                            <ProductCard
                                                key={index}
                                                img01={item.images[0]}
                                                img02={item.images[1]}
                                                name={item.name}
                                                price={Number(item.price)}
                                                discount={item.discount}
                                                _id={item._id}
                                            />
                                        ))) : ''
                                    }
                                </Grid>
                            </SectionBody>
                }
            </Section>
            {/* end popular product section */}
        </Helmet>
    )
}

export default Home
