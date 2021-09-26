import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Review from "./components/Review/Review";
import Inventory from "./components/Inventory/Inventory";
import NotFound from "./components/NotFound/NotFound";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Login from "./components/Login/Login";
import Shipment from "./components/Shipment/Shipment";
import { createContext, useState } from "react";
import PrivatRoute from "./components/PrivatRoute/PrivatRoute";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <p>Email: {loggedInUser.email}</p>
      <Router>
        <Header />
        <Route path="/shop">
          <Shop />
        </Route>
        <Switch>
          <Route path="/review">
            <Review />
          </Route>
          <PrivatRoute path="/inventory">
            <Inventory />
          </PrivatRoute>
          <Route path="/login">
            <Login />
          </Route>
          <PrivatRoute path="/shipment">
            <Shipment />
          </PrivatRoute>
          <Route exact path="/">
            <Shop />
          </Route>
          <Route path="/product/:productKey">
            {/* dainamic */}
            <ProductDetail />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
