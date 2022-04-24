import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Helmet from '../components/Helmet'
import Button from '../components/Button'
import InfinityList from '../components/InfinityList'

import { listProducts } from '../redux/actions/productActions'
import { listBrandAction } from '../redux/actions/brandActions'
import { categoryAction } from '../redux/actions/categoryActions'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import SearchPriceBox from '../components/SearchPriceBox'
import Loading from '../components/Loading'

const certificates = [{ name: 'Hữu cơ', id: 1 }, { name: 'VietGAP', id: 2 }, { name: 'GlobalGAP', id: 3 }]

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

const getSearchParams = (searchParams) => {
    let params = {}
    if (searchParams) {
        for (var pair of searchParams.entries()) {
            params = {
                ...params,
                [pair[0]]: pair[1],
            }
            console.log(params)
        }
    }
    return params
}

const toSearchPramString = (p) => {
    if (Object.entries(p).length > 0) {
        const queryString = new URLSearchParams(p);
        return queryString.toString();
    }
    return "";
}

const Catalog = () => {
    const { search, pathname } = useLocation()

    const [query, setQuery] = useState(() => {
        const searchParams = new URLSearchParams(search.slice(1));
        return getSearchParams(searchParams)
    });

    const dispatch = useDispatch();
    const productsList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productsList

    const categoriesList = useSelector(state => state.categoriesList)
    const { loading: loadingCategories, error: errorCategories, categories } = categoriesList

    const brandsList = useSelector(state => state.brandsList)
    const { loading: loadingBrand, error: errorBrand, brands } = brandsList

    const navigate = useNavigate()

    useEffect(() => {
        if (Object.entries(query).length !== 0) {
            let p = pathname + '?' + toSearchPramString(query);
            console.log('navigate')
            navigate(p)
        }

    }, [query])

    useEffect(() => {

        dispatch(categoryAction())
        dispatch(listBrandAction())
        dispatch(listProducts(query))
    }, [dispatch])

    const filterRef = useRef(null)

    const showHideFilter = () => filterRef.current.classList.toggle('active')

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

                                                <span className={item._id === query.category ? 'active' : ''}
                                                    onClick={() => {
                                                        if (query.category === 'all' || query.category !== item._id)
                                                            setQuery({ ...query, category: item._id })
                                                        else
                                                            setQuery({ ...query, category: 'all' })
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
                                                <span className={item._id === query.brand ? 'active' : ''}
                                                    onClick={() => {
                                                        if (query.brand === 'all' || query.brand !== item._id)
                                                            setQuery({ ...query, brand: item._id })
                                                        else
                                                            setQuery({ ...query, brand: 'all' })

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
                                <div key={x.id} className="catalog__filter__widget__content">
                                    <div className="catalog__filter__widget__content__item">
                                        <span className={query.certificate === x.name ? 'active' : ''}
                                            onClick={() => {
                                                if (query.certificate === 'all' || query.certificate !== x.name)
                                                    setQuery({ ...query, certificate: x.name })
                                                else
                                                    setQuery({ ...query, certificate: 'all' })
                                            }
                                            }
                                        >
                                            {x.name}
                                        </span>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <SearchPriceBox handleSearch={setQuery} />

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
                        <li className="paginate__list-item"
                            onClick={() => setQuery({ ...query, page: query.pageNumber - 1 })}
                        >
                            Trang trước
                        </li>
                    }
                    {pageNumberArr.map((number) => {
                        if (number === page) {
                            return <li key={number} className="paginate__list-item">
                                <button className="active">{number}</button>
                            </li>
                        } else {
                            return <li key={number} className="paginate__list-item"
                                onClick={() => setQuery({ ...query, pageNumber: number })}
                            >
                                {number}
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
                        <li className="paginate__list-item"
                            onClick={() => setQuery({ ...query, page: query.pageNumber - 1 })}
                        >
                            Trang sau
                        </li>
                    }
                </ul>
            </div>
        </Helmet>
    )
}

export default Catalog
