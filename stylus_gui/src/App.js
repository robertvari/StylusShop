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

function App() {
  return (
    <Router>
      <Navbar/>

      <Switch>
          <Route path="/contact" component={Contact}/>
          <Route path="/shop" component={Shop}/>

          <Route path="/" component={Home}/>
      </Switch>

    </Router>
  );
}

export default App;
