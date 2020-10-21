import React from "react";
import styles from "./ProductDetail.module.scss";
import PaymentOutlinedIcon from "@material-ui/icons/PaymentOutlined";
import ReplayIcon from "@material-ui/icons/Replay";
import FlightTakeoffOutlinedIcon from "@material-ui/icons/FlightTakeoffOutlined";
import { useDispatch, useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";

const ProductDetail = (props) => {
  const selectedProduct = useSelector((state) => state.products.selectedProduct);
  const dispatch = useDispatch();

  const handleAddToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: selectedProduct.id,
        title: selectedProduct.title,
        image: selectedProduct.image,
        price: selectedProduct.price,
        rating: selectedProduct.rating,
      },
    });
    NotificationManager.info(selectedProduct.title,`Product added to basket`, 2000);
  };

  return (
    <div className={styles.productDetail}>
      <div className={styles.imgContainer}>
        <img src={selectedProduct.image} alt={selectedProduct.title} />
      </div>
      <div className={styles.detailsContainer}>
        <h2>{selectedProduct.title}</h2>
        <p className={styles.price}>
          <small>$</small>
          <strong>{selectedProduct.price}</strong>
        </p>
        <p className={styles.details}>Details</p>
        <ul>
          {selectedProduct.details.map((detail, i) => (
            <li key={i}>{detail}</li>
          ))}
        </ul>
        <button onClick={handleAddToBasket}>Add to basket</button>
        <div className={styles.features}>
          <div>
            <FlightTakeoffOutlinedIcon className={styles.featureIcon} />
            <span>Free international shipping for orders over $50</span>
          </div>
          <div>
            <PaymentOutlinedIcon className={styles.featureIcon} />
            <span>Secure Payment</span>
          </div>
          <div>
            <ReplayIcon className={styles.featureIcon} />
            <span>Return within 15 days</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
