import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Helmet from '../components/Helmet'
import Button from '../components/Button'
import InfinityList from '../components/InfinityList'

import { listProducts } from '../redux/actions/productActions'
import { listBrandAction } from '../redux/actions/brandActions'
import { categoryAction } from '../redux/actions/categoryActions'
import { Link, useParams } from 'react-router-dom'
import SearchPriceBox from '../components/SearchPriceBox'
import Loading from '../components/Loading'

const Catalog = ({ history }) => {
    const reset = {
        display: 'block',
        padding: '0px',
        textAlign: 'center',
        lineHeight: '30px',
        width: '80%',
        backgroundColor: '#39834b',
        color: '#fff',
        marginTop: '10px',
        maxWidth: '140px',
    }

    const {
        name = 'all',
        category = 'all',
        min = 0,
        max = 0,
        certificate = 'all',
        pageNumber = 1,
        brand = 'all',
    } = useParams();

    const dispatch = useDispatch();
    const productsList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productsList

    const categoriesList = useSelector(state => state.categoriesList)
    const { loading: loadingCategories, error: errorCategories, categories } = categoriesList

    const brandsList = useSelector(state => state.brandsList)
    const { loading: loadingBrand, error: errorBrand, brands } = brandsList

    const certificates = ['Hữu cơ', 'VietGAP', 'GlobalGAP']

    useEffect(() => {
        // updateProducts()
        dispatch(categoryAction())
        dispatch(listBrandAction())
        dispatch(listProducts({
            pageNumber,
            name: name !== 'all' ? name : '',
            category: category !== 'all' ? category : '',
            certificate: certificate !== 'all' ? certificate : '',
            min,
            max,
            brand,
        }))
    }, [dispatch, category, name, pageNumber, certificate, min, max, brand])

    const filterRef = useRef(null)

    const showHideFilter = () => filterRef.current.classList.toggle('active')
    const getFilterUrl = (filter) => {
        const filterPage = filter.page || pageNumber;
        const filterCategory = filter.category || category;
        const filterBrand = filter.brand || brand;
        const filterName = filter.name || name;
        const filterCertificate = filter.certificate || certificate;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        return `/catalog/category/${filterCategory}/name/${filterName}/certificate/${filterCertificate}/min/${filterMin}/max/${filterMax}/pageNumber/${filterPage}/brand/${filterBrand}`;
    };

    const pageNumberArr = [];
    if (pages) {
        for (let i = 1; i <= pages; i++) {
            pageNumberArr.push(i);
        }
    }

    return (
        <Helmet title="Sản phẩm">
            {loading && <Loading />}
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                        <i className="bx bx-left-arrow-alt"></i>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Danh mục sản phẩm
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                loadingCategories ? <div></div> : errorCategories ? <div></div>
                                    : !categories ? <div></div> :
                                        categories.map((item) => (
                                            <div key={item._id} className="catalog__filter__widget__content__item">

                                                <span className={item._id === category ? 'active' : ''}
                                                    onClick={() => {
                                                        if (category === 'all' || category !== item._id)
                                                            history.push(getFilterUrl({ category: item._id }))
                                                        else
                                                            history.push(getFilterUrl({ category: 'all' }))
                                                    }
                                                    }
                                                >
                                                    {item.name}
                                                </span>
                                            </div>
                                        ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Thương hiệu
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                loadingBrand ? <div></div> : errorBrand ? <div></div>
                                    : !brands ? <div></div> :
                                        brands.map((item) => (
                                            <div key={item._id} className="catalog__filter__widget__content__item">
                                                {/* <Link className={item._id === brand ? 'active' : ''}
                                                    to={() => getFilterUrl({ brand: item._id })}>
                                                    {item.name}
                                                </Link> */}
                                                <span className={item._id === brand ? 'active' : ''}
                                                    onClick={() => {
                                                        if (brand === 'all' || brand !== item._id)
                                                            history.push(getFilterUrl({ brand: item._id }))
                                                        else
                                                            history.push(getFilterUrl({ brand: 'all' }))
                                                    }
                                                    }
                                                >
                                                    {item.name}
                                                </span>
                                            </div>
                                        ))
                            }
                        </div>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Chứng nhận
                        </div>
                        {!certificates ? <div></div> :
                            certificates.map(x =>
                                <div className="catalog__filter__widget__content">
                                    <div className="catalog__filter__widget__content__item">

                                        <span className={certificate === x ? 'active' : ''}
                                            onClick={() => {
                                                if (certificate === 'all' || certificate !== x)
                                                    history.push(getFilterUrl({ certificate: x }))
                                                else
                                                    history.push(getFilterUrl({ certificate: 'all' }))
                                            }
                                            }
                                        >
                                            {x}
                                        </span>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <SearchPriceBox getFilterUrl={getFilterUrl} />

                    <div>
                        <Link to="/catalog" style={reset}>
                            Reset
                        </Link>
                    </div>
                </div>
                <div className="catalog__filter__toggle">
                    <Button size="sm" onClick={() => showHideFilter()}>bộ lọc</Button>
                </div>
                <div className="catalog__content">
                    <InfinityList
                        products={products}
                        loading={loading}
                        error={error}
                        page={page}
                        pages={pages}
                    />
                </div>
            </div>
            {/* <Pagination page={page} pages={pages} getFilterUrl={getFilterUrl} /> */}

            <div className="paginate">
                <ul className="paginate__list">
                    {page === 1 ?
                        <li className="paginate__list-item">
                            <Link to="#" style={{ cursor: 'default', backgroundColor: "#f5f5f5" }}
                            >Trang trước</Link>
                        </li>
                        :
                        <li className="paginate__list-item">

                            <Link to={getFilterUrl({ page: pageNumber - 1 })}>Trang trước</Link>
                        </li>
                    }
                    {pageNumberArr.map((number) => {
                        if (number === page) {
                            return <li className="paginate__list-item">
                                <button className="active">{number}</button>
                            </li>
                        } else {
                            return <li className="paginate__list-item">
                                {/* <button onClick={() => handlePageChange(number)}>{number}</button> */}
                                {/* <Link to={`/catalog/pageNumber/${number}`}>{number}</Link> */}
                                <Link to={getFilterUrl({ page: number })}>{number}</Link>

                            </li>
                        }
                    })
                    }
                    <li className="paginate__list-item">
                        <button>...</button>
                    </li>
                    {page >= pages ?
                        <li className="paginate__list-item">
                            <Link to="#" style={{ cursor: 'default', backgroundColor: "#f5f5f5" }}
                            >Trang sau</Link>
                        </li>
                        :
                        <li className="paginate__list-item">

                            <Link to={getFilterUrl({ page: +pageNumber + 1 })}>Trang sau</Link>
                        </li>
                    }
                </ul>
            </div>
        </Helmet>
    )
}

export default Catalog
