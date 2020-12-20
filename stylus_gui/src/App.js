import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import "./styles/App.scss"
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Contact from "./components/Contact";
import Login from "./components/Login";
import PasswordReset from "./components/PasswordReset";
import Registration from "./components/Registration";
import Checkout from "./components/shop/Checkout";
import Success from "./components/shop/Success";
import Profile from "./components/users/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

import {ShoppingCartProvider} from "./components/contexts/ShoppingCart";
import {UserProvider} from "./components/contexts/UserContext";

function App() {
  return (
        <Router>
            <UserProvider>

            <ShoppingCartProvider>

                <Navbar/>

                <div className="page-content-container">
                <Switch>
                  <Route path="/contact" component={Contact}/>
                  <Route path="/shop" component={Shop}/>
                  <Route path="/checkout" component={Checkout}/>
                  <Route path="/login" component={Login}/>
                  <Route path="/password_reset" component={PasswordReset}/>
                  <Route path="/registration" component={Registration}/>
                  <Route path="/payment_success" component={Success}/>

                  <ProtectedRoute path="/profile" component={Profile}/>

                  <Route path="/" component={Home}/>
                </Switch>
                </div>
            </ShoppingCartProvider>

            </UserProvider>
        </Router>
  );
}

export default App;
