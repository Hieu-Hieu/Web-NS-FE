import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import Helmet from "../components/Helmet";
import Section, { SectionBody, SectionTitle } from "../components/Section";
import Grid from "../components/Grid";
import ProductCard from "../components/ProductCard";
import ProductView from "../components/ProductView";
import {
  detailsProduct,
  topProductsRelate,
} from "../redux/actions/productActions";
import Loading from "../components/Loading";
import Comments from "../components/Comments/Comments";
import { useValues } from "../hooks";
import { useTranslation } from "react-i18next";

const Product = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const productId = params.id;
  const { t } = useTranslation();

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  const listProductsRelate = useSelector((state) => state.topProductsRelate);
  const [values, setValues] = useValues({
    loadingComments: false,
    comments: [],
  });

  const {
    loading: loadingTopProductRelate,
    error: errorTopProductRelate,
    topProductsRelate: productsRelate,
  } = listProductsRelate;

  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(detailsProduct(productId));
    dispatch(topProductsRelate(productId));

    // get comments
    // setValues({ loadingComments: true });
    // commentApi
    //   .getListComments({ productId })
    //   .then(({ status, comments }) => {
    //     if (status) {
    //       setValues({
    //         comments: comments,
    //         loadingComments: false,
    //       });
    //     }
    //   })
    //   .catch(() => {
    //     setValues({
    //       loadingComments: false,
    //     });
    //   });
  }, [dispatch, productId]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <>
          <Link to="/">{t("back_to_home_page")}</Link>
          <div>{error}</div>
        </>
      ) : (
        <Helmet title={product.name}>
          <Section>
            <SectionBody>
              <ProductView product={product} />
            </SectionBody>
          </Section>
          {loadingTopProductRelate ? (
            <div>Loading...</div>
          ) : errorTopProductRelate ? (
            <div>{errorTopProductRelate}</div>
          ) : (
            <Section>
              <SectionTitle>{t("similar_product")}</SectionTitle>
              {!productsRelate || productsRelate.length === 0 ? (
                <div
                  className="text-center"
                  style={{ height: "10vh", fontSize: "30px" }}
                >
                  {t("no_related_products")}
                </div>
              ) : (
                <SectionBody>
                  <Grid col={4} mdCol={2} smCol={1} gap={20}>
                    {productsRelate.map((item, index) => (
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
              )}
            </Section>
          )}
          <Section>
            <Comments productId={productId} />
          </Section>
        </Helmet>
      )}
    </>
  );
};

export default Product;
