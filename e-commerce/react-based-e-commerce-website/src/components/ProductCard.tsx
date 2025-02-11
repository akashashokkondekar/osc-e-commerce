import styles from "./../css/ProductCard.module.css";
import { useDispatch } from 'react-redux';
import { addItem, removeItem } from '../features/basket/basketSlice';
import { isEmpty, isNull } from "lodash";
import { AddItemOperationText, AddToBasketButtonConditionText, InfoNotAvailableText, RemoveItemFromBasketButtonConditionText, RemoveProductFromCartOperationText } from "../utils/AppConstant";
import Confetti from 'react-confetti-boom';
import { useState } from "react";
import { AppUtils } from "../utils/AppUtils";

export default function ProductCard({ currProductObj, alreadyAddedInBasket }) {

  const dispatch = useDispatch();
  const [showAnimation, updateShowAnimationFlag] = useState<boolean>(false);

  const performUserClickOperation = (operationName: string) => {

    switch (operationName) {
      case AddItemOperationText:
        dispatch(addItem(currProductObj));
        updateShowAnimationFlag(true);
        break;

      case RemoveProductFromCartOperationText:
        dispatch(removeItem(currProductObj.id));
        break;

    }
  }

  return (

    <div key={currProductObj.id} className={styles.productCard}>
      {showAnimation && <Confetti
        effectCount={1}
        mode="boom"
        particleCount={50}
        shapeSize={20}
      />}
      <img src={currProductObj.featuredImage.url} alt={currProductObj.title} className={styles.productImage} loading="lazy" />
      <h3 className={styles.productTitle}>{currProductObj.title}</h3>
      <p className={styles.productDescription}>{(!isNull(currProductObj.description) && !isEmpty(currProductObj.description)) ? currProductObj.description : InfoNotAvailableText}</p>
      <p className={styles.productPrice}>{AppUtils.GetCurrencySymbolUsingCode(currProductObj.variants.edges[0].node.price.currencyCode)}{parseInt(currProductObj.variants.edges[0].node.price.amount).toFixed(2)}</p>
      <button
        onClick={() => performUserClickOperation(alreadyAddedInBasket ? RemoveProductFromCartOperationText : AddItemOperationText)}
        className={alreadyAddedInBasket ? styles.removeItemButton : styles.addButton}
      >
        {alreadyAddedInBasket ? RemoveItemFromBasketButtonConditionText : AddToBasketButtonConditionText}
      </button>
    </div>

  );
}