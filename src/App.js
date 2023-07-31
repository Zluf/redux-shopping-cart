import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
// Action Creator Thunk
import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    // has to be a separate async function inside useEffect since useEffect itself cannot be async
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      // dispatches a regular function instead of action but Redux Toolkit allows for that
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

// ---------------------
// Without using a Thunk
// ---------------------

// import Cart from "./components/Cart/Cart";
// import Layout from "./components/Layout/Layout";
// import Products from "./components/Shop/Products";
// import Notification from "./components/UI/Notification";
// import { useSelector, useDispatch } from "react-redux";
// import { Fragment, useEffect } from "react";
// import { uiActions } from "./store/ui-slice";

// let isInitial = true;

// function App() {
//   const dispatch = useDispatch();
//   const showCart = useSelector((state) => state.ui.cartIsVisible);
//   const cart = useSelector((state) => state.cart);
//   const notification = useSelector((state) => state.ui.notification);

//   useEffect(() => {
//     // has to be a separate async function inside useEffect since useEffect itself cannot be async
//     const sendCartData = async () => {
//       dispatch(
//         uiActions.showNotification({
//           status: "pending",
//           title: "Sending...",
//           message: "Sending cart data!",
//         })
//       );

//       const response = await fetch(
//         "https://react-http-191ea-default-rtdb.firebaseio.com/cart.json",
//         {
//           method: "PUT",
//           body: JSON.stringify(cart),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Sending cart data failed!");
//       }

//       dispatch(
//         uiActions.showNotification({
//           status: "success",
//           title: "Success!",
//           message: "Sent cart data successfully!",
//         })
//       );
//     };

//     if (isInitial) {
//       isInitial = false;
//       return;
//     }

//     sendCartData().catch((error) => {
//       dispatch(
//         uiActions.showNotification({
//           status: "error",
//           title: "Error!",
//           message: "Sending cart data failed!",
//         })
//       );
//     });
//   }, [cart, dispatch]);

//   return (
//     <Fragment>
//       {notification && (
//         <Notification
//           status={notification.status}
//           title={notification.title}
//           message={notification.message}
//         />
//       )}
//       <Layout>
//         {showCart && <Cart />}
//         <Products />
//       </Layout>
//     </Fragment>
//   );
// }

// export default App;
