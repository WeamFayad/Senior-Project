import "./styles/index.css";
import { Route, Routes } from "react-router-dom";

//Page imports
import Checkout from "./domain/pages/Checkout";

import CheckoutSuccess from "./domain/pages/CheckoutSuccess";
import Error from "./domain/pages/Error";
import Home from "./domain/pages/Home";
import LogIn from "./domain/pages/LogIn";

import Shop from "./domain/pages/Shop";
import ShopItem from "./domain/pages/ShopItem";
import SignUp from "./domain/pages/SignUp";
import Editprofile from "./domain/pages/EditProdile";
import Terms from "./domain/pages/Terms";

//Redux
import { Provider } from "react-redux";
import { store } from "./core/dataSource/localDataSource/store";

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <Routes>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/error" element={<Error />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
      
     
          
          <Route path="/shop" element={<Shop />} />
          <Route path="/product-details" element={<ShopItem />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/edit" element={<Editprofile />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
