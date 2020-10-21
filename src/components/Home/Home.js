import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Product from "../Product/Product";
import styles from "./Home.module.scss";

const Home = (props) => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleProductClick = (id) => {
    dispatch({
      type: "SET_SELECTED_PRODUCT",
      product: products.find((prd) => prd.id === id),
    });
    history.push(`/product/${id}`);
  };

  return (
    <div className={styles.home}>
      <div>
        <div className={styles.bannerImage}></div>
        <div className={styles.row}>
          {products?.map((product) => (
            <Product
              productClicked={() => handleProductClick(product.id)}
              key={product.id + Math.floor(Math.random() * 1000) + 1}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              rating={product.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
