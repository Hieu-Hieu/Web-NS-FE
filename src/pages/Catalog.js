import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Helmet from "../components/Helmet";
import Button from "../components/Button";
import InfinityList from "../components/InfinityList";

import { listProducts } from "../redux/actions/productActions";
import { listBrandAction } from "../redux/actions/brandActions";
import { categoryAction } from "../redux/actions/categoryActions";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import SearchPriceBox from "../components/SearchPriceBox";
import Loading from "../components/Loading";
import { useTranslation } from "react-i18next";

const certificates = [
  { name: "Hữu cơ", id: 1 },
  { name: "VietGAP", id: 2 },
  { name: "GlobalGAP", id: 3 },
];

const reset = {
  display: "block",
  padding: "0px",
  textAlign: "center",
  lineHeight: "30px",
  width: "80%",
  backgroundColor: "#39834b",
  color: "#fff",
  marginTop: "10px",
  maxWidth: "140px",
  cursor: "pointer",
  borderRadius: 5,
};

const nextPreBtnDisable = { pointerEvents: "none" };

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productsList;

  const categoriesList = useSelector((state) => state.categoriesList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = categoriesList;

  const brandsList = useSelector((state) => state.brandsList);
  const { loading: loadingBrand, error: errorBrand, brands } = brandsList;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listProducts(params));
  }, [searchParams, dispatch]);

  useEffect(() => {
    dispatch(categoryAction());
    dispatch(listBrandAction());
  }, [dispatch]);

  const filterRef = useRef(null);

  const showHideFilter = () => filterRef.current.classList.toggle("active");

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
          <div
            className="catalog__filter__close"
            onClick={() => showHideFilter()}
          >
            <i className="bx bx-left-arrow-alt"></i>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">
              {t("product.category")}
            </div>
            <div className="catalog__filter__widget__content">
              {loadingCategories ? (
                <div></div>
              ) : errorCategories ? (
                <div></div>
              ) : !categories ? (
                <div></div>
              ) : (
                categories.map((item) => (
                  <div
                    key={item._id}
                    className="catalog__filter__widget__content__item"
                  >
                    <span
                      className={item._id === params.category ? "active" : ""}
                      onClick={() => {
                        if (
                          params.category === "all" ||
                          params.category !== item._id
                        )
                          setSearchParams({ ...params, category: item._id });
                        else setSearchParams({ ...params, category: "all" });
                      }}
                    >
                      {item.name}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">
              {" "}
              {t("product.brand")}
            </div>
            <div className="catalog__filter__widget__content">
              {loadingBrand ? (
                <div></div>
              ) : errorBrand ? (
                <div></div>
              ) : !brands ? (
                <div></div>
              ) : (
                brands.map((item) => (
                  <div
                    key={item._id}
                    className="catalog__filter__widget__content__item"
                  >
                    <span
                      className={item._id === params.brand ? "active" : ""}
                      onClick={() => {
                        if (params.brand === "all" || params.brand !== item._id)
                          setSearchParams({ ...params, brand: item._id });
                        else setSearchParams({ ...params, brand: "all" });
                      }}
                    >
                      {item.name}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">
              {" "}
              {t("product.certification")}
            </div>
            {!certificates ? (
              <div></div>
            ) : (
              certificates.map((x) => (
                <div key={x.id} className="catalog__filter__widget__content">
                  <div className="catalog__filter__widget__content__item">
                    <span
                      className={params.certificate === x.name ? "active" : ""}
                      onClick={() => {
                        if (
                          params.certificate === "all" ||
                          params.certificate !== x.name
                        )
                          setSearchParams({ ...params, certificate: x.name });
                        else setSearchParams({ ...params, certificate: "all" });
                      }}
                    >
                      {x.name}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
          <SearchPriceBox params handleSearch={setSearchParams} />

          <div
            style={reset}
            onClick={() => {
              // alert('abx')
              setSearchParams({});
              // navigate('/catalog')
            }}
          >
            {t("clear_filter")}
          </div>
        </div>
        <div className="catalog__filter__toggle">
          <Button size="sm" onClick={() => showHideFilter()}>
            {t("filter")}
          </Button>
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
          <li
            className="paginate__list-item"
            style={page <= 1 ? nextPreBtnDisable : {}}
            onClick={() => setSearchParams({ ...params, pageNumber: page - 1 })}
          >
            {t("previous")}
          </li>
          {pageNumberArr.map((number) => {
            if (number === page) {
              return (
                <li key={number} className="paginate__list-item active">
                  {number}
                </li>
              );
            } else {
              return (
                <li
                  key={number}
                  className="paginate__list-item"
                  onClick={() =>
                    setSearchParams({ ...params, pageNumber: number })
                  }
                >
                  {number}
                </li>
              );
            }
          })}
          <li className="paginate__list-item">
            <span>...</span>
          </li>

          <li
            className="paginate__list-item"
            style={page >= pages ? nextPreBtnDisable : {}}
            onClick={() => setSearchParams({ ...params, pageNumber: page + 1 })}
          >
            {t("next_page")}
          </li>
        </ul>
      </div>
    </Helmet>
  );
};

export default Catalog;
