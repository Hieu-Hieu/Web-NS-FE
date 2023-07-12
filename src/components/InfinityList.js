import React, { useEffect, useRef, useState } from "react";

import Grid from "./Grid";
import ProductCard from "./ProductCard";
import { useTranslation } from "react-i18next";
import { Empty } from "antd";
// import Loading from './Loading'

const InfinityList = ({ loading, error, products }) => {
  // const perLoad = 6 // items each load

  const listRef = useRef(null);
  const { t } = useTranslation();

  // const [data, setData] = useState([])

  const [load, setLoad] = useState(true);

  // const [index, setIndex] = useState(0)

  // useEffect(() => {
  //     setData(products.slice(0, perLoad))
  //     setIndex(1)
  // }, [products])

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (listRef && listRef.current) {
        if (
          window.scrollY + window.innerHeight >=
          listRef.current.clientHeight + listRef.current.offsetTop + 200
        ) {
          // console.log("bottom reach")
          setLoad(true);
        }
      }
    });
  }, [listRef]);

  // useEffect(() => {
  //     const getItems = () => {
  //         const pages = Math.floor(products.length / perLoad)
  //         const maxIndex = products.length % perLoad === 0 ? pages : pages + 1

  //         if (load && index <= maxIndex) {
  //             const start = perLoad * index
  //             const end = start + perLoad

  //             setData(data.concat(products.slice(start, end)))
  //             setIndex(index + 1)
  //         }
  //     }
  //     getItems()
  //     setLoad(false)
  // }, [load, index, data, products])

  if ((products && products?.length === 0) || error) {
    return <Empty description={t("no_products_found")} />;
  }

  return (
    <div ref={listRef}>
      <Grid col={3} mdCol={2} smCol={1} gap={20}>
        {loading ? (
          <div></div>
        ) : error ? (
          <div>{error}</div>
        ) : products?.length === 0 ? (
          <Empty description={t("no_products_found")} />
        ) : (
          products?.map((item) => (
            <ProductCard
              key={item._id}
              img01={item.images?.[0]}
              img02={item.images?.[1]}
              name={item.name}
              price={item.price}
              _id={item._id}
              discount={item.discount}
            />
          ))
        )}
      </Grid>
    </div>
  );
};

export default InfinityList;
