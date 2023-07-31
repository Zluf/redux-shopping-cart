import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const ProductItem = (props) => {
  const dispatch = useDispatch();

  const { title, price, description, id, totalPrice } = props;

  const addToCartHandler = () => {
    // fetch('firebase-url', {method: 'POST', body: JSON.stringify(newCart)})

    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
        description,
      })
    );
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;

// --------------------------------------
// Transforming data inside the component
// --------------------------------------

// import Card from "../UI/Card";
// import classes from "./ProductItem.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { cartActions } from "../../store/cart-slice";

// const ProductItem = (props) => {
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);

//   const { title, price, description, id, totalPrice } = props;

//   const addToCartHandler = () => {
//     // Transforming data inside the component
//     const newTotalQuantity = cart.totalQuantity + 1;

//     const updatedItems = cart.items.slice(); // creates a copy via slice to avoid mutating
//     const existingItem = updatedItems.find((item) => item.id === id);

//     if (existingItem) {
//       const updatedItem = { ...existingItem }; // new object + copy existing properties
//       updatedItem.quantity++;
//       updatedItem.price = updatedItem.price + price;
//       const existingItemIndex = updatedItems.findIndex(
//         (item) => item.id === id
//       );
//       updatedItems[existingItemIndex] = updatedItem;
//     } else {
//       updatedItems.push({
//         id: id,
//         price: price,
//         quantity: 1,
//         totalPrice: price,
//         name: title,
//       });
//     }

//     const newCart = {
//       totalQuantity: newTotalQuantity,
//       items: updatedItems,
//     };

//     dispatch(cartActions.replaceCart(newCart));

//     console.log(cart);

//   };

//   return (
//     <li className={classes.item}>
//       <Card>
//         <header>
//           <h3>{title}</h3>
//           <div className={classes.price}>${price.toFixed(2)}</div>
//         </header>
//         <p>{description}</p>
//         <div className={classes.actions}>
//           <button onClick={addToCartHandler}>Add to Cart</button>
//         </div>
//       </Card>
//     </li>
//   );
// };

// export default ProductItem;
