import "./styles/App.scss"
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Contact from "./components/Contact";

function App() {
  return (
    <div>
      <Navbar/>
      <Home/>
      <Shop/>
      <Contact/>
    </div>
  );
}

export default App;
