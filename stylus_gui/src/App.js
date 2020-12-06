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
import Cassa from "./components/Cassa";

import {ShoppingCartProvider} from "./components/contexts/ShoppingCart";

function App() {
  return (
        <Router>

            <ShoppingCartProvider>

                <Navbar/>

                <div className="page-content-container">
                <Switch>
                  <Route path="/contact" component={Contact}/>
                  <Route path="/shop" component={Shop}/>
                  <Route path="/casa" component={Cassa}/>
                  <Route path="/login" component={Login}/>
                  <Route path="/password_reset" component={PasswordReset}/>
                  <Route path="/registration" component={Registration}/>

                  <Route path="/" component={Home}/>
                </Switch>
                </div>
            </ShoppingCartProvider>

        </Router>
  );
}

export default App;
