import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import Ecom from "./screens/Ecom";
import Home from "./screens/Home";
import Prod_details from "./screens/Product";
import PrimarySearchAppBar from "./Components/navbar";
import Footer from "./Components/footer";

function App(){

  return (
    <Router>
      <main className="app">
        <PrimarySearchAppBar></PrimarySearchAppBar>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/store" component={Ecom}/>
          <Route exact path="/product/:id" component={Prod_details}/>
        </Switch>
        <Footer></Footer>
      </main>
    </Router>
  );
}

export default App;
